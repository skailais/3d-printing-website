"use client";

import { useId } from "react";
import { motion } from "framer-motion";

/**
 * Ensō — the single-breath brush circle. Drawn as three overlapping arcs of
 * decreasing weight so the stroke tapers like a loaded brush running dry,
 * then roughened with a displacement filter to read as ink on paper.
 */
export function Enso({
  className = "",
  color = "var(--stroke)",
  draw = true,
  strokeWidth = 7,
}: {
  className?: string;
  color?: string;
  draw?: boolean;
  strokeWidth?: number;
}) {
  const id = useId().replace(/:/g, "");
  const filterId = `enso-rough-${id}`;

  /* Centred on (110,110) with r=88 so the whole ring stays inside the 220
     viewBox — an earlier version put the centre at (75,80) and the top-left
     third was clipped away by the viewport. The stroke runs 320°, leaving the
     dry gap at the top where the brush lifts. */
  const arcs = [
    { d: "M 160.5 37.9 A 88 88 0 1 1 102.3 22.3", width: strokeWidth, opacity: 0.95 },
    { d: "M 157.6 41.6 A 84 84 0 1 1 106 26.4", width: strokeWidth * 0.5, opacity: 0.45 },
    { d: "M 102.3 22.3 A 88 88 0 0 1 128 26.2", width: strokeWidth * 0.28, opacity: 0.3 },
  ];

  return (
    <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        {arcs.map((arc, i) => (
          <motion.path
            key={i}
            d={arc.d}
            stroke={color}
            strokeWidth={arc.width}
            strokeLinecap="round"
            opacity={arc.opacity}
            initial={draw ? { pathLength: 0 } : false}
            animate={draw ? { pathLength: 1 } : undefined}
            transition={{
              duration: 1.9,
              delay: 0.15 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </g>
    </svg>
  );
}
