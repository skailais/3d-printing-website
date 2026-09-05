"use client";

import { MotionConfig } from "framer-motion";

/**
 * Honours the visitor's reduced-motion setting for every animation on the
 * site: transforms and fades are dropped, opacity-only changes are kept.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
