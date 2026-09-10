import type { Metadata } from "next";
import { EstimateBlock } from "@/components/EstimateBlock";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Free Estimate",
  description:
    "Request a free estimate from JR’s Concrete in Powers, Michigan. Call (906) 241-0001 or send project details online.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a Free Estimate"
        description={`Tell us what you’re working on. JR’s Concrete is based in ${site.location} and ready to talk through the next step.`}
      />
      <EstimateBlock />
    </>
  );
}
