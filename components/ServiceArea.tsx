import { Phone } from "lucide-react";
import { MichiganUP } from "./MichiganUP";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export function ServiceArea() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
            Service Area
          </p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
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
        <Reveal delay={100}>
          <div className="bg-white px-6 py-10 md:px-10">
            <MichiganUP className="w-full text-stone" />
            <p className="mt-6 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-concrete">
              Upper Peninsula · Michigan
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
