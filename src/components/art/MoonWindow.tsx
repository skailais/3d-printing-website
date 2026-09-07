"use client";

import { useId } from "react";
import { motion } from "framer-motion";

/**
 * A landscape seen through the ensō, the way a garden is framed by a round
 * window: pale ranges, a low disc, mist lying in the valleys, a pine bough
 * reaching in from the rim, and two birds. Everything is clipped to the
 * circle, so the ring reads as an opening rather than a decoration.
 */
export function MoonWindow({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const clip = `window-clip-${id}`;
  const rough = `window-rough-${id}`;
  const soft = `window-soft-${id}`;

  return (
    <svg viewBox="0 0 220 220" fill="none" className={`sumi-art ${className}`} aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <circle cx="110" cy="110" r="84" />
        </clipPath>
        <filter id={rough} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.08" numOctaves="3" seed="14" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={soft} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <motion.g
        clipPath={`url(#${clip})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.1, ease: "easeOut" }}
      >
        {/* the disc, low and pale behind everything */}
        <circle cx="134" cy="86" r="24" fill="var(--vermilion)" opacity="0.18" filter={`url(#${soft})`} />
        <circle cx="134" cy="86" r="24" fill="var(--vermilion)" opacity="0.1" />

        <g filter={`url(#${rough})`}>
          {/* far range */}
          <path
            d="M20,132 C38,116 52,96 70,80 C82,69 94,72 104,86 C114,100 126,112 142,104 C156,97 166,82 182,90 C190,94 196,102 202,110 L202,196 L20,196 Z"
            fill="var(--stroke)"
            opacity="0.16"
          />
          {/* middle range */}
          <path
            d="M14,152 C34,138 50,120 70,106 C86,95 100,100 112,116 C124,132 140,142 156,134 C170,127 182,116 198,124 L206,130 L206,200 L14,200 Z"
            fill="var(--stroke)"
            opacity="0.3"
          />
          {/* near bank — a low ridge rather than a heavy mass, or it goes muddy
              over the warm wash behind the ring */}
          <path
            d="M8,186 C34,178 58,166 84,160 C108,154 128,160 148,170 C166,179 186,182 208,178 L214,176 L214,206 L8,206 Z"
            fill="var(--stroke)"
            opacity="0.45"
          />
        </g>

        {/* a jade river threading the valley */}
        <path
          d="M18,158 C48,150 74,152 102,158 C126,163 148,162 172,154 C150,168 126,172 100,168 C72,164 44,164 18,158 Z"
          fill="var(--jade)"
          opacity="0.45"
          filter={`url(#${rough})`}
        />

        {/* mist lying between the ranges */}
        <g filter={`url(#${soft})`} fill="var(--surface-warm)">
          <ellipse cx="96" cy="146" rx="80" ry="6" opacity="0.75" />
          <ellipse cx="140" cy="166" rx="70" ry="5" opacity="0.6" />
        </g>

        {/* a plum branch reaching in from the rim, in flower */}
        <g opacity="0.85">
          <g stroke="var(--stroke)" fill="none" strokeLinecap="round">
            <path d="M208,38 C188,48 170,60 154,76" strokeWidth="2.4" />
            <path d="M182,52 C174,44 165,40 154,40" strokeWidth="1.2" opacity="0.85" />
            <path d="M166,66 C158,61 149,59 140,61" strokeWidth="1" opacity="0.7" />
          </g>
          {[
            { x: 154, y: 40, r: 5 },
            { x: 140, y: 61, r: 4 },
            { x: 190, y: 46, r: 4.4 },
            { x: 168, y: 60, r: 3.2 },
          ].map((b, i) => (
            <g key={i}>
              {[0, 72, 144, 216, 288].map((deg) => (
                <ellipse
                  key={deg}
                  cx={b.x}
                  cy={b.y - b.r * 0.6}
                  rx={b.r * 0.42}
                  ry={b.r * 0.6}
                  fill="var(--surface-warm)"
                  stroke="var(--stroke)"
                  strokeWidth="0.5"
                  transform={`rotate(${deg} ${b.x} ${b.y})`}
                />
              ))}
              <circle cx={b.x} cy={b.y} r={b.r * 0.26} fill="var(--vermilion)" />
            </g>
          ))}
        </g>

        {/* two birds crossing the valley */}
        <g fill="var(--stroke)" opacity="0.5">
          <path d="M0,0 C4,-4 9,-5 13,-1 C17,-5 22,-4 26,0 C20,-2 16,-1 13,2 C10,-1 6,-2 0,0 Z" transform="translate(58 96) scale(0.8)" />
          <path d="M0,0 C4,-4 9,-5 13,-1 C17,-5 22,-4 26,0 C20,-2 16,-1 13,2 C10,-1 6,-2 0,0 Z" transform="translate(80 84) scale(0.55)" opacity="0.7" />
        </g>
      </motion.g>
    </svg>
  );
}
