"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Lock, Wrench } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

type ProjectStatus = "active" | "building" | "planned";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string | null;
  live: string | null;
  status: ProjectStatus;
  private?: boolean;
}

const projects: Project[] = [
  {
    title: "Statistical Inference Explorer",
    description:
      "An interactive tool for visualising core statistical concepts, confidence intervals, hypothesis testing and sampling distributions. Built to reinforce my first-year stats coursework through active exploration rather than passive reading.",
    tags: ["Python", "Statistics", "Matplotlib", "Jupyter"],
    github: "https://github.com/ubayd-hattas",
    live: null,
    status: "building",
  },
  {
    title: "South African Data Dashboard",
    description:
      "A data visualisation project built around publicly available Stats SA datasets. Inspired by my father's work, trying to make national statistics legible and interesting to a general audience.",
    tags: ["Python", "Pandas", "Data Visualisation", "Stats SA"],
    github: null,
    live: null,
    status: "planned",
  },
  {
    title: "Maths Problem Set Generator",
    description:
      "A CLI tool that generates randomised problem sets for first-year university mathematics topics. Originally built to help me study, potentially useful for other students.",
    tags: ["Python", "CLI", "LaTeX", "Algorithms"],
    github: "https://github.com/ubayd-hattas",
    live: null,
    status: "building",
  },
  {
    title: "Personal Knowledge System",
    description:
      "A structured note-taking and spaced-repetition system I've built around my university studies. Not a product, a personal tool. But the architecture is evolving.",
    tags: ["Productivity", "Systems", "Obsidian", "Anki"],
    github: null,
    live: null,
    status: "active",
    private: true,
  },
];

const statusConfig: Record<
  ProjectStatus,
  { label: string; color: string; bg: string }
> = {
  active: {
    label: "Active",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  building: {
    label: "Building",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  planned: {
    label: "Planned",
    color: "text-white/30",
    bg: "bg-white/[0.04] border-white/[0.08]",
  },
};

export default function ProjectsClient() {
  return (
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
          <span className="tag mb-4 inline-block">Projects</span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight gradient-text mb-4">
            Things I'm
            <br />
            building and thinking about.
          </h1>
          <p className="text-[15px] text-white/40 leading-relaxed max-w-xl">
            Early stage work. Most of this is exploratory. I'm a first-year
            student, not a stacked engineer. But I believe in showing your
            work even when it's unfinished.
          </p>
        </motion.div>

        {/* Notice */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-12 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.05] flex items-start gap-3"
        >
          <Wrench size={15} className="text-indigo-400 mt-0.5 shrink-0" />
          <p className="text-[13px] text-white/50 leading-relaxed">
            This section will grow significantly over the coming months and
            years. I'm actively building. Check back, or watch my{" "}
            <a
              href="https://github.com/ubayd-hattas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              GitHub
            </a>{" "}
            for the latest.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => {
            const s = statusConfig[project.status];
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="card p-6 flex flex-col"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="text-[15px] font-semibold text-white/90 leading-snug">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0">
                    {project.private && (
                      <Lock size={12} className="text-white/25" />
                    )}
                    <span
                      className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${s.bg} ${s.color}`}
                    >
                      {s.label}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13px] text-white/40 leading-relaxed flex-1 mb-5">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.07] text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/80 transition-colors"
                    >
                      <Github size={13} />
                      GitHub
                    </a>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[12px] text-white/20 cursor-not-allowed">
                      <Github size={13} />
                      Not yet public
                    </span>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[12px] text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink size={13} />
                      Live
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 card p-7 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-[15px] font-medium text-white/80">
              See everything on GitHub
            </p>
            <p className="text-[13px] text-white/35 mt-0.5">
              Experiments, coursework, and works-in-progress.
            </p>
          </div>
          <a
            href="https://github.com/ubayd-hattas"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary shrink-0"
          >
            <Github size={14} />
            github.com/ubayd-hattas
          </a>
        </motion.div>
      </div>
    </div>
  );
}
