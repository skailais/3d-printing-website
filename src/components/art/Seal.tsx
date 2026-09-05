"use client";

import { useId } from "react";
import { clsx } from "clsx";

/**
 * A vermilion seal block — used for step numbers, callouts and the mark in the
 * wordmark. Edges are roughened so it reads as stamped pigment, not a div.
 */
export function Seal({
  children,
  className,
  size = 46,
  rotate = -4,
}: {
  children: React.ReactNode;
  className?: string;
  size?: number;
  rotate?: number;
}) {
  const id = useId().replace(/:/g, "");
  const filterId = `seal-${id}`;

  return (
    <span
      className={clsx("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}
    >
      <svg
        viewBox="0 0 48 48"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId} x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="5" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="4"
          fill="var(--vermilion)"
          filter={`url(#${filterId})`}
        />
      </svg>
      <span
        className="relative font-display font-semibold leading-none text-paper-warm"
        style={{ fontSize: size * 0.4 }}
      >
        {children}
      </span>
    </span>
  );
}

/**
 * An abstract carved mark for the seal — drawn rather than typeset, so it
 * renders identically everywhere and needs no additional font subset.
 */
export function SealGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.1" strokeLinecap="square">
        <path d="M5 6h14" />
        <path d="M12 6v12" />
        <path d="M6 12h5" />
        <path d="M13 12h5" />
        <path d="M6 18h5" />
      </g>
    </svg>
  );
}
