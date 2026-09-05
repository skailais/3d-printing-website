"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { steps } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section id="process" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="From file to part, in four steps."
        />

        <RevealGroup className="relative mt-20 grid grid-cols-1 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block" />
          {steps.map((step, i) => (
            <RevealItem key={step.index} className="relative">
              <div className="relative flex flex-col items-start">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-bg font-mono text-sm text-accent">
                  {step.index}
                </div>
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.06 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="pointer-events-none absolute -top-10 left-0 select-none font-display text-8xl font-bold"
                >
                  {step.index}
                </motion.span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[22ch] text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="mt-6 h-px w-12 bg-border sm:hidden" />
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
