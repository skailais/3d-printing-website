import { ogCard, size, contentType } from "@/lib/og-card";

export const alt = "CaliPrint process — from file to finished part in four steps.";
export { size, contentType };

export default function Image() {
  return ogCard({
    eyebrow: "How it works",
    headline: "Process",
    blurb: "From file to finished part in four steps: send, choose, print, receive.",
  });
}
