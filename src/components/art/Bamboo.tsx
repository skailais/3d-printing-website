"use client";

import { useId } from "react";

type Stalk = {
  x: number;
  width: number;
  opacity: number;
  nodes: number[];
  leaves: { y: number; dir: 1 | -1; scale: number }[];
};

const stalks: Stalk[] = [
  {
    x: 34,
    width: 13,
    opacity: 0.9,
    nodes: [90, 210, 330, 450, 570],
    leaves: [
      { y: 128, dir: 1, scale: 1 },
      { y: 262, dir: -1, scale: 0.82 },
      { y: 398, dir: 1, scale: 0.9 },
    ],
  },
  {
    x: 96,
    width: 9,
    opacity: 0.55,
    nodes: [50, 176, 302, 428, 554],
    leaves: [
      { y: 92, dir: -1, scale: 0.72 },
      { y: 330, dir: 1, scale: 0.66 },
    ],
  },
  {
    x: 146,
    width: 6,
    opacity: 0.3,
    nodes: [120, 250, 380, 510],
    leaves: [{ y: 200, dir: -1, scale: 0.55 }],
  },
];

/** A leaf cluster: three tapered blades springing from one point. */
function Leaves({ x, y, dir, scale }: { x: number; y: number; dir: 1 | -1; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${dir * scale} ${scale})`}>
      <path d="M0,0 C26,-14 58,-24 92,-20 C62,-4 30,6 0,0 Z" />
      <path d="M0,2 C30,6 62,14 86,34 C54,32 24,20 0,2 Z" />
      <path d="M0,-2 C22,-30 46,-52 74,-62 C58,-34 32,-10 0,-2 Z" />
    </g>
  );
}

/**
 * A bamboo stand in three planes of dilution — the near stalk wet and dark,
 * the far ones nearly water. Meant to sit at the edge of a section.
 */
export function Bamboo({
  className = "",
  color = "var(--stroke)",
  rough: roughen = true,
}: {
  className?: string;
  color?: string;
  /** Turn off where the stand is drawn faintly — the broken edge cannot be
   *  seen at low opacity and the filter is not worth paying for. */
  rough?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const rough = `bamboo-${id}`;

  return (
    <svg viewBox="0 0 200 640" fill="none" className={className} aria-hidden="true">
      {roughen && (
        <defs>
          <filter id={rough} x="-20%" y="-6%" width="140%" height="112%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04 0.012" numOctaves="3" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      )}

      <g filter={roughen ? `url(#${rough})` : undefined}>
        {stalks.map((s, i) => (
          <g key={i} fill={color} opacity={s.opacity}>
            {/* the culm, drawn as segments so the nodes read as gaps */}
            <rect x={s.x} y={0} width={s.width} height={640} rx={s.width / 2} opacity={0.92} />
            {s.nodes.map((n) => (
              <rect
                key={n}
                x={s.x - s.width * 0.28}
                y={n}
                width={s.width * 1.56}
                height={Math.max(2.4, s.width * 0.22)}
                rx={1.5}
                fill="var(--surface)"
                opacity={0.85}
              />
            ))}
            {s.leaves.map((l, li) => (
              <Leaves
                key={li}
                x={s.x + s.width / 2}
                y={l.y}
                dir={l.dir}
                scale={l.scale}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
