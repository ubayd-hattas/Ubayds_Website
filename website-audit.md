# Website Audit — ubayd.me
**Audited:** 13 June 2026  
**Auditor:** Comprehensive codebase review + SEO, branding, technical, and content analysis  
**Scope:** Full codebase (Next.js 16, App Router) + live site metadata evaluation

---

## Executive Summary

**Overall Score: 7.2 / 10**

ubayd.me is a genuinely impressive personal website for a first-year student. The design is polished, the tech stack is solid, and the personal voice is authentic. The foundations are all in place. What holds it back from a higher score is a cluster of fixable issues — most critically, a metadata/SEO layer that is better than it looks in Google results but hasn't yet been optimised to compete for single-name searches, and a blog/project presentation that is strong in structure but thin in content volume.

### Top Strengths

1. **Clean, professional visual design** — the dark/light theme, typography, and micro-animations are at a level well above typical student portfolios.
2. **Solid metadata baseline** — the global title, description, Open Graph, and Twitter Card are already well-formed and include the right keywords.
3. **SA Data Hub** is a genuinely distinctive, differentiated project — very few students your age have shipped a real public data platform.
4. **Authentic voice** — the blog post about your father and Stats SA is the most compelling content on the site. It tells a story no one else can tell.
5. **Structured JSON-LD Person schema** is implemented and contains correct, rich data.

### Top Weaknesses

1. **No `robots.txt`** — the single biggest technical SEO gap on the site.
2. **`websiteJsonLd` is defined but never rendered** — a real bug in the layout.
3. **Sitemap uses `www.ubayd.me` while the canonical is `ubayd.me`** — a URL inconsistency that confuses crawlers.
4. **Blog posts are stored as React components inside a client component** — not indexable by search engines.
5. **Homepage tagline is vague** — "Building the foundations for a life in data science and AI" doesn't communicate UCT, SA Data Hub, or your specific profile to a first-time visitor or crawler.
6. **No individual URL per blog post** — both published posts live at `/blog` with no unique slug, so they cannot rank individually in search.

---

## 1. SEO Audit

### 1.1 Metadata

| Element | Status | Notes |
|---|---|---|
| Global `<title>` | ✅ Good | "Ubayd Hattas — Data Science & Computer Science Student at UCT" — excellent |
| Title template | ✅ Good | `%s \| Ubayd Hattas` on every sub-page |
| Sub-page titles | ⚠️ Thin | "Projects", "Blog", "About" — template makes them fine but descriptions are short |
| Meta description | ✅ Good | Global description is rich, mentions UCT, Cape Town, CS, Stats & DS |
| Keywords meta | ✅ Present | Not a ranking factor but harmless |
| `metadataBase` | ✅ Correct | Set to `https://ubayd.me` |
| Open Graph | ✅ Good | Type, locale (`en_ZA`), siteName, image all set |
| OG image | ✅ Present | `/og-image.png` at 1200×630 — correct dimensions |
| Twitter Card | ✅ Good | `summary_large_image`, image set |
| Canonical URL | ⚠️ Missing | No `<link rel="canonical">` tag is output. Next.js App Router does not auto-generate canonicals. |
| `robots` meta | ✅ Good | `index: true, follow: true` with expanded Googlebot config |
| Google verification | ✅ Present | Verified via HTML file in `/public/` |

### 1.2 Structured Data / JSON-LD

**Person schema** — correctly implemented with: name, url, image, sameAs (GitHub + LinkedIn), jobTitle, worksFor (UCT), birthDate, birthPlace, address, description, knowsAbout. This is solid.

**Bug: `websiteJsonLd` is defined but never injected.**

```tsx
// layout.tsx — line 113–119: defined
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ubayd Hattas",
  "url": "https://ubayd.me",
};

// But only jsonLd (Person) is rendered in <head>:
<script type="application/ld+json" ... JSON.stringify(jsonLd) />
// websiteJsonLd is never rendered — this is a real bug
```

The `WebSite` schema, when paired with a `potentialAction` for `SearchAction`, also enables Google Sitelinks Search Box. Even without that, it should be rendered.

