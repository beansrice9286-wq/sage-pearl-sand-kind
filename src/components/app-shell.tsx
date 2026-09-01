import { useEffect, type ReactNode } from "react";
import { Globe2, ListTodo, SquareTerminal } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { JobBoard } from "@/components/job-board";
import { OrbitalMap } from "@/components/orbital-map";
import { TelemetryPanel } from "@/components/telemetry-panel";
import { TerminalPanel } from "@/components/terminal-panel";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { useOwmStore } from "@/lib/owm/store";
import { cn } from "@/lib/utils";

export function AppShell() {
  const view = useOwmStore((s) => s.view);
  const setView = useOwmStore((s) => s.setView);
  const tick = useOwmStore((s) => s.tick);
  const setSpeed = useOwmStore((s) => s.setSpeed);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.08, (now - last) / 1000);
      last = now;
      tick(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [tick]);

  useEffect(() => {
    let prevMoves = 0;
    return useOwmStore.subscribe((s) => {
      const moves = s.logs.filter((l) => l.level === "move").length;
      if (moves > prevMoves) {
        const last = s.logs.find((l) => l.level === "move");
        if (last) toast(last.title, { description: last.detail, duration: 2800 });
      }
      prevMoves = moves;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
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

  return (
    <div className="flex h-dvh flex-col bg-bg text-fg">
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          className: "!bg-elevated !text-fg !border-border !font-sans !text-sm",
        }}
      />
      <AppHeader />
      <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,24rem)] lg:grid-rows-[minmax(0,1fr)_minmax(13rem,16rem)]">
        <div className={cn("min-h-0 min-w-0 lg:block", view === "map" ? "block flex-1" : "hidden lg:block")}>
          <OrbitalMap />
        </div>
        <aside
          className={cn(
            "min-h-0 border-border lg:flex lg:flex-col lg:border-l",
            view === "jobs" ? "flex flex-1 flex-col" : "hidden lg:flex",
          )}
        >
          <div className="min-h-0 flex-1 overflow-hidden border-b border-border">
            <JobBoard />
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            <TelemetryPanel />
          </div>
        </aside>
        <div
          className={cn(
            "min-h-0 border-border lg:col-span-2 lg:block lg:border-t",
            view === "term" ? "flex flex-1 flex-col" : "hidden lg:block",
          )}
        >
          <TerminalPanel />
        </div>
      </div>
      <nav className="grid grid-cols-3 border-t border-border lg:hidden">
        <NavBtn active={view === "map"} onClick={() => setView("map")} icon={<Globe2 className="size-4" />} label="Orbit" />
        <NavBtn active={view === "jobs"} onClick={() => setView("jobs")} icon={<ListTodo className="size-4" />} label="Jobs" />
        <NavBtn
          active={view === "term"}
          onClick={() => setView("term")}
          icon={<SquareTerminal className="size-4" />}
          label="CLI"
        />
      </nav>
    </div>
  );
}

function NavBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-14 flex-col items-center justify-center gap-0.5 font-mono text-[10px] tracking-wide uppercase",
        active ? "text-fg" : "text-subtle",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
