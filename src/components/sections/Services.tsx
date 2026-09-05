"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Every method. One workflow."
          subtitle="From single prototypes to production runs — pick the process that fits."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <RevealItem key={s.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="card-surface group relative h-full overflow-hidden rounded-2xl p-7 transition-colors duration-300 hover:border-accent/40"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, var(--accent-soft), transparent)" }}
                />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-border text-accent transition-colors duration-300 group-hover:border-accent/50">
                  <ServiceIcon icon={s.icon} />
                </div>
                <h3 className="relative mt-5 font-display text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-text-muted">
                  {s.description}
                </p>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
