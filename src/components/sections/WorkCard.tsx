"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { InkPlate } from "@/components/art/InkPlate";
import type { WorkItem } from "@/lib/data";

export function WorkCard({
  item,
  index,
  className,
  tall = false,
  headingLevel = 3,
}: {
  item: WorkItem;
  index: number;
  className?: string;
  tall?: boolean;
  /** 3 under a section heading, 2 on the gallery page where the cards sit
   *  directly beneath the page h1. */
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={clsx(
        "paper-card group relative flex h-full flex-col overflow-hidden",
        className
      )}
    >
      <div className={clsx("relative overflow-hidden", tall ? "aspect-[4/5]" : "aspect-[5/4]")}>
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          /* own layer, so scaling composites the already-filtered plate rather
             than re-running the turbulence filter every frame */
          style={{ willChange: "transform" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <InkPlate scene={item.scene} pigment={item.pigment} className="h-[96%] w-[96%]" />
        </motion.div>

        <motion.span
          aria-hidden="true"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 110%, rgba(22,19,15,0.16), transparent 60%)",
          }}
        />

        <span className="absolute left-5 top-5 font-mono text-[0.58rem] tracked-label text-body-faint">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative border-t border-rule p-6">
        <span className="font-mono text-[0.58rem] tracked-label text-vermilion">
          {item.category}
        </span>
        <Heading className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-body transition-colors duration-500 group-hover:text-vermilion">
          {item.title}
        </Heading>
        <p className="mt-2 text-sm leading-relaxed text-body-muted">{item.note}</p>
      </div>
    </motion.article>
  );
}
