// Blog post data — structured for both the listing page and individual post pages.
// Adding a new post: add an entry here, add the content component in BlogClient.tsx,
// and add the slug to app/sitemap.ts.

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  dateISO: string; // ISO 8601 for schema markup
  lastUpdated?: string;
  readingTime: number; // minutes
  description: string; // unique meta description per post
}

export const publishedPostsMeta: BlogPost[] = [
  {
    slug: "stats-sa-father",
    title: "What My Father's Work at Stats SA Taught Me About Data",
    excerpt:
      "Growing up around national data collection made statistics feel interesting long before I encountered it academically. This is about effort, compounding and what it means to follow someone's path.",
    tags: ["Personal", "Data", "Reflection"],
    date: "29 May 2026",
    dateISO: "2026-05-29",
    readingTime: 4,
    description:
      "How growing up with a Stats SA director for a father shaped my relationship with data, statistics, and the discipline it takes to build something meaningful. A personal reflection on effort and compounding.",
  },
  {
    slug: "sa-data-hub",
    title: "How I Built a South African Data Hub in My First Semester at UCT",
    excerpt:
      "What started as a personal curiosity about South African data turned into a platform built to make that data easier to explore. This is the story of building SA Data Hub, the lessons it taught me and where it is heading next.",
    tags: ["Projects", "Data", "UCT"],
    date: "13 Jun 2026",
    dateISO: "2026-06-13",
    readingTime: 5,
    description:
      "The story of building SA Data Hub during my first semester at UCT — what triggered the idea, how I built it, what scalability challenges I hit, and where the platform is heading next.",
  },
  {
    slug: "ai-safety-hackathon",
    title: "My First AI Safety Hackathon: From Idea to Research Prototype",
    excerpt:
      "My first hackathon took me from a solo-project mindset to building a multilingual AI safety benchmark with a team, in a single weekend. This is the story of AfriGuard, the bugs we hit, and what I learned about doing research with other people.",
    tags: ["AI Safety", "Research", "Hackathon"],
    date: "24 Jun 2026",
    dateISO: "2026-06-24",
    readingTime: 5,
    description:
      "The story of competing in the Global South AI Safety Hackathon hosted by Apart Research — building AfriGuard, a multilingual AI safety benchmark for South African languages, the evaluation pipeline I built, and what working in a research team taught me.",
  },
];
