import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import MaterialsGrid from "@/components/sections/MaterialsGrid";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Materials",
  description:
    "PLA, PETG, ABS, ASA, TPU, nylon, carbon-filled filaments and resins — matched to the forces your part will meet.",
};

export default function MaterialsPage() {
  return (
    <>
      <PageHeader
        index="02"
        eyebrow="Materials"
        title="A pigment for every purpose."
        intro="Twelve materials in stock. Rigid, flexible, filled or fine — chosen for the forces the part will actually meet, not for what prints easiest."
      />
      <MaterialsGrid />
      <CTASection
        title="Still deciding?"
        accent="We’ll advise."
        primary={{ href: "/quote", label: "Request a Quote" }}
        secondary={{ href: "/process", label: "See the Process" }}
      />
    </>
  );
}
