"use client";

import { Mail, Github, Linkedin, ArrowUpRight, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { GlassPanel } from "@/components/spatial/glass-panel";
import { SystemStatus } from "@/components/spatial/hud";
import { profile } from "@/data/profile";

const links = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "GitHub",
    value: "github.com/Shiva1504",
    href: profile.github,
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "in/dasarisambasivanaidu",
    href: profile.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: Phone,
    external: false,
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-14 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <GlassPanel label="~/connect" meta="channel open" contentClassName="p-8 sm:p-14 text-center">
            <AnimatedSection>
              <div className="flex justify-center mb-6">
                <SystemStatus />
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
                Let&apos;s build something{" "}
                <span className="bg-gradient-to-r from-primary to-aurora bg-clip-text text-transparent">
                  together
                </span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
                Looking for a developer who ships reliable systems and thinks about
                the business problem? I&apos;m open to full-time roles, freelance
                projects, and interesting collaborations.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="mt-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <MagneticButton>
                  <Button size="lg" asChild className="shadow-[0_0_28px_-6px_var(--photon)]">
                    <a href={`mailto:${profile.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Send me an email
                    </a>
                  </Button>
                </MagneticButton>
                {profile.resumeUrl && (profile.resumeUrl as string) !== "#" && (
                  <MagneticButton>
                    <Button size="lg" variant="outline" asChild>
                      <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-4 w-4" />
                        Download Resume
                      </a>
                    </Button>
                  </MagneticButton>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="mt-12">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <link.icon className="h-4 w-4 shrink-0" />
                    <span>{link.value}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </GlassPanel>
        </AnimatedSection>
      </div>
    </section>
  );
}
