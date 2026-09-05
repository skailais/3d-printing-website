import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import QuoteForm from "@/components/sections/QuoteForm";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Upload an STL, OBJ or STEP file, choose a material and quantity, and we will come back with pricing.",
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        index="06"
        eyebrow="Quote"
        title="Send us the model."
        intro="Drop a file, tell us how many and in what. If the geometry needs work before it can be printed, we will say so before we quote it."
      />
      <QuoteForm />
      <FAQ />
    </>
  );
}
