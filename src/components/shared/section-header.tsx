"use client";

import { AnimatedSection } from "./animated-section";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <AnimatedSection className="mb-16">
      <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-3">
        {label}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
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
