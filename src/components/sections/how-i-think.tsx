"use client";

import { Search, PenTool, Wrench, Zap, Gauge, RefreshCw, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Spotlight } from "@/components/shared/spotlight";
import { processSteps } from "@/data/process";

const iconMap: Record<string, LucideIcon> = {
  Search,
  PenTool,
  Wrench,
  Zap,
  Gauge,
  RefreshCw,
};

export function HowIThink() {
  return (
    <section id="process" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="How I Think"
          title="A process, not a stack"
          description="The frameworks change. This loop doesn't. It's how I approach any problem, whatever the technology turns out to be."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {processSteps.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <AnimatedSection key={step.step} delay={i * 0.08} className="h-full">
                <Spotlight className="h-full rounded-xl" size={300}>
                <div className="group relative z-10 h-full rounded-xl border border-border/40 bg-card/30 p-6 transition-colors duration-300 hover:border-border/80 hover:bg-card/60">
                  <span
                    className="absolute top-4 right-5 text-4xl font-black text-foreground/[0.05] leading-none select-none"
                    aria-hidden
                  >
                    {step.step}
                  </span>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted/60 text-foreground/80 transition-colors group-hover:text-primary">
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </div>
                  <h3 className="mb-1.5 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                </Spotlight>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
