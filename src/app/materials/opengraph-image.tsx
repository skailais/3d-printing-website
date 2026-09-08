import { ogCard, size, contentType } from "@/lib/og-card";

export const alt = "CaliPrint materials — filaments and resins matched to the job.";
export { size, contentType };

export default function Image() {
  return ogCard({
    eyebrow: "Matched to the job",
    headline: "Materials",
    blurb: "PLA, PETG, ABS, ASA, TPU, nylon, carbon-filled filaments and resins.",
  });
}
