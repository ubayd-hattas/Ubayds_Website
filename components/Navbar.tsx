"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/",          label: "Home"      },
  { href: "/about",     label: "About"     },
  { href: "/education", label: "Education" },
  { href: "/projects",  label: "Projects"  },
  { href: "/skills",    label: "Skills"    },
  { href: "/now",       label: "Now"       },
  { href: "/blog",      label: "Blog"      },
  { href: "/contact",   label: "Contact"   },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-tight transition-opacity hover:opacity-70"
            style={{ color: "var(--foreground)" }}
          >
            UH<span style={{ color: "var(--accent)" }}>.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200"
                  style={{
                    color: active ? "var(--foreground)" : "var(--foreground-muted)",
                    background: active ? "var(--surface-hover)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "var(--foreground)";
                      e.currentTarget.style.background = "var(--surface)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "var(--foreground-muted)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side: theme toggle + CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center px-4 py-1.5 text-white text-[13px] font-medium rounded-lg transition-colors"
              style={{ background: "var(--accent)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)"; }}
            >
              Get in touch
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg transition-all"
              style={{ color: "var(--foreground-muted)" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden border-b"
            style={{
              background: "var(--mobile-nav-bg)",
              backdropFilter: "blur(20px)",
              borderColor: "var(--border)",
            }}
          >
            <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2.5 rounded-lg text-[14px] font-medium transition-all"
                    style={{
                      color: active ? "var(--foreground)" : "var(--foreground-muted)",
                      background: active ? "var(--surface-hover)" : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 border-t mt-2" style={{ borderColor: "var(--border)" }}>
                <Link
                  href="/contact"
                  className="block px-3 py-2.5 text-white text-[14px] font-medium rounded-lg transition-colors text-center"
                  style={{ background: "var(--accent)" }}
                >
                  Get in touch
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
