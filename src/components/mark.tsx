import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("text-fg", className)} aria-hidden>
      <circle cx="16" cy="16" r="4.2" fill="currentColor" />
      <ellipse
        cx="16"
        cy="16"
        rx="12.2"
        ry="6.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        transform="rotate(-18 16 16)"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="12.2"
        ry="6.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        opacity="0.45"
        transform="rotate(32 16 16)"
      />
      <circle cx="26.8" cy="13.1" r="1.55" fill="currentColor" />
    </svg>
  );
}
