You are working on my personal portfolio website. It is deployed on Vercel at https://www.dsn7.in (the apex dsn7.in redirects to www). DNS is on Cloudflare. Goal: make the site fully crawlable and indexable by Google, Bing and AI search engines (ChatGPT search, Perplexity, Claude, Gemini), without changing the visual design.

Step 0 - Inspect first:
Detect the framework and router (e.g. Next.js App Router, Pages Router, or something else), list the existing routes/pages, and check what SEO metadata already exists. Show me a short plan before editing.

About me (use only these facts, plus what already exists on the site):
- Name: Dasari Sambasiva Naidu
- Role: Software Engineer, focused on outcomes (APIs, web apps, AI integrations, infrastructure). Do not label me as just a PHP or framework developer.
- LinkedIn: https://www.linkedin.com/in/dasarisambasivanaidu
- GitHub: https://github.com/Shiva1504
- Contact: contact@dsn7.in

Tasks:
1. robots: allow all crawlers and reference https://www.dsn7.in/sitemap.xml. Do not block Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User or PerplexityBot. Add a commented-out block for the training bots (GPTBot, ClaudeBot, Google-Extended, CCBot) so I can enable it later.
2. sitemap.xml: generated from all public routes, absolute https://www.dsn7.in URLs, with lastModified.
3. Metadata: set metadataBase to https://www.dsn7.in; add a title template, a unique title and meta description for each page, a canonical URL pointing to the www version, Open Graph and Twitter card tags, and an Open Graph image if none exists. Make sure <html lang> is set.
4. JSON-LD: add Person schema (name, jobTitle, url, sameAs with LinkedIn and GitHub, email, knowsAbout) and WebSite schema on the homepage. Add CreativeWork or SoftwareSourceCode schema for each project page where it applies. Escape < in the JSON output.
5. Rendering and content: make sure the main content is server-rendered or static, not only loaded by client-side JavaScript. Use semantic HTML with one h1 per page, a sensible heading order, descriptive alt text and descriptive link text.
6. Old URL: permanently redirect portfolio-2026-theta-three.vercel.app to https://www.dsn7.in, keeping the path. Do not affect preview deployment URLs.
7. Performance: fix obvious Core Web Vitals issues (image dimensions, font loading, layout shift).
8. Optional: add a short /llms.txt describing who I am and listing my key pages.

Rules:
- Do not invent facts, ratings or claims in the metadata or schema.
- No keyword stuffing or hidden text.
- Do not add heavy new dependencies.
- Keep my existing design and content unless a change is required for SEO.

When finished:
- Run a production build and fix any errors.
- Check that /robots.txt and /sitemap.xml return correctly.
- Summarize every file you changed.
- List anything I still need to do manually.