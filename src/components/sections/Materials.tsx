"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { materials } from "@/lib/data";

export default function Materials() {
  return (
    <section id="materials" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Materials"
          title="A material for every part."
          subtitle="Strength, flexibility, detail or heat resistance — matched to your use case."
        />

        <RevealGroup className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {materials.map((m) => (
            <RevealItem key={m.name}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex h-32 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-bg-elevated p-5"
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120px circle at 50% 0%, var(--accent-soft), transparent 70%)",
                  }}
                />
                <span className="relative font-display text-base font-semibold tracking-tight">
                  {m.name}
                </span>
                <div className="relative flex flex-wrap gap-1.5">
                  {m.traits.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border-strong px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wide text-text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
