"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

/**
 * Global cursor light — a soft photon glow that trails the pointer across
 * the whole viewport, making the cursor feel like a light source moving
 * through the space. Disabled on touch devices and under reduced motion.
 */
export function CursorLight() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  const background = useMotionTemplate`radial-gradient(560px circle at ${sx}px ${sy}px, oklch(0.82 0.14 215 / 6.5%), transparent 70%)`;

  if (reduceMotion || !enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-[3]"
    />
  );
}
