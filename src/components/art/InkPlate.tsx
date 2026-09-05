"use client";

import { useId } from "react";

export type Scene = "mountains" | "bamboo" | "blossom" | "wave" | "cranes" | "vessel";

const pigmentColor = {
  jade: "var(--jade)",
  vermilion: "var(--vermilion)",
  gold: "var(--gold)",
  ink: "var(--ink)",
} as const;

export type Pigment = keyof typeof pigmentColor;

function Mountains({ ink, accent }: { ink: string; accent: string }) {
  return (
    <>
      <circle cx="212" cy="86" r="34" fill={accent} opacity="0.2" />
      <circle cx="212" cy="86" r="34" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.55" />
      <g fill={ink}>
        <path
          d="M6,214 C40,196 66,164 96,124 C118,94 140,90 162,120 C182,148 200,172 226,156 C252,140 268,104 296,120 C308,127 314,140 316,152 L316,238 L6,238 Z"
          opacity="0.22"
        />
        <path
          d="M0,248 C36,236 72,208 108,176 C138,150 166,152 192,180 C216,206 244,224 274,210 C292,201 306,190 320,192 L320,266 L0,266 Z"
          opacity="0.42"
        />
        <path
          d="M0,290 C44,282 88,258 132,234 C170,213 204,218 236,240 C264,259 292,268 320,262 L320,300 L0,300 Z"
          opacity="0.8"
        />
      </g>
      <g fill="var(--paper)" opacity="0.6">
        <ellipse cx="150" cy="250" rx="130" ry="7" />
        <ellipse cx="220" cy="276" rx="110" ry="5" />
      </g>
    </>
  );
}

function BambooScene({ ink, accent }: { ink: string; accent: string }) {
  const culms = [
    { x: 92, w: 12, o: 0.9 },
    { x: 140, w: 8, o: 0.5 },
    { x: 182, w: 5, o: 0.28 },
  ];
  return (
    <>
      <ellipse cx="150" cy="150" rx="96" ry="104" fill={accent} opacity="0.1" />
      {culms.map((c) => (
        <g key={c.x} fill={ink} opacity={c.o}>
          <rect x={c.x} y="18" width={c.w} height="284" rx={c.w / 2} />
          {[70, 138, 206, 268].map((n) => (
            <rect
              key={n}
              x={c.x - c.w * 0.3}
              y={n}
              width={c.w * 1.6}
              height="3"
              fill="var(--paper)"
              opacity="0.9"
            />
          ))}
        </g>
      ))}
      <g fill={ink}>
        <g transform="translate(104 96)" opacity="0.85">
          <path d="M0,0 C24,-12 52,-20 82,-16 C54,-3 26,5 0,0 Z" />
          <path d="M0,3 C28,7 56,16 76,34 C48,31 22,20 0,3 Z" />
          <path d="M0,-3 C18,-28 40,-48 66,-58 C52,-32 28,-10 0,-3 Z" />
        </g>
        <g transform="translate(146 178) scale(-0.8 0.8)" opacity="0.55">
          <path d="M0,0 C24,-12 52,-20 82,-16 C54,-3 26,5 0,0 Z" />
          <path d="M0,3 C28,7 56,16 76,34 C48,31 22,20 0,3 Z" />
        </g>
        <g transform="translate(98 236) scale(0.66)" opacity="0.7">
          <path d="M0,0 C24,-12 52,-20 82,-16 C54,-3 26,5 0,0 Z" />
          <path d="M0,-3 C18,-28 40,-48 66,-58 C52,-32 28,-10 0,-3 Z" />
        </g>
      </g>
    </>
  );
}

function Blossom({ ink, accent }: { ink: string; accent: string }) {
  const blooms = [
    { x: 84, y: 118, r: 15 },
    { x: 140, y: 84, r: 11 },
    { x: 178, y: 138, r: 13 },
    { x: 232, y: 100, r: 9 },
    { x: 250, y: 168, r: 12 },
  ];
  return (
    <>
      <ellipse cx="170" cy="150" rx="110" ry="88" fill={accent} opacity="0.12" />
      <g fill={ink}>
        <path d="M14,268 C64,246 104,224 146,190 C190,154 236,136 296,142 C246,158 202,164 164,190 C122,218 74,246 20,276 Z" />
        <path d="M150,186 C168,158 188,132 218,108 C198,140 180,166 160,192 Z" opacity="0.85" />
        <path d="M96,224 C90,196 88,168 92,140 C104,168 108,198 106,226 Z" opacity="0.7" />
      </g>
      {blooms.map((b, i) => (
        <g key={i}>
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx={b.x}
              cy={b.y - b.r * 0.62}
              rx={b.r * 0.44}
              ry={b.r * 0.62}
              fill="var(--paper-warm)"
              stroke={ink}
              strokeWidth="0.7"
              opacity="0.95"
              transform={`rotate(${deg} ${b.x} ${b.y})`}
            />
          ))}
          <circle cx={b.x} cy={b.y} r={b.r * 0.26} fill="var(--vermilion)" />
        </g>
      ))}
    </>
  );
}

