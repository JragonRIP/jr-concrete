import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getProjectImages, getServiceImage } from "@/lib/projects";
import { additionalServices, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Concrete Services in Powers, MI",
  description:
    "Residential concrete driveways, patios, sidewalks, garage slabs, stamped concrete and foundations from JR’s Concrete in Powers, Michigan.",
};

export default function ServicesPage() {
  const images = getProjectImages();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Concrete Services"
        description="From everyday residential flatwork to full foundations, JR’s Concrete has the experience and equipment to handle projects big and small."
      />
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-16 px-5 md:px-8">
          {services.map((service, index) => {
            const photo = getServiceImage(service.id, images);
            const reverse = index % 2 === 1;

            return (
              <Reveal key={service.id}>
                <article
                  id={service.id}
                  className="scroll-mt-28 grid items-center gap-8 border-b border-mist pb-16 lg:grid-cols-2 lg:gap-14"
                >
                  <div className={reverse ? "lg:order-2" : ""}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                      0{index + 1}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-concrete sm:text-lg">
                      {service.details}
                    </p>
                    <dl className="mt-6 space-y-4 text-sm leading-relaxed">
                      <div>
                        <dt className="font-display font-bold uppercase tracking-[0.14em] text-ink">
                          Good fit for
                        </dt>
                        <dd className="mt-1 text-concrete">{service.goodFit}</dd>
                      </div>
                      <div>
                        <dt className="font-display font-bold uppercase tracking-[0.14em] text-ink">
                          What affects the estimate
                        </dt>
                        <dd className="mt-1 text-concrete">{service.estimateFactors}</dd>
                      </div>
                      <div>
                        <dt className="font-display font-bold uppercase tracking-[0.14em] text-ink">
                          What to expect
                        </dt>
                        <dd className="mt-1 text-concrete">{service.expect}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className={`relative aspect-[16/11] overflow-hidden bg-mist ${reverse ? "lg:order-1" : ""}`}>
                    {photo ? (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="concrete-panel absolute inset-0" />
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <div className="mx-auto mt-8 max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-2xl font-extrabold text-ink">Also available</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {additionalServices.map((item) => (
              <li key={item} className="border border-mist bg-white px-5 py-4 text-sm font-medium text-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}
