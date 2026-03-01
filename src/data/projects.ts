export interface Project {
  id: string;
  title: string;
  subtitle: string;
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
      "React.js",
      "Stripe API",
      "MySQL",
      "Tailwind CSS",
      "Docker",
      "Vite",
    ],
    githubUrl: "#",
    featured: true,
    category: "fullstack",
  },
  {
    id: "stock-tracker",
    title: "Stock Tracker App",
    subtitle: "Product price monitoring with scraping & alerting",
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
    githubUrl: "#",
    featured: true,
    category: "backend",
  },
  {
    id: "milk-record",
    title: "Milk Record Management System",
    subtitle: "Business operations tracking for dairy retailers",
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
    liveUrl: "#",
    featured: true,
    category: "fullstack",
  },
  {
    id: "gully-premier-league",
    title: "Gully Premier League",
    subtitle: "Real-time cricket simulation with live scoring",
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
    liveUrl: "#",
    featured: false,
    category: "frontend",
  },
  {
    id: "dynamic-notes",
    title: "Dynamic Notes App",
    subtitle: "PHP MVC application with 95% test coverage",
    problem:
      "Needed a production-grade notes application demonstrating testing discipline, role-based access patterns, and clean MVC architecture.",
    solution:
      "Built a notes app with authentication, role-based access control, and comprehensive test suite. Achieved 95% code coverage with optimized database queries.",
    techDecisions:
      "Raw PHP with MVC pattern to demonstrate architectural understanding without framework abstraction. Pest for elegant testing syntax and fast execution.",
    impact: "95% test coverage — production-quality codebase demonstrating testing-first development approach.",
    challenges:
      "Implementing role-based access without a framework, building a custom MVC router, and achieving high test coverage on authentication flows.",
    technologies: ["PHP", "MySQL", "Composer", "Pest", "Tailwind CSS"],
    githubUrl: "#",
    featured: false,
    category: "backend",
  },
  {
    id: "employee-dashboard",
    title: "Employee Assistance Dashboard",
    subtitle: "Role-based dashboard with optimized data loading",
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
    liveUrl: "#",
    featured: false,
    category: "frontend",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const allProjects = projects;
