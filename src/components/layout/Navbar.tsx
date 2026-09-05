"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#materials", label: "Materials" },
  { href: "#work", label: "Work" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--bg-elevated) 70%, transparent)"
            : "transparent",
          borderColor: scrolled ? "var(--border)" : "transparent",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="border-b backdrop-blur-xl"
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="#top" className="focus-ring">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-text-muted transition-colors hover:text-text focus-ring"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button href="#quote" variant="outline" className="!px-5 !py-2.5 text-[0.83rem]">
              Get a Quote
            </Button>
          </div>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden focus-ring"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="h-px w-5 bg-text"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="h-px w-5 bg-text"
            />
          </button>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass border-b border-border md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-lg text-text-muted transition-colors hover:text-text"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Button href="#quote" variant="primary" className="w-full" onClick={() => setOpen(false)}>
                  Get a Quote
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
