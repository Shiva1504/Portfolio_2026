"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { JetBrains_Mono } from "next/font/google";
import { allProjects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experiences, education } from "@/data/experience";
import { profile } from "@/data/profile";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

// ─── Types ────────────────────────────────────────────────────────────────────
interface Line { id: string; node: React.ReactNode }

// ─── Constants ────────────────────────────────────────────────────────────────
const COMMANDS = [
  "/about", "/clear", "/contact", "/date", "/experience",
  "/github", "/help", "/projects", "/resume", "/skills", "/whoami",
];
const BOOT = [
  "> Initializing Shiva Dev Terminal...",
  "> Loading developer profile...",
  "> Ready.",
];

// ─── Color palette (GitHub Dark) ──────────────────────────────────────────────
const GRN = "#3fb950";
const BLU = "#58a6ff";
const MUT = "#7d8590";
const TXT = "#e6edf3";
const RED = "#f85149";
const YLW = "#d29922";
const ORG = "#ffa657";
const DIM = "#3d444d";

const g = (s: React.ReactNode) => <span style={{ color: GRN }}>{s}</span>;
const b = (s: React.ReactNode) => <span style={{ color: BLU }}>{s}</span>;
const m = (s: React.ReactNode) => <span style={{ color: MUT }}>{s}</span>;
const t = (s: React.ReactNode) => <span style={{ color: TXT }}>{s}</span>;
const r = (s: React.ReactNode) => <span style={{ color: RED }}>{s}</span>;
const y = (s: React.ReactNode) => <span style={{ color: YLW }}>{s}</span>;
const o = (s: React.ReactNode) => <span style={{ color: ORG }}>{s}</span>;

// ─── Utilities ────────────────────────────────────────────────────────────────
// Use timestamp+random so keys survive hot-reloads and Strict Mode double-runs
const mkLine = (node: React.ReactNode): Line => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  node,
});
const blank = () => mkLine(<div style={{ height: "0.4em" }} />);

// ─── Prompt ───────────────────────────────────────────────────────────────────
function Prompt() {
  return (
    <span className="shrink-0 select-none whitespace-nowrap">
      {g("shiva")}{m("@")}{b("portfolio")}{m(" ~ $")}
    </span>
  );
}

// ─── Boot line with typing animation ──────────────────────────────────────────
function BootLine({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  const [chars, setChars] = useState(0);
  useEffect(() => {
    let rafId: number;
    const timeout = setTimeout(() => {
      let i = 0;
      const tick = () => {
        i++;
        setChars(i);
        if (i < text.length) rafId = requestAnimationFrame(tick);
      };
      // ~18ms per char via rAF batching
      const interval = setInterval(() => {
        i++;
        setChars(i);
        if (i >= text.length) clearInterval(interval);
      }, 18);
      return () => clearInterval(interval);
    }, startDelay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(rafId); };
  }, [text, startDelay]);

  return (
    <div className="leading-relaxed" style={{ color: MUT }}>
      {text.slice(0, chars)}
      {chars < text.length && (
        <span className="inline-block align-middle ml-px" style={{ width: "0.5em", height: "1em", background: MUT, animation: "blink 0.8s step-end infinite" }} />
      )}
    </div>
  );
}

// ─── Command Output Components ────────────────────────────────────────────────
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2 flex-wrap">
      <span style={{ color: MUT, minWidth: "9ch", flexShrink: 0 }}>{label}</span>
      <span style={{ color: TXT }}>{children}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {b(title)}
        <span style={{ color: DIM, userSelect: "none" }}>{"─".repeat(30)}</span>
      </div>
      {children}
    </div>
  );
}

function HelpOutput() {
  const cmds: [string, string][] = [
    ["/projects",    "All projects — tech stack & impact"],
    ["/experience",  "Work history & education"],
    ["/skills",      "Categorized technical skills"],
    ["/about",       "Developer bio & summary"],
    ["/contact",     "Email, GitHub, LinkedIn, phone"],
    ["/whoami",      "Identity card"],
    ["/github",      "Open GitHub profile link"],
    ["/resume",      "Get resume link"],
    ["/date",        "Current date & time"],
    ["/clear",       "Clear terminal"],
    ["/help",        "Show this help"],
  ];
  return (
    <Section title="Available commands">
      <div className="space-y-0.5 pl-1">
        {cmds.map(([cmd, desc]) => (
          <div key={cmd} className="flex gap-3 flex-wrap">
            <span style={{ color: GRN, minWidth: "14ch", display: "inline-block" }}>{cmd}</span>
            <span style={{ color: MUT }}>{desc}</span>
          </div>
        ))}
      </div>
      <div className="mt-1 pl-1">
        {m("Press ")} {g("↑ ↓")} {m(" for history  ·  ")} {g("Tab")} {m(" to autocomplete")}
      </div>
    </Section>
  );
}

