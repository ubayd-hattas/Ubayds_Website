"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, BookOpen, Tag } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";

// ─── Article content components (same content as BlogClient.tsx) ──────────────

const ArticleStatsPost = () => (
  <article className="prose-article">
    <p>
      Growing up, I didn't know much about data. In fact, I barely even
      understood what my dad did for work because of how complicated it all
      sounded. From a very young age up until now, I remember him talking to me
      about topics in computer science, statistics and maths that completely
      went over my head. He would show me books, long pieces of code, confusing
      equations and pages of notes that looked unreadable to me at the time. I
      genuinely thought I would never reach that level.
    </p>
    <p>But over the years, I noticed something interesting. I started falling in love with maths.</p>
    <p>
      It became my strongest subject throughout school, with physics close
      behind. Even though I never really did much statistics at school besides
      the small amount included in matric maths, I still found data
      fascinating. The idea that patterns could predict outcomes so accurately
      interested me a lot. Data felt like something bigger than numbers on a
      spreadsheet. It influences economies, businesses, decisions and honestly
      the way people understand the world.
    </p>

    <div className="article-separator" />

    <p className="article-emphasis">
      My dad's work played a massive role in the way I think about all of this.
    </p>

    <p>
      My father, Dr Mahier Hattas, is a director of field operations at Stats
      SA and has spent more than 20 years in the field. If you're interested in
      his work, you can check out his{" "}
      <a
        href="https://www.linkedin.com/in/dr-mahier-hattas-ab79a380/"
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        LinkedIn profile here
      </a>
      .
    </p>
    <p>
      Over time, I realized he taught me more than just academics. He taught me
      to think logically and statistically. To look at situations carefully
      instead of emotionally. To see the world as information, patterns and
      decisions that lead to outcomes.
    </p>

    <div className="article-separator" />

    <p>That mindset helped me a lot during my final years of school.</p>
    <p>
      I stopped seeing work as punishment or just something you survive. I
      started seeing it as something that actually improves you. Especially with
      the science path I took in school, I realized success was not just about
      intelligence. It required discipline, calmness, consistency, quality
      sleep, low stimulation and taking care of your mind properly.
    </p>
    <p>
      What surprised me most was how these habits improved my life outside
      academics too. I became more confident in myself. I started taking bolder
      steps. I trusted my own ability more.
    </p>

    <p className="article-aside">And honestly, that was new for me.</p>

    <p>
      I was always the average kid at school. Lazy sometimes. Not interested in
      studying. But once I finally understood what my dad had been trying to
      teach me all these years about how the world works and how effort
      compounds over time, I started seeing a different version of myself.
    </p>
    <p>
      A version that eventually made it to UCT, following a path similar to my
      father's.
    </p>
    <p>
      His work no longer looked like hieroglyphics to me. It became something I
      respected, understood and now something I'm stepping into myself. It also
      taught me that challenging work forces you to take care of yourself
      properly because your mind and body become part of the process.
    </p>

    <div className="article-separator" />

    <p className="article-emphasis">
      In the end, the future version of yourself is probably far more
      achievable than you think.
    </p>

    <p>
      Even when your goals feel unrealistic, consistent effort changes the odds
      slowly over time. I really believe that. If I could go from being that
      lazy kid early in my academic life to improving year by year and
      eventually making it to UCT, then maybe a lot more is possible than we
      initially think.
    </p>
  </article>
);

