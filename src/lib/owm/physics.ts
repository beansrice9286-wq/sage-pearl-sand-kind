import { A, ALT_KM, EL_MIN_DEG, INC_RAD, MEAN_MOTION, OMEGA_E, RE, T_LIMIT_C } from "./constants";
import type { GroundStation, SatState, Vec3 } from "./types";
import { clamp, vec, vdot, vmag, vnorm, vscale, vsub, wrap2pi, wrapLon } from "./vec";

export function gmst(t: number): number {
  return wrap2pi(OMEGA_E * t);
}

export function sunEci(): Vec3 {
  return vec(1, 0, 0);
}

export function satEci(raan: number, i: number, u: number, a = A): Vec3 {
  const cu = Math.cos(u);
  const su = Math.sin(u);
  const ci = Math.cos(i);
  const si = Math.sin(i);
  const cO = Math.cos(raan);
  const sO = Math.sin(raan);
  return vec(
    a * (cO * cu - sO * su * ci),
    a * (sO * cu + cO * su * ci),
    a * (su * si),
  );
}

export function latLonFromEci(eci: Vec3, t: number): { lat: number; lon: number } {
  const r = vmag(eci) || 1;
  const lat = (Math.asin(clamp(eci.z / r, -1, 1)) * 180) / Math.PI;
  const lon = wrapLon(((Math.atan2(eci.y, eci.x) - gmst(t)) * 180) / Math.PI);
  return { lat, lon };
}

export function eciFromLatLon(lat: number, lon: number, t: number, r = RE): Vec3 {
  const φ = (lat * Math.PI) / 180;
  const λ = (lon * Math.PI) / 180 + gmst(t);
  const cφ = Math.cos(φ);
  return vec(r * cφ * Math.cos(λ), r * cφ * Math.sin(λ), r * Math.sin(φ));
}

export function inEclipse(eci: Vec3, sun: Vec3 = sunEci()): boolean {
  const rdot = vdot(eci, sun);
  if (rdot >= 0) return false;
  const r2 = vdot(eci, eci);
  const perp2 = r2 - rdot * rdot;
  return perp2 < RE * RE;
}

export function losClear(a: Vec3, b: Vec3, padKm = 80): boolean {
  const d = vsub(b, a);
  const dd = vdot(d, d) || 1;
  const tt = clamp(-vdot(a, d) / dd, 0, 1);
  const p = vec(a.x + d.x * tt, a.y + d.y * tt, a.z + d.z * tt);
  return vmag(p) > RE + padKm;
}

export function elevationDeg(sat: Vec3, gs: Vec3): number {
  const look = vsub(sat, gs);
  const zen = vnorm(gs);
  const c = clamp(vdot(vnorm(look), zen), -1, 1);
  return (Math.asin(c) * 180) / Math.PI;
}

export function radiationAt(lat: number, lon: number): number {
  const saaLat = -24;
  const saaLon = -45;
  const dlat = (lat - saaLat) / 18;
  const dlon = (lon - saaLon) / 32;
  const saa = Math.exp(-(dlat * dlat + dlon * dlon));
  const polar = clamp((Math.abs(lat) - 52) / 28);
  return clamp(saa * 0.92 + polar * 0.7);
}

export function timeToEclipse(sat: SatState): number | null {
  if (sat.eclipse) return 0;
  const sun = sunEci();
  const step = Math.PI / 180;
  for (let k = 1; k <= 360; k++) {
    const eci = satEci(sat.raan, sat.i, sat.u + step * k);
    if (inEclipse(eci, sun)) return (step * k) / MEAN_MOTION;
  }
  return null;
}

export function eclipseHold(sat: SatState): number {
  const sun = sunEci();
  const startU = sat.eclipse ? sat.u : sat.u + ((sat.timeToEclipseS ?? 0) * MEAN_MOTION);
  const step = Math.PI / 180;
  let hold = 0;
  for (let k = 0; k <= 200; k++) {
    const eci = satEci(sat.raan, sat.i, startU + step * k);
    if (!inEclipse(eci, sun) && k > 0) break;
    if (inEclipse(eci, sun)) hold += step / MEAN_MOTION;
  }
  return hold;
}

