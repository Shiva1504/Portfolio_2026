"use client";

import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { HowIThink } from "@/components/sections/how-i-think";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { AIWork } from "@/components/sections/ai-work";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";
import { CursorLight } from "@/components/spatial/cursor-light";
import { CommandPalette } from "@/components/spatial/command-palette";

// WebGL depth field loads client-side only, in its own chunk.
const SpaceCanvas = dynamic(
  () => import("@/components/spatial/space-canvas").then((m) => m.SpaceCanvas),
  { ssr: false }
);

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <SpaceCanvas />
      <CursorLight />
      <CommandPalette />
      <div aria-hidden className="grain-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <HowIThink />
        <FeaturedProjects />
        <Experience />
        <Skills />
        <AIWork />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
