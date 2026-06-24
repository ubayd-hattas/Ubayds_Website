"use client";

import PageTransition from "@/components/PageTransition";

import { motion } from "framer-motion";
import {
  Code2,
  Layers,
  BarChart2,
  Terminal,
  Sparkles,
  Brain,
  Puzzle,
  Users,
  MessageSquare,
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
  evidence: string;
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
    category: "Languages",
    desc: "The languages I use for coursework, projects and data work.",
    skills: [
      { name: "Python", evidence: "Used for scripting, automation and data-related projects." },
      { name: "TypeScript / JavaScript", evidence: "The foundation of both this website and SA Data Hub." },
      { name: "SQL", evidence: "Currently learning database design, querying and data management as I work towards moving SA Data Hub to a PostgreSQL backend." },
    ],
  },
  {
    icon: Layers,
    category: "Frameworks & Libraries",
    desc: "The tools I use to build and ship projects.",
    skills: [
      { name: "Next.js", evidence: "Used to build and deploy both my personal website and SA Data Hub." },
      { name: "React", evidence: "Component-based development across my projects." },
      { name: "Tailwind CSS", evidence: "Used to design and maintain responsive user interfaces." },
      { name: "Framer Motion", evidence: "Drives the animations and page transitions on this site." },
      { name: "Streamlit", evidence: "Built an interactive dashboard for the AfriGuard AI safety benchmark to explore model evaluation results across languages and harm categories." },
    ],
  },
  {
    icon: BarChart2,
    category: "Data & Analytics",
    desc: "The area where most of my academic and project interests overlap.",
    skills: [
      { name: "Data Cleaning", evidence: "Collecting, preparing and organising public datasets for analysis and visualisation." },
      { name: "Data Visualisation", evidence: "Building charts, dashboards and interactive tools that make data easier to understand." },
      { name: "Public Data Research", evidence: "Working with South African datasets from sources such as Stats SA and other public institutions." },
      { name: "Statistical Thinking", evidence: "Using data to identify patterns, evaluate information and make informed decisions." },
      { name: "Pandas", evidence: "Used for data processing, transformation and analysis across the AfriGuard evaluation pipeline and other data projects." },
      { name: "Evaluation Pipelines", evidence: "Built an automated pipeline to collect, judge and process over 1,100 model responses for the AfriGuard AI safety benchmark." },
      { name: "Automated Data Processing", evidence: "Writing scripts to classify model behaviour, compute safety metrics and generate reproducible analytics without manual intervention." },
      { name: "Research Methodology", evidence: "Designed and executed a multilingual AI safety benchmark — from prompt design and translation through to evaluation and analysis." },
    ],
  },
  {
    icon: Terminal,
    category: "Tools",
    desc: "The tools I work with every day.",
    skills: [
      { name: "Git & GitHub", evidence: "Version control and project management." },
      { name: "VS Code", evidence: "Primary development environment." },
      { name: "Command line", evidence: "Managing projects, workflows and development tasks." },
      { name: "Vercel", evidence: "Hosting and deployment for my web projects. "},
      { name: "APIs", evidence: "Integrated and worked with multiple frontier model APIs to collect and evaluate responses for the AfriGuard benchmark." },
    ],
  },
  {
    icon: Sparkles,
    category: "Currently Learning",
    desc: "Areas I am actively developing.",
    skills: [
      { name: "PostgreSQL", evidence: "Building stronger database skills for future versions of SA Data Hub." },
      { name: "Database Design", evidence: "Learning how to structure and manage larger datasets efficiently." },
      { name: "Data Engineering Fundamentals", evidence: "Exploring better ways to collect, process and maintain public data." },
      { name: "Algorithms & Data Structures", evidence: "Building stronger problem-solving and programming foundations through coursework." },
    ],
  },
];

const approach = [
  {
    icon: Brain,
    label: "Analytical Thinking",
    desc: "I enjoy breaking problems down into smaller parts and understanding how they connect before building solutions.",
  },
  {
    icon: Puzzle,
    label: "Project-Based Learning",
    desc: "I learn best by building. Most of what I learn in class eventually finds its way into a project.",
  },
  {
    icon: Users,
    label: "Leadership",
    desc: "Former Head Boy and volunteer mathematics tutor, experiences that strengthened my ability to work with and support others.",
  },
  {
    icon: MessageSquare,
    label: "Communication",
    desc: "Whether through tutoring, writing blog posts or presenting ideas, I enjoy making complex topics easier to understand.",
  },
];

function SkillRow({ skill, index }: { skill: SkillItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <p className="text-[13px] text-primary font-medium mb-0.5">{skill.name}</p>
      <p className="text-[12px] text-dim leading-relaxed">{skill.evidence}</p>
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
          className="mb-14"
        >
          <span className="tag mb-4 inline-block">Skills</span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight gradient-text mb-4">
            What I can do,
            <br />
            and what I'm learning.
          </h1>
          <p className="text-[15px] text-secondary leading-relaxed max-w-xl">
            Everything below is tied to something real — coursework, modules
            currently in progress, or things I've actually built and shipped,
            like this site and SA Data Hub.
          </p>
        </motion.div>

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
              <div className="space-y-4">
                {group.skills.map((skill, j) => (
                  <SkillRow key={skill.name} skill={skill} index={j} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Approach & working style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-lg font-semibold text-primary mb-6">
            Approach & working style
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {approach.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="card p-6"
              >
                <a.icon size={18} className="text-indigo-400 mb-3" aria-hidden="true" />
                <h3 className="text-[14px] font-semibold text-primary mb-2">
                  {a.label}
                </h3>
                <p className="text-[13px] text-dim leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
            statistical foundations — everything else builds on top of that.
          </p>
        </motion.div>
      </div>
    </div>
    </PageTransition>
  );
}
