import Image from "next/image";
import { Phone } from "lucide-react";
import { ButtonLink } from "./Button";
import type { ProjectImage } from "@/lib/projects";
import { site } from "@/lib/site";

type HeroProps = {
  image?: ProjectImage;
};

export function Hero({ image }: HeroProps) {
  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden bg-ink text-white">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div className="concrete-panel absolute inset-0" aria-hidden="true" />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/62 to-black/28"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-5 pb-24 pt-32 md:px-8 md:pb-28 lg:justify-center lg:pb-20">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
          Powers, Michigan
        </p>
        <h1 className="max-w-5xl font-display text-[2.7rem] font-extrabold leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.4rem]">
          CONCRETE BUILT TO LAST.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg">
          Professional concrete flatwork and foundations in Powers, Michigan and
          throughout the surrounding Upper Peninsula.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="#contact" size="lg">
            Request a Free Estimate
          </ButtonLink>
          <ButtonLink href={`tel:${site.phoneTel}`} variant="outlineLight" size="lg">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {site.phoneCompact}
          </ButtonLink>
        </div>
        <p className="mt-8 text-[12px] font-medium uppercase tracking-[0.18em] text-white/55">
          Serving Powers and nearby U.P. communities
        </p>
        <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.18em] text-white/45">
          Family Owned · Quality Workmanship · Residential Concrete
        </p>
      </div>
    </section>
  );
}
