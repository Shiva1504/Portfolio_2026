export interface Experience {
  id: string;
  title: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "sportiff",
    title: "Full Stack & AI Developer",
    company: "Sportiff India Pvt. Ltd.",
    type: "Full-time · Hybrid",
    period: "Sep 2025 – Present",
    location: "Mumbai, India",
    description:
      "Own problems end-to-end across a production ERP ecosystem: Admin Panel, B2B Catalog, ArenaSport, Warehouse and Orders. Whatever the work needs that week, whether backend APIs, frontend, server migrations, or AI integrations, I pick up the tool and ship it.",
    achievements: [
      "Migrated production infrastructure from TMD Hosting to Hostinger, transferring all files, databases, and DNS records with zero downtime",
      "Deployed 7+ environments across staging and production: newproject, b2b.catalog, staging.api.sportsdrive, ArenaSport, main website, B2B, and Sponsorship",
      "Developed ArenaSport APIs and updated Admin Panel backend APIs using Laravel",
      "Built Next.js Admin Panel and Catalog frontends with role-based UI access control and permission-based module visibility",
      "Integrated ChatGPT API for automated SEO metadata generation, Pincode verification API, and GST verification API",
      "Resolved N+1 query problems in Warehouse and Orders modules, measurably improving backend response times",
      "Developed bidirectional automated backup scripts (TMD↔Hostinger + internal server) scheduled via cron jobs",
      "Installed and configured Netdata for real-time CPU, memory, and network monitoring across servers",
      "Deployed a Python-based GST verification application on Railway",
      "Designed Admin Panel, B2B Portal, and Catalog UI workflows in Figma; handled database planning for Inventory and B2B Pricing modules",
    ],
    technologies: [
      "Laravel",
      "Next.js",
      "PHP",
      "MySQL",
      "OpenAI API",
      "GST API",
      "Pincode API",
      "Railway",
      "Hostinger",
      "VPS",
      "Netdata",
      "Cron Jobs",
      "Shell Script",
      "Figma",
      "GitLab",
    ],
  },
  {
    id: "johar-ride",
    title: "PHP Laravel Developer Trainee",
    company: "Johar Ride",
    type: "Remote",
    period: "July 2025 – Sep 2025",
    location: "Remote",
    description:
      "Ramped quickly into production-grade development practices in an Agile team, shipping real features while learning the discipline behind clean, maintainable systems.",
    achievements: [
      "Built reusable, clean PHP code following Laravel best practices and MVC architecture",
      "Integrated REST APIs, optimized database queries, and improved page load times",
      "Participated in code reviews, debugging sessions, and Agile standups",
      "Researched and implemented new tools and frameworks as part of continuous improvement",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "REST APIs",
      "Git",
    ],
  },
];

export const education = {
  degree: "B.Tech in Computer Science (AI)",
  university: "Parul University, Gujarat",
  period: "2021 – 2025",
  gpa: "7.46 / 10",
};
