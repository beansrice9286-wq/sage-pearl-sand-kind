import { HYSTERESIS, KIND_WEIGHTS, RAD_MUL, SOC_MIN, T_LIMIT_C } from "./constants";
import { nodeLatencyMs, projectSoc, thermalMargin } from "./physics";
import type {
  Datacenter,
  FactorKey,
  Job,
  NodeKind,
  Placement,
  PolicyId,
  SatState,
  ScoreBreakdown,
} from "./types";
import { clamp } from "./vec";

function nodeLoad(jobs: Job[], id: string): number {
  let n = 0;
  for (const j of jobs) {
    if (j.done || j.held) continue;
    const here = j.migratingTo ? j.placement : j.placement;
    if (here.id === id) n += j.demandTflops;
  }
  return n;
}

function pathGbps(from: Placement, to: Placement, sats: SatState[]): number {
  if (from.id === to.id) return 40;
  const a = sats.find((s) => s.id === from.id);
  const b = sats.find((s) => s.id === to.id);
  if (from.kind === "dc" && to.kind === "dc") return 48;
  if (a && b) return Math.min(a.islGbps, b.islGbps) * 0.85;
  const sat = a ?? b;
  if (!sat) return 8;
  return sat.contact.length > 0 ? 3.2 : 0.55;
}

export function transferSeconds(job: Job, from: Placement, to: Placement, sats: SatState[]): number {
  const gbps = Math.max(0.2, pathGbps(from, to, sats));
  const raw = (job.payloadGb * 8) / gbps;
  return Math.min(360, Math.max(70, raw / 8));
}

function scoreSat(job: Job, sat: SatState, jobs: Job[], policy: PolicyId): ScoreBreakdown {
  const load = nodeLoad(jobs, sat.id) - (job.placement.id === sat.id ? job.demandTflops : 0);
  const cap = sat.capacityTflops;
  const head = clamp(1 - (load + job.demandTflops * 0.25) / cap);
  const power = clamp(sat.soc * (0.42 + 0.58 * sat.solar));
  const thermal = clamp(thermalMargin(sat.tempC) / 40);
  const radiation = clamp(1 - sat.rad * RAD_MUL[job.rad]);
  const bandwidth = clamp(sat.islGbps / 18);
  const lat = nodeLatencyMs("sat", sat.contact.length, job.region);
  const latency = lat <= job.slaMs ? 1 : clamp(job.slaMs / lat);
  const contact = sat.contact.length > 0 ? 1 : job.kind === "batch" ? 0.55 : 0.2;
  const horizon = Math.max(sat.timeToEclipseS ?? 0, 1) + sat.eclipseHoldS;
  const projected = projectSoc(sat, load + job.demandTflops, Math.min(horizon, 2100));
  const forecast = sat.eclipse
    ? clamp(sat.soc * 0.5)
    : projected < SOC_MIN
      ? clamp(projected / SOC_MIN)
      : 0.75 + 0.25 * sat.solar;

  let policyMul = 1;
  if (policy === "earth-anchor" && (job.kind === "training" || job.kind === "batch")) policyMul = 0.62;
  if (policy === "max-orbital") policyMul = 1.08;
  if (job.kind === "edge") policyMul *= 1.15;

  const factors: Record<FactorKey, number> = {
    power,
    thermal,
    radiation,
    bandwidth,
    latency,
    contact,
    forecast,
    capacity: head,
  };
  const w = KIND_WEIGHTS[job.kind];
  let total = 0;
  for (const k of Object.keys(w) as FactorKey[]) total += factors[k] * w[k];
  total *= policyMul;
  if (sat.tempC > T_LIMIT_C - 4) total *= 0.45;
  if (sat.soc < SOC_MIN) total *= 0.3;
  if (job.rad === "high" && sat.rad > 0.55) total *= 0.2;

  const reasons: string[] = [];
  if (sat.eclipse) reasons.push("in umbra");
  else if (sat.timeToEclipseS != null && sat.timeToEclipseS < 420) {
    reasons.push(`eclipse in ${(sat.timeToEclipseS / 60).toFixed(1)} min`);
  }
  if (sat.solar > 0) reasons.push("sunlit");
  if (projected < SOC_MIN) reasons.push(`projected SOC ${(projected * 100).toFixed(0)}%`);
  if (sat.rad > 0.5) reasons.push("elevated radiation");
  if (sat.contact.length) reasons.push(`GS ${sat.contact[0]}`);
  if (thermal < 0.35) reasons.push(`thermal ${thermalMargin(sat.tempC).toFixed(0)}°C`);

  return { nodeId: sat.id, kind: "sat", total: clamp(total), factors, reasons };
}

