"use client";

import { motion } from "framer-motion";
import { Enso } from "@/components/art/Enso";
import { InkWash } from "@/components/art/InkWash";
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
      {/* the paper tears away at the top and the ink begins */}
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[4.5rem] w-full"
      >
        <path
          d="M0,0 H1440 V44 C1330,58 1268,30 1160,34 C1042,38 986,70 866,66 C742,62 686,28 566,32 C452,36 392,66 278,62 C170,58 104,32 0,42 Z"
          fill="var(--surface)"
        />
      </svg>
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
