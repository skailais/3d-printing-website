export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="14"
        r="9.5"
        stroke="currentColor"
        strokeWidth="1.6"
        className="text-accent"
      />
      <circle cx="20" cy="14" r="6.5" fill="currentColor" className="text-bg" />
      <line
        x1="20"
        y1="23.5"
        x2="20"
        y2="37"
        stroke="currentColor"
        strokeWidth="1.6"
        className="text-accent"
      />
      <circle cx="20" cy="14" r="2" fill="currentColor" className="text-accent" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="font-display text-[1.05rem] font-semibold tracking-tight text-text">
        CaliPrint
      </span>
    </span>
  );
}
