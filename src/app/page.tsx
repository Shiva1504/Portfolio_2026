import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { HowIThink } from "@/components/sections/how-i-think";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { AIWork } from "@/components/sections/ai-work";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";
import { allProjects } from "@/data/projects";
import { education, experiences } from "@/data/experience";
import { getLastModified } from "@/lib/last-modified";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  jsonLd,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Dasari Sambasiva Naidu | Software Engineer" },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const personId = `${SITE_URL}/#person`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: SITE_NAME,
      jobTitle: "Software Engineer",
      url: SITE_URL,
      email: CONTACT_EMAIL,
      sameAs: [LINKEDIN_URL, GITHUB_URL],
      worksFor: { "@type": "Organization", name: experiences[0].company },
      alumniOf: { "@type": "CollegeOrUniversity", name: education.university },
      address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
      knowsAbout: [
        "API design",
        "System design",
        "Web application development",
        "AI integrations",
        "Performance optimization",
        "Infrastructure",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: "Dasari Sambasiva Naidu | Software Engineer",
      inLanguage: "en",
      dateModified: getLastModified(["src/app/page.tsx", "src/components/sections", "src/data"]).toISOString(),
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "ItemList",
      name: "Projects",
      itemListElement: allProjects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": p.repoUrl ? "SoftwareSourceCode" : "CreativeWork",
          name: p.title,
          description: p.subtitle,
          keywords: p.technologies.join(", "),
          author: { "@id": personId },
          ...(p.repoUrl && { codeRepository: p.repoUrl }),
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <HowIThink />
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
