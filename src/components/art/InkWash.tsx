"use client";

import { clsx } from "clsx";

type Pigment = "jade" | "vermilion" | "gold" | "ink";

const pigments: Record<Pigment, string> = {
  jade: "rgba(62, 156, 148, 0.42)",
  vermilion: "rgba(225, 90, 60, 0.34)",
  gold: "rgba(176, 138, 70, 0.32)",
  ink: "rgba(22, 19, 15, 0.24)",
};

/** A soft bloom of diluted pigment, used to give sections depth. */
export function InkWash({
  pigment = "jade",
  className,
  size = 480,
  drift = true,
  style,
}: {
  pigment?: Pigment;
  className?: string;
  size?: number;
  drift?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={clsx("wash", drift && "wash-drift", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${pigments[pigment]} 0%, transparent 68%)`,
        ...style,
      }}
    />
  );
}
