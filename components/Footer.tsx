import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 mt-20"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[13px]" style={{ color: "var(--foreground-dim)" }}>
              © {year} Ubayd Hattas · Cape Town, South Africa
            </p>
            <p className="text-[12px] mt-1" style={{ color: "var(--foreground-dim)", opacity: 0.7 }}>
              BSc Computer Science, Statistics & Data Science — UCT
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/ubayd-hattas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-opacity hover:opacity-80"
              style={{ color: "var(--foreground-dim)" }}
            >
              <Github size={17} />
            </a>
            <a
              href="https://www.linkedin.com/in/ubayd-hattas-0608a2349/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-opacity hover:opacity-80"
              style={{ color: "var(--foreground-dim)" }}
            >
              <Linkedin size={17} />
            </a>
            <a
              href="mailto:uhattas@gmail.com"
              aria-label="Email"
              className="transition-opacity hover:opacity-80"
              style={{ color: "var(--foreground-dim)" }}
            >
              <Mail size={17} />
            </a>
            <Link
              href="/now"
              className="text-[12px] font-medium transition-opacity hover:opacity-80"
              style={{ color: "var(--foreground-dim)" }}
            >
              /now
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
