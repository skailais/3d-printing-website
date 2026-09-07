"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Seal } from "@/components/art/Seal";
import { InkPlate } from "@/components/art/InkPlate";
import { Reveal } from "@/components/ui/Reveal";
import { InkWash } from "@/components/art/InkWash";
import { steps } from "@/lib/data";

export default function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <InkWash pigment="jade" size={520} style={{ top: "18%", right: "-10rem" }} />
      <InkWash pigment="vermilion" size={420} style={{ bottom: "8%", left: "-8rem" }} />

      <div ref={ref} className="relative mx-auto max-w-[70rem] px-6 lg:px-10">
        {/* the brush line that fills as you scroll */}
        <div className="absolute left-[2.05rem] top-4 hidden h-[calc(100%-6rem)] w-px bg-rule sm:block">
          <motion.span
            style={{ scaleY, originY: 0 }}
            className="absolute inset-0 block w-px bg-vermilion"
          />
        </div>

        <ol className="space-y-20 sm:space-y-28">
          {steps.map((step, i) => (
            <li key={step.index}>
              <Reveal y={34}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-10">
                  <div className="sm:col-span-2">
                    <Seal size={54} rotate={i % 2 === 0 ? -5 : 4}>
                      {step.index}
                    </Seal>
                  </div>

                  <div className="sm:col-span-6">
                    <h2 className="font-display text-3xl font-semibold tracking-tight text-body sm:text-4xl">
                      {step.title}
                    </h2>
                    <p className="mt-5 text-[1.02rem] leading-relaxed text-body-soft">
                      {step.description}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-body-muted">
                      {step.detail}
                    </p>
                  </div>

                  {/* a plate for the step, painted in that step's pigment */}
                  <div className="hidden sm:col-span-4 sm:block">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.94 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="ml-auto h-40 w-40 lg:h-48 lg:w-48"
                    >
                      <InkPlate scene={step.scene} pigment={step.pigment} className="h-full w-full" />
                    </motion.div>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
