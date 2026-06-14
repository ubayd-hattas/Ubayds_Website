"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, ExternalLink, Lock, Wrench, Star, ArrowUpRight,
  X, ChevronLeft, ChevronRight, Maximize2, ZoomIn,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";

// ─── Animation variants (unchanged) ────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Types ──────────────────────────────────────────────────────────────────────

type ProjectStatus = "active" | "building" | "planned";

interface ProjectMetric {
  label: string;
  value: string;
}

interface ProjectScreenshot {
  src: string;          // URL or placeholder path
  alt: string;
  label?: string;       // e.g. "Homepage", "Dashboard"
}

interface Project {
  title: string;
  description: string;
  longDesc?: string;
  tags: string[];
  github: string | null;
  live: string | null;
  status: ProjectStatus;
  private?: boolean;
  featured?: boolean;
  accentColor?: string;
  icon?: string;
  // Extended fields (optional — fully backwards-compatible)
  fullDesc?: string;           // rich detail for expanded view
  screenshots?: ProjectScreenshot[];
  metrics?: ProjectMetric[];
  features?: string[];
  goals?: string;
  expandable?: boolean;        // opt-in to expanded modal
}

// ─── Project data ────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    title: "SA Data Hub",
    description:
      "A public platform making South African data accessible to students, journalists, and citizens. Explore population, employment, and economic data from Statistics South Africa, SARB, and other public institutions — with interactive visualisations, province comparisons, and transparent methodologies.",
    longDesc:
      "SA Data Hub combines official datasets from Statistics South Africa, the SARB, and other public institutions with interactive charts, province comparisons, historical timelines, and educational insights. The goal is not only to display data, but to help users understand what the data means.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Python", "Vercel"],
    github: "https://github.com/ubayd-hattas",
    live: "https://sadatahub.tech",
    status: "active",
    featured: true,
    accentColor: "rgba(16, 185, 129, 0.10)",
    icon: "🗺️",
    expandable: true,
    fullDesc:
      "SA Data Hub is a public data platform designed to make South African statistics easier to understand and explore. It pulls from Statistics South Africa, the South African Reserve Bank, SAPS, and other official bodies — presenting figures not as raw tables, but as narratives with context.\n\nThe platform is built with a strong emphasis on transparency: every dataset links to its primary source, shows its update frequency, and includes a methodology page explaining how data is collected and interpreted. The Insights Hub presents long-form data stories explaining the human significance behind the numbers.",
    goals:
      "Make South African public data genuinely accessible to students, journalists, researchers, and curious citizens — with no barrier to entry and no technical knowledge required.",
    features: [
      "Interactive Dashboard with cross-dataset filtering",
      "Province Explorer with side-by-side comparisons",
      "Data Insights Hub — long-form narratives",
      "Historical Timelines with major SA events",
      "Dataset Explanations: what changed, why it matters",
      "Methodology & Transparency pages",
      "Full-text search across all datasets",
      "Automated data update scripts",
      "Dark / Light / System themes",
      "Fully responsive design",
    ],
    metrics: [
      { label: "Status",   value: "Active Development" },
      { label: "Type",     value: "Public Data Platform" },
      { label: "Focus",    value: "South African Public Data" },
      { label: "Built With", value: "Next.js + TypeScript" },
    ],
    screenshots: [
      { src: "/screenshots/home.png",       alt: "SA Data Hub homepage",      label: "Homepage" },
      { src: "/screenshots/dashboard.png",  alt: "Interactive dashboard",      label: "Dashboard" },
      { src: "/screenshots/provinces.png",  alt: "Province Explorer",          label: "Province Explorer" },
      { src: "/screenshots/insights.png",   alt: "Insights Hub",               label: "Insights Hub" },
      { src: "/screenshots/methodology.png",alt: "Methodology page",           label: "Methodology" },
    ],
  },
  {
    title: "Statistical Inference Explorer",
    description:
      "An interactive tool for visualising core statistical concepts — confidence intervals, hypothesis testing, and sampling distributions.",
    longDesc:
      "Built to reinforce first-year stats coursework through active exploration rather than passive reading. Input your own data, adjust parameters, and watch distributions respond in real time.",
    tags: ["Python", "Statistics", "Matplotlib", "Jupyter"],
    github: "https://github.com/ubayd-hattas",
    live: null,
    status: "building",
    featured: false,
    accentColor: "rgba(99, 102, 241, 0.12)",
    icon: "📊",
  },
  {
    title: "Maths Problem Set Generator",
    description:
      "A CLI tool that generates randomised problem sets for first-year university mathematics topics. Originally built for personal study.",
    tags: ["Python", "CLI", "LaTeX", "Algorithms"],
    github: "https://github.com/ubayd-hattas",
    live: null,
    status: "building",
    icon: "🧮",
  },
  {
    title: "Personal Knowledge System",
    description:
      "A structured note-taking and spaced-repetition system built around university studies. Architecture is intentional and evolving.",
    tags: ["Productivity", "Systems", "Obsidian", "Anki"],
    github: null,
    live: null,
    status: "planned",
    private: true,
    icon: "🧠",
  },
];

