"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Lock,
  Star,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Project, ProjectScreenshot } from "../projects";

// ─── Status config ────────────────────────────────────────────────────────────

const statusConfig = {
  active:   { label: "Active",   color: "text-green-400", bg: "bg-green-500/10 border-green-500/20"   },
  building: { label: "Building", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20"   },
  planned:  { label: "Planned",  color: "text-dim",       bg: "bg-[var(--surface)] border-[var(--border)]" },
};

// ─── Screenshot Gallery ───────────────────────────────────────────────────────

function ScreenshotGallery({ screenshots }: { screenshots: ProjectScreenshot[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(
    () => setActive((i) => (i - 1 + screenshots.length) % screenshots.length),
    [screenshots.length]
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % screenshots.length),
    [screenshots.length]
  );

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
        <div
          className="relative overflow-hidden rounded-xl"
          style={{ border: "1px solid var(--border)" }}
        >
          <div
            className="relative h-64 md:h-80 cursor-zoom-in group"
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
            <span
              className="absolute bottom-3 left-3 text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.9)" }}
            >
              {current.label ?? current.alt}
            </span>
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div
                className="p-1.5 rounded-lg"
                style={{ background: "var(--surface-hover)", border: "1px solid var(--border)" }}
              >
                <ZoomIn size={12} style={{ color: "var(--foreground-dim)" }} />
              </div>
            </div>
          </div>

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
                className="shrink-0 h-14 w-24 rounded-lg overflow-hidden transition-all relative"
                style={{
                  border:
                    i === active
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
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <div className="relative h-80 md:h-[32rem] bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current.src}
                    alt={current.alt}
                    className="h-full w-full object-contain"
                  />
                  <div
                    className="absolute bottom-0 inset-x-0 flex items-center justify-between gap-3 px-4 py-3"
                    style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.75))" }}
                  >
                    <span className="text-[13px] font-medium text-white/90">
                      {current.label ?? current.alt}
                    </span>
                    <span className="text-[11px] text-white/60">
                      {active + 1} / {screenshots.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 flex gap-2">
                <button
                  onClick={() => setLightbox(false)}
                  className="p-2 rounded-full"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  aria-label="Close lightbox"
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
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft size={16} style={{ color: "var(--foreground-muted)" }} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                    aria-label="Next screenshot"
                  >
                    <ChevronRight size={16} style={{ color: "var(--foreground-muted)" }} />
                  </button>
                </>
              )}

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

// ─── Main page component ──────────────────────────────────────────────────────

