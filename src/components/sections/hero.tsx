"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Download, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { LiveClock, SystemStatus } from "@/components/spatial/hud";
import { OPEN_PALETTE_EVENT } from "@/components/spatial/command-palette";
import { profile } from "@/data/profile";

const firstName = profile.firstName.toUpperCase();
const lastName = profile.lastName.toUpperCase();

// One orchestrated wake sequence: HUD → name → role → copy → CTAs → meters.
const sequence = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: (order: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay: 0.15 + order * 0.14, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function NameLine({ text, order }: { text: string; order: number }) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.035, delayChildren: 0.3 + order * 0.25 }}
      className="block"
      aria-hidden
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={{
            hidden: { opacity: 0, y: "0.35em", filter: "blur(10px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // The hero recedes into the depth field as you scroll past it.
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Photon glow anchoring the name in space */}
      <div aria-hidden className="absolute inset-0 -z-[1] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] rounded-full blur-3xl animate-gradient-drift bg-[radial-gradient(ellipse,oklch(0.82_0.14_215/10%),oklch(0.65_0.19_295/6%)_50%,transparent_70%)]" />
      </div>

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="mx-auto max-w-5xl w-full text-center pt-24 pb-16"
      >
        {/* HUD readout strip */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={sequence}
          className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap mb-10"
        >
          <SystemStatus />
          <span aria-hidden className="hidden sm:inline text-border">|</span>
          <span className="hud-label hidden sm:inline-flex items-center gap-1.5">
            <MapPin className="h-3 w-3" aria-hidden />
            {profile.location}
          </span>
          <span aria-hidden className="hidden sm:inline text-border">|</span>
          <LiveClock className="hidden sm:inline" />
        </motion.div>

        {/* Name — the monolith */}
        <h1 className="font-display font-extrabold tracking-tight leading-[0.95] text-[clamp(2rem,9vw,6.5rem)] text-foreground whitespace-nowrap">
          <span className="sr-only">{profile.name} — {profile.role}</span>
          <NameLine text={firstName} order={0} />
          {/* Single animated span: per-char filters would break bg-clip-text */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, y: "0.25em", filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="block bg-gradient-to-r from-primary via-foreground to-aurora bg-clip-text text-transparent"
          >
            {lastName}
          </motion.span>
        </h1>

        {/* Role + headline */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={sequence}
          className="hud-label mt-6 text-primary/90 text-xs sm:text-sm"
        >
          {profile.role} — {profile.location.split(",")[0]}
        </motion.p>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={sequence}
          className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {profile.headline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={sequence}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <MagneticButton>
            <Button size="lg" asChild className="group shadow-[0_0_28px_-6px_var(--photon)]">
              <a href="#projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button size="lg" variant="outline" asChild className="backdrop-blur-sm">
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

        {/* Stats — system meters */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={sequence}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto"
        >
          {profile.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-panel rounded-xl px-5 py-4 text-left"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-2xl font-semibold text-foreground tabular-nums">
                  {stat.value}
                </span>
                <span className="hud-label text-[9px]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-1 text-xs font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground/60">{stat.context}</p>
              <motion.div
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 1.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 h-px origin-left bg-gradient-to-r from-primary/80 via-aurora/60 to-transparent"
              />
            </div>
          ))}
        </motion.div>

        {/* ⌘K hint */}
        <motion.button
          custom={6}
          initial="hidden"
          animate="visible"
          variants={sequence}
          onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT))}
          className="mt-12 hidden md:inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/30 backdrop-blur-sm px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
        >
          <Command className="h-3 w-3" aria-hidden />
          Press
          <kbd className="hud-label rounded border border-border/60 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          to navigate
        </motion.button>
      </motion.div>
    </section>
  );
}
