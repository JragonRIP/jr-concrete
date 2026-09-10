type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="bg-ink pt-32 pb-16 text-white md:pt-36 md:pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {eyebrow && (
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/68 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
