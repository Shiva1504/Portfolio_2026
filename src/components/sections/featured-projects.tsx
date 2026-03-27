"use client";

import Image from "next/image";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { TechBadge } from "@/components/shared/tech-badge";
import { featuredProjects, otherProjects, type Project } from "@/data/projects";

const projectIcons: Record<string, string[]> = {
  "saas-subscription": ["/Laravel.png", "/React.png", "/MySQL.png"],
  "stock-tracker": ["/Laravel.png", "/PHP.png", "/MySQL.png"],
  "milk-record": ["/Laravel.png", "/PHP.png", "/MySQL.png"],
  "gully-premier-league": ["/Next.js.png", "/TypeScript.png", "/Tailwind CSS.png"],
  "dynamic-notes": ["/PHP.png", "/MySQL.png", "/Tailwind CSS.png"],
  "employee-dashboard": ["/React.png", "/Tailwind CSS.png", "/JavaScript.png"],
};

const categoryGradients: Record<Project["category"], string> = {
  fullstack: "from-violet-500/15 via-blue-500/10 to-transparent",
  backend: "from-emerald-500/15 via-teal-500/8 to-transparent",
  frontend: "from-orange-500/15 via-amber-500/8 to-transparent",
  ai: "from-pink-500/15 via-violet-500/8 to-transparent",
};

const categoryLabels: Record<Project["category"], string> = {
  fullstack: "Full Stack",
  backend: "Backend",
  frontend: "Frontend",
  ai: "AI / ML",
};

function ProjectVisual({
  projectId,
  index,
  category,
}: {
  projectId: string;
  index: number;
  category: Project["category"];
}) {
  const icons = projectIcons[projectId] || [];
  const gradient = categoryGradients[category];

  return (
    <div className="relative aspect-[4/3] rounded-xl border border-border/50 bg-card overflow-hidden group-hover:border-border/80 transition-colors duration-300">
      {/* Browser chrome header */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-muted/90 border-b border-border/40 flex items-center px-3 gap-1.5 z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        <div className="ml-3 flex-1 h-4 rounded-sm bg-background/60 border border-border/30 flex items-center px-2">
          <span className="text-[9px] text-muted-foreground/50 truncate">
            localhost:3000/{projectId}
          </span>
        </div>
      </div>

      {/* Category gradient body */}
      <div className={`absolute inset-0 top-8 bg-gradient-to-br ${gradient}`} />

      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 top-8 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Tech icons — staggered */}
      <div className="absolute inset-0 top-8 flex items-center justify-center">
        <div className="flex items-end gap-3">
          {icons.map((icon, i) => (
            <div
              key={icon}
              className="w-12 h-12 rounded-xl bg-background/75 border border-border/50 flex items-center justify-center p-2.5 shadow-lg transition-transform duration-300 group-hover:scale-105"
              style={{
                transform: `translateY(${i === 0 ? 6 : i === 1 ? -10 : 4}px)`,
              }}
            >
              <Image
                src={icon}
                alt=""
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Large watermark number */}
      <div className="absolute bottom-2 right-4 text-6xl font-black text-foreground/[0.04] select-none leading-none">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

function OtherProjectCard({ project }: { project: Project }) {
  const hasRealGithub = project.githubUrl && !project.githubUrl.endsWith("Shiva1504");
  const hasRealLive = project.liveUrl && !project.liveUrl.endsWith("Shiva1504");

  return (
    <article className="p-5 rounded-xl border border-border/50 bg-card/30 hover:border-border hover:bg-card/60 transition-all duration-200 group flex flex-col h-full">
      <div className="flex items-start justify-between mb-3 gap-2">
        <Badge variant="outline" className="text-xs shrink-0">
          {categoryLabels[project.category]}
        </Badge>
        <div className="flex items-center gap-1.5">
          {(project.githubUrl) && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {(project.liveUrl) && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
              aria-label="Live site"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors text-sm">
        {project.title}
      </h3>
      <p className="text-xs text-muted-foreground/80 mb-4 leading-relaxed flex-1">
        {project.impact}
      </p>

      <div className="flex flex-wrap gap-1 mt-auto">
        {project.technologies.slice(0, 4).map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
        {project.technologies.length > 4 && (
          <span className="text-[10px] text-muted-foreground/60 self-center">
            +{project.technologies.length - 4} more
          </span>
        )}
      </div>
    </article>
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

        {/* Featured case studies */}
        <div className="space-y-20">
          {featuredProjects.map((project, i) => (
            <AnimatedSection key={project.id} delay={0.1}>
              <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 group">
                {/* Project visual */}
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                  <ProjectVisual
                    projectId={project.id}
                    index={i}
                    category={project.category}
                  />
                </div>

                {/* Project details */}
                <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      {project.subtitle}
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {project.title}
                  </h3>

                  {/* Role badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/60 border border-border/40 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      My role: {project.role}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {categoryLabels[project.category]}
                    </Badge>
                  </div>

                  <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
                        Problem
                      </h4>
                      <p>{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
                        Solution
                      </h4>
                      <p>{project.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
                        Technical Decisions
                      </h4>
                      <p>{project.techDecisions}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
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

        {/* Other projects grid */}
        {otherProjects.length > 0 && (
          <AnimatedSection className="mt-20">
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                More Projects
              </h3>
              <p className="text-xs text-muted-foreground/60">
                Additional work — smaller scope, focused on specific skills.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherProjects.map((project) => (
                <OtherProjectCard key={project.id} project={project} />
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* GitHub link */}
        <AnimatedSection className="mt-12 text-center">
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
