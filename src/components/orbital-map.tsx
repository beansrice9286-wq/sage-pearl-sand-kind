import { useEffect, useRef, type PointerEvent } from "react";
import { CANVAS } from "@/lib/owm/constants";
import { LAND, SAA } from "@/lib/owm/land";
import { satEci } from "@/lib/owm/physics";
import { useOwmStore } from "@/lib/owm/store";
import { clamp } from "@/lib/owm/vec";

type Hit = { id: string; kind: "sat" | "dc" | "gs"; x: number; y: number; r: number };
type Cam = { lon0: number; lat0: number };

function project(
  lat: number,
  lon: number,
  cam: Cam,
  cx: number,
  cy: number,
  r: number,
): { x: number; y: number; vis: number } {
  const φ = (lat * Math.PI) / 180;
  const λ = ((lon - cam.lon0) * Math.PI) / 180;
  const φ0 = (cam.lat0 * Math.PI) / 180;
  const cosc = Math.sin(φ0) * Math.sin(φ) + Math.cos(φ0) * Math.cos(φ) * Math.cos(λ);
  const x = r * Math.cos(φ) * Math.sin(λ);
  const y = r * (Math.cos(φ0) * Math.sin(φ) - Math.sin(φ0) * Math.cos(φ) * Math.cos(λ));
  return { x: cx + x, y: cy - y, vis: cosc };
}

function sunLon(t: number): number {
  return -((t * 7.2921159e-5 * 180) / Math.PI);
}

export function OrbitalMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cam = useRef<Cam>({ lon0: -40, lat0: 18 });
  const drag = useRef<{ x: number; y: number; lon0: number; lat0: number } | null>(null);
  const hits = useRef<Hit[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const loop = () => {
      const state = useOwmStore.getState();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 2 || h < 2) {
        raf = requestAnimationFrame(loop);
        return;
      }
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(ctx, w, h, state, cam.current, hits);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const hit = hits.current.find((h) => Math.hypot(h.x - x, h.y - y) <= h.r + 6);
    if (hit) {
      useOwmStore.getState().select(hit.id, hit.kind);
      return;
    }
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, lon0: cam.current.lon0, lat0: cam.current.lat0 };
  };

  const onPointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!drag.current) return;
    cam.current.lon0 = drag.current.lon0 - (e.clientX - drag.current.x) * 0.35;
    cam.current.lat0 = clamp(drag.current.lat0 + (e.clientY - drag.current.y) * 0.22, -66, 66);
  };

  return (
    <div ref={wrapRef} className="relative h-full min-h-64 w-full overflow-hidden bg-bg">
      <canvas
        ref={canvasRef}
        className="block size-full touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      />
      <div className="pointer-events-none absolute top-3 left-3 font-mono text-[10px] tracking-wider text-muted uppercase">
        LEO-550 · orthographic · drag to slew
      </div>
    </div>
  );
}

