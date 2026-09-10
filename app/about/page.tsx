import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Process } from "@/components/Process";
import { WhyChoose } from "@/components/WhyChoose";
import { getIntroImage, getProjectImages } from "@/lib/projects";

export const metadata: Metadata = {
  title: "About JR’s Concrete",
  description:
    "JR’s Concrete is a family-owned concrete contractor in Powers, Michigan specializing in residential flatwork and foundations.",
};

export default function AboutPage() {
  const image = getIntroImage(getProjectImages());

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A Family-Owned Concrete Contractor"
        description="JR’s Concrete takes pride in high-quality workmanship and dependable residential concrete across Powers and the surrounding Upper Peninsula."
      />
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Quality Concrete. Done Right.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-concrete sm:text-lg">
              <p>
                JR’s Concrete is a family-owned concrete contractor serving
                homeowners and property owners throughout the Powers area and
                surrounding Upper Peninsula communities.
              </p>
              <p>
                We specialize in residential concrete flatwork and foundations —
                driveways, patios, sidewalks, garage and building slabs, stamped
                concrete, foundation walls, and basement foundations.
              </p>
              <p>
                From the first conversation to the finished pour, the goal is the
                same: dependable work and concrete projects built to last.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative aspect-[4/5] overflow-hidden bg-mist">
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="concrete-panel absolute inset-0" />
              )}
            </div>
          </Reveal>
        </div>
      </section>
      <WhyChoose />
      <Process />
      <CTASection />
    </>
  );
}
