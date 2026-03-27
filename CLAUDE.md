# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Run production server
```

No test suite is configured.

## Architecture

This is a **single-page Next.js 15 portfolio** using the App Router. The entire site lives at `src/app/page.tsx`, which composes all sections sequentially. Navigation uses hash anchors (`#section-id`) for in-page scrolling.

### Page Sections (in order)
`Navbar` → `Hero` → `Capabilities` → `FeaturedProjects` → `Experience` → `Skills` → `AIWork` → `Contact` → `Footer`

### Data Layer
All content is static TypeScript in `src/data/`:
- `projects.ts` — Project metadata with typed `Project` interface
- `skills.ts` — `SkillCategory[]`, capabilities, and AI experiments
- `experience.ts` — Work history
- `profile.ts` — Personal info (`as const`)

To update site content, edit these data files — no component changes needed.

### Component Structure
- `src/components/sections/` — One file per page section
- `src/components/shared/` — `AnimatedSection` (scroll-triggered Framer Motion wrapper), `TechBadge`, `SectionHeader`
- `src/components/layout/` — `Navbar`, `Footer`
- `src/components/ui/` — shadcn/ui primitives (Button, Badge, Separator)
- `src/lib/utils.ts` — `cn()` for class merging (clsx + twMerge)

### Styling
- Tailwind CSS v4 with `@import "tailwindcss"` (no `tailwind.config.js`)
- Always-on dark theme via `.dark` class on `<html>` (defined in `globals.css` with OKLch CSS variables)
- Path alias `@/*` → `src/*`

### Key Patterns
- All interactive components use `"use client"` directive
- Scroll animations use Framer Motion's `whileInView` via the `AnimatedSection` wrapper
- No global state management — only local `useState` (Navbar scroll/mobile menu)
- Tech icons are static images in `public/`; inline icons use `lucide-react`
- shadcn components scaffolded with `components.json` (style: "new-york")
