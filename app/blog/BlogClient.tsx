"use client";

import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Clock, Calendar, Tag } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

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
}

interface PlannedPost {
  title: string;
  excerpt: string;
  topic: string;
  status: "draft" | "soon" | "idea";
}

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
  },
  {
    id: "sa-data-hub",
    title: "How I Built a South African Data Hub in My First Semester at UCT",
    excerpt:
      "What started as a personal curiosity about South African data turned into a platform built to make that data easier to explore. This is the story of building SA Data Hub, the lessons it taught me and where it is heading next.",
    tags: ["Projects", "Data", "UCT"],
    date: "13 Jun 2026",
    readingTime: 5,
  },
  {
    id: "ai-safety-hackathon",
    title: "My First AI Safety Hackathon: From Idea to Research Prototype",
    excerpt:
      "My first hackathon took me from a solo-project mindset to building a multilingual AI safety benchmark with a team, in a single weekend. This is the story of AfriGuard, the bugs we hit, and what I learned about doing research with other people.",
    tags: ["AI Safety", "Research", "Hackathon"],
    date: "24 Jun 2026",
    readingTime: 5,
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
// Published Post Card
// ─────────────────────────────────────────────────────────────────────────────

function PublishedCard({
  post,
  index,
}: {
  post: PublishedPost;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <Link
        href={`/blog/${post.id}`}
        className="published-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`Read: ${post.title}`}
      >
        {/* Top row: tags + reading time */}
        <div className="published-card-top">
          <div className="published-card-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="article-tag">
                <Tag size={10} />
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
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────

export default function BlogClient() {
  return (
    <PageTransition>
      {/* ── Inline styles for blog-specific components ── */}
      <style>{`
        /* ── Published card ── */
        .published-card {
          display: block;
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
          text-decoration: none;
          color: inherit;
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
    </PageTransition>
  );
}
