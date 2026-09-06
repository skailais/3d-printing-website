"use client";

import { useMemo, useState } from "react";
import type { DailyTraffic } from "@/lib/server/analytics";

/* Series colours: the studio's jade and vermilion lifted onto the ink ground.
   Validated for the six checks against surface #1a1a19 — lightness band,
   chroma floor, CVD separation (ΔE 12.5 deutan), normal-vision floor and
   contrast all pass. */
const SERIES = [
  { key: "views" as const, label: "Views", color: "#17a394" },
  { key: "sessions" as const, label: "Sessions", color: "#e15a3c" },
];

const W = 900;
const H = 280;
const PAD = { top: 18, right: 18, bottom: 28, left: 44 };

function niceTop(max: number) {
  const step = Math.pow(10, Math.floor(Math.log10(max))) / 2;
  return Math.ceil(max / step) * step;
}

export default function TrafficChart({ traffic }: { traffic: DailyTraffic[] }) {
  const [hover, setHover] = useState<number | null>(null);

  const { max, x, y, paths } = useMemo(() => {
    const peak = Math.max(1, ...traffic.flatMap((d) => [d.views, d.sessions]));
    const max = niceTop(peak);
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;

    const x = (i: number) => PAD.left + (i / Math.max(traffic.length - 1, 1)) * innerW;
    const y = (v: number) => PAD.top + innerH - (v / max) * innerH;

    const line = (key: "views" | "sessions") =>
      traffic.map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join(" ");

    return {
      max,
      x,
      y,
      paths: {
        views: line("views"),
        sessions: line("sessions"),
        viewsArea: `${line("views")} L${x(traffic.length - 1)},${y(0)} L${x(0)},${y(0)} Z`,
      },
    };
  }, [traffic]);

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(max * t));
  const active = hover === null ? null : traffic[hover];

  return (
    <figure className="m-0">
      <figcaption className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-display text-lg text-paper">Traffic, last 30 days</span>
        {/* legend — identity is never colour alone, so each swatch is labelled */}
        <span className="flex items-center gap-5">
          {SERIES.map((s) => (
            <span key={s.key} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: s.color }} aria-hidden="true" />
              <span className="font-mono text-[0.58rem] tracked-label text-paper/70">{s.label}</span>
            </span>
          ))}
        </span>
      </figcaption>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label="Daily views and sessions over the last thirty days"
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="views-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#17a394" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#17a394" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* recessive grid */}
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y(t)}
                y2={y(t)}
                stroke="rgba(243,239,230,0.1)"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 10}
                y={y(t) + 3.5}
                textAnchor="end"
                className="fill-[rgba(243,239,230,0.45)] font-mono"
                fontSize="9"
              >
                {t}
              </text>
            </g>
          ))}

          <path d={paths.viewsArea} fill="url(#views-fill)" />
          <path d={paths.views} fill="none" stroke={SERIES[0].color} strokeWidth="2" strokeLinejoin="round" />
          <path d={paths.sessions} fill="none" stroke={SERIES[1].color} strokeWidth="2" strokeLinejoin="round" />

          {/* first and last date only — a label per point would be noise */}
          <text x={PAD.left} y={H - 8} className="fill-[rgba(243,239,230,0.45)] font-mono" fontSize="9">
            {traffic[0].date.slice(5)}
          </text>
          <text
            x={W - PAD.right}
            y={H - 8}
            textAnchor="end"
            className="fill-[rgba(243,239,230,0.45)] font-mono"
            fontSize="9"
          >
            {traffic[traffic.length - 1].date.slice(5)}
          </text>

          {hover !== null && (
            <g pointerEvents="none">
              <line
                x1={x(hover)}
                x2={x(hover)}
                y1={PAD.top}
                y2={H - PAD.bottom}
                stroke="rgba(243,239,230,0.35)"
                strokeWidth="1"
              />
              {SERIES.map((s) => (
                <circle
                  key={s.key}
                  cx={x(hover)}
                  cy={y(traffic[hover][s.key])}
                  r="4.5"
                  fill={s.color}
                  stroke="#12100e"
                  strokeWidth="2"
                />
              ))}
            </g>
          )}

          {/* one hit target per day, taller than the marks */}
          {traffic.map((d, i) => (
            <rect
              key={d.date}
              x={x(i) - (W - PAD.left - PAD.right) / traffic.length / 2}
              y={PAD.top}
              width={(W - PAD.left - PAD.right) / traffic.length}
              height={H - PAD.top - PAD.bottom}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
            />
          ))}
        </svg>

        {active && (
          <div
            className="pointer-events-none absolute top-2 z-10 border border-paper/15 bg-[#12100e]/95 px-3 py-2"
            style={{
              left: `${(x(hover as number) / W) * 100}%`,
              transform: `translateX(${(hover as number) > traffic.length / 2 ? "-110%" : "10%"})`,
            }}
          >
            <div className="font-mono text-[0.55rem] tracked-label text-paper/50">{active.date}</div>
            {SERIES.map((s) => (
              <div key={s.key} className="mt-1 flex items-center gap-2 whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                <span className="font-mono text-[0.62rem] text-paper/70">{s.label}</span>
                <span className="ml-auto font-display text-sm text-paper">{active[s.key]}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* the same numbers, reachable without hovering */}
      <details className="mt-5">
        <summary className="cursor-pointer font-mono text-[0.58rem] tracked-label text-paper/50 hover:text-paper">
          View as table
        </summary>
        <div className="mt-3 max-h-56 overflow-y-auto border border-paper/10">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-[#12100e]">
              <tr className="font-mono text-[0.55rem] tracked-label text-paper/45">
                <th className="px-3 py-2 font-normal">Date</th>
                <th className="px-3 py-2 font-normal">Views</th>
                <th className="px-3 py-2 font-normal">Sessions</th>
              </tr>
            </thead>
            <tbody>
              {traffic.map((d) => (
                <tr key={d.date} className="border-t border-paper/8">
                  <td className="px-3 py-1.5 font-mono text-[0.62rem] text-paper/55">{d.date}</td>
                  <td className="px-3 py-1.5 font-mono text-[0.62rem] text-paper/80">{d.views}</td>
                  <td className="px-3 py-1.5 font-mono text-[0.62rem] text-paper/80">{d.sessions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
