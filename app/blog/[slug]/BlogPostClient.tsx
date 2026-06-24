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

const ArticleHackathonPost = () => (
  <article className="prose-article">
    <p>
      A few weeks after launching my personal website and SA Data Hub, I found
      myself looking for another challenge.
    </p>
    <p>
      Building projects on my own had taught me a lot, but I wanted to know
      what it felt like to work with a real deadline, real teammates, and a
      problem that went beyond software itself.
    </p>
    <p>
      That came through the{" "}
      <a
        href="https://apartresearch.com/sprints/global-south-ais-hackathon-2026-06-19-to-2026-06-21"
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        Global South AI Safety Hackathon
      </a>
      , hosted by Apart Research. The event brought together students,
      researchers and builders from across the region to work on practical AI
      safety challenges relevant to Africa.
    </p>
    <p>
      Rather than build another web app or data project, I wanted to
      contribute to something that tested how safe modern AI systems actually
      are when used in South African languages.
    </p>

    <h2 className="article-heading">The Idea</h2>
    <p>
      Large language models are mostly trained, tested and red-teamed in
      English. That means we know comparatively little about whether the same
      safety mechanisms hold up once a model is prompted in isiZulu, Sesotho,
      Afrikaans or any of South Africa's other official languages.
    </p>
    <p>
      That gap matters here specifically. A lot of the harm a model could
      enable, like scams targeting SASSA grant recipients, xenophobic
      incitement, or political disinformation, doesn't happen in English. It
      happens in the languages people actually use to scam, organise and
      persuade each other. If a model's safety filters mostly work in
      English, that's a blind spot with real consequences for the people most
      likely to be targeted.
    </p>
    <p>
      Our project,{" "}
      <a
        href="https://github.com/ubayd-hattas/AfriGuard"
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        AfriGuard
      </a>
      , set out to investigate exactly that.
    </p>
    <p>
      We built a multilingual AI safety benchmark focused on South African
      languages and regionally relevant harms. Instead of testing generic
      harmful content, we grounded our prompts in scenarios specific to South
      Africa:
    </p>
    <ul className="article-list">
      <li>Financial fraud targeting SASSA grant recipients and banking customers</li>
      <li>Xenophobic incitement</li>
      <li>Political disinformation</li>
      <li>Gang and criminal facilitation</li>
    </ul>
    <p>
      We translated these prompts into multiple South African languages and
      tested how different AI models responded. In total, our benchmark
      contained 40 seed prompts translated across seven languages, producing
      280 prompt variants, which we evaluated across four frontier language
      models for 1,120 model responses in total.
    </p>

    <h2 className="article-heading">Building the Team</h2>
    <p>Originally, I planned to attempt the project on my own.</p>
    <p>
      As the idea grew, it became clear the scope was bigger than what one
      person could realistically finish over a single weekend.
    </p>
    <p>
      My friend{" "}
      <a
        href="https://www.linkedin.com/in/jaswin-chinthala/"
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        Jaswin Chinthala
      </a>
      , a Mechatronics student at UCT, joined first and helped with prompt
      design, model testing and evaluation. Soon after,{" "}
      <a
        href="https://www.linkedin.com/in/seth-miguel-ferreira-943704415/"
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        Seth Miguel Ferreira
      </a>{" "}
      from Boston College joined and took on adversarial prompting and the
      judging pipeline. We were also fortunate to work alongside{" "}
      <a
        href="https://www.linkedin.com/in/sebstent/"
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        Sebastian Stent
      </a>
      , who brought additional experience and helped with translation
      workflows and dataset curation.
    </p>
    <p>Our responsibilities naturally evolved into:</p>
    <ul className="article-list">
      <li><strong>Jaswin Chinthala</strong> — jailbreak testing, model evaluation</li>
      <li><strong>Seth Miguel Ferreira</strong> — adversarial prompting, judging pipeline</li>
      <li><strong>Sebastian Stent</strong> — translation pipeline, dataset curation</li>
      <li>
        <strong>Ubayd Hattas</strong> — evaluation pipeline, automated
        judging, statistical analysis, dashboard development, data
        visualisation
      </li>
    </ul>

    <h2 className="article-heading">The Reality of Research</h2>
    <p>
      One thing this hackathon taught me very quickly is that research is
      messy.
    </p>
    <p>
      When people see the final dashboard, figures and report, it's easy to
      assume everything came together smoothly.
    </p>
    <p className="article-aside">It didn't.</p>
    <p>
      We ran into API limits, broken automation pipelines, missing datasets,
      evaluation bugs, deployment issues and countless edge cases that only
      appeared once we thought everything was working. At one point I spent
      hours debugging Python scripts that had worked perfectly the day
      before. Another issue caused our dashboard to show incorrect results
      despite the underlying data being correct, and later Streamlit refused
      to locate files that existed locally but not in production. Near the
      end of the project we even found a data processing bug that forced us
      to reprocess the entire evaluation dataset.
    </p>
    <p>
      Looking back, a lot of this could have been solved faster by asking
      mentors for help earlier. That was probably the biggest lesson of the
      weekend: sometimes the fastest way forward is simply asking someone who
      has already solved the problem.
    </p>

    <h2 className="article-heading">My Contribution</h2>
    <p>
      Most of my work went into building the infrastructure that turned raw
      model responses into usable research results.
    </p>
    <p>
      I developed the evaluation pipeline responsible for collecting
      responses, judging model behaviour, processing the resulting data, and
      generating the analytics used throughout the project, covering 280
      prompts per model across 4 AI models, for 1,120 responses in total.
    </p>
    <p>
      I built the automation scripts that processed responses, classified
      model behaviour, computed safety metrics, generated visualisations and
      powered an interactive{" "}
      <a
        href="https://afriguard.streamlit.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        Streamlit dashboard
      </a>
      . It let us explore attack success rates across languages, compare
      model performance, analyse harm categories and investigate where safety
      systems seemed to fail.
    </p>
    <p>
      This was the first time I'd built something resembling a complete data
      pipeline rather than a standalone application.
    </p>
    <p>
      By the end of the weekend, the project had come together as a public
      dashboard anyone could explore, automated evaluation pipelines that
      could be re-run on new prompts or models, reproducible analysis
      workflows that turned raw outputs into consistent metrics every time,
      and a public{" "}
      <a
        href="https://github.com/ubayd-hattas/AfriGuard"
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        GitHub repository
      </a>{" "}
      with the full code, prompts and results.
    </p>

    <h2 className="article-heading">What I Learned</h2>
    <p>
      The technical skills were valuable, but the biggest lessons came from
      the process itself.
    </p>
    <p>
      Over the weekend I got hands-on with APIs, Pandas, evaluation
      pipelines, automated data processing, Streamlit dashboards and research
      methodology, most of which I'd barely touched a few weeks earlier. The
      combination of documentation, experimentation and AI-assisted debugging
      let me move far faster than I could have on my own.
    </p>
    <p>I also learned the value of working in a strong team.</p>
    <p>Could I have built a version of this project by myself?</p>
    <p className="article-aside">Probably.</p>
    <p>Could I have built the version we actually submitted?</p>
    <p className="article-aside">Definitely not.</p>
    <p>
      It only came together because different people brought different
      strengths and perspectives.
    </p>

    <h2 className="article-heading">Looking Back</h2>
    <p>
      A few weeks before this hackathon, I was building my first data
      projects and figuring out how website deployment even worked.
    </p>
    <p>
      This weekend I found myself contributing to an AI safety benchmark,
      working alongside a multidisciplinary team, processing over a thousand
      model evaluations and helping build tooling that investigated AI safety
      in South African languages.
    </p>
    <p>
      Regardless of where our project ultimately ranks, that alone made the
      weekend worth it.
    </p>
    <p className="article-emphasis">
      More than anything, the hackathon showed me how much there still is to
      learn, and how quickly that learning happens when you throw yourself
      into something ambitious.
    </p>
    <p>
      I'm excited to keep building, researching and contributing to projects
      that have real-world impact.
    </p>
  </article>
);

// ─── Post content map ─────────────────────────────────────────────────────────

const postContent: Record<string, React.ReactNode> = {
  "stats-sa-father": <ArticleStatsPost />,
  "sa-data-hub": <ArticleDataHubPost />,
  "ai-safety-hackathon": <ArticleHackathonPost />,
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
  "ai-safety-hackathon": {
    title: "My First AI Safety Hackathon: From Idea to Research Prototype",
    date: "24 Jun 2026",
    tags: ["AI Safety", "Research", "Hackathon"],
    readingTime: 5,
    excerpt:
      "My first hackathon took me from a solo-project mindset to building a multilingual AI safety benchmark with a team, in a single weekend. This is the story of AfriGuard.",
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
        .article-heading {
          font-size: 20px;
          font-weight: 600;
          color: var(--foreground);
          letter-spacing: -0.01em;
          margin: 2.75rem 0 1rem;
        }
        .article-list {
          margin: 0 0 1.25rem 0;
          padding-left: 1.3rem;
          font-size: 15px;
          line-height: 1.8;
          color: var(--foreground-muted);
        }
        .article-list li {
          margin-bottom: 0.4rem;
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
