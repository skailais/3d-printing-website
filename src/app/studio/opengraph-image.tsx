import { ogCard, size, contentType } from "@/lib/og-card";

export const alt = "CaliPrint studio — how we work and what we believe about making.";
export { size, contentType };

export default function Image() {
  return ogCard({
    eyebrow: "The studio",
    headline: "Studio",
    blurb: "A small print studio: how we work, and what we believe about making.",
  });
}
