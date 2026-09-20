"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  /** Mono path label shown in the window title bar, e.g. "~/projects" */
  label: string;
  children: ReactNode;
  className?: string;
  /** Extra classes for the inner content area. */
  contentClassName?: string;
  /** Right-side title bar annotation, e.g. an item count. */
  meta?: string;
}

/**
 * OS window wrapper — every section of shiva.os renders inside one.
 * Glass body, slim title bar with a mono path label, and a border that
 * lights up around the cursor (the panel "notices" the light passing over).
 */
export function GlassPanel({
  label,
  children,
  className,
  contentClassName,
  meta,
}: GlassPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--panel-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--panel-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "group/panel glass-panel relative rounded-2xl overflow-hidden",
        className
      )}
    >
      {/* Border illumination — masked ring that glows where the cursor is */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--panel-x, 50%) var(--panel-y, 50%), oklch(0.82 0.14 215 / 45%), oklch(0.65 0.19 295 / 20%) 40%, transparent 65%)",
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* Window title bar */}
      <div className="flex items-center justify-between gap-4 px-5 sm:px-7 h-11 border-b border-border/60 bg-background/30">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-foreground/15" />
            <span className="h-2 w-2 rounded-full bg-foreground/15" />
            <span className="h-2 w-2 rounded-full bg-foreground/15" />
          </div>
          <span className="hud-label truncate normal-case tracking-normal text-xs">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {meta && <span className="hud-label text-[10px]">{meta}</span>}
          <span
            className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-signal"
            aria-hidden
          />
        </div>
      </div>

      <div className={cn("relative p-6 sm:p-10", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
