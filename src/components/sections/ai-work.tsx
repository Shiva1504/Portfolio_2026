"use client";

import { Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { TechBadge } from "@/components/shared/tech-badge";
import { GlassPanel } from "@/components/spatial/glass-panel";
import { aiExperiments } from "@/data/skills";

export function AIWork() {
  return (
    <section id="ai-work" className="py-14 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <GlassPanel label="~/ai-work" meta={`${String(aiExperiments.length).padStart(2, "0")} systems`}>
            <SectionHeader
              label="AI & Automation"
              title="Intelligent systems I've built"
              description="AI isn't a buzzword in my stack. It's a production tool I use to solve real business problems."
            />

            <div className="space-y-5">
              {aiExperiments.map((experiment, i) => (
                <AnimatedSection key={experiment.title} delay={i * 0.1}>
                  <div className="group relative rounded-xl border border-border/50 bg-background/40 p-6 sm:p-8 transition-all duration-300 hover:border-aurora/40 hover:bg-background/60">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-aurora/10 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-aurora" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="text-base font-semibold text-foreground">
                            {experiment.title}
                          </h3>
                          <span className="hud-label inline-flex items-center rounded-full border border-border/50 bg-muted/40 px-2.5 py-0.5 text-[10px] w-fit">
                            {experiment.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {experiment.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {experiment.technologies.map((tech) => (
                            <TechBadge key={tech} name={tech} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </GlassPanel>
        </AnimatedSection>
      </div>
    </section>
  );
}
