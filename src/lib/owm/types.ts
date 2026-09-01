export type JobKind = "training" | "inference" | "edge" | "batch";
export type RadClass = "low" | "med" | "high";
export type PolicyId = "sunlit-first" | "earth-anchor" | "max-orbital";
export type NodeKind = "sat" | "dc";
export type ViewId = "map" | "jobs" | "term";
export type LogLevel = "info" | "move" | "warn" | "crit";

export type Vec3 = { x: number; y: number; z: number };

export type Placement = { kind: NodeKind; id: string };

export type SatState = {
  id: string;
  plane: "A" | "B" | "C";
  slot: number;
  i: number;
  raan: number;
  u: number;
  altKm: number;
  lat: number;
  lon: number;
  eci: Vec3;
  eclipse: boolean;
  solar: number;
  soc: number;
  tempC: number;
  rad: number;
  islGbps: number;
  islPeer: string | null;
  contact: string[];
  loadTflops: number;
  capacityTflops: number;
  timeToEclipseS: number | null;
  eclipseHoldS: number;
};

export type GroundStation = {
  id: string;
  name: string;
  lat: number;
  lon: number;
};

export type Datacenter = {
  id: string;
  name: string;
  short: string;
  lat: number;
  lon: number;
  capacityTflops: number;
  loadTflops: number;
};

export type Job = {
  id: string;
  name: string;
  kind: JobKind;
  demandTflops: number;
  payloadGb: number;
  slaMs: number;
  rad: RadClass;
  region: "americas" | "eu" | "apac" | "global";
  pinned: boolean;
  held: boolean;
  done: boolean;
  placement: Placement;
  migratingTo: Placement | null;
  transferProgress: number;
  progress: number;
  startedAt: number;
  qps: number;
  lastScore: number;
  lastReasons: string[];
};

export type Decision = {
  id: string;
  t: number;
  utc: string;
  level: LogLevel;
  title: string;
  detail: string;
  jobId?: string;
  fromId?: string;
  toId?: string;
  scores?: { id: string; score: number }[];
};

export type FactorKey =
  | "power"
  | "thermal"
  | "radiation"
  | "bandwidth"
  | "latency"
  | "contact"
  | "forecast"
  | "capacity";

export type ScoreBreakdown = {
  nodeId: string;
  kind: NodeKind;
  total: number;
  factors: Record<FactorKey, number>;
  reasons: string[];
};

export type JobSpec = {
  name: string;
  kind: JobKind;
  demandTflops: number;
  payloadGb: number;
  slaMs: number;
  rad: RadClass;
  region?: Job["region"];
  pinTo?: string;
};

export type SimState = {
  t: number;
  speed: 0 | 1 | 4 | 16;
  policy: PolicyId;
  sats: SatState[];
  stations: GroundStation[];
  dcs: Datacenter[];
  jobs: Job[];
  logs: Decision[];
  selectedId: string | null;
  selectedKind: "sat" | "job" | "dc" | "gs" | null;
  view: ViewId;
  jobSeq: number;
  logSeq: number;
  lastScores: Record<string, ScoreBreakdown[]>;
};