const ArticleDataHubPost = () => (
  <article className="prose-article">
    <p>
      During my first semester at UCT, most of my time was spent adjusting to
      university life. The workload was heavier than anything I had experienced
      before and balancing academics, health, social life and personal projects
      was a challenge.
    </p>
    <p>One thing that helped me a lot during that transition was statistics.</p>
    <p>
      I found myself constantly thinking about things in terms of outcomes,
      probabilities and trade offs. Which habits would benefit me the most over
      time? Which routines had the biggest impact on my academics and wellbeing?
      How could I spend my limited time in the most effective way possible?
    </p>
    <p>
      As I started looking for data to answer some of these questions, I noticed
      something frustrating. Finding specific South African data was often much
      harder than it should have been.
    </p>

    <p className="article-aside">
      This made me curious about how accessible data actually is in South Africa.
    </p>

    <p>
      Naturally, the first place I looked was Stats SA. Statistics had always
      been something I was exposed to growing up, so it felt like the obvious
      place to start. It contains an incredible amount of valuable information,
      but I quickly realized that navigating it as an ordinary user could be
      difficult.
    </p>
    <p>
      Many datasets were buried inside reports, spread across different
      publications or required a fair amount of searching before you could find
      what you needed. For someone who just wanted a quick answer or
      visualization, the process could feel overwhelming.
    </p>

    <div className="article-separator" />

    <p className="article-emphasis">
      That got me thinking. What if there was a simpler way to explore South
      African data?
    </p>

    <p>
      Not long after successfully launching my personal website, I realized I had
      developed enough web development skills to actually build something around
      this idea. I wanted to create a platform that made data easier to access,
      understand and explore.
    </p>
    <p>On 31 May 2026, I launched SA Data Hub.</p>
    <p>The goal was simple: make South African data easier to understand.</p>
    <p>
      Over the following weeks, I spent a lot of time collecting datasets,
      cleaning them, converting CSV files into JSON files and integrating them
      into the website. It was a valuable learning experience, but it also taught
      me an important lesson about scalability.
    </p>

    <p className="article-aside">
      The more data I added, the more I realized that manually managing files was
      becoming inefficient.
    </p>

    <div className="article-separator" />

    <p>
      At the time of writing this, I am currently on my winter break. Alongside
      attending my first hackathon, the Global South AI Safety Hackathon in Cape
      Town and participating in various events, I have been learning PostgreSQL
      and exploring better ways to manage data through databases rather than
      static files.
    </p>
    <p>
      My goal is to make SA Data Hub far more automated. I want data collection,
      storage and updates to rely less on manual work and more on databases, APIs,
      and Python scripts. Ideally, by the time second semester begins, most of the
      maintenance will be handled behind the scenes.
    </p>
    <p>For now, I am not rushing into new projects.</p>
    <p>
      I want to continue improving SA Data Hub because I believe some projects
      become more valuable the longer you stick with them. Every new dataset,
      feature and improvement adds to what already exists. The project compounds
      over time.
    </p>

    <div className="article-separator" />

    <p className="article-emphasis">
      Looking back, it is still strange to think that this all started because I
      was trying to understand my own routines better during my first semester at
      university.
    </p>

    <p>
      What began as curiosity about data eventually turned into a platform built
      to help others explore it too.
    </p>
  </article>
);

// ─── Post content map ─────────────────────────────────────────────────────────

const postContent: Record<string, React.ReactNode> = {
  "stats-sa-father": <ArticleStatsPost />,
  "sa-data-hub": <ArticleDataHubPost />,
};

// ─── Post metadata (mirrors posts.ts for client use) ─────────────────────────

const postMeta: Record<string, {
  title: string;
  date: string;
  tags: string[];
  readingTime: number;
  excerpt: string;
}> = {
  "stats-sa-father": {
    title: "What My Father's Work at Stats SA Taught Me About Data",
    date: "29 May 2026",
    tags: ["Personal", "Data", "Reflection"],
    readingTime: 4,
    excerpt:
      "Growing up around national data collection made statistics feel interesting long before I encountered it academically. This is about effort, compounding and what it means to follow someone's path.",
  },
  "sa-data-hub": {
    title: "How I Built a South African Data Hub in My First Semester at UCT",
    date: "13 Jun 2026",
    tags: ["Projects", "Data", "UCT"],
    readingTime: 5,
    excerpt:
      "What started as a personal curiosity about South African data turned into a platform built to make that data easier to explore. This is the story of building SA Data Hub.",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function BlogPostPageClient({ slug }: { slug: string }) {
  const meta = postMeta[slug];
  const content = postContent[slug];

  if (!meta || !content) {
    notFound();
  }

  return (
    <PageTransition>
      <style>{`
        .prose-article p {
          font-size: 15px;
          line-height: 1.8;
          color: var(--foreground-muted);
          margin-bottom: 1.25rem;
        }
        .article-emphasis {
          font-size: 17px !important;
          font-weight: 500;
          color: var(--foreground) !important;
          line-height: 1.65 !important;
        }
        .article-aside {
          border-left: 2px solid rgba(99,102,241,0.5);
          padding-left: 16px;
          font-style: italic;
          color: var(--foreground-dim) !important;
        }
        .article-separator {
          width: 40px;
          height: 1px;
          background: var(--border);
          margin: 2rem 0;
        }
        .article-link {
          color: rgb(99,102,241);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .article-link:hover {
          color: rgb(139,92,246);
        }
      `}</style>

      <div className="page-content pt-28 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] transition-colors"
              style={{ color: "var(--foreground-dim)" }}
            >
              <ArrowLeft size={14} />
              Back to blog
            </Link>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground-dim)",
                }}
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.2] mb-5"
            style={{ color: "var(--foreground)" }}
          >
            {meta.title}
          </motion.h1>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex items-center gap-5 mb-8 pb-8"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <span
              className="flex items-center gap-1.5 text-[12px]"
              style={{ color: "var(--foreground-dim)" }}
            >
              <Calendar size={12} />
              {meta.date}
            </span>
            <span
              className="flex items-center gap-1.5 text-[12px]"
              style={{ color: "var(--foreground-dim)" }}
            >
              <BookOpen size={12} />
              {meta.readingTime} min read
            </span>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {content}
          </motion.div>

          {/* Back to blog */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-16 pt-8"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] font-medium transition-colors"
              style={{ color: "var(--accent)" }}
            >
              <ArrowLeft size={14} />
              Back to all writing
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
