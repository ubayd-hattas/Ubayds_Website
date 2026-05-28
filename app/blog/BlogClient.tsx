"use client";

import PageTransition from "@/components/PageTransition";

import { motion } from "framer-motion";
import { PenLine, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

interface PostPreview {
  title: string;
  excerpt: string;
  topic: string;
  status: "draft" | "soon" | "idea";
}

const plannedPosts: PostPreview[] = [
    {
    title: "What my father's work at Stats SA taught me about data",
    excerpt:
      "Growing up around national data collection made statistics feel interesting long before I encountered it academically.",
    topic: "Personal · Data",
    status: "soon",
  },
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

export default function BlogClient() {
  return (
    <PageTransition>
    <div className="page-content pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
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

        {/* Coming soon banner */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-12 p-5 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.04] flex items-start gap-3"
        >
          <Clock size={15} className="text-indigo-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-[13px] text-secondary font-medium">
              Blog launching soon
            </p>
            <p className="text-[12px] text-dim mt-0.5 leading-relaxed">
              The first few posts are in draft. Below is what's coming, you
              can get a sense of the topics I care about.
            </p>
          </div>
        </motion.div>

        {/* Planned posts */}
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

        {/* Philosophy note */}
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
