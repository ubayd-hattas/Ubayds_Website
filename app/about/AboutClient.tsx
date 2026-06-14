"use client";

import PageTransition from "@/components/PageTransition";

import { motion } from "framer-motion";
import { MapPin, Calendar, GraduationCap, Target, Heart, Award } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const values = [
  {
    icon: Target,
    label: "Ambition with patience",
    desc: "I want to make a real impact in Data Science and AI, but I'm in no rush. Building a strong foundation matters much more to me than how fast I get there.",
  },
  {
    icon: Heart,
    label: "Faith and structure",
    desc: "My faith in Allah keeps me grounded. Living a structured life with disciplined sleep, focused work and quietness gives me the clarity I need to think clearly.",
  },
  {
    icon: GraduationCap,
    label: "Lifelong learning",
    desc: "I don't separate academic study from personal growth. Every book, dataset, or problem is a chance to understand the world more accurately.",
  },
];

const timeline = [
  {
    year: "2008",
    label: "Born in Pretoria, South Africa",
    detail: "23 February: The beginning.",
  },
  {
    year: "2013",
    label: "Got my first computer",
    detail: "At five years old. The curiosity about how things work started here.",
  },
  {
    year: "2017",
    label: "Moved to Cape Town",
    detail: "Came for my dad's work. A city I've grown to genuinely love.",
  },
  {
    year: "2025",
    label: "Head Boy",
    detail:
      "Led the student body in my matric year, developing my leadership voice and sense of responsibility.",
  },
  {
    year: "2025",
    label: "NSC Top Achiever",
    detail:
      "Top achievements in Mathematics and Physics. Top 5 in my school. Maths tutor for junior grades throughout my senior year.",
  },
  {
    year: "2026",
    label: "Began BSc at UCT",
    detail:
      "First-year student at the University of Cape Town, majoring in Computer Science, Statistics, and Data Science.",
  },
   {
    year: "2026",
    label: "Launched SA Data Hub",
    detail:
      "Built and shipped sadatahub.tech — a public platform making South African statistics accessible to anyone, with interactive visualisations and transparent data sourcing.",
  },
];

export default function AboutClient() {
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
          <span className="tag mb-4 inline-block">About me</span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 gradient-text">
            Depth over pace,
            <br />
            playing the long game.
          </h1>
          <div className="flex flex-wrap gap-4 mt-6">
            <span className="flex items-center gap-1.5 text-[13px] text-secondary">
              <MapPin size={13} className="text-indigo-400" aria-hidden="true" />
              Cape Town, South Africa
            </span>
            <span className="flex items-center gap-1.5 text-[13px] text-secondary">
              <Calendar size={13} className="text-indigo-400" aria-hidden="true" />
              Born 23 February 2008
            </span>
            <span className="flex items-center gap-1.5 text-[13px] text-secondary">
              <GraduationCap size={13} className="text-indigo-400" aria-hidden="true" />
              UCT BSc Class of 2028
            </span>
          </div>
        </motion.div>

        {/* Key credentials — surfaced early */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-16"
        >
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { icon: Award, label: "Former Head Boy", detail: "Led the student body in matric" },
              { icon: Award, label: "NSC Top Achiever", detail: "Top 5 in school · Maths & Physics" },
              { icon: GraduationCap, label: "Creator of SA Data Hub", detail: "Public South African data platform" },
            ].map((item, i) => (
              <div key={i} className="card p-4 flex items-start gap-3">
                <item.icon size={15} className="text-indigo-400 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[13px] font-semibold text-primary">{item.label}</p>
                  <p className="text-[12px] text-dim mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bio sections */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <h2 className="text-lg font-semibold mb-4 text-primary">
              Where I come from
            </h2>
            <div className="space-y-4 text-[15px] text-secondary leading-relaxed">
              <p>
                I was born in Pretoria and later moved to Cape Town, a city I genuinely love.
                My father, Dr Mahier Hattas, is the Director of Field Operations at Statistics
                South Africa. Watching him work with national data and seeing how numbers can
                describe an entire country sparked my interest long before I began my formal studies.
              </p>
              <p>
                I received my first computer when I was five years old. It was never a toy to me but a
                tool. I learned how to navigate systems, build things and break them just to figure out
                how they worked. That early exposure to technology was invaluable and completely shaped
                my path.
              </p>
            </div>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <h2 className="text-lg font-semibold mb-4 text-primary">
              How I think
            </h2>
            <div className="space-y-4 text-[15px] text-secondary leading-relaxed">
              <p>
                Attending a public high school taught me the value of consistency over
                privilege. I became known for mathematics and physics, not through effortless
                talent but through systematic work and persistence. During my matric year, I
                spent my breaks tutoring junior students because teaching remains one of the
                fastest ways to understand a subject deeply.
              </p>
              <p>
                I am analytical by nature and introspective by habit. I prefer deliberate thinking
                over fast reactions and I would much rather understand a problem completely than
                respond to it quickly. This is exactly how I approach university, code and life.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-lg font-semibold mb-8 text-primary">
            What I value
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card p-6"
              >
                <v.icon size={18} className="text-indigo-400 mb-3" aria-hidden="true" />
                <h3 className="text-[14px] font-semibold text-primary mb-2">
                  {v.label}
                </h3>
                <p className="text-[13px] text-secondary leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold mb-8 text-primary">
            The timeline
          </h2>
          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-[var(--border)]" aria-hidden="true" />
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex gap-6"
                >
                  <div className="w-16 shrink-0 text-right">
                    <span className="text-[11px] font-mono text-indigo-400 font-medium">
                      {item.year}
                    </span>
                  </div>
                  <div className="relative flex items-start gap-4">
                    <div className="mt-[5px] w-2 h-2 rounded-full bg-indigo-500/60 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-[14px] font-medium text-primary">
                        {item.label}
                      </p>
                      <p className="text-[13px] text-dim mt-0.5">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </PageTransition>
  );
}
