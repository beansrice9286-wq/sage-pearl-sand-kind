import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide tabular",
  {
    variants: {
      tone: {
        mute: "bg-elevated text-muted",
        ok: "bg-ok/15 text-ok",
        warn: "bg-warn/15 text-warn",
        crit: "bg-crit/15 text-crit",
        info: "bg-info/15 text-info",
        fg: "bg-fg/10 text-fg",
      },
    },
    defaultVariants: { tone: "mute" },
  },
);

function Badge({
  className,
  tone,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone, className }))} {...props} />;
}

export { Badge };
