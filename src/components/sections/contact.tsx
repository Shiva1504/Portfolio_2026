"use client";

import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
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
];

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-muted/30">
      <div className="mx-auto max-w-2xl text-center">
        <AnimatedSection>
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-3">
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Let&apos;s build something together
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Looking for a developer who ships reliable systems and thinks about
            the business problem? I&apos;m open to full-time roles, freelance
            projects, and interesting collaborations.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-10">
          <Button size="lg" asChild>
            <a href={`mailto:${profile.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              Send me an email
            </a>
          </Button>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <link.icon className="h-4 w-4" />
                <span>{link.value}</span>
                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
