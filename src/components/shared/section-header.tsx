"use client";

import { AnimatedSection } from "./animated-section";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <AnimatedSection className="mb-12">
      <p className="hud-label mb-3 text-primary/80">
        <span aria-hidden className="mr-2 text-muted-foreground/50">{"//"}</span>
        {label}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
