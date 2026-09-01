import type { Vec3 } from "./types";

export function vec(x: number, y: number, z: number): Vec3 {
  return { x, y, z };
}

export function vadd(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function vsub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

export function vscale(a: Vec3, s: number): Vec3 {
  return { x: a.x * s, y: a.y * s, z: a.z * s };
}

export function vdot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function vmag(a: Vec3): number {
  return Math.hypot(a.x, a.y, a.z);
}

export function vnorm(a: Vec3): Vec3 {
  const m = vmag(a) || 1;
  return vscale(a, 1 / m);
}

export function clamp(n: number, lo = 0, hi = 1): number {
  return Math.min(hi, Math.max(lo, n));
}

export function wrapLon(deg: number): number {
  let x = deg;
  while (x > 180) x -= 360;
  while (x < -180) x += 360;
  return x;
}

export function wrap2pi(rad: number): number {
  let x = rad % (Math.PI * 2);
  if (x < 0) x += Math.PI * 2;
  return x;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function fmtClock(t: number): string {
  const s = Math.max(0, Math.floor(t));
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

export function fmtUtc(t: number): string {
  const d = new Date(Date.UTC(2026, 8, 1, 0, 0, 0) + t * 1000);
  return d.toISOString().slice(11, 19);
}

export function padId(n: number, width = 4): string {
  return String(n).padStart(width, "0");
}
