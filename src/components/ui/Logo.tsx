export function LogoMark({
  className = "h-8 w-8",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* a small ensō: nearly closed, tapered, with a dry gap at the top-right */}
      <path
        d="M31 8.5 A17 17 0 1 1 14.5 34.5"
        stroke={color}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M14 34 A17 17 0 0 0 21 39.4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="24" cy="24" r="3.4" fill="var(--vermilion)" />
    </svg>
  );
}

export function Logo({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className={tone === "paper" ? "h-8 w-8 text-paper" : "h-8 w-8 text-ink"} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.15rem] font-semibold tracking-tight ${
            tone === "paper" ? "text-paper" : "text-ink"
          }`}
        >
          CaliPrint
        </span>
        <span
          className={`mt-1 font-mono text-[0.55rem] tracked-label ${
            tone === "paper" ? "text-paper/50" : "text-ink-faint"
          }`}
        >
          Print Studio
        </span>
      </span>
    </span>
  );
}
