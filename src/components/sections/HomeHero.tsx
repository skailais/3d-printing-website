"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Enso } from "@/components/art/Enso";
import { MoonWindow } from "@/components/art/MoonWindow";
import { InkWash } from "@/components/art/InkWash";
import { BrushStroke } from "@/components/art/BrushStroke";
import { Splatter } from "@/components/art/Splatter";
import { Seal, SealGlyph } from "@/components/art/Seal";
import { Button } from "@/components/ui/Button";

const line = ["Ideas,", "made", "solid."];

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Scroll-linked values sit outside MotionConfig's reach, so the parallax is
     flattened by hand when reduced motion is asked for. */
  const reduce = useReducedMotion();

  const ensoY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const ensoRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 14]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-14%"]);
  const washY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "40%"]);

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

      {/* the painted panel: a landscape seen through the ensō */}
      <motion.div
        style={{ y: ensoY, rotate: ensoRotate }}
        /* only from lg — at tablet widths a 34rem ring lands on top of the
           subtitle and swallows it */
        className="pointer-events-none absolute right-4 top-1/2 hidden h-[30rem] w-[30rem] -translate-y-1/2 lg:block lg:right-8 xl:right-16 xl:h-[38rem] xl:w-[38rem]"
      >
        <MoonWindow className="absolute inset-0 h-full w-full" />
        <Enso className="absolute inset-0 h-full w-full" color="var(--ink)" strokeWidth={5} />

        {/* specks flicked off the brush as it left the paper */}
        <Splatter className="absolute -right-[4%] top-[6%] h-40 w-40" color="var(--ink)" />

        <div className="absolute right-[6%] top-[12%]">
          <Seal size={46} rotate={-7}>
            <SealGlyph className="h-5 w-5" />
          </Seal>
        </div>
      </motion.div>

      {/* below lg the gesture drops into the corner rather than behind the type */}
      <div className="pointer-events-none absolute -right-14 bottom-[-3rem] h-[19rem] w-[19rem] opacity-50 sm:h-[24rem] sm:w-[24rem] lg:hidden">
        <MoonWindow className="absolute inset-0 h-full w-full" />
        <Enso className="absolute inset-0 h-full w-full" color="var(--ink)" strokeWidth={6} />
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
