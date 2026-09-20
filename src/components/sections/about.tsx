"use client";

import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="pt-8 pb-16 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeader label="About" title="Software engineer based in Pune, India" />
        <AnimatedSection>
          <p className="text-lg text-muted-foreground leading-relaxed -mt-8">
            {profile.about}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
