"use client";

import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Clock, X, ArrowUp, BookOpen, Tag, Calendar } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface PublishedPost {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  lastUpdated?: string;
  readingTime: number; // minutes
  content: React.ReactNode;
}

interface PlannedPost {
  title: string;
  excerpt: string;
  topic: string;
  status: "draft" | "soon" | "idea";
}

// ─────────────────────────────────────────────────────────────────────────────
// Article content
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const publishedPosts: PublishedPost[] = [
  {
    id: "stats-sa-father",
    title: "What My Father's Work at Stats SA Taught Me About Data",
    excerpt:
      "Growing up around national data collection made statistics feel interesting long before I encountered it academically. This is about effort, compounding and what it means to follow someone's path.",
    tags: ["Personal", "Data", "Reflection"],
    date: "29 May 2026",
    readingTime: 4,
    content: <ArticleStatsPost />,
  },
];

const plannedPosts: PlannedPost[] = [
  {
    title: "Why I study statistics before machine learning",
    excerpt:
      "Everyone wants to build models. I want to understand what a model actually is first. An argument for foundations over frameworks.",
    topic: "Statistics · Learning",
    status: "draft",
  },
  {
    title: "How I study: a system for university mathematics",
    excerpt:
      "The specific habits, tools and mental models I've built for studying maths at UCT without burning out.",
    topic: "Productivity · Maths",
    status: "draft",
  },
  {
    title: "On being a public school student at a top university",
    excerpt:
      "What changes, what doesn't and why the 'disadvantage' narrative often misses the point.",
    topic: "Reflection · UCT",
    status: "idea",
  },
  {
    title: "The case for keeping a low digital footprint as a student",
    excerpt:
      "Why I'm not on TikTok, why I limit social media and how that creates more space to actually think.",
    topic: "Lifestyle · Focus",
    status: "idea",
  },
];

