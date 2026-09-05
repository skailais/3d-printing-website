"use client";

import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stats } from "@/lib/data";

export default function WhyChooseUs() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Why CaliPrint" title="Built for speed and precision." />

        <RevealGroup className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <div className="group flex h-full flex-col justify-center bg-bg px-6 py-12 transition-colors duration-300 hover:bg-bg-elevated">
                <span className="font-display text-4xl font-semibold tracking-tight text-text transition-colors group-hover:text-accent sm:text-5xl">
                  {s.value}
                </span>
                <span className="mt-3 text-sm text-text-muted">{s.label}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
