import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "dark" | "light";
  src?: string | null;
  compact?: boolean;
};

export function Logo({ variant = "dark", src, compact = false }: LogoProps) {
  const light = variant === "light";

  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3 rounded-sm"
      aria-label="JR’s Concrete home"
    >
      {src ? (
        <span className={`relative ${compact ? "h-10 w-10" : "h-11 w-11"} shrink-0`}>
          <Image src={src} alt="JR’s Concrete logo" fill className="object-contain" sizes="44px" />
        </span>
      ) : (
        <span
          className={`grid ${compact ? "h-10 w-10" : "h-11 w-11"} shrink-0 place-items-center bg-accent text-white`}
          aria-hidden="true"
        >
          <span className="font-display text-[15px] font-extrabold leading-none tracking-tight">
            JR
          </span>
        </span>
      )}
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[17px] font-extrabold tracking-tight ${
            light ? "text-white" : "text-ink"
          }`}
        >
          JR’s Concrete
        </span>
        {!compact && (
          <span
            className={`mt-1 text-[10px] font-medium uppercase tracking-[0.18em] ${
              light ? "text-white/60" : "text-concrete"
            }`}
          >
            Powers, Michigan
          </span>
        )}
      </span>
    </Link>
  );
}
