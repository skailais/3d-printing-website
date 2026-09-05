"use client";

const flock = [
  { x: 6, y: 34, s: 1.2, o: 1 },
  { x: 44, y: 18, s: 0.85, o: 0.75 },
  { x: 74, y: 40, s: 0.6, o: 0.55 },
  { x: 100, y: 22, s: 0.45, o: 0.4 },
];

/** A few gull strokes — two arcs each, the way a brush suggests a bird. */
export function Birds({
  className = "",
  color = "var(--ink)",
  opacity = 0.5,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg viewBox="0 0 120 60" fill="none" className={className} aria-hidden="true">
      <g stroke={color} strokeLinecap="round" fill="none" opacity={opacity}>
        {flock.map((b, i) => (
          <path
            key={i}
            d="M0,0 C5,-6 11,-7 15,-1 C19,-7 25,-6 30,0"
            transform={`translate(${b.x} ${b.y}) scale(${b.s})`}
            strokeWidth={2 / b.s}
            opacity={b.o}
          />
        ))}
      </g>
    </svg>
  );
}
