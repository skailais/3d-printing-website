"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { InkPlate } from "@/components/art/InkPlate";
import { services } from "@/lib/data";

export default function ServicesList() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        <ul className="border-t border-rule">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal y={30}>
                <motion.article
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="group relative grid grid-cols-1 items-start gap-8 border-b border-rule py-12 md:grid-cols-12 md:gap-10 md:py-16"
                >
                  <motion.span
                    aria-hidden="true"
                    variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                    transition={{ duration: 0.6 }}
                    className="pointer-events-none absolute inset-x-[-2rem] inset-y-0 -z-10"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(196,69,45,0.07), rgba(29,107,102,0.05) 60%, transparent)",
                    }}
                  />

                  <div className="flex items-baseline gap-5 md:col-span-3">
                    <span className="font-mono text-[0.62rem] tracked-label text-vermilion">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-3xl font-semibold tracking-tight text-body transition-colors duration-500 group-hover:text-vermilion sm:text-4xl">
                      {s.title}
                    </h2>
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-[1.02rem] leading-relaxed text-body-soft">
                      {s.description}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-body-muted">
                      {s.detail}
                    </p>
                  </div>

                  {/* stacked on wide screens: side by side, the column is too
                      narrow and every value wraps mid-figure */}
                  <dl className="flex gap-10 md:col-span-2 md:flex-col md:gap-5">
                    {s.specs.map((spec) => (
                      <div key={spec.label}>
                        <dt className="font-mono text-[0.55rem] tracked-label text-body-faint">
                          {spec.label}
                        </dt>
                        <dd className="mt-2 font-display text-base text-body">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="md:col-span-2 md:justify-self-end">
                    <motion.div
                      variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: -4, scale: 1.05 } }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      style={{ willChange: "transform" }}
                      className="h-24 w-24 opacity-80"
                    >
                      <InkPlate scene={s.scene} pigment={s.pigment} className="h-full w-full" />
                    </motion.div>
                  </div>
                </motion.article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
