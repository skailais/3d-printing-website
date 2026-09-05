"use client";

import { useId } from "react";

const pigmentColor = {
  jade: "var(--jade)",
  vermilion: "var(--vermilion)",
  gold: "var(--gold)",
  ink: "var(--ink)",
} as const;

/**
 * A generated sumi-e "plate" standing in for a photograph: a few brush gestures
 * composed differently per variant, washed with one pigment. Deterministic, so
 * a given card always draws the same picture.
 */
export function InkPlate({
  variant = 0,
  pigment = "ink",
  className = "",
}: {
  variant?: number;
  pigment?: keyof typeof pigmentColor;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const rough = `plate-rough-${id}`;
  const soft = `plate-soft-${id}`;
  const color = pigmentColor[pigment];
  const v = variant % 4;

  return (
    <svg viewBox="0 0 320 320" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id={rough} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.09" numOctaves="4" seed={v + 2} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="11" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={soft} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      {/* diluted wash behind the gesture */}
      <ellipse
        cx={v % 2 === 0 ? 190 : 130}
        cy={v < 2 ? 130 : 190}
        rx="92"
        ry="78"
        fill={color}
        opacity="0.14"
        filter={`url(#${soft})`}
      />

      <g filter={`url(#${rough})`} fill={color}>
        {v === 0 && (
          <>
            <path d="M40 214 C90 150 140 120 210 96 C232 88 258 84 282 88 C258 100 232 106 210 116 C146 144 100 178 56 232 Z" opacity="0.92" />
            <path d="M62 250 C110 224 150 214 196 210 C168 226 132 240 96 258 Z" opacity="0.6" />
            <circle cx="246" cy="72" r="9" opacity="0.8" />
          </>
        )}
        {v === 1 && (
          <>
            <path d="M96 40 C110 110 106 178 122 268 C126 288 122 296 112 292 C100 240 96 168 84 96 C80 66 84 44 96 40 Z" opacity="0.9" />
            <path d="M150 84 C162 140 158 196 168 258 C170 274 166 280 158 276 C150 228 148 172 140 118 C136 96 140 82 150 84 Z" opacity="0.55" />
            <path d="M198 132 C208 172 206 212 214 250 C216 262 212 266 206 262 C200 228 198 190 192 156 C190 142 192 130 198 132 Z" opacity="0.32" />
          </>
        )}
        {v === 2 && (
          <>
            <path d="M52 168 C92 96 168 62 246 84 C214 88 176 96 148 120 C118 146 100 190 92 246 C86 224 72 194 52 168 Z" opacity="0.88" />
            <path d="M170 190 C204 176 240 178 268 196 C238 194 208 198 182 212 Z" opacity="0.5" />
            <rect x="228" y="234" width="34" height="34" rx="3" opacity="0.75" />
          </>
        )}
        {v === 3 && (
          <>
            <path d="M64 96 C136 74 208 82 268 118 C210 110 150 108 96 124 C82 128 68 116 64 96 Z" opacity="0.9" />
            <path d="M76 168 C142 152 206 158 258 186 C204 180 150 180 100 192 C86 196 76 186 76 168 Z" opacity="0.62" />
            <path d="M88 240 C144 228 196 232 240 252 C196 248 148 250 106 258 C94 260 88 252 88 240 Z" opacity="0.38" />
          </>
        )}
      </g>
    </svg>
  );
}
