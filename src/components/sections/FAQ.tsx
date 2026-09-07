"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/data";

function Row({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-rule">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="focus-ring group flex w-full items-baseline gap-6 py-7 text-left"
      >
        <span className="font-mono text-[0.58rem] tracked-label text-body-faint">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`flex-1 font-display text-xl tracking-tight transition-colors duration-300 sm:text-2xl ${
            isOpen ? "text-vermilion" : "text-body group-hover:text-vermilion"
          }`}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 text-body-muted"
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-5 w-5">
            <path d="M4 10h12M10 4v12" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-8 pl-12 pr-8 text-[0.95rem] leading-relaxed text-body-muted">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[74rem] px-6 lg:px-10">
        <SectionHeading eyebrow="Questions" title="Good to know." />

        <Reveal delay={0.1}>
          <div className="mt-14 border-t border-rule">
            {faqs.map((f, i) => (
              <Row
                key={f.question}
                index={i}
                question={f.question}
                answer={f.answer}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
