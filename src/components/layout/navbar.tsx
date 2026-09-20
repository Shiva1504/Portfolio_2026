"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, SquareTerminal, Command, FlaskConical } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LiveClock } from "@/components/spatial/hud";
import { OPEN_PALETTE_EVENT } from "@/components/spatial/command-palette";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#capabilities", sectionId: "capabilities" },
  { label: "Process", href: "#process", sectionId: "process" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
  { label: "Experience", href: "#experience", sectionId: "experience" },
  { label: "Skills", href: "#skills", sectionId: "skills" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const isPlayground = pathname === "/playground";
  const isFun = pathname === "/fun";
  const onHome = pathname === "/";
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy — only runs on home page
  useEffect(() => {
    if (!onHome) return;
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(sectionId); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [onHome]);

  // Away from the home page, hash links must navigate to /#section
  const sectionHref = (href: string) => (onHome ? href : `/${href}`);

  const openPalette = () => window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT));

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3"
      >
        {/* Floating glass dock */}
        <nav
          className={cn(
            "relative mx-auto max-w-5xl glass-panel rounded-2xl h-12 pl-4 pr-2 flex items-center justify-between overflow-hidden transition-shadow duration-300",
            scrolled && "shadow-lg shadow-background/60"
          )}
        >
          <Link
            href="/"
            className="font-mono text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors shrink-0"
          >
            shiva<span className="text-primary">.os</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={sectionHref(link.href)}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-xs transition-colors duration-200",
                  onHome && activeSection === link.sectionId
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {onHome && activeSection === link.sectionId && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10 border border-primary/20"
                    transition={{ type: "spring", stiffness: 450, damping: 38 }}
                  />
                )}
              </a>
            ))}

            {/* Playground link */}
            <Link
              href="/playground"
              className={cn(
                "relative rounded-full px-3 py-1.5 text-xs transition-colors duration-200 flex items-center gap-1.5",
                isPlayground
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <SquareTerminal className="h-3.5 w-3.5" />
              Playground
              {isPlayground && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/10 border border-primary/20"
                  transition={{ type: "spring", stiffness: 450, damping: 38 }}
                />
              )}
            </Link>

            {/* Fun link */}
            <Link
              href="/fun"
              className={cn(
                "relative rounded-full px-3 py-1.5 text-xs transition-colors duration-200 flex items-center gap-1.5",
                isFun ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <FlaskConical className="h-3.5 w-3.5" />
              Fun
              {isFun && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/10 border border-primary/20"
                  transition={{ type: "spring", stiffness: 450, damping: 38 }}
                />
              )}
            </Link>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <LiveClock className="hidden lg:inline text-[10px]" />
            <button
              onClick={openPalette}
              aria-label="Open command palette"
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/40 px-2 py-1 text-[10px] font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <Command className="h-3 w-3" aria-hidden />K
            </button>
            <Button size="sm" asChild className="hidden md:inline-flex h-8 text-xs">
              <a href={sectionHref("#contact")}>Get in Touch</a>
            </Button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Scroll progress — bottom edge of the dock */}
          {onHome && (
            <motion.div
              aria-hidden
              style={{ scaleX: scrollYProgress }}
              className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-primary/80 via-aurora/70 to-primary/40"
            />
          )}
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col items-center gap-6 pt-12">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={sectionHref(link.href)}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-lg transition-colors",
                    onHome && activeSection === link.sectionId
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/playground"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-lg transition-colors flex items-center gap-2",
                  isPlayground
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <SquareTerminal className="h-4 w-4" />
                Playground
              </Link>
              <Link
                href="/fun"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-lg transition-colors flex items-center gap-2",
                  isFun
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <FlaskConical className="h-4 w-4" />
                Fun
              </Link>
              <Button asChild className="mt-4">
                <a href={sectionHref("#contact")} onClick={() => setMobileOpen(false)}>
                  Get in Touch
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
