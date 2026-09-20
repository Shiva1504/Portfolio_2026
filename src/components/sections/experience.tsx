"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { TechBadge } from "@/components/shared/tech-badge";
import { GlassPanel } from "@/components/spatial/glass-panel";
import { experiences, education } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-14 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <GlassPanel label="~/experience" meta="system log">
            <SectionHeader
              label="Career"
              title="Experience & growth"
              description="Building production systems and growing from trainee to leading full-stack development."
            />

            <div className="relative">
              {/* Timeline line — a faint light beam */}
              <div className="absolute left-[19px] top-2 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border to-transparent hidden sm:block" />

              <div className="space-y-12">
                {experiences.map((exp, i) => (
                  <AnimatedSection key={exp.id} delay={i * 0.1}>
                    <div className="relative flex gap-6">
                      {/* Timeline node */}
                      <div className="hidden sm:flex flex-shrink-0 w-10 h-10 items-center justify-center rounded-full border border-primary/30 bg-background z-10 shadow-[0_0_16px_-4px_var(--photon)]">
                        <Briefcase className="h-4 w-4 text-primary/80" />
                      </div>

                      <div className="flex-1 pb-2">
                        <p className="hud-label mb-1 text-[10px] text-primary/70">
                          {exp.period}
                        </p>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {exp.company} · {exp.type}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {exp.description}
                        </p>

                        <ul className="space-y-2 mb-4">
                          {exp.achievements.map((achievement) => (
                            <li
                              key={achievement}
                              className="flex items-start gap-2.5 text-sm text-muted-foreground"
                            >
                              <span className="mt-2 h-1 w-1 rounded-full bg-primary/50 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech) => (
                            <TechBadge key={tech} name={tech} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}

                {/* Education */}
                <AnimatedSection delay={0.3}>
                  <div className="relative flex gap-6">
                    <div className="hidden sm:flex flex-shrink-0 w-10 h-10 items-center justify-center rounded-full border border-aurora/30 bg-background z-10 shadow-[0_0_16px_-4px_var(--aurora)]">
                      <GraduationCap className="h-4 w-4 text-aurora/80" />
                    </div>

                    <div className="flex-1">
                      <p className="hud-label mb-1 text-[10px] text-aurora/70">
                        {education.period}
                      </p>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                        {education.degree}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {education.university} · GPA: {education.gpa}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </GlassPanel>
        </AnimatedSection>
      </div>
    </section>
  );
}
