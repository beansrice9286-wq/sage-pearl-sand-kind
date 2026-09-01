import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Job } from "@/lib/owm/types";
import { useOwmStore } from "@/lib/owm/store";

function toneFor(job: Job): "ok" | "warn" | "crit" | "info" | "mute" {
  if (job.done) return "mute";
  if (job.migratingTo) return "info";
  if (job.held) return "warn";
  return "ok";
}

function stateLabel(job: Job): string {
  if (job.done) return "done";
  if (job.migratingTo) return "hop";
  if (job.held) return "hold";
  if (job.pinned) return "pin";
  return "run";
}

export function JobBoard() {
  const jobs = useOwmStore((s) => s.jobs);
  const selectedId = useOwmStore((s) => s.selectedId);
  const select = useOwmStore((s) => s.select);

  return (
    <section className="flex min-h-0 flex-col">
      <header className="flex items-center justify-between px-4 py-2">
        <h2 className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Workloads</h2>
        <span className="font-mono text-[10px] text-subtle tabular">{jobs.filter((j) => !j.done).length} live</span>
      </header>
      <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto px-2 pb-2">
        {jobs.map((job) => {
          const active = selectedId === job.id;
          return (
            <li key={job.id}>
              <button
                type="button"
                onClick={() => select(job.id, "job")}
                className={cn(
                  "flex w-full flex-col gap-1 rounded-md px-3 py-2.5 text-left transition-[background-color,box-shadow] duration-150",
                  active ? "bg-elevated shadow-[var(--shadow-border)]" : "hover:bg-elevated/70",
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-muted tabular">{job.id}</span>
                  <span className="min-w-0 flex-1 truncate text-sm text-fg">{job.name}</span>
                  <Badge tone={toneFor(job)}>{stateLabel(job)}</Badge>
                </div>
                <div className="flex items-center gap-3 font-mono text-[10px] text-muted tabular">
                  <span className="uppercase">{job.kind}</span>
                  <span>{job.migratingTo ? `${job.placement.id} → ${job.migratingTo.id}` : job.placement.id}</span>
                  <span className="ml-auto">{job.demandTflops} TF</span>
                </div>
                {job.migratingTo ? (
                  <div className="h-0.5 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full bg-info transition-[width] duration-150"
                      style={{ width: `${Math.round(job.transferProgress * 100)}%` }}
                    />
                  </div>
                ) : job.kind === "training" || job.kind === "batch" ? (
                  <div className="h-0.5 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full bg-fg/50"
                      style={{ width: `${Math.round(job.progress * 100)}%` }}
                    />
                  </div>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
