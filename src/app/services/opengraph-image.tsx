import { ogCard, size, contentType } from "@/lib/og-card";

export const alt = "CaliPrint services — FDM and resin printing, prototyping, small-batch production.";
export { size, contentType };

export default function Image() {
  return ogCard({
    eyebrow: "What we make",
    headline: "Services",
    blurb: "FDM and resin printing, prototyping, functional parts and small-batch production.",
  });
}
