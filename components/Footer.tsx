import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.06] mt-20">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div>
            <p className="text-[13px] text-white/30">
              © {year} Ubayd Hattas · Cape Town, South Africa
            </p>
            <p className="text-[12px] text-white/20 mt-1">
              BSc Computer Science, Statistics & Data Science — UCT
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ubayd-hattas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/30 hover:text-white/70 transition-colors"
            >
              <Github size={17} />
            </a>
            <a
              href="https://www.linkedin.com/in/ubayd-hattas-0608a2349/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/30 hover:text-white/70 transition-colors"
            >
              <Linkedin size={17} />
            </a>
            <a
              href="mailto:uhattas@gmail.com"
              aria-label="Email"
              className="text-white/30 hover:text-white/70 transition-colors"
            >
              <Mail size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
