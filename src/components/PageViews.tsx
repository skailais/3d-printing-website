"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Counts a page view on our own server. No cookie is set and no address is
 * stored — see src/lib/server/analytics.ts. Back-of-house routes are skipped.
 */
export default function PageViews() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/master")) return;

    const body = JSON.stringify({ path: pathname });

    // sendBeacon survives the page being closed mid-navigation
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
      return;
    }

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // counting is best effort; never bother the visitor about it
    });
  }, [pathname]);

  return null;
}
