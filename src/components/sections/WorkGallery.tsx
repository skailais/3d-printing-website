"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WorkCard } from "@/components/sections/WorkCard";
import { work } from "@/lib/data";

const categories = ["All", ...Array.from(new Set(work.map((w) => w.category)))];

export default function WorkGallery() {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? work : work.filter((w) => w.category === active);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        {/* filter rail */}
        <div className="mb-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-rule pb-6">
          {categories.map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`focus-ring relative pb-1 font-mono text-[0.62rem] tracked-label transition-colors ${
                  isActive ? "text-vermilion" : "text-ink-muted hover:text-ink"
                }`}
              >
                {c}
                {isActive && (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute -bottom-[1.6rem] left-0 h-px w-full bg-vermilion"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            );
          })}
          <span className="ml-auto font-mono text-[0.58rem] tracked-label text-ink-faint">
            {shown.length} {shown.length === 1 ? "piece" : "pieces"}
          </span>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((item, i) => (
              <motion.div
                key={item.category + item.title}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={i % 5 === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <WorkCard item={item} index={i} tall={i % 5 !== 0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
