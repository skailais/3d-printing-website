import type { Metadata } from "next";
import { SITE_DESCRIPTION, pageMetadata } from "@/lib/site";
import HomeHero from "@/components/sections/HomeHero";
import Manifesto from "@/components/sections/Manifesto";
import ServicesPreview from "@/components/sections/ServicesPreview";
import LandscapeBand from "@/components/sections/LandscapeBand";
import WorkPreview from "@/components/sections/WorkPreview";
import MaterialsMarquee from "@/components/sections/MaterialsMarquee";
import StatsBand from "@/components/sections/StatsBand";
import CTASection from "@/components/sections/CTASection";

/* Title comes from the layout's default rather than the template, so this
   page stays "CaliPrint — Print Studio" and not "Home — CaliPrint". */
export const metadata: Metadata = pageMetadata({
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <>
      <HomeHero />
      <Manifesto />
      <ServicesPreview />
      <LandscapeBand />
      <WorkPreview />
      <MaterialsMarquee />
      <StatsBand />
      <CTASection />
    </>
  );
}
