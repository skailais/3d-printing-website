const paths: Record<string, React.ReactNode> = {
  Prototypes: (
    <>
      <path d="M9 2h6" />
      <path d="M10 2v4.2a4 4 0 0 1-.8 2.4L7 12.4A5 5 0 0 0 12 20a5 5 0 0 0 5-7.6l-2.2-3.8A4 4 0 0 1 14 6.2V2" />
    </>
  ),
  "Mechanical Parts": (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.4M12 18.6V21M21 12h-2.4M5.4 12H3M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7M18.4 18.4l-1.7-1.7M7.3 7.3 5.6 5.6" />
    </>
  ),
  Miniatures: (
    <>
      <circle cx="12" cy="6" r="2.4" />
      <path d="M8 21v-6.5L6 11l2-2 4 2 4-2 2 2-2 3.5V21" />
    </>
  ),
  "Custom Designs": (
    <>
      <path d="M4 20 16 8" />
      <path d="M13 4l7 7-2.5 2.5L10.5 6.5 13 4Z" />
      <path d="M4 20l1-4 3 3-4 1Z" />
    </>
  ),
  "Replacement Parts": (
    <>
      <path d="M9 3H5a2 2 0 0 0-2 2v4" />
      <path d="M15 3h4a2 2 0 0 1 2 2v4" />
      <path d="M9 21H5a2 2 0 0 1-2-2v-4" />
      <path d="M15 21h4a2 2 0 0 0 2-2v-4" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
};

export function PortfolioIcon({ category, className = "h-7 w-7" }: { category: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[category]}
    </svg>
  );
}
