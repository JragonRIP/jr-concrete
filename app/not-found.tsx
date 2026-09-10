import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="bg-ink px-5 py-40 text-center text-white">
      <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-white/65">
        That page doesn’t exist. Head back home or request an estimate.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href="/" variant="secondary">
          Back Home
        </ButtonLink>
        <ButtonLink href="/contact">Request Estimate</ButtonLink>
      </div>
    </section>
  );
}
