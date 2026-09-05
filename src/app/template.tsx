"use client";

import { motion } from "framer-motion";

/**
 * `template.tsx` remounts on every navigation, so it is the natural place for
 * the between-page transition: a sheet of ink wipes down and lifts, and the
 * incoming page settles up underneath it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "top" }}
        className="ink-panel pointer-events-none fixed inset-0 z-40 origin-top"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
