export interface Skill {
  name: string;
  category: string;
  level: "expert" | "advanced" | "proficient";
  icon?: string;
}

export interface SkillCategory {
  name: string;
  subtitle: string;
  skills: Skill[];
}

// Categories are organized around what they let me build, not by language.
// The thinking transfers; the specific tools are interchangeable.
export const skillCategories: SkillCategory[] = [
  {
    name: "Engineering Foundations",
    subtitle: "The stack-agnostic core that outlasts any framework",
    skills: [
      { name: "System Design", category: "foundation", level: "advanced" },
      { name: "API Design", category: "foundation", level: "expert", icon: "/rest-api-50.png" },
      { name: "Data Modeling", category: "foundation", level: "expert" },
      { name: "Performance Optimization", category: "foundation", level: "advanced" },
      { name: "Testing & Debugging", category: "foundation", level: "advanced" },
      { name: "Git & Version Control", category: "foundation", level: "expert", icon: "/Git.png" },
    ],
  },
  {
    name: "Backend Systems",
    subtitle: "Business logic, APIs, and the data underneath",
    skills: [
      { name: "Laravel", category: "framework", level: "advanced", icon: "/Laravel.png" },
      { name: "PHP", category: "language", level: "advanced", icon: "/PHP.png" },
      { name: "Python", category: "language", level: "proficient", icon: "/Python.png" },
      { name: "REST APIs", category: "backend", level: "expert", icon: "/rest-api-50.png" },
      { name: "WordPress", category: "cms", level: "advanced", icon: "/WordPress.png" },
    ],
  },
  {
    name: "Frontend Experiences",
    subtitle: "Interfaces people actually want to use",
    skills: [
      { name: "TypeScript", category: "language", level: "advanced", icon: "/TypeScript.png" },
      { name: "JavaScript", category: "language", level: "expert", icon: "/JavaScript.png" },
      { name: "React.js", category: "framework", level: "advanced", icon: "/React.png" },
      { name: "Next.js", category: "framework", level: "advanced", icon: "/nextjs.png" },
      { name: "Vue.js", category: "framework", level: "proficient", icon: "/Vue.js.png" },
      { name: "Tailwind CSS", category: "framework", level: "expert", icon: "/Tailwind CSS.png" },
      { name: "Bootstrap", category: "framework", level: "advanced", icon: "/Bootstrap.png" },
    ],
  },
  {
    name: "AI & Automation",
    subtitle: "Putting models and scripts to work on real problems",
    skills: [
      { name: "OpenAI API", category: "ai", level: "advanced", icon: "/openai.png" },
      { name: "Google Gemini", category: "ai", level: "advanced", icon: "/gemini-color.png" },
      { name: "Prompt Engineering", category: "ai", level: "advanced" },
      { name: "TensorFlow", category: "ai", level: "proficient", icon: "/TensorFlow.png" },
      { name: "Workflow Automation", category: "automation", level: "advanced" },
    ],
  },
  {
    name: "Cloud & Infrastructure",
    subtitle: "Shipping it and keeping it running",
    skills: [
      { name: "Docker", category: "devops", level: "advanced", icon: "/Docker.png" },
      { name: "Linux", category: "os", level: "advanced", icon: "/Linux.png" },
      { name: "Shell Scripting", category: "devops", level: "advanced" },
      { name: "Vercel", category: "deployment", level: "advanced", icon: "/vercel.png" },
      { name: "Railway", category: "deployment", level: "advanced", icon: "/railway-2.png" },
      { name: "Netlify", category: "deployment", level: "proficient", icon: "/netlify.png" },
    ],
  },
  {
    name: "Data & Databases",
    subtitle: "Modeling, querying, and making it fast",
    skills: [
      { name: "MySQL", category: "database", level: "expert", icon: "/MySQL.png" },
      { name: "Firebase", category: "database", level: "advanced", icon: "/Firebase.png" },
      { name: "Query Optimization", category: "database", level: "advanced" },
      { name: "Postman", category: "tool", level: "expert", icon: "/Postman.png" },
    ],
  },
];

export const levelConfig = {
  expert: { label: "Expert", color: "bg-emerald-500", textColor: "text-emerald-500", dots: 3 },
  advanced: { label: "Advanced", color: "bg-blue-500", textColor: "text-blue-500", dots: 2 },
  proficient: { label: "Proficient", color: "bg-amber-500", textColor: "text-amber-500", dots: 1 },
} as const;

export const capabilities = [
  {
    id: "backend",
    title: "Backend & Systems",
    description:
      "I design the data models, business logic, and APIs behind production systems handling real company data, processes, and users. I choose the stack that fits the problem, not the other way around.",
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
    title: "Frontend & Product",
    description:
      "I turn requirements into interfaces people can actually use: admin panels, internal tools, and data-driven dashboards, all wired to whatever API backs them.",
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
      "I integrate AI into production admin tools: automated content creation with OpenAI API, intelligent chatbots, and workflow automation that eliminates manual, repetitive tasks.",
    highlights: [
      "OpenAI API for automated SEO metadata generation in admin tools",
      "GST & Pincode API integrations for production workflows",
      "Custom chatbot development (Gemini API)",
      "Prompt engineering for reliable, domain-specific outputs",
    ],
    technologies: ["OpenAI API", "Google Gemini", "Python", "GST API"],
  },
  {
    id: "devops",
    title: "DevOps & Deployment",
    description:
      "I handle application deployment and production environment management: VPS migrations, automated backups, Netdata monitoring, and server stability across multiple production environments.",
    highlights: [
      "Migrated production infra from TMD Hosting → Hostinger (zero downtime)",
      "Deployed 7+ staging & production environments",
      "Automated bidirectional backups via cron jobs & shell scripts",
      "Netdata real-time monitoring for CPU, memory & network",
    ],
    technologies: ["Docker", "Linux", "VPS", "Railway", "Hostinger", "Netdata", "Shell Script"],
  },
];

export const aiExperiments = [
  {
    title: "AI-Powered Admin Panel",
    description:
      "Built a Next.js admin panel for Sportiff India that uses OpenAI API to auto-generate SEO-optimized product descriptions, meta tags, and content, reducing content creation time from hours to seconds.",
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
    title: "GST Verification Service",
    description:
      "Integrated a Python-based GST verification application for Sportiff India's B2B workflows and deployed it on Railway. Handles real-time GST number validation in production.",
    type: "Production Integration",
    technologies: ["Python", "GST API", "Railway"],
  },
  {
    title: "Server Automation Suite",
    description:
      "Engineered automated backup and synchronization systems using shell scripts and cron jobs for database and file backups across TMD Hosting, Hostinger, and internal VPS to ensure zero data loss.",
    type: "Infrastructure",
    technologies: ["Bash", "Cron", "Linux", "MySQL"],
  },
];
