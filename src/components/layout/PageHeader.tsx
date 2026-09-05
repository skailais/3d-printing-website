"use client";

import { motion } from "framer-motion";
import { InkWash } from "@/components/art/InkWash";
import { VerticalLabel } from "@/components/art/VerticalLabel";
import { BrushStroke } from "@/components/art/BrushStroke";

export function PageHeader({
  index,
  eyebrow,
  title,
  intro,
}: {
  index: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  const words = title.split(" ");

  return (
    <header className="ink-panel relative overflow-hidden pb-40 pt-40 sm:pt-48">
      <InkWash pigment="jade" size={640} style={{ top: "-14rem", left: "-10rem" }} />
      <InkWash pigment="vermilion" size={520} style={{ bottom: "-12rem", right: "-8rem" }} />

      <div className="relative mx-auto flex max-w-[86rem] gap-10 px-6 lg:px-10">
        <div className="hidden shrink-0 pt-2 lg:block">
          <VerticalLabel tone="paper">{eyebrow}</VerticalLabel>
        </div>

        <div className="max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.62rem] tracked-label text-vermilion-bright">
              {index}
            </span>
            <span className="h-px w-16 bg-paper/25" />
            <span className="font-mono text-[0.62rem] tracked-label text-paper/45 lg:hidden">
              {eyebrow}
            </span>
          </div>

          <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-6xl md:text-7xl">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="mr-[0.28em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <div className="mt-6 h-4 w-52">
            <BrushStroke variant="swash" color="rgba(225,90,60,0.85)" className="h-full w-full" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-[1.02rem] leading-relaxed text-paper/65"
          >
            {intro}
          </motion.p>
        </div>
      </div>

      {/* the wet edge where the ink stops and the paper begins */}
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[4.5rem] w-full"
      >
        <path
          d="M0,96 V54 C120,34 210,62 320,58 C452,53 520,26 640,32 C762,38 826,72 950,68 C1064,64 1130,34 1240,36 C1330,38 1380,54 1440,46 V96 Z"
          fill="var(--paper)"
        />
      </svg>
    </header>
  );
}
