"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github, ExternalLink, Lock, Wrench, Star, ArrowUpRight, ChevronRight,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { projects, type Project } from "./projects";

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Status config ────────────────────────────────────────────────────────────

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  active:   { label: "Active",   color: "text-green-400", bg: "bg-green-500/10 border-green-500/20"      },
  building: { label: "Building", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20"      },
  planned:  { label: "Planned",  color: "text-dim",       bg: "bg-[var(--surface)] border-[var(--border)]" },
};

// ─── FeaturedProject — links to dedicated page ────────────────────────────────

function FeaturedProject({ project }: { project: Project }) {
  const s = statusConfig[project.status];
  const isRoutable = Boolean(project.expandable && !project.private);

  return (
    <div className="project-card-featured mb-6 group/featured relative">
      {isRoutable && (
        <Link
          href={`/projects/${project.slug}`}
          className="absolute inset-0 z-10 rounded-[inherit]"
          aria-label={`View ${project.title} project details`}
        />
      )}
      {/* Visual header with banner image or dot pattern */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: project.accentColor ?? "var(--surface)" }}
      >
        {project.bannerImage ? (
          <Image
            src={project.bannerImage}
            alt={`${project.title} banner`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="relative text-6xl select-none">{project.icon}</div>
          </>
        )}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-[11px] text-indigo-300 font-medium z-10">
          <Star size={10} fill="currentColor" />
          Featured project
        </div>
        <div className="absolute top-4 right-4 z-10">
          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${s.bg} ${s.color}`}>{s.label}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <h3 className="text-[18px] font-semibold mb-2" style={{ color: "var(--foreground)" }}>
          {project.title}
        </h3>
        <p className="text-[14px] leading-relaxed mb-2" style={{ color: "var(--foreground-muted)" }}>
          {project.description}
        </p>
        {project.longDesc && (
          <p className="text-[13px] leading-relaxed mb-4" style={{ color: "var(--foreground-dim)" }}>
            {project.longDesc}
          </p>
        )}

        {project.metrics && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.metrics.slice(0, 4).map((m) => (
              <span key={m.label} className="text-[11px] px-2.5 py-1 rounded-full"
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "rgb(16,185,129)" }}>
                {m.value}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full"
              style={{ background: "var(--surface-hover)", border: "1px solid var(--border)", color: "var(--foreground-muted)" }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="relative z-20 flex items-center justify-between gap-4 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex items-center gap-4">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] font-medium transition-colors btn-secondary py-2 px-4">
                <Github size={14} /> View on GitHub
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-[13px]" style={{ color: "var(--foreground-dim)" }}>
                <Lock size={13} /> Not yet public
              </span>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] font-medium btn-primary py-2 px-4">
                Live demo <ArrowUpRight size={13} />
              </a>
            )}
          </div>
          {isRoutable && (
            <span className="text-[12px] flex items-center gap-1 transition-colors group-hover/featured:text-indigo-400"
              style={{ color: "var(--foreground-dim)" }}>
              View details <ChevronRight size={12} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SA Data Hub / expandable non-featured card — links to dedicated page ─────

function ExpandableCard({ project, index }: { project: Project; index: number }) {
  const s = statusConfig[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="project-card flex flex-col cursor-pointer group/expcard block h-full"
        style={{ border: "1px solid rgba(16,185,129,0.25)" }}
        aria-label={`Open ${project.title} project page`}
      >
        {/* Header */}
        <div
          className="h-36 flex items-center justify-center relative overflow-hidden"
          style={{ background: project.accentColor ?? "var(--surface)" }}
        >
          {project.bannerImage ? (
            <Image
              src={project.bannerImage}
              alt={`${project.title} banner`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.12) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <span className="relative text-5xl select-none">{project.icon}</span>
            </>
          )}

          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/25 text-[10px] text-emerald-400 font-medium z-10">
            <Star size={9} fill="currentColor" /> Featured
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-[14px] font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
              {project.title}
            </h3>
            <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full border ${s.bg} ${s.color}`}>
              {s.label}
            </span>
          </div>

          <p className="text-[13px] leading-relaxed flex-1 mb-3" style={{ color: "var(--foreground-muted)" }}>
            {project.description}
          </p>

          {project.metrics && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.metrics.slice(0, 2).map((m) => (
                <span key={m.label} className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "rgb(16,185,129)" }}>
                  {m.value}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full"
                style={{ background: "var(--surface-hover)", border: "1px solid var(--border)", color: "var(--foreground-dim)" }}>
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-[11px] px-2 py-0.5 rounded-full"
                style={{ background: "var(--surface-hover)", border: "1px solid var(--border)", color: "var(--foreground-dim)" }}>
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex items-center gap-3">
              {project.github && (
                <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "var(--foreground-dim)" }}>
                  <Github size={13} /> GitHub
                </span>
              )}
              {project.live && (
                <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "var(--accent)" }}>
                  <ExternalLink size={13} /> Live
                </span>
              )}
            </div>
            <span className="text-[11px] flex items-center gap-1 transition-colors group-hover/expcard:text-indigo-400"
              style={{ color: "var(--foreground-dim)" }}>
              View details <ChevronRight size={11} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Standard ProjectCard (non-expandable) ────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  if (project.expandable && !project.private) {
    return <ExpandableCard project={project} index={index} />;
  }

  const s = statusConfig[project.status];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55 }}
      className="project-card flex flex-col"
    >
      {/* Mini visual header */}
      <div className="h-28 flex items-center justify-center relative overflow-hidden" style={{ background: "var(--surface)" }}>
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.08) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />
        <span className="relative text-4xl select-none">{project.icon}</span>
        {project.private && (
          <div className="absolute top-3 right-3">
            <Lock size={12} style={{ color: "var(--foreground-dim)" }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-[14px] font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
            {project.title}
          </h3>
          <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full border ${s.bg} ${s.color}`}>
            {s.label}
          </span>
        </div>

        <p className="text-[13px] leading-relaxed flex-1 mb-4" style={{ color: "var(--foreground-muted)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full"
              style={{ background: "var(--surface-hover)", border: "1px solid var(--border)", color: "var(--foreground-dim)" }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
          {project.github ? (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] transition-colors"
              style={{ color: "var(--foreground-dim)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--foreground)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground-dim)"; }}>
              <Github size={13} /> GitHub
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "var(--foreground-dim)", opacity: 0.5 }}>
              <Github size={13} /> Not yet public
            </span>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px]" style={{ color: "var(--accent)" }}>
              <ExternalLink size={13} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsClient() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <PageTransition>
      <div className="page-content pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="mb-14">
            <span className="tag mb-4 inline-block">Projects</span>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight gradient-text mb-4">
              Things I'm building
              <br />and thinking about.
            </h1>
            <p className="text-[15px] leading-relaxed max-w-xl" style={{ color: "var(--foreground-muted)" }}>
              Early-stage work. I'm a first-year student, not a seasoned engineer.
              But I believe in showing your work, even when it's unfinished.
            </p>
          </motion.div>

          {/* Notice */}
          <motion.div
            custom={1} variants={fadeUp} initial="hidden" animate="show"
            className="mb-10 p-4 rounded-xl flex items-start gap-3"
            style={{ border: "1px solid rgba(99,102,241,0.2)", background: "rgba(99,102,241,0.05)" }}
          >
            <Wrench size={15} className="text-indigo-400 mt-0.5 shrink-0" />
            <p className="text-[13px] leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
              This section will grow over the coming months. I'm actively building.
              Watch my{" "}
              <a href="https://github.com/ubayd-hattas" target="_blank" rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors">
                GitHub
              </a>{" "}
              for the latest.
            </p>
          </motion.div>

          {/* Featured */}
          {featured.map((p) => (
            <motion.div key={p.slug} custom={2} variants={fadeUp} initial="hidden" animate="show">
              <FeaturedProject project={p} />
            </motion.div>
          ))}

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {rest.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="card p-7 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div>
              <p className="text-[15px] font-medium" style={{ color: "var(--foreground)" }}>
                See everything on GitHub
              </p>
              <p className="text-[13px] mt-0.5" style={{ color: "var(--foreground-dim)" }}>
                Experiments, coursework, and works-in-progress.
              </p>
            </div>
            <a href="https://github.com/ubayd-hattas" target="_blank" rel="noopener noreferrer"
              className="btn-secondary shrink-0">
              <Github size={14} />
              github.com/ubayd-hattas
            </a>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
