import { PRESETS } from "./presets";
import type { Job, JobKind, JobSpec, PolicyId, RadClass, SimState } from "./types";

export type CliResult = { ok: boolean; lines: string[] };

export type CliAction =
  | { type: "none" }
  | { type: "help" }
  | { type: "jobs" }
  | { type: "log"; n?: number }
  | { type: "status"; id: string }
  | { type: "clear" }
  | { type: "clock"; speed: 0 | 1 | 4 | 16 }
  | { type: "policy"; policy?: PolicyId }
  | { type: "submit"; spec: JobSpec }
  | { type: "migrate"; jobId: string; to: string }
  | { type: "hold"; jobId: string }
  | { type: "resume"; jobId: string }
  | { type: "select"; id: string }
  | { type: "fleet" }
  | { type: "error"; message: string };

const KINDS: JobKind[] = ["training", "inference", "edge", "batch"];
const RADS: RadClass[] = ["low", "med", "high"];
const POLICIES: PolicyId[] = ["sunlit-first", "earth-anchor", "max-orbital"];
const SPEEDS = [0, 1, 4, 16] as const;

function tokenize(line: string): string[] {
  const out: string[] = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) out.push(m[1] ?? m[2] ?? m[3] ?? "");
  return out;
}

function flag(args: string[], name: string): string | undefined {
  const i = args.findIndex((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (i < 0) return undefined;
  const tok = args[i]!;
  if (tok.includes("=")) return tok.split("=").slice(1).join("=");
  return args[i + 1];
}

function numFlag(args: string[], name: string, fallback: number): number {
  const v = flag(args, name);
  if (v == null) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export function parseCommand(raw: string): CliAction {
  const line = raw.trim();
  if (!line) return { type: "none" };
  if (line.startsWith("{")) {
    try {
      const spec = JSON.parse(line) as JobSpec;
      if (!spec.name || !spec.kind) return { type: "error", message: "json needs name and kind" };
      return { type: "submit", spec: normalizeSpec(spec) };
    } catch {
      return { type: "error", message: "invalid json spec" };
    }
  }

  const tokens = tokenize(line.replace(/^owm\s+/, ""));
  const cmd = (tokens[0] ?? "").toLowerCase();
  const args = tokens.slice(1);

  if (cmd === "help" || cmd === "?") return { type: "help" };
  if (cmd === "clear") return { type: "clear" };
  if (cmd === "jobs" || cmd === "ls") return { type: "jobs" };
  if (cmd === "fleet" || cmd === "constellation") return { type: "fleet" };
  if (cmd === "log" || cmd === "logs") {
    const n = args[0] ? Number(args[0]) : 16;
    return { type: "log", n: Number.isFinite(n) ? n : 16 };
  }
  if (cmd === "status") {
    if (!args[0]) return { type: "error", message: "status <id>" };
    return { type: "status", id: args[0]!.toUpperCase() };
  }
  if (cmd === "select") {
    if (!args[0]) return { type: "error", message: "select <id>" };
    return { type: "select", id: args[0]!.toUpperCase() };
  }
  if (cmd === "clock" || cmd === "speed") {
    const n = Number(args[0]);
    if (!SPEEDS.includes(n as (typeof SPEEDS)[number])) {
      return { type: "error", message: "clock 0|1|4|16" };
    }
    return { type: "clock", speed: n as 0 | 1 | 4 | 16 };
  }
  if (cmd === "policy") {
    if (!args[0]) return { type: "policy" };
    const p = args[0] as PolicyId;
    if (!POLICIES.includes(p)) return { type: "error", message: `policy ${POLICIES.join("|")}` };
    return { type: "policy", policy: p };
  }
  if (cmd === "hold") {
    if (!args[0]) return { type: "error", message: "hold <job>" };
    return { type: "hold", jobId: args[0]!.toUpperCase() };
  }
  if (cmd === "resume" || cmd === "release") {
    if (!args[0]) return { type: "error", message: "resume <job>" };
    return { type: "resume", jobId: args[0]!.toUpperCase() };
  }
  if (cmd === "migrate" || cmd === "hop") {
    const jobId = (flag(args, "job") ?? args[0] ?? "").toUpperCase();
    const to = (flag(args, "to") ?? args[1] ?? "").toUpperCase();
    if (!jobId || !to) return { type: "error", message: "migrate <job> <node>" };
    return { type: "migrate", jobId, to };
  }
  if (cmd === "submit") {
    const presetName = flag(args, "preset") ?? (args[0] && !args[0].startsWith("--") ? args[0] : undefined);
    const preset = PRESETS.find((p) => p.id === presetName || p.spec.name === presetName);
    if (preset && !flag(args, "name") && args.every((a) => a === presetName || a.startsWith("--preset"))) {
      return { type: "submit", spec: { ...preset.spec } };
    }
    const name = flag(args, "name") ?? (args[0] && !args[0].startsWith("--") ? args[0] : undefined);
    const kindRaw = flag(args, "kind") ?? (args[1] && !args[1].startsWith("--") ? args[1] : undefined);
    if (!name) return { type: "error", message: "submit --name NAME --kind training|inference|edge|batch" };
    const kind = (kindRaw ?? "inference") as JobKind;
    if (!KINDS.includes(kind)) return { type: "error", message: `kind ${KINDS.join("|")}` };
    const rad = (flag(args, "rad") ?? "med") as RadClass;
    if (!RADS.includes(rad)) return { type: "error", message: "rad low|med|high" };
    const spec: JobSpec = {
      name,
      kind,
      demandTflops: numFlag(args, "tflops", kind === "training" ? 120 : 24),
      payloadGb: numFlag(args, "gb", kind === "training" ? 200 : 16),
      slaMs: numFlag(args, "sla-ms", kind === "inference" ? 25 : 80),
      rad,
      pinTo: flag(args, "pin")?.toUpperCase(),
    };
    const region = flag(args, "region");
    if (region === "americas" || region === "eu" || region === "apac" || region === "global") {
      spec.region = region;
    }
    return { type: "submit", spec: normalizeSpec(spec) };
  }
  return { type: "error", message: `unknown command '${cmd}' — try help` };
}

function normalizeSpec(spec: JobSpec): JobSpec {
  return {
    name: spec.name.trim(),
    kind: spec.kind,
    demandTflops: Math.max(1, spec.demandTflops || 16),
    payloadGb: Math.max(1, spec.payloadGb || 8),
    slaMs: Math.max(4, spec.slaMs || 40),
    rad: spec.rad ?? "med",
    region: spec.region ?? "global",
    pinTo: spec.pinTo,
  };
}

export const HELP_LINES = [
  "OWM  live earth–space scheduler",
  "",
  "  submit --name NAME --kind training|inference|edge|batch",
  "         --tflops N --gb N --sla-ms N --rad low|med|high --pin SAT-01",
  "  submit --preset grok-ft|vis-infer|sar-edge|climate|vlm",
  "  submit {json}",
  "  jobs                 list workloads",
  "  fleet                constellation snapshot",
  "  status <id>          job or node telemetry",
  "  migrate <job> <node> force a hop",
  "  hold | resume <job>",
  "  policy [sunlit-first|earth-anchor|max-orbital]",
  "  clock 0|1|4|16       sim rate",
  "  log [n]              tail decisions",
  "  clear",
];

export function formatJobs(jobs: Job[]): string[] {
  if (!jobs.length) return ["no jobs"];
  const head = "ID       KIND       NAME                 NODE       STATE     TFLOPS";
  const rows = jobs.map((j) => {
    const state = j.done ? "done" : j.migratingTo ? `hop→${j.migratingTo.id}` : j.held ? "hold" : "run";
    return [
      j.id.padEnd(8),
      j.kind.padEnd(10),
      j.name.slice(0, 18).padEnd(20),
      j.placement.id.padEnd(10),
      state.padEnd(10),
      String(j.demandTflops).padStart(6),
    ].join(" ");
  });
  return [head, ...rows];
}

export function formatFleet(state: SimState): string[] {
  const head = "ID      PLANE  ECL  SOC   TEMP   RAD   ISL    GS";
  const rows = state.sats.map((s) =>
    [
      s.id.padEnd(7),
      s.plane.padEnd(6),
      (s.eclipse ? "YES" : "no ").padEnd(4),
      `${Math.round(s.soc * 100)}%`.padStart(4),
      `${s.tempC.toFixed(0)}C`.padStart(6),
      s.rad.toFixed(2).padStart(5),
      s.islGbps.toFixed(1).padStart(5),
      s.contact[0] ?? "—",
    ].join("  "),
  );
  const sun = state.sats.filter((s) => !s.eclipse).length;
  return [`${sun}/${state.sats.length} sunlit   policy ${state.policy}`, head, ...rows];
}
