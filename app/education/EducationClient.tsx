"use client";

import PageTransition from "@/components/PageTransition";

import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  FlaskConical,
  Calculator,
  Cpu,
  TrendingUp,
  ChevronRight,
  Compass,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const modules = [
  {
    icon: Calculator,
    code: "MAM1031F & MAM1032S",
    name: "Mathematics",
    desc: "Right now this means calculus and linear algebra — the language used to describe almost everything I'll build later, from statistical models to machine learning.",
  },
  {
    icon: TrendingUp,
    code: "STA1006S",
    name: "Mathematical Statistics",
    desc: "Working through probability theory and the early foundations of statistical inference — the theory behind every chart and conclusion I put on SA Data Hub.",
  },
  {
    icon: Cpu,
    code: "CSC1015F & CSC1016S",
    name: "Computer Science",
    desc: "Building up algorithms and data structures in Python — writing code that's correct and efficient, which feeds directly into how I build and ship projects like SA Data Hub.",
  },
  {
    icon: FlaskConical,
    code: "PHY1023H",
    name: "Physics",
    desc: "Mechanics and the properties of matter — outside my major, but it sharpens the same muscle: modelling a real system with the right assumptions and the right maths.",
  },
];

const trajectory = [
  { year: "2026", label: "First Year: Mathematical, statistical & computational foundations", status: "current" },
  { year: "2027", label: "Second Year: Deepen Statistical & CS theory", status: "upcoming" },
  { year: "2028", label: "Third Year: Honours Pathway / Specialisation", status: "upcoming" },
  { year: "2029+", label: "Postgraduate research or industry", status: "future" },
];

const achievements = [
  {
    label: "Mohamed Sedick Excellence Prize",
    detail: "R2,000 award for placing first in Physics Grade 11",
    year: "2024",
  },
  {
    label: "NSC Top five",
    detail: "Top achievement award at school level, Matric 2025",
    year: "2025",
  },
  {
    label: "NSC Top Achiever for Mathematics",
    detail: "Top achievement award at school level, Matric 2025",
    year: "2025",
  },
  {
    label: "NSC Top Achiever for Physical Sciences",
    detail: "Top achievement award at school level, Matric 2025",
    year: "2025",
  },
  {
    label: "Head Boy",
    detail: "Led the student body and represented the school at official events",
    year: "2025",
  },
  {
    label: "Mathematics Tutor",
    detail: "Voluntarily tutored junior grade students during breaks throughout matric year",
    year: "2025",
  },
];

export default function EducationClient() {
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
          <span className="tag mb-4 inline-block">Education</span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight gradient-text mb-4">
            Building the
            <br />
            right foundation.
          </h1>
          <p className="text-[15px] text-secondary leading-relaxed max-w-xl">
            A degree is a structure. What matters is how deeply you engage with
            it. I'm here to understand, not just to pass.
          </p>
        </motion.div>

        {/* Current focus */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="card p-7 mb-6 border-indigo-500/30 bg-indigo-500/[0.04]"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <Compass size={18} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-primary mb-2">
                What I'm focused on right now
              </h2>
              <p className="text-[13px] text-secondary leading-relaxed">
                My current focus is building strong foundations in computer science, 
                statistics and mathematics while applying those ideas through real 
                projects. Alongside my coursework at UCT, I continue improving SA 
                Data Hub, learning more about databases and data management, and 
                exploring how public data can be turned into useful tools and insights.
              </p>
            </div>
          </div>
        </motion.div>

        {/* UCT Card */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="card p-7 mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <GraduationCap size={18} className="text-indigo-400" />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-primary">
                  University of Cape Town
                </h2>
                <p className="text-[13px] text-secondary mt-0.5">
                  BSc Computer Science, Statistics & Data Science
                </p>
                <p className="text-[12px] text-indigo-400 mt-1 font-mono">
                  2026 — Present
                </p>
              </div>
            </div>
            <span className="self-start px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[11px] text-green-400 font-medium">
              Currently enrolled
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.06]">
            <p className="text-[13px] text-secondary leading-relaxed">
              UCT is consistently ranked as Africa's top university and among
              the world's leading research institutions. My triple major in
              Computer Science, Statistics, and Data Science is a deliberately
              interdisciplinary foundation, bridging formal mathematical
              reasoning, computational methods, and applied data analysis.
            </p>
          </div>
        </motion.div>

        {/* High school Card */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="card p-7 mb-16"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
              <BookOpen size={18} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-primary">
                Trafalgar Secondary School
              </h2>
              <p className="text-[13px] text-secondary mt-0.5">
                National Senior Certificate (NSC) 
              </p>
              <p className="text-[12px] text-dim font-mono mt-1">
                Graduated 2025
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/[0.06]">
            <p className="text-[13px] text-secondary leading-relaxed">
              My high school years taught me the true value of consistency and 
              self-discipline. I built strong results in mathematics and physical 
              sciences through methodical study habits and I spent my senior year 
              both leading the student body as Head Boy and tutoring my peers. I am 
              incredibly grateful to my principal and teachers for their belief in me. 
              The guidance and opportunities they provided gave me the foundation I 
              needed to be exactly where I am today.
            </p>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-lg font-semibold text-primary mb-6">
            Achievements & recognition
          </h2>
          <div className="space-y-3">
            {achievements.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="card p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div>
                  <p className="text-[14px] font-medium text-primary">{a.label}</p>
                  <p className="text-[12px] text-dim mt-0.5">{a.detail}</p>
                </div>
                <span className="shrink-0 text-[11px] font-mono text-indigo-400">
                  {a.year}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-lg font-semibold text-primary mb-2">
            What I'm studying right now
          </h2>
          <p className="text-[13px] text-dim mb-6 max-w-2xl">
            My first-year modules, and what each one means for what I'm
            building today.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="card p-6 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <mod.icon
                    size={16}
                    className="text-indigo-400 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-[11px] font-mono text-indigo-400/70">
                    {mod.code}
                  </span>
                </div>
                <h3 className="text-[14px] font-semibold text-primary mb-1.5">
                  {mod.name}
                </h3>
                <p className="text-[13px] text-dim leading-relaxed">{mod.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trajectory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-primary mb-6">
            Where this leads
          </h2>
          <div className="space-y-3">
            {trajectory.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className={`card p-5 flex items-center justify-between ${
                  t.status === "current"
                    ? "border-indigo-500/30 bg-indigo-500/[0.04]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[12px] font-mono text-indigo-400 w-10 shrink-0">
                    {t.year}
                  </span>
                  <p
                    className={`text-[14px] ${
                      t.status === "current"
                        ? "text-primary font-medium"
                        : t.status === "future"
                        ? "text-dim"
                        : "text-secondary"
                    }`}
                  >
                    {t.label}
                  </p>
                </div>
                {t.status === "current" && (
                  <span className="text-[11px] text-green-400 font-medium shrink-0">
                    Now
                  </span>
                )}
                {t.status === "upcoming" && (
                  <ChevronRight size={14} className="text-dim shrink-0" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    </PageTransition>
  );
}
