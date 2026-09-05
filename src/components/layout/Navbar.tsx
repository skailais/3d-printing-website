"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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

  /* Sub-pages open on an ink-dark header, so the bar has to invert until the
     paper background slides in behind it on scroll. */
  const overInk = pathname !== "/" && !scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(243,239,230,0.92)" : "rgba(243,239,230,0)",
          borderBottomColor: scrolled ? "rgba(22,19,15,0.14)" : "rgba(22,19,15,0)",
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="border-b backdrop-blur-md"
      >
        <nav className="mx-auto flex h-20 max-w-[86rem] items-center justify-between px-6 lg:px-10">
          <Link href="/" className="focus-ring" aria-label="CaliPrint — home">
            <Logo tone={overInk ? "paper" : "ink"} />
          </Link>

          <ul className="hidden items-center gap-10 lg:flex">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-active={active}
                    className={`ink-link focus-ring font-mono text-[0.68rem] tracked-label transition-colors duration-500 ${
                      active
                        ? overInk
                          ? "text-vermilion-bright"
                          : "text-vermilion"
                        : overInk
                          ? "text-paper/70 hover:text-vermilion-bright"
                          : "text-ink-soft hover:text-vermilion"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <Button
              href="/quote"
              variant={overInk ? "paper" : "ink"}
              className="!px-6 !py-3 !text-[0.68rem]"
            >
              Request a Quote
            </Button>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="focus-ring relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-2 lg:hidden"
          >
            <motion.span
              animate={
                open || overInk
                  ? { rotate: open ? 45 : 0, y: open ? 5 : 0, backgroundColor: "#f3efe6" }
                  : { rotate: 0, y: 0, backgroundColor: "#16130f" }
              }
              className="h-px w-6"
            />
            <motion.span
              animate={
                open || overInk
                  ? { rotate: open ? -45 : 0, y: open ? -5 : 0, backgroundColor: "#f3efe6" }
                  : { rotate: 0, y: 0, backgroundColor: "#16130f" }
              }
              className="h-px w-6"
            />
          </button>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="ink-panel fixed inset-0 z-40 flex flex-col justify-center px-8 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-3 font-display text-4xl text-paper transition-colors hover:text-vermilion-bright"
                  >
                    <span className="font-mono text-[0.6rem] text-paper/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-12"
            >
              <Button
                href="/quote"
                variant="vermilion"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Request a Quote
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
