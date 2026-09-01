import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Plus, c as ListTodo, i as RotateCcw, l as Earth, o as Play, r as SquareTerminal, s as Pause, t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1, u as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-7bf_50Mn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-fg", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16",
				r: "4.2",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "16",
				cy: "16",
				rx: "12.2",
				ry: "6.1",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.35",
				transform: "rotate(-18 16 16)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "16",
				cy: "16",
				rx: "12.2",
				ry: "6.1",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.15",
				opacity: "0.45",
				transform: "rotate(32 16 16)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "26.8",
				cy: "13.1",
				r: "1.55",
				fill: "currentColor"
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none select-none disabled:pointer-events-none disabled:opacity-40 transition-[scale,background-color,color,box-shadow,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] focus-visible:shadow-[0_0_0_2px_var(--color-bg),0_0_0_4px_var(--color-accent)]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-fg",
			outline: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] hover:bg-elevated",
			ghost: "bg-transparent text-muted hover:text-fg hover:bg-elevated",
			subtle: "bg-elevated text-fg hover:bg-accent hover:text-accent-fg"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-bg/80", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-surface p-5 text-fg shadow-[var(--shadow-border)] outline-none", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 flex size-11 items-center justify-center rounded-md text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-sans text-base font-medium tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle", "focus-visible:shadow-[0_0_0_2px_var(--color-bg),0_0_0_4px_var(--color-accent)]", "disabled:opacity-40", className),
		...props
	});
}
var PRESETS = [
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
			region: "americas"
		}
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
			region: "americas"
		}
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
			region: "global"
		}
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
			region: "global"
		}
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
			region: "eu"
		}
	}
];
var MU = 398600.4418;
var RE = 6371;
var A = 6921;
var MEAN_MOTION = Math.sqrt(MU / (A * A * A));
2 * Math.PI / MEAN_MOTION;
var OMEGA_E = 72921159e-12;
var INC_RAD = 53 * Math.PI / 180;
var SOC_MIN = .22;
var RAD_MUL = {
	low: .35,
	med: .7,
	high: 1
};
var KIND_WEIGHTS = {
	training: {
		power: .16,
		thermal: .2,
		radiation: .18,
		bandwidth: .1,
		latency: .04,
		contact: .04,
		forecast: .16,
		capacity: .12
	},
	inference: {
		power: .1,
		thermal: .1,
		radiation: .08,
		bandwidth: .14,
		latency: .28,
		contact: .1,
		forecast: .1,
		capacity: .1
	},
	edge: {
		power: .12,
		thermal: .12,
		radiation: .1,
		bandwidth: .1,
		latency: .16,
		contact: .16,
		forecast: .12,
		capacity: .12
	},
	batch: {
		power: .24,
		thermal: .14,
		radiation: .1,
		bandwidth: .08,
		latency: .04,
		contact: .04,
		forecast: .22,
		capacity: .14
	}
};
var CANVAS = {
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
	select: "#ececec"
};
var FACTOR_LABEL = {
	power: "Power",
	thermal: "Thermal",
	radiation: "Radiation",
	bandwidth: "Bandwidth",
	latency: "Latency",
	contact: "Contact",
	forecast: "Forecast",
	capacity: "Capacity"
};
function vec(x, y, z) {
	return {
		x,
		y,
		z
	};
}
function vsub(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y,
		z: a.z - b.z
	};
}
function vscale(a, s) {
	return {
		x: a.x * s,
		y: a.y * s,
		z: a.z * s
	};
}
function vdot(a, b) {
	return a.x * b.x + a.y * b.y + a.z * b.z;
}
function vmag(a) {
	return Math.hypot(a.x, a.y, a.z);
}
function vnorm(a) {
	return vscale(a, 1 / (vmag(a) || 1));
}
function clamp(n, lo = 0, hi = 1) {
	return Math.min(hi, Math.max(lo, n));
}
function wrapLon(deg) {
	let x = deg;
	while (x > 180) x -= 360;
	while (x < -180) x += 360;
	return x;
}
function wrap2pi(rad) {
	let x = rad % (Math.PI * 2);
	if (x < 0) x += Math.PI * 2;
	return x;
}
function fmtClock(t) {
	const s = Math.max(0, Math.floor(t));
	const hh = Math.floor(s / 3600);
	const mm = Math.floor(s % 3600 / 60);
	const ss = s % 60;
	return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}
