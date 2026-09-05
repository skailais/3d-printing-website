import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import StudioContent from "@/components/sections/StudioContent";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "A small print studio: how we work, what we believe about making, and how to reach us.",
};

export default function StudioPage() {
  return (
    <>
      <PageHeader
        index="05"
        eyebrow="Studio"
        title="A small room full of machines."
        intro="No sales floor, no account managers. The person who quotes your part is the person who prints it and the person who packs it."
      />
      <StudioContent />
      <CTASection
        title="Come with a problem."
        accent="Leave with a part."
        primary={{ href: "/quote", label: "Request a Quote" }}
        secondary={{ href: "/materials", label: "Browse Materials" }}
      />
    </>
  );
}
