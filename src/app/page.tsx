import HomeHero from "@/components/sections/HomeHero";
import Manifesto from "@/components/sections/Manifesto";
import ServicesPreview from "@/components/sections/ServicesPreview";
import WorkPreview from "@/components/sections/WorkPreview";
import MaterialsMarquee from "@/components/sections/MaterialsMarquee";
import StatsBand from "@/components/sections/StatsBand";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Manifesto />
      <ServicesPreview />
      <WorkPreview />
      <MaterialsMarquee />
      <StatsBand />
      <CTASection />
    </>
  );
}
