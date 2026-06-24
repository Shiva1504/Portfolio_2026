// "How I Think" — the repeatable loop I run on any problem, in any stack.
// Icons map to lucide-react names resolved in the component.
export interface ProcessStep {
  step: string;
  icon: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    icon: "Search",
    title: "Understand the problem",
    description:
      "Before code, I dig into the actual need: who's affected, what's slow or broken, what 'solved' really looks like. Most bad software starts with solving the wrong problem.",
  },
  {
    step: "02",
    icon: "PenTool",
    title: "Design the solution",
    description:
      "I map the data, the flows, and the trade-offs first. Architecture decisions made on paper are cheap; the ones discovered in production are not.",
  },
  {
    step: "03",
    icon: "Wrench",
    title: "Select the tools",
    description:
      "Only now do I pick the stack: the one that fits the problem, the timeline, and the team. The language is an implementation detail, not the identity.",
  },
  {
    step: "04",
    icon: "Zap",
    title: "Build fast",
    description:
      "Ship a working version quickly to get real feedback. Momentum and a tight feedback loop beat a perfect plan that never meets reality.",
  },
  {
    step: "05",
    icon: "Gauge",
    title: "Optimize",
    description:
      "Measure, then make it fast and reliable where it matters: killing N+1 queries, tightening response times, hardening the edge cases that bite in production.",
  },
  {
    step: "06",
    icon: "RefreshCw",
    title: "Iterate",
    description:
      "Solutions are never finished. I watch how it's used, learn whatever new tool the next iteration needs, and improve. The loop never really stops.",
  },
];
