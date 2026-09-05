"use client";

import { motion } from "framer-motion";
import { Enso } from "@/components/art/Enso";
import { InkWash } from "@/components/art/InkWash";
import { InkWave } from "@/components/art/InkWave";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export default function CTASection({
  title = "Have an idea?",
  accent = "Let’s print it.",
  primary = { href: "/quote", label: "Upload Your Model" },
  secondary = { href: "/studio", label: "Talk to the Studio" },
}: {
  title?: string;
  accent?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="ink-panel relative overflow-hidden pb-32 pt-40 sm:pb-40 sm:pt-48">
      {/* the paper breaks into the ink as a wave */}
      <InkWave
        className="absolute inset-x-0 top-0 h-24 w-full sm:h-32"
        color="var(--paper)"
        flip
      />
      <InkWash pigment="vermilion" size={620} style={{ top: "-14rem", left: "50%", marginLeft: "-19rem" }} />
      <InkWash pigment="jade" size={420} style={{ bottom: "-8rem", right: "8%" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 0.22, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2"
      >
        <Enso className="h-full w-full" color="var(--paper)" strokeWidth={4} />
      </motion.div>

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal>
          <h2 className="font-display text-5xl font-semibold leading-[1.06] tracking-tight text-paper sm:text-6xl md:text-7xl">
            {title}
            <br />
            <span className="text-vermilion-bright">{accent}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={primary.href} variant="paper">
              {primary.label}
            </Button>
            <Button
              href={secondary.href}
              variant="outline"
              className="!border-paper/30 !text-paper hover:!border-vermilion-bright hover:!text-vermilion-bright"
            >
              {secondary.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
