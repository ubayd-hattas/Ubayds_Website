"use client";

import PageTransition from "@/components/PageTransition";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "uhattas@gmail.com",
    href: "mailto:uhattas@gmail.com",
    desc: "Best for professional enquiries and research collaboration.",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ubayd-hattas",
    href: "https://www.linkedin.com/in/ubayd-hattas-0608a2349/",
    desc: "Professional background, education, and connections.",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/ubayd-hattas",
    href: "https://github.com/ubayd-hattas",
    desc: "Code, experiments, and projects in progress.",
  },
];

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

     await fetch("https://formspree.io/f/mkoekbyv", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(form),
     });

    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

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
          <span className="tag mb-4 inline-block">Contact</span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight gradient-text mb-4">
            Let's have
            <br />a real conversation.
          </h1>
          <p className="text-[15px] text-secondary leading-relaxed max-w-xl">
            I'm open to research collaboration, mentorship, academic
            discussions and serious professional opportunities. I respond
            thoughtfully not instantly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_320px] gap-10 items-start">
          {/* Form */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-10 text-center"
              >
                <CheckCircle2 size={32} className="text-green-400 mx-auto mb-4" />
                <h3 className="text-[16px] font-semibold text-primary mb-2">
                  Message received
                </h3>
                <p className="text-[13px] text-secondary leading-relaxed">
                  Thank you for reaching out. I'll read it carefully and get
                  back to you when I have something meaningful to say.
                </p>
              </motion.div>
            ) : (
              <div className="card p-7 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] text-secondary mb-2 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-secondary mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 text-[14px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] text-secondary mb-2 font-medium">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-[14px] appearance-none"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      color: form.subject ? "#fff" : "#6b7280",
                    }}
                  >
                    <option value="" disabled>
                      Select a reason for reaching out
                    </option>
                    <option value="research">Research collaboration</option>
                    <option value="mentorship">Mentorship or advice</option>
                    <option value="opportunity">Professional opportunity</option>
                    <option value="academic">Academic discussion</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] text-secondary mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What would you like to discuss?"
                    rows={6}
                    className="w-full px-4 py-3 text-[14px] resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-[13px] text-red-400">
                    <AlertCircle size={14} />
                    Something went wrong. Please try emailing me directly.
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={
                    status === "sending" ||
                    !form.name ||
                    !form.email ||
                    !form.message
                  }
                  className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send message <Send size={13} />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-dim text-center">
                  I read every message. Response time is typically 1–3 days.
                </p>
              </div>
            )}
          </motion.div>

          {/* Sidebar links */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="card p-5 flex items-start gap-4 group"
                style={{ display: "flex" }}
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <link.icon size={15} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-primary group-hover:text-primary transition-colors">
                    {link.label}
                  </p>
                  <p className="text-[11px] text-indigo-400/70 mt-0.5 mb-1.5">
                    {link.value}
                  </p>
                  <p className="text-[12px] text-dim leading-relaxed">
                    {link.desc}
                  </p>
                </div>
              </a>
            ))}

            <div className="card p-5 mt-2">
              <p className="text-[12px] text-dim leading-relaxed">
                <span className="text-secondary font-medium block mb-1">
                  A note on response time
                </span>
                I'm a full-time student. I read everything but I don't rush
                replies. If your message deserves a thoughtful response, I'll
                give it one, just not immediately.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
