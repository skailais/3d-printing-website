"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";

type Theme = "light" | "dark";

const STORAGE_KEY = "caliprint-theme";
const CHANGED = "caliprint-theme-change";

/* The theme lives in the DOM, not in React state: an inline script sets it
   before first paint. This subscribes to it rather than mirroring it, which
   also means a change to the OS setting is picked up while the page is open. */
function subscribe(onChange: () => void) {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", onChange);
  window.addEventListener(CHANGED, onChange);
  return () => {
    mql.removeEventListener("change", onChange);
    window.removeEventListener(CHANGED, onChange);
  };
}

function readTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "dark" || chosen === "light") return chosen;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Sun and moon drawn as one shape: the disc, and a second disc that slides
 * across to bite a crescent out of it. The same eclipse the logo is built on.
 */
function Dial({ dark }: { dark: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" aria-hidden="true">
      <defs>
        <mask id="theme-dial-mask">
          <rect width="24" height="24" fill="white" />
          <motion.circle
            cx="24"
            cy="6"
            r="8"
            fill="black"
            animate={{ cx: dark ? 17 : 26, cy: dark ? 7 : 4 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        </mask>
      </defs>

      <motion.circle
        cx="12"
        cy="12"
        r="7"
        fill="currentColor"
        mask="url(#theme-dial-mask)"
        animate={{ r: dark ? 8 : 6 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* rays, retracted when the moon is out */}
      <motion.g
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        animate={{ opacity: dark ? 0 : 1, scale: dark ? 0.6 : 1 }}
        transition={{ duration: 0.45 }}
        style={{ transformOrigin: "12px 12px" }}
      >
        <path d="M12 1.6v2.1M12 20.3v2.1M22.4 12h-2.1M3.7 12H1.6" />
        <path d="M19.3 4.7l-1.5 1.5M6.2 17.8l-1.5 1.5M19.3 19.3l-1.5-1.5M6.2 6.2L4.7 4.7" />
      </motion.g>
    </svg>
  );
}

export default function ThemeToggle({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  /* The server has no way to know the visitor's choice, so it renders the
     light dial; the store corrects it as soon as hydration finishes. */
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // private mode: the choice simply will not outlive the tab
    }
    window.dispatchEvent(new Event(CHANGED));
  };

  const dark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to the light theme" : "Switch to the dark theme"}
      title={dark ? "Light" : "Dark"}
      className={`focus-ring flex h-9 w-9 items-center justify-center transition-colors ${
        tone === "paper" ? "text-paper/70 hover:text-vermilion-bright" : "text-body-soft hover:text-vermilion"
      }`}
    >
      <Dial dark={dark} />
    </button>
  );
}
