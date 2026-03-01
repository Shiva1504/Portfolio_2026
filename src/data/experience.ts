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
    type: "Full-time · Remote",
    period: "Sep 2025 – Present",
    location: "Mumbai, India",
    description:
      "Contributing to a production-grade ERP system built with Laravel (APIs) and Next.js (Frontend), working on feature development as well as production stability.",
    achievements: [
      "Develop and manage core ERP functionality — order processing, warehouse management, and admin interfaces",
      "Design and implement REST APIs, validation, and relational data management in Laravel",
      "Troubleshoot production bugs and improve database query performance (including fixing N+1 queries)",
      "Develop internal dashboards and admin interfaces with Next.js",
      "Integrate OpenAI API for automated content creation functionality within admin tools",
      "Migrated applications and databases from shared hosting to VPS — set up deployment environments",
      "Established automated file & database backups via cron jobs and managed mail services and server-side stability",
      "Created admin UI designs in Figma and implemented responsive design",
    ],
    technologies: [
      "Laravel",
      "Next.js",
      "REST APIs",
      "OpenAI API",
      "MySQL",
      "VPS",
      "Figma",
      "Cron Jobs",
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
      "Built and maintained Laravel-based web applications while learning production-grade development practices in an Agile team environment.",
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
