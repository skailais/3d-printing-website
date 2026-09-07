"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Enso } from "@/components/art/Enso";
import { BrushStroke } from "@/components/art/BrushStroke";
import { BlossomBranch } from "@/components/art/BlossomBranch";
import { InkWash } from "@/components/art/InkWash";
import { principles } from "@/lib/data";

export default function StudioContent() {
  return (
    <>
      {/* opening statement, set beside a large ensō */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <InkWash pigment="gold" size={520} style={{ top: "-8rem", left: "-10rem" }} />

        <div className="mx-auto grid max-w-[86rem] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <div>
              <span className="font-mono text-[0.62rem] tracked-label text-vermilion">
                The idea
              </span>
              <p className="mt-7 font-display text-3xl font-medium leading-[1.4] tracking-tight text-body sm:text-[2.4rem]">
                A printer is a brush. The file is only the intention — what
                matters is the hand that sets it down.
              </p>
              <div className="mt-8 h-5 w-48">
                <BrushStroke variant="swash" color="var(--stroke)" className="h-full w-full" opacity={0.8} />
              </div>
              <p className="mt-8 max-w-lg text-[1rem] leading-relaxed text-body-muted">
                We started with one machine in a back room and a stubborn dislike
                of parts that arrive looking like they were made by an accident.
                Everything since has been an argument for care: fewer jobs,
                better finished, delivered when we said.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative mx-auto h-[24rem] w-[24rem] sm:h-[30rem] sm:w-[30rem]">
              <motion.div
                initial={{ rotate: -6, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Enso className="h-full w-full" color="var(--stroke)" strokeWidth={6} />
              </motion.div>
              {/* a branch coming into flower across the circle */}
              <div className="absolute -bottom-6 -left-10 w-[112%]">
                <BlossomBranch className="h-auto w-full" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* principles */}
      <section className="ink-panel relative overflow-hidden py-24 sm:py-32">
        <InkWash pigment="jade" size={560} style={{ bottom: "-14rem", right: "-8rem" }} />

        <div className="relative mx-auto max-w-[86rem] px-6 lg:px-10">
          <h2 className="font-mono text-[0.62rem] tracked-label text-vermilion-bright">
            How we work
          </h2>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            {principles.map((p, i) => (
              <RevealItem key={p.title}>
                <div className="border-t border-paper/20 pt-8">
                  <span className="font-mono text-[0.58rem] tracked-label text-paper/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-paper">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-paper/60">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* contact */}
      <section className="relative py-24 sm:py-32" aria-labelledby="studio-contact">
        <div className="mx-auto max-w-[86rem] px-6 lg:px-10">
          <h2 id="studio-contact" className="sr-only">
            Contact the studio
          </h2>
          <div className="grid grid-cols-1 gap-12 border-t border-rule pt-12 md:grid-cols-3">
            <Reveal>
              <div>
                <h3 className="font-mono text-[0.58rem] tracked-label text-body-faint">Write</h3>
                <a
                  href="mailto:studio@caliprint.example.com"
                  className="ink-link mt-5 inline-block font-display text-2xl text-body transition-colors hover:text-vermilion"
                >
                  studio@caliprint.example.com
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div>
                <h3 className="font-mono text-[0.58rem] tracked-label text-body-faint">Visit</h3>
                <p className="mt-5 font-display text-2xl leading-snug text-body">
                  By appointment,
                  <br />
                  Mon – Fri, 9 – 18
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div>
                <h3 className="font-mono text-[0.58rem] tracked-label text-body-faint">Lead time</h3>
                <p className="mt-5 font-display text-2xl leading-snug text-body">
                  24 – 72 hours
                  <br />
                  for most parts
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
