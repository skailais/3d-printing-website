"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

/**
 * A hanging vertical caption with a thin rule above and below — the device
 * from the temple reference, adapted as a section marker.
 */
export function VerticalLabel({
  children,
  className,
  tone = "ink",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "ink" | "paper" | "vermilion";
}) {
  const color =
    tone === "paper" ? "text-paper/70" : tone === "vermilion" ? "text-vermilion" : "text-ink-muted";
  const rule =
    tone === "paper" ? "bg-paper/30" : tone === "vermilion" ? "bg-vermilion/50" : "bg-rule-strong";

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={clsx("flex flex-col items-center gap-4", className)}
    >
      <span className={clsx("h-14 w-px", rule)} />
      <span className={clsx("vertical-label font-mono text-[0.62rem]", color)}>{children}</span>
      <span className={clsx("h-14 w-px", rule)} />
    </motion.div>
  );
}
