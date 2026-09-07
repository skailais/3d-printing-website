"use client";

import { motion } from "framer-motion";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { BrushStroke } from "@/components/art/BrushStroke";
import { materials } from "@/lib/data";

const pigmentInk = {
  jade: "var(--jade)",
  vermilion: "var(--vermilion)",
  gold: "var(--gold)",
  ink: "var(--stroke)",
} as const;

export default function MaterialsGrid() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        <RevealGroup className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((m, i) => (
            <RevealItem key={m.name}>
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group relative flex h-full min-h-[17rem] flex-col justify-between overflow-hidden bg-surface p-8"
              >
                {/* pigment flooding the card from the base */}
                <motion.span
                  aria-hidden="true"
                  variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none absolute inset-0 origin-bottom"
                  style={{
                    background: `linear-gradient(0deg, ${pigmentInk[m.pigment]} -40%, transparent 78%)`,
                    opacity: 0.16,
                  }}
                />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[0.55rem] tracked-label text-body-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      variants={{ rest: { scale: 0.8, opacity: 0.35 }, hover: { scale: 1, opacity: 1 } }}
                      transition={{ duration: 0.5 }}
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: pigmentInk[m.pigment] }}
                    />
                  </div>

                  {/* a swatch of the material, laid down as a brush stroke */}
                  <motion.div
                    variants={{ rest: { scaleX: 0.88, opacity: 0.7 }, hover: { scaleX: 1, opacity: 1 } }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-7 h-10 w-[86%] origin-left"
                  >
                    <BrushStroke
                      variant="swash"
                      color={pigmentInk[m.pigment]}
                      className="h-full w-full"
                      animate={false}
                      opacity={0.85}
                    />
                  </motion.div>
                </div>

                <div className="relative">
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-body">
                    {m.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-body-muted">{m.note}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {m.traits.map((t) => (
                      <span
                        key={t}
                        className="border border-stroke/15 px-2.5 py-1 font-mono text-[0.55rem] tracked-label text-body-soft"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
