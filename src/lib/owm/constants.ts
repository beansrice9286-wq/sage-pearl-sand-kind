export const MU = 398600.4418;
export const RE = 6371;
export const ALT_KM = 550;
export const A = RE + ALT_KM;
export const MEAN_MOTION = Math.sqrt(MU / (A * A * A));
export const PERIOD_S = (2 * Math.PI) / MEAN_MOTION;
export const OMEGA_E = 7.2921159e-5;
export const INC_RAD = (53 * Math.PI) / 180;
export const SAT_CAPACITY = 48;
export const DC_CAPACITY = 420;
export const T_LIMIT_C = 46;
export const SOC_MIN = 0.22;
export const EL_MIN_DEG = 10;
export const SIM_RATE = 28;
export const HYSTERESIS = 0.09;
export const LOG_CAP = 180;
export const JOB_CAP = 14;

export const RAD_MUL: Record<"low" | "med" | "high", number> = {
  low: 0.35,
  med: 0.7,
  high: 1,
};

export const KIND_WEIGHTS: Record<
  "training" | "inference" | "edge" | "batch",
  Record<
    | "power"
    | "thermal"
    | "radiation"
    | "bandwidth"
    | "latency"
    | "contact"
    | "forecast"
    | "capacity",
    number
  >
> = {
  training: {
    power: 0.16,
    thermal: 0.2,
    radiation: 0.18,
    bandwidth: 0.1,
    latency: 0.04,
    contact: 0.04,
    forecast: 0.16,
    capacity: 0.12,
  },
  inference: {
    power: 0.1,
    thermal: 0.1,
    radiation: 0.08,
    bandwidth: 0.14,
    latency: 0.28,
    contact: 0.1,
    forecast: 0.1,
    capacity: 0.1,
  },
  edge: {
    power: 0.12,
    thermal: 0.12,
    radiation: 0.1,
    bandwidth: 0.1,
    latency: 0.16,
    contact: 0.16,
    forecast: 0.12,
    capacity: 0.12,
  },
  batch: {
    power: 0.24,
    thermal: 0.14,
    radiation: 0.1,
    bandwidth: 0.08,
    latency: 0.04,
    contact: 0.04,
    forecast: 0.22,
    capacity: 0.14,
  },
};

export const CANVAS = {
  bg: "#08090b",
  earthDay: "#1c2128",
  earthNight: "#0c0d10",
  landDay: "#3d4652",
  landNight: "#14171c",
  grid: "rgba(232,233,236,0.055)",
  atm: "rgba(143,164,184,0.22)",
  sat: "#c8ccd4",
  satEclipse: "#6a6d74",
  saa: "rgba(196,122,114,0.16)",
  hop: "#8fa4b8",
  dc: "#8fa4b8",
  gs: "#7d9a7e",
  sun: "#d7dbe2",
  text: "#ececec",
  muted: "#8a8d94",
  select: "#ececec",
};

export const FACTOR_LABEL: Record<
  | "power"
  | "thermal"
  | "radiation"
  | "bandwidth"
  | "latency"
  | "contact"
  | "forecast"
  | "capacity",
  string
> = {
  power: "Power",
  thermal: "Thermal",
  radiation: "Radiation",
  bandwidth: "Bandwidth",
  latency: "Latency",
  contact: "Contact",
  forecast: "Forecast",
  capacity: "Capacity",
};
