"use client";

import { useId } from "react";

/**
 * A standing range — three ridgelines with mist between them. Unlike
 * InkLandscape this one does not parallax, so it can sit inside a header or
 * a card without owning a scroll listener.
 */
export function InkRidges({
  className = "",
  tone = "ink",
}: {
  className?: string;
  /** "paper" draws pale ridges for use on the ink ground. */
  tone?: "ink" | "paper";
}) {
  const id = useId().replace(/:/g, "");
  const rough = `ridges-${id}`;
  const soft = `ridges-soft-${id}`;
  const stroke = tone === "paper" ? "var(--paper)" : "var(--ink)";
  const mist = tone === "paper" ? "var(--ink)" : "var(--paper)";

  const layers = [
    {
      d: "M0,168 C60,140 104,104 156,72 C196,48 232,54 266,84 C300,114 338,136 384,124 C430,112 466,78 516,90 C554,99 584,122 620,140 L640,148 L640,220 L0,220 Z",
      opacity: tone === "paper" ? 0.1 : 0.16,
    },
    {
      d: "M0,196 C48,178 96,150 148,126 C192,106 236,112 274,138 C312,164 356,182 402,170 C446,159 480,130 528,140 C568,148 604,170 640,182 L640,220 L0,220 Z",
      opacity: tone === "paper" ? 0.16 : 0.3,
    },
    {
      d: "M0,220 C56,206 112,188 172,178 C224,169 274,178 320,194 C362,208 410,214 460,206 C512,198 566,188 640,196 L640,240 L0,240 Z",
      opacity: tone === "paper" ? 0.26 : 0.6,
    },
  ];

  return (
    <svg viewBox="0 0 640 220" preserveAspectRatio="none" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id={rough} x="-5%" y="-15%" width="110%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.04" numOctaves="3" seed="19" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={soft} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <g filter={`url(#${rough})`} fill={stroke}>
        {layers.map((l, i) => (
          <path key={i} d={l.d} opacity={l.opacity} />
        ))}
      </g>

      <g filter={`url(#${soft})`} fill={mist} opacity={tone === "paper" ? 0.28 : 0.5}>
        <ellipse cx="220" cy="182" rx="220" ry="7" />
        <ellipse cx="470" cy="200" rx="200" ry="6" />
      </g>
    </svg>
  );
}
