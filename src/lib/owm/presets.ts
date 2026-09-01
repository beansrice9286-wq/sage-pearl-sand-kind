import type { JobSpec } from "./types";

export const PRESETS: { id: string; label: string; spec: JobSpec }[] = [
  {
    id: "grok-ft",
    label: "Grok fine-tune",
    spec: {
      name: "grok-reasoner-ft",
      kind: "training",
      demandTflops: 180,
      payloadGb: 640,
      slaMs: 80,
      rad: "high",
      region: "americas",
    },
  },
  {
    id: "vis-infer",
    label: "Vision infer",
    spec: {
      name: "vis-infer-east",
      kind: "inference",
      demandTflops: 28,
      payloadGb: 18,
      slaMs: 22,
      rad: "med",
      region: "americas",
    },
  },
  {
    id: "sar-edge",
    label: "SAR edge",
    spec: {
      name: "sar-segment",
      kind: "edge",
      demandTflops: 16,
      payloadGb: 42,
      slaMs: 30,
      rad: "low",
      region: "global",
    },
  },
  {
    id: "climate",
    label: "Climate ensemble",
    spec: {
      name: "climate-ens",
      kind: "batch",
      demandTflops: 64,
      payloadGb: 220,
      slaMs: 250,
      rad: "med",
      region: "global",
    },
  },
  {
    id: "vlm",
    label: "VLM serve",
    spec: {
      name: "vlm-serve",
      kind: "inference",
      demandTflops: 36,
      payloadGb: 28,
      slaMs: 40,
      rad: "low",
      region: "eu",
    },
  },
];
