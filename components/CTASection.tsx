import Image from "next/image";
import { Phone } from "lucide-react";
import { ButtonLink } from "./Button";
import { getCtaImage, type ProjectImage } from "@/lib/projects";
import { site } from "@/lib/site";

type CTASectionProps = {
  image?: ProjectImage;
};

export function CTASection({ image }: CTASectionProps) {
  const photo = image ?? getCtaImage();

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white md:py-28">
      {photo ? (
        <Image
          src={photo.src}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
      ) : (
        <div className="concrete-panel absolute inset-0 opacity-80" aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/62 to-black/42" />
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
          Free Estimate
        </p>
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
          Planning a Concrete Project?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          Tell us what you’re working on and JR’s Concrete can help you take the
          next step.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact" size="lg">
            Request a Free Estimate
          </ButtonLink>
          <ButtonLink href={`tel:${site.phoneTel}`} variant="outlineLight" size="lg">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {site.phoneCompact}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
