"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  BookOpen,
  ChevronRight,
  Sparkles,
  BarChart2,
  Brain,
  Code2,
} from "lucide-react";

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
    desc: "Finding signal in noise. Building rigorous frameworks for understanding the world through data.",
  },
  {
    icon: Brain,
    label: "Artificial Intelligence",
    desc: "Exploring the mechanics behind machine learning and what it means for how we'll work and think.",
  },
  {
    icon: Code2,
    label: "Computer Science",
    desc: "Algorithms, systems, and the craft of writing code that is clean, efficient, and purposeful.",
  },
];

export default function Home() {
  return (
    <div className="page-content">
      <div className="ambient-glow" />

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6 w-full">
<          div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center min-h-[80vh]">
  <           div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mb-8"
            >
              <span className="tag">
                <Sparkles size={11} className="mr-1.5" />
                Available for research collaborations
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6"
            >
              <span className="gradient-text">Ubayd</span>
              <br />
              <span className="gradient-text">Hattas</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-4 max-w-xl"
            >
              Student of mathematics and computation.
              <br />
              Building the foundations for a life in data science and AI.
            </motion.p>

            {/* Short intro */}
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-[15px] text-white/35 leading-relaxed mb-10 max-w-lg"
            >
              First year BSc student at the University of Cape Town, majoring
              in Computer Science, Statistics & Data Science. From Pretoria,
              South Africa.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-3 mb-12"
            >
              <Link href="/about" className="btn-primary">
                Learn about me <ArrowRight size={14} />
              </Link>
              <Link href="/projects" className="btn-secondary">
                View projects
              </Link>
              <a
                href="/cv.pdf"
                download="Ubayd_Hattas_CV.pdf"
                className="btn-secondary"
                aria-label="Download cv"
              >
                Download CV
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex items-center gap-5"
            >
              <a
                href="https://github.com/ubayd-hattas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] text-white/40 hover:text-white/80 transition-colors"
              >
                <Github size={15} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ubayd-hattas-0608a2349/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] text-white/40 hover:text-white/80 transition-colors"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
              <a
                href="mailto:uhattas@gmail.com"
                className="flex items-center gap-2 text-[13px] text-white/40 hover:text-white/80 transition-colors"
              >
                <Mail size={15} />
                Email
              </a>
            </motion.div>
          </div>

          {/* Profile image */}
          <motion.div
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hidden lg:flex justify-end items-center"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />

              <Image
                src="/profile.jpg"
                alt="Ubayd Hattas"
                width={300}
                height={300}
                priority
                className="relative rounded-3xl object-cover border border-white/10 shadow-2xl opacity-95"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>


      {/* Currently studying */}
      <section className="section border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-10"
          >
            <BookOpen size={14} className="text-indigo-400" />
            <span className="text-[13px] text-white/40 uppercase tracking-widest font-medium">
              Currently studying
            </span>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="card p-6 group"
              >
                <area.icon
                  size={20}
                  className="text-indigo-400 mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-[14px] font-semibold text-white mb-2">
                  {area.label}
                </h3>
                <p className="text-[13px] text-white/40 leading-relaxed">
                  {area.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* UCT banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 p-5 card flex items-center justify-between"
          >
            <div>
              <p className="text-[13px] text-white/60 font-medium">
                University of Cape Town
              </p>
              <p className="text-[12px] text-white/30 mt-0.5">
                BSc · Computer Science, Statistics & Data Science · 2026–2028
              </p>
            </div>
            <Link
              href="/education"
              className="flex items-center gap-1 text-[12px] text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Details <ChevronRight size={13} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values / philosophy strip */}
      <section className="section border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 gradient-text">
              Discipline over intensity.
              <br />
              Consistency over bursts.
            </h2>
            <p className="text-[15px] text-white/40 leading-relaxed mb-6">
              I grew up with early access to technology, getting my first computer 
              at age five and watching my father build his career at the heart of 
              South African data. That environment completely shaped how I think. 
              I am not in a hurry, because I am focused on building a foundation that 
              lasts.
            </p>
            <Link
              href="/about"
              className="flex items-center gap-2 text-[14px] text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              Read more about me <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="section border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
              Let's connect
            </h2>
            <p className="text-[15px] text-white/40 mb-8 max-w-md mx-auto">
              Whether you're a researcher, recruiter, or fellow student. I'm
              always open to a good conversation.
            </p>
            <Link href="/contact" className="btn-primary mx-auto">
              Get in touch <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
