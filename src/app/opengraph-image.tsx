import { ogCard, size, contentType } from "@/lib/og-card";

export const alt = "CaliPrint — a print studio for prototypes, functional parts and short runs.";
export { size, contentType };

export default function Image() {
  return ogCard({
    eyebrow: "Professional 3D Printing",
    headline: "Ideas, made solid.",
    blurb: "CaliPrint — a print studio for prototypes, functional parts and short runs.",
  });
}
