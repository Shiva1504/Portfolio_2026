"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  /** Diameter of the glow in pixels. */
  size?: number;
  /** CSS color for the glow center. */
  color?: string;
}

/**
 * Adds a pointer-tracked radial glow over its children, revealed on hover.
 * Pure compositing (opacity + background-position) — no layout work, no JS
 * animation loop, so it stays cheap and is safe under reduced-motion.
 */
export function Spotlight({
  children,
  className,
  size = 380,
  color = "rgba(99, 130, 255, 0.14)",
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn("group/spot relative", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${color}, transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
