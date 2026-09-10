import { Reveal } from "./Reveal";

const steps = [
  {
    title: "Consultation",
    copy: "Tell us what you’re building. We talk through the work, the site, and what you need the concrete to do.",
  },
  {
    title: "Site review",
    copy: "We look at access, grade, and drainage so the pour is planned around the property — not the other way around.",
  },
  {
    title: "Preparation",
    copy: "Base work, forms, and reinforcement come first. A clean pour starts with the groundwork underneath it.",
  },
  {
    title: "Pour",
    copy: "Concrete is placed and screeded while the crew keeps the edges true and the surface on grade.",
  },
  {
    title: "Finish & cure",
    copy: "We finish the surface, then let it cure. Upper Peninsula weather is part of that timing.",
  },
  {
    title: "Follow-up",
    copy: "When the job is done, you have a finished slab, walk, patio, or foundation ready for what comes next.",
  },
];

export function Process() {
  return (
    <section className="bg-ink py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
            How We Work
          </p>
          <h2 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            From the first call to the finished pour
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 60}>
              <p className="font-display text-sm font-bold text-accent">0{index + 1}</p>
              <h3 className="mt-3 font-display text-xl font-extrabold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/68">{step.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
