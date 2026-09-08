import { ogCard, size, contentType } from "@/lib/og-card";

export const alt = "CaliPrint — send a model and receive pricing.";
export { size, contentType };

export default function Image() {
  return ogCard({
    eyebrow: "Send a model",
    headline: "Request a quote",
    blurb: "Upload an STL, OBJ or STEP file, choose a material, and we come back with pricing.",
  });
}