export default function ProjectPageClient({ project }: { project: Project }) {
  const s = statusConfig[project.status];

  return (
    <PageTransition>
      <div className="page-content pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6">

          {/* ── Breadcrumbs ── */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: project.title },
              ]}
            />
          </motion.div>

          {/* ── Banner image ── */}
          {project.bannerImage && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full overflow-hidden rounded-2xl mb-8"
              style={{
                aspectRatio: "16/9",
                border: "1px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              <Image
                src={project.bannerImage}
                alt={`${project.title} banner`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 896px, 896px"
              />
            </motion.div>
          )}

          {/* ── Fallback header (no banner image) ── */}
          {!project.bannerImage && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-52 flex items-center justify-center overflow-hidden rounded-2xl mb-8"
              style={{
                background: project.accentColor ?? "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <span className="relative text-7xl select-none">{project.icon}</span>
            </motion.div>
          )}

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${s.bg} ${s.color}`}
              >
                {s.label}
              </span>
              {project.featured && (
                <span className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300">
                  <Star size={10} fill="currentColor" />
                  Featured project
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-3xl md:text-4xl font-semibold tracking-tight mb-4"
              style={{ color: "var(--foreground)" }}
            >
              {project.title}
            </h1>

            {/* Short description */}
            <p
              className="text-[16px] leading-relaxed mb-6 max-w-3xl"
              style={{ color: "var(--foreground-muted)" }}
            >
              {project.description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <ExternalLink size={14} />
                  Live demo
                </a>
              )}
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <Github size={14} />
                  View on GitHub
                </a>
              ) : (
                <span
                  className="flex items-center gap-2 text-[13px]"
                  style={{ color: "var(--foreground-dim)" }}
                >
                  <Lock size={13} />
                  Not yet public
                </span>
              )}
            </div>
          </motion.div>

          {/* ── Divider ── */}
          <div
            className="mb-10"
            style={{ height: "1px", background: "var(--border)" }}
          />

          {/* ── Body content ── */}
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left: main content */}
            <div className="md:col-span-2 space-y-10">

              {/* Long description */}
              {project.longDesc && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {project.longDesc}
                  </p>
                </motion.div>
              )}

              {/* Full description */}
              {project.fullDesc && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4"
                >
                  {project.fullDesc.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="text-[14px] leading-relaxed"
                      style={{ color: "var(--foreground-dim)" }}
                    >
                      {para}
                    </p>
                  ))}
                </motion.div>
              )}

              {/* Goal */}
              {project.goals && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="p-5 rounded-xl"
                  style={{
                    border: "1px solid rgba(99,102,241,0.2)",
                    background: "rgba(99,102,241,0.04)",
                  }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2 text-indigo-400">
                    Project goal
                  </p>
                  <p
                    className="text-[14px] leading-relaxed"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {project.goals}
                  </p>
                </motion.div>
              )}

              {/* Screenshots */}
              {project.screenshots && project.screenshots.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p
                    className="text-[11px] font-semibold uppercase tracking-wider mb-4"
                    style={{ color: "var(--foreground-dim)" }}
                  >
                    Screenshots
                  </p>
                  <ScreenshotGallery screenshots={project.screenshots} />
                </motion.div>
              )}

              {/* Key features */}
              {project.features && project.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  <p
                    className="text-[11px] font-semibold uppercase tracking-wider mb-4"
                    style={{ color: "var(--foreground-dim)" }}
                  >
                    Key features
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {project.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-[13px]"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        <span
                          className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: "rgba(99,102,241,0.6)" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Right: sidebar */}
            <div className="space-y-6">

              {/* Metrics / Project details */}
              {project.metrics && project.metrics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p
                    className="text-[11px] font-semibold uppercase tracking-wider mb-3"
                    style={{ color: "var(--foreground-dim)" }}
                  >
                    Project details
                  </p>
                  <div className="space-y-2">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-3 rounded-xl"
                        style={{
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <p
                          className="text-[10px] uppercase tracking-wider mb-1"
                          style={{ color: "var(--foreground-dim)" }}
                        >
                          {m.label}
                        </p>
                        <p
                          className="text-[12px] font-medium"
                          style={{ color: "var(--foreground)" }}
                        >
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-wider mb-3"
                  style={{ color: "var(--foreground-dim)" }}
                >
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full"
                      style={{
                        background: "var(--surface-hover)",
                        border: "1px solid var(--border)",
                        color: "var(--foreground-muted)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Links */}
              {(project.github || project.live) && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p
                    className="text-[11px] font-semibold uppercase tracking-wider mb-3"
                    style={{ color: "var(--foreground-dim)" }}
                  >
                    Links
                  </p>
                  <div className="space-y-2">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[13px] p-3 rounded-xl transition-colors"
                        style={{
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          color: "var(--foreground-muted)",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--foreground)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground-muted)"; }}
                      >
                        <ExternalLink size={13} />
                        Live demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[13px] p-3 rounded-xl transition-colors"
                        style={{
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          color: "var(--foreground-muted)",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--foreground)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground-muted)"; }}
                      >
                        <Github size={13} />
                        GitHub repository
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* ── Related writing ── */}
          {project.relatedBlogPosts && project.relatedBlogPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-12 p-5 rounded-xl"
              style={{
                border: "1px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-wider mb-3"
                style={{ color: "var(--foreground-dim)" }}
              >
                Related writing
              </p>
              <ul className="space-y-2">
                {project.relatedBlogPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[14px] leading-relaxed transition-colors hover:text-indigo-400"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      {post.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* ── Back link (bottom) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 pt-8"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[13px] font-medium transition-colors"
              style={{ color: "var(--foreground-dim)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--foreground)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground-dim)"; }}
            >
              <ArrowLeft size={14} />
              Back to Projects
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