Additionally, there is no `BreadcrumbList` schema on sub-pages, no `BlogPosting` schema on blog posts, and no `SoftwareSourceCode` or `WebApplication` schema on the projects page. These are missed opportunities.

### 1.3 Sitemap

The sitemap exists at `/public/sitemap.xml` — good. Issues:

- **URL inconsistency**: all entries use `https://www.ubayd.me/` (with `www`) but your canonical domain is `https://ubayd.me` (no `www`). Google may index both; pick one and be consistent.
- **`/cv.pdf` is in the sitemap** — PDFs can be indexed, but it adds noise. Remove unless you want the CV to rank independently (arguable).
- **No blog post URLs** — because posts have no individual slugs, they can't appear in the sitemap.
- **`lastmod` values** are all the same timestamp (12 June 2026) — this reduces the signal's usefulness. Use actual modification dates.
- The sitemap was generated by a third-party tool (`xml-sitemaps.com`) rather than programmatically. For a Next.js site, use `app/sitemap.ts` which auto-generates and updates.

### 1.4 Robots.txt

**Critical gap: there is no `robots.txt` file in `/public/`.**

Without one, crawlers apply their own defaults. While this usually means full crawling, the absence of an explicit file is a missed opportunity to:
- Confirm all pages should be crawled
- Point to the sitemap location
- Block any internal pages you don't want indexed (e.g. `/now` if you consider it ephemeral)

### 1.5 Ranking Analysis

**"Ubayd Hattas"** — Should rank well once Google Search Console fully indexes the site. The full name appears in title, description, JSON-LD, and H1. ✅

**"Ubayd"** — Difficult. This is a single given name with no known famous bearers in your field, so there's no competition — but also no context. The site only ranks for this if your domain authority builds significantly. Low priority short-term.

**"Hattas"** — Also a surname search. Your father (Dr Mahier Hattas, Stats SA) likely has a stronger presence for this term. The link to his LinkedIn in your blog post is actually good for this — it creates context.

**"UCT student data science"** — Possible. Your metadata and content cover this. Blog posts with this phrase in their slug/title would help.

**"SA Data Hub"** — `sadatahub.tech` should rank for this, but your personal site should also mention it prominently enough to rank for brand searches. Currently underserved — the project page doesn't include enough SEO copy for this exact phrase. Adding a proper `/projects/sa-data-hub` sub-page with its own metadata would fix this.

**"South African data platform student"** — Opportunity. Very low competition. A blog post targeting this phrasing could rank in position 1–3.

---

## 2. Personal Branding Audit

### 2.1 First Impression

The homepage makes a strong visual first impression. The full-page hero with name gradient, profile photo, and smooth animation reads as professional and confident. The "Available for research collaborations" badge is a smart trust signal.

**The tagline is the weakest element on the entire page:**

> "Student of mathematics and computation.  
> Building the foundations for a life in data science and AI."

This is vague, generic, and forgettable. It could describe 10,000 students. It communicates none of: UCT, South Africa, SA Data Hub, your specific academic achievements, or your distinctive story. Compare to what your own About page headline says — "Depth over pace, playing the long game" — which is more distinctive.

**Suggested alternative tagline:**
> "BSc student at UCT — Computer Science, Statistics & Data Science.  
> Building tools that make South African data accessible."

This immediately communicates: who you are, where you study, what you build, and a mission.

### 2.2 Credibility & Differentiation

**What makes you credible and distinctive:**
- UCT, one of Africa's top universities
- Head Boy + Top NSC Achiever (matric)
- Son of a Stats SA director — a backstory that explains *why* you care about South African data
- Creator of SA Data Hub — a real, shipped, public-facing product
- First-year student who has already shipped something — this is rare

**How much of this does a visitor learn in 30 seconds?**

Currently: UCT ✅ (in body text), Head Boy ❌ (only in About page timeline), Stats SA connection ❌ (only in a blog post), SA Data Hub ⚠️ (visible via project card but not mentioned in hero).

The hierarchy of credibility signals needs to move upward on the homepage. Your most impressive facts are buried.

### 2.3 Professionalism

- The design is excellent — clean, dark-mode-forward, tasteful use of accent colour.
- The "UH." logo is minimal but distinctive.
- The CV download is well-placed.
- The Google Maps/footer with "Cape Town, South Africa" adds geographic grounding.
- The `/now` page is a smart indie-web touch that signals thoughtfulness.

