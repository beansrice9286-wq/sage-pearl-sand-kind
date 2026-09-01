import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  decidePlacement,
  defaultPlacement,
  isNodeKind,
  jobDuration,
  placementOf,
  scoreJob,
  transferSeconds,
} from "./scheduler.ts";
import { createConstellation, createDatacenters } from "./constellation.ts";
import type { Job } from "./types.ts";

function baseJob(over: Partial<Job> = {}): Job {
  return {
    id: "JOB-0001",
    name: "test",
    kind: "inference",
    demandTflops: 24,
    payloadGb: 16,
    slaMs: 25,
    rad: "med",
    region: "global",
    pinned: false,
    held: false,
    done: false,
    placement: { kind: "sat", id: "SAT-01" },
    migratingTo: null,
    transferProgress: 0,
    progress: 0,
    startedAt: 0,
    qps: 42,
    lastScore: 0,
    lastReasons: [],
    ...over,
  };
}

describe("scheduler pure helpers", () => {
  it("placementOf resolves sat and dc ids", () => {
    const sats = createConstellation();
    const dcs = createDatacenters();
    assert.deepEqual(placementOf("SAT-01", sats, dcs), { kind: "sat", id: "SAT-01" });
    assert.deepEqual(placementOf("DC-MEM", sats, dcs), { kind: "dc", id: "DC-MEM" });
    assert.equal(placementOf("NOPE", sats, dcs), null);
  });

  it("isNodeKind narrows correctly", () => {
    assert.equal(isNodeKind("sat"), true);
    assert.equal(isNodeKind("dc"), true);
    assert.equal(isNodeKind("gs"), false);
  });

  it("jobDuration returns training/batch windows and null for live kinds", () => {
    assert.equal(jobDuration("training"), 92 * 60);
    assert.equal(jobDuration("batch"), 38 * 60);
    assert.equal(jobDuration("inference"), null);
    assert.equal(jobDuration("edge"), null);
  });

  it("defaultPlacement pins edge to a sunlit sat", () => {
    const sats = createConstellation();
    const dcs = createDatacenters();
    const p = defaultPlacement("edge", sats, dcs);
    assert.equal(p.kind, "sat");
    const sat = sats.find((s) => s.id === p.id)!;
    assert.equal(sat.eclipse, false);
  });

  it("defaultPlacement sends training to DC-MEM", () => {
    const p = defaultPlacement("training", createConstellation(), createDatacenters());
    assert.deepEqual(p, { kind: "dc", id: "DC-MEM" });
  });
});

describe("scoring", () => {
  const sats = createConstellation();
  const dcs = createDatacenters();

  it("scoreJob ranks every node and sorts descending", () => {
    const job = baseJob();
    const ranked = scoreJob(job, sats, dcs, [job], "sunlit-first");
    assert.equal(ranked.length, sats.length + dcs.length);
    for (let i = 1; i < ranked.length; i++) {
      assert.ok(ranked[i - 1]!.total >= ranked[i]!.total - 1e-9);
    }
    for (const r of ranked) {
      assert.ok(r.total >= 0 && r.total <= 1);
      assert.ok(r.factors.power >= 0 && r.factors.power <= 1);
    }
  });

  it("high-rad jobs are penalized on hot sats", () => {
    const hot = sats.map((s) =>
      s.id === "SAT-01" ? { ...s, rad: 0.9, eclipse: false, soc: 0.8, tempC: 10 } : s,
    );
    const high = baseJob({ rad: "high", placement: { kind: "sat", id: "SAT-02" } });
    const low = baseJob({ rad: "low", placement: { kind: "sat", id: "SAT-02" } });
    const highRank = scoreJob(high, hot, dcs, [high], "sunlit-first");
    const lowRank = scoreJob(low, hot, dcs, [low], "sunlit-first");
    const highSat = highRank.find((r) => r.nodeId === "SAT-01")!;
    const lowSat = lowRank.find((r) => r.nodeId === "SAT-01")!;
    assert.ok(highSat.total < lowSat.total, "high-rad job must score lower on a hot sat");
  });

  it("decidePlacement stays put when current node is best", () => {
    const job = baseJob({ placement: { kind: "sat", id: "SAT-01" } });
    const d = decidePlacement(job, sats, dcs, [job], "sunlit-first");
    assert.equal(d.stay, true);
  });

  it("decidePlacement migrates when a clearly better node exists", () => {
    const cold = sats.map((s) =>
      s.id === "SAT-01"
        ? { ...s, eclipse: true, soc: 0.05, tempC: 40, rad: 0.1, islGbps: 1, contact: [] }
        : { ...s, eclipse: false, soc: 0.95, tempC: 5, rad: 0.05, islGbps: 18, contact: ["GS-RDM"] },
    );
    const job = baseJob({
      placement: { kind: "sat", id: "SAT-01" },
      kind: "inference",
      rad: "low",
      demandTflops: 8,
    });
    const d = decidePlacement(job, cold, dcs, [job], "sunlit-first");
    assert.equal(d.stay, false);
    assert.notEqual(d.best.nodeId, "SAT-01");
  });

  it("held/pinned/done jobs never migrate", () => {
    for (const flag of ["held", "pinned", "done"] as const) {
      const job = baseJob({ [flag]: true, placement: { kind: "sat", id: "SAT-01" } });
      const d = decidePlacement(job, sats, dcs, [job], "sunlit-first");
      assert.equal(d.stay, true, flag);
    }
  });
});

describe("transfer cost", () => {
  const sats = createConstellation();

  it("same-node transfer is bounded", () => {
    const job = baseJob({ payloadGb: 100 });
    const sec = transferSeconds(job, { kind: "sat", id: "SAT-01" }, { kind: "sat", id: "SAT-01" }, sats);
    assert.ok(sec >= 70 && sec <= 360);
  });

  it("larger payload takes longer", () => {
    const small = transferSeconds(baseJob({ payloadGb: 8 }), { kind: "sat", id: "SAT-01" }, { kind: "sat", id: "SAT-02" }, sats);
    const big = transferSeconds(baseJob({ payloadGb: 640 }), { kind: "sat", id: "SAT-01" }, { kind: "sat", id: "SAT-02" }, sats);
    assert.ok(big > small);
  });

  it("dc-to-dc path is faster than sat-to-sat", () => {
    const job = baseJob({ payloadGb: 200 });
    const dc = transferSeconds(job, { kind: "dc", id: "DC-MEM" }, { kind: "dc", id: "DC-FRA" }, sats);
    const sat = transferSeconds(job, { kind: "sat", id: "SAT-01" }, { kind: "sat", id: "SAT-05" }, sats);
    assert.ok(dc <= sat);
  });
});
