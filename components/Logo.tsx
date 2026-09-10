import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "dark" | "light";
  size?: "nav" | "footer";
};

const sources = {
  nav: {
    light: "/images/logo/logo-simple-on-dark.png",
    dark: "/images/logo/logo-simple-on-light.png",
  },
  footer: {
    light: "/images/logo/logo-on-dark.png",
    dark: "/images/logo/logo-on-light.png",
  },
} as const;

export function Logo({ variant = "dark", size = "nav" }: LogoProps) {
  const src = sources[size][variant];
  const box =
    size === "footer"
      ? "relative h-[108px] w-[108px] sm:h-[120px] sm:w-[120px]"
      : "relative h-12 w-12 md:h-[56px] md:w-[56px]";

  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label="JR’s Concrete home">
      <span className={box}>
        <Image
          src={src}
          alt="JR’s Concrete — residential flatwork and foundations in Powers, Michigan"
          fill
          className="object-contain"
          sizes={size === "footer" ? "120px" : "56px"}
          priority={size === "nav"}
        />
      </span>
    </Link>
  );
}
