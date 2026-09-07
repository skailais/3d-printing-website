"use client";

import { useId } from "react";
import { motion } from "framer-motion";

const shapes = {
  /* a fast horizontal swash — thick belly, dry tapered ends */
  swash:
    "M6,26 C90,10 210,6 330,12 C450,18 560,30 700,22 C820,15 900,8 994,18 C900,34 780,40 660,36 C520,31 400,24 280,28 C190,31 90,36 6,26 Z",
  /* a heavier band for section rules */
  band: "M0,20 C120,4 240,32 380,18 C520,4 620,30 760,20 C860,13 930,26 1000,16 L1000,30 C930,42 860,30 760,36 C620,45 520,22 380,34 C240,46 120,20 0,34 Z",
  /* a vertical drip / brush column */
  column:
    "M20,0 C28,80 12,160 22,250 C30,330 14,410 24,500 C30,560 18,600 22,640 C10,600 4,540 8,470 C12,380 6,300 10,210 C14,120 8,60 20,0 Z",
} as const;

const viewBoxes = {
  swash: "0 0 1000 46",
  band: "0 0 1000 48",
  column: "0 0 32 640",
} as const;

export function BrushStroke({
  variant = "swash",
  color = "var(--stroke)",
  className = "",
  animate = true,
  opacity = 1,
}: {
  variant?: keyof typeof shapes;
  color?: string;
  className?: string;
  animate?: boolean;
  opacity?: number;
}) {
  const id = useId().replace(/:/g, "");
  const filterId = `brush-${id}`;
  const clipId = `brush-clip-${id}`;

  return (
    <svg
      viewBox={viewBoxes[variant]}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <filter id={filterId} x="-10%" y="-40%" width="120%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.12" numOctaves="3" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <clipPath id={clipId}>
          <motion.rect
            x="0"
            y="0"
            height="100%"
            initial={animate ? { width: "0%" } : { width: "100%" }}
            whileInView={animate ? { width: "100%" } : undefined}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <path d={shapes[variant]} fill={color} filter={`url(#${filterId})`} opacity={opacity} />
      </g>
    </svg>
  );
}
