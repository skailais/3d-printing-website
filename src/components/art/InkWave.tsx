"use client";

import { useId } from "react";

/**
 * A breaking wave with curling foam fingers — used as the wet seam between a
 * paper section and an ink one, so the two grounds meet in a gesture rather
 * than a straight rule.
 */
export function InkWave({
  className = "",
  color = "var(--ink)",
  flip = false,
}: {
  className?: string;
  color?: string;
  flip?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const rough = `wave-${id}`;

  return (
    <svg
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      className={className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      aria-hidden="true"
    >
      <defs>
        <filter id={rough} x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.05" numOctaves="4" seed="6" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      <g filter={`url(#${rough})`} fill={color}>
        {/* the body of the swell */}
        <path d="M0,160 L0,96 C120,64 232,52 352,72 C470,92 546,140 664,132 C786,124 848,58 968,44 C1084,30 1160,74 1274,92 C1348,104 1400,102 1440,88 L1440,160 Z" />
        {/* the crest, a shade darker */}
        <path
          d="M968,44 C1010,40 1046,50 1078,68 C1042,60 1004,58 968,64 C930,70 898,86 866,106 C894,74 926,50 968,44 Z"
          opacity="0.75"
        />
        {/* foam fingers thrown off the crest */}
        <g opacity="0.55">
          <path d="M940,40 C948,26 962,16 980,12 C966,22 954,30 946,42 Z" />
          <path d="M1002,36 C1014,24 1030,18 1048,18 C1032,24 1018,30 1008,40 Z" />
          <path d="M886,66 C892,52 904,40 920,32 C906,46 896,56 892,68 Z" />
        </g>
        {/* a second, smaller swell behind */}
        <path
          d="M0,160 L0,128 C140,112 268,120 392,136 C500,150 566,148 664,140 C560,158 452,160 348,152 C232,143 116,138 0,160 Z"
          opacity="0.45"
        />
      </g>
    </svg>
  );
}
