// ─── projects.ts — Single source of truth for all project data ───────────────
//
// This file drives:
//   - The /projects index page (ProjectsClient.tsx)
//   - Individual /projects/[slug] pages ([slug]/page.tsx)
//   - Homepage featured highlights (HomeClient.tsx)
//   - Sitemap auto-generation (sitemap.ts)
//   - Per-page metadata + Open Graph + Twitter cards
//   - JSON-LD structured data
//
// Adding a new project:
//   1. Add an entry to the `projects` array below.
//   2. If expandable: true, a dedicated /projects/[slug] page is auto-generated.
//   3. The sitemap, metadata, and JSON-LD all update automatically.
//   4. Featured homepage cards update when featured: true (order = array order).

export type ProjectStatus = "active" | "building" | "planned" | "completed";

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
  featured?: boolean;        // Shows in the featured section on /projects (+ homepage)
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
  // ── Cross-City Building Age Classification (Hack4Dev) ─────────────────────
  {
    slug: "cross-city-building-age-classification",
    title: "Cross-City Building Age Classification",
    description:
      "Predict the majority construction-age class of buildings inside 30 m Landsat pixels from decades of spectral reflectance, trained on Madrid and transferred to Amsterdam. Class-conditional CORAL lifts zero-shot macro-F1 from 0.36 to 0.65 with no Amsterdam labels.",
    longDesc:
      "Hack4Dev Data Science Hackathon. Domain adaptation under a real city shift: feature engineering from satellite time series, class-balanced Random Forests, CORAL alignment, few-shot transfer, and a spatial adjacency audit that stress-tested whether our own evaluation was inflating few-shot gains.",
    fullDesc:
      "The task was to estimate which of four construction-age groups dominates a 30 m satellite patch, using roughly forty years of Landsat spectral reflectance. Models were trained primarily on Madrid and had to generalise to Amsterdam (a city never seen in training), creating a classic domain-adaptation problem scored on macro-F1.\n\nWe engineered about 108 per-pixel features: multi-period band statistics, spectral indices, the size and timing of major spectral change, and neighbourhood feature averages. Stage 1 was a class-balanced Random Forest (500 trees). For zero-shot transfer we used class-conditional CORAL, aligning each Madrid age group to the covariance of Amsterdam pixels the model assigned to that group over two rounds, with no Amsterdam labels. With a few local labels we added budget-scaled feature whitening, a small local forest, probability blending with Stage 1, and inverse-distance neighbour smoothing.\n\nMadrid in-city 5x5 CV macro-F1 reached 0.664 ± 0.004. Raw Amsterdam zero-shot scored 0.358; pooled CORAL 0.578; class-conditional CORAL 0.651, roughly 0.36 to 0.65 macro-F1 with zero Amsterdam labels. Few-shot rose from 0.662 ± 0.003 at 5 labels/class to 0.737 ± 0.005 at 200.\n\nWe also audited spatial adjacency in the few-shot protocol. Under the organisers' random split, roughly 80% of support pixels had an immediate map neighbour in the query set; a spatial-block re-run showed that about half the few-shot lift at higher budgets was proximity rather than labels. The zero-shot result uses no labels, has no adjacency issue, and remains the strongest transferable number. Treating the few-shot curve as an upper bound was a deliberate evaluation stress test, not a footnote.",
    tags: [
      "Python",
      "Machine Learning",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Random Forest",
      "Domain Adaptation",
      "Feature Engineering",
      "Remote Sensing",
      "Spatial Analysis",
      "Cross-Validation",
      "Statistics",
    ],
    github: "https://github.com/ubayd-hattas/Data_Science_Hackathon",
    live: null,
    status: "completed",
    featured: true,
    expandable: true,
    accentColor: "rgba(14, 165, 233, 0.10)",
    icon: "🛰️",
    bannerImage: "/pics/Building_Age_Classification.png",
    goals:
      "Build a Madrid to Amsterdam building-age transfer pipeline that works with few or zero Amsterdam labels, and honestly measure how much of any few-shot gain is real skill versus spatial proximity in the evaluation design.",
    features: [
      "108 engineered features from Landsat time series (spectral stats, indices, change timing, neighbourhood averages)",
      "Class-balanced Random Forest (500 trees) as Stage-1 Madrid model",
      "Pooled and class-conditional CORAL for label-free domain alignment",
      "Budget-scaled feature whitening, local few-shot modelling, and probability blending",
      "Inverse-distance spatial neighbour smoothing (prediction-only)",
      "Madrid 5×5 CV ceiling: 0.664 ± 0.004 macro-F1",
      "Zero-shot Amsterdam: 0.358 → 0.651 macro-F1 via class-conditional CORAL",
      "Spatial adjacency audit showing ~half of higher-budget few-shot lift was proximity",
    ],
    metrics: [
      { label: "Event",           value: "Hack4Dev Data Science Hackathon" },
      { label: "Type",            value: "Domain Adaptation / Remote Sensing" },
      { label: "Zero-shot",       value: "0.36 → 0.65 macro-F1" },
      { label: "Madrid CV",       value: "0.664 ± 0.004" },
      { label: "Features",        value: "108 engineered" },
      { label: "Few-shot (200)",  value: "0.737 ± 0.005" },
    ],
    screenshots: [
      {
        src: "/screenshots/building-age-classification/scatter.png",
        alt: "Feature-space scatter comparing Madrid and Amsterdam building-age classes, from the Cross-City Building Age Classification project by Ubayd Hattas",
        label: "Cross-city feature space",
      },
      {
        src: "/screenshots/building-age-classification/pipeline.png",
        alt: "Transfer pipeline diagram for Madrid to Amsterdam building-age classification by Ubayd Hattas",
        label: "Transfer pipeline",
      },
      {
        src: "/screenshots/building-age-classification/transfer-curve.png",
        alt: "Transfer curve showing zero-shot and few-shot macro-F1 from Madrid to Amsterdam, Cross-City Building Age Classification by Ubayd Hattas",
        label: "Transfer curve",
      },
      {
        src: "/screenshots/building-age-classification/results-table.png",
        alt: "Results table of Madrid CV and Amsterdam transfer macro-F1 scores, Cross-City Building Age Classification by Ubayd Hattas",
        label: "Results table",
      },
      {
        src: "/screenshots/building-age-classification/few-shot-curve.png",
        alt: "Few-shot transfer curve across label budgets for Amsterdam building-age classification by Ubayd Hattas",
        label: "Few-shot curve",
      },
    ],
    dateAdded: "2026-09-13",
    lastUpdated: "2026-09-13",
    seo: {
      title: "Cross-City Building Age Classification: Madrid to Amsterdam Transfer Learning",
      description:
        "Domain adaptation for Landsat building-age classification: class-conditional CORAL lifts Amsterdam zero-shot macro-F1 from 0.36 to 0.65. Hack4Dev project by Ubayd Hattas.",
      ogImage: "/pics/Building_Age_Classification.png",
    },
  },

  // ── Does AI Actually Know Itself? (Digital Minds Hackathon) ─────────
  {
    slug: "digital-minds-hackathon",
    title: "Does AI Actually Know Itself?",
    description:
      "A capability-controlled test of whether LLM self-prediction reflects privileged self-access, or is just stylometry in disguise. Asked which of two replies it would produce, Hermes-3 discriminated its own output above chance. A one-feature 'pick the longer reply' rule beat it anyway.",
    longDesc:
      "Built over 48 hours with Apart Research's Digital Minds Research Sprint (Track 3: Introspection & Self-Report Reliability). Model-welfare work runs on self-report, so the real question isn't whether a model can predict its own behaviour. It's whether that prediction beats a cheap outside observer reading the same text. Across 9,269 trials, ours mostly didn't.",
    fullDesc:
      "Preference elicitation, distress signals, and most practical model-welfare methodology run through AI self-report. But if a model's report about itself carries no epistemic advantage over what a comparably capable outsider could infer from the same text, those methods are measuring something other than what they claim. We adopted Song, Lederman, Hu & Mahowald's (2025) operational criterion: a process only counts as introspective if it beats an equal-or-lower-cost process available to a third party.\n\nWe tested this with two models sharing one pretrained base (Llama-3.1-70B and Hermes-3-70B), plus Mistral-Small-3.2-24B as a capability control, across a hidden persona property and a self-recognition/self-prediction probe. A capability-controlled crossed 2x2 design (four stimulus constructions on one shared 200-prompt pool, 24 cells, 9,269 trials) showed no positive raw self-advantage on the target contrast once predictor capability was controlled for.\n\nThe sharpest result came from the self-prediction probe: asked which of two replies it would produce, Hermes-3 discriminated its own output from its sibling's above chance (balanced accuracy 0.719, hit minus false alarm +0.437), genuine signal, not a position artifact. But a zero-cost, one-feature 'pick the longer reply' rule scored 0.808 on exactly those pairs, beating Hermes outright (McNemar p = 0.0018), and a 21-feature supervised stylometric classifier reached 83.1% author identification under a separate procedure. Length didn't explain everything, though. Where the length cue pointed away from Hermes's own reply, it still discriminated at +0.381, a model-specific residual with no confirmed mechanism.\n\nWe also built and released two reusable diagnostic tools: a surface-leakage gate that checks whether a trivial stylometric classifier can recover a hidden property before a main experiment is paid for, and a response-bias check that catches predictors answering by position rather than content, a failure mode that silently produced clean-looking ~50% nulls in two of our own self-recognition framings before we caught it.",
    tags: ["Python", "LLM Evaluation", "AI Safety", "Introspection", "Statistics", "Research", "OpenRouter API"],
    github: "https://github.com/UbaJaz/Digital_Minds_Research",
    live: null,
    status: "completed",
    featured: true,
    expandable: true,
    accentColor: "rgba(236, 72, 153, 0.10)",
    icon: "🪞",
    bannerImage: "/pics/Digital_Minds_Hackathon.png",
    goals:
      "Test whether above-chance self-prediction in LLMs reflects privileged self-access, or whether it is explainable by a cheap outside observer reading the same text. Release reusable tools for other introspection researchers to run the same check.",
    features: [
      "Capability-controlled crossed 2×2 design across 4 stimulus constructions",
      "200-prompt shared pool, 24 cells, 9,269 scored trials, zero malformed",
      "3 models tested: Llama-3.1-70B, Hermes-3-70B (shared base), Mistral-Small-3.2-24B (capability control)",
      "21-feature grouped cross-validated surface-baseline classifier (83.1% author ID)",
      "Self-prediction probe: balanced accuracy 0.719, discrimination +0.437 for Hermes-3",
      "Length-only comparator (0.808) statistically beats self-prediction (McNemar p = 0.0018)",
      "Released surface-leakage gate + response-bias check (numpy-only, dependency-free)",
      "Append-only logged API calls with cost, token counts, and prompt hashes for full reproducibility",
    ],
    metrics: [
      { label: "Status",           value: "Hackathon Submission"        },
      { label: "Type",             value: "AI Introspection Research"   },
      { label: "Trials",           value: "9,269 scored"                },
      { label: "Design",           value: "Crossed 2×2, 24 cells"       },
      { label: "Self-Prediction",  value: "Bal. acc. 0.719 (Hermes-3)" },
      { label: "Beaten By",        value: "Length-only rule (0.808)"   },
    ],
    dateAdded: "2026-08-16",
    lastUpdated: "2026-09-13",
    seo: {
      title: "Does AI Actually Know Itself? LLM Self-Prediction vs Privileged Self-Access",
      description:
        "A capability-controlled test of LLM introspection by Ubayd Hattas: across 9,269 trials, Hermes-3's self-prediction (0.719) was beaten by a one-feature length rule (0.808). Digital Minds Research Sprint.",
      ogImage: "/pics/Digital_Minds_Hackathon.png",
    },
  },

  // ── AfriGuard ──────────────────────────────────────────────────────────────
  {
    slug: "afriguard",
    title: "AfriGuard",
    description:
      "A multilingual AI safety benchmark evaluating how well frontier LLMs maintain safety guardrails across South African languages. We red-teamed four models in seven languages, measuring Attack Success Rate across regionally relevant harms. Safety alignment catastrophically degrades outside of English.",
    longDesc:
      "Built over a single weekend at the Global South AI Safety Hackathon in Cape Town. AfriGuard tests whether the safety mechanisms that work in English actually hold up when harmful prompts are expressed in isiZulu, isiXhosa, Afrikaans, Sesotho, Sepedi, or Tsonga. The short answer: they don't.",
    fullDesc:
      "AfriGuard is a multilingual AI safety benchmark designed to evaluate how well large language models maintain safety guardrails across South African languages. The project investigates whether code-switching and local language usage can increase jailbreak success rates compared to English prompts.\n\nWe created 40 seed prompts across four harm categories endemic to South Africa (financial fraud targeting SASSA grant recipients, xenophobic incitement, political disinformation, and gang facilitation), translated them into six African languages plus an English baseline, and evaluated four frontier LLMs. That produced 280 benchmark prompts and 1,120 total model responses.\n\nThe findings were stark. The mean Attack Success Rate across all evaluations was 50.1%, more than double the English baseline of 24.4%. Certain model-language combinations reached over 90% ASR, meaning models complied with harmful requests nine times out of ten. The research confirms that a model can be safe in English and catastrophically unsafe in an African language.",
    tags: ["Python", "Pandas", "Streamlit", "AI Safety", "NLP", "Research", "Data Pipelines"],
    github: "https://github.com/ubayd-hattas/AfriGuard",
    live: "https://afriguard.streamlit.app/",
    status: "completed",
    featured: true,
    expandable: true,
    accentColor: "rgba(99, 102, 241, 0.12)",
    icon: "🛡️",
    bannerImage: "/pics/Afriguard.png",
    goals:
      "Investigate whether AI safety guardrails catastrophically degrade when harmful prompts are expressed in South African languages, and expose the real-world consequences for communities most likely to be targeted.",
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
      { src: "/screenshots/afriguard/team-working.png",       alt: "Ubayd Hattas and team working on AfriGuard at the Global South AI Safety Hackathon",    label: "The team at work"        },
      { src: "/screenshots/afriguard/dashboard-overview.png", alt: "AfriGuard analytics dashboard by Ubayd Hattas",    label: "Dashboard overview"      },
      { src: "/screenshots/afriguard/language-vulnerability.png", alt: "AfriGuard language vulnerability chart by Ubayd Hattas", label: "Language vulnerability"  },
      { src: "/screenshots/afriguard/team-group.png",         alt: "AfriGuard team photo including Ubayd Hattas",             label: "Team AfriGuard"          },
    ],
    dateAdded: "2026-06-24",
    lastUpdated: "2026-09-13",
    seo: {
      title: "AfriGuard: Multilingual AI Safety Benchmark for South African Languages",
      description:
        "AfriGuard by Ubayd Hattas red-teamed 4 frontier LLMs across 7 South African languages. Mean attack success rate: 50.1%, more than double the English baseline of 24.4%.",
      ogImage: "/pics/Afriguard.png",
    },
    relatedBlogPosts: [
      {
        slug: "ai-safety-hackathon",
        label: "Hackathon experience: from idea to research prototype in one weekend",
      },
    ],
  },

  // ── SA Data Hub ────────────────────────────────────────────────────────────
  {
    slug: "sa-data-hub",
    title: "SA Data Hub",
    description:
      "A public platform making South African data accessible to students, journalists, and citizens. Explore population, employment, and economic data from Statistics South Africa, SARB, and other public institutions, with interactive visualisations, province comparisons, and transparent methodologies.",
    longDesc:
      "SA Data Hub combines official datasets from Statistics South Africa, the SARB, and other public institutions with interactive charts, province comparisons, historical timelines, and educational insights. The goal is not only to display data, but to help users understand what the data means.",
    fullDesc:
      "SA Data Hub is a public data platform designed to make South African statistics easier to understand and explore. It pulls from Statistics South Africa, the South African Reserve Bank, SAPS, and other official bodies, presenting figures not as raw tables but as narratives with context.\n\nThe platform is built with a strong emphasis on transparency: every dataset links to its primary source, shows its update frequency, and includes a methodology page explaining how data is collected and interpreted. The Insights Hub presents long-form data stories explaining the human significance behind the numbers.",
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
      "Make South African public data genuinely accessible to students, journalists, researchers, and curious citizens, with no barrier to entry and no technical knowledge required.",
    features: [
      "Interactive Dashboard with cross-dataset filtering",
      "Province Explorer with side-by-side comparisons",
      "Data Insights Hub: long-form narratives",
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
      { src: "/screenshots/home.png",        alt: "SA Data Hub homepage by Ubayd Hattas",   label: "Homepage"         },
      { src: "/screenshots/dashboard.png",   alt: "SA Data Hub interactive dashboard by Ubayd Hattas",   label: "Dashboard"        },
      { src: "/screenshots/provinces.png",   alt: "SA Data Hub Province Explorer by Ubayd Hattas",       label: "Province Explorer" },
      { src: "/screenshots/insights.png",    alt: "SA Data Hub Insights Hub by Ubayd Hattas",            label: "Insights Hub"     },
      { src: "/screenshots/methodology.png", alt: "SA Data Hub methodology page by Ubayd Hattas",        label: "Methodology"      },
    ],
    dateAdded: "2026-06-13",
    lastUpdated: "2026-09-13",
    seo: {
      title: "SA Data Hub: South African Public Data Platform by Ubayd Hattas",
      description:
        "SA Data Hub by Ubayd Hattas makes South African public data explorable: population, employment, and economic statistics from Stats SA, SARB, and other official sources.",
      ogImage: "/pics/og-image.png",
    },
    relatedBlogPosts: [
      {
        slug: "sa-data-hub",
        label: "Development notes: how I built SA Data Hub in my first semester",
      },
      {
        slug: "stats-sa-father",
        label: "Background: what growing up around Stats SA taught me about data",
      },
    ],
  },

  // ── Personal Knowledge System (private / planned) ───────────────────────────
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
      title: "Personal Knowledge System | Ubayd Hattas",
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

/** Featured projects for homepage highlights (array order = display order) */
export const homepageFeaturedProjects = projects.filter(
  (p) => p.featured === true && !p.private
).slice(0, 3);

/** Public projects shown on the /projects index (excludes private placeholders) */
export const publicProjects = projects.filter((p) => !p.private);