function ProjectsOutput() {
  return (
    <Section title={`Projects (${allProjects.length})`}>
      <div className="space-y-3 pl-1">
        {allProjects.map((p, i) => (
          <div key={p.id} className="space-y-0.5 border-l-2 pl-3" style={{ borderColor: DIM }}>
            <div>
              {g(`${String(i + 1).padStart(2, "0")}. `)}
              {t(p.title)}{" "}
              {m(`[${p.category}]`)}
            </div>
            <div className="pl-4">
              {m("╰ role:   ")}{t(p.role)}
            </div>
            <div className="pl-4">
              {m("  tech:   ")}{t(p.technologies.slice(0, 5).join(", "))}
              {p.technologies.length > 5 ? m(` +${p.technologies.length - 5}`) : ""}
            </div>
            <div className="pl-4">
              {m("  impact: ")}<span style={{ color: MUT }}>{p.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ExperienceOutput() {
  return (
    <Section title="Experience & Education">
      <div className="space-y-4 pl-1">
        {experiences.map((exp) => (
          <div key={exp.id} className="border-l-2 pl-3 space-y-1" style={{ borderColor: DIM }}>
            <div>{g(exp.title)}{m(" @ ")}{t(exp.company)}</div>
            <div className="pl-2">{m(exp.period + "  ·  " + exp.type)}</div>
            <div className="pl-2">
              {m("stack: ")}{t(exp.technologies.slice(0, 8).join(" · "))}
              {exp.technologies.length > 8 ? m(` +${exp.technologies.length - 8}`) : ""}
            </div>
            <div className="pl-2 space-y-0.5 mt-1">
              {exp.achievements.slice(0, 4).map((a, idx) => (
                <div key={idx}>{m("• ")}<span style={{ color: MUT }}>{a}</span></div>
              ))}
              {exp.achievements.length > 4 && (
                <div>{m(`  … and ${exp.achievements.length - 4} more achievements`)}</div>
              )}
            </div>
          </div>
        ))}
        <div className="border-l-2 pl-3 space-y-1" style={{ borderColor: DIM }}>
          <div>{g(education.degree)}</div>
          <div className="pl-2">{m(`${education.university}  ·  ${education.period}  ·  GPA: ${education.gpa}`)}</div>
        </div>
      </div>
    </Section>
  );
}

function SkillsOutput() {
  return (
    <Section title="Technical Skills">
      <div className="space-y-2 pl-1">
        {skillCategories.map((cat) => (
          <div key={cat.name}>
            <div>{o(cat.name + ":")}</div>
            <div className="pl-4 flex flex-wrap gap-x-1 gap-y-0">
              {cat.skills.map((s, i) => (
                <React.Fragment key={s.name}>
                  {t(s.name)}
                  {i < cat.skills.length - 1 && m("  ·  ")}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function AboutOutput() {
  return (
    <Section title="About">
      <div className="space-y-1.5 pl-1">
        <Row label="name:">{profile.fullName}</Row>
        <Row label="role:">{profile.role}</Row>
        <Row label="location:">{profile.location}</Row>
        <Row label="status:">{g("● ")}{g(profile.availability)}</Row>
        <Row label="stack:">{"Laravel · Next.js · PHP · MySQL · OpenAI API · Docker"}</Row>
        <Row label="exp:">{"Currently at Sportiff India — ERP systems, admin panels, AI integrations, 7+ production environments"}</Row>
      </div>
    </Section>
  );
}

function ContactOutput() {
  return (
    <Section title="Contact">
      <div className="space-y-1 pl-1">
        <Row label="email:">
          <a href={`mailto:${profile.email}`} style={{ color: BLU }} className="hover:underline underline-offset-2">
            {profile.email}
          </a>
        </Row>
        <Row label="github:">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" style={{ color: BLU }} className="hover:underline underline-offset-2">
            github.com/Shiva1504
          </a>
        </Row>
        <Row label="linkedin:">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: BLU }} className="hover:underline underline-offset-2">
            in/dasarisambasivanaidu
          </a>
        </Row>
        <Row label="phone:">{profile.phone}</Row>
      </div>
    </Section>
  );
}

function WhoamiOutput() {
  return (
    <div className="space-y-0.5">
      <div>{g(profile.fullName)}</div>
      <Row label="role:">{profile.role}</Row>
      <Row label="location:">{profile.location}</Row>
      <Row label="focus:">{"Laravel · Next.js · REST APIs · AI Integrations"}</Row>
      <Row label="status:">{g(profile.availability)}</Row>
      <Row label="github:">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" style={{ color: BLU }} className="hover:underline">
          {profile.github}
        </a>
      </Row>
    </div>
  );
}

function GithubOutput() {
  return (
    <div className="space-y-0.5">
      {m("↗ GitHub profile:")}
      <div>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" style={{ color: BLU }} className="hover:underline underline-offset-2">
          {profile.github}
        </a>
      </div>
    </div>
  );
}

function ResumeOutput() {
  const hasResume = profile.resumeUrl && (profile.resumeUrl as string) !== "#";
  return hasResume ? (
    <div className="space-y-0.5">
      {m("Resume:")}
      <div>
        <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ color: BLU }} className="hover:underline underline-offset-2">
          {profile.resumeUrl}
        </a>
      </div>
    </div>
  ) : (
    <div>
      {y("Resume link not configured.")}{" "}
      {m("Set resumeUrl in profile.ts")}
    </div>
  );
}

function DateOutput() {
  const now = new Date();
  return (
    <div className="space-y-0.5">
      <div>{t(now.toDateString())}</div>
      <div>{m(now.toLocaleTimeString() + "  ·  " + Intl.DateTimeFormat().resolvedOptions().timeZone)}</div>
    </div>
  );
}

function NotFound({ cmd }: { cmd: string }) {
  return (
    <div className="space-y-0.5">
      <div>{r("command not found: ")}{t(cmd)}</div>
      <div>{m("Type ")}{g("/help")}{m(" to see available commands.")}</div>
    </div>
  );
}

function Welcome() {
  return (
    <div className="space-y-2">
      <div style={{ color: GRN, fontWeight: 700 }}>
        Welcome to Shiva&apos;s Developer Playground.
      </div>
      <HelpOutput />
    </div>
  );
}

// ─── Command dispatcher ───────────────────────────────────────────────────────
function resolve(cmd: string): React.ReactNode {
  switch (cmd.toLowerCase().trim()) {
    case "/projects":   return <ProjectsOutput />;
    case "/experience": return <ExperienceOutput />;
    case "/skills":     return <SkillsOutput />;
    case "/about":      return <AboutOutput />;
    case "/contact":    return <ContactOutput />;
    case "/help":       return <HelpOutput />;
    case "/whoami":     return <WhoamiOutput />;
    case "/github":     return <GithubOutput />;
    case "/resume":     return <ResumeOutput />;
    case "/date":       return <DateOutput />;
    default:            return <NotFound cmd={cmd} />;
  }
}

// ─── Terminal Component ───────────────────────────────────────────────────────
export function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [booting, setBooting] = useState(true);
  const [suggestion, setSuggestion] = useState("");

  const router = useRouter();
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Boot sequence — no hasBooted guard so Strict Mode's second run cleanly
  // replaces the first (setLines replaces state, cancelled timer means no leak)
  useEffect(() => {
    setBooting(true);
    // Replace state with fresh boot lines on every run
    setLines([
      mkLine(<BootLine text={BOOT[0]} startDelay={0} />),
      mkLine(<BootLine text={BOOT[1]} startDelay={600} />),
      mkLine(<BootLine text={BOOT[2]} startDelay={1100} />),
    ]);

    const timer = setTimeout(() => {
      setLines(prev => [...prev, blank(), mkLine(<Welcome />), blank()]);
      setBooting(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Focus input once boot finishes
  useEffect(() => {
    if (!booting) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [booting]);

  // Tab suggestion
  useEffect(() => {
    if (!input.startsWith("/") || input.length < 2) { setSuggestion(""); return; }
    const match = COMMANDS.find(c => c.startsWith(input) && c !== input);
    setSuggestion(match ? match.slice(input.length) : "");
  }, [input]);

  const exec = useCallback((raw: string) => {
    const cmd = raw.trim();
    setLines(prev => [
      ...prev,
      mkLine(
        <div className="flex items-baseline gap-2 flex-wrap">
          <Prompt />
          <span style={{ color: TXT }}>{cmd}</span>
        </div>
      ),
    ]);
    if (!cmd) { setLines(prev => [...prev, blank()]); return; }
    if (cmd === "/clear") { setLines([]); return; }
    setCmdHistory(prev => [cmd, ...prev.slice(0, 49)]);
    setHistoryIdx(-1);
    setLines(prev => [...prev, mkLine(resolve(cmd)), blank()]);
  }, []);

  const handleKey = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        exec(input);
        setInput("");
        setSuggestion("");
        break;
      case "ArrowUp":
        e.preventDefault();
        if (cmdHistory.length === 0) break;
        {
          const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
          setHistoryIdx(next);
          setInput(cmdHistory[next] ?? "");
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        {
          const next = Math.max(historyIdx - 1, -1);
          setHistoryIdx(next);
          setInput(next === -1 ? "" : (cmdHistory[next] ?? ""));
        }
        break;
      case "Tab":
        e.preventDefault();
        if (suggestion) { setInput(prev => prev + suggestion); setSuggestion(""); }
        break;
      case "c":
        if (e.ctrlKey) {
          e.preventDefault();
          setLines(prev => [
            ...prev,
            mkLine(<div className="flex gap-2"><Prompt /><span style={{ color: MUT }}>^C</span></div>),
          ]);
          setInput(""); setSuggestion("");
        }
        break;
      case "l":
        if (e.ctrlKey) { e.preventDefault(); setLines([]); }
        break;
    }
  }, [input, suggestion, exec, historyIdx, cmdHistory]);

  const QUICK_CMDS = ["/help", "/projects", "/skills", "/experience", "/about", "/contact", "/clear"];

  return (
    <div
      className={`${mono.className} flex flex-col overflow-hidden`}
      style={{ height: "calc(100vh - 4rem)", background: "#0d1117" }}
    >
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      <div className="flex flex-col flex-1 overflow-hidden p-3 md:p-5 gap-3">

        {/* Terminal window */}
        <div
          className="flex flex-col flex-1 overflow-hidden rounded-xl"
          style={{
            border: "1px solid #30363d",
            background: "#0d1117",
            boxShadow: [
              "0 0 0 1px #21262d",
              "0 24px 64px rgba(0,0,0,0.75)",
              "0 0 100px rgba(63,185,80,0.04)",
            ].join(", "),
          }}
        >
          {/* macOS title bar */}
          <div
            className="flex items-center gap-3 px-4 h-10 shrink-0 border-b select-none"
            style={{ background: "#161b22", borderColor: "#30363d" }}
          >
            <div className="flex items-center gap-1.5">
              {[
                { bg: "#ff5f57", symbol: "×", title: "Close — go home", onClick: () => router.push("/") },
                { bg: "#febc2e", symbol: "−", title: "Minimize", onClick: undefined },
                { bg: "#28c840", symbol: "⤢", title: "Maximize", onClick: undefined },
              ].map(({ bg, symbol, title, onClick }) => (
                <div
                  key={title}
                  className="group relative w-3 h-3 rounded-full"
                  style={{ background: bg, cursor: onClick ? "pointer" : "default" }}
                  title={title}
                  onClick={onClick}
                >
                  <span
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ fontSize: "7px", fontWeight: 700, lineHeight: 1, color: "rgba(0,0,0,0.5)" }}
                  >
                    {symbol}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex-1 text-center text-xs" style={{ color: MUT }}>
              shiva@portfolio — zsh — 80×24
            </div>

            {/* Right side: keyboard hint */}
            <div className="hidden md:flex items-center gap-1 text-[10px]" style={{ color: DIM }}>
              <span>Tab</span>
              <span style={{ color: "#21262d" }}>│</span>
              <span>↑↓</span>
            </div>
          </div>

          {/* Output body */}
          <div
            ref={bodyRef}
            className="flex-1 overflow-y-auto px-4 py-3 text-sm leading-relaxed cursor-text"
            style={{ color: TXT, scrollBehavior: "smooth" }}
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map(line => (
              <div key={line.id}>{line.node}</div>
            ))}

            {/* Input line */}
            {!booting && (
              <div className="flex items-center gap-2 mt-1">
                <Prompt />
                <div className="relative flex-1 min-w-0">
                  {/* Ghost suggestion */}
                  {suggestion && (
                    <div
                      className="absolute inset-y-0 left-0 flex items-center pointer-events-none whitespace-pre overflow-hidden"
                      aria-hidden
                      style={{ fontFamily: "inherit", fontSize: "inherit", lineHeight: "inherit" }}
                    >
                      <span style={{ color: "transparent" }}>{input}</span>
                      <span style={{ color: DIM }}>{suggestion}</span>
                    </div>
                  )}
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => { setInput(e.target.value); setHistoryIdx(-1); }}
                    onKeyDown={handleKey}
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    className="w-full bg-transparent outline-none border-none relative"
                    style={{
                      color: TXT,
                      caretColor: GRN,
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      lineHeight: "inherit",
                      padding: 0,
                    }}
                  />
                </div>
              </div>
            )}

            <div style={{ height: "1rem" }} />
          </div>
        </div>

        {/* Mobile quick-command bar */}
        <div
          className="md:hidden flex flex-wrap gap-1.5 pb-1"
          style={{ background: "#0d1117" }}
        >
          {QUICK_CMDS.map(cmd => (
            <button
              key={cmd}
              onClick={() => { exec(cmd); setInput(""); }}
              className="px-2.5 py-1.5 rounded-md text-xs border transition-all active:scale-95"
              style={{
                background: "#161b22",
                borderColor: "#30363d",
                color: GRN,
                fontFamily: "inherit",
              }}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
