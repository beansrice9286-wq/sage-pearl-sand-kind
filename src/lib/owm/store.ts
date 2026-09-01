import { create } from "zustand";
import { JOB_CAP, LOG_CAP, SAT_CAPACITY, SIM_RATE } from "./constants";
import { createConstellation, createDatacenters, STATIONS, tickConstellation } from "./constellation";
import { PRESETS } from "./presets";
import {
  decidePlacement,
  defaultPlacement,
  jobDuration,
  placementOf,
  transferSeconds,
} from "./scheduler";
import type { Decision, Job, JobSpec, Placement, PolicyId, SimState } from "./types";
import { fmtUtc, padId } from "./vec";

function loadsFrom(jobs: Job[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const j of jobs) {
    if (j.done) continue;
    const id = j.placement.id;
    m.set(id, (m.get(id) ?? 0) + j.demandTflops);
  }
  return m;
}

function applyLoads(state: Pick<SimState, "sats" | "dcs" | "jobs">) {
  const loads = loadsFrom(state.jobs);
  const sats = state.sats.map((s) => ({
    ...s,
    loadTflops: loads.get(s.id) ?? 0,
    capacityTflops: SAT_CAPACITY,
  }));
  const dcs = state.dcs.map((d) => ({
    ...d,
    loadTflops: loads.get(d.id) ?? 0,
  }));
  return { sats, dcs };
}

function pushLog(state: SimState, partial: Omit<Decision, "id" | "t" | "utc">): SimState {
  const logSeq = state.logSeq + 1;
  const item: Decision = {
    id: `EVT-${padId(logSeq)}`,
    t: state.t,
    utc: fmtUtc(state.t),
    ...partial,
  };
  return { ...state, logSeq, logs: [item, ...state.logs].slice(0, LOG_CAP) };
}

function makeJob(spec: JobSpec, seq: number, t: number, placement: Placement): Job {
  return {
    id: `JOB-${padId(seq)}`,
    name: spec.name,
    kind: spec.kind,
    demandTflops: spec.demandTflops,
    payloadGb: spec.payloadGb,
    slaMs: spec.slaMs,
    rad: spec.rad,
    region: spec.region ?? "global",
    pinned: Boolean(spec.pinTo),
    held: false,
    done: false,
    placement,
    migratingTo: null,
    transferProgress: 0,
    progress: 0,
    startedAt: t,
    qps: spec.kind === "inference" ? 42 : spec.kind === "edge" ? 12 : 0,
    lastScore: 0,
    lastReasons: [],
  };
}

function seedJobs(sats: SimState["sats"], t: number): { jobs: Job[]; seq: number } {
  const approaching = [...sats].sort((a, b) => {
    const ta = a.timeToEclipseS ?? 9e9;
    const tb = b.timeToEclipseS ?? 9e9;
    return ta - tb;
  });
  const nightBound = approaching.find((s) => (s.timeToEclipseS ?? 0) > 180) ?? sats[0]!;
  const sunlit = sats.find((s) => !s.eclipse && s.id !== nightBound.id) ?? sats[1]!;
  const sunlit2 = sats.find((s) => !s.eclipse && s.id !== nightBound.id && s.id !== sunlit.id) ?? sats[2]!;

  const specs: { spec: JobSpec; place: Placement; socHint?: string }[] = [
    {
      spec: { ...PRESETS[0]!.spec },
      place: { kind: "dc", id: "DC-MEM" },
    },
    {
      spec: { ...PRESETS[1]!.spec },
      place: { kind: "sat", id: sunlit.id },
    },
    {
      spec: { ...PRESETS[2]!.spec, pinTo: sunlit2.id },
      place: { kind: "sat", id: sunlit2.id },
    },
    {
      spec: { ...PRESETS[3]!.spec },
      place: { kind: "sat", id: nightBound.id },
    },
    {
      spec: { ...PRESETS[4]!.spec },
      place: { kind: "dc", id: "DC-FRA" },
    },
  ];

  const jobs: Job[] = specs.map((row, i) => {
    const job = makeJob(row.spec, i + 1, t, row.place);
    if (row.spec.kind === "batch") {
      const sat = sats.find((s) => s.id === row.place.id);
      if (sat) sat.soc = Math.min(sat.soc, 0.31);
    }
    return job;
  });
  return { jobs, seq: jobs.length };
}

function initialState(): SimState {
  let sats = createConstellation();
  const dcs = createDatacenters();
  const seeded = seedJobs(sats, 0);
  const loaded = applyLoads({ sats, dcs, jobs: seeded.jobs });
  sats = tickConstellation(loaded.sats, 0, 0, loadsFrom(seeded.jobs));
  const jobs = seeded.jobs;
  const batch = jobs.find((j) => j.kind === "batch");
  if (batch) {
    sats = sats.map((s) =>
      s.id === batch.placement.id ? { ...s, soc: Math.min(s.soc, 0.3) } : s,
    );
  }
  return {
    t: 0,
    speed: 4,
    policy: "sunlit-first",
    sats,
    stations: STATIONS,
    dcs: loaded.dcs,
    jobs,
    logs: [
      {
        id: "EVT-0001",
        t: 0,
        utc: fmtUtc(0),
        level: "info",
        title: "scheduler live",
        detail: "SUNLIT-FIRST · 12 LEO-550 nodes · 3 planes · 5 jobs ingested",
      },
    ],
    selectedId: jobs[3]?.id ?? jobs[0]?.id ?? null,
    selectedKind: "job",
    view: "map",
    jobSeq: seeded.seq,
    logSeq: 1,
    lastScores: {},
  };
}

