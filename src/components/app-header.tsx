import { Pause, Play, RotateCcw } from "lucide-react";
import { Mark } from "@/components/mark";
import { SubmitDialog } from "@/components/submit-dialog";
import { Button } from "@/components/ui/button";
import { useOwmStore } from "@/lib/owm/store";
import { fmtClock, fmtUtc } from "@/lib/owm/vec";
import { cn } from "@/lib/utils";

const SPEEDS: Array<0 | 1 | 4 | 16> = [1, 4, 16];

export function AppHeader() {
  const speed = useOwmStore((s) => s.speed);
  const setSpeed = useOwmStore((s) => s.setSpeed);
  const t = useOwmStore((s) => s.t);
  const policy = useOwmStore((s) => s.policy);
  const setPolicy = useOwmStore((s) => s.setPolicy);
  const sats = useOwmStore((s) => s.sats);
  const reset = useOwmStore((s) => s.reset);
  const sunlit = sats.filter((s) => !s.eclipse).length;
  const hops = useOwmStore((s) => s.jobs.filter((j) => j.migratingTo).length);

  return (
    <header className="flex items-center gap-2 border-b border-border px-3 py-1.5 sm:gap-3 sm:px-4 sm:py-2">
      <div className="flex min-w-0 items-center gap-2">
        <Mark className="size-7 shrink-0" />
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.18em] text-fg uppercase">OWM</p>
          <p className="hidden truncate text-[11px] text-muted sm:block">Orbital Workload Migrator</p>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:justify-center">
        <div className="flex items-center rounded-md bg-elevated p-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={speed === 0 ? "Resume" : "Pause"}
            onClick={() => setSpeed(speed === 0 ? 4 : 0)}
          >
            {speed === 0 ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          </Button>
          {SPEEDS.map((sp) => (
            <button
              key={sp}
              type="button"
              onClick={() => setSpeed(sp)}
              className={cn(
                "h-11 min-w-11 rounded-sm px-2 font-mono text-[11px] tabular",
                speed === sp ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
              )}
            >
              {sp}x
            </button>
          ))}
        </div>
        <div className="hidden items-center gap-3 font-mono text-[11px] text-muted tabular lg:flex">
          <span>T+ {fmtClock(t)}</span>
          <span>UTC {fmtUtc(t)}</span>
          <span>
            {sunlit}/{sats.length} sun
          </span>
          {hops > 0 && <span className="text-info">{hops} hop</span>}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <label className="sr-only" htmlFor="owm-policy">
          Policy
        </label>
        <select
          id="owm-policy"
          value={policy}
          onChange={(e) => setPolicy(e.target.value as typeof policy)}
          className="hidden h-11 rounded-md bg-elevated px-2 font-mono text-[11px] text-fg shadow-[var(--shadow-border)] outline-none sm:block"
        >
          <option value="sunlit-first">sunlit-first</option>
          <option value="earth-anchor">earth-anchor</option>
          <option value="max-orbital">max-orbital</option>
        </select>
        <SubmitDialog />
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Reset constellation" onClick={() => reset()}>
          <RotateCcw className="size-3.5" />
        </Button>
      </div>
    </header>
  );
}
