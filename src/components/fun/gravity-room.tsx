"use client";

import { useEffect, useRef, useState } from "react";

/**
 * stack.gravity — the tech stack as physical objects.
 * Every chip is a real logo from the site. Grab one, throw it, cut the
 * gravity. Custom verlet-ish integrator, no physics library.
 */

const CHIPS = [
  "Laravel",
  "React",
  "nextjs",
  "TypeScript",
  "JavaScript",
  "PHP",
  "MySQL",
  "Python",
  "Docker",
  "Git",
  "GitHub",
  "Tailwind CSS",
  "Figma",
  "openai",
  "Linux",
  "vercel",
];

const SIZE = 56;
const R = SIZE / 2;
const GRAVITY = 1600; // px/s²
const RESTITUTION = 0.72;

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  grabbed: boolean;
}

interface PointerSample {
  x: number;
  y: number;
  t: number;
}

export function GravityRoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodies = useRef<Body[]>([]);
  const gravityOn = useRef(true);
  const grabIndex = useRef(-1);
  const samples = useRef<PointerSample[]>([]);
  const wakeRef = useRef<() => void>(() => {});
  const setGravityRef = useRef<(on: boolean) => void>(() => {});
  const shakeRef = useRef<() => void>(() => {});
  const [gravityLabel, setGravityLabel] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = container.clientWidth;
    let h = container.clientHeight;

    // Spawn: scattered from the top like someone tipped the toolbox over.
    // Under reduced motion they start settled on the floor instead.
    bodies.current = CHIPS.map((_, i) => ({
      x: R + 10 + ((i * 97) % Math.max(w - SIZE - 20, 1)),
      y: reduceMotion
        ? h - R - 6 - (i % 2) * (SIZE + 4)
        : -R - (i % 5) * 90 - 10,
      vx: reduceMotion ? 0 : ((i * 37) % 100) - 50,
      vy: 0,
      rot: reduceMotion ? 0 : ((i * 53) % 40) - 20,
      vr: 0,
      grabbed: false,
    }));

    const onResize = () => {
      w = container.clientWidth;
      h = container.clientHeight;
      for (const b of bodies.current) {
        b.x = Math.min(Math.max(b.x, R), w - R);
        b.y = Math.min(b.y, h - R);
      }
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    let raf = 0;
    let last = performance.now();
    let settleFrames = 0;

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const list = bodies.current;
      let moving = false;

      for (const b of list) {
        if (b.grabbed) continue;
        if (gravityOn.current) {
          b.vy += GRAVITY * dt;
        } else {
          // zero-g: gentle drag so throws glide instead of dying
          b.vx *= 0.999;
          b.vy *= 0.999;
        }
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.rot += b.vr * dt;

        // walls
        if (b.x < R) {
          b.x = R;
          b.vx = -b.vx * RESTITUTION;
          b.vr = -b.vy * 0.4;
        } else if (b.x > w - R) {
          b.x = w - R;
          b.vx = -b.vx * RESTITUTION;
          b.vr = b.vy * 0.4;
        }
        if (b.y < R) {
          b.y = R;
          b.vy = -b.vy * RESTITUTION;
        } else if (b.y > h - R) {
          b.y = h - R;
          b.vy = -b.vy * RESTITUTION;
          b.vx *= 0.96; // floor friction
          b.vr *= 0.9;
          if (Math.abs(b.vy) < 40) b.vy = 0;
        }
        if (Math.abs(b.vx) > 4 || Math.abs(b.vy) > 4 || Math.abs(b.vr) > 4) moving = true;
      }

      // pairwise circle collisions, equal mass
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          const a = list[i];
          const b = list[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;
          const min = SIZE;
          if (distSq >= min * min || distSq === 0) continue;
          const dist = Math.sqrt(distSq);
          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = (min - dist) / 2;
          if (!a.grabbed) {
            a.x -= nx * overlap;
            a.y -= ny * overlap;
          }
          if (!b.grabbed) {
            b.x += nx * overlap;
            b.y += ny * overlap;
          }
          // exchange normal velocity components
          const rvn = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          if (rvn < 0) {
            const imp = (-rvn * (1 + RESTITUTION)) / 2;
            if (!a.grabbed) {
              a.vx -= imp * nx;
              a.vy -= imp * ny;
              a.vr += rvn * 0.3;
            }
            if (!b.grabbed) {
              b.vx += imp * nx;
              b.vy += imp * ny;
              b.vr -= rvn * 0.3;
            }
          }
        }
      }

      // paint
      for (let i = 0; i < list.length; i++) {
        const node = chipRefs.current[i];
        const b = list[i];
        if (node) {
          node.style.transform = `translate(${b.x - R}px, ${b.y - R}px) rotate(${b.rot}deg)`;
        }
      }

      // Sleep the loop once everything settles; any interaction wakes it.
      settleFrames = moving || grabIndex.current >= 0 ? 0 : settleFrames + 1;
      if (settleFrames < 30) {
        raf = requestAnimationFrame(step);
      } else {
        raf = 0;
      }
    };

    const wake = () => {
      if (!raf) {
        last = performance.now();
        settleFrames = 0;
        raf = requestAnimationFrame(step);
      }
    };
    container.addEventListener("pointerdown", wake);
    wakeRef.current = wake;
    setGravityRef.current = (on: boolean) => {
      gravityOn.current = on;
      if (!on) {
        // lift-off nudge so zero-g is felt immediately
        for (const b of bodies.current) {
          b.vy -= 120 + Math.abs(b.vx) * 0.2;
        }
      }
      wake();
    };
    shakeRef.current = () => {
      for (const b of bodies.current) {
        if (b.grabbed) continue;
        b.vx += (Math.random() - 0.5) * 1600;
        b.vy -= 400 + Math.random() * 900;
        b.vr += (Math.random() - 0.5) * 500;
      }
      wake();
    };
    raf = requestAnimationFrame(step);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointerdown", wake);
    };
  }, []);

  const onGrab = (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const b = bodies.current[i];
    b.grabbed = true;
    b.vx = 0;
    b.vy = 0;
    grabIndex.current = i;
    samples.current = [];
    wakeRef.current();
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const i = grabIndex.current;
    if (i < 0) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const b = bodies.current[i];
    b.x = Math.min(Math.max(e.clientX - rect.left, R), rect.width - R);
    b.y = Math.min(Math.max(e.clientY - rect.top, R), rect.height - R);
    const now = performance.now();
    samples.current.push({ x: b.x, y: b.y, t: now });
    while (samples.current.length > 6) samples.current.shift();
  };

  const onRelease = () => {
    const i = grabIndex.current;
    if (i < 0) return;
    const b = bodies.current[i];
    const s = samples.current;
    // throw velocity from recent pointer motion
    if (s.length >= 2) {
      const a = s[0];
      const z = s[s.length - 1];
      const dt = (z.t - a.t) / 1000;
      if (dt > 0.01) {
        b.vx = Math.min(Math.max((z.x - a.x) / dt, -2200), 2200);
        b.vy = Math.min(Math.max((z.y - a.y) / dt, -2200), 2200);
        b.vr = b.vx * 0.3;
      }
    }
    b.grabbed = false;
    grabIndex.current = -1;
  };

  const toggleGravity = () => {
    const next = !gravityLabel;
    setGravityLabel(next);
    setGravityRef.current(next);
  };

  const shake = () => shakeRef.current();

  return (
    <div className="flex flex-col h-full">
      <div
        ref={containerRef}
        onPointerMove={onMove}
        onPointerUp={onRelease}
        onPointerCancel={onRelease}
        className="relative flex-1 min-h-[420px] overflow-hidden rounded-lg border border-border/40 bg-background/40 touch-none select-none"
      >
        {/* floor line */}
        <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        {CHIPS.map((name, i) => (
          <div
            key={name}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
            onPointerDown={onGrab(i)}
            className="absolute top-0 left-0 w-14 h-14 rounded-xl glass-panel flex items-center justify-center p-2.5 cursor-grab active:cursor-grabbing will-change-transform"
            style={{ transform: "translate(-100px, -100px)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/${name}.png`}
              alt={name}
              width={32}
              height={32}
              draggable={false}
              className="object-contain pointer-events-none"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 flex-wrap">
        <p className="hud-label text-[10px] normal-case tracking-normal">
          grab a chip. throw it. nothing in here breaks.
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleGravity}
            className="hud-label rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 text-[10px] hover:border-primary/40 hover:text-foreground transition-colors"
          >
            gravity: {gravityLabel ? "on" : "off"}
          </button>
          <button
            onClick={shake}
            className="hud-label rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 text-[10px] hover:border-primary/40 hover:text-foreground transition-colors"
          >
            shake
          </button>
        </div>
      </div>
    </div>
  );
}