**Issues:**
- Two typos in the About page timeline are unprofessional for a recruiter or scholarship reviewer: "expereinces" (line 56) and "dads work" (should be "dad's work"). Fix these immediately.
- The timeline entry "Got Covid-19" is an unusual personal milestone to include publicly. It adds nothing professionally and may feel out of place to formal reviewers.
- The "Available for research collaborations" badge is great — but it's not backed up by a clear contact CTA directly beneath it. The CTA section is at the very bottom of the page.

### 2.4 Trust

- GitHub and LinkedIn are linked and accessible.
- A real profile photo is present.
- The CV is downloadable.
- Google Search Console verification is present (good signal for Google that the site is actively maintained).
- Blog writing is personal and honest — this builds trust with humans.

**Missing trust signals:**
- No mention of your academic results on the homepage (Top 5 in school, Top NSC Achiever) — these are strong signals for scholarship/internship reviewers.
- No external validation (e.g. "as seen in" or notable mentions) — as a first-year student this is expected, but something to build towards.

---

## 3. Technical Audit

### 3.1 Architecture

The Next.js 16 + App Router implementation is correct and idiomatic. The pattern of `page.tsx` (server component with metadata export) calling a `*Client.tsx` (client component for interactive UI) is a reasonable solution for a site that needs both SSR metadata and client-side animations.

**Issue with this pattern:** Because all content (blog post bodies, project data) lives inside client components (`BlogClient.tsx`, `ProjectsClient.tsx`), it is not rendered as static HTML on the server. Search engines may or may not execute JavaScript to read this content. Google does, but with delay. For content you want indexed reliably, it should be in server-rendered HTML or static generation.

### 3.2 Missing `robots.txt`

As noted in SEO section — this file should exist at `/public/robots.txt`.

Recommended content:
```
User-agent: *
Allow: /

Sitemap: https://ubayd.me/sitemap.xml
```

### 3.3 Sitemap — Should be Programmatic