export function projectSoc(sat: SatState, loadTflops: number, horizonS: number): number {
  const pSolar = 6.4;
  const pIdle = 0.38;
  const pLoad = 0.045 * loadTflops;
  const cap = 4.8;
  const sun = sunEci();
  let soc = sat.soc;
  let u = sat.u;
  const dt = 20;
  for (let t = 0; t < horizonS; t += dt) {
    const eci = satEci(sat.raan, sat.i, u);
    const ecl = inEclipse(eci, sun);
    const pin = ecl ? 0 : pSolar;
    const dKwh = (pin - pIdle - pLoad) * (dt / 3600);
    soc = clamp(soc + dKwh / cap);
    u += MEAN_MOTION * dt;
  }
  return soc;
}

export function refreshSat(
  sat: SatState,
  t: number,
  dt: number,
  peers: SatState[],
  stations: GroundStation[],
  loadTflops: number,
): SatState {
  const u = wrap2pi(sat.u + MEAN_MOTION * dt);
  const eci = satEci(sat.raan, sat.i, u);
  const { lat, lon } = latLonFromEci(eci, t);
  const sun = sunEci();
  const eclipse = inEclipse(eci, sun);
  const solar = eclipse ? 0 : 1;
  const pIn = solar * 6.4;
  const pOut = 0.38 + 0.045 * loadTflops;
  const soc = clamp(sat.soc + ((pIn - pOut) * (dt / 3600)) / 4.8);
  const tEq = eclipse ? -26 : 17;
  const tau = eclipse ? 920 : 640;
  const heat = loadTflops * 0.11;
  const tempC = sat.tempC + ((tEq + heat - sat.tempC) / tau) * dt;
  const rad = radiationAt(lat, lon);

  let bestPeer: string | null = null;
  let bestRange = Infinity;
  for (const p of peers) {
    if (p.id === sat.id) continue;
    if (!losClear(eci, p.eci)) continue;
    const range = vmag(vsub(eci, p.eci));
    if (range < bestRange) {
      bestRange = range;
      bestPeer = p.id;
    }
  }
  const islGbps = bestPeer
    ? clamp(18 * (1400 / Math.max(bestRange, 400)) ** 1.15, 0.4, 22)
    : 0;

  const contact: string[] = [];
  for (const gs of stations) {
    const g = eciFromLatLon(gs.lat, gs.lon, t);
    if (elevationDeg(eci, g) >= EL_MIN_DEG) contact.push(gs.id);
  }

  const next: SatState = {
    ...sat,
    u,
    eci,
    lat,
    lon,
    eclipse,
    solar,
    soc,
    tempC,
    rad,
    islGbps,
    islPeer: bestPeer,
    contact,
    loadTflops,
    altKm: ALT_KM,
    timeToEclipseS: null,
    eclipseHoldS: 0,
  };
  next.timeToEclipseS = timeToEclipse(next);
  next.eclipseHoldS = eclipseHold(next);
  return next;
}

export function bootstrapSat(
  id: string,
  plane: SatState["plane"],
  slot: number,
  raan: number,
  u0: number,
): SatState {
  const eci = satEci(raan, INC_RAD, u0);
  return {
    id,
    plane,
    slot,
    i: INC_RAD,
    raan,
    u: u0,
    altKm: ALT_KM,
    lat: 0,
    lon: 0,
    eci,
    eclipse: false,
    solar: 1,
    soc: 0.72,
    tempC: 8,
    rad: 0.05,
    islGbps: 10,
    islPeer: null,
    contact: [],
    loadTflops: 0,
    capacityTflops: 48,
    timeToEclipseS: null,
    eclipseHoldS: 0,
  };
}

export function thermalMargin(tempC: number): number {
  return T_LIMIT_C - tempC;
}

export function nodeLatencyMs(
  kind: "sat" | "dc",
  contactCount: number,
  region: string,
  dcId?: string,
): number {
  if (kind === "dc") {
    if (region === "global") return 18;
    if (region === "americas" && dcId === "DC-MEM") return 14;
    if (region === "eu" && dcId === "DC-FRA") return 12;
    if (region === "apac" && dcId === "DC-SIN") return 13;
    return 38;
  }
  const uplink = contactCount > 0 ? 16 : 44;
  return uplink;
}
