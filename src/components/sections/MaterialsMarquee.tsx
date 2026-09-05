"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { materials } from "@/lib/data";

export default function MaterialsMarquee() {
  const row = [...materials, ...materials];

  return (
    <section className="relative overflow-hidden border-y border-rule py-20">
      <Reveal>
        <div className="mb-10 flex items-center justify-center gap-4 px-6">
          <span className="h-px w-10 bg-vermilion" aria-hidden="true" />
          <h2 className="font-mono text-[0.62rem] tracked-label text-vermilion">
            Materials
          </h2>
          <span className="h-px w-10 bg-vermilion" aria-hidden="true" />
        </div>
      </Reveal>

      <div className="group relative flex overflow-hidden">
        <div className="flex min-w-full shrink-0 animate-[marquee_36s_linear_infinite] items-center gap-14 pr-14 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {row.map((m, i) => (
            <Link
              key={`${m.name}-${i}`}
              href="/materials"
              className="flex shrink-0 items-baseline gap-4 font-display text-4xl font-medium tracking-tight text-ink/75 transition-colors duration-300 hover:text-vermilion sm:text-5xl"
            >
              {m.name}
              <span className="font-mono text-[0.55rem] tracked-label text-ink-faint">
                {m.traits[0]}
              </span>
            </Link>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex min-w-full shrink-0 animate-[marquee_36s_linear_infinite] items-center gap-14 pr-14 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        >
          {row.map((m, i) => (
            <span
              key={`ghost-${m.name}-${i}`}
              className="flex shrink-0 items-baseline gap-4 font-display text-4xl font-medium tracking-tight text-ink/75 sm:text-5xl"
            >
              {m.name}
              <span className="font-mono text-[0.55rem] tracked-label text-ink-faint">
                {m.traits[0]}
              </span>
            </span>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent" />
      </div>
    </section>
  );
}
