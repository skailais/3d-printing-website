"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const HeroObject = dynamic(() => import("./HeroObject"), {
  ssr: false,
  loading: () => null,
});

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export default function HeroScene() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(154,183,217,0.16) 0%, transparent 60%)",
        }}
      />
      {reducedMotion ? (
        <div
          className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(154,183,217,0.28) 0%, transparent 70%)",
            border: "1px solid var(--border-strong)",
          }}
        />
      ) : (
        <HeroObject />
      )}
    </div>
  );
}
