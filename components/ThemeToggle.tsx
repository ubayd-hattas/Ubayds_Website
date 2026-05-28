"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const modes = [
  { value: "light", icon: Sun,     label: "Light" },
  { value: "dark",  icon: Moon,    label: "Dark"  },
  { value: "system",icon: Monitor, label: "System"},
] as const;

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  const CurrentIcon = resolvedTheme === "light" ? Sun : Moon;

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle theme"
        className="w-8 h-8 flex items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-[var(--surface)] transition-all"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={resolvedTheme}
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.18 }}
            style={{ display: "flex" }}
          >
            <CurrentIcon size={16} />
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-10 z-50 min-w-[128px] rounded-xl border p-1 shadow-xl"
            style={{
              background: "var(--nav-bg)",
              backdropFilter: "blur(16px)",
              borderColor: "var(--border)",
            }}
          >
            {modes.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                onClick={() => { setTheme(value); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all"
                style={{
                  color: theme === value ? "var(--accent)" : "var(--foreground-muted)",
                  background: theme === value ? "var(--accent-dim)" : "transparent",
                }}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
