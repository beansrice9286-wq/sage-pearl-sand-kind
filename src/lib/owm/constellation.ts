import { DC_CAPACITY } from "./constants";
import { bootstrapSat, refreshSat } from "./physics";
import type { Datacenter, GroundStation, SatState } from "./types";

export const STATIONS: GroundStation[] = [
  { id: "GS-RDM", name: "Redmond", lat: 47.67, lon: -122.12 },
  { id: "GS-HTH", name: "Hawthorne", lat: 33.92, lon: -118.33 },
  { id: "GS-STB", name: "Starbase", lat: 25.99, lon: -97.16 },
  { id: "GS-MLD", name: "Malindi", lat: -2.99, lon: 40.19 },
  { id: "GS-TRO", name: "Tromsø", lat: 69.65, lon: 18.96 },
];

export const DATACENTERS: Datacenter[] = [
  {
    id: "DC-MEM",
    name: "Memphis",
    short: "MEM",
    lat: 35.15,
    lon: -90.05,
    capacityTflops: DC_CAPACITY,
    loadTflops: 0,
  },
  {
    id: "DC-FRA",
    name: "Frankfurt",
    short: "FRA",
    lat: 50.11,
    lon: 8.68,
    capacityTflops: DC_CAPACITY,
    loadTflops: 0,
  },
  {
    id: "DC-SIN",
    name: "Singapore",
    short: "SIN",
    lat: 1.35,
    lon: 103.82,
    capacityTflops: DC_CAPACITY,
    loadTflops: 0,
  },
];

const PLANES: { id: SatState["plane"]; raan: number; phase: number }[] = [
  { id: "A", raan: 0, phase: 0.18 },
  { id: "B", raan: (2 * Math.PI) / 3, phase: 1.1 },
  { id: "C", raan: (4 * Math.PI) / 3, phase: 2.05 },
];

export function createConstellation(): SatState[] {
  const sats: SatState[] = [];
  let n = 1;
  for (const plane of PLANES) {
    for (let slot = 0; slot < 4; slot++) {
      const u0 = plane.phase + slot * (Math.PI / 2);
      const id = `SAT-${String(n).padStart(2, "0")}`;
      sats.push(bootstrapSat(id, plane.id, slot, plane.raan, u0));
      n += 1;
    }
  }
  return tickConstellation(sats, 0, 0, new Map());
}

export function tickConstellation(
  sats: SatState[],
  t: number,
  dt: number,
  loads: Map<string, number>,
): SatState[] {
  const primed = sats.map((s) =>
    refreshSat(s, t, dt, sats, STATIONS, loads.get(s.id) ?? 0),
  );
  return primed.map((s) =>
    refreshSat(s, t, 0, primed, STATIONS, loads.get(s.id) ?? 0),
  );
}

export function createDatacenters(): Datacenter[] {
  return DATACENTERS.map((d) => ({ ...d, loadTflops: 0 }));
}
