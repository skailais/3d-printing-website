"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WorkCard } from "@/components/sections/WorkCard";
import { work } from "@/lib/data";

export default function WorkPreview() {
  const featured = work.slice(0, 3);

  return (
    <section className="relative bg-surface-deep/60 py-28 sm:py-36">
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        <SectionHeading
          eyebrow="Selected work"
          title="What left the studio this month."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((item, i) => (
            <Reveal key={item.category} delay={i * 0.1}>
              <WorkCard item={item} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex justify-center">
            <Link
              href="/work"
              className="group inline-flex items-center gap-3 font-display text-2xl text-body transition-colors hover:text-vermilion"
            >
              See the full gallery
              <motion.span
                aria-hidden="true"
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 6 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
