# OWM — Orbital Workload Migrator

A live earth–space scheduler that decides where compute jobs should run across a
low-Earth-orbit constellation and terrestrial datacenters, then migrates them as
conditions change.

Built as a simulation with a coherent physics and scoring model — not production
flight software, but structured so the core decisions are testable and the
architecture maps onto a real orbital compute network.

## What it does

- Models a **three-plane LEO constellation** (12 nodes) plus 3 ground datacenters
  and 5 ground stations.
- Each satellite tracks **state of charge, temperature, radiation dose,
  inter-satellite link bandwidth, ground contact windows, and eclipse timing**.
- Jobs carry an **SLA, payload size, radiation class, and region preference**.
- A weighted multi-factor scorer ranks every node on power, thermal, radiation,
  bandwidth, latency, contact, forecast, and capacity, then applies policy
  multipliers (`sunlit-first`, `earth-anchor`, `max-orbital`).
- The scheduler **migrates jobs** when a better node appears, with hysteresis to
  avoid thrashing, and models transfer time from payload size and link speed.
- A terminal CLI lets you submit, migrate, hold, resume, change policy, and
  inspect the fleet live.

## Architecture

```
src/lib/owm/
  types.ts          domain types (SatState, Job, ScoreBreakdown, …)
  constants.ts      orbital + scoring constants and weights
  vec.ts            3D vector math
  physics.ts        Keplerian propagation, eclipse, radiation, thermal, SOC
  constellation.ts  fleet construction and tick
  scheduler.ts      scoring, placement decisions, transfer cost
  store.ts          zustand simulation state + actions
  cli.ts            command parser + formatters
  presets.ts        sample workloads
```

The UI (`src/components/`) renders an orbital map, job board, telemetry panel,
and terminal. The simulation runs in the browser; the CLI is pure functions that
the terminal drives.

## Run it

```bash
npm install
npm run dev
```

Open the preview, switch to the **terminal** view, and try:

```
submit --name demo --kind inference --tflops 24 --gb 16 --sla-ms 25
jobs
fleet
migrate JOB-0001 SAT-03
policy earth-anchor
clock 16
```

## Tests

```bash
npm test
```

Covers the scheduler's pure logic: placement resolution, scoring ordering,
radiation penalties, hysteresis, migration triggers, held/pinned/done guards,
and transfer-cost bounds. No network or orbital data required.

## Design notes

- **Radiation** is a South-Atlantic-Anomaly Gaussian plus polar horns — a
  stand-in for a real AP8/AE8 model.
- **Thermal** is a single time-constant toward an eclipse/sunlit equilibrium.
- **Orbits** are simplified Keplerian (no SGP4, no J2, no drag). Swapping in
  real TLEs is a thin layer on `physics.ts`.
- **Transfer cost** accounts for payload size and path bandwidth but not
  checkpoint/restart semantics or mid-hop contact loss.

## Status

Simulation-grade. The scoring and migration logic is coherent and tested; the
physics is intentionally simplified. Suitable as a portfolio demo and as a
starting point for a real orbital scheduler.
