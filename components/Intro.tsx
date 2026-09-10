import Image from "next/image";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";
import type { ProjectImage } from "@/lib/projects";

type IntroProps = {
  image?: ProjectImage;
};

export function Intro({ image }: IntroProps) {
  return (
    <section id="about" className="scroll-mt-24 bg-cream py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
            Family Owned
          </p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Quality Concrete. Done Right.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-concrete sm:text-lg">
            <p>
              JR’s Concrete is a family-owned concrete contractor serving homeowners
              and property owners throughout the Powers area and surrounding Upper
              Peninsula communities.
            </p>
            <p>
              From driveways and patios to slabs and foundations, we take pride in
              delivering dependable work and concrete projects built to last.
            </p>
          </div>
          <ButtonLink href="/about" variant="dark" className="mt-8">
            About JR’s Concrete
          </ButtonLink>
        </Reveal>

        <Reveal className="lg:col-span-6" delay={120}>
          <div className="relative aspect-[4/5] overflow-hidden bg-mist sm:aspect-[5/4] lg:aspect-[4/5]">
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
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                {image?.category ?? "Residential Concrete"}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
