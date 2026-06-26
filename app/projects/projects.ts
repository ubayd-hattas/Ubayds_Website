// ─── projects.ts — Single source of truth for all project data ───────────────
//
// This file drives:
//   - The /projects index page (ProjectsClient.tsx)
//   - Individual /projects/[slug] pages ([slug]/page.tsx)
//   - Sitemap auto-generation (sitemap.ts)
//   - Per-page metadata + Open Graph + Twitter cards
//   - JSON-LD structured data
//
// Adding a new project:
//   1. Add an entry to the `projects` array below.
//   2. If expandable: true, a dedicated /projects/[slug] page is auto-generated.
//   3. The sitemap, metadata, and JSON-LD all update automatically.
//   4. No other files need to be touched.

export type ProjectStatus = "active" | "building" | "planned";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  label?: string;
}

export interface Project {
  // ── Core identity ──────────────────────────────────────────────────────────
  slug: string;              // URL segment: /projects/{slug}
  title: string;
  description: string;       // Short card description (also used as meta description fallback)
  longDesc?: string;         // Second paragraph shown on featured card
  fullDesc?: string;         // Rich multi-paragraph detail for dedicated page
  icon?: string;             // Emoji icon

  // ── Classification ─────────────────────────────────────────────────────────
  tags: string[];
  status: ProjectStatus;
  featured?: boolean;        // Shows in the featured section on /projects
  private?: boolean;         // Excluded from routing and sitemap
  expandable?: boolean;      // true = gets a dedicated /projects/[slug] page

  // ── Links ──────────────────────────────────────────────────────────────────
  github: string | null;
  live: string | null;

  // ── Visual ─────────────────────────────────────────────────────────────────
  accentColor?: string;
  bannerImage?: string;      // Path in /public — e.g. "/pics/Afriguard.png"

  // ── Rich content ───────────────────────────────────────────────────────────
  screenshots?: ProjectScreenshot[];
  metrics?: ProjectMetric[];
  features?: string[];
  goals?: string;

  // ── Dates (ISO 8601) ───────────────────────────────────────────────────────
  dateAdded: string;         // Used for sitemap lastModified
  lastUpdated?: string;

  // ── Per-project SEO ────────────────────────────────────────────────────────
  seo: {
    title: string;           // Unique <title> for the project page
    description: string;     // Unique meta description (aim for ≤155 chars)
    ogImage?: string;        // Defaults to /og-image.png if absent
  };

  // ── Cross-linking ──────────────────────────────────────────────────────────
  relatedBlogPosts?: { slug: string; label: string }[];
}

