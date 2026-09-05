"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { InkPlate } from "@/components/art/InkPlate";
import { services } from "@/lib/data";

export default function ServicesPreview() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Six ways to make a thing."
          />
          <Link
            href="/services"
            className="ink-link font-mono text-[0.66rem] tracked-label text-ink-soft transition-colors hover:text-vermilion"
          >
            All services →
          </Link>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <RevealItem key={s.slug}>
              <Link href="/services" className="group block h-full">
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex h-full flex-col justify-between overflow-hidden bg-paper p-8 transition-colors duration-500 group-hover:bg-paper-warm sm:p-10"
                >
                  {/* pigment blooming from the corner on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: "radial-gradient(circle, rgba(196,69,45,0.32), transparent 70%)" }}
                  />
                  {/* a pale gesture watermarking the card */}
                  <motion.span
                    aria-hidden="true"
                    variants={{ rest: { opacity: 0.09, scale: 1 }, hover: { opacity: 0.2, scale: 1.08 } }}
                    className="pointer-events-none absolute -bottom-6 -right-4 h-40 w-40"
                  >
                    <InkPlate scene={s.scene} pigment={s.pigment} className="h-full w-full" ornament />
                  </motion.span>

                  <div className="relative flex items-start justify-between gap-6">
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                      {s.title}
                    </h3>
                    <span className="font-mono text-[0.6rem] text-ink-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="relative mt-20 text-sm leading-relaxed text-ink-muted">
                    {s.description}
                  </p>
                  <span className="relative mt-6 inline-block h-px w-10 bg-ink/25 transition-all duration-500 group-hover:w-20 group-hover:bg-vermilion" />
                </motion.div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
