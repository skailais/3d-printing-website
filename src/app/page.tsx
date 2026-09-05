import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import Materials from "@/components/sections/Materials";
import Portfolio from "@/components/sections/Portfolio";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import QuoteUpload from "@/components/sections/QuoteUpload";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <Materials />
      <Portfolio />
      <WhyChooseUs />
      <QuoteUpload />
      <FAQ />
      <FinalCTA />
    </>
  );
}
