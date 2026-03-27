"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { skillCategories, type Skill } from "@/data/skills";

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center gap-2.5 py-2 px-3 rounded-lg hover:bg-muted/60 transition-colors">
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
    <section id="skills" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Technical Skills"
          title="Tools & technologies"
          description="Technologies I use daily to build production systems."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {skillCategories.map((category, i) => (
            <AnimatedSection key={category.name} delay={i * 0.08}>
              <div className="rounded-xl border border-border/40 bg-card/30 p-4">
                <h3 className="text-xs font-semibold text-foreground/70 mb-3 uppercase tracking-wider px-1">
                  {category.name}
                </h3>
                <div className="space-y-0.5">
                  {category.skills.map((skill) => (
                    <SkillItem key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
