"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Github, Linkedin, Mail,
  BookOpen, ChevronRight, Sparkles, BarChart2, Brain, Code2, PenLine,
  ExternalLink,
} from "lucide-react";
import { publishedPostsMeta } from "./blog/posts";
import { homepageFeaturedProjects } from "./projects/projects";
import PageTransition from "@/components/PageTransition";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const focusAreas = [
  {
    icon: BarChart2,
    label: "Statistics & Data Science",
    desc: "Feature engineering, evaluation, and turning messy real-world data into decisions you can defend.",
  },
  {
    icon: Brain,
    label: "Machine Learning & AI Evaluation",
    desc: "Applied ML, domain adaptation, and careful tests of whether AI systems do what we claim they do.",
  },
  {
    icon: Code2,
    label: "Computer Science",
    desc: "Algorithms, systems, and shipping software. From research prototypes to public data products.",
  },
];

export default function HomeClient() {
  return (
    <PageTransition>
      <div className="page-content">
        <div className="ambient-glow" />

        {/* Hero */}
        <section className="min-h-screen flex flex-col justify-center pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center min-h-[80vh]">
              <div className="max-w-3xl">

                {/* Badge */}
                <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="mb-8">
                  <span className="tag">
                    <Sparkles size={11} className="mr-1.5" />
                    Available for research collaborations
                  </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                  custom={1} variants={fadeUp} initial="hidden" animate="show"
                  className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6"
                >
                  <span className="gradient-text">Ubayd</span>
                  <br />
                  <span className="gradient-text">Hattas</span>
                </motion.h1>

                {/* Primary identity line */}
                <motion.p
                  custom={2} variants={fadeUp} initial="hidden" animate="show"
                  className="text-lg md:text-xl font-light leading-relaxed mb-3 max-w-xl"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  BSc student at UCT · Computer Science, Statistics &amp; Data Science
                </motion.p>

                {/* Credibility line */}
                <motion.p
                  custom={3} variants={fadeUp} initial="hidden" animate="show"
                  className="text-[13px] font-medium tracking-wide mb-6 max-w-xl"
                  style={{ color: "var(--foreground-dim)" }}
                >
                  Applied ML · AI evaluation · Data products · Former Head Boy
                </motion.p>

                {/* Short supporting text */}
                <motion.p
                  custom={4} variants={fadeUp} initial="hidden" animate="show"
                  className="text-[15px] leading-relaxed mb-10 max-w-lg"
                  style={{ color: "var(--foreground-dim)" }}
                >
                  First-year at the University of Cape Town, building data products and working on
                  applied machine learning and AI evaluation. From Pretoria, raised in Cape Town.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  custom={5} variants={fadeUp} initial="hidden" animate="show"
                  className="flex flex-wrap gap-3 mb-12"
                >
                  <Link href="/about" className="btn-primary">
                    Learn about me <ArrowRight size={14} />
                  </Link>
                  <Link href="/projects" className="btn-secondary">View projects</Link>
                  <a href="/cv.pdf" download="Ubayd_Hattas_CV.pdf" className="btn-secondary">
                    Download CV
                  </a>
                </motion.div>

                {/* Social links */}
                <motion.div
                  custom={6} variants={fadeUp} initial="hidden" animate="show"
                  className="flex items-center gap-5"
                >
                  {[
                    { href: "https://github.com/ubayd-hattas", icon: Github, label: "GitHub" },
                    { href: "https://www.linkedin.com/in/ubayd-hattas/", icon: Linkedin, label: "LinkedIn" },
                    { href: "mailto:uhattas@gmail.com", icon: Mail, label: "Email" },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      className="flex items-center gap-2 text-[13px] transition-colors"
                      style={{ color: "var(--foreground-dim)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--foreground)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground-dim)"; }}
                    >
                      <Icon size={15} aria-hidden="true" />
                      {label}
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* Profile image */}
              <motion.div
                custom={7} variants={fadeUp} initial="hidden" animate="show"
                className="hidden lg:flex justify-end items-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 blur-3xl rounded-full"
                    style={{ background: "rgba(99,102,241,0.15)" }} aria-hidden="true" />
                  <Image
                    src="/profile.jpg"
                    alt="Ubayd Hattas — BSc student at the University of Cape Town studying Computer Science, Statistics & Data Science"
                    width={300}
                    height={300}
                    priority
                    className="relative rounded-3xl object-cover shadow-2xl"
                    style={{ border: "1px solid var(--border)", opacity: 0.95 }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Currently studying */}
        <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-10"
            >
              <BookOpen size={14} style={{ color: "var(--accent)" }} aria-hidden="true" />
              <span className="text-[13px] uppercase tracking-widest font-medium"
                style={{ color: "var(--foreground-dim)" }}>
                Currently studying
              </span>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4">
              {focusAreas.map((area, i) => (
                <motion.div
                  key={area.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="card p-6 group"
                >
                  <area.icon size={20} className="mb-4 group-hover:scale-110 transition-transform"
                    style={{ color: "var(--accent)" }} aria-hidden="true" />
                  <h3 className="text-[14px] font-semibold mb-2" style={{ color: "var(--foreground)" }}>
                    {area.label}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                    {area.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* UCT banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-4 p-5 card flex items-center justify-between"
            >
              <div>
                <p className="text-[13px] font-medium" style={{ color: "var(--foreground)" }}>
                  University of Cape Town
                </p>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--foreground-dim)" }}>
                  BSc · Computer Science, Statistics &amp; Data Science · 2026–Present
                </p>
              </div>
              <Link href="/education"
                className="flex items-center gap-1 text-[12px] transition-colors"
                style={{ color: "var(--accent)" }}
                aria-label="View education details for Ubayd Hattas">
                Details <ChevronRight size={13} aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Featured projects — driven by projects.ts */}
        <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-8"
            >
              <span className="text-[13px] uppercase tracking-widest font-medium"
                style={{ color: "var(--foreground-dim)" }}>
                Selected work
              </span>
              <Link href="/projects"
                className="flex items-center gap-1 text-[12px] transition-colors"
                style={{ color: "var(--accent)" }}
                aria-label="View all projects by Ubayd Hattas">
                All projects <ChevronRight size={13} aria-hidden="true" />
              </Link>
            </motion.div>

            <div className="space-y-4">
              {homepageFeaturedProjects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="card p-6 md:p-8"
                  style={{
                    borderColor: project.accentColor
                      ? project.accentColor.replace("0.10", "0.25").replace("0.12", "0.25")
                      : undefined,
                    background: project.accentColor ?? undefined,
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="max-w-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl" aria-hidden="true">{project.icon}</span>
                        <span className="text-[11px] uppercase tracking-widest font-medium"
                          style={{ color: "var(--accent)" }}>Featured project</span>
                      </div>
                      <h2 className="text-[18px] font-semibold mb-2" style={{ color: "var(--foreground)" }}>
                        {project.title}
                      </h2>
                      <p className="text-[14px] leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0 relative z-10">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="btn-primary"
                        aria-label={`View ${project.title} project details`}
                      >
                        View project <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-center"
                          aria-label={`Open live link for ${project.title}`}
                        >
                          Live ↗
                        </a>
                      ) : project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-center inline-flex items-center justify-center gap-1.5"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <ExternalLink size={13} aria-hidden="true" /> GitHub
                        </a>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 gradient-text">
                Discipline over intensity.
                <br />Consistency over bursts.
              </h2>
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--foreground-muted)" }}>
                I grew up with early access to technology, getting my first computer at age five,
                and watching my father build his career at the heart of South African data.
                That environment shaped how I think. I&apos;m not in a hurry. I&apos;m building a foundation that lasts.
              </p>
              <Link href="/about"
                className="flex items-center gap-2 text-[14px] font-medium transition-colors"
                style={{ color: "var(--accent)" }}>
                Read more about me <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Latest Writing */}
        <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-8"
            >
              <div className="flex items-center gap-2">
                <PenLine size={14} style={{ color: "var(--accent)" }} aria-hidden="true" />
                <span className="text-[13px] uppercase tracking-widest font-medium"
                  style={{ color: "var(--foreground-dim)" }}>
                  Latest writing
                </span>
              </div>
              <Link href="/blog"
                className="flex items-center gap-1 text-[12px] transition-colors"
                style={{ color: "var(--accent)" }}
                aria-label="View all blog posts by Ubayd Hattas">
                All posts <ChevronRight size={13} aria-hidden="true" />
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {publishedPostsMeta.slice(-2).map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="card p-6 group flex flex-col h-full block"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="tag text-[11px]">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-[15px] font-semibold leading-snug mb-2 group-hover:text-[color:var(--accent)] transition-colors"
                      style={{ color: "var(--foreground)" }}>
                      {post.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed mb-4 flex-1"
                      style={{ color: "var(--foreground-muted)" }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[12px]" style={{ color: "var(--foreground-dim)" }}>
                        {post.date} · {post.readingTime} min read
                      </span>
                      <span className="flex items-center gap-1 text-[12px] font-medium transition-colors"
                        style={{ color: "var(--accent)" }}>
                        Read <ArrowRight size={12} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3"
                style={{ color: "var(--foreground)" }}>
                Let&apos;s connect
              </h2>
              <p className="text-[15px] mb-8 max-w-md mx-auto" style={{ color: "var(--foreground-muted)" }}>
                Whether you&apos;re a researcher, recruiter, or fellow student, I&apos;m always open to a good conversation.
              </p>
              <Link href="/contact" className="btn-primary mx-auto">
                Get in touch <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
