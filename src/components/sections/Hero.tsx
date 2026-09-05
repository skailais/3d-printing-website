"use client";

import { motion } from "framer-motion";
import HeroScene from "@/components/three/HeroScene";
import { Button } from "@/components/ui/Button";

const wordVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  const line1 = ["Turn", "Ideas"];
  const line2 = ["Into", "Objects."];

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div className="grid-lines absolute inset-0" aria-hidden="true" />
      <HeroScene />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 42%, rgba(6,7,10,0.72) 0%, rgba(6,7,10,0.3) 55%, transparent 78%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Professional 3D Printing
          </motion.p>

          <h1 className="font-display text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            {[line1, line2].map((line, li) => (
              <span key={li} className="block overflow-hidden">
                {line.map((word, wi) => (
                  <motion.span
                    key={word}
                    custom={li * 2 + wi}
                    variants={wordVariants}
                    initial="hidden"
                    animate="show"
                    className={`mr-4 inline-block ${
                      wi === line.length - 1 && li === 1 ? "gradient-text" : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-7 max-w-lg text-balance text-base text-text-muted sm:text-lg"
          >
            Upload a model, choose a material, and get a precision-printed
            part — fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button href="#quote" variant="primary">
              Get a Quote
            </Button>
            <Button href="#quote" variant="outline">
              Upload Your Model
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-border-strong p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-accent"
          />
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </section>
  );
}
