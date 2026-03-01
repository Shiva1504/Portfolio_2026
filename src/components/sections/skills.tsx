"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { skillCategories, type Skill } from "@/data/skills";

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors group">
      <div className="flex items-center gap-3">
        {skill.icon ? (
          <div className="w-8 h-8 rounded-md bg-muted/60 flex items-center justify-center overflow-hidden p-1">
            <Image
              src={skill.icon}
              alt={skill.name}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-xs font-bold text-foreground/40 group-hover:text-foreground/60 transition-colors">
            {skill.name.slice(0, 2).toUpperCase()}
          </div>
        )}
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Technical Skills"
          title="Tools & technologies"
          description="Technologies I use daily to build production systems."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, i) => (
            <AnimatedSection key={category.name} delay={i * 0.1}>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
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
