"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PortfolioIcon } from "@/components/ui/PortfolioIcon";
import { portfolio } from "@/lib/data";

const sizeClasses = {
  lg: "sm:col-span-2 sm:row-span-2",
  md: "sm:col-span-2 sm:row-span-1",
  sm: "sm:col-span-1 sm:row-span-1",
};

export default function Portfolio() {
  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Selected Work"
          title="Built across every category."
          subtitle="A glimpse at what leaves the printers each week."
        />

        <RevealGroup className="mt-16 grid auto-rows-[160px] grid-cols-1 gap-4 sm:auto-rows-[170px] sm:grid-cols-4 sm:[grid-auto-flow:dense]">
          {portfolio.map((item) => (
            <RevealItem key={item.category} className={sizeClasses[item.size]}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border p-6"
                style={{
                  background:
                    "linear-gradient(150deg, var(--bg-elevated) 0%, var(--bg-elevated-2) 100%)",
                }}
              >
                <div
                  className="absolute inset-0 scale-90 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(200px circle at 80% 20%, var(--accent-soft), transparent 70%)",
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-accent">
                    <PortfolioIcon category={item.category} className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[0.65rem] text-text-faint transition-colors group-hover:text-accent">
                    →
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {item.category}
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">{item.label}</p>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
