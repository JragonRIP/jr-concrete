import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export function EstimateBlock() {
  return (
    <section id="contact" className="scroll-mt-24 bg-paper py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
            Get in Touch
          </p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Request an Estimate
          </h2>
          <p className="mt-5 text-base leading-relaxed text-concrete sm:text-lg">
            Tell us a little about your project and we’ll get back to you.
          </p>
          <div className="mt-8 space-y-3 text-sm text-ink">
            <p>
              <a href={`tel:${site.phoneTel}`} className="font-semibold hover:text-accent">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-accent">
                {site.email}
              </a>
            </p>
            <p className="text-concrete">{site.location}</p>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={80}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
