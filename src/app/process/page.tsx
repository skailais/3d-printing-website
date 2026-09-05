import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import ProcessSteps from "@/components/sections/ProcessSteps";
import StatsBand from "@/components/sections/StatsBand";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Process",
  description:
    "From file to finished part in four steps: send your model, choose material and finish, we print it, you receive it.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        index="04"
        eyebrow="Process"
        title="From file to object, in four moves."
        intro="No portals, no ticket numbers. You send a model, we tell you what we would do with it, and then we do it."
      />
      <ProcessSteps />
      <StatsBand />
      <CTASection
        title="Ready when you are."
        accent="Send the file."
        primary={{ href: "/quote", label: "Request a Quote" }}
        secondary={{ href: "/work", label: "See the Work" }}
      />
    </>
  );
}
