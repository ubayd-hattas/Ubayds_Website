"use client";

import PageTransition from "@/components/PageTransition";

import { motion } from "framer-motion";
import {
  Code2,
  BarChart2,
  Brain,
  Users,
  MessageSquare,
  Puzzle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

interface SkillItem {
  name: string;
  level: number;
  note: string;
}

interface SkillGroup {
  icon: React.ElementType;
  category: string;
  desc: string;
  skills: SkillItem[];
}

const skillGroups: SkillGroup[] = [
  {
    icon: Code2,
    category: "Programming",
    desc: "Languages and tools I use to build and explore.",
    skills: [
      { name: "Python", level: 70, note: "Primary language — data work, scripting, algorithms" },
      { name: "R", level: 20, note: "Statistical computing, introduced at UCT" },
      { name: "SQL", level: 10, note: "Basic querying and data manipulation" },
      { name: "JavaScript / TypeScript", level: 50, note: "Web development, this site" },
      { name: "LaTeX", level: 55, note: "Mathematical typesetting for academic work" },
      { name: "Bash / CLI", level: 40, note: "Terminal navigation, scripting basics" },
    ],
  },
  {
    icon: BarChart2,
    category: "Statistics & Data",
    desc: "The core of what I'm studying and building towards.",
    skills: [
      { name: "Descriptive Statistics", level: 20, note: "Distributions, central tendency, spread" },
      { name: "Probability Theory", level: 30, note: "Conditional probability, Bayes, random variables" },
      { name: "Data Wrangling", level: 30, note: "Pandas, cleaning, reshaping datasets" },
      { name: "Data Visualisation", level: 30, note: "Matplotlib, clear and honest charts" },
      { name: "Statistical Inference", level: 30, note: "Hypothesis testing, CIs in progress at UCT" },
    ],
  },
  {
    icon: Brain,
    category: "Analytical Thinking",
    desc: "How I approach problems before writing a single line of code.",
    skills: [
      { name: "Mathematical reasoning", level: 80, note: "Proof, abstraction, formal logic" },
      { name: "Problem decomposition", level: 75, note: "Breaking complex problems into tractable parts" },
      { name: "First-principles thinking", level: 70, note: "Not accepting assumptions without testing them" },
      { name: "Research & synthesis", level: 65, note: "Reading papers, extracting signal, summarising" },
    ],
  },
  {
    icon: Users,
    category: "Leadership",
    desc: "Developed through serving as Head Boy and peer tutor.",
    skills: [
      { name: "Team representation", level: 75, note: "Official events, school-wide responsibilities" },
      { name: "Peer mentoring", level: 80, note: "Maths tutoring for junior students — matric year" },
      { name: "Responsibility under pressure", level: 70, note: "Managing academic and leadership duties simultaneously" },
    ],
  },
  {
    icon: MessageSquare,
    category: "Communication",
    desc: "Clear thinking expressed clearly.",
    skills: [
      { name: "Technical writing", level: 65, note: "Lab reports, structured explanations" },
      { name: "Teaching & explanation", level: 75, note: "Making complex ideas accessible to others" },
      { name: "Presentation", level: 65, note: "School events, student address, formal speaking" },
    ],
  },
  {
    icon: Puzzle,
    category: "Problem Solving",
    desc: "The skill that underlies everything else.",
    skills: [
      { name: "Algorithmic thinking", level: 70, note: "Computational approaches, efficiency" },
      { name: "Debugging & iteration", level: 65, note: "Patient, systematic troubleshooting" },
      { name: "Pattern recognition", level: 90, note: "Identifying structure in data and problems" },
    ],
  },
];

function SkillBar({ skill, index }: { skill: SkillItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] text-primary font-medium">{skill.name}</span>
        <span className="text-[11px] text-dim font-mono">{skill.level}%</span>
      </div>
      <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden mb-1">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06 + 0.2, duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
        />
      </div>
      <p className="text-[11px] text-dim leading-relaxed">{skill.note}</p>
    </motion.div>
  );
}

export default function SkillsClient() {
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
          className="mb-6"
        >
          <span className="tag mb-4 inline-block">Skills</span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight gradient-text mb-4">
            What I can do,
            <br />
            and what I'm learning.
          </h1>
          <p className="text-[15px] text-secondary leading-relaxed max-w-xl">
            These are honest self-assessments not marketing. I'm a first-year
            student. The bars reflect current ability not potential.
          </p>
        </motion.div>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-[12px] text-dim mb-14 italic"
        >
          Percentages are approximate and self-assessed. They will grow.
        </motion.p>

        {/* Skill groups */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="card p-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <group.icon size={16} className="text-indigo-400" />
                <h2 className="text-[14px] font-semibold text-primary">
                  {group.category}
                </h2>
              </div>
              <p className="text-[12px] text-dim mb-6 leading-relaxed">
                {group.desc}
              </p>
              <div className="space-y-5">
                {group.skills.map((skill, j) => (
                  <SkillBar key={skill.name} skill={skill} index={j} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 card p-7 text-center"
        >
          <p className="text-[14px] text-secondary leading-relaxed max-w-lg mx-auto">
            Skills are a lagging indicator of effort. The most important thing
            I'm building right now is a deep understanding of mathematical and
            statistical foundations, everything else builds on top of that.
          </p>
        </motion.div>
      </div>
    </div>
    </PageTransition>
  );
}
