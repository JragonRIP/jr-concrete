import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ServiceCard } from "./ServiceCard";
import type { ProjectImage } from "@/lib/projects";
import { services } from "@/lib/services";

type ServicesProps = {
  images?: ProjectImage[];
};

function imageForService(images: ProjectImage[], category: string) {
  return images.find((image) => image.category === category) ?? images[0];
}

export function Services({ images = [] }: ServicesProps) {
  return (
    <section id="services" className="scroll-mt-24 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What We Pour"
            title="Concrete Services"
            description="From everyday residential flatwork to full foundations, JR’s Concrete has the experience and equipment to handle projects big and small."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 70}>
              <ServiceCard
                id={service.id}
                title={service.title}
                summary={service.summary}
                index={index}
                image={imageForService(images, service.category)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
