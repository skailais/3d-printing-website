"use client";

import { motion } from "framer-motion";
import { Seal, SealGlyph } from "@/components/art/Seal";
import { InkWash } from "@/components/art/InkWash";

const words =
  "Every file is a promise of an object. We keep it.".split(" ");

export default function Manifesto() {
  return (
    <section className="ink-panel relative overflow-hidden py-28 sm:py-36">
      <InkWash pigment="jade" size={560} style={{ top: "-10rem", left: "10%" }} />
      <InkWash pigment="vermilion" size={420} style={{ bottom: "-8rem", right: "12%" }} />

      <div className="relative mx-auto max-w-[64rem] px-6 text-center lg:px-10">
        <Seal size={54} className="mb-10">
          <SealGlyph className="h-6 w-6" />
        </Seal>

        <p className="font-display text-3xl font-medium leading-[1.35] tracking-tight text-paper sm:text-4xl md:text-5xl">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0.12 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className="mr-[0.26em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-10 max-w-md text-sm leading-relaxed text-paper/50"
        >
          Ten machines, twelve materials, and one person who follows your part
          from the quote to the box it ships in.
        </motion.p>
      </div>
    </section>
  );
}
