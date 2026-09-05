"use client";

import { motion } from "framer-motion";
import { InkLandscape } from "@/components/art/InkLandscape";
import { VerticalLabel } from "@/components/art/VerticalLabel";

/**
 * A full-bleed painted band between sections — the site's one moment of
 * pure landscape, with a line of copy hung over it.
 */
export default function LandscapeBand() {
  return (
    <section className="relative overflow-hidden">
      <InkLandscape className="h-[62vh] min-h-[26rem] w-full" />

      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="mx-auto flex w-full max-w-[86rem] items-center gap-10 px-6 lg:px-10">
          <div className="hidden lg:block">
            <VerticalLabel>Layer by layer</VerticalLabel>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md font-display text-2xl leading-[1.5] tracking-tight text-ink sm:text-[1.75rem]"
          >
            A part is built the way a range is drawn — one stroke at a time,
            each one committed.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
