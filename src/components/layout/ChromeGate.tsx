"use client";

import { usePathname } from "next/navigation";

/** Hides the public navbar and footer on back-of-house routes. */
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/master")) return null;
  return <>{children}</>;
}
