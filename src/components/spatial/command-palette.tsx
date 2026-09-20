"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  Workflow,
  FolderGit2,
  Briefcase,
  Wrench,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  FileText,
  SquareTerminal,
  FlaskConical,
  Copy,
  Check,
  Search,
  CornerDownLeft,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

/** Dispatch this event from anywhere (e.g. the navbar ⌘K button) to open the palette. */
export const OPEN_PALETTE_EVENT = "shivaos:open-palette";

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  group: "Navigate" | "Connect";
  keywords: string;
  run: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const goTo = useCallback(
    (hash: string) => {
      setOpen(false);
      if (pathname === "/") {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${hash}`);
      }
    },
    [pathname, router]
  );

  const openExternal = useCallback((url: string) => {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const commands = useMemo<Command[]>(
    () => [
      { id: "about", label: "About", hint: "~/capabilities", icon: User, group: "Navigate", keywords: "about capabilities what i do", run: () => goTo("#capabilities") },
      { id: "process", label: "Process", hint: "~/process", icon: Workflow, group: "Navigate", keywords: "process how i think approach", run: () => goTo("#process") },
      { id: "projects", label: "Projects", hint: "~/projects", icon: FolderGit2, group: "Navigate", keywords: "projects work case studies", run: () => goTo("#projects") },
      { id: "experience", label: "Experience", hint: "~/experience", icon: Briefcase, group: "Navigate", keywords: "experience career jobs timeline", run: () => goTo("#experience") },
      { id: "skills", label: "Skills", hint: "~/skills", icon: Wrench, group: "Navigate", keywords: "skills stack tools technologies", run: () => goTo("#skills") },
      { id: "ai-work", label: "AI & Automation", hint: "~/ai-work", icon: Sparkles, group: "Navigate", keywords: "ai automation ml experiments", run: () => goTo("#ai-work") },
      { id: "contact", label: "Contact", hint: "~/connect", icon: Mail, group: "Navigate", keywords: "contact email reach hire", run: () => goTo("#contact") },
      {
        id: "playground",
        label: "Open Playground",
        hint: "/playground",
        icon: SquareTerminal,
        group: "Navigate",
        keywords: "playground terminal console",
        run: () => {
          setOpen(false);
          router.push("/playground");
        },
      },
      {
        id: "fun",
        label: "Open Fun Lab",
        hint: "/fun",
        icon: FlaskConical,
        group: "Navigate",
        keywords: "fun physics lab play gravity orbit games",
        run: () => {
          setOpen(false);
          router.push("/fun");
        },
      },
      {
        id: "copy-email",
        label: copied ? "Email copied" : "Copy email",
        hint: profile.email,
        icon: copied ? Check : Copy,
        group: "Connect",
        keywords: "copy email address clipboard",
        run: () => {
          navigator.clipboard.writeText(profile.email).then(() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
              setOpen(false);
            }, 900);
          });
        },
      },
      { id: "github", label: "GitHub", hint: "Shiva1504", icon: Github, group: "Connect", keywords: "github code repos source", run: () => openExternal(profile.github) },
      { id: "linkedin", label: "LinkedIn", hint: "dasarisambasivanaidu", icon: Linkedin, group: "Connect", keywords: "linkedin connect network", run: () => openExternal(profile.linkedin) },
      { id: "resume", label: "View Resume", hint: "PDF", icon: FileText, group: "Connect", keywords: "resume cv download pdf", run: () => openExternal(profile.resumeUrl) },
    ],
    [goTo, openExternal, router, copied]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords.includes(q)
    );
  }, [commands, query]);

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    if (next) {
      setQuery("");
      setSelected(0);
    }
  }, []);

  // Global shortcuts: ⌘K / Ctrl+K toggles; navbar button dispatches the open event.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (!v) {
            setQuery("");
            setSelected(0);
          }
          return !v;
        });
      }
    };
    const onOpenEvent = () => handleOpenChange(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpenEvent);
    };
  }, [handleOpenChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[selected]?.run();
    }
  };

  // Keep the selected row visible while arrowing through the list.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${selected}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  let flatIndex = -1;
  const groups: Command["group"][] = ["Navigate", "Connect"];

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-0 z-[90] bg-background/60 backdrop-blur-sm"
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild forceMount onOpenAutoFocus={(e) => e.preventDefault()}>
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.97, y: 8, filter: "blur(4px)" }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-1/2 top-[18vh] z-[95] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 rounded-2xl glass-panel shadow-2xl shadow-background/80 overflow-hidden"
              >
                <DialogPrimitive.Title className="sr-only">
                  Command palette
                </DialogPrimitive.Title>

                <div className="flex items-center gap-3 px-4 h-13 border-b border-border/60">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelected(0);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Where to?"
                    className="flex-1 h-13 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
                  />
                  <kbd className="hud-label rounded border border-border/60 px-1.5 py-0.5 text-[10px]">
                    esc
                  </kbd>
                </div>

                <div ref={listRef} className="max-h-[46vh] overflow-y-auto p-2">
                  {filtered.length === 0 && (
                    <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                      Nothing matches “{query}”. Try “projects” or “email”.
                    </p>
                  )}
                  {groups.map((group) => {
                    const items = filtered.filter((c) => c.group === group);
                    if (items.length === 0) return null;
                    return (
                      <div key={group} className="mb-1">
                        <p className="hud-label px-3 pt-2 pb-1 text-[10px]">{group}</p>
                        {items.map((cmd) => {
                          flatIndex += 1;
                          const index = flatIndex;
                          const isSelected = index === selected;
                          return (
                            <button
                              key={cmd.id}
                              data-index={index}
                              onClick={cmd.run}
                              onMouseMove={() => setSelected(index)}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                                isSelected
                                  ? "bg-primary/10 text-foreground"
                                  : "text-muted-foreground"
                              )}
                            >
                              <cmd.icon
                                className={cn(
                                  "h-4 w-4 shrink-0",
                                  isSelected ? "text-primary" : "text-muted-foreground/70"
                                )}
                              />
                              <span className="flex-1">{cmd.label}</span>
                              <span className="hud-label text-[10px] normal-case tracking-normal truncate max-w-[40%]">
                                {cmd.hint}
                              </span>
                              {isSelected && (
                                <CornerDownLeft className="h-3 w-3 text-primary/70 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