type Actions = {
  tick: (realDt: number) => void;
  setSpeed: (speed: SimState["speed"]) => void;
  setPolicy: (policy: PolicyId) => void;
  setView: (view: SimState["view"]) => void;
  select: (id: string | null, kind: SimState["selectedKind"]) => void;
  submitJob: (spec: JobSpec) => { ok: boolean; message: string; job?: Job };
  forceMigrate: (jobId: string, toId: string) => { ok: boolean; message: string };
  holdJob: (jobId: string, held: boolean) => { ok: boolean; message: string };
  reset: () => void;
};

export const useOwmStore = create<SimState & Actions>()((set, get) => ({
  ...initialState(),

  tick: (realDt: number) => {
    const cur = get();
    if (cur.speed === 0) return;
    const dt = Math.min(8, realDt * SIM_RATE * cur.speed);
    const t = cur.t + dt;
    let jobs = cur.jobs.map((j) => ({ ...j }));
    let logs: Decision[] = cur.logs;
    let logSeq = cur.logSeq;
    const lastScores: Record<string, SimState["lastScores"][string]> = { ...cur.lastScores };

    const note = (partial: Omit<Decision, "id" | "t" | "utc">) => {
      logSeq += 1;
      logs = [{ id: `EVT-${padId(logSeq)}`, t, utc: fmtUtc(t), ...partial }, ...logs].slice(0, LOG_CAP);
    };

    const loads = loadsFrom(jobs);
    let sats = tickConstellation(cur.sats, t, dt, loads);

    for (const sat of sats) {
      const prev = cur.sats.find((s) => s.id === sat.id);
      if (!prev) continue;
      if (!prev.eclipse && sat.eclipse) {
        note({
          level: "warn",
          title: `${sat.id} entered eclipse`,
          detail: `SOC ${(sat.soc * 100).toFixed(0)}% · T ${sat.tempC.toFixed(0)}°C · umbra ${Math.round(sat.eclipseHoldS / 60)} min`,
        });
      }
      if (prev.eclipse && !sat.eclipse) {
        note({
          level: "info",
          title: `${sat.id} sunlit`,
          detail: `solar restored · SOC ${(sat.soc * 100).toFixed(0)}%`,
        });
      }
      if (prev.rad < 0.55 && sat.rad >= 0.55) {
        note({
          level: "warn",
          title: `${sat.id} radiation spike`,
          detail: `flux ${sat.rad.toFixed(2)} · SAA or polar horn`,
        });
      }
    }

    for (const job of jobs) {
      if (job.done) continue;
      if (job.migratingTo) {
        const sec = transferSeconds(job, job.placement, job.migratingTo, sats);
        job.transferProgress = Math.min(1, job.transferProgress + dt / Math.max(8, sec));
        if (job.transferProgress >= 1) {
          const from = job.placement.id;
          job.placement = job.migratingTo;
          job.migratingTo = null;
          job.transferProgress = 0;
          note({
            level: "move",
            title: `${job.id} cutover complete`,
            detail: `${from} → ${job.placement.id} · ${job.name} running`,
            jobId: job.id,
            fromId: from,
            toId: job.placement.id,
          });
        }
      } else {
        const host = sats.find((s) => s.id === job.placement.id) ?? cur.dcs.find((d) => d.id === job.placement.id);
        const cap = host && "capacityTflops" in host ? host.capacityTflops : SAT_CAPACITY;
        const load = loads.get(job.placement.id) ?? job.demandTflops;
        const share = Math.min(1, cap / Math.max(load, 1));
        const eclipsePen =
          job.placement.kind === "sat" && sats.find((s) => s.id === job.placement.id)?.eclipse ? 0.82 : 1;
        const rate = share * eclipsePen;
        const dur = jobDuration(job.kind);
        if (dur) {
          job.progress = Math.min(1, job.progress + (rate * dt) / dur);
          if (job.progress >= 1) {
            job.done = true;
            job.progress = 1;
            note({
              level: "info",
              title: `${job.id} complete`,
              detail: `${job.name} finished on ${job.placement.id}`,
              jobId: job.id,
            });
          }
        } else {
          job.progress = (job.progress + dt / 80) % 1;
          job.qps = Math.round((job.kind === "inference" ? 90 : 18) * rate);
        }
      }

      const decision = decidePlacement(job, sats, cur.dcs, jobs, cur.policy);
      lastScores[job.id] = decision.ranked.slice(0, 6);
      job.lastScore = decision.current.total;
      job.lastReasons = decision.current.reasons.slice(0, 3);

      if (!decision.stay && !job.held && !job.pinned && !job.done && !job.migratingTo) {
        const dest: Placement = { kind: decision.best.kind, id: decision.best.nodeId };
        job.migratingTo = dest;
        job.transferProgress = 0.02;
        const scores = decision.ranked.slice(0, 4).map((r) => ({ id: r.nodeId, score: r.total }));
        note({
          level: "move",
          title: `${job.id} hopping ${job.placement.id} → ${dest.id}`,
          detail: `${decision.best.reasons.slice(0, 2).join(" · ") || "better score"} · Δ ${(decision.best.total - decision.current.total).toFixed(2)}`,
          jobId: job.id,
          fromId: job.placement.id,
          toId: dest.id,
          scores,
        });
      }
    }

    const applied = applyLoads({ sats, dcs: cur.dcs, jobs });
    sats = applied.sats;
    set({
      t,
      sats,
      dcs: applied.dcs,
      jobs,
      logs,
      logSeq,
      lastScores,
    });
  },

  setSpeed: (speed) => set({ speed }),
  setPolicy: (policy) =>
    set((s) =>
      pushLog({ ...s, policy }, { level: "info", title: `policy ${policy}`, detail: "live rescoring on next tick" }),
    ),
  setView: (view) => set({ view }),
  select: (id, kind) => set({ selectedId: id, selectedKind: kind }),

  submitJob: (spec) => {
    const s = get();
    if (s.jobs.filter((j) => !j.done).length >= JOB_CAP) {
      return { ok: false, message: `job cap ${JOB_CAP}` };
    }
    const pin = spec.pinTo ? placementOf(spec.pinTo, s.sats, s.dcs) : null;
    const placement = pin ?? defaultPlacement(spec.kind, s.sats, s.dcs);
    const jobSeq = s.jobSeq + 1;
    const job = makeJob({ ...spec, pinTo: pin?.id }, jobSeq, s.t, placement);
    set((st) => {
      const jobs = [job, ...st.jobs];
      const applied = applyLoads({ sats: st.sats, dcs: st.dcs, jobs });
      return pushLog(
        { ...st, jobSeq, jobs, sats: applied.sats, dcs: applied.dcs, selectedId: job.id, selectedKind: "job" },
        {
          level: "info",
          title: `${job.id} ingested`,
          detail: `${job.kind} ${job.name} · ${job.demandTflops} TFLOPS · placed ${job.placement.id}`,
          jobId: job.id,
          toId: job.placement.id,
        },
      );
    });
    return { ok: true, message: `${job.id} placed on ${job.placement.id}`, job };
  },

  forceMigrate: (jobId, toId) => {
    const s = get();
    const job = s.jobs.find((j) => j.id === jobId.toUpperCase() || j.name === jobId);
    if (!job) return { ok: false, message: `no job ${jobId}` };
    if (job.done) return { ok: false, message: `${job.id} already complete` };
    const dest = placementOf(toId.toUpperCase(), s.sats, s.dcs);
    if (!dest) return { ok: false, message: `no node ${toId}` };
    if (dest.id === job.placement.id && !job.migratingTo) {
      return { ok: false, message: `${job.id} already on ${dest.id}` };
    }
    set((st) => {
      const jobs = st.jobs.map((j) =>
        j.id === job.id ? { ...j, migratingTo: dest, transferProgress: 0.02, held: false } : j,
      );
      return pushLog(
        { ...st, jobs },
        {
          level: "move",
          title: `${job.id} operator hop ${job.placement.id} → ${dest.id}`,
          detail: "forced — hysteresis bypassed",
          jobId: job.id,
          fromId: job.placement.id,
          toId: dest.id,
        },
      );
    });
    return { ok: true, message: `${job.id} hopping to ${dest.id}` };
  },

  holdJob: (jobId, held) => {
    const s = get();
    const job = s.jobs.find((j) => j.id === jobId.toUpperCase() || j.name === jobId);
    if (!job) return { ok: false, message: `no job ${jobId}` };
    set((st) => {
      const jobs = st.jobs.map((j) => (j.id === job.id ? { ...j, held } : j));
      return pushLog(
        { ...st, jobs },
        {
          level: "info",
          title: `${job.id} ${held ? "held" : "released"}`,
          detail: held ? "frozen on current node" : "scheduler resumed",
          jobId: job.id,
        },
      );
    });
    return { ok: true, message: `${job.id} ${held ? "held" : "released"}` };
  },

  reset: () => set(initialState()),
}));

export function nodeLabel(id: string, state: SimState): string {
  const sat = state.sats.find((s) => s.id === id);
  if (sat) return `${sat.id}  plane ${sat.plane}`;
  const dc = state.dcs.find((d) => d.id === id);
  if (dc) return `${dc.id}  ${dc.name}`;
  const gs = state.stations.find((g) => g.id === id);
  if (gs) return `${gs.id}  ${gs.name}`;
  return id;
}
