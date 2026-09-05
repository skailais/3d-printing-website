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
}: {
  item: WorkItem;
  index: number;
  className?: string;
  tall?: boolean;
}) {
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

        <span className="absolute left-5 top-5 font-mono text-[0.58rem] tracked-label text-ink-faint">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative border-t border-rule p-6">
        <span className="font-mono text-[0.58rem] tracked-label text-vermilion">
          {item.category}
        </span>
        <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-ink transition-colors duration-500 group-hover:text-vermilion">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.note}</p>
      </div>
    </motion.article>
  );
}
