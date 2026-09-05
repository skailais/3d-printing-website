import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import WorkGallery from "@/components/sections/WorkGallery";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Prototypes, mechanical parts, miniatures, custom designs, replacement parts and small production runs.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        index="03"
        eyebrow="Work"
        title="Objects that began as files."
        intro="A cross-section of what leaves the studio: one-off prototypes, parts that carry load, miniatures at twenty microns, and runs of several hundred."
      />
      <WorkGallery />
      <CTASection
        title="Your part next?"
        accent="Send the model."
        primary={{ href: "/quote", label: "Upload Your Model" }}
        secondary={{ href: "/services", label: "See Services" }}
      />
    </>
  );
}