// ─── Status config (unchanged) ───────────────────────────────────────────────────

const statusConfig: Record<ProjectStatus, { label: string; color: string; bg: string }> = {
  active:   { label: "Active",    color: "text-green-400", bg: "bg-green-500/10 border-green-500/20"     },
  building: { label: "Building",  color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20"     },
  planned:  { label: "Planned",   color: "text-dim",  bg: "bg-[var(--surface)] border-[var(--border)]"     },
};

// ─── Screenshot Gallery ──────────────────────────────────────────────────────────

function ScreenshotGallery({ screenshots }: { screenshots: ProjectScreenshot[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(() => setActive((i) => (i - 1 + screenshots.length) % screenshots.length), [screenshots.length]);
  const next = useCallback(() => setActive((i) => (i + 1) % screenshots.length), [screenshots.length]);

  // Keyboard navigation when lightbox is open
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  const current = screenshots[active];

  return (
    <>
      {/* Main gallery */}
      <div className="relative">
        {/* Primary image */}
        <div
          className="relative overflow-hidden rounded-xl"
          style={{ border: "1px solid var(--border)" }}
        >
          <div
            className="relative h-52 cursor-zoom-in group"
            style={{ background: "var(--surface)" }}
            onClick={() => setLightbox(true)}
            role="button"
            aria-label={`View screenshot: ${current.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.alt}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <span className="absolute bottom-3 left-3 text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.9)" }}>
              {current.label ?? current.alt}
            </span>
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="p-1.5 rounded-lg" style={{ background: "var(--surface-hover)", border: "1px solid var(--border)" }}>
                <ZoomIn size={12} style={{ color: "var(--foreground-dim)" }} />
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          {screenshots.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all opacity-70 hover:opacity-100"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={14} style={{ color: "var(--foreground-muted)" }} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all opacity-70 hover:opacity-100"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                aria-label="Next screenshot"
              >
                <ChevronRight size={14} style={{ color: "var(--foreground-muted)" }} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {screenshots.length > 1 && (
          <div className="flex gap-2 mt-2.5 overflow-x-auto pb-1">
            {screenshots.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="shrink-0 h-12 w-20 rounded-lg overflow-hidden transition-all relative"
                style={{
                  border: i === active
                    ? "1.5px solid rgba(99,102,241,0.7)"
                    : "1.5px solid var(--border)",
                  background: "var(--surface)",
                }}
                aria-label={s.label ?? s.alt}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                {i === active && (
                  <div className="absolute inset-0 rounded-lg ring-2 ring-indigo-500/70 ring-inset" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox frame */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <div className="relative h-72 md:h-96 bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current.src}
                    alt={current.alt}
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute bottom-0 inset-x-0 flex items-center justify-between gap-3 px-4 py-3"
                    style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.75))" }}>
                    <span className="text-[13px] font-medium text-white/90">
                      {current.label ?? current.alt}
                    </span>
                    <span className="text-[11px] text-white/60">
                      {active + 1} / {screenshots.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lightbox controls */}
              <div className="absolute -top-4 -right-4 flex gap-2">
                <button
                  onClick={() => setLightbox(false)}
                  className="p-2 rounded-full"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  aria-label="Close"
                >
                  <X size={14} style={{ color: "var(--foreground-muted)" }} />
                </button>
              </div>
              {screenshots.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                    aria-label="Previous"
                  >
                    <ChevronLeft size={16} style={{ color: "var(--foreground-muted)" }} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                    aria-label="Next"
                  >
                    <ChevronRight size={16} style={{ color: "var(--foreground-muted)" }} />
                  </button>
                </>
              )}
              {/* Dot indicators */}
              <div className="flex justify-center gap-1.5 mt-3">
                {screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="rounded-full transition-all"
                    style={{
                      width: i === active ? 16 : 6,
                      height: 6,
                      background: i === active ? "rgba(99,102,241,0.8)" : "var(--border)",
                    }}
                    aria-label={`Go to screenshot ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Expanded project modal ────────────────────────────────────────────────────

function ExpandedProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const s = statusConfig[project.status];

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-6"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
          style={{
            background: "var(--background)",
            border: "1px solid var(--border)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            aria-label="Close"
          >
            <X size={15} style={{ color: "var(--foreground-muted)" }} />
          </button>

          {/* Header band — matches featured card style */}
          <div
            className="relative h-48 flex items-center justify-center overflow-hidden"
            style={{ background: project.accentColor ?? "var(--surface)" }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative text-6xl select-none">{project.icon}</div>
            <div className="absolute top-4 left-4">
              <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${s.bg} ${s.color}`}>
                {s.label}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 pb-8">
            {/* Title + links */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <h2 className="text-[20px] font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
                {project.title}
              </h2>
              <div className="flex items-center gap-2 shrink-0">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[12px] font-medium transition-colors btn-secondary py-1.5 px-3"
                  >
                    <Github size={13} /> GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[12px] font-medium btn-primary py-1.5 px-3"
                  >
                    Live demo <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* Short description */}
            <p className="text-[14px] leading-relaxed mb-5" style={{ color: "var(--foreground-muted)" }}>
              {project.description}
            </p>

            {/* Full description */}
            {project.fullDesc && (
              <div className="mb-6">
                {project.fullDesc.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[13px] leading-relaxed mb-3 last:mb-0" style={{ color: "var(--foreground-dim)" }}>
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Screenshots */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="mb-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--foreground-dim)" }}>
                  Screenshots
                </p>
                <ScreenshotGallery screenshots={project.screenshots} />
              </div>
            )}

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="mb-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--foreground-dim)" }}>
                  Project details
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-3 rounded-xl"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                    >
                      <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--foreground-dim)" }}>
                        {m.label}
                      </p>
                      <p className="text-[12px] font-medium" style={{ color: "var(--foreground)" }}>
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="mb-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--foreground-dim)" }}>
                  Key features
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px]" style={{ color: "var(--foreground-muted)" }}>
                      <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full" style={{ background: "rgba(99,102,241,0.6)" }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Goal */}
            {project.goals && (
              <div className="mb-6 p-4 rounded-xl"
                style={{ border: "1px solid rgba(99,102,241,0.2)", background: "rgba(99,102,241,0.04)" }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-indigo-400">
                  Project goal
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                  {project.goals}
                </p>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full"
                  style={{ background: "var(--surface-hover)", border: "1px solid var(--border)", color: "var(--foreground-muted)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── FeaturedProject (unchanged) ────────────────────────────────────────────────

function FeaturedProject({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const s = statusConfig[project.status];
  const isExpandable = Boolean(project.expandable);

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`project-card-featured mb-6${isExpandable ? " cursor-pointer group/featured" : ""}`}
      onClick={isExpandable ? () => setExpanded(true) : undefined}
      role={isExpandable ? "button" : undefined}
      tabIndex={isExpandable ? 0 : undefined}
      onKeyDown={isExpandable ? (e) => { if (e.key === "Enter" || e.key === " ") setExpanded(true); } : undefined}
    >
      {/* Visual header */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: project.accentColor ?? "var(--surface)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative text-6xl select-none">{project.icon}</div>
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-[11px] text-indigo-300 font-medium">
          <Star size={10} fill="currentColor" />
          Featured project
        </div>
        <div className="absolute top-4 right-4">
          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${s.bg} ${s.color}`}>
            {s.label}
          </span>
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
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-full"
              style={{ background: "var(--surface-hover)", border: "1px solid var(--border)", color: "var(--foreground-muted)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex items-center gap-4">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] font-medium transition-colors btn-secondary py-2 px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={14} /> View on GitHub
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-[13px]" style={{ color: "var(--foreground-dim)" }}>
                <Lock size={13} /> Not yet public
              </span>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] font-medium btn-primary py-2 px-4"
                onClick={(e) => e.stopPropagation()}
              >
                Live demo <ArrowUpRight size={13} />
              </a>
            )}
          </div>
          {isExpandable && (
            <span className="text-[12px] flex items-center gap-1 transition-colors group-hover/featured:text-indigo-400"
              style={{ color: "var(--foreground-dim)" }}>
              View details <ChevronRight size={12} />
            </span>
          )}
        </div>
      </div>
    </motion.div>
    {expanded && (
      <ExpandedProjectModal project={project} onClose={() => setExpanded(false)} />
    )}
    </>
  );
}

// ─── SA Data Hub — premium card ───────────────────────────────────────────────
// Rendered in the grid alongside standard ProjectCards, but with more visual
// weight: taller header, highlighted border, screenshot strip, expand button.

function SADataHubCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const s = statusConfig[project.status];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.55 }}
        className="project-card flex flex-col cursor-pointer group/sacard"
        style={{ border: "1px solid rgba(16,185,129,0.25)" }}
        onClick={() => setExpanded(true)}
        role="button"
        aria-label={`Open ${project.title} details`}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setExpanded(true); }}
      >
        {/* Header — taller than standard card, green tint */}
        <div
          className="h-36 flex items-center justify-center relative overflow-hidden"
          style={{ background: project.accentColor ?? "var(--surface)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.12) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <span className="relative text-5xl select-none">{project.icon}</span>

          {/* Featured badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/25 text-[10px] text-emerald-400 font-medium">
            <Star size={9} fill="currentColor" />
            Featured
          </div>

          {/* Expand hint */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover/sacard:opacity-100 transition-opacity">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium"
              style={{ background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.7)" }}>
              <Maximize2 size={9} /> Expand
            </div>
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

          {/* Mini metrics strip */}
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
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-full"
                style={{ background: "var(--surface-hover)", border: "1px solid var(--border)", color: "var(--foreground-dim)" }}
              >
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
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[12px] transition-colors"
                  style={{ color: "var(--foreground-dim)" }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--foreground)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground-dim)"; }}
                >
                  <Github size={13} /> GitHub
                </a>
              ) : null}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[12px]"
                  style={{ color: "var(--accent)" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={13} /> Live
                </a>
              )}
            </div>
            <span className="text-[11px] flex items-center gap-1 transition-colors group-hover/sacard:text-indigo-400"
              style={{ color: "var(--foreground-dim)" }}>
              View details <ChevronRight size={11} />
            </span>
          </div>
        </div>
      </motion.div>

      {expanded && (
        <ExpandedProjectModal project={project} onClose={() => setExpanded(false)} />
      )}
    </>
  );
}

// ─── Standard ProjectCard (unchanged) ────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Premium grid card for expandable projects that are not featured
  if (project.expandable && !project.featured) {
    return <SADataHubCard project={project} index={index} />;
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
      <div
        className="h-28 flex items-center justify-center relative overflow-hidden"
        style={{ background: "var(--surface)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
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
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-full"
              style={{ background: "var(--surface-hover)", border: "1px solid var(--border)", color: "var(--foreground-dim)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] transition-colors"
              style={{ color: "var(--foreground-dim)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--foreground)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground-dim)"; }}
            >
              <Github size={13} /> GitHub
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "var(--foreground-dim)", opacity: 0.5 }}>
              <Github size={13} /> Not yet public
            </span>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px]"
              style={{ color: "var(--accent)" }}
            >
              <ExternalLink size={13} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page (unchanged structure) ──────────────────────────────────────────────

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
          {featured.map((p) => <FeaturedProject key={p.title} project={p} />)}

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {rest.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
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
