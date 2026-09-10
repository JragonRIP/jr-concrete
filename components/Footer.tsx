import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { footerServices, navLinks, site } from "@/lib/site";

type FooterProps = {
  logoSrc?: string | null;
};

export function Footer({ logoSrc }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4 lg:py-20">
        <div className="lg:col-span-1">
          <Logo variant="light" src={logoSrc} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/62">
            {site.tagline}
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
            Contact
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-white/72">
            <li>
              <a href={`tel:${site.phoneTel}`} className="inline-flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              {site.location}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
            Quick Links
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/72 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
            Services
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {footerServices.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/72 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-white/45 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Residential concrete flatwork and foundations · Upper Peninsula</p>
        </div>
      </div>
    </footer>
  );
}
