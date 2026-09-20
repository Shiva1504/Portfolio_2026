import { profile } from "@/data/profile";
import { allProjects } from "@/data/projects";
import { skillCategories, capabilities } from "@/data/skills";
import { experiences, education } from "@/data/experience";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Only general-purpose tools are listed for employer work; infrastructure and
// internal-system details are deliberately left out.
const PUBLIC_EXPERIENCE_TECH = new Set([
  "Laravel",
  "Next.js",
  "PHP",
  "MySQL",
  "OpenAI API",
  "REST APIs",
  "Git",
  "GitLab",
  "Figma",
]);

const PRIVATE_TECH = new Set(["Hostinger", "VPS", "Netdata", "GST API", "Pincode API"]);

export function GET() {
  const lines: string[] = [
    `# ${profile.fullName}`,
    "",
    `> ${profile.about}`,
    "",
    "## Links",
    `- Website: ${SITE_URL}`,
    `- GitHub: ${profile.github}`,
    `- LinkedIn: ${profile.linkedin}`,
    `- Contact: ${CONTACT_EMAIL}`,
    "",
    "## What I do",
    ...capabilities.map(
      (c) => `- ${c.title}: ${c.technologies.filter((t) => !PRIVATE_TECH.has(t)).join(", ")}`,
    ),
    "",
    "## Experience",
    ...experiences.map((e) => {
      const tech = e.technologies.filter((t) => PUBLIC_EXPERIENCE_TECH.has(t));
      return `- ${e.title}, ${e.company} (${e.period}, ${e.location})${tech.length ? `. Technologies: ${tech.join(", ")}` : ""}`;
    }),
    "",
    "## Education",
    `- ${education.degree}, ${education.university} (${education.period})`,
    "",
    "## Projects",
    ...allProjects.map(
      (p) => `- ${p.title}: ${p.subtitle}. Technologies: ${p.technologies.join(", ")}${p.repoUrl ? `. Repository: ${p.repoUrl}` : ""}`,
    ),
    "",
    "## Skills",
    ...skillCategories.map((c) => `- ${c.name}: ${c.skills.map((s) => s.name).join(", ")}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
