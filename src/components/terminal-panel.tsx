import { useEffect, useRef, useState, type ReactNode } from "react";
import { formatFleet, formatJobs, HELP_LINES, parseCommand } from "@/lib/owm/cli";
import { useOwmStore } from "@/lib/owm/store";
import { cn } from "@/lib/utils";

type Line = { id: number; kind: "in" | "out" | "err"; text: string };

export function TerminalPanel() {
  const [tab, setTab] = useState<"cli" | "log">("cli");
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>(() =>
    HELP_LINES.slice(0, 2).map((text, i) => ({ id: i, kind: "out" as const, text })),
  );
  const [hist, setHist] = useState<string[]>([]);
  const histIdx = useRef(-1);
  const seq = useRef(2);
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  const logs = useOwmStore((s) => s.logs);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines, tab, logs.length]);

  const run = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setHist((h) => [text, ...h.filter((x) => x !== text)].slice(0, 40));
    histIdx.current = -1;
    seq.current += 1;
    const incoming: Line = { id: seq.current, kind: "in", text: `owm> ${text}` };
    const action = parseCommand(text);
    const st = useOwmStore.getState();
    let out: string[] = [];
    let err = false;
    switch (action.type) {
      case "none":
        break;
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
        if (sat) {
          out = [
            `${sat.id}  plane ${sat.plane}  ${sat.eclipse ? "ECLIPSE" : "SUNLIT"}`,
            `SOC ${(sat.soc * 100).toFixed(0)}%  T ${sat.tempC.toFixed(1)}C  rad ${sat.rad.toFixed(2)}`,
            `ISL ${sat.islGbps.toFixed(1)} Gbps  GS ${sat.contact.join(",") || "none"}`,
            `eclipse ${sat.timeToEclipseS == null ? "—" : (sat.timeToEclipseS / 60).toFixed(1) + " min"}`,
          ];
        } else if (job) {
          out = [
            `${job.id}  ${job.kind}  ${job.name}`,
            `node ${job.placement.id}${job.migratingTo ? ` → ${job.migratingTo.id}` : ""}`,
            `${job.demandTflops} TF  ${job.payloadGb} GB  sla ${job.slaMs}ms  rad ${job.rad}`,
            job.lastReasons.join(" · ") || "awaiting score",
          ];
        } else if (dc) {
          out = [`${dc.id}  ${dc.name}  load ${dc.loadTflops.toFixed(0)}/${dc.capacityTflops} TF`];
        } else {
          out = [`no id ${action.id}`];
          err = true;
        }
        break;
      }
      case "error":
        out = [action.message];
        err = true;
        break;
    }
    const extra: Line[] = out.map((text) => {
      seq.current += 1;
      return { id: seq.current, kind: err ? "err" : "out", text };
    });
    setLines((prev) => [...prev, incoming, ...extra].slice(-200));
    setInput("");
  };

  return (
    <section className="flex h-full min-h-0 flex-col bg-surface">
      <div className="flex items-center gap-1 border-b border-border px-2">
        <TabBtn active={tab === "cli"} onClick={() => setTab("cli")}>
          CLI
        </TabBtn>
        <TabBtn active={tab === "log"} onClick={() => setTab("log")}>
          Decisions
        </TabBtn>
        <span className="ml-auto hidden px-2 font-mono text-[10px] text-subtle sm:inline">/ focus · space pause</span>
      </div>
      {tab === "cli" ? (
        <>
          <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-3 py-2 font-mono text-[12px] leading-relaxed">
            {lines.map((ln) => (
              <div
                key={ln.id}
                className={cn(
                  "whitespace-pre-wrap",
                  ln.kind === "in" && "text-fg",
                  ln.kind === "out" && "text-muted",
                  ln.kind === "err" && "text-crit",
                )}
              >
                {ln.text}
              </div>
            ))}
          </div>
          <form
            className="flex items-center gap-2 border-t border-border px-3"
            onSubmit={(e) => {
              e.preventDefault();
              run(input);
            }}
          >
            <label htmlFor="owm-cli" className="font-mono text-[12px] text-muted">
              owm{">"}
            </label>
            <input
              id="owm-cli"
              ref={field}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  histIdx.current = Math.min(histIdx.current + 1, hist.length - 1);
                  const v = hist[histIdx.current];
                  if (v) setInput(v);
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  histIdx.current = Math.max(histIdx.current - 1, -1);
                  setInput(histIdx.current < 0 ? "" : (hist[histIdx.current] ?? ""));
                }
              }}
              placeholder="submit --preset grok-ft"
              className="h-11 min-w-0 flex-1 bg-transparent font-mono text-[12px] text-fg outline-none placeholder:text-subtle"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </>
      ) : (
        <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-3 py-2">
          {logs.length === 0 && <p className="text-sm text-muted">No decisions yet.</p>}
          {logs.map((l) => (
            <article key={l.id} className="border-b border-border/80 py-2 last:border-0">
              <div className="flex items-baseline gap-2 font-mono text-[11px] tabular">
                <time className="text-subtle">{l.utc}</time>
                <span
                  className={cn(
                    "uppercase",
                    l.level === "move" && "text-info",
                    l.level === "warn" && "text-warn",
                    l.level === "crit" && "text-crit",
                    l.level === "info" && "text-muted",
                  )}
                >
                  {l.level}
                </span>
                <span className="text-fg">{l.title}</span>
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{l.detail}</p>
              {l.scores && l.scores.length > 0 && (
                <p className="mt-1 font-mono text-[10px] text-subtle tabular">
                  {l.scores.map((s) => `${s.id} ${s.score.toFixed(2)}`).join("   ")}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 px-3 font-mono text-[10px] tracking-[0.14em] uppercase transition-[color] duration-150",
        active ? "text-fg" : "text-subtle hover:text-muted",
      )}
    >
      {children}
    </button>
  );
}
