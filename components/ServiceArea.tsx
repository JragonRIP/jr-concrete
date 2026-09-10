import { Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export function ServiceArea() {
  return (
    <section className="overflow-x-clip bg-cream py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <Reveal className="min-w-0">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
            Service Area
          </p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl">
            Serving Powers and the Surrounding Upper Peninsula
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-concrete sm:text-lg">
            <p>
              JR’s Concrete is based in Powers, Michigan and works with customers
              throughout the surrounding area.
            </p>
            <p>Need to know if we can come to your location?</p>
            <p>Give us a call.</p>
          </div>
          <a
            href={`tel:${site.phoneTel}`}
            className="mt-8 inline-flex items-center gap-3 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
          >
            <Phone className="h-7 w-7 text-accent" aria-hidden="true" />
            {site.phone}
          </a>
        </Reveal>
        <Reveal className="min-w-0" delay={100}>
          <div className="w-full max-w-full overflow-hidden bg-white">
            <div className="relative h-72 w-full sm:h-[320px] lg:h-[380px]">
              <iframe
                title="Map of Powers, Michigan"
                src={site.mapEmbedUrl}
                className="absolute inset-0 h-full w-full max-w-full border-0 grayscale-[20%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={site.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-concrete transition-colors hover:text-accent sm:tracking-[0.18em]"
            >
              Open in Google Maps
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
