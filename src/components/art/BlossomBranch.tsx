"use client";

import { useId } from "react";
import { motion } from "framer-motion";

type Bloom = { x: number; y: number; r: number; open: boolean; delay: number };

/* Positions sit on the bough and its shoots — floating them free of the wood
   reads as specks of stray pigment rather than flowers. */
const blooms: Bloom[] = [
  { x: 110, y: 170, r: 12, open: true, delay: 0.1 },
  { x: 88, y: 112, r: 9, open: false, delay: 0.18 },
  { x: 152, y: 146, r: 14, open: true, delay: 0.26 },
  { x: 212, y: 80, r: 11, open: true, delay: 0.36 },
  { x: 248, y: 112, r: 9, open: false, delay: 0.46 },
  { x: 298, y: 114, r: 13, open: true, delay: 0.54 },
  { x: 352, y: 170, r: 10, open: true, delay: 0.64 },
  { x: 388, y: 126, r: 8, open: false, delay: 0.72 },
];

function Flower({ bloom, petal, heart }: { bloom: Bloom; petal: string; heart: string }) {
  const { x, y, r, open } = bloom;
  if (!open) {
    /* a bud: two closed petals with the colour just showing at the tip */
    return (
      <g>
        <ellipse cx={x} cy={y - r * 0.18} rx={r * 0.36} ry={r * 0.52} fill={petal} stroke={heart} strokeWidth="0.6" />
        <circle cx={x} cy={y - r * 0.5} r={r * 0.2} fill={heart} />
      </g>
    );
  }
  return (
    <g>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx={x}
          cy={y - r * 0.62}
          rx={r * 0.44}
          ry={r * 0.62}
          fill={petal}
          transform={`rotate(${deg} ${x} ${y})`}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.24} fill={heart} />
    </g>
  );
}

/**
 * A flowering branch in the manner of the reference plates: a dark wet bough,
 * pale petals, and a vermilion heart in each flower for the one hot accent.
 */
export function BlossomBranch({
  className = "",
  branchColor = "var(--ink)",
  petalColor = "var(--paper-warm)",
  heartColor = "var(--vermilion)",
  animate = true,
}: {
  className?: string;
  branchColor?: string;
  petalColor?: string;
  heartColor?: string;
  animate?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const rough = `branch-${id}`;

  return (
    <svg viewBox="0 0 460 230" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id={rough} x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.08" numOctaves="3" seed="9" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      <g filter={`url(#${rough})`} fill={branchColor}>
        {/* main bough, thick at the cut end and drying out to the tip */}
        <motion.path
          d="M0,214 C58,196 96,178 140,150 C186,120 232,104 288,110 C336,115 382,132 436,120 C392,142 344,140 296,134 C244,128 200,140 158,166 C114,193 62,210 4,222 Z"
          initial={animate ? { pathLength: 0, opacity: 0 } : false}
          whileInView={animate ? { pathLength: 1, opacity: 1 } : undefined}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* two side shoots */}
        <path d="M150,146 C168,120 186,96 214,74 C196,104 180,128 160,152 Z" opacity="0.9" />
        <path d="M300,124 C318,148 340,166 372,180 C340,176 314,158 294,132 Z" opacity="0.8" />
        <path d="M92,172 C86,148 82,124 84,98 C96,124 100,150 100,174 Z" opacity="0.7" />
      </g>

      <g>
        {blooms.map((b, i) => (
          <motion.g
            key={i}
            initial={animate ? { scale: 0, opacity: 0 } : false}
            whileInView={animate ? { scale: 1, opacity: 1 } : undefined}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.6,
              delay: 0.35 + b.delay,
              ease: [0.34, 1.4, 0.64, 1],
            }}
            style={{ transformOrigin: `${b.x}px ${b.y}px` }}
          >
            <Flower bloom={b} petal={petalColor} heart={heartColor} />
          </motion.g>
        ))}
      </g>
    </svg>
  );
}
