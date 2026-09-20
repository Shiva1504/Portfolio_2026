"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";

/**
 * type.springs — the name from the hero, but every letter sits on a
 * damped spring. Sweep the cursor through it, flick a letter, watch it
 * ring back into place. All user-driven: settles to stillness.
 */

const LINES = [profile.firstName.toUpperCase(), profile.lastName.toUpperCase()];

const K = 90; // spring stiffness
const C = 9; // damping
const REACH = 130; // pointer influence radius (px)
const PUSH = 3200;

interface Letter {
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  cx: number; // rest center, container coords
  cy: number;
}

export function TypeSprings() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const letters = useRef<Letter[]>([]);
  const pointer = useRef({ x: -9999, y: -9999, px: -9999, py: -9999 });
  const rafRef = useRef(0);
  const wakeLetter = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const crect = container.getBoundingClientRect();
      letters.current = spanRefs.current.map((el, i) => {
        const prev = letters.current[i];
        if (!el) return prev ?? { ox: 0, oy: 0, vx: 0, vy: 0, rot: 0, vr: 0, cx: 0, cy: 0 };
        // rest position = layout position; transforms are offset-only so
        // strip them for the measurement
        el.style.transform = "";
        const r = el.getBoundingClientRect();
        return {
          ox: prev?.ox ?? 0,
          oy: prev?.oy ?? 0,
          vx: prev?.vx ?? 0,
          vy: prev?.vy ?? 0,
          rot: prev?.rot ?? 0,
          vr: prev?.vr ?? 0,
          cx: r.left - crect.left + r.width / 2,
          cy: r.top - crect.top + r.height / 2,
        };
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);

    let last = performance.now();
    let settleFrames = 0;

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const p = pointer.current;
      const sweeping =
        Math.abs(p.x - p.px) > 0.5 || Math.abs(p.y - p.py) > 0.5;
      let moving = false;

      for (let i = 0; i < letters.current.length; i++) {
        const l = letters.current[i];
        const node = spanRefs.current[i];
        if (!node) continue;

        // pointer repulsion — only while the pointer is actually moving,
        // so resting a cursor on the name doesn't pin letters away
        if (sweeping) {
          const dx = l.cx + l.ox - p.x;
          const dy = l.cy + l.oy - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REACH && dist > 0.01) {
            const f = (1 - dist / REACH) * PUSH * dt;
            l.vx += (dx / dist) * f;
            l.vy += (dy / dist) * f;
            l.vr += ((dx / dist) * f) * 0.15;
          }
        }

        // damped spring back to rest
        l.vx += (-K * l.ox - C * l.vx) * dt;
        l.vy += (-K * l.oy - C * l.vy) * dt;
        l.vr += (-K * l.rot - C * l.vr) * dt;
        l.ox += l.vx * dt;
        l.oy += l.vy * dt;
        l.rot += l.vr * dt;

        const speed = Math.hypot(l.vx, l.vy);
        if (speed > 2 || Math.abs(l.ox) > 0.5 || Math.abs(l.oy) > 0.5) moving = true;

        node.style.transform = `translate(${l.ox}px, ${l.oy}px) rotate(${l.rot * 0.06}deg)`;
        // letters glow photon when they're really moving
        node.style.textShadow =
          speed > 260
            ? `0 0 ${Math.min(speed / 14, 32)}px oklch(0.82 0.14 215 / 55%)`
            : "";
      }

      p.px = p.x;
      p.py = p.y;

      settleFrames = moving ? 0 : settleFrames + 1;
      if (settleFrames < 30) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = 0;
      }
    };

    const wake = () => {
      if (!rafRef.current) {
        last = performance.now();
        settleFrames = 0;
        rafRef.current = requestAnimationFrame(step);
      }
    };

    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
      wake();
    };
    const onLeave = () => {
      pointer.current.x = -9999;
      pointer.current.y = -9999;
    };
    container.addEventListener("pointermove", onPointer);
    container.addEventListener("pointerleave", onLeave);
    wakeLetter.current = (i: number) => {
      const l = letters.current[i];
      if (!l) return;
      l.vy -= 520 + Math.random() * 260;
      l.vx += (Math.random() - 0.5) * 420;
      l.vr += (Math.random() - 0.5) * 900;
      wake();
    };
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      container.removeEventListener("pointermove", onPointer);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div
        ref={containerRef}
        className="relative flex-1 min-h-[420px] overflow-hidden rounded-lg border border-border/40 bg-background/40 flex flex-col items-center justify-center select-none touch-none cursor-crosshair"
      >
        {LINES.map((line, li) => (
          <div
            key={line}
            className="font-display font-extrabold tracking-tight leading-[1.05] text-[clamp(2.2rem,8vw,5.5rem)] text-foreground whitespace-nowrap"
          >
            {line.split("").map((char, ci) => {
              const i = li === 0 ? ci : LINES[0].length + ci;
              return (
                <span
                  key={`${li}-${ci}`}
                  ref={(el) => {
                    spanRefs.current[i] = el;
                  }}
                  onPointerDown={() => wakeLetter.current(i)}
                  className="inline-block will-change-transform"
                >
                  {char}
                </span>
              );
            })}
          </div>
        ))}
        <p className="hud-label absolute bottom-4 text-[10px] normal-case tracking-normal text-muted-foreground/60">
          sweep through it. tap a letter to flick it.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 pt-3">
        <p className="hud-label text-[10px] normal-case tracking-normal">
          {LINES.join(" ").length - 1} letters, {LINES.join(" ").length - 1} springs. it always rings back.
        </p>
      </div>
    </div>
  );
}