The static XML sitemap will drift out of date as you add blog posts or projects. Replace it with Next.js's built-in `app/sitemap.ts`:

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://ubayd.me', lastModified: new Date(), priority: 1 },
    { url: 'https://ubayd.me/about', lastModified: new Date(), priority: 0.8 },
    // ...
  ]
}
```

This auto-serves at `/sitemap.xml` and stays accurate.

### 3.4 Blog Posts Have No Individual URLs

Both blog posts live at `/blog` — there is no `/blog/stats-sa-father` or `/blog/sa-data-hub` route. This means:

- No individual indexable URL for each post
- No ability to share a direct link to a single post
- No per-post metadata (title, description, OG image)
- No possibility of the post ranking in search results on its own

This is the single highest-impact technical fix available.

### 3.5 Missing Canonical Tag

Next.js App Router does not automatically output `<link rel="canonical">` tags. Add to your global metadata:

```ts
// layout.tsx
alternates: {
  canonical: 'https://ubayd.me',
},
```

And on each page:
```ts
// app/about/page.tsx
alternates: {
  canonical: 'https://ubayd.me/about',
},
```

### 3.6 Dependency Versions

- `next: ^16.2.6` — this appears to be a very recent version. Ensure you're using Next.js 15 stable (released October 2024) rather than a pre-release. Your `eslint-config-next` pins to `14.2.5`, which suggests a mismatch.
- `@types/react: ^18` while `react: ^19.2.6` — the types version should match React major. Use `@types/react: ^19`.
- `framer-motion: ^11.3.0` — current; good.

### 3.7 Performance Considerations

- Profile image (`public/profile.jpg`) is **1.8MB** — Next.js `<Image>` component will optimize it, but the source should ideally be compressed. Consider running it through `squoosh` or similar.
- OG image (`public/og-image.png`) is **394KB** — reasonable.
- No `next/font` subsets issue — Geist is loaded with `latin` subset only. ✅
- `images.domains: []` in `next.config.js` is fine for local images only.

### 3.8 Accessibility

- Social links in Navbar have no `aria-label` — icons only, no screen reader text.
- Profile photo has `alt="Ubayd Hattas"` ✅
- The theme toggle should have an `aria-label` describing the current state ("Switch to dark mode").
- No `skip to content` link — useful for keyboard users navigating a site with a fixed navbar.

### 3.9 Maintainability

A recurring pattern is hardcoded content in client components (blog posts as JSX, project data as arrays). This is manageable at current scale but will become painful as content grows. A future improvement (not urgent) is to move to MDX for blog posts and a separate data file or CMS for projects.

---

## 4. Content Audit

### 4.1 Homepage

**Strengths:** Clean structure, good hierarchy, compelling philosophy section, multiple CTAs.

**Weaknesses:**
- Tagline is vague (addressed above).
- The "Currently studying" section repeats what the body text already says. It could instead feature SA Data Hub, or your most recent blog post, or a stat about your work.
- The "Philosophy" section ("Discipline over intensity. Consistency over bursts.") is genuinely distinctive — but it appears after too much scroll. It could be brought up or the intro shortened.
- No social proof or achievement visible above the fold. A recruiter or scholarship reviewer who bounces after 5 seconds sees: your name, a vague tagline, and three subject icons.

**Suggested homepage restructure for hero section:**

1. Name (keep)
2. One-line role: "BSc student at UCT · Computer Science, Statistics & Data Science · Cape Town, SA"
3. One-line mission: "Building tools that make South African data accessible."
4. One achievement badge: e.g. "NSC Top Achiever · Head Boy 2025"
5. CTA buttons (keep)
6. Links (keep)

### 4.2 About Page

**Strengths:** Personal, honest, well-structured timeline, values section is distinctive.

**Weaknesses:**
- Two typos (fix immediately).
- The "Got Covid-19" timeline entry (2021) is an unusual professional milestone. Consider removing or replacing with something more relevant.
- The timeline jumps from 2017 (moved to Cape Town) to 2021 (Covid) — consider adding the year you started high school or first got interested in data/coding.
- The values section is excellent but buried below a long timeline. Consider moving it higher.
- No mention of SA Data Hub or your matric achievements anywhere except the timeline.

### 4.3 Projects Page

**Strengths:** Rich detail on SA Data Hub, screenshots, features list, modal expand. Real effort here.

**Weaknesses:**
- The three non-SA-Data-Hub projects (Statistical Inference Explorer, Maths Problem Set Generator, Personal Knowledge System) are all "building" or "planned" with no live links. To a recruiter, this signals "two ideas and a private notebook." Consider either publishing the Statistical Inference Explorer or removing weaker projects until they're real.
- The project descriptions don't mention impact or scale. SA Data Hub description could say "publicly accessible platform serving South African population, employment, and economic data from Statistics South Africa and SARB."
- No link to `sadatahub.tech` in the project card — the live link goes to `sadatahub.vercel.app`. Use the custom domain.

### 4.4 Blog

**Strengths:** Both published posts are well-written and personal. The planned posts list shows self-awareness about what you want to say.

**Weaknesses:**
- Two posts is thin. The "planned posts" display with draft/idea status is a brave design choice — it shows transparency but could also look like an incomplete site to some reviewers.
- Posts are not individually linkable or shareable (technical issue — addressed in §3.4).
- The post about Stats SA and your father is your single best piece of content on the site. It is authentic, distinctive, and tells a story no one else can tell. It deserves to rank in search. Currently it can't.

### 4.5 Navigation

Eight nav items is on the high end. The full set: Home, About, Education, Projects, Skills, Now, Blog, Contact. Consider consolidating:
- "Skills" could live inside "About" or "Education" rather than as a standalone page.
- "Now" is a niche indie-web pattern — most recruiters won't know what it is. Either add a tooltip or move it to the footer (where it currently also appears, redundantly).

### 4.6 Calls to Action

- "Get in touch" at the bottom of every page is good.
- "Download CV" in the hero is well-placed.
- Missing: a CTA that links to SA Data Hub from the homepage hero. This is your flagship work.

---

## 5. Project Review

### SA Data Hub

**Assessment: Strong. Undermarketed.**

This is a genuinely differentiated project. A first-year UCT student shipping a multi-dataset, province-level, methodology-documented South African public data platform is uncommon. The screenshots show a real, polished product.

**For recruiters/scholarship reviewers, strengthen by:**
- Adding concrete numbers: "10+ datasets, 9 provinces, [X] data points" even if approximate.
- Stating the mission more boldly: "Built to make South African public statistics accessible to any citizen — no technical knowledge required."
- Linking to `sadatahub.tech` (custom domain) not `sadatahub.vercel.app` (looks less permanent).
- Adding a "What I learned building this" section — technical choices, tradeoffs, what you'd do differently.

**For hackathon judges:**
- The methodology/transparency angle is your strongest differentiator. Emphasise that this isn't just a chart dashboard — it documents its own data sources and limitations. This is what serious data platforms do.

**For university staff:**
- Connect the project to your studies explicitly: "Built to reinforce what I'm learning in STA1000F and CSC1015F."

### Personal Website

The website itself is solid enough to present as a project. The tech stack (Next.js, TypeScript, Tailwind, Framer Motion, Vercel) is contemporary and appropriate to mention.

**Weakness:** There's no "how I built this" page or blog post. A post titled "How I built my personal website as a first-year CS student" would perform well in search and show technical depth.

---

## 6. Recommended Improvements

### Tier 1 — High Impact / Low Effort

**1. Add `robots.txt`**  
Why: Without it, there's no explicit instruction to crawlers. Takes 2 minutes.  
Impact: High (SEO fundamentals). Difficulty: Trivial.

```
// public/robots.txt
User-agent: *
Allow: /
Sitemap: https://ubayd.me/sitemap.xml
```

**2. Fix the `websiteJsonLd` bug**  
Why: You've defined the `WebSite` schema but never rendered it. One line fix.  
Impact: Medium (structured data completeness). Difficulty: Trivial.  
Add a second `<script type="application/ld+json">` tag with `JSON.stringify(websiteJsonLd)` inside `<head>`.

**3. Fix the two typos in About page**  
Why: Typos undermine credibility with any formal reviewer.  
Impact: Medium (branding). Difficulty: Trivial.  
- Line 50: `"dads work"` → `"dad's work"`
- Line 56: `"expereinces"` → `"experiences"`

**4. Fix the SA Data Hub live link to use the custom domain**  
Why: `sadatahub.tech` looks far more professional than `sadatahub.vercel.app`.  
Impact: Medium (credibility). Difficulty: Trivial.

**5. Add canonical `alternates` to global metadata and each page**  
Why: Prevents duplicate content issues; explicit over implicit.  
Impact: Medium (SEO). Difficulty: Low (one field per page).

**6. Strengthen the homepage tagline**  
Why: The current tagline is the weakest copy on the site. It's the first sentence a crawler and a visitor reads.  
Impact: High (SEO + branding). Difficulty: Low (edit one string).  
Suggested: *"BSc student at UCT — Computer Science, Statistics & Data Science. Building tools that make South African data more accessible."*

**7. Remove or replace the "Got Covid-19" timeline entry**  
Why: Not a professional milestone. Looks unusual to formal reviewers.  
Impact: Low-medium (professionalism). Difficulty: Trivial.

---

### Tier 2 — High Impact / Higher Effort

**8. Give each blog post its own URL and metadata**  
Why: The most impactful SEO improvement available. Both blog posts contain unique, rankable content that is currently invisible to search engines.  
Impact: High (SEO, shareability, indexability). Difficulty: Medium.  
Create `app/blog/[slug]/page.tsx` with a data file or MDX. Each post gets its own `<title>`, `<description>`, OG tags, and JSON-LD `BlogPosting` schema.

**9. Create a programmatic `app/sitemap.ts`**  
Why: The static sitemap already has a `www`/non-`www` inconsistency and won't auto-update as you add posts.  
Impact: Medium (SEO). Difficulty: Low-Medium.

**10. Add `aria-label` to icon-only nav elements**  
Why: Accessibility and Lighthouse score. Affects GitHub, LinkedIn, Mail icons in Navbar and Footer.  
Impact: Medium (accessibility, Lighthouse score). Difficulty: Low.

**11. Create a `/projects/sa-data-hub` sub-page**  
Why: SA Data Hub deserves its own indexable page with rich copy, metrics, and its own `BlogPosting`-adjacent schema. This is your flagship project and it deserves a URL that can rank.  
Impact: High (SEO for "SA Data Hub" + differentiation). Difficulty: Medium.

**12. Compress `public/profile.jpg` (1.8MB)**  
Why: Even with Next.js image optimization, a large source wastes resources.  
Impact: Low-Medium (performance). Difficulty: Low.  
Tool: squoosh.app — target ~300KB JPEG at the display dimensions.

**13. Add `www` redirect or settle on one canonical domain**  
Why: Sitemap uses `www.ubayd.me`; metadata uses `ubayd.me`. These should match.  
Impact: Medium (SEO, trust). Difficulty: Low (Vercel redirect config or sitemap fix).

---

### Tier 3 — Lower Impact / Strategic

**14. Write the "How I built SA Data Hub" blog post**  
Why: Organic SEO, recruiter credibility, demonstrates technical depth. Your existing post outline mentions this is coming.  
Impact: High long-term (SEO + content marketing). Difficulty: Medium (time investment).  
This post should cover: stack choice, data pipeline decisions, the transparency/methodology design choice, what you learned.

**15. Add achievements to homepage above the fold**  
Why: "NSC Top Achiever — Top 5 in school" and "Head Boy" are strong signals that are currently buried in the About page timeline. A line in the hero bio or a small badge would surface these.  
Impact: Medium (branding for formal reviewers). Difficulty: Low.

**16. Publish or remove placeholder projects**  
Why: "Planned" and "Building" projects with no links look like ideas, not work. Two published projects (SA Data Hub + one more) look stronger than one real + three aspirational.  
Impact: Medium (credibility). Difficulty: Medium (depends on project readiness).

**17. Consolidate navigation from 8 to 6 items**  
Why: Cognitive load. Merge Skills into About or Education.  
Impact: Low-Medium (UX). Difficulty: Low.

**18. Add a "Skip to content" accessibility link**  
Why: Lighthouse + a11y best practice; affects users who navigate via keyboard.  
Impact: Low (unless you care about Lighthouse 100). Difficulty: Low.

---

### Features Worth Adding (not yet)

- **`/uses` page** (tools, setup, software) — great for SEO + developer audience, when you have more tools to list.
- **`/now` page content** — already exists; keep updating it regularly. It signals the site is alive.
- **Email newsletter** — very early, but worth thinking about as your blog grows.
- **Open Graph image per blog post** — once posts have individual routes, dynamic OG images (`@vercel/og`) would elevate shareability significantly.
- **Stats/impact section** — once SA Data Hub has real usage data (visitors, dataset queries), add a metrics callout to the homepage or project page.

### Features Not Worth Adding Yet

- **Comments on blog** — adds complexity; you have 2 posts.
- **CMS (Contentful, Sanity)** — overkill until you have 10+ posts. MDX files in the repo are sufficient.
- **i18n / Afrikaans** — interesting idea but adds significant overhead for unclear gain.
- **PWA / service worker** — not appropriate for a personal portfolio.

---

## Quick-Reference Fix List

For immediate action (under 30 minutes total):

| # | Fix | File | Time |
|---|-----|------|------|
| 1 | Add `robots.txt` | `public/robots.txt` | 2 min |
| 2 | Render `websiteJsonLd` in `<head>` | `app/layout.tsx` | 2 min |
| 3 | Fix "expereinces" typo | `app/about/AboutClient.tsx:56` | 1 min |
| 4 | Fix "dads work" typo | `app/about/AboutClient.tsx:50` | 1 min |
| 5 | Change SA Data Hub live link to `sadatahub.tech` | `app/projects/ProjectsClient.tsx` | 1 min |
| 6 | Fix sitemap domain (`www` → no `www`) | `public/sitemap.xml` | 5 min |
| 7 | Rewrite homepage tagline | `app/page.tsx` | 5 min |
| 8 | Add `alternates.canonical` to layout | `app/layout.tsx` | 5 min |

---

*End of audit. Priority order: Tier 1 fixes first (all trivial), then blog post routing (Tier 2 #8), then the programmatic sitemap. Everything else is incremental polish on an already strong foundation.*
