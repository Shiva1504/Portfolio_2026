"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, SquareTerminal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#capabilities", sectionId: "capabilities" },
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy — only runs on home page
  useEffect(() => {
    if (isPlayground) return;
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
  }, [isPlayground]);

  // When on /playground, hash links must navigate to /#section
  const sectionHref = (href: string) => isPlayground ? `/${href}` : href;
  const contactHref = sectionHref("#contact");

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || isPlayground
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground hover:text-foreground/80 transition-colors"
          >
            sn<span className="text-primary/60">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={sectionHref(link.href)}
                className={cn(
                  "text-sm transition-colors duration-200 relative py-1",
                  !isPlayground && activeSection === link.sectionId
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {!isPlayground && activeSection === link.sectionId && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-foreground/60 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </a>
            ))}

            {/* Playground link */}
            <Link
              href="/playground"
              className={cn(
                "text-sm transition-colors duration-200 relative py-1 flex items-center gap-1.5",
                isPlayground
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <SquareTerminal className="h-3.5 w-3.5" />
              Playground
              {isPlayground && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-foreground/60 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
            </Link>

            <Button size="sm" asChild>
              <a href={contactHref}>Get in Touch</a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
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
                    !isPlayground && activeSection === link.sectionId
                      ? "text-foreground font-medium"
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
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <SquareTerminal className="h-4 w-4" />
                Playground
              </Link>
              <Button asChild className="mt-4">
                <a href={contactHref} onClick={() => setMobileOpen(false)}>
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
