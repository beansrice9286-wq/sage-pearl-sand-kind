import { useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PRESETS } from "@/lib/owm/presets";
import { useOwmStore } from "@/lib/owm/store";
import type { JobKind, JobSpec, RadClass } from "@/lib/owm/types";
import { cn } from "@/lib/utils";

const KINDS: JobKind[] = ["training", "inference", "edge", "batch"];
const RADS: RadClass[] = ["low", "med", "high"];

export function SubmitDialog() {
  const [open, setOpen] = useState(false);
  const [spec, setSpec] = useState<JobSpec>({
    name: "new-workload",
    kind: "inference",
    demandTflops: 24,
    payloadGb: 16,
    slaMs: 25,
    rad: "med",
    region: "global",
  });
  const submitJob = useOwmStore((s) => s.submitJob);

  const apply = (next: Partial<JobSpec>) => setSpec((s) => ({ ...s, ...next }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="gap-1.5 pl-3 pr-2.5">
          <Plus className="size-3.5" />
          Ingest
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Ingest job</DialogTitle>
        <DialogDescription className="mt-1">Scheduler places it live. Pin only if the workload must not hop.</DialogDescription>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSpec({ ...p.spec })}
              className="h-9 rounded-md px-2.5 font-mono text-[10px] text-muted uppercase shadow-[var(--shadow-border)] hover:text-fg"
            >
              {p.label}
            </button>
          ))}
        </div>
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            submitJob(spec);
            setOpen(false);
          }}
        >
          <Field label="Name">
            <Input value={spec.name} onChange={(e) => apply({ name: e.target.value })} required />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Kind">
              <select
                value={spec.kind}
                onChange={(e) => apply({ kind: e.target.value as JobKind })}
                className="h-11 w-full rounded-md bg-elevated px-3 text-sm shadow-[var(--shadow-border)]"
              >
                {KINDS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Radiation">
              <select
                value={spec.rad}
                onChange={(e) => apply({ rad: e.target.value as RadClass })}
                className="h-11 w-full rounded-md bg-elevated px-3 text-sm shadow-[var(--shadow-border)]"
              >
                {RADS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="TFLOPS">
              <Input
                type="number"
                min={1}
                value={spec.demandTflops}
                onChange={(e) => apply({ demandTflops: Number(e.target.value) })}
              />
            </Field>
            <Field label="Payload GB">
              <Input
                type="number"
                min={1}
                value={spec.payloadGb}
                onChange={(e) => apply({ payloadGb: Number(e.target.value) })}
              />
            </Field>
            <Field label="SLA ms">
              <Input type="number" min={4} value={spec.slaMs} onChange={(e) => apply({ slaMs: Number(e.target.value) })} />
            </Field>
          </div>
          <Field label="Pin (optional)">
            <Input
              placeholder="SAT-03 or DC-MEM"
              value={spec.pinTo ?? ""}
              onChange={(e) => apply({ pinTo: e.target.value || undefined })}
            />
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className={cn("block")}>
      <span className="mb-1 block font-mono text-[10px] tracking-[0.14em] text-muted uppercase">{label}</span>
      {children}
    </label>
  );
}