function draw(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  state: ReturnType<typeof useOwmStore.getState>,
  cam: Cam,
  hits: { current: Hit[] },
) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = CANVAS.bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.54;
  const r = Math.min(w, h) * 0.38;
  const sLon = sunLon(state.t);
  const sunP = project(0, sLon, cam, cx, cy, r);

  const atm = ctx.createRadialGradient(cx, cy, r * 0.94, cx, cy, r * 1.14);
  atm.addColorStop(0, CANVAS.atm);
  atm.addColorStop(1, "transparent");
  ctx.fillStyle = atm;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.14, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  ctx.fillStyle = CANVAS.earthDay;
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

  const shade = ctx.createLinearGradient(sunP.x - r * 1.4, sunP.y, sunP.x + r * 0.2, sunP.y);
  shade.addColorStop(0, "rgba(8,9,11,0.72)");
  shade.addColorStop(0.48, "rgba(8,9,11,0.55)");
  shade.addColorStop(0.62, "rgba(8,9,11,0.0)");
  ctx.fillStyle = shade;
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

  const drawPoly = (pts: [number, number][], fill: string) => {
    ctx.beginPath();
    let started = false;
    for (const [lon, lat] of pts) {
      const p = project(lat, lon, cam, cx, cy, r);
      if (p.vis <= 0) {
        started = false;
        continue;
      }
      if (!started) {
        ctx.moveTo(p.x, p.y);
        started = true;
      } else ctx.lineTo(p.x, p.y);
    }
    ctx.fillStyle = fill;
    ctx.fill();
  };

  for (const poly of LAND) drawPoly(poly, "rgba(70,80,92,0.92)");
  drawPoly(SAA, CANVAS.saa);

  ctx.strokeStyle = CANVAS.grid;
  ctx.lineWidth = 0.7;
  for (let lat = -60; lat <= 60; lat += 30) {
    ctx.beginPath();
    let on = false;
    for (let lon = -180; lon <= 180; lon += 6) {
      const p = project(lat, lon, cam, cx, cy, r);
      if (p.vis <= 0.02) {
        on = false;
        continue;
      }
      if (!on) {
        ctx.moveTo(p.x, p.y);
        on = true;
      } else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }
  for (let lon = -180; lon < 180; lon += 30) {
    ctx.beginPath();
    let on = false;
    for (let lat = -80; lat <= 80; lat += 6) {
      const p = project(lat, lon, cam, cx, cy, r);
      if (p.vis <= 0.02) {
        on = false;
        continue;
      }
      if (!on) {
        ctx.moveTo(p.x, p.y);
        on = true;
      } else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }
  ctx.restore();

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(232,233,236,0.16)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  const nextHits: Hit[] = [];
  const selected = state.selectedId;

  ctx.lineWidth = 0.8;
  for (const plane of ["A", "B", "C"] as const) {
    const sample = state.sats.find((s) => s.plane === plane);
    if (!sample) continue;
    ctx.beginPath();
    let on = false;
    for (let k = 0; k <= 72; k++) {
      const u = (k / 72) * Math.PI * 2;
      const eci = satEci(sample.raan, sample.i, u);
      const mag = Math.hypot(eci.x, eci.y, eci.z) || 1;
      const lat = (Math.asin(clamp(eci.z / mag, -1, 1)) * 180) / Math.PI;
      const lon = ((((Math.atan2(eci.y, eci.x) - state.t * 7.2921159e-5) * 180) / Math.PI + 540) % 360) - 180;
      const p = project(lat, lon, cam, cx, cy, r * 1.045);
      if (p.vis <= 0) {
        on = false;
        continue;
      }
      if (!on) {
        ctx.moveTo(p.x, p.y);
        on = true;
      } else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = "rgba(200,204,212,0.18)";
    ctx.stroke();
  }

  for (const gs of state.stations) {
    const p = project(gs.lat, gs.lon, cam, cx, cy, r);
    if (p.vis <= 0.05) continue;
    ctx.fillStyle = CANVAS.gs;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "500 9px 'IBM Plex Mono', monospace";
    ctx.fillStyle = CANVAS.muted;
    ctx.fillText(gs.id.replace("GS-", ""), p.x + 5, p.y - 4);
    nextHits.push({ id: gs.id, kind: "gs", x: p.x, y: p.y, r: 8 });
  }

  for (const dc of state.dcs) {
    const p = project(dc.lat, dc.lon, cam, cx, cy, r);
    if (p.vis <= 0.05) continue;
    ctx.fillStyle = CANVAS.dc;
    ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
    ctx.font = "500 9px 'IBM Plex Mono', monospace";
    ctx.fillStyle = CANVAS.text;
    ctx.fillText(dc.short, p.x + 6, p.y + 3);
    nextHits.push({ id: dc.id, kind: "dc", x: p.x, y: p.y, r: 10 });
    if (selected === dc.id) {
      ctx.strokeStyle = CANVAS.select;
      ctx.strokeRect(p.x - 6, p.y - 6, 12, 12);
    }
  }

  for (const job of state.jobs) {
    if (!job.migratingTo) continue;
    const from = locOf(job.placement.id, state);
    const to = locOf(job.migratingTo.id, state);
    if (!from || !to) continue;
    const a = project(from.lat, from.lon, cam, cx, cy, r * 1.05);
    const b = project(to.lat, to.lon, cam, cx, cy, r * 1.05);
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - 18;
    ctx.strokeStyle = CANVAS.hop;
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo(mx, my, b.x, b.y);
    ctx.stroke();
    ctx.setLineDash([]);
    const tt = job.transferProgress;
    const px = (1 - tt) * (1 - tt) * a.x + 2 * (1 - tt) * tt * mx + tt * tt * b.x;
    const py = (1 - tt) * (1 - tt) * a.y + 2 * (1 - tt) * tt * my + tt * tt * b.y;
    ctx.fillStyle = CANVAS.hop;
    ctx.beginPath();
    ctx.arc(px, py, 3.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.font = "500 9px 'IBM Plex Mono', monospace";
  for (const sat of state.sats) {
    const p = project(sat.lat, sat.lon, cam, cx, cy, r * 1.05);
    if (p.vis <= -0.05) continue;
    const rad = selected === sat.id ? 4.4 : 3.2;
    ctx.globalAlpha = p.vis < 0 ? 0.28 : 1;
    ctx.fillStyle = sat.eclipse ? CANVAS.satEclipse : CANVAS.sat;
    ctx.beginPath();
    ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
    ctx.fill();
    if (!sat.eclipse) {
      ctx.strokeStyle = "rgba(200,204,212,0.35)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, rad + 3.5, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = CANVAS.text;
    if (p.x > 18 && p.x < w - 22 && p.y > 18 && p.y < h - 10) {
      ctx.fillText(sat.id.replace("SAT-", ""), p.x + 6, p.y - 4);
    }
    ctx.globalAlpha = 1;
    nextHits.push({ id: sat.id, kind: "sat", x: p.x, y: p.y, r: 10 });
    if (selected === sat.id) {
      ctx.strokeStyle = CANVAS.select;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  hits.current = nextHits;
}

function locOf(id: string, state: ReturnType<typeof useOwmStore.getState>) {
  const sat = state.sats.find((s) => s.id === id);
  if (sat) return { lat: sat.lat, lon: sat.lon };
  const dc = state.dcs.find((d) => d.id === id);
  if (dc) return { lat: dc.lat, lon: dc.lon };
  return null;
}
