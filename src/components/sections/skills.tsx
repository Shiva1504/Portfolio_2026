"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Spotlight } from "@/components/shared/spotlight";
import { GlassPanel } from "@/components/spatial/glass-panel";
import { skillCategories, type Skill } from "@/data/skills";

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center gap-2.5 py-2 px-3 rounded-lg hover:bg-primary/[0.06] transition-colors">
      {skill.icon ? (
        <div className="w-7 h-7 rounded-md bg-muted/60 flex items-center justify-center overflow-hidden p-1 shrink-0">
          <Image
            src={skill.icon}
            alt={skill.name}
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
      ) : (
        <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-[10px] font-bold text-foreground/40 shrink-0">
          {skill.name.slice(0, 2).toUpperCase()}
        </div>
      )}
      <span className="text-sm font-medium text-foreground">{skill.name}</span>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-14 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <GlassPanel label="~/skills" meta={`${String(skillCategories.length).padStart(2, "0")} groups`}>
            <SectionHeader
              label="Capabilities"
              title="How I'm equipped to solve problems"
              description="Grouped by what they let me build, not by language. Tools shift. The thinking transfers."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {skillCategories.map((category, i) => (
                <AnimatedSection key={category.name} delay={i * 0.08} className="h-full">
                  <Spotlight className="h-full rounded-xl" size={300} color="oklch(0.82 0.14 215 / 8%)">
                    <div className="relative z-10 h-full rounded-xl border border-border/40 bg-background/30 p-4 transition-colors duration-300 hover:border-primary/25">
                      <h3 className="text-sm font-semibold text-foreground mb-0.5 px-1">
                        {category.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 px-1">{category.subtitle}</p>
                      <div className="space-y-0.5">
                        {category.skills.map((skill) => (
                          <SkillItem key={skill.name} skill={skill} />
                        ))}
                      </div>
                    </div>
                  </Spotlight>
                </AnimatedSection>
              ))}
            </div>
          </GlassPanel>
        </AnimatedSection>
      </div>
    </section>
  );
}
