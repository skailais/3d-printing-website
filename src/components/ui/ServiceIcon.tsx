import type { Service } from "@/lib/data";

const paths: Record<Service["icon"], React.ReactNode> = {
  fdm: (
    <>
      <path d="M6 18V10l6-3 6 3v8" />
      <path d="M6 10l6 3 6-3" />
      <path d="M12 13v8" />
    </>
  ),
  resin: (
    <>
      <path d="M9 3h6l1 5-4 4-4-4 1-5Z" />
      <path d="M8 21h8l-1.2-7.5h-5.6L8 21Z" />
    </>
  ),
  proto: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  functional: (
    <>
      <path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.4l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 3Z" />
    </>
  ),
  custom: (
    <>
      <path d="M4 7l8-4 8 4-8 4-8-4Z" />
      <path d="M4 7v10l8 4 8-4V7" />
      <path d="M12 11v10" />
    </>
  ),
  batch: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </>
  ),
};

export function ServiceIcon({ icon, className = "h-6 w-6" }: { icon: Service["icon"]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[icon]}
    </svg>
  );
}
