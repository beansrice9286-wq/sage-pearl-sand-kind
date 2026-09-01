import { Badge } from "@/components/ui/badge";
import { FACTOR_LABEL } from "@/lib/owm/constants";
import { scoreJob } from "@/lib/owm/scheduler";
import type { FactorKey, SatState } from "@/lib/owm/types";
import { useOwmStore } from "@/lib/owm/store";
import { cn } from "@/lib/utils";

function Meter({ label, value }: { label: string; value: number }) {
  const v = Math.max(0, Math.min(1, value));
  const tone = v < 0.33 ? "bg-crit" : v < 0.55 ? "bg-warn" : "bg-ok";
  return (
    <div className="grid grid-cols-[4.5rem_1fr_2.2rem] items-center gap-2">
      <span className="font-mono text-[10px] text-muted uppercase">{label}</span>
      <div className="h-1 overflow-hidden rounded-full bg-border">
        <div className={cn("h-full", tone)} style={{ width: `${Math.round(v * 100)}%` }} />
      </div>
      <span className="text-right font-mono text-[10px] text-fg tabular">{v.toFixed(2)}</span>
    </div>
  );
}

function SatBody({ sat }: { sat: SatState }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        <Badge tone={sat.eclipse ? "mute" : "ok"}>{sat.eclipse ? "eclipse" : "sunlit"}</Badge>
        <Badge tone={sat.soc < 0.25 ? "crit" : sat.soc < 0.4 ? "warn" : "ok"}>
          SOC {Math.round(sat.soc * 100)}%
        </Badge>
        <Badge tone={sat.tempC > 38 ? "crit" : sat.tempC > 28 ? "warn" : "ok"}>
          {sat.tempC.toFixed(0)}°C
        </Badge>
        <Badge tone={sat.rad > 0.55 ? "crit" : sat.rad > 0.3 ? "warn" : "mute"}>
          rad {sat.rad.toFixed(2)}
        </Badge>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[11px] tabular">
        <div>
          <dt className="text-subtle">Plane / slot</dt>
          <dd>
            {sat.plane} · {sat.slot}
          </dd>
        </div>
        <div>
          <dt className="text-subtle">Lat / lon</dt>
          <dd>
            {sat.lat.toFixed(1)} / {sat.lon.toFixed(1)}
          </dd>
        </div>
        <div>
          <dt className="text-subtle">ISL</dt>
          <dd>
            {sat.islGbps.toFixed(1)} Gbps {sat.islPeer ? `· ${sat.islPeer}` : ""}
          </dd>
        </div>
        <div>
          <dt className="text-subtle">Ground</dt>
          <dd>{sat.contact.length ? sat.contact.join(" ") : "no contact"}</dd>
        </div>
        <div>
          <dt className="text-subtle">Eclipse</dt>
          <dd>
            {sat.timeToEclipseS == null
              ? "—"
              : sat.timeToEclipseS === 0
                ? `in umbra ${Math.round(sat.eclipseHoldS / 60)}m`
                : `${(sat.timeToEclipseS / 60).toFixed(1)} min`}
          </dd>
        </div>
        <div>
          <dt className="text-subtle">Load</dt>
          <dd>
            {sat.loadTflops.toFixed(0)} / {sat.capacityTflops} TF
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function TelemetryPanel() {
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

  if (selectedKind === "sat" && sat) {
    return (
      <section className="min-h-0 overflow-y-auto px-4 py-3">
        <h2 className="mb-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">{sat.id}</h2>
        <SatBody sat={sat} />
      </section>
    );
  }

  if (selectedKind === "dc" && dc) {
    return (
      <section className="min-h-0 overflow-y-auto px-4 py-3">
        <h2 className="mb-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">{dc.id}</h2>
        <p className="mb-3 text-sm">{dc.name} terrestrial cluster</p>
        <dl className="grid grid-cols-2 gap-3 font-mono text-[11px] tabular">
          <div>
            <dt className="text-subtle">Capacity</dt>
            <dd>{dc.capacityTflops} TFLOPS</dd>
          </div>
          <div>
            <dt className="text-subtle">Load</dt>
            <dd>{dc.loadTflops.toFixed(0)} TF</dd>
          </div>
        </dl>
      </section>
    );
  }

  if (selectedKind === "gs" && gs) {
    return (
      <section className="px-4 py-3">
        <h2 className="mb-2 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">{gs.id}</h2>
        <p className="text-sm">{gs.name}</p>
        <p className="mt-1 font-mono text-[11px] text-muted tabular">
          {gs.lat.toFixed(2)} / {gs.lon.toFixed(2)}
        </p>
      </section>
    );
  }

  if (job) {
    const ranked = scoreJob(job, sats, dcs, jobs, policy);
    const current = ranked.find((r) => r.nodeId === (job.migratingTo?.id ?? job.placement.id)) ?? ranked.find((r) => r.nodeId === job.placement.id);
    const factors = current?.factors;
    return (
      <section className="min-h-0 overflow-y-auto px-4 py-3">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <h2 className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">{job.id}</h2>
            <p className="text-sm">{job.name}</p>
          </div>
          <button
            type="button"
            onClick={() => holdJob(job.id, !job.held)}
            className="h-11 rounded-md px-3 font-mono text-[10px] tracking-wide text-muted uppercase hover:bg-elevated hover:text-fg"
          >
            {job.held ? "Release" : "Hold"}
          </button>
        </div>
        <p className="mb-3 font-mono text-[11px] text-muted">
          {job.kind} · {job.demandTflops} TF · {job.payloadGb} GB · SLA {job.slaMs}ms · rad {job.rad}
        </p>
        <p className="mb-3 text-sm">
          {job.migratingTo
            ? `Hopping ${job.placement.id} → ${job.migratingTo.id}`
            : `Running on ${job.placement.id}`}
        </p>
        {(current?.reasons.length || job.lastReasons.length) > 0 && (
          <p className="mb-3 text-xs leading-relaxed text-muted">
            {(current?.reasons.length ? current.reasons : job.lastReasons).join(" · ")}
          </p>
        )}
        {factors && (
          <div className="mb-4 space-y-1.5">
            {(Object.keys(FACTOR_LABEL) as FactorKey[]).map((k) => (
              <Meter key={k} label={FACTOR_LABEL[k]} value={factors[k]} />
            ))}
          </div>
        )}
        {ranked.length > 0 && (
          <div>
            <h3 className="mb-1.5 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Candidates</h3>
            <ul className="space-y-1">
              {ranked.slice(0, 5).map((r) => (
                <li key={r.nodeId}>
                  <button
                    type="button"
                    onClick={() => select(r.nodeId, r.kind)}
                    className="flex h-9 w-full items-center justify-between rounded-sm px-2 font-mono text-[11px] tabular hover:bg-elevated"
                  >
                    <span className={r.nodeId === job.placement.id ? "text-fg" : "text-muted"}>{r.nodeId}</span>
                    <span className="text-fg">{r.total.toFixed(2)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    );
  }

  const sunlit = sats.filter((s) => !s.eclipse).length;
  const ecl = sats.length - sunlit;
  return (
    <section className="px-4 py-3">
      <h2 className="mb-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Fleet</h2>
      <p className="text-sm">
        {sunlit} sunlit · {ecl} eclipse · {sats.filter((s) => s.contact.length).length} in contact
      </p>
      <ul className="mt-3 space-y-0.5">
        {sats.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => select(s.id, "sat")}
              className="flex h-9 w-full items-center gap-2 rounded-sm px-2 font-mono text-[11px] tabular hover:bg-elevated"
            >
              <span className="text-fg">{s.id}</span>
              <span className="text-muted">{s.eclipse ? "ecl" : "sun"}</span>
              <span className="ml-auto text-muted">{Math.round(s.soc * 100)}%</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
