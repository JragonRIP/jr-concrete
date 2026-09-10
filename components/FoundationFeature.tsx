import Image from "next/image";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";
import type { ProjectImage } from "@/lib/projects";

type FoundationFeatureProps = {
  image?: ProjectImage;
};

export function FoundationFeature({ image }: FoundationFeatureProps) {
  return (
    <section id="foundations-feature" className="bg-charcoal text-white">
      <div className="mx-auto grid max-w-7xl items-stretch lg:grid-cols-2">
        <div className="relative min-h-[360px] lg:min-h-[640px]">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
        </div>
        <Reveal className="flex flex-col justify-center px-5 py-16 md:px-12 md:py-24 lg:px-16">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
            Foundations
          </p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
            A Strong Build Starts With a Strong Foundation.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-white/70 sm:text-lg">
            <p>
              JR’s Concrete handles residential foundation projects including
              foundation walls, basement foundations and structural concrete work.
            </p>
            <p>
              Every project begins with proper preparation and careful execution to
              create a dependable base for what comes next.
            </p>
          </div>
          <ButtonLink href="/contact" className="mt-8 w-fit">
            Talk to Us About Your Project
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
