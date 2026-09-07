"use client";

import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { stats } from "@/lib/data";

export default function StatsBand() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
        <RevealGroup className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <div className="group h-full bg-surface px-8 py-12 transition-colors duration-500 hover:bg-surface-warm">
                <span className="block font-display text-5xl font-semibold tracking-tight text-body transition-colors duration-500 group-hover:text-vermilion sm:text-6xl">
                  {s.value}
                </span>
                <span className="mt-5 block font-mono text-[0.6rem] tracked-label text-body-soft">
                  {s.label}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-body-muted">
                  {s.note}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
