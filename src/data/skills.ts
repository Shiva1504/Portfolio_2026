export interface Skill {
  name: string;
  category: string;
  level: "expert" | "advanced" | "proficient";
  icon?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages & Frameworks",
    skills: [
      { name: "PHP", category: "language", level: "expert", icon: "/PHP.png" },
      { name: "Laravel", category: "framework", level: "expert", icon: "/Laravel.png" },
      { name: "JavaScript", category: "language", level: "expert", icon: "/JavaScript.png" },
      { name: "TypeScript", category: "language", level: "advanced", icon: "/TypeScript.png" },
      { name: "React.js", category: "framework", level: "advanced", icon: "/React.png" },
      { name: "Next.js", category: "framework", level: "advanced", icon: "/Next.js.png" },
      { name: "Vue.js", category: "framework", level: "proficient", icon: "/Vue.js.png" },
      { name: "Tailwind CSS", category: "framework", level: "expert", icon: "/Tailwind CSS.png" },
    ],
  },
  {
    name: "Backend & Data",
    skills: [
      { name: "MySQL", category: "database", level: "expert", icon: "/MySQL.png" },
      { name: "Firebase", category: "database", level: "advanced", icon: "/Firebase.png" },
      { name: "REST APIs", category: "backend", level: "expert", icon: "/rest-api-icon.png" },
      { name: "WordPress", category: "cms", level: "advanced", icon: "/WordPress.png" },
    ],
  },
  {
    name: "AI & Automation",
    skills: [
      { name: "OpenAI API", category: "ai", level: "advanced", icon: "/openai.png" },
      { name: "Google Gemini", category: "ai", level: "advanced", icon: "/gemini-color.png" },
      { name: "Python", category: "language", level: "proficient", icon: "/Python.png" },
      { name: "TensorFlow", category: "ai", level: "proficient", icon: "/TensorFlow.png" },
    ],
  },
  {
    name: "DevOps & Tools",
    skills: [
      { name: "Docker", category: "devops", level: "advanced", icon: "/Docker.png" },
      { name: "Git", category: "vcs", level: "expert", icon: "/Git.png" },
      { name: "Linux", category: "os", level: "advanced", icon: "/Linux.png" },
      { name: "Vercel", category: "deployment", level: "advanced", icon: "/Vercel.png" },
      { name: "Figma", category: "design", level: "advanced", icon: "/Figma.png" },
      { name: "Postman", category: "tool", level: "expert", icon: "/Postman.png" },
    ],
  },
];

export const capabilities = [
  {
    id: "backend",
    title: "Backend Engineering",
    description:
      "I design and implement REST APIs using Laravel, develop business logic, validation, and data modeling for production ERP systems handling real company data, processes, and users.",
    highlights: [
      "REST API design, validation & relational data management",
      "Database query optimization & N+1 elimination",
      "Business logic for order processing & inventory management",
      "Production bug troubleshooting & performance tuning",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "REST APIs", "Cron Jobs"],
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    description:
      "I create dashboards and functional interfaces using Next.js — admin panels, internal tools, and data-driven UIs that integrate with Laravel APIs for production ERP systems.",
    highlights: [
      "Internal dashboards & admin interfaces (Next.js)",
      "Component-driven architecture with React",
      "Responsive design from Figma to production",
      "State management & API integration",
    ],
    technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Figma"],
  },
  {
    id: "ai",
    title: "AI & Automation",
    description:
      "I integrate AI into production admin tools — automated content creation with OpenAI API, intelligent chatbots, and workflow automation that eliminates manual, repetitive tasks.",
    highlights: [
      "OpenAI API for automated content creation in admin tools",
      "AI-powered SEO & product description generation",
      "Custom chatbot development (Gemini API)",
      "Prompt engineering for reliable, domain-specific outputs",
    ],
    technologies: ["OpenAI API", "Google Gemini", "Python", "TensorFlow"],
  },
  {
    id: "devops",
    title: "DevOps & Deployment",
    description:
      "I handle application deployment and production environment management — VPS migrations, automated backups, mail services, and server-side stability for production systems.",
    highlights: [
      "VPS server setup, migration & management",
      "Automated file & database backups (cron jobs)",
      "Production deployment & environment configuration",
      "Mail services & server-side stability",
    ],
    technologies: ["Docker", "Linux", "VPS", "Vercel", "Git"],
  },
];

export const aiExperiments = [
  {
    title: "AI-Powered Admin Panel",
    description:
      "Built a Next.js admin panel for Sportiff India that uses OpenAI API to auto-generate SEO-optimized product descriptions, meta tags, and content — reducing content creation time from hours to seconds.",
    type: "Production Feature",
    technologies: ["Next.js", "OpenAI API", "TypeScript"],
  },
  {
    title: "Gemini AI Chatbot",
    description:
      "Developed a conversational AI chatbot powered by Google Gemini API with custom prompt engineering for domain-specific responses. Optimized response latency using async JavaScript patterns.",
    type: "Project",
    technologies: ["PHP", "Gemini API", "JavaScript"],
  },
  {
    title: "Server Automation Suite",
    description:
      "Engineered automated backup and synchronization systems using cron jobs for database and file backups across multiple production environments — ensuring zero data loss.",
    type: "Infrastructure",
    technologies: ["Bash", "Cron", "Linux", "MySQL"],
  },
];
