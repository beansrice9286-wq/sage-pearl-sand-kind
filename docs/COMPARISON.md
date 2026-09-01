# OWM vs published orbital schedulers

OWM is a **simulation of an orbital workload migrator**, not a deployed
scheduler. The comparison below is against the public shape of the closest
published systems, not their internals.

## What OWM does differently

| Concern | OWM | Typical published orbital schedulers |
|---|---|---|
| Decision basis | Multi-factor weighted score (power, thermal, radiation, bandwidth, latency, contact, forecast, capacity) | Usually single-axis: contact window or latency |
| Migration trigger | Continuous rescoring with hysteresis | Threshold or periodic re-plan |
| Power model | Per-sat SOC with solar input, idle + load draw, projected over eclipse horizon | Binary "powered / not" or ignored |
| Radiation | Dose-aware placement; high-rad jobs avoid SAA/polar passes | Rarely modeled |
| Transfer cost | Payload-size × path bandwidth, bounded | Often assumed instantaneous |
| Policy surface | Three named policies swapped live | Fixed objective |

## Where it is weaker

- **Propagation**: Keplerian only. No SGP4, no TLEs, no J2/drag. Competitors
  that ingest real ephemerides (e.g. RotaStellar CAE-style tools) win on
  fidelity here.
- **Radiation/thermal**: Gaussian SAA blob and single time-constant. Real dose
  depends on shielding, solar cycle, and altitude.
- **No fault model**: no node failure, no link drop mid-transfer, no
  checkpoint/restart.
- **Scale**: 12 sats / 3 DCs. A real constellation is hundreds to thousands of
  nodes.

## Where it is stronger as a design

The factor breakdown is **inspectable** — every decision returns the ranked
scores and human-readable reasons, which is what an operator or an automated
policy layer actually needs. Most published schedulers return a placement, not
a rationale.

The migration-cost term (payload × bandwidth, capped) is the piece most
schedulers skip, and it is exactly what prevents thrashing under intermittent
ISL bandwidth.
