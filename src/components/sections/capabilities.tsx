"use client";

import { Server, Layout, Brain, Cloud } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { TechBadge } from "@/components/shared/tech-badge";
import { capabilities } from "@/data/skills";

const iconMap: Record<string, React.ReactNode> = {
  backend: <Server className="h-5 w-5" />,
  frontend: <Layout className="h-5 w-5" />,
  ai: <Brain className="h-5 w-5" />,
  devops: <Cloud className="h-5 w-5" />,
};

export function Capabilities() {
  return (
    <section id="capabilities" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="What I Do"
          title="Engineering capabilities"
          description="I don't just write code — I solve business problems with reliable, scalable systems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <AnimatedSection key={cap.id} delay={i * 0.1}>
              <div className="group relative rounded-xl border border-border/50 bg-card/50 p-8 hover:border-border hover:bg-card/80 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted text-foreground">
                    {iconMap[cap.id]}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {cap.title}
                  </h3>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {cap.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {cap.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground/30 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {cap.technologies.map((tech) => (
                    <TechBadge key={tech} name={tech} />
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