// ─── Project data ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // ── AfriGuard ──────────────────────────────────────────────────────────────
  {
    slug: "afriguard",
    title: "AfriGuard",
    description:
      "A multilingual AI safety benchmark evaluating how well frontier LLMs maintain safety guardrails across South African languages. We red-teamed four models in seven languages, measuring Attack Success Rate across regionally relevant harms — and found that safety alignment catastrophically degrades outside of English.",
    longDesc:
      "Built over a single weekend at the Global South AI Safety Hackathon in Cape Town. AfriGuard tests whether the safety mechanisms that work in English actually hold up when harmful prompts are expressed in isiZulu, isiXhosa, Afrikaans, Sesotho, Sepedi, or Tsonga. The short answer: they don't.",
    fullDesc:
      "AfriGuard is a multilingual AI safety benchmark designed to evaluate how well large language models maintain safety guardrails across South African languages. The project investigates whether code-switching and local language usage can increase jailbreak success rates compared to English prompts.\n\nWe created 40 seed prompts across four harm categories endemic to South Africa — financial fraud targeting SASSA grant recipients, xenophobic incitement, political disinformation, and gang facilitation — translated them into six African languages plus an English baseline, and evaluated four frontier LLMs. That produced 280 benchmark prompts and 1,120 total model responses.\n\nThe findings were stark. The mean Attack Success Rate across all evaluations was 50.1% — more than double the English baseline of 24.4%. Certain model-language combinations reached over 90% ASR, meaning models complied with harmful requests nine times out of ten. The research confirms that a model can be safe in English and catastrophically unsafe in an African language.",
    tags: ["Python", "Pandas", "Streamlit", "AI Safety", "NLP", "Research", "Data Pipelines"],
    github: "https://github.com/ubayd-hattas/AfriGuard",
    live: "https://afriguard.streamlit.app/",
    status: "active",
    featured: true,
    expandable: true,
    accentColor: "rgba(99, 102, 241, 0.12)",
    icon: "🛡️",
    bannerImage: "/pics/Afriguard.png",
    goals:
      "Investigate whether AI safety guardrails catastrophically degrade when harmful prompts are expressed in South African languages — and expose the real-world consequences for communities most likely to be targeted.",
    features: [
      "40 seed prompts across 4 regionally relevant harm categories",
      "7 language conditions (6 African languages + English baseline)",
      "280 benchmark prompts, 1,120 total model evaluations",
      "4 frontier LLMs tested (GPT-OSS, Llama 3.3, Kimi K2.6, Qwen 3)",
      "Automated judging pipeline with harm-score classification",
      "Interactive Streamlit analytics dashboard",
      "Publication-ready figures (ASR heatmaps, model comparisons, language gaps)",
      "Reproducible end-to-end evaluation pipeline",
    ],
    metrics: [
      { label: "Status",       value: "Research Project"           },
      { label: "Type",         value: "AI Safety Benchmark"        },
      { label: "Evaluations",  value: "1,120 responses"            },
      { label: "Languages",    value: "7 (6 African + English)"    },
      { label: "Models",       value: "4 frontier LLMs"            },
      { label: "Mean ASR",     value: "50.1% (vs 24.4% English)"  },
    ],
    screenshots: [
      { src: "/screenshots/afriguard/team-working.png",       alt: "Team working at the hackathon",    label: "The team at work"        },
      { src: "/screenshots/afriguard/dashboard-overview.png", alt: "AfriGuard analytics dashboard",    label: "Dashboard overview"      },
      { src: "/screenshots/afriguard/language-vulnerability.png", alt: "Language vulnerability chart", label: "Language vulnerability"  },
      { src: "/screenshots/afriguard/team-group.png",         alt: "AfriGuard team photo",             label: "Team AfriGuard"          },
    ],
    dateAdded: "2026-06-24",
    seo: {
      title: "AfriGuard — Multilingual AI Safety Benchmark for South African Languages",
      description:
        "AfriGuard red-teamed 4 frontier LLMs across 7 South African languages. Mean attack success rate: 50.1% — more than double the English baseline of 24.4%. AI safety research by Ubayd Hattas.",
      ogImage: "/pics/Afriguard.png",
    },
    relatedBlogPosts: [
      {
        slug: "ai-safety-hackathon",
        label: "Hackathon experience — from idea to research prototype in one weekend",
      },
    ],
  },

  // ── SA Data Hub ────────────────────────────────────────────────────────────
  {
    slug: "sa-data-hub",
    title: "SA Data Hub",
    description:
      "A public platform making South African data accessible to students, journalists, and citizens. Explore population, employment, and economic data from Statistics South Africa, SARB, and other public institutions — with interactive visualisations, province comparisons, and transparent methodologies.",
    longDesc:
      "SA Data Hub combines official datasets from Statistics South Africa, the SARB, and other public institutions with interactive charts, province comparisons, historical timelines, and educational insights. The goal is not only to display data, but to help users understand what the data means.",
    fullDesc:
      "SA Data Hub is a public data platform designed to make South African statistics easier to understand and explore. It pulls from Statistics South Africa, the South African Reserve Bank, SAPS, and other official bodies — presenting figures not as raw tables, but as narratives with context.\n\nThe platform is built with a strong emphasis on transparency: every dataset links to its primary source, shows its update frequency, and includes a methodology page explaining how data is collected and interpreted. The Insights Hub presents long-form data stories explaining the human significance behind the numbers.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Python", "Vercel"],
    github: "https://github.com/ubayd-hattas",
    live: "https://sadatahub.tech",
    status: "active",
    featured: true,
    expandable: true,
    accentColor: "rgba(16, 185, 129, 0.10)",
    icon: "🗺️",
    bannerImage: "/pics/og-image.png",
    goals:
      "Make South African public data genuinely accessible to students, journalists, researchers, and curious citizens — with no barrier to entry and no technical knowledge required.",
    features: [
      "Interactive Dashboard with cross-dataset filtering",
      "Province Explorer with side-by-side comparisons",
      "Data Insights Hub — long-form narratives",
      "Historical Timelines with major SA events",
      "Dataset Explanations: what changed, why it matters",
      "Methodology & Transparency pages",
      "Full-text search across all datasets",
      "Automated data update scripts",
      "Dark / Light / System themes",
      "Fully responsive design",
    ],
    metrics: [
      { label: "Status",     value: "Active Development"       },
      { label: "Type",       value: "Public Data Platform"     },
      { label: "Focus",      value: "South African Public Data" },
      { label: "Built With", value: "Next.js + TypeScript"     },
    ],
    screenshots: [
      { src: "/screenshots/home.png",        alt: "SA Data Hub homepage",   label: "Homepage"         },
      { src: "/screenshots/dashboard.png",   alt: "Interactive dashboard",   label: "Dashboard"        },
      { src: "/screenshots/provinces.png",   alt: "Province Explorer",       label: "Province Explorer" },
      { src: "/screenshots/insights.png",    alt: "Insights Hub",            label: "Insights Hub"     },
      { src: "/screenshots/methodology.png", alt: "Methodology page",        label: "Methodology"      },
    ],
    dateAdded: "2026-06-13",
    seo: {
      title: "SA Data Hub — South African Public Data Platform",
      description:
        "SA Data Hub makes South African public data explorable — population, employment, and economic statistics from Stats SA, SARB, and other official sources. Built by Ubayd Hattas.",
      ogImage: "/pics/og-image.png",
    },
    relatedBlogPosts: [
      {
        slug: "sa-data-hub",
        label: "Development journey — how I built SA Data Hub in my first semester",
      },
      {
        slug: "stats-sa-father",
        label: "Background — what growing up around Stats SA taught me about data",
      },
    ],
  },

  // ── Statistical Inference Explorer ─────────────────────────────────────────
  {
    slug: "statistical-inference-explorer",
    title: "Statistical Inference Explorer",
    description:
      "An interactive tool for visualising core statistical concepts — confidence intervals, hypothesis testing, and sampling distributions.",
    longDesc:
      "Built to reinforce first-year stats coursework through active exploration rather than passive reading. Input your own data, adjust parameters, and watch distributions respond in real time.",
    tags: ["Python", "Statistics", "Matplotlib", "Jupyter"],
    github: "https://github.com/ubayd-hattas",
    live: null,
    status: "building",
    featured: false,
    expandable: false,
    accentColor: "rgba(99, 102, 241, 0.12)",
    icon: "📊",
    dateAdded: "2026-06-14",
    seo: {
      title: "Statistical Inference Explorer — Interactive Statistics Tool",
      description:
        "An interactive Python tool for visualising confidence intervals, hypothesis testing, and sampling distributions. Built by Ubayd Hattas.",
    },
  },

  // ── Maths Problem Set Generator ────────────────────────────────────────────
  {
    slug: "maths-problem-set-generator",
    title: "Maths Problem Set Generator",
    description:
      "A CLI tool that generates randomised problem sets for first-year university mathematics topics. Originally built for personal study.",
    tags: ["Python", "CLI", "LaTeX", "Algorithms"],
    github: "https://github.com/ubayd-hattas",
    live: null,
    status: "building",
    expandable: false,
    icon: "🧮",
    dateAdded: "2026-06-14",
    seo: {
      title: "Maths Problem Set Generator — Randomised University Maths Practice",
      description:
        "A CLI tool generating randomised problem sets for first-year university mathematics. Built in Python by Ubayd Hattas.",
    },
  },

  // ── Personal Knowledge System ───────────────────────────────────────────────
  {
    slug: "personal-knowledge-system",
    title: "Personal Knowledge System",
    description:
      "A structured note-taking and spaced-repetition system built around university studies. Architecture is intentional and evolving.",
    tags: ["Productivity", "Systems", "Obsidian", "Anki"],
    github: null,
    live: null,
    status: "planned",
    private: true,
    expandable: false,
    icon: "🧠",
    dateAdded: "2026-06-14",
    seo: {
      title: "Personal Knowledge System — Ubayd Hattas",
      description: "A private structured note-taking and spaced-repetition system built around university studies.",
    },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Projects that get a dedicated /projects/[slug] page */
export const routableProjects = projects.filter(
  (p) => p.expandable === true && !p.private
);

/** Projects that appear in the sitemap */
export const sitemapProjects = routableProjects;
