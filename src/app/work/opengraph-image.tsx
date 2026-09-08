import { ogCard, size, contentType } from "@/lib/og-card";

export const alt = "CaliPrint work — prototypes, mechanical parts, miniatures and production runs.";
export { size, contentType };

export default function Image() {
  return ogCard({
    eyebrow: "Selected work",
    headline: "Work",
    blurb: "Prototypes, mechanical parts, miniatures, custom designs and short production runs.",
  });
}
