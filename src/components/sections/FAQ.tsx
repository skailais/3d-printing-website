"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/data";

function FaqRow({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="focus-ring flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-medium tracking-tight sm:text-lg">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-strong text-text-muted"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 text-sm leading-relaxed text-text-muted">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Good to know." />

        <Reveal delay={0.1} className="mt-14">
          {faqs.map((f, i) => (
            <FaqRow
              key={f.question}
              question={f.question}
              answer={f.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
