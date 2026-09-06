"use client";

import { useState } from "react";
import { materialDemand } from "@/lib/admin-demo-data";

/* One measure across categories, so one hue — a colour per bar would imply an
   identity the data does not have. */
const HUE = "#17a394";

export default function MaterialBars() {
  const [hover, setHover] = useState<string | null>(null);
  const max = Math.max(...materialDemand.map((m) => m.count));
  const total = materialDemand.reduce((n, m) => n + m.count, 0);

  return (
    <figure className="m-0">
      <figcaption className="mb-5 font-display text-lg text-paper">
        Material requested
      </figcaption>

      <ul className="space-y-2.5">
        {materialDemand.map((m) => {
          const pct = (m.count / max) * 100;
          const share = Math.round((m.count / total) * 100);
          const isHover = hover === m.name;

          return (
            <li
              key={m.name}
              className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3"
              onMouseEnter={() => setHover(m.name)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="truncate font-mono text-[0.6rem] tracked-label text-paper/60">
                {m.name}
              </span>

              <span className="relative block h-3.5 bg-paper/6">
                <span
                  className="absolute inset-y-0 left-0 rounded-r-[4px] transition-[width,opacity] duration-500"
                  style={{
                    width: `${pct}%`,
                    background: HUE,
                    opacity: hover && !isHover ? 0.45 : 1,
                  }}
                />
              </span>

              <span className="text-right font-display text-sm text-paper">
                {m.count}
                {isHover && (
                  <span className="ml-1 font-mono text-[0.55rem] text-paper/50">{share}%</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
