"use client";

import PageTransition from "@/components/PageTransition";

import { motion } from "framer-motion";
import {
  Code2,
  BarChart2,
  Database,
  FlaskConical,
  Globe,
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
    category: "Programming",
    desc: "Languages used across research pipelines, data products, and this site.",
    skills: [
      {
        name: "Python",
        evidence:
          "Feature engineering, Random Forests, CORAL adaptation, and evaluation scripts for Cross-City Building Age Classification; AfriGuard and Digital Minds pipelines.",
      },
      {
        name: "TypeScript / JavaScript",
        evidence: "This website and SA Data Hub, both typed React/Next.js applications in production.",
      },
    ],
  },
  {
    icon: BarChart2,
    category: "Machine Learning & Statistics",
    desc: "Supervised learning, evaluation design, and transfer under distribution shift.",
    skills: [
      {
        name: "Supervised classification",
        evidence:
          "Four-class building-age prediction from Landsat features; stylometric author identification baselines in Digital Minds.",
      },
      {
        name: "Random Forests & scikit-learn",
        evidence:
          "Class-balanced RF (500 trees) as Stage-1 Madrid model; local few-shot forests in the Hack4Dev transfer pipeline.",
      },
      {
        name: "Feature engineering",
        evidence:
          "~108 per-pixel features from multi-period spectral statistics, indices, change timing, and neighbourhood averages.",
      },
      {
        name: "Domain adaptation (CORAL)",
        evidence:
          "Pooled and class-conditional CORAL for Madrid→Amsterdam zero-shot transfer (0.36 → 0.65 macro-F1).",
      },
      {
        name: "Model evaluation & cross-validation",
        evidence:
          "Madrid 5×5 CV, macro-F1 transfer curves, McNemar tests, and capability-controlled 2×2 designs across 9,269 LLM trials.",
      },
      {
        name: "Spatial analysis",
        evidence:
          "Neighbourhood features, inverse-distance smoothing, and a spatial-adjacency audit of few-shot support/query leakage.",
      },
    ],
  },
  {
    icon: Database,
    category: "Data Engineering & Databases",
    desc: "Getting data in, cleaned, validated, and into reproducible pipelines.",
    skills: [
      {
        name: "ETL & automated processing",
        evidence:
          "AfriGuard end-to-end evaluation pipeline (1,120 responses); SA Data Hub automated update scripts; Landsat parquet loading and feature builds.",
      },
      {
        name: "Pandas & NumPy",
        evidence:
          "Core stack for AfriGuard analytics, Digital Minds scoring logs, and the building-age feature matrix.",
      },
      {
        name: "Public-data ingestion",
        evidence:
          "SA Data Hub ingests and documents Stats SA, SARB, and other official South African sources with methodology pages.",
      },
      {
        name: "Data validation & reproducibility",
        evidence:
          "Fixed seeds, logged API calls with prompt hashes, and deliverable tables/figures regenerated from notebooks.",
      },
    ],
  },
  {
    icon: FlaskConical,
    category: "Research & AI Evaluation",
    desc: "Experiment design, baselines, and honest diagnostics. Not just leaderboard numbers.",
    skills: [
      {
        name: "Multilingual AI safety evaluation",
        evidence:
          "AfriGuard: 7 languages, 4 frontier models, ASR analysis showing guardrail collapse outside English.",
      },
      {
        name: "LLM introspection research",
        evidence:
          "Digital Minds: capability-controlled self-prediction probes versus cheap surface baselines.",
      },
      {
        name: "Experiment design & baselines",
        evidence:
          "Crossed 2×2 designs, length-only and stylometric comparators, and organiser-notebook baselines for transfer.",
      },
      {
        name: "Bias & leakage diagnostics",
        evidence:
          "Surface-leakage gate, response-bias checks, and spatial-adjacency audits of few-shot evaluation.",
      },
    ],
  },
  {
    icon: Globe,
    category: "Web Development",
    desc: "Shipping interfaces for research results and public data.",
    skills: [
      {
        name: "Next.js & React",
        evidence: "Personal site (ubayd.me) and SA Data Hub (sadatahub.tech).",
      },
      {
        name: "Tailwind CSS",
        evidence: "Responsive UI systems across both sites, including dark/light themes.",
      },
      {
        name: "Recharts",
        evidence: "Interactive visualisations on SA Data Hub dashboards and explorers.",
      },
      {
        name: "Streamlit",
        evidence: "AfriGuard live analytics dashboard for language and harm-category exploration.",
      },
      {
        name: "Vercel",
        evidence: "Hosting and deployment for this website and SA Data Hub.",
      },
    ],
  },
  {
    icon: Terminal,
    category: "Tools",
    desc: "Day-to-day development and collaboration tooling.",
    skills: [
      {
        name: "Git & GitHub",
        evidence: "Version control across AfriGuard, Hack4Dev, Digital Minds, and personal projects.",
      },
      {
        name: "Command line",
        evidence: "Running transfer notebooks, evaluation scripts, and local build/deploy workflows.",
      },
      {
        name: "VS Code",
        evidence: "Primary development environment for Python and TypeScript work.",
      },
      {
        name: "APIs",
        evidence:
          "OpenRouter and frontier-model APIs for Digital Minds and AfriGuard evaluation collection.",
      },
    ],
  },
  {
    icon: Sparkles,
    category: "Currently Learning",
    desc: "Skills I am actively developing. Not yet core evidence on shipped work.",
    skills: [
      {
        name: "SQL & PostgreSQL",
        evidence:
          "Learning relational querying and database design for a future SA Data Hub backend.",
      },
      {
        name: "Algorithms & data structures",
        evidence: "Strengthening foundations through UCT Computer Science coursework.",
      },
    ],
  },
];

const approach = [
  {
    icon: Brain,
    label: "Analytical Thinking",
    desc: "I break problems into testable pieces and check whether the evaluation itself is cheating before celebrating a number.",
  },
  {
    icon: Puzzle,
    label: "Project-Based Learning",
    desc: "Coursework becomes concrete when it shows up in a pipeline, benchmark, or public product.",
  },
  {
    icon: Users,
    label: "Leadership",
    desc: "Former Head Boy and volunteer mathematics tutor. Comfortable coordinating people as well as code.",
  },
  {
    icon: MessageSquare,
    label: "Communication",
    desc: "Writing, tutoring, and research slides aimed at making methods and limitations understandable.",
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
            and what I&apos;m learning.
          </h1>
          <p className="text-[15px] text-secondary leading-relaxed max-w-xl">
            Skills for Ubayd Hattas, tied to shipped work: Cross-City Building Age Classification,
            Digital Minds, AfriGuard, SA Data Hub, and this site. No inflated expertise claims.
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
            I&apos;m building right now is a deep understanding of mathematical and
            statistical foundations. Everything else builds on top of that.
          </p>
        </motion.div>
      </div>
    </div>
    </PageTransition>
  );
}