function Wave({ ink, accent }: { ink: string; accent: string }) {
  return (
    <>
      <circle cx="228" cy="78" r="30" fill={accent} opacity="0.18" />
      <g fill={ink}>
        <path d="M0,300 L0,196 C44,166 92,148 148,158 C202,168 238,208 292,196 C306,193 314,188 320,182 L320,300 Z" opacity="0.78" />
        <path
          d="M148,158 C170,140 196,132 224,136 C198,140 176,150 158,166 C138,184 122,206 112,232 C114,200 126,176 148,158 Z"
          opacity="0.9"
        />
        <g opacity="0.6">
          <path d="M136,150 C144,132 160,120 180,114 C162,126 148,138 140,154 Z" />
          <path d="M196,134 C210,122 228,116 248,118 C230,124 214,130 202,140 Z" />
          <path d="M104,196 C110,178 122,162 140,150 C124,168 112,182 108,200 Z" />
        </g>
        <path d="M0,300 L0,246 C64,232 128,240 190,256 C244,270 282,268 320,258 L320,300 Z" opacity="0.42" />
      </g>
    </>
  );
}

function Cranes({ ink, accent }: { ink: string; accent: string }) {
  const birds = [
    { x: 78, y: 96, s: 1.5, o: 0.85 },
    { x: 150, y: 62, s: 1.1, o: 0.6 },
    { x: 206, y: 112, s: 0.9, o: 0.45 },
    { x: 118, y: 146, s: 0.7, o: 0.35 },
    { x: 248, y: 68, s: 0.6, o: 0.28 },
  ];
  return (
    <>
      <ellipse cx="160" cy="120" rx="120" ry="70" fill={accent} opacity="0.12" />
      <g fill={ink}>
        {birds.map((b, i) => (
          <path
            key={i}
            d="M0,0 C10,-11 22,-13 32,-2 C42,-13 54,-11 64,0 C50,-4 40,-2 32,6 C24,-2 14,-4 0,0 Z"
            transform={`translate(${b.x} ${b.y}) scale(${b.s})`}
            opacity={b.o}
          />
        ))}
        {/* the reeds they are leaving */}
        <g opacity="0.7">
          <path d="M40,300 C46,258 52,224 48,190 C62,222 66,258 62,300 Z" />
          <path d="M72,300 C82,264 92,232 92,200 C102,236 100,268 92,300 Z" opacity="0.7" />
          <path d="M18,300 C24,272 26,248 22,224 C36,246 38,272 36,300 Z" opacity="0.5" />
        </g>
        <path d="M0,300 C70,286 150,282 230,290 C270,294 300,296 320,292 L320,300 Z" opacity="0.5" />
      </g>
    </>
  );
}

function Vessel({ ink, accent }: { ink: string; accent: string }) {
  return (
    <>
      <ellipse cx="160" cy="176" rx="96" ry="92" fill={accent} opacity="0.14" />
      <g fill={ink}>
        {/* a thrown pot: wide shoulder, drawn-in foot */}
        <path
          d="M126,96 C126,86 194,86 194,96 C194,104 178,108 178,116 C210,128 236,158 236,196 C236,240 202,272 160,272 C118,272 84,240 84,196 C84,158 110,128 142,116 C142,108 126,104 126,96 Z"
          opacity="0.9"
        />
        {/* the glaze break, left as bare paper */}
        <path
          d="M104,190 C108,158 128,134 156,124 C136,142 122,166 118,196 C114,228 124,252 144,266 C118,256 100,226 104,190 Z"
          fill="var(--paper-warm)"
          opacity="0.5"
        />
      </g>
      <g fill={accent} opacity="0.8">
        <circle cx="196" cy="212" r="7" />
        <path d="M180,236 C196,230 214,232 228,242 C210,240 194,240 180,236 Z" />
      </g>
      <path d="M60,286 C120,278 200,278 260,286 C200,292 120,292 60,286 Z" fill={ink} opacity="0.45" />
    </>
  );
}

const scenes: Record<Scene, (p: { ink: string; accent: string }) => React.ReactElement> = {
  mountains: Mountains,
  bamboo: BambooScene,
  blossom: Blossom,
  wave: Wave,
  cranes: Cranes,
  vessel: Vessel,
};

/**
 * A painted plate standing in for a photograph. Six compositions, each washed
 * with one pigment and roughened so the strokes break like ink on paper.
 */
export function InkPlate({
  scene = "mountains",
  pigment = "ink",
  className = "",
}: {
  scene?: Scene;
  pigment?: Pigment;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const rough = `plate-${id}`;
  const soft = `plate-soft-${id}`;
  const Composition = scenes[scene];
  const accent = pigmentColor[pigment];
  const ink = pigment === "ink" ? "var(--ink)" : pigmentColor[pigment];

  return (
    <svg viewBox="0 0 320 320" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id={rough} x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves="4" seed="5" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={soft} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      <g filter={`url(#${soft})`} opacity="0.5">
        <ellipse cx="168" cy="150" rx="104" ry="86" fill={accent} opacity="0.12" />
      </g>

      <g filter={`url(#${rough})`}>
        <Composition ink={ink} accent={accent} />
      </g>
    </svg>
  );
}
