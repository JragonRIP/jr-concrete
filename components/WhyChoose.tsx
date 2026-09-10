import { Reveal } from "./Reveal";

const points = [
  {
    title: "Quality Workmanship",
    copy: "Every pour starts with preparation — grade, forms, and reinforcement — then a careful finish.",
  },
  {
    title: "Family Owned",
    copy: "Local service from a family business that stands behind its work.",
  },
  {
    title: "Built for the U.P.",
    copy: "Pours and curing are planned around Michigan weather, including freeze-thaw seasons.",
  },
  {
    title: "Big or Small",
    copy: "From sidewalks and patios to complete foundations, we’re equipped for the job.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
            Why JR’s
          </p>
          <h2 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Why Homeowners Choose JR’s Concrete
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px bg-mist sm:grid-cols-2">
          {points.map((point, index) => (
            <Reveal key={point.title} delay={index * 80}>
              <div className="h-full bg-cream p-8 md:p-10">
                <p className="font-display text-sm font-bold text-accent">0{index + 1}</p>
                <h3 className="mt-4 font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">
                  {point.title}
                </h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-concrete">
                  {point.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
