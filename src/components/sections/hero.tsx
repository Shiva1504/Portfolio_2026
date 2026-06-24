"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/shared/spotlight";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { profile } from "@/data/profile";

const headlineWords = profile.headline.split(" ");

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Subtle parallax: stats drift down, atmosphere drifts up as you scroll out.
  const statsY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const atmosphereY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Background atmosphere — drifting gradient blobs for living depth */}
      <motion.div
        style={{ y: atmosphereY }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/[0.07] rounded-full blur-3xl animate-gradient-drift" />
        <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[320px] bg-blue-500/[0.06] rounded-full blur-3xl animate-gradient-drift-alt" />
        <div className="absolute top-1/4 left-1/5 w-[320px] h-[260px] bg-violet-500/[0.04] rounded-full blur-3xl animate-gradient-drift-alt" />
      </motion.div>

      <Spotlight size={520} className="mx-auto max-w-4xl text-center pt-16">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm text-muted-foreground">{profile.availability}</span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <motion.h1
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.045, delayChildren: 0.1 }}
          className="relative z-10 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative z-10 mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {profile.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="relative z-10 mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <MagneticButton>
            <Button size="lg" asChild className="group">
              <a href="#projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </MagneticButton>
          {profile.resumeUrl && (profile.resumeUrl as string) !== "#" && (
            <Button size="lg" variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          )}
        </motion.div>

        {/* Stats — parallax mini-cards */}
        <motion.div
          style={{ y: statsY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="relative z-10 mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          {profile.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-0.5 px-5 py-3 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm min-w-[110px]"
            >
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
              <span className="text-[10px] text-muted-foreground/60">{stat.context}</span>
            </div>
          ))}
          <div className="hidden sm:flex items-center gap-1.5 px-5 py-3 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{profile.location}</span>
          </div>
        </motion.div>
      </Spotlight>
    </section>
  );
}
