"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Enso } from "@/components/art/Enso";
import { InkWash } from "@/components/art/InkWash";
import { BrushStroke } from "@/components/art/BrushStroke";
import { Seal, SealGlyph } from "@/components/art/Seal";
import { Button } from "@/components/ui/Button";

const line = ["Ideas,", "made", "solid."];

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const ensoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const ensoRotate = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const washY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      <motion.div style={{ y: washY }} className="absolute inset-0">
        <InkWash pigment="jade" size={720} style={{ top: "-16rem", right: "-12rem" }} />
        <InkWash pigment="vermilion" size={460} style={{ bottom: "2rem", left: "-8rem" }} />
        <InkWash pigment="gold" size={380} style={{ top: "35%", left: "42%" }} drift={false} />
      </motion.div>

      {/* the painted panel: ensō crossed by two loaded brush sweeps */}
      <motion.div
        style={{ y: ensoY, rotate: ensoRotate }}
        className="pointer-events-none absolute right-4 top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 md:block lg:right-16 xl:h-[38rem] xl:w-[38rem]"
      >
        <Enso className="absolute inset-0 h-full w-full" color="var(--ink)" strokeWidth={5} />
        <div className="absolute left-[2%] top-[34%] h-20 w-[78%] -rotate-[13deg] opacity-80">
          <BrushStroke variant="swash" color="var(--jade)" className="h-full w-full" />
        </div>
        <div className="absolute bottom-[24%] left-[26%] h-12 w-[52%] rotate-[7deg] opacity-75">
          <BrushStroke variant="swash" color="var(--vermilion)" className="h-full w-full" />
        </div>
        <div className="absolute right-[12%] top-[16%]">
          <Seal size={44} rotate={-7}>
            <SealGlyph className="h-5 w-5" />
          </Seal>
        </div>
      </motion.div>

      {/* on small screens the gesture drops below the type rather than behind it */}
      <div className="pointer-events-none absolute -right-16 bottom-[-3rem] h-[19rem] w-[19rem] opacity-40 md:hidden">
        <Enso className="absolute inset-0 h-full w-full" color="var(--ink)" strokeWidth={7} />
        <div className="absolute left-[4%] top-[38%] h-12 w-[80%] -rotate-[12deg] opacity-80">
          <BrushStroke variant="swash" color="var(--jade)" className="h-full w-full" />
        </div>
      </div>

      {/* left rail */}
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center gap-5"
        >
          <span className="h-20 w-px bg-rule-strong" />
          <span className="vertical-label font-mono text-[0.6rem] text-ink-muted">
            Print Studio
          </span>
          <span className="h-20 w-px bg-rule-strong" />
        </motion.div>
      </div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto w-full max-w-[86rem] px-6 lg:px-10"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-vermilion" />
            <span className="font-mono text-[0.62rem] tracked-label text-vermilion">
              Professional 3D Printing
            </span>
          </motion.div>

          <h1 className="mt-8 font-display text-[3.4rem] font-semibold leading-[0.98] tracking-tight text-ink sm:text-7xl lg:text-[6.2rem]">
            {line.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.05,
                    delay: 0.25 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block ${i === 2 ? "text-vermilion" : ""}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="mt-8 h-5 w-64">
            <BrushStroke variant="swash" color="var(--ink)" className="h-full w-full" opacity={0.9} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-ink-muted"
          >
            Send us a model. Receive the object itself — printed, finished by
            hand, and checked before it leaves the studio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-11 flex flex-col gap-4 sm:flex-row"
          >
            <Button href="/quote" variant="ink">
              Request a Quote
            </Button>
            <Button href="/work" variant="outline">
              See the Work
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="font-mono text-[0.55rem] tracked-label text-ink-faint">Scroll</span>
        <motion.span
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-12 w-px bg-ink/30"
        />
      </motion.div>
    </section>
  );
}
