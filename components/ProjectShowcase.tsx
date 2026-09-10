import Image from "next/image";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";
import type { ProjectImage } from "@/lib/projects";

type ProjectShowcaseProps = {
  images: ProjectImage[];
};

const spans = [
  "md:col-span-7 md:row-span-2 min-h-[320px] md:min-h-[560px]",
  "md:col-span-5 min-h-[240px] md:min-h-[270px]",
  "md:col-span-5 min-h-[240px] md:min-h-[270px]",
  "md:col-span-4 min-h-[240px] md:min-h-[280px]",
  "md:col-span-4 min-h-[240px] md:min-h-[280px]",
  "md:col-span-4 min-h-[240px] md:min-h-[280px]",
];

export function ProjectShowcase({ images }: ProjectShowcaseProps) {
  const featured = images.slice(0, 6);

  return (
    <section id="projects" className="scroll-mt-24 bg-ink py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
                Project Work
              </p>
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Built Around the U.P.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/68 sm:text-lg">
                Foundations, slabs, stamped concrete, sidewalks, patios, and
                driveways — real work from JR’s Concrete across the Powers area.
              </p>
            </div>
            <ButtonLink href="/projects" variant="outlineLight">
              View All Projects
            </ButtonLink>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-12">
          {featured.map((image, index) => (
            <a
              key={image.src}
              href="/projects"
              className={`group relative block overflow-hidden bg-slate ${spans[index] ?? "md:col-span-4 min-h-[240px]"}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/45" />
              <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">
                  {image.category}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
