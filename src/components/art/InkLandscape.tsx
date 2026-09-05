"use client";

import { useId, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * A sumi-e landscape assembled from separately-parallaxing ridge layers:
 * a pale disc low in the sky, four ranges receding into mist, drifting fog
 * bands and a few birds. Each ridge is roughened so its silhouette breaks
 * like wet ink rather than reading as a vector edge.
 */

const ridges = [
  {
    // furthest — tall, pale, almost lost in the mist
    d: "M0,286 C60,262 96,240 150,196 C186,166 206,150 236,168 C262,184 282,214 316,196 C352,176 372,128 414,96 C446,72 470,88 496,124 C528,168 552,206 596,188 C640,170 664,124 706,142 C744,158 764,206 806,224 C848,242 880,214 918,186 C956,158 984,168 1016,206 C1050,246 1078,268 1120,250 C1164,232 1188,190 1232,204 C1272,216 1296,254 1338,272 C1376,288 1410,282 1440,268 L1440,520 L0,520 Z",
    opacity: 0.16,
  },
  {
    d: "M0,342 C48,330 92,300 140,272 C182,248 214,254 246,282 C284,314 314,340 356,322 C402,302 428,246 476,262 C518,276 540,326 586,338 C630,350 660,314 700,296 C742,278 772,296 806,330 C840,364 872,378 912,360 C954,342 978,300 1022,310 C1062,320 1086,358 1128,372 C1172,386 1206,368 1244,344 C1284,318 1320,326 1360,352 C1390,372 1416,382 1440,376 L1440,520 L0,520 Z",
    opacity: 0.26,
  },
  {
    d: "M0,404 C56,396 104,372 156,346 C202,324 238,332 274,360 C312,390 344,406 388,392 C434,378 462,336 508,346 C548,354 574,394 618,408 C660,422 692,404 728,382 C768,358 800,368 834,398 C868,428 902,438 942,422 C984,406 1010,372 1054,380 C1094,388 1120,420 1164,432 C1208,444 1244,430 1282,408 C1320,386 1358,392 1394,416 C1412,428 1428,434 1440,432 L1440,520 L0,520 Z",
    opacity: 0.42,
  },
  {
    // nearest — the darkest wet-ink bank in the foreground
    d: "M0,470 C72,462 128,442 188,424 C240,408 286,414 330,432 C378,452 420,466 470,456 C522,446 558,418 610,424 C656,430 688,458 736,470 C782,482 820,470 862,452 C908,432 948,438 988,462 C1026,484 1066,492 1110,480 C1156,468 1190,442 1238,446 C1286,450 1322,478 1370,490 C1398,497 1422,498 1440,494 L1440,520 L0,520 Z",
    opacity: 0.72,
  },
];

function Bird({ x, y, scale = 1, opacity = 0.5 }: { x: number; y: number; scale?: number; opacity?: number }) {
  return (
    <path
      d="M0,0 C5,-5 10,-6 15,-1 C20,-6 25,-5 30,0 C24,-2 20,-1 15,3 C10,-1 6,-2 0,0 Z"
      transform={`translate(${x} ${y}) scale(${scale})`}
      fill="currentColor"
      opacity={opacity}
    />
  );
}

export function InkLandscape({
  className = "",
  discPigment = "var(--vermilion)",
}: {
  className?: string;
  discPigment?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const id = useId().replace(/:/g, "");
  const rough = `land-rough-${id}`;
  const soft = `land-soft-${id}`;

  /* Hooks cannot be called in a loop body, so the four depths are declared up
     front and handed to the ridges in order. These are viewBox user units,
     not percentages — percentage transforms on SVG groups are unreliable. */
  const y0 = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 34]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 84]);
  const layerY = [y0, y1, y2, y3];

  const discY = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);
  const birdsX = useTransform(scrollYProgress, [0, 1], ["-4%", "10%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} aria-hidden="true">
      {/* sky wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(62,156,148,0.10) 0%, rgba(243,239,230,0) 45%), linear-gradient(0deg, rgba(22,19,15,0.06) 0%, transparent 40%)",
        }}
      />

      {/* the disc, sitting low behind the ranges */}
      <motion.div
        style={{ y: discY }}
        className="absolute left-1/2 top-[14%] h-40 w-40 -translate-x-1/2 sm:h-56 sm:w-56"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <circle cx="100" cy="100" r="72" fill={discPigment} opacity="0.16" />
          <circle cx="100" cy="100" r="72" fill="none" stroke={discPigment} strokeWidth="1.4" opacity="0.5" />
        </svg>
      </motion.div>

      <svg viewBox="0 0 1440 520" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <filter id={rough} x="-5%" y="-15%" width="110%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.03" numOctaves="3" seed="11" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="16" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id={soft} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        {ridges.map((ridge, i) => (
          <motion.g key={i} style={{ y: layerY[i] }}>
            <path d={ridge.d} fill="var(--ink)" opacity={ridge.opacity} filter={`url(#${rough})`} />
          </motion.g>
        ))}

        {/* fog caught between the ranges */}
        <g filter={`url(#${soft})`} fill="var(--paper)">
          <ellipse cx="330" cy="368" rx="300" ry="18" opacity="0.55" />
          <ellipse cx="980" cy="404" rx="360" ry="16" opacity="0.5" />
          <ellipse cx="640" cy="452" rx="420" ry="14" opacity="0.4" />
        </g>
      </svg>

      <motion.svg
        style={{ x: birdsX }}
        viewBox="0 0 1440 520"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-ink"
      >
        <Bird x={310} y={126} scale={1.1} opacity={0.42} />
        <Bird x={372} y={98} scale={0.8} opacity={0.32} />
        <Bird x={418} y={140} scale={0.6} opacity={0.26} />
        <Bird x={1042} y={158} scale={0.9} opacity={0.3} />
        <Bird x={1098} y={132} scale={0.6} opacity={0.22} />
      </motion.svg>
    </div>
  );
}
