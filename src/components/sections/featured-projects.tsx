"use client";

import Image from "next/image";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { TechBadge } from "@/components/shared/tech-badge";
import { featuredProjects } from "@/data/projects";

const projectIcons: Record<string, string[]> = {
  "saas-subscription": ["/Laravel.png", "/React.png", "/MySQL.png"],
  "stock-tracker": ["/Laravel.png", "/PHP.png", "/MySQL.png"],
  "milk-record": ["/Laravel.png", "/PHP.png", "/MySQL.png"],
};

function ProjectVisual({ projectId, index }: { projectId: string; index: number }) {
  const icons = projectIcons[projectId] || [];

  return (
    <div className="relative aspect-[4/3] rounded-xl border border-border/50 bg-card overflow-hidden">
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Project number */}
      <div className="absolute top-4 left-4">
        <span className="text-xs font-mono text-muted-foreground/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Tech icons composition */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-4">
          {icons.map((icon, i) => (
            <div
              key={icon}
              className="w-14 h-14 rounded-xl bg-muted/80 border border-border/30 flex items-center justify-center p-2.5"
              style={{
                transform: `translateY(${i === 1 ? -8 : 0}px)`,
              }}
            >
              <Image
                src={icon}
                alt=""
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-[10px] text-muted-foreground/30">
          Replace with screenshot: /public/projects/{projectId}.png
        </p>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 px-6 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Selected Work"
          title="Projects that solve real problems"
          description="Each project was built to address a specific business need — not just to learn a technology."
        />

        <div className="space-y-20">
          {featuredProjects.map((project, i) => (
            <AnimatedSection key={project.id} delay={0.1}>
              <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Project visual */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <ProjectVisual projectId={project.id} index={i} />
                </div>

                {/* Project details */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {project.subtitle}
                  </p>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {project.title}
                  </h3>

                  <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1">
                        Problem
                      </h4>
                      <p>{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1">
                        Solution
                      </h4>
                      <p>{project.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1">
                        Technical Decisions
                      </h4>
                      <p>{project.techDecisions}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1">
                        Impact
                      </h4>
                      <p>{project.impact}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    {project.liveUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-3.5 w-3.5" />
                          Live Site
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-3.5 w-3.5" />
                          Source Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </article>

              {i < featuredProjects.length - 1 && (
                <div className="mt-20 h-px bg-border/50" />
              )}
            </AnimatedSection>
          ))}
        </div>

        {/* View all projects link */}
        <AnimatedSection className="mt-16 text-center">
          <Button variant="ghost" className="group text-muted-foreground" asChild>
            <a href="https://github.com/Shiva1504" target="_blank" rel="noopener noreferrer">
              View all projects on GitHub
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
