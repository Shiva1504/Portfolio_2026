"use client";

import { useEffect, useRef, useState } from "react";

/**
 * orbit.sandbox — a tiny n-body toy around one photon "star".
 * Drag anywhere to slingshot a satellite into orbit; pull further for
 * more speed. Wrong angle = it falls into the star. That's physics.
 */

// Gravitational parameter, px³/s². Sized so a circular orbit at r=150px
// runs at ~100px/s (v = √(G/r)) — visibly fast without being frantic.
const G = 1_600_000;
const SUN_R = 10;
const MAX_BODIES = 72;

interface Sat {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number; // 0 = photon cyan … 1 = aurora violet
}

export function OrbitSandbox() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sats = useRef<Sat[]>([]);
  const drag = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // hard clear on resize so trails don't smear across sizes
      ctx.fillStyle = "oklch(0.09 0.02 275)";
      ctx.fillRect(0, 0, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Circular-orbit seed satellites — skipped under reduced motion so
    // nothing moves until the visitor asks it to.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      const seeds = [90, 150, 215];
      sats.current = seeds.map((r, i) => {
        const v = Math.sqrt(G / r);
        const ang = (i * Math.PI * 2) / 3;
        return {
          x: w / 2 + Math.cos(ang) * r,
          y: h / 2 + Math.sin(ang) * r,
          vx: -Math.sin(ang) * v,
          vy: Math.cos(ang) * v,
          hue: i / 2,
        };
      });
      setCount(sats.current.length);
    }

    let raf = 0;
    let last = performance.now();
    let lastCount = sats.current.length;

    const step = (now: number) => {
      const frame = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const cx = w / 2;
      const cy = h / 2;

      // fade previous frame → motion trails
      ctx.fillStyle = "oklch(0.09 0.02 275 / 26%)";
      ctx.fillRect(0, 0, w, h);

      // the star
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 46);
      glow.addColorStop(0, "oklch(0.9 0.1 215 / 90%)");
      glow.addColorStop(0.35, "oklch(0.82 0.14 215 / 35%)");
      glow.addColorStop(1, "oklch(0.82 0.14 215 / 0%)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 46, 0, Math.PI * 2);
      ctx.fill();

      // integrate with substeps for stable close passes
      const sub = 3;
      const dt = frame / sub;
      for (let s = 0; s < sub; s++) {
        for (const sat of sats.current) {
          const dx = cx - sat.x;
          const dy = cy - sat.y;
          const distSq = Math.max(dx * dx + dy * dy, 120);
          const dist = Math.sqrt(distSq);
          const a = G / distSq;
          sat.vx += (dx / dist) * a * dt;
          sat.vy += (dy / dist) * a * dt;
          sat.x += sat.vx * dt;
          sat.y += sat.vy * dt;
        }
      }

      // cull: swallowed by the star or escaped far off-screen
      sats.current = sats.current.filter((sat) => {
        const d = Math.hypot(sat.x - cx, sat.y - cy);
        return d > SUN_R + 4 && d < Math.max(w, h) * 2.5;
      });

      // draw satellites
      for (const sat of sats.current) {
        ctx.beginPath();
        ctx.arc(sat.x, sat.y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle =
          sat.hue < 0.5
            ? `oklch(0.85 0.13 ${215 + sat.hue * 60} / 95%)`
            : `oklch(0.72 0.17 ${245 + (sat.hue - 0.5) * 100} / 95%)`;
        ctx.fill();
      }

      // slingshot preview
      const d = drag.current;
      if (d) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.cx, d.cy);
        ctx.strokeStyle = "oklch(0.82 0.14 215 / 60%)";
        ctx.setLineDash([4, 5]);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(d.x, d.y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = "oklch(0.95 0.05 215)";
        ctx.fill();
      }

      if (sats.current.length !== lastCount) {
        lastCount = sats.current.length;
        setCount(lastCount);
      }

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onDown = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId);
      const p = toLocal(e);
      drag.current = { x: p.x, y: p.y, cx: p.x, cy: p.y };
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current) return;
      const p = toLocal(e);
      drag.current.cx = p.x;
      drag.current.cy = p.y;
    };
    const onUp = () => {
      const d = drag.current;
      drag.current = null;
      if (!d) return;
      if (sats.current.length >= MAX_BODIES) sats.current.shift();
      // launch opposite the pull, slingshot-style
      sats.current.push({
        x: d.x,
        y: d.y,
        vx: (d.x - d.cx) * 2.6,
        vy: (d.y - d.cy) * 2.6,
        hue: Math.random(),
      });
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div
        ref={wrapRef}
        className="relative flex-1 min-h-[420px] overflow-hidden rounded-lg border border-border/40 touch-none select-none cursor-crosshair"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
      <div className="flex items-center justify-between gap-3 pt-3">
        <p className="hud-label text-[10px] normal-case tracking-normal">
          drag anywhere, pull back, release. bad orbits fall into the star — that&apos;s on you.
        </p>
        <span className="hud-label text-[10px] tabular-nums">
          satellites: {String(count).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