const statusConfig = {
  draft: {
    label: "Draft",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  soon: {
    label: "Coming soon",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  idea: {
    label: "Idea",
    color: "text-dim",
    bg: "bg-[var(--surface)] border-[var(--border)]",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Reading Progress Bar
// ─────────────────────────────────────────────────────────────────────────────

function ReadingProgressBar({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [containerRef]);

  return (
    <div className="reading-progress-track">
      <motion.div
        className="reading-progress-bar"
        style={{ width: `${progress}%` }}
        transition={{ ease: "linear", duration: 0 }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Article Modal
// ─────────────────────────────────────────────────────────────────────────────

function ArticleModal({
  post,
  onClose,
}: {
  post: PublishedPost;
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const onScroll = () => {
    const el = scrollRef.current;
    if (el) setShowScrollTop(el.scrollTop > 300);
  };

  const scrollToTop = () =>
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        key="modal-panel"
        className="modal-panel"
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Progress bar */}
        <ReadingProgressBar containerRef={scrollRef} />

        {/* Close */}
        <button
          onClick={onClose}
          className="modal-close"
          aria-label="Close article"
        >
          <X size={16} />
        </button>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="modal-scroll"
          onScroll={onScroll}
        >
          <div className="modal-content">
            {/* Tags */}
            <div className="article-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="article-tag">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="article-title">{post.title}</h1>

            {/* Meta */}
            <div className="article-meta">
              <span className="article-meta-item">
                <Calendar size={12} />
                {post.date}
              </span>
              {post.lastUpdated && (
                <span className="article-meta-item text-dim">
                  Updated {post.lastUpdated}
                </span>
              )}
              <span className="article-meta-item">
                <BookOpen size={12} />
                {post.readingTime} min read
              </span>
            </div>

            <div className="article-rule" />

            {/* Body */}
            <div className="article-body">{post.content}</div>

            {/* Related placeholder */}
            <div className="related-section">
              <p className="related-heading">More writing</p>
              <p className="related-subtext">
                More pieces are in draft — check back soon.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll to top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="scroll-top-btn"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Published Post Card
// ─────────────────────────────────────────────────────────────────────────────

function PublishedCard({
  post,
  index,
  onClick,
}: {
  post: PublishedPost;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="published-card"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Read: ${post.title}`}
    >
      {/* Top row: tags + reading time */}
      <div className="published-card-top">
        <div className="published-card-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="article-tag">
              {tag}
            </span>
          ))}
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
              className="reading-time-badge"
            >
              <Clock size={11} />
              {post.readingTime} min read
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Title */}
      <h3 className="published-card-title">{post.title}</h3>

      {/* Excerpt — reveal on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 10 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="published-card-excerpt"
          >
            {post.excerpt}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Date + read link */}
      <div className="published-card-footer">
        <span className="published-card-date">
          <Calendar size={11} />
          {post.date}
        </span>
        <span className="published-card-read-link">
          Read article →
        </span>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────

export default function BlogClient() {
  const [activePost, setActivePost] = useState<PublishedPost | null>(null);

  const openPost = useCallback((post: PublishedPost) => {
    setActivePost(post);
  }, []);

  const closePost = useCallback(() => {
    setActivePost(null);
  }, []);

  return (
    <PageTransition>
      {/* ── Inline styles for blog-specific components ── */}
      <style>{`
        /* ── Published card ── */
        .published-card {
          width: 100%;
          text-align: left;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 20px 22px;
          cursor: pointer;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .published-card:hover {
          border-color: rgba(99,102,241,0.35);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(99,102,241,0.1);
          transform: translateY(-2px);
        }
        .published-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(99,102,241,0.04) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .published-card:hover::before { opacity: 1; }

        .published-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          gap: 8px;
        }
        .published-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .published-card-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--foreground);
          line-height: 1.45;
          letter-spacing: -0.01em;
          margin: 0;
        }
        .published-card-excerpt {
          font-size: 13px;
          color: var(--muted-foreground, var(--secondary));
          line-height: 1.65;
          overflow: hidden;
          margin: 0;
        }
        .published-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
          gap: 8px;
        }
        .published-card-date {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: var(--muted-foreground, var(--dim));
        }
        .published-card-read-link {
          font-size: 12px;
          color: rgb(99,102,241);
          font-weight: 500;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .published-card:hover .published-card-read-link { opacity: 1; }

        .reading-time-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: rgb(99,102,241);
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 20px;
          padding: 3px 9px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── Tag pill ── */
        .article-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--muted-foreground, var(--dim));
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2px 8px;
          white-space: nowrap;
        }

        /* ── Section divider between published and planned ── */
        .section-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 40px 0 28px;
        }
        .section-divider-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .section-divider-label {
          font-size: 11px;
          font-weight: 500;
          color: var(--muted-foreground, var(--dim));
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ── Modal ── */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 50;
        }
        .modal-panel {
          position: fixed;
          inset: 0;
          z-index: 51;
          display: flex;
          flex-direction: column;
          background: var(--background);
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .modal-panel {
            inset: 24px;
            border-radius: 20px;
            border: 1px solid var(--border);
            box-shadow: 0 32px 80px rgba(0,0,0,0.35);
          }
        }
        .modal-close {
          position: absolute;
          top: 18px;
          right: 18px;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--muted-foreground, var(--dim));
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .modal-close:hover {
          background: var(--border);
          color: var(--foreground);
        }
        .modal-scroll {
          flex: 1;
          overflow-y: auto;
          overscroll-behavior: contain;
          scroll-behavior: smooth;
        }
        .modal-content {
          max-width: 680px;
          margin: 0 auto;
          padding: 60px 28px 80px;
        }
        @media (min-width: 768px) {
          .modal-content { padding: 72px 48px 100px; }
        }

        /* ── Reading progress ── */
        .reading-progress-track {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--border);
          z-index: 20;
        }
        .reading-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, rgb(99,102,241), rgb(139,92,246));
          transition: width 0.05s linear;
          border-radius: 0 2px 2px 0;
        }

        /* ── Article typography ── */
        .article-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        .article-title {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 700;
          color: var(--foreground);
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin: 0 0 18px 0;
        }
        .article-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
        }
        .article-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: var(--muted-foreground, var(--dim));
        }
        .article-rule {
          height: 1px;
          background: var(--border);
          margin-bottom: 36px;
        }
        .article-body {
          font-size: 16px;
          line-height: 1.8;
          color: var(--foreground);
        }
        .prose-article p {
          margin: 0 0 22px 0;
          color: var(--foreground);
          opacity: 0.88;
        }
        .prose-article p:last-child { margin-bottom: 0; }
        .article-separator {
          height: 1px;
          background: var(--border);
          margin: 28px 0;
          opacity: 0.5;
        }
        .article-emphasis {
          font-size: 17px !important;
          font-style: italic;
          color: var(--foreground) !important;
          opacity: 1 !important;
          border-left: 2px solid rgba(99,102,241,0.5);
          padding-left: 18px !important;
          margin-left: -18px !important; /* realign with text */
          padding-left: 18px !important;
        }
        .article-aside {
          font-size: 15px;
          color: var(--muted-foreground, var(--dim)) !important;
          font-style: italic;
          opacity: 1 !important;
        }
        .article-link {
          color: rgb(99,102,241);
          text-decoration: underline;
          text-decoration-color: rgba(99,102,241,0.35);
          text-underline-offset: 3px;
          transition: text-decoration-color 0.2s;
        }
        .article-link:hover { text-decoration-color: rgb(99,102,241); }

        /* ── Related section ── */
        .related-section {
          margin-top: 64px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
        }
        .related-heading {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted-foreground, var(--dim));
          margin: 0 0 8px 0;
        }
        .related-subtext {
          font-size: 13px;
          color: var(--muted-foreground, var(--dim));
          margin: 0;
          font-style: italic;
        }

        /* ── Scroll to top button ── */
        .scroll-top-btn {
          position: absolute;
          bottom: 28px;
          right: 28px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--surface);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted-foreground, var(--dim));
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          z-index: 10;
        }
        .scroll-top-btn:hover {
          background: rgba(99,102,241,0.1);
          color: rgb(99,102,241);
          border-color: rgba(99,102,241,0.3);
        }
      `}</style>

      <div className="page-content pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* ── Header ── */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-16"
          >
            <span className="tag mb-4 inline-block">Blog</span>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight gradient-text mb-4">
              Writing is
              <br />
              thinking out loud.
            </h1>
            <p className="text-[15px] text-secondary leading-relaxed max-w-xl">
              I write to clarify my own thinking about data, mathematics,
              studying and building a focused life. Nothing is published until
              it's worth reading.
            </p>
          </motion.div>

          {/* ── Published posts ── */}
          <div className="space-y-4 mb-4">
            {publishedPosts.map((post, i) => (
              <PublishedCard
                key={post.id}
                post={post}
                index={i}
                onClick={() => openPost(post)}
              />
            ))}
          </div>

          {/* ── Section divider ── */}
          <div className="section-divider">
            <div className="section-divider-line" />
            <span className="section-divider-label">In progress</span>
            <div className="section-divider-line" />
          </div>

          {/* ── Planned posts ── */}
          <div className="space-y-4">
            {plannedPosts.map((post, i) => {
              const s = statusConfig[post.status];
              return (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="card p-6 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <PenLine
                        size={15}
                        className="text-indigo-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                      />
                      <h3 className="text-[15px] font-medium text-primary leading-snug">
                        {post.title}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 self-start text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${s.bg} ${s.color}`}
                    >
                      {s.label}
                    </span>
                  </div>
                  <p className="text-[13px] text-dim leading-relaxed ml-6 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="ml-6">
                    <span className="text-[11px] text-dim">{post.topic}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Philosophy note ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 max-w-xl"
          >
            <p className="text-[14px] text-dim leading-relaxed border-l-2 border-indigo-500/30 pl-5">
              I don't write for engagement metrics. I write to understand
              something better than I did before I started. If that's useful to
              someone else, good. If not, the thinking was still worth doing.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Article modal ── */}
      <AnimatePresence>
        {activePost && (
          <ArticleModal post={activePost} onClose={closePost} />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