function fmtUtc(t) {
	return new Date(Date.UTC(2026, 8, 1, 0, 0, 0) + t * 1e3).toISOString().slice(11, 19);
}
function padId(n, width = 4) {
	return String(n).padStart(width, "0");
}
function gmst(t) {
	return wrap2pi(OMEGA_E * t);
}
function sunEci() {
	return vec(1, 0, 0);
}
function satEci(raan, i, u, a = A) {
	const cu = Math.cos(u);
	const su = Math.sin(u);
	const ci = Math.cos(i);
	const si = Math.sin(i);
	const cO = Math.cos(raan);
	const sO = Math.sin(raan);
	return vec(a * (cO * cu - sO * su * ci), a * (sO * cu + cO * su * ci), a * (su * si));
}
function latLonFromEci(eci, t) {
	const r = vmag(eci) || 1;
	return {
		lat: Math.asin(clamp(eci.z / r, -1, 1)) * 180 / Math.PI,
		lon: wrapLon((Math.atan2(eci.y, eci.x) - gmst(t)) * 180 / Math.PI)
	};
}
function eciFromLatLon(lat, lon, t, r = RE) {
	const φ = lat * Math.PI / 180;
	const λ = lon * Math.PI / 180 + gmst(t);
	const cφ = Math.cos(φ);
	return vec(r * cφ * Math.cos(λ), r * cφ * Math.sin(λ), r * Math.sin(φ));
}
function inEclipse(eci, sun = sunEci()) {
	const rdot = vdot(eci, sun);
	if (rdot >= 0) return false;
	return vdot(eci, eci) - rdot * rdot < RE * RE;
}
function losClear(a, b, padKm = 80) {
	const d = vsub(b, a);
	const dd = vdot(d, d) || 1;
	const tt = clamp(-vdot(a, d) / dd, 0, 1);
	return vmag(vec(a.x + d.x * tt, a.y + d.y * tt, a.z + d.z * tt)) > RE + padKm;
}
function elevationDeg(sat, gs) {
	const look = vsub(sat, gs);
	const zen = vnorm(gs);
	const c = clamp(vdot(vnorm(look), zen), -1, 1);
	return Math.asin(c) * 180 / Math.PI;
}
function radiationAt(lat, lon) {
	const saaLat = -24;
	const saaLon = -45;
	const dlat = (lat - saaLat) / 18;
	const dlon = (lon - saaLon) / 32;
	const saa = Math.exp(-(dlat * dlat + dlon * dlon));
	const polar = clamp((Math.abs(lat) - 52) / 28);
	return clamp(saa * .92 + polar * .7);
}
function timeToEclipse(sat) {
	if (sat.eclipse) return 0;
	const sun = sunEci();
	const step = Math.PI / 180;
	for (let k = 1; k <= 360; k++) if (inEclipse(satEci(sat.raan, sat.i, sat.u + step * k), sun)) return step * k / MEAN_MOTION;
	return null;
}
function eclipseHold(sat) {
	const sun = sunEci();
	const startU = sat.eclipse ? sat.u : sat.u + (sat.timeToEclipseS ?? 0) * MEAN_MOTION;
	const step = Math.PI / 180;
	let hold = 0;
	for (let k = 0; k <= 200; k++) {
		const eci = satEci(sat.raan, sat.i, startU + step * k);
		if (!inEclipse(eci, sun) && k > 0) break;
		if (inEclipse(eci, sun)) hold += step / MEAN_MOTION;
	}
	return hold;
}
function projectSoc(sat, loadTflops, horizonS) {
	const pSolar = 6.4;
	const pIdle = .38;
	const pLoad = .045 * loadTflops;
	const cap = 4.8;
	const sun = sunEci();
	let soc = sat.soc;
	let u = sat.u;
	const dt = 20;
	for (let t = 0; t < horizonS; t += dt) {
		const dKwh = ((inEclipse(satEci(sat.raan, sat.i, u), sun) ? 0 : pSolar) - pIdle - pLoad) * (dt / 3600);
		soc = clamp(soc + dKwh / cap);
		u += MEAN_MOTION * dt;
	}
	return soc;
}
function refreshSat(sat, t, dt, peers, stations, loadTflops) {
	const u = wrap2pi(sat.u + MEAN_MOTION * dt);
	const eci = satEci(sat.raan, sat.i, u);
	const { lat, lon } = latLonFromEci(eci, t);
	const eclipse = inEclipse(eci, sunEci());
	const solar = eclipse ? 0 : 1;
	const pIn = solar * 6.4;
	const pOut = .38 + .045 * loadTflops;
	const soc = clamp(sat.soc + (pIn - pOut) * (dt / 3600) / 4.8);
	const tEq = eclipse ? -26 : 17;
	const tau = eclipse ? 920 : 640;
	const heat = loadTflops * .11;
	const tempC = sat.tempC + (tEq + heat - sat.tempC) / tau * dt;
	const rad = radiationAt(lat, lon);
	let bestPeer = null;
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
	const islGbps = bestPeer ? clamp(18 * (1400 / Math.max(bestRange, 400)) ** 1.15, .4, 22) : 0;
	const contact = [];
	for (const gs of stations) if (elevationDeg(eci, eciFromLatLon(gs.lat, gs.lon, t)) >= 10) contact.push(gs.id);
	const next = {
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
		altKm: 550,
		timeToEclipseS: null,
		eclipseHoldS: 0
	};
	next.timeToEclipseS = timeToEclipse(next);
	next.eclipseHoldS = eclipseHold(next);
	return next;
}
function bootstrapSat(id, plane, slot, raan, u0) {
	return {
		id,
		plane,
		slot,
		i: INC_RAD,
		raan,
		u: u0,
		altKm: 550,
		lat: 0,
		lon: 0,
		eci: satEci(raan, INC_RAD, u0),
		eclipse: false,
		solar: 1,
		soc: .72,
		tempC: 8,
		rad: .05,
		islGbps: 10,
		islPeer: null,
		contact: [],
		loadTflops: 0,
		capacityTflops: 48,
		timeToEclipseS: null,
		eclipseHoldS: 0
	};
}
function thermalMargin(tempC) {
	return 46 - tempC;
}
function nodeLatencyMs(kind, contactCount, region, dcId) {
	if (kind === "dc") {
		if (region === "global") return 18;
		if (region === "americas" && dcId === "DC-MEM") return 14;
		if (region === "eu" && dcId === "DC-FRA") return 12;
		if (region === "apac" && dcId === "DC-SIN") return 13;
		return 38;
	}
	return contactCount > 0 ? 16 : 44;
}
var STATIONS = [
	{
		id: "GS-RDM",
		name: "Redmond",
		lat: 47.67,
		lon: -122.12
	},
	{
		id: "GS-HTH",
		name: "Hawthorne",
		lat: 33.92,
		lon: -118.33
	},
	{
		id: "GS-STB",
		name: "Starbase",
		lat: 25.99,
		lon: -97.16
	},
	{
		id: "GS-MLD",
		name: "Malindi",
		lat: -2.99,
		lon: 40.19
	},
	{
		id: "GS-TRO",
		name: "Tromsø",
		lat: 69.65,
		lon: 18.96
	}
];
var DATACENTERS = [
	{
		id: "DC-MEM",
		name: "Memphis",
		short: "MEM",
		lat: 35.15,
		lon: -90.05,
		capacityTflops: 420,
		loadTflops: 0
	},
	{
		id: "DC-FRA",
		name: "Frankfurt",
		short: "FRA",
		lat: 50.11,
		lon: 8.68,
		capacityTflops: 420,
		loadTflops: 0
	},
	{
		id: "DC-SIN",
		name: "Singapore",
		short: "SIN",
		lat: 1.35,
		lon: 103.82,
		capacityTflops: 420,
		loadTflops: 0
	}
];
var PLANES = [
	{
		id: "A",
		raan: 0,
		phase: .18
	},
	{
		id: "B",
		raan: 2 * Math.PI / 3,
		phase: 1.1
	},
	{
		id: "C",
		raan: 4 * Math.PI / 3,
		phase: 2.05
	}
];
function createConstellation() {
	const sats = [];
	let n = 1;
	for (const plane of PLANES) for (let slot = 0; slot < 4; slot++) {
		const u0 = plane.phase + slot * (Math.PI / 2);
		const id = `SAT-${String(n).padStart(2, "0")}`;
		sats.push(bootstrapSat(id, plane.id, slot, plane.raan, u0));
		n += 1;
	}
	return tickConstellation(sats, 0, 0, /* @__PURE__ */ new Map());
}
function tickConstellation(sats, t, dt, loads) {
	const primed = sats.map((s) => refreshSat(s, t, dt, sats, STATIONS, loads.get(s.id) ?? 0));
	return primed.map((s) => refreshSat(s, t, 0, primed, STATIONS, loads.get(s.id) ?? 0));
}
function createDatacenters() {
	return DATACENTERS.map((d) => ({
		...d,
		loadTflops: 0
	}));
}
function nodeLoad(jobs, id) {
	let n = 0;
	for (const j of jobs) {
		if (j.done || j.held) continue;
		if ((j.migratingTo ? j.placement : j.placement).id === id) n += j.demandTflops;
	}
	return n;
}
function pathGbps(from, to, sats) {
	if (from.id === to.id) return 40;
	const a = sats.find((s) => s.id === from.id);
	const b = sats.find((s) => s.id === to.id);
	if (from.kind === "dc" && to.kind === "dc") return 48;
	if (a && b) return Math.min(a.islGbps, b.islGbps) * .85;
	const sat = a ?? b;
	if (!sat) return 8;
	return sat.contact.length > 0 ? 3.2 : .55;
}
function transferSeconds(job, from, to, sats) {
	const gbps = Math.max(.2, pathGbps(from, to, sats));
	const raw = job.payloadGb * 8 / gbps;
	return Math.min(360, Math.max(70, raw / 8));
}
function scoreSat(job, sat, jobs, policy) {
	const load = nodeLoad(jobs, sat.id) - (job.placement.id === sat.id ? job.demandTflops : 0);
	const cap = sat.capacityTflops;
	const head = clamp(1 - (load + job.demandTflops * .25) / cap);
	const power = clamp(sat.soc * (.42 + .58 * sat.solar));
	const thermal = clamp(thermalMargin(sat.tempC) / 40);
	const radiation = clamp(1 - sat.rad * RAD_MUL[job.rad]);
	const bandwidth = clamp(sat.islGbps / 18);
	const lat = nodeLatencyMs("sat", sat.contact.length, job.region);
	const latency = lat <= job.slaMs ? 1 : clamp(job.slaMs / lat);
	const contact = sat.contact.length > 0 ? 1 : job.kind === "batch" ? .55 : .2;
	const horizon = Math.max(sat.timeToEclipseS ?? 0, 1) + sat.eclipseHoldS;
	const projected = projectSoc(sat, load + job.demandTflops, Math.min(horizon, 2100));
	const forecast = sat.eclipse ? clamp(sat.soc * .5) : projected < .22 ? clamp(projected / SOC_MIN) : .75 + .25 * sat.solar;
	let policyMul = 1;
	if (policy === "earth-anchor" && (job.kind === "training" || job.kind === "batch")) policyMul = .62;
	if (policy === "max-orbital") policyMul = 1.08;
	if (job.kind === "edge") policyMul *= 1.15;
	const factors = {
		power,
		thermal,
		radiation,
		bandwidth,
		latency,
		contact,
		forecast,
		capacity: head
	};
	const w = KIND_WEIGHTS[job.kind];
	let total = 0;
	for (const k of Object.keys(w)) total += factors[k] * w[k];
	total *= policyMul;
	if (sat.tempC > 42) total *= .45;
	if (sat.soc < .22) total *= .3;
	if (job.rad === "high" && sat.rad > .55) total *= .2;
	const reasons = [];
	if (sat.eclipse) reasons.push("in umbra");
	else if (sat.timeToEclipseS != null && sat.timeToEclipseS < 420) reasons.push(`eclipse in ${(sat.timeToEclipseS / 60).toFixed(1)} min`);
	if (sat.solar > 0) reasons.push("sunlit");
	if (projected < .22) reasons.push(`projected SOC ${(projected * 100).toFixed(0)}%`);
	if (sat.rad > .5) reasons.push("elevated radiation");
	if (sat.contact.length) reasons.push(`GS ${sat.contact[0]}`);
	if (thermal < .35) reasons.push(`thermal ${thermalMargin(sat.tempC).toFixed(0)}°C`);
	return {
		nodeId: sat.id,
		kind: "sat",
		total: clamp(total),
		factors,
		reasons
	};
}
function scoreDc(job, dc, jobs, policy) {
	const load = nodeLoad(jobs, dc.id) - (job.placement.id === dc.id ? job.demandTflops : 0);
	const head = clamp(1 - (load + job.demandTflops * .15) / dc.capacityTflops);
	const lat = nodeLatencyMs("dc", 2, job.region, dc.id);
	const factors = {
		power: 1,
		thermal: .96,
		radiation: 1,
		bandwidth: .95,
		latency: lat <= job.slaMs ? 1 : clamp(job.slaMs / lat),
		contact: 1,
		forecast: .9,
		capacity: head
	};
	const w = KIND_WEIGHTS[job.kind];
	let total = 0;
	for (const k of Object.keys(w)) total += factors[k] * w[k];
	if (policy === "max-orbital") total *= .72;
	if (policy === "earth-anchor" && job.kind !== "edge") total *= 1.12;
	if (job.kind === "edge") total *= .08;
	if (job.kind === "training") total *= 1.06;
	const reasons = [
		"firm power",
		"zero radiation",
		`lat ${lat.toFixed(0)}ms`,
		`${Math.max(0, dc.capacityTflops - load).toFixed(0)} TFLOPS free`
	];
	return {
		nodeId: dc.id,
		kind: "dc",
		total: clamp(total),
		factors,
		reasons
	};
}
function scoreJob(job, sats, dcs, jobs, policy) {
	const rows = [];
	for (const s of sats) rows.push(scoreSat(job, s, jobs, policy));
	for (const d of dcs) rows.push(scoreDc(job, d, jobs, policy));
	rows.sort((a, b) => b.total - a.total);
	return rows;
}
function decidePlacement(job, sats, dcs, jobs, policy) {
	const ranked = scoreJob(job, sats, dcs, jobs, policy);
	const current = ranked.find((r) => r.nodeId === job.placement.id) ?? ranked[ranked.length - 1];
	const best = ranked[0];
	if (job.held || job.pinned || job.done || job.migratingTo) return {
		stay: true,
		best: current,
		current,
		ranked
	};
	const transferPen = Math.min(.18, transferSeconds(job, job.placement, {
		kind: best.kind,
		id: best.nodeId
	}, sats) / 900);
	return {
		stay: best.nodeId === job.placement.id || current.total + .09 + transferPen >= best.total,
		best,
		current,
		ranked
	};
}
function placementOf(id, sats, dcs) {
	if (sats.some((s) => s.id === id)) return {
		kind: "sat",
		id
	};
	if (dcs.some((d) => d.id === id)) return {
		kind: "dc",
		id
	};
	return null;
}
function defaultPlacement(kind, sats, dcs) {
	if (kind === "edge") return {
		kind: "sat",
		id: (sats.find((s) => !s.eclipse) ?? sats[0]).id
	};
	if (kind === "training") return {
		kind: "dc",
		id: "DC-MEM"
	};
	return {
		kind: "sat",
		id: (sats.find((s) => !s.eclipse && s.soc > .4) ?? sats[0]).id
	};
}
function jobDuration(kind) {
	if (kind === "training") return 5520;
	if (kind === "batch") return 2280;
	return null;
}
function loadsFrom(jobs) {
	const m = /* @__PURE__ */ new Map();
	for (const j of jobs) {
		if (j.done) continue;
		const id = j.placement.id;
		m.set(id, (m.get(id) ?? 0) + j.demandTflops);
	}
	return m;
}
function applyLoads(state) {
	const loads = loadsFrom(state.jobs);
	return {
		sats: state.sats.map((s) => ({
			...s,
			loadTflops: loads.get(s.id) ?? 0,
			capacityTflops: 48
		})),
		dcs: state.dcs.map((d) => ({
			...d,
			loadTflops: loads.get(d.id) ?? 0
		}))
	};
}
function pushLog(state, partial) {
	const logSeq = state.logSeq + 1;
	const item = {
		id: `EVT-${padId(logSeq)}`,
		t: state.t,
		utc: fmtUtc(state.t),
		...partial
	};
	return {
		...state,
		logSeq,
		logs: [item, ...state.logs].slice(0, 180)
	};
}
function makeJob(spec, seq, t, placement) {
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
		lastReasons: []
	};
}
function seedJobs(sats, t) {
	const nightBound = [...sats].sort((a, b) => {
		return (a.timeToEclipseS ?? 9e9) - (b.timeToEclipseS ?? 9e9);
	}).find((s) => (s.timeToEclipseS ?? 0) > 180) ?? sats[0];
	const sunlit = sats.find((s) => !s.eclipse && s.id !== nightBound.id) ?? sats[1];
	const sunlit2 = sats.find((s) => !s.eclipse && s.id !== nightBound.id && s.id !== sunlit.id) ?? sats[2];
	const jobs = [
		{
			spec: { ...PRESETS[0].spec },
			place: {
				kind: "dc",
				id: "DC-MEM"
			}
		},
		{
			spec: { ...PRESETS[1].spec },
			place: {
				kind: "sat",
				id: sunlit.id
			}
		},
		{
			spec: {
				...PRESETS[2].spec,
				pinTo: sunlit2.id
			},
			place: {
				kind: "sat",
				id: sunlit2.id
			}
		},
		{
			spec: { ...PRESETS[3].spec },
			place: {
				kind: "sat",
				id: nightBound.id
			}
		},
		{
			spec: { ...PRESETS[4].spec },
			place: {
				kind: "dc",
				id: "DC-FRA"
			}
		}
	].map((row, i) => {
		const job = makeJob(row.spec, i + 1, t, row.place);
		if (row.spec.kind === "batch") {
			const sat = sats.find((s) => s.id === row.place.id);
			if (sat) sat.soc = Math.min(sat.soc, .31);
		}
		return job;
	});
	return {
		jobs,
		seq: jobs.length
	};
}
function initialState() {
	let sats = createConstellation();
	const dcs = createDatacenters();
	const seeded = seedJobs(sats, 0);
	const loaded = applyLoads({
		sats,
		dcs,
		jobs: seeded.jobs
	});
	sats = tickConstellation(loaded.sats, 0, 0, loadsFrom(seeded.jobs));
	const jobs = seeded.jobs;
	const batch = jobs.find((j) => j.kind === "batch");
	if (batch) sats = sats.map((s) => s.id === batch.placement.id ? {
		...s,
		soc: Math.min(s.soc, .3)
	} : s);
	return {
		t: 0,
		speed: 4,
		policy: "sunlit-first",
		sats,
		stations: STATIONS,
		dcs: loaded.dcs,
		jobs,
		logs: [{
			id: "EVT-0001",
			t: 0,
			utc: fmtUtc(0),
			level: "info",
			title: "scheduler live",
			detail: "SUNLIT-FIRST · 12 LEO-550 nodes · 3 planes · 5 jobs ingested"
		}],
		selectedId: jobs[3]?.id ?? jobs[0]?.id ?? null,
		selectedKind: "job",
		view: "map",
		jobSeq: seeded.seq,
		logSeq: 1,
		lastScores: {}
	};
}
var useOwmStore = create()((set, get) => ({
	...initialState(),
	tick: (realDt) => {
		const cur = get();
		if (cur.speed === 0) return;
		const dt = Math.min(8, realDt * 28 * cur.speed);
		const t = cur.t + dt;
		let jobs = cur.jobs.map((j) => ({ ...j }));
		let logs = cur.logs;
		let logSeq = cur.logSeq;
		const lastScores = { ...cur.lastScores };
		const note = (partial) => {
			logSeq += 1;
			logs = [{
				id: `EVT-${padId(logSeq)}`,
				t,
				utc: fmtUtc(t),
				...partial
			}, ...logs].slice(0, 180);
		};
		const loads = loadsFrom(jobs);
		let sats = tickConstellation(cur.sats, t, dt, loads);
		for (const sat of sats) {
			const prev = cur.sats.find((s) => s.id === sat.id);
			if (!prev) continue;
			if (!prev.eclipse && sat.eclipse) note({
				level: "warn",
				title: `${sat.id} entered eclipse`,
				detail: `SOC ${(sat.soc * 100).toFixed(0)}% · T ${sat.tempC.toFixed(0)}°C · umbra ${Math.round(sat.eclipseHoldS / 60)} min`
			});
			if (prev.eclipse && !sat.eclipse) note({
				level: "info",
				title: `${sat.id} sunlit`,
				detail: `solar restored · SOC ${(sat.soc * 100).toFixed(0)}%`
			});
			if (prev.rad < .55 && sat.rad >= .55) note({
				level: "warn",
				title: `${sat.id} radiation spike`,
				detail: `flux ${sat.rad.toFixed(2)} · SAA or polar horn`
			});
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
						toId: job.placement.id
					});
				}
			} else {
				const host = sats.find((s) => s.id === job.placement.id) ?? cur.dcs.find((d) => d.id === job.placement.id);
				const cap = host && "capacityTflops" in host ? host.capacityTflops : 48;
				const load = loads.get(job.placement.id) ?? job.demandTflops;
				const rate = Math.min(1, cap / Math.max(load, 1)) * (job.placement.kind === "sat" && sats.find((s) => s.id === job.placement.id)?.eclipse ? .82 : 1);
				const dur = jobDuration(job.kind);
				if (dur) {
					job.progress = Math.min(1, job.progress + rate * dt / dur);
					if (job.progress >= 1) {
						job.done = true;
						job.progress = 1;
						note({
							level: "info",
							title: `${job.id} complete`,
							detail: `${job.name} finished on ${job.placement.id}`,
							jobId: job.id
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
				const dest = {
					kind: decision.best.kind,
					id: decision.best.nodeId
				};
				job.migratingTo = dest;
				job.transferProgress = .02;
				const scores = decision.ranked.slice(0, 4).map((r) => ({
					id: r.nodeId,
					score: r.total
				}));
				note({
					level: "move",
					title: `${job.id} hopping ${job.placement.id} → ${dest.id}`,
					detail: `${decision.best.reasons.slice(0, 2).join(" · ") || "better score"} · Δ ${(decision.best.total - decision.current.total).toFixed(2)}`,
					jobId: job.id,
					fromId: job.placement.id,
					toId: dest.id,
					scores
				});
			}
		}
		const applied = applyLoads({
			sats,
			dcs: cur.dcs,
			jobs
		});
		sats = applied.sats;
		set({
			t,
			sats,
			dcs: applied.dcs,
			jobs,
			logs,
			logSeq,
			lastScores
		});
	},
	setSpeed: (speed) => set({ speed }),
	setPolicy: (policy) => set((s) => pushLog({
		...s,
		policy
	}, {
		level: "info",
		title: `policy ${policy}`,
		detail: "live rescoring on next tick"
	})),
	setView: (view) => set({ view }),
	select: (id, kind) => set({
		selectedId: id,
		selectedKind: kind
	}),
	submitJob: (spec) => {
		const s = get();
		if (s.jobs.filter((j) => !j.done).length >= 14) return {
			ok: false,
			message: `job cap 14`
		};
		const pin = spec.pinTo ? placementOf(spec.pinTo, s.sats, s.dcs) : null;
		const placement = pin ?? defaultPlacement(spec.kind, s.sats, s.dcs);
		const jobSeq = s.jobSeq + 1;
		const job = makeJob({
			...spec,
			pinTo: pin?.id
		}, jobSeq, s.t, placement);
		set((st) => {
			const jobs = [job, ...st.jobs];
			const applied = applyLoads({
				sats: st.sats,
				dcs: st.dcs,
				jobs
			});
			return pushLog({
				...st,
				jobSeq,
				jobs,
				sats: applied.sats,
				dcs: applied.dcs,
				selectedId: job.id,
				selectedKind: "job"
			}, {
				level: "info",
				title: `${job.id} ingested`,
				detail: `${job.kind} ${job.name} · ${job.demandTflops} TFLOPS · placed ${job.placement.id}`,
				jobId: job.id,
				toId: job.placement.id
			});
		});
		return {
			ok: true,
			message: `${job.id} placed on ${job.placement.id}`,
			job
		};
	},
	forceMigrate: (jobId, toId) => {
		const s = get();
		const job = s.jobs.find((j) => j.id === jobId.toUpperCase() || j.name === jobId);
		if (!job) return {
			ok: false,
			message: `no job ${jobId}`
		};
		if (job.done) return {
			ok: false,
			message: `${job.id} already complete`
		};
		const dest = placementOf(toId.toUpperCase(), s.sats, s.dcs);
		if (!dest) return {
			ok: false,
			message: `no node ${toId}`
		};
		if (dest.id === job.placement.id && !job.migratingTo) return {
			ok: false,
			message: `${job.id} already on ${dest.id}`
		};
		set((st) => {
			const jobs = st.jobs.map((j) => j.id === job.id ? {
				...j,
				migratingTo: dest,
				transferProgress: .02,
				held: false
			} : j);
			return pushLog({
				...st,
				jobs
			}, {
				level: "move",
				title: `${job.id} operator hop ${job.placement.id} → ${dest.id}`,
				detail: "forced — hysteresis bypassed",
				jobId: job.id,
				fromId: job.placement.id,
				toId: dest.id
			});
		});
		return {
			ok: true,
			message: `${job.id} hopping to ${dest.id}`
		};
	},
	holdJob: (jobId, held) => {
		const job = get().jobs.find((j) => j.id === jobId.toUpperCase() || j.name === jobId);
		if (!job) return {
			ok: false,
			message: `no job ${jobId}`
		};
		set((st) => {
			const jobs = st.jobs.map((j) => j.id === job.id ? {
				...j,
				held
			} : j);
			return pushLog({
				...st,
				jobs
			}, {
				level: "info",
				title: `${job.id} ${held ? "held" : "released"}`,
				detail: held ? "frozen on current node" : "scheduler resumed",
				jobId: job.id
			});
		});
		return {
			ok: true,
			message: `${job.id} ${held ? "held" : "released"}`
		};
	},
	reset: () => set(initialState())
}));
var KINDS$1 = [
	"training",
	"inference",
	"edge",
	"batch"
];
var RADS$1 = [
	"low",
	"med",
	"high"
];
function SubmitDialog() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [spec, setSpec] = (0, import_react.useState)({
		name: "new-workload",
		kind: "inference",
		demandTflops: 24,
		payloadGb: 16,
		slaMs: 25,
		rad: "med",
		region: "global"
	});
	const submitJob = useOwmStore((s) => s.submitJob);
	const apply = (next) => setSpec((s) => ({
		...s,
		...next
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				className: "gap-1.5 pl-3 pr-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Ingest"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Ingest job" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
				className: "mt-1",
				children: "Scheduler places it live. Pin only if the workload must not hop."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-1.5",
				children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSpec({ ...p.spec }),
					className: "h-9 rounded-md px-2.5 font-mono text-[10px] text-muted uppercase shadow-[var(--shadow-border)] hover:text-fg",
					children: p.label
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 space-y-3",
				onSubmit: (e) => {
					e.preventDefault();
					submitJob(spec);
					setOpen(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: spec.name,
							onChange: (e) => apply({ name: e.target.value }),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Kind",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: spec.kind,
								onChange: (e) => apply({ kind: e.target.value }),
								className: "h-11 w-full rounded-md bg-elevated px-3 text-sm shadow-[var(--shadow-border)]",
								children: KINDS$1.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: k,
									children: k
								}, k))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Radiation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: spec.rad,
								onChange: (e) => apply({ rad: e.target.value }),
								className: "h-11 w-full rounded-md bg-elevated px-3 text-sm shadow-[var(--shadow-border)]",
								children: RADS$1.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: k,
									children: k
								}, k))
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "TFLOPS",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 1,
									value: spec.demandTflops,
									onChange: (e) => apply({ demandTflops: Number(e.target.value) })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Payload GB",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 1,
									value: spec.payloadGb,
									onChange: (e) => apply({ payloadGb: Number(e.target.value) })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "SLA ms",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 4,
									value: spec.slaMs,
									onChange: (e) => apply({ slaMs: Number(e.target.value) })
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Pin (optional)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "SAT-03 or DC-MEM",
							value: spec.pinTo ?? "",
							onChange: (e) => apply({ pinTo: e.target.value || void 0 })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => setOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Submit"
						})]
					})
				]
			})
		] })]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cn("block"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block font-mono text-[10px] tracking-[0.14em] text-muted uppercase",
			children: label
		}), children]
	});
}
var SPEEDS$1 = [
	1,
	4,
	16
];
function AppHeader() {
	const speed = useOwmStore((s) => s.speed);
	const setSpeed = useOwmStore((s) => s.setSpeed);
	const t = useOwmStore((s) => s.t);
	const policy = useOwmStore((s) => s.policy);
	const setPolicy = useOwmStore((s) => s.setPolicy);
	const sats = useOwmStore((s) => s.sats);
	const reset = useOwmStore((s) => s.reset);
	const sunlit = sats.filter((s) => !s.eclipse).length;
	const hops = useOwmStore((s) => s.jobs.filter((j) => j.migratingTo).length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex items-center gap-2 border-b border-border px-3 py-1.5 sm:gap-3 sm:px-4 sm:py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-7 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.18em] text-fg uppercase",
						children: "OWM"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden truncate text-[11px] text-muted sm:block",
						children: "Orbital Workload Migrator"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 items-center justify-end gap-2 sm:justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center rounded-md bg-elevated p-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						"aria-label": speed === 0 ? "Resume" : "Pause",
						onClick: () => setSpeed(speed === 0 ? 4 : 0),
						children: speed === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" })
					}), SPEEDS$1.map((sp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSpeed(sp),
						className: cn("h-11 min-w-11 rounded-sm px-2 font-mono text-[11px] tabular", speed === sp ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
						children: [sp, "x"]
					}, sp))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-3 font-mono text-[11px] text-muted tabular lg:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["T+ ", fmtClock(t)] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["UTC ", fmtUtc(t)] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							sunlit,
							"/",
							sats.length,
							" sun"
						] }),
						hops > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-info",
							children: [hops, " hop"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: "owm-policy",
						children: "Policy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: "owm-policy",
						value: policy,
						onChange: (e) => setPolicy(e.target.value),
						className: "hidden h-11 rounded-md bg-elevated px-2 font-mono text-[11px] text-fg shadow-[var(--shadow-border)] outline-none sm:block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "sunlit-first",
								children: "sunlit-first"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "earth-anchor",
								children: "earth-anchor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "max-orbital",
								children: "max-orbital"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitDialog, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon-sm",
						"aria-label": "Reset constellation",
						onClick: () => reset(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" })
					})
				]
			})
		]
	});
}
var badgeVariants = cva("inline-flex items-center rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide tabular", {
	variants: { tone: {
		mute: "bg-elevated text-muted",
		ok: "bg-ok/15 text-ok",
		warn: "bg-warn/15 text-warn",
		crit: "bg-crit/15 text-crit",
		info: "bg-info/15 text-info",
		fg: "bg-fg/10 text-fg"
	} },
	defaultVariants: { tone: "mute" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({
			tone,
			className
		})),
		...props
	});
}
function toneFor(job) {
	if (job.done) return "mute";
	if (job.migratingTo) return "info";
	if (job.held) return "warn";
	return "ok";
}
function stateLabel(job) {
	if (job.done) return "done";
	if (job.migratingTo) return "hop";
	if (job.held) return "hold";
	if (job.pinned) return "pin";
	return "run";
}
function JobBoard() {
	const jobs = useOwmStore((s) => s.jobs);
	const selectedId = useOwmStore((s) => s.selectedId);
	const select = useOwmStore((s) => s.select);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between px-4 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-mono text-[10px] tracking-[0.16em] text-muted uppercase",
				children: "Workloads"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-[10px] text-subtle tabular",
				children: [jobs.filter((j) => !j.done).length, " live"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "min-h-0 flex-1 space-y-1 overflow-y-auto px-2 pb-2",
			children: jobs.map((job) => {
				const active = selectedId === job.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => select(job.id, "job"),
					className: cn("flex w-full flex-col gap-1 rounded-md px-3 py-2.5 text-left transition-[background-color,box-shadow] duration-150", active ? "bg-elevated shadow-[var(--shadow-border)]" : "hover:bg-elevated/70"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] text-muted tabular",
									children: job.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 truncate text-sm text-fg",
									children: job.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: toneFor(job),
									children: stateLabel(job)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 font-mono text-[10px] text-muted tabular",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "uppercase",
									children: job.kind
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: job.migratingTo ? `${job.placement.id} → ${job.migratingTo.id}` : job.placement.id }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-auto",
									children: [job.demandTflops, " TF"]
								})
							]
						}),
						job.migratingTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-0.5 overflow-hidden rounded-full bg-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-info transition-[width] duration-150",
								style: { width: `${Math.round(job.transferProgress * 100)}%` }
							})
						}) : job.kind === "training" || job.kind === "batch" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-0.5 overflow-hidden rounded-full bg-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-fg/50",
								style: { width: `${Math.round(job.progress * 100)}%` }
							})
						}) : null
					]
				}) }, job.id);
			})
		})]
	});
}
/** Compact lon/lat rings for an operator globe — recognisable, not cartographic. */
var LAND = [
	[
		[-168, 63],
		[-153, 71],
		[-141, 69],
		[-130, 70],
		[-127, 54],
		[-124, 48],
		[-124, 40],
		[-117, 33],
		[-110, 24],
		[-97, 16],
		[-90, 29],
		[-84, 30],
		[-81, 25],
		[-80, 31],
		[-75, 35],
		[-66, 44],
		[-60, 47],
		[-56, 51],
		[-64, 60],
		[-78, 62],
		[-88, 74],
		[-120, 74],
		[-141, 70],
		[-168, 63]
	],
	[
		[-73, 78],
		[-60, 82],
		[-29, 83],
		[-20, 74],
		[-22, 70],
		[-44, 60],
		[-52, 64],
		[-68, 76],
		[-73, 78]
	],
	[
		[-81, 2],
		[-77, 7],
		[-70, 12],
		[-60, 8],
		[-50, 0],
		[-35, -7],
		[-38, -15],
		[-40, -22],
		[-48, -28],
		[-53, -34],
		[-68, -55],
		[-75, -48],
		[-71, -30],
		[-76, -14],
		[-81, -5],
		[-81, 2]
	],
	[
		[-17, 15],
		[-10, 32],
		[-5, 36],
		[10, 37],
		[12, 32],
		[32, 31],
		[44, 12],
		[51, 12],
		[43, -11],
		[40, -15],
		[32, -29],
		[19, -35],
		[18, -28],
		[12, -17],
		[8, 4],
		[-5, 5],
		[-17, 12],
		[-17, 15]
	],
	[
		[-10, 52],
		[-9, 43],
		[-1, 43],
		[3, 42],
		[10, 36],
		[16, 41],
		[29, 41],
		[30, 46],
		[24, 60],
		[12, 58],
		[5, 61],
		[-5, 58],
		[-10, 52]
	],
	[
		[-8, 54],
		[-6, 58],
		[-2, 58],
		[1, 52],
		[-5, 50],
		[-8, 54]
	],
	[
		[28, 41],
		[36, 36],
		[44, 40],
		[60, 37],
		[67, 25],
		[74, 10],
		[80, 6],
		[80, 16],
		[88, 22],
		[97, 16],
		[104, 3],
		[109, 20],
		[122, 30],
		[122, 41],
		[130, 43],
		[142, 46],
		[142, 53],
		[163, 66],
		[180, 70],
		[140, 75],
		[80, 73],
		[44, 66],
		[40, 60],
		[30, 60],
		[28, 41]
	],
	[
		[68, 24],
		[72, 21],
		[77, 8],
		[80, 10],
		[88, 22],
		[78, 32],
		[70, 28],
		[68, 24]
	],
	[
		[131, 31],
		[135, 34],
		[141, 38],
		[145, 43],
		[141, 45],
		[131, 34],
		[131, 31]
	],
	[
		[114, -22],
		[126, -14],
		[136, -12],
		[146, -16],
		[153, -25],
		[150, -38],
		[137, -36],
		[115, -34],
		[114, -22]
	],
	[
		[166, -41],
		[176, -38],
		[178, -46],
		[167, -46],
		[166, -41]
	],
	[
		[-180, -72],
		[-90, -66],
		[0, -70],
		[90, -68],
		[180, -72],
		[180, -90],
		[-180, -90],
		[-180, -72]
	]
];
/** South Atlantic Anomaly outline, lon/lat. */
var SAA = [
	[-80, -5],
	[-70, 2],
	[-40, 5],
	[-10, -8],
	[10, -20],
	[0, -40],
	[-30, -50],
	[-60, -45],
	[-80, -20],
	[-80, -5]
];
function project(lat, lon, cam, cx, cy, r) {
	const φ = lat * Math.PI / 180;
	const λ = (lon - cam.lon0) * Math.PI / 180;
	const φ0 = cam.lat0 * Math.PI / 180;
	const cosc = Math.sin(φ0) * Math.sin(φ) + Math.cos(φ0) * Math.cos(φ) * Math.cos(λ);
	const x = r * Math.cos(φ) * Math.sin(λ);
	const y = r * (Math.cos(φ0) * Math.sin(φ) - Math.sin(φ0) * Math.cos(φ) * Math.cos(λ));
	return {
		x: cx + x,
		y: cy - y,
		vis: cosc
	};
}
function sunLon(t) {
	return -(t * 72921159e-12 * 180 / Math.PI);
}
function OrbitalMap() {
	const canvasRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const cam = (0, import_react.useRef)({
		lon0: -40,
		lat0: 18
	});
	const drag = (0, import_react.useRef)(null);
	const hits = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
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
	const onPointerDown = (e) => {
		const rect = canvasRef.current?.getBoundingClientRect();
		if (!rect) return;
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const hit = hits.current.find((h) => Math.hypot(h.x - x, h.y - y) <= h.r + 6);
		if (hit) {
			useOwmStore.getState().select(hit.id, hit.kind);
			return;
		}
		e.target.setPointerCapture(e.pointerId);
		drag.current = {
			x: e.clientX,
			y: e.clientY,
			lon0: cam.current.lon0,
			lat0: cam.current.lat0
		};
	};
	const onPointerMove = (e) => {
		if (!drag.current) return;
		cam.current.lon0 = drag.current.lon0 - (e.clientX - drag.current.x) * .35;
		cam.current.lat0 = clamp(drag.current.lat0 + (e.clientY - drag.current.y) * .22, -66, 66);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: "relative h-full min-h-64 w-full overflow-hidden bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "block size-full touch-none",
			onPointerDown,
			onPointerMove,
			onPointerUp: () => {
				drag.current = null;
			},
			onPointerCancel: () => {
				drag.current = null;
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute top-3 left-3 font-mono text-[10px] tracking-wider text-muted uppercase",
			children: "LEO-550 · orthographic · drag to slew"
		})]
	});
}
function draw(ctx, w, h, state, cam, hits) {
	ctx.clearRect(0, 0, w, h);
	ctx.fillStyle = CANVAS.bg;
	ctx.fillRect(0, 0, w, h);
	const cx = w * .5;
	const cy = h * .54;
	const r = Math.min(w, h) * .38;
	const sunP = project(0, sunLon(state.t), cam, cx, cy, r);
	const atm = ctx.createRadialGradient(cx, cy, r * .94, cx, cy, r * 1.14);
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
	const shade = ctx.createLinearGradient(sunP.x - r * 1.4, sunP.y, sunP.x + r * .2, sunP.y);
	shade.addColorStop(0, "rgba(8,9,11,0.72)");
	shade.addColorStop(.48, "rgba(8,9,11,0.55)");
	shade.addColorStop(.62, "rgba(8,9,11,0.0)");
	ctx.fillStyle = shade;
	ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
	const drawPoly = (pts, fill) => {
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
	ctx.lineWidth = .7;
	for (let lat = -60; lat <= 60; lat += 30) {
		ctx.beginPath();
		let on = false;
		for (let lon = -180; lon <= 180; lon += 6) {
			const p = project(lat, lon, cam, cx, cy, r);
			if (p.vis <= .02) {
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
			if (p.vis <= .02) {
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
	const nextHits = [];
	const selected = state.selectedId;
	ctx.lineWidth = .8;
	for (const plane of [
		"A",
		"B",
		"C"
	]) {
		const sample = state.sats.find((s) => s.plane === plane);
		if (!sample) continue;
		ctx.beginPath();
		let on = false;
		for (let k = 0; k <= 72; k++) {
			const u = k / 72 * Math.PI * 2;
			const eci = satEci(sample.raan, sample.i, u);
			const mag = Math.hypot(eci.x, eci.y, eci.z) || 1;
			const p = project(Math.asin(clamp(eci.z / mag, -1, 1)) * 180 / Math.PI, ((Math.atan2(eci.y, eci.x) - state.t * 72921159e-12) * 180 / Math.PI + 540) % 360 - 180, cam, cx, cy, r * 1.045);
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
		if (p.vis <= .05) continue;
		ctx.fillStyle = CANVAS.gs;
		ctx.beginPath();
		ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
		ctx.fill();
		ctx.font = "500 9px 'IBM Plex Mono', monospace";
		ctx.fillStyle = CANVAS.muted;
		ctx.fillText(gs.id.replace("GS-", ""), p.x + 5, p.y - 4);
		nextHits.push({
			id: gs.id,
			kind: "gs",
			x: p.x,
			y: p.y,
			r: 8
		});
	}
	for (const dc of state.dcs) {
		const p = project(dc.lat, dc.lon, cam, cx, cy, r);
		if (p.vis <= .05) continue;
		ctx.fillStyle = CANVAS.dc;
		ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
		ctx.font = "500 9px 'IBM Plex Mono', monospace";
		ctx.fillStyle = CANVAS.text;
		ctx.fillText(dc.short, p.x + 6, p.y + 3);
		nextHits.push({
			id: dc.id,
			kind: "dc",
			x: p.x,
			y: p.y,
			r: 10
		});
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
		if (p.vis <= -.05) continue;
		const rad = selected === sat.id ? 4.4 : 3.2;
		ctx.globalAlpha = p.vis < 0 ? .28 : 1;
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
		if (p.x > 18 && p.x < w - 22 && p.y > 18 && p.y < h - 10) ctx.fillText(sat.id.replace("SAT-", ""), p.x + 6, p.y - 4);
		ctx.globalAlpha = 1;
		nextHits.push({
			id: sat.id,
			kind: "sat",
			x: p.x,
			y: p.y,
			r: 10
		});
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
function locOf(id, state) {
	const sat = state.sats.find((s) => s.id === id);
	if (sat) return {
		lat: sat.lat,
		lon: sat.lon
	};
	const dc = state.dcs.find((d) => d.id === id);
	if (dc) return {
		lat: dc.lat,
		lon: dc.lon
	};
	return null;
}
function Meter({ label, value }) {
	const v = Math.max(0, Math.min(1, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[4.5rem_1fr_2.2rem] items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1 overflow-hidden rounded-full bg-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("h-full", v < .33 ? "bg-crit" : v < .55 ? "bg-warn" : "bg-ok"),
					style: { width: `${Math.round(v * 100)}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-right font-mono text-[10px] text-fg tabular",
				children: v.toFixed(2)
			})
		]
	});
}
function SatBody({ sat }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: sat.eclipse ? "mute" : "ok",
					children: sat.eclipse ? "eclipse" : "sunlit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					tone: sat.soc < .25 ? "crit" : sat.soc < .4 ? "warn" : "ok",
					children: [
						"SOC ",
						Math.round(sat.soc * 100),
						"%"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					tone: sat.tempC > 38 ? "crit" : sat.tempC > 28 ? "warn" : "ok",
					children: [sat.tempC.toFixed(0), "°C"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					tone: sat.rad > .55 ? "crit" : sat.rad > .3 ? "warn" : "mute",
					children: ["rad ", sat.rad.toFixed(2)]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[11px] tabular",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-subtle",
					children: "Plane / slot"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
					sat.plane,
					" · ",
					sat.slot
				] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-subtle",
					children: "Lat / lon"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
					sat.lat.toFixed(1),
					" / ",
					sat.lon.toFixed(1)
				] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-subtle",
					children: "ISL"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
					sat.islGbps.toFixed(1),
					" Gbps ",
					sat.islPeer ? `· ${sat.islPeer}` : ""
				] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-subtle",
					children: "Ground"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: sat.contact.length ? sat.contact.join(" ") : "no contact" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-subtle",
					children: "Eclipse"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: sat.timeToEclipseS == null ? "—" : sat.timeToEclipseS === 0 ? `in umbra ${Math.round(sat.eclipseHoldS / 60)}m` : `${(sat.timeToEclipseS / 60).toFixed(1)} min` })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-subtle",
					children: "Load"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
					sat.loadTflops.toFixed(0),
					" / ",
					sat.capacityTflops,
					" TF"
				] })] })
			]
		})]
	});
}
function TelemetryPanel() {
	const selectedId = useOwmStore((s) => s.selectedId);
	const selectedKind = useOwmStore((s) => s.selectedKind);
	const sats = useOwmStore((s) => s.sats);
	const dcs = useOwmStore((s) => s.dcs);
	const jobs = useOwmStore((s) => s.jobs);
	const stations = useOwmStore((s) => s.stations);
	const policy = useOwmStore((s) => s.policy);
	const select = useOwmStore((s) => s.select);
	const holdJob = useOwmStore((s) => s.holdJob);
	const sat = sats.find((s) => s.id === selectedId);
	const dc = dcs.find((d) => d.id === selectedId);
	const job = jobs.find((j) => j.id === selectedId);
	const gs = stations.find((g) => g.id === selectedId);
	if (selectedKind === "sat" && sat) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "min-h-0 overflow-y-auto px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase",
			children: sat.id
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SatBody, { sat })]
	});
	if (selectedKind === "dc" && dc) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "min-h-0 overflow-y-auto px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase",
				children: dc.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-3 text-sm",
				children: [dc.name, " terrestrial cluster"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3 font-mono text-[11px] tabular",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-subtle",
					children: "Capacity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [dc.capacityTflops, " TFLOPS"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-subtle",
					children: "Load"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [dc.loadTflops.toFixed(0), " TF"] })] })]
			})
		]
	});
	if (selectedKind === "gs" && gs) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 font-mono text-[10px] tracking-[0.16em] text-muted uppercase",
				children: gs.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: gs.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-mono text-[11px] text-muted tabular",
				children: [
					gs.lat.toFixed(2),
					" / ",
					gs.lon.toFixed(2)
				]
			})
		]
	});
	if (job) {
		const ranked = scoreJob(job, sats, dcs, jobs, policy);
		const current = ranked.find((r) => r.nodeId === (job.migratingTo?.id ?? job.placement.id)) ?? ranked.find((r) => r.nodeId === job.placement.id);
		const factors = current?.factors;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-h-0 overflow-y-auto px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-[10px] tracking-[0.16em] text-muted uppercase",
						children: job.id
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: job.name
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => holdJob(job.id, !job.held),
						className: "h-11 rounded-md px-3 font-mono text-[10px] tracking-wide text-muted uppercase hover:bg-elevated hover:text-fg",
						children: job.held ? "Release" : "Hold"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-3 font-mono text-[11px] text-muted",
					children: [
						job.kind,
						" · ",
						job.demandTflops,
						" TF · ",
						job.payloadGb,
						" GB · SLA ",
						job.slaMs,
						"ms · rad ",
						job.rad
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm",
					children: job.migratingTo ? `Hopping ${job.placement.id} → ${job.migratingTo.id}` : `Running on ${job.placement.id}`
				}),
				(current?.reasons.length || job.lastReasons.length) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-xs leading-relaxed text-muted",
					children: (current?.reasons.length ? current.reasons : job.lastReasons).join(" · ")
				}),
				factors && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 space-y-1.5",
					children: Object.keys(FACTOR_LABEL).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: FACTOR_LABEL[k],
						value: factors[k]
					}, k))
				}),
				ranked.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-1.5 font-mono text-[10px] tracking-[0.16em] text-muted uppercase",
					children: "Candidates"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1",
					children: ranked.slice(0, 5).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => select(r.nodeId, r.kind),
						className: "flex h-9 w-full items-center justify-between rounded-sm px-2 font-mono text-[11px] tabular hover:bg-elevated",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: r.nodeId === job.placement.id ? "text-fg" : "text-muted",
							children: r.nodeId
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: r.total.toFixed(2)
						})]
					}) }, r.nodeId))
				})] })
			]
		});
	}
	const sunlit = sats.filter((s) => !s.eclipse).length;
	const ecl = sats.length - sunlit;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase",
				children: "Fleet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [
					sunlit,
					" sunlit · ",
					ecl,
					" eclipse · ",
					sats.filter((s) => s.contact.length).length,
					" in contact"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-0.5",
				children: sats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => select(s.id, "sat"),
					className: "flex h-9 w-full items-center gap-2 rounded-sm px-2 font-mono text-[11px] tabular hover:bg-elevated",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: s.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: s.eclipse ? "ecl" : "sun"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-auto text-muted",
							children: [Math.round(s.soc * 100), "%"]
						})
					]
				}) }, s.id))
			})
		]
	});
}
var KINDS = [
	"training",
	"inference",
	"edge",
	"batch"
];
var RADS = [
	"low",
	"med",
	"high"
];
var POLICIES = [
	"sunlit-first",
	"earth-anchor",
	"max-orbital"
];
var SPEEDS = [
	0,
	1,
	4,
	16
];
function tokenize(line) {
	const out = [];
	const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
	let m;
	while (m = re.exec(line)) out.push(m[1] ?? m[2] ?? m[3] ?? "");
	return out;
}
function flag(args, name) {
	const i = args.findIndex((a) => a === `--${name}` || a.startsWith(`--${name}=`));
	if (i < 0) return void 0;
	const tok = args[i];
	if (tok.includes("=")) return tok.split("=").slice(1).join("=");
	return args[i + 1];
}
function numFlag(args, name, fallback) {
	const v = flag(args, name);
	if (v == null) return fallback;
	const n = Number(v);
	return Number.isFinite(n) ? n : fallback;
}
function parseCommand(raw) {
	const line = raw.trim();
	if (!line) return { type: "none" };
	if (line.startsWith("{")) try {
		const spec = JSON.parse(line);
		if (!spec.name || !spec.kind) return {
			type: "error",
			message: "json needs name and kind"
		};
		return {
			type: "submit",
			spec: normalizeSpec(spec)
		};
	} catch {
		return {
			type: "error",
			message: "invalid json spec"
		};
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
		return {
			type: "log",
			n: Number.isFinite(n) ? n : 16
		};
	}
	if (cmd === "status") {
		if (!args[0]) return {
			type: "error",
			message: "status <id>"
		};
		return {
			type: "status",
			id: args[0].toUpperCase()
		};
	}
	if (cmd === "select") {
		if (!args[0]) return {
			type: "error",
			message: "select <id>"
		};
		return {
			type: "select",
			id: args[0].toUpperCase()
		};
	}
	if (cmd === "clock" || cmd === "speed") {
		const n = Number(args[0]);
		if (!SPEEDS.includes(n)) return {
			type: "error",
			message: "clock 0|1|4|16"
		};
		return {
			type: "clock",
			speed: n
		};
	}
	if (cmd === "policy") {
		if (!args[0]) return { type: "policy" };
		const p = args[0];
		if (!POLICIES.includes(p)) return {
			type: "error",
			message: `policy ${POLICIES.join("|")}`
		};
		return {
			type: "policy",
			policy: p
		};
	}
	if (cmd === "hold") {
		if (!args[0]) return {
			type: "error",
			message: "hold <job>"
		};
		return {
			type: "hold",
			jobId: args[0].toUpperCase()
		};
	}
	if (cmd === "resume" || cmd === "release") {
		if (!args[0]) return {
			type: "error",
			message: "resume <job>"
		};
		return {
			type: "resume",
			jobId: args[0].toUpperCase()
		};
	}
	if (cmd === "migrate" || cmd === "hop") {
		const jobId = (flag(args, "job") ?? args[0] ?? "").toUpperCase();
		const to = (flag(args, "to") ?? args[1] ?? "").toUpperCase();
		if (!jobId || !to) return {
			type: "error",
			message: "migrate <job> <node>"
		};
		return {
			type: "migrate",
			jobId,
			to
		};
	}
	if (cmd === "submit") {
		const presetName = flag(args, "preset") ?? (args[0] && !args[0].startsWith("--") ? args[0] : void 0);
		const preset = PRESETS.find((p) => p.id === presetName || p.spec.name === presetName);
		if (preset && !flag(args, "name") && args.every((a) => a === presetName || a.startsWith("--preset"))) return {
			type: "submit",
			spec: { ...preset.spec }
		};
		const name = flag(args, "name") ?? (args[0] && !args[0].startsWith("--") ? args[0] : void 0);
		const kindRaw = flag(args, "kind") ?? (args[1] && !args[1].startsWith("--") ? args[1] : void 0);
		if (!name) return {
			type: "error",
			message: "submit --name NAME --kind training|inference|edge|batch"
		};
		const kind = kindRaw ?? "inference";
		if (!KINDS.includes(kind)) return {
			type: "error",
			message: `kind ${KINDS.join("|")}`
		};
		const rad = flag(args, "rad") ?? "med";
		if (!RADS.includes(rad)) return {
			type: "error",
			message: "rad low|med|high"
		};
		const spec = {
			name,
			kind,
			demandTflops: numFlag(args, "tflops", kind === "training" ? 120 : 24),
			payloadGb: numFlag(args, "gb", kind === "training" ? 200 : 16),
			slaMs: numFlag(args, "sla-ms", kind === "inference" ? 25 : 80),
			rad,
			pinTo: flag(args, "pin")?.toUpperCase()
		};
		const region = flag(args, "region");
		if (region === "americas" || region === "eu" || region === "apac" || region === "global") spec.region = region;
		return {
			type: "submit",
			spec: normalizeSpec(spec)
		};
	}
	return {
		type: "error",
		message: `unknown command '${cmd}' — try help`
	};
}
function normalizeSpec(spec) {
	return {
		name: spec.name.trim(),
		kind: spec.kind,
		demandTflops: Math.max(1, spec.demandTflops || 16),
		payloadGb: Math.max(1, spec.payloadGb || 8),
		slaMs: Math.max(4, spec.slaMs || 40),
		rad: spec.rad ?? "med",
		region: spec.region ?? "global",
		pinTo: spec.pinTo
	};
}
var HELP_LINES = [
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
	"  clear"
];
function formatJobs(jobs) {
	if (!jobs.length) return ["no jobs"];
	return ["ID       KIND       NAME                 NODE       STATE     TFLOPS", ...jobs.map((j) => {
		const state = j.done ? "done" : j.migratingTo ? `hop→${j.migratingTo.id}` : j.held ? "hold" : "run";
		return [
			j.id.padEnd(8),
			j.kind.padEnd(10),
			j.name.slice(0, 18).padEnd(20),
			j.placement.id.padEnd(10),
			state.padEnd(10),
			String(j.demandTflops).padStart(6)
		].join(" ");
	})];
}
function formatFleet(state) {
	const head = "ID      PLANE  ECL  SOC   TEMP   RAD   ISL    GS";
	const rows = state.sats.map((s) => [
		s.id.padEnd(7),
		s.plane.padEnd(6),
		(s.eclipse ? "YES" : "no ").padEnd(4),
		`${Math.round(s.soc * 100)}%`.padStart(4),
		`${s.tempC.toFixed(0)}C`.padStart(6),
		s.rad.toFixed(2).padStart(5),
		s.islGbps.toFixed(1).padStart(5),
		s.contact[0] ?? "—"
	].join("  "));
	return [
		`${state.sats.filter((s) => !s.eclipse).length}/${state.sats.length} sunlit   policy ${state.policy}`,
		head,
		...rows
	];
}
function TerminalPanel() {
	const [tab, setTab] = (0, import_react.useState)("cli");
	const [input, setInput] = (0, import_react.useState)("");
	const [lines, setLines] = (0, import_react.useState)(() => HELP_LINES.slice(0, 2).map((text, i) => ({
		id: i,
		kind: "out",
		text
	})));
	const [hist, setHist] = (0, import_react.useState)([]);
	const histIdx = (0, import_react.useRef)(-1);
	const seq = (0, import_react.useRef)(2);
	const scroller = (0, import_react.useRef)(null);
	const field = (0, import_react.useRef)(null);
	const logs = useOwmStore((s) => s.logs);
	(0, import_react.useEffect)(() => {
		scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
	}, [
		lines,
		tab,
		logs.length
	]);
	const run = (raw) => {
		const text = raw.trim();
		if (!text) return;
		setHist((h) => [text, ...h.filter((x) => x !== text)].slice(0, 40));
		histIdx.current = -1;
		seq.current += 1;
		const incoming = {
			id: seq.current,
			kind: "in",
			text: `owm> ${text}`
		};
		const action = parseCommand(text);
		const st = useOwmStore.getState();
		let out = [];
		let err = false;
		switch (action.type) {
			case "none": break;
			case "help":
				out = HELP_LINES;
				break;
			case "clear":
				setLines([]);
				setInput("");
				return;
			case "jobs":
				out = formatJobs(st.jobs);
				break;
			case "fleet":
				out = formatFleet(st);
				break;
			case "log":
				out = st.logs.slice(0, action.n ?? 16).map((l) => `${l.utc}  ${l.title}  ${l.detail}`);
				break;
			case "clock":
				st.setSpeed(action.speed);
				out = [`clock ${action.speed}x`];
				break;
			case "policy":
				if (action.policy) {
					st.setPolicy(action.policy);
					out = [`policy ${action.policy}`];
				} else out = [`policy ${st.policy}`];
				break;
			case "submit": {
				const res = st.submitJob(action.spec);
				out = [res.message];
				err = !res.ok;
				break;
			}
			case "migrate": {
				const res = st.forceMigrate(action.jobId, action.to);
				out = [res.message];
				err = !res.ok;
				break;
			}
			case "hold": {
				const res = st.holdJob(action.jobId, true);
				out = [res.message];
				err = !res.ok;
				break;
			}
			case "resume": {
				const res = st.holdJob(action.jobId, false);
				out = [res.message];
				err = !res.ok;
				break;
			}
			case "select":
				if (st.sats.some((s) => s.id === action.id)) st.select(action.id, "sat");
				else if (st.dcs.some((d) => d.id === action.id)) st.select(action.id, "dc");
				else if (st.jobs.some((j) => j.id === action.id)) st.select(action.id, "job");
				else if (st.stations.some((g) => g.id === action.id)) st.select(action.id, "gs");
				else {
					out = [`no id ${action.id}`];
					err = true;
					break;
				}
				out = [`selected ${action.id}`];
				break;
			case "status": {
				const sat = st.sats.find((s) => s.id === action.id);
				const job = st.jobs.find((j) => j.id === action.id);
				const dc = st.dcs.find((d) => d.id === action.id);
				if (sat) out = [
					`${sat.id}  plane ${sat.plane}  ${sat.eclipse ? "ECLIPSE" : "SUNLIT"}`,
					`SOC ${(sat.soc * 100).toFixed(0)}%  T ${sat.tempC.toFixed(1)}C  rad ${sat.rad.toFixed(2)}`,
					`ISL ${sat.islGbps.toFixed(1)} Gbps  GS ${sat.contact.join(",") || "none"}`,
					`eclipse ${sat.timeToEclipseS == null ? "—" : (sat.timeToEclipseS / 60).toFixed(1) + " min"}`
				];
				else if (job) out = [
					`${job.id}  ${job.kind}  ${job.name}`,
					`node ${job.placement.id}${job.migratingTo ? ` → ${job.migratingTo.id}` : ""}`,
					`${job.demandTflops} TF  ${job.payloadGb} GB  sla ${job.slaMs}ms  rad ${job.rad}`,
					job.lastReasons.join(" · ") || "awaiting score"
				];
				else if (dc) out = [`${dc.id}  ${dc.name}  load ${dc.loadTflops.toFixed(0)}/${dc.capacityTflops} TF`];
				else {
					out = [`no id ${action.id}`];
					err = true;
				}
				break;
			}
			case "error":
				out = [action.message];
				err = true;
		}
		const extra = out.map((text) => {
			seq.current += 1;
			return {
				id: seq.current,
				kind: err ? "err" : "out",
				text
			};
		});
		setLines((prev) => [
			...prev,
			incoming,
			...extra
		].slice(-200));
		setInput("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex h-full min-h-0 flex-col bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1 border-b border-border px-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
					active: tab === "cli",
					onClick: () => setTab("cli"),
					children: "CLI"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBtn, {
					active: tab === "log",
					onClick: () => setTab("log"),
					children: "Decisions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-auto hidden px-2 font-mono text-[10px] text-subtle sm:inline",
					children: "/ focus · space pause"
				})
			]
		}), tab === "cli" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: scroller,
			className: "min-h-0 flex-1 overflow-y-auto px-3 py-2 font-mono text-[12px] leading-relaxed",
			children: lines.map((ln) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("whitespace-pre-wrap", ln.kind === "in" && "text-fg", ln.kind === "out" && "text-muted", ln.kind === "err" && "text-crit"),
				children: ln.text
			}, ln.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex items-center gap-2 border-t border-border px-3",
			onSubmit: (e) => {
				e.preventDefault();
				run(input);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				htmlFor: "owm-cli",
				className: "font-mono text-[12px] text-muted",
				children: ["owm", ">"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "owm-cli",
				ref: field,
				value: input,
				onChange: (e) => setInput(e.target.value),
				onKeyDown: (e) => {
					if (e.key === "ArrowUp") {
						e.preventDefault();
						histIdx.current = Math.min(histIdx.current + 1, hist.length - 1);
						const v = hist[histIdx.current];
						if (v) setInput(v);
					} else if (e.key === "ArrowDown") {
						e.preventDefault();
						histIdx.current = Math.max(histIdx.current - 1, -1);
						setInput(histIdx.current < 0 ? "" : hist[histIdx.current] ?? "");
					}
				},
				placeholder: "submit --preset grok-ft",
				className: "h-11 min-w-0 flex-1 bg-transparent font-mono text-[12px] text-fg outline-none placeholder:text-subtle",
				autoComplete: "off",
				spellCheck: false
			})]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: scroller,
			className: "min-h-0 flex-1 overflow-y-auto px-3 py-2",
			children: [logs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No decisions yet."
			}), logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "border-b border-border/80 py-2 last:border-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-2 font-mono text-[11px] tabular",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
								className: "text-subtle",
								children: l.utc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("uppercase", l.level === "move" && "text-info", l.level === "warn" && "text-warn", l.level === "crit" && "text-crit", l.level === "info" && "text-muted"),
								children: l.level
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: l.title
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs leading-relaxed text-muted",
						children: l.detail
					}),
					l.scores && l.scores.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-[10px] text-subtle tabular",
						children: l.scores.map((s) => `${s.id} ${s.score.toFixed(2)}`).join("   ")
					})
				]
			}, l.id))]
		})]
	});
}
function TabBtn({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-11 px-3 font-mono text-[10px] tracking-[0.14em] uppercase transition-[color] duration-150", active ? "text-fg" : "text-subtle hover:text-muted"),
		children
	});
}
function AppShell() {
	const view = useOwmStore((s) => s.view);
	const setView = useOwmStore((s) => s.setView);
	const tick = useOwmStore((s) => s.tick);
	const setSpeed = useOwmStore((s) => s.setSpeed);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let last = performance.now();
		const loop = (now) => {
			const dt = Math.min(.08, (now - last) / 1e3);
			last = now;
			tick(dt);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [tick]);
	(0, import_react.useEffect)(() => {
		let prevMoves = 0;
		return useOwmStore.subscribe((s) => {
			const moves = s.logs.filter((l) => l.level === "move").length;
			if (moves > prevMoves) {
				const last = s.logs.find((l) => l.level === "move");
				if (last) toast(last.title, {
					description: last.detail,
					duration: 2800
				});
			}
			prevMoves = moves;
		});
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const tag = e.target?.tagName;
			const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
			if (e.key === "/" && !typing) {
				e.preventDefault();
				setView("term");
				requestAnimationFrame(() => document.getElementById("owm-cli")?.focus());
			}
			if (e.key === " " && !typing) {
				e.preventDefault();
				const cur = useOwmStore.getState().speed;
				setSpeed(cur === 0 ? 4 : 0);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [setSpeed, setView]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "bottom-right",
				toastOptions: { className: "!bg-elevated !text-fg !border-border !font-sans !text-sm" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,24rem)] lg:grid-rows-[minmax(0,1fr)_minmax(13rem,16rem)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("min-h-0 min-w-0 lg:block", view === "map" ? "block flex-1" : "hidden lg:block"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitalMap, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: cn("min-h-0 border-border lg:flex lg:flex-col lg:border-l", view === "jobs" ? "flex flex-1 flex-col" : "hidden lg:flex"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-0 flex-1 overflow-hidden border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobBoard, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-0 flex-1 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TelemetryPanel, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("min-h-0 border-border lg:col-span-2 lg:block lg:border-t", view === "term" ? "flex flex-1 flex-col" : "hidden lg:block"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalPanel, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "grid grid-cols-3 border-t border-border lg:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
						active: view === "map",
						onClick: () => setView("map"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "size-4" }),
						label: "Orbit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
						active: view === "jobs",
						onClick: () => setView("jobs"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, { className: "size-4" }),
						label: "Jobs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
						active: view === "term",
						onClick: () => setView("term"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareTerminal, { className: "size-4" }),
						label: "CLI"
					})
				]
			})
		]
	});
}
function NavBtn({ active, onClick, icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex h-14 flex-col items-center justify-center gap-0.5 font-mono text-[10px] tracking-wide uppercase", active ? "text-fg" : "text-subtle"),
		children: [icon, label]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };
