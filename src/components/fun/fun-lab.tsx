"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GravityRoom } from "./gravity-room";
import { TypeSprings } from "./type-springs";
import { OrbitSandbox } from "./orbit-sandbox";

const SIMS = [
  {
    id: "gravity",
    process: "stack.gravity",
    blurb: "The tech stack, subject to gravity.",
    component: GravityRoom,
  },
  {
    id: "springs",
    process: "type.springs",
    blurb: "Fourteen letters on damped springs.",
    component: TypeSprings,
  },
  {
    id: "orbit",
    process: "orbit.sandbox",
    blurb: "One star. Your satellites.",
    component: OrbitSandbox,
  },
] as const;

type SimId = (typeof SIMS)[number]["id"];

export function FunLab() {
  const [active, setActive] = useState<SimId>("gravity");
  const sim = SIMS.find((s) => s.id === active)!;
  const Sim = sim.component;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="hud-label mb-3 text-primary/80">
          <span aria-hidden className="mr-2 text-muted-foreground/50">{"//"}</span>
          physics.lab
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Things to poke at
        </h1>
        <p className="mt-3 text-muted-foreground max-w-xl">
          Three small simulations, written by hand — no physics library. They
          exist for no reason except that pages should be fun to touch.
        </p>
      </div>

      {/* Lab window */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        {/* Title bar with process tabs */}
        <div className="flex items-center gap-2 px-4 sm:px-5 h-11 border-b border-border/60 bg-background/30 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0 mr-2" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-foreground/15" />
            <span className="h-2 w-2 rounded-full bg-foreground/15" />
            <span className="h-2 w-2 rounded-full bg-foreground/15" />
          </div>
          {SIMS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                "relative rounded-md px-2.5 py-1 font-mono text-[11px] tracking-wide transition-colors shrink-0",
                active === s.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s.process}
              {active === s.id && (
                <motion.span
                  layoutId="active-sim"
                  className="absolute inset-0 -z-10 rounded-md bg-primary/10 border border-primary/25"
                  transition={{ type: "spring", stiffness: 450, damping: 38 }}
                />
              )}
            </button>
          ))}
          <span className="ml-auto hidden sm:flex items-center gap-2 shrink-0">
            <span className="hud-label text-[10px]">sim running</span>
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-signal" aria-hidden />
          </span>
        </div>

        {/* Sim area — remounts per tab so each sim gets a fresh world */}
        <div className="p-4 sm:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="h-[min(62vh,560px)] flex flex-col"
            >
              <Sim />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p className="hud-label mt-4 text-[10px] normal-case tracking-normal text-muted-foreground/60">
        {sim.blurb} Runs on requestAnimationFrame; sleeps when everything settles.
      </p>
    </div>
  );
}
