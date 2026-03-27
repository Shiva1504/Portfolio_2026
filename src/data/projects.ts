export interface Project {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  problem: string;
  solution: string;
  techDecisions: string;
  impact: string;
  challenges: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: "fullstack" | "frontend" | "ai" | "backend";
  image?: string;
}

export const projects: Project[] = [
  {
    id: "saas-subscription",
    title: "SaaS Subscription Platform",
    subtitle: "Full-stack billing system with Stripe integration",
    role: "Full Stack Developer",
    problem:
      "Businesses needed a reliable subscription management system with secure payment processing, role-based access control, and automated billing cycles.",
    solution:
      "Built a complete SaaS billing platform using Laravel and React with Stripe-powered subscription plans. Implemented webhook listeners for real-time billing accuracy and role-based access for multi-tier plans.",
    techDecisions:
      "Chose Laravel for its robust queue system and webhook handling, paired with React for a responsive billing dashboard. Stripe webhooks ensure payment state is always synchronized with the database.",
    impact:
      "Production-ready billing system with automated subscription lifecycle management, reducing manual billing intervention to zero.",
    challenges:
      "Handling Stripe webhook idempotency and edge cases like failed payments, subscription upgrades mid-cycle, and race conditions in concurrent webhook deliveries.",
    technologies: [
      "Laravel 10",
      "PHP 8.x",
      "React.js",
      "Stripe API",
      "MySQL",
      "Tailwind CSS",
      "Vite",
      "Docker",
    ],
    githubUrl: "https://github.com/Shiva1504",
    featured: true,
    category: "fullstack",
  },
  {
    id: "stock-tracker",
    title: "Stock Tracker App",
    subtitle: "Product price monitoring with scraping & alerting",
    role: "Backend Developer",
    problem:
      "E-commerce businesses needed automated price monitoring across products with historical tracking, alerts for price changes, and exportable reports.",
    solution:
      "Built a Laravel-based product tracker with web scraping, queue workers for background jobs, price change alerting, and interactive charts for trend visualization. Includes admin dashboard and CSV exports.",
    techDecisions:
      "Laravel queues handle scraping jobs asynchronously to avoid timeout issues. Chart.js provides interactive visualizations. Pest testing ensures scraping logic reliability.",
    impact:
      "Automated monitoring system that tracks price fluctuations in real-time, with admin dashboard for managing hundreds of products.",
    challenges:
      "Handling rate limiting on scraped sites, managing queue worker reliability, and building resilient parsers for varying HTML structures.",
    technologies: [
      "Laravel 12",
      "PHP 8.2",
      "MySQL",
      "Tailwind CSS",
      "Chart.js",
      "Docker",
      "Pest",
    ],
    githubUrl: "https://github.com/Shiva1504",
    featured: true,
    category: "backend",
  },
  {
    id: "milk-record",
    title: "Milk Record Management System",
    subtitle: "Business operations tracking for dairy retailers",
    role: "Full Stack Developer",
    problem:
      "Dairy retailers needed a digital system to replace manual record-keeping for daily milk quantities, billing with flexible payment cycles, and multi-retailer management.",
    solution:
      "Built a comprehensive tracking system with daily quantity logging, automated bill calculation supporting partial and flexible payment cycles, and a mobile-responsive interface with secure authentication.",
    techDecisions:
      "Laravel's Eloquent ORM simplified complex billing calculations. Bootstrap ensured mobile-first responsive design critical for on-field usage by retailers.",
    impact:
      "Digitized daily operations for multiple retailers — eliminated paper-based tracking errors and reduced billing disputes.",
    challenges:
      "Designing flexible payment cycle logic that supports partial payments, advances, and variable pricing across different retailers.",
    technologies: ["Laravel 10", "PHP 8.x", "MySQL", "Bootstrap 5"],
    liveUrl: "https://github.com/Shiva1504",
    featured: true,
    category: "fullstack",
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot",
    subtitle: "Gemini-powered conversational assistant with prompt engineering",
    role: "Full Stack Developer",
    problem:
      "Needed a domain-specific conversational AI that could respond accurately to context-aware queries with low latency.",
    solution:
      "Built a chatbot powered by Google Gemini API with custom prompt engineering for domain-specific responses. Used async JavaScript patterns to optimize response latency and deliver a smooth chat experience.",
    techDecisions:
      "PHP handles the backend API calls to Gemini to keep credentials server-side. Async JS manages the streaming UX without blocking. Bootstrap provides the chat UI scaffolding.",
    impact:
      "Sub-second response latency with domain-accurate answers — demonstrates practical AI integration and prompt engineering.",
    challenges:
      "Engineering prompts that constrain Gemini to domain-specific responses without hallucination, and managing async state for smooth real-time chat updates.",
    technologies: ["PHP", "JavaScript", "Google Gemini API", "Bootstrap"],
    githubUrl: "https://github.com/Shiva1504",
    featured: false,
    category: "ai",
  },
  {
    id: "protasker",
    title: "ProTasker",
    subtitle: "Task management system with analytics & priority tracking",
    role: "Full Stack Developer",
    problem:
      "Teams needed a structured task management tool with prioritization, analytics, and real-time updates without full page reloads.",
    solution:
      "Built a task manager with authentication, priority levels (high/medium/low), analytics dashboard showing completion rates, and AJAX-driven task updates for a fluid UX.",
    techDecisions:
      "AJAX enables dynamic task operations without page reloads, improving perceived performance. Bootstrap provides a consistent, responsive layout.",
    impact:
      "Boosted task management efficiency by 35% versus spreadsheet-based tracking — measured by task resolution time.",
    challenges:
      "Designing the analytics queries to be performant across large task sets, and handling concurrent AJAX updates without race conditions.",
    technologies: ["PHP", "MySQL", "Bootstrap", "AJAX"],
    githubUrl: "https://github.com/Shiva1504",
    featured: false,
    category: "backend",
  },
  {
    id: "job-board-lite",
    title: "Job Board Lite",
    subtitle: "Laravel job platform with admin CRUD & file uploads",
    role: "Backend Developer",
    problem:
      "Organizations needed a self-hosted job portal with admin-controlled listings, structured validation, and file upload support for resumes.",
    solution:
      "Built a full job board using Laravel with admin CRUD for job listings, FormRequest validation, file upload handling, and a clean public-facing job listing UI. MVC architecture throughout with Artisan commands for management tasks.",
    techDecisions:
      "Laravel FormRequest classes enforce validation at the request layer, keeping controllers clean. Blade templates for server-rendered views ensure fast load times without a JS framework overhead.",
    impact:
      "Complete, production-structured job board — demonstrates Laravel MVC discipline, validation patterns, and file management.",
    challenges:
      "Designing a clean separation between admin and public routes, and handling file upload validation with proper MIME type checking.",
    technologies: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap"],
    githubUrl: "https://github.com/Shiva1504",
    featured: false,
    category: "backend",
  },
  {
    id: "gully-premier-league",
    title: "Gully Premier League",
    subtitle: "Real-time cricket simulation with live scoring",
    role: "Frontend Developer",
    problem:
      "Cricket enthusiasts needed an interactive simulation game with real-time scoring, MVP calculations, and persistent player statistics.",
    solution:
      "Designed a real-time cricket simulation with dynamic MVP calculations, player statistics tracking, and localStorage synchronization for persistent game state across sessions.",
    techDecisions:
      "Next.js with TypeScript for type-safe game logic. localStorage for client-side persistence without backend dependency, keeping the app fast and deployable as a static site.",
    impact:
      "Interactive game engine with real-time score updates and statistical analysis — demonstrates frontend architecture skills.",
    challenges:
      "Building a realistic scoring engine with proper cricket rules, handling edge cases in MVP calculation algorithms, and managing complex state across innings.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://github.com/Shiva1504",
    featured: false,
    category: "frontend",
  },
  {
    id: "dynamic-notes",
    title: "Dynamic Notes App",
    subtitle: "PHP MVC application with 95% test coverage",
    role: "Backend Developer",
    problem:
      "Needed a production-grade notes application demonstrating testing discipline, role-based access patterns, and clean MVC architecture without a framework.",
    solution:
      "Built a notes app with authentication, role-based access control, and comprehensive test suite. Achieved 95% code coverage with optimized database queries.",
    techDecisions:
      "Raw PHP with MVC pattern to demonstrate architectural understanding without framework abstraction. Pest for elegant testing syntax and fast execution.",
    impact: "95% test coverage — production-quality codebase demonstrating testing-first development approach.",
    challenges:
      "Implementing role-based access without a framework, building a custom MVC router, and achieving high test coverage on authentication flows.",
    technologies: ["PHP", "MySQL", "Composer", "Pest", "Tailwind CSS"],
    githubUrl: "https://github.com/Shiva1504",
    featured: false,
    category: "backend",
  },
  {
    id: "learning-continuity-matrix",
    title: "Learning Continuity Matrix",
    subtitle: "React app for visualizing learning progress in education",
    role: "Frontend Developer",
    problem:
      "Educators needed a visual tool to track and analyze learning continuity across subjects and students, replacing static spreadsheet-based reporting.",
    solution:
      "Built a responsive React application with dynamic data handling, reusable chart components, and an interactive matrix UI for visualizing learning continuity patterns.",
    techDecisions:
      "React's component model enables reusable matrix cells and row/column logic. Pure JavaScript without TypeScript kept the build simple for a data-visualization-focused project.",
    impact:
      "Interactive education visualization tool — demonstrates component architecture and dynamic data rendering in React.",
    challenges:
      "Designing a performant matrix rendering approach that handles variable row/column counts without re-rendering the entire grid on each data update.",
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3"],
    githubUrl: "https://github.com/Shiva1504",
    featured: false,
    category: "frontend",
  },
  {
    id: "employee-dashboard",
    title: "Employee Assistance Dashboard",
    subtitle: "Role-based dashboard with optimized data loading",
    role: "Frontend Developer",
    problem:
      "Organizations needed a role-based internal dashboard for employees and admins with fast data loading and clear permission boundaries.",
    solution:
      "Built a React-based dashboard with role-specific views, optimized API calls, and clean component architecture. JSON Server simulates a REST backend.",
    techDecisions:
      "React with Vite for fast development cycles. Tailwind CSS for consistent design system. JSON Server enables frontend development independent of backend readiness.",
    impact:
      "Reduced query load time by 25% through optimized data fetching and component-level caching.",
    challenges:
      "Designing a flexible role-based rendering system and optimizing re-renders for data-heavy dashboard views.",
    technologies: ["React.js", "Vite", "Tailwind CSS", "JSON Server"],
    liveUrl: "https://github.com/Shiva1504",
    featured: false,
    category: "frontend",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const allProjects = projects;