function scoreDc(job: Job, dc: Datacenter, jobs: Job[], policy: PolicyId): ScoreBreakdown {
  const load = nodeLoad(jobs, dc.id) - (job.placement.id === dc.id ? job.demandTflops : 0);
  const head = clamp(1 - (load + job.demandTflops * 0.15) / dc.capacityTflops);
  const lat = nodeLatencyMs("dc", 2, job.region, dc.id);
  const latency = lat <= job.slaMs ? 1 : clamp(job.slaMs / lat);
  const factors: Record<FactorKey, number> = {
    power: 1,
    thermal: 0.96,
    radiation: 1,
    bandwidth: 0.95,
    latency,
    contact: 1,
    forecast: 0.9,
    capacity: head,
  };
  const w = KIND_WEIGHTS[job.kind];
  let total = 0;
  for (const k of Object.keys(w) as FactorKey[]) total += factors[k] * w[k];
  if (policy === "max-orbital") total *= 0.72;
  if (policy === "earth-anchor" && job.kind !== "edge") total *= 1.12;
  if (job.kind === "edge") total *= 0.08;
  if (job.kind === "training") total *= 1.06;

  const reasons = [
    "firm power",
    "zero radiation",
    `lat ${lat.toFixed(0)}ms`,
    `${Math.max(0, dc.capacityTflops - load).toFixed(0)} TFLOPS free`,
  ];
  return { nodeId: dc.id, kind: "dc", total: clamp(total), factors, reasons };
}

export function scoreJob(
  job: Job,
  sats: SatState[],
  dcs: Datacenter[],
  jobs: Job[],
  policy: PolicyId,
): ScoreBreakdown[] {
  const rows: ScoreBreakdown[] = [];
  for (const s of sats) rows.push(scoreSat(job, s, jobs, policy));
  for (const d of dcs) rows.push(scoreDc(job, d, jobs, policy));
  rows.sort((a, b) => b.total - a.total);
  return rows;
}

export function decidePlacement(
  job: Job,
  sats: SatState[],
  dcs: Datacenter[],
  jobs: Job[],
  policy: PolicyId,
): { stay: boolean; best: ScoreBreakdown; current: ScoreBreakdown; ranked: ScoreBreakdown[] } {
  const ranked = scoreJob(job, sats, dcs, jobs, policy);
  const current =
    ranked.find((r) => r.nodeId === job.placement.id) ??
    ranked[ranked.length - 1]!;
  const best = ranked[0]!;
  if (job.held || job.pinned || job.done || job.migratingTo) {
    return { stay: true, best: current, current, ranked };
  }
  const transferPen = Math.min(0.18, transferSeconds(job, job.placement, { kind: best.kind, id: best.nodeId }, sats) / 900);
  const stay = best.nodeId === job.placement.id || current.total + HYSTERESIS + transferPen >= best.total;
  return { stay, best, current, ranked };
}

export function placementOf(id: string, sats: SatState[], dcs: Datacenter[]): Placement | null {
  if (sats.some((s) => s.id === id)) return { kind: "sat", id };
  if (dcs.some((d) => d.id === id)) return { kind: "dc", id };
  return null;
}

export function defaultPlacement(kind: Job["kind"], sats: SatState[], dcs: Datacenter[]): Placement {
  if (kind === "edge") {
    const sunlit = sats.find((s) => !s.eclipse) ?? sats[0]!;
    return { kind: "sat", id: sunlit.id };
  }
  if (kind === "training") return { kind: "dc", id: "DC-MEM" };
  const sunlit = sats.find((s) => !s.eclipse && s.soc > 0.4) ?? sats[0]!;
  return { kind: "sat", id: sunlit.id };
}

export function jobDuration(kind: Job["kind"]): number | null {
  if (kind === "training") return 92 * 60;
  if (kind === "batch") return 38 * 60;
  return null;
}

export function isNodeKind(k: string): k is NodeKind {
  return k === "sat" || k === "dc";
}
