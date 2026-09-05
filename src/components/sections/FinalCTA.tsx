"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <h2 className="text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Have an idea?
            <br />
            <span className="gradient-text">Let&apos;s print it.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="#quote" variant="primary">
              Upload Your Model
            </Button>
            <Button href="#faq" variant="outline">
              Contact Us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
