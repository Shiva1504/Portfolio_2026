"use client";

import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { AIWork } from "@/components/sections/ai-work";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <FeaturedProjects />
        <Experience />
        <Skills />
        <AIWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
