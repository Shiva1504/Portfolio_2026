---
name: verify
description: Build, launch, and visually drive this Next.js portfolio to verify UI changes end-to-end.
---

# Verifying this portfolio

Single-page Next.js site (App Router) + `/playground` terminal page. No test suite — verification is visual/runtime.

## Launch

```bash
npm run dev -- --port 3111        # dev server (background)
npm run lint && npm run build     # gates, not evidence
```

## Drive (headless Chrome via playwright-core)

No playwright in the repo. Install `playwright-core` in a scratch dir and launch with `channel: "chrome"` (system Google Chrome, no browser download):

```js
const { chromium } = require("playwright-core");
const browser = await chromium.launch({ channel: "chrome", headless: true });
```

Flows worth driving after UI changes:
- `/fun` physics lab: gravity tab (drag `img[alt='Laravel']` chip with mouse.down/move/up = throw; `gravity: on` button toggles zero-g), springs tab (click a letter span, read `el.style.transform` before/mid/settled to prove spring), orbit tab (mouse drag on canvas = slingshot; `satellites: NN` counter increments). Sims sleep when settled — interactions wake them.
- Desktop 1440×900: hero wake sequence (wait ~2.5s after load before screenshot), scroll to each `#capabilities #process #projects #experience #skills #ai-work #contact`, screenshot each.
- Command palette: `Meta+k`, type filter, `Enter` — check nav lands right (sections have `scroll-margin-top` for the floating dock).
- Mobile 390×844: check `document.documentElement.scrollWidth > clientWidth` (horizontal overflow), hero name fits.
- Reduced motion: new page with `reducedMotion: "reduce"` — WebGL canvas must be ABSENT (static gradient fallback), content visible.
- Collect `pageerror` + console `error` on every page — hydration mismatches show here, not in the server log.

## Gotchas

- `useReducedMotion()` render branches cause hydration mismatches (server=false). Reduced motion is handled by `<MotionConfig reducedMotion="user">` in `page.tsx` — keep it that way.
- Next dev-overlay "1 Issue" badge appears in screenshots when there's a client-side error; grep the console capture, not the server output.
- WebGL background: `src/components/spatial/space-canvas.tsx`, loaded `ssr: false`.
