"use client";

import { motion } from "framer-motion";

/** Specks flicked off a loaded brush. Fixed positions, so it never reshuffles. */
const specks = [
  { x: 12, y: 26, r: 2.6, o: 0.5 },
  { x: 34, y: 12, r: 1.4, o: 0.34 },
  { x: 58, y: 34, r: 3.4, o: 0.42 },
  { x: 76, y: 16, r: 1.1, o: 0.28 },
  { x: 22, y: 58, r: 1.9, o: 0.36 },
  { x: 88, y: 52, r: 2.2, o: 0.3 },
  { x: 46, y: 72, r: 1.3, o: 0.25 },
  { x: 68, y: 86, r: 2.8, o: 0.22 },
  { x: 6, y: 84, r: 1.6, o: 0.2 },
  { x: 94, y: 76, r: 1.2, o: 0.18 },
];

export function Splatter({
  className = "",
  color = "var(--ink)",
  animate = true,
}: {
  className?: string;
  color?: string;
  animate?: boolean;
}) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      {specks.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={color}
          initial={animate ? { opacity: 0, scale: 0 } : false}
          whileInView={animate ? { opacity: s.o, scale: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.5 + i * 0.05, ease: [0.34, 1.4, 0.64, 1] }}
          style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          opacity={animate ? undefined : s.o}
        />
      ))}
    </svg>
  );
}
