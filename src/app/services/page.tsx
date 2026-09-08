import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { PageHeader } from "@/components/layout/PageHeader";
import ServicesList from "@/components/sections/ServicesList";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "FDM and resin printing, prototyping, functional parts, custom projects and small-batch production.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        index="01"
        eyebrow="Services"
        title="Six ways to make a thing."
        intro="One studio, several processes. We pick the one your part actually needs — and tell you plainly when a different one would serve you better."
      />
      <ServicesList />
      <CTASection
        title="Not sure which?"
        accent="Send the file."
        primary={{ href: "/quote", label: "Request a Quote" }}
        secondary={{ href: "/materials", label: "Browse Materials" }}
      />
    </>
  );
}
