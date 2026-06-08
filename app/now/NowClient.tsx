"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, Brain, Dumbbell, Music2, MapPin, Clock } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const sections = [
  {
    icon: BookOpen,
    title: "Studying",
    items: [
      {
        label: "Mathematics",
        detail: "Currently working through multivariable calculus and linear algebra. The abstraction is starting to click.",
      },
      {
        label: "Physics",
        detail: "Covers fundamental principles of physics including mechanics, wave motion and fluid dynamics through practical laboratory work."
      },
      {
        label: "Mathematical Statistics",
        detail: "Probability distributions and the foundations of statistical inference. This is the subject I care most about.",
      },
      {
        label: "Computer Science",
        detail: "Algorithms, data structures, Java and Python. Slower than I expected, I already knew a lot of this, but the rigour is valuable.",
      },
    ],
  },
  {
    icon: Brain,
    title: "Reading",
    items: [
      {
        label: "The disease and the cure — Imam Ibn al-Qayyim al-Jawziyyah",
        detail: "This book diagnoses the root causes of destructive habits and their impact on human well-being.",
      },
      {
        label: "How to Think Like a Mathematician — Kevin Houston",
        detail: "Working through proof techniques before I need them for second year. Building the mental muscle now.",
      },
      {
        label: "Atomic Habits — James Clear",
        detail: "Re-reading specific chapters. The system over goals framing is something I keep coming back to.",
      },
    ],
  },
  {
    icon: Code2,
    title: "Building",
    items: [
      {
        label: "SA Data Hub",
        detail: "A website that aims to makes South African data easier to access and interpret.",
      },
      {
        label: "This website",
        detail: "Continuously improving the design, SEO and content. Treating it as a long-term project rather than a one-time build.",
      },
    ],
  },
  {
    icon: Dumbbell,
    title: "Outside the desk",
    items: [
      {
        label: "Football",
        detail: "Favourite sport of mine that I play 1-2 times a week for my physical and mental health",
      },
      {
        label: "Gym",
        detail: "Light gym session 4-5 times a week just before my day starts",
      },
      {
        label: "Spending time with family",
        detail: "Living in Cape Town. Trying to stay grounded outside of academic pressure.",
      },
    ],
  },
  {
    icon: Music2,
    title: "Listening to",
    items: [
      {
        label: "Ambient, Nature or Minecraft study playlists",
        detail: "Nothing with lyrics while working. The cognitive load of words interferes with reading and coding.",
      },
      {
        label: "Podcasts",
        detail: "Dr Omar Suleiman at night. He emphasises that true reliance on Allah means doing everything within your power while completely leaving the final outcome to Him.",
      },
    ],
  },
];

// Update this date when you update the page
const LAST_UPDATED = "May 2026";

export default function NowClient() {
  return (
    <PageTransition>
      <div className="page-content pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-6">

          {/* Header */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="mb-4">
            <span className="tag mb-4 inline-block">Now</span>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight gradient-text mb-4">
              What I'm focused on
              <br />right now.
            </h1>
          </motion.div>

          {/* Meta */}
          <motion.div
            custom={1} variants={fadeUp} initial="hidden" animate="show"
            className="flex flex-wrap gap-5 mb-14"
          >
            <span className="flex items-center gap-1.5 text-[13px]" style={{ color: "var(--foreground-dim)" }}>
              <MapPin size={12} style={{ color: "var(--accent)" }} />
              Cape Town, South Africa
            </span>
            <span className="flex items-center gap-1.5 text-[13px]" style={{ color: "var(--foreground-dim)" }}>
              <Clock size={12} style={{ color: "var(--accent)" }} />
              Last updated: {LAST_UPDATED}
            </span>
          </motion.div>

          {/* Intro */}
          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="show"
            className="text-[15px] leading-relaxed max-w-2xl mb-16"
            style={{ color: "var(--foreground-muted)" }}
          >
            This page is inspired by{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-opacity hover:opacity-70"
              style={{ color: "var(--foreground-muted)" }}
            >
              Derek Sivers' /now movement
            </a>
            {" "}— a snapshot of what I'm doing at this point in my life. 
            First year at UCT. Cape Town. Building slowly and deliberately.
          </motion.p>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, si) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: si * 0.06, duration: 0.55 }}
              >
                {/* Section header */}
                <div className="flex items-center gap-2.5 mb-5">
                  <section.icon size={15} style={{ color: "var(--accent)" }} />
                  <h2 className="text-[13px] uppercase tracking-widest font-semibold" style={{ color: "var(--foreground-dim)" }}>
                    {section.title}
                  </h2>
                </div>

                {/* Items */}
                <div className="space-y-3 pl-0">
                  {section.items.map((item, ii) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ii * 0.06, duration: 0.45 }}
                      className="card p-5 group"
                    >
                      <p className="text-[14px] font-medium mb-1.5 transition-colors"
                        style={{ color: "var(--foreground)" }}>
                        {item.label}
                      </p>
                      <p className="text-[13px] leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                        {item.detail}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 pt-8"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <p className="text-[13px] leading-relaxed max-w-md" style={{ color: "var(--foreground-dim)" }}>
              This page is updated when something meaningful changes,{" "}
              not on a schedule. If you're curious about where I was before now,
              check the{" "}
              <a href="/about" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
                About
              </a>{" "}
              page.
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
