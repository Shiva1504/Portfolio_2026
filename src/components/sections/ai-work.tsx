"use client";

import { Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { TechBadge } from "@/components/shared/tech-badge";
import { aiExperiments } from "@/data/skills";

export function AIWork() {
  return (
    <section id="ai-work" className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          label="AI & Automation"
          title="Intelligent systems I've built"
          description="AI isn't a buzzword in my stack — it's a production tool I use to solve real business problems."
        />

        <div className="space-y-6">
          {aiExperiments.map((experiment, i) => (
            <AnimatedSection key={experiment.title} delay={i * 0.1}>
              <div className="group relative rounded-xl border border-border/50 bg-card/50 p-6 sm:p-8 hover:border-border hover:bg-card/80 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-foreground/60" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="text-base font-semibold text-foreground">
                        {experiment.title}
                      </h3>
                      <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground w-fit">
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
      </div>
    </section>
  );
}
