"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { TechBadge } from "@/components/shared/tech-badge";
import { experiences, education } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          label="Career"
          title="Experience & growth"
          description="Building production systems and growing from trainee to leading full-stack development."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-0 w-px bg-border/60 hidden sm:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <AnimatedSection key={exp.id} delay={i * 0.1}>
                <div className="relative flex gap-6">
                  {/* Timeline dot */}
                  <div className="hidden sm:flex flex-shrink-0 w-10 h-10 items-center justify-center rounded-full border border-border bg-background z-10">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="flex-1 pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {exp.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>
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
                          <span className="mt-2 h-1 w-1 rounded-full bg-foreground/30 flex-shrink-0" />
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
                <div className="hidden sm:flex flex-shrink-0 w-10 h-10 items-center justify-center rounded-full border border-border bg-background z-10">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {education.degree}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {education.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {education.university} · GPA: {education.gpa}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
