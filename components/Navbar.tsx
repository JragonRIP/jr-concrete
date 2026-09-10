"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { navLinks, site } from "@/lib/site";

type NavbarProps = {
  logoSrc?: string | null;
};

export function Navbar({ logoSrc }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";
  const solid = scrolled || !onHome || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const estimateHref = pathname === "/" ? "#contact" : "/contact";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[height,background-color,box-shadow,padding] duration-300 ${
        solid
          ? "bg-charcoal/95 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.7)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-300 md:px-8 ${
          scrolled ? "h-[68px]" : "h-20"
        }`}
      >
        <Logo variant="light" src={logoSrc} compact={scrolled} />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  active ? "text-accent" : "text-white/78 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
            {site.phone}
          </a>
          <ButtonLink href={estimateHref} size="md">
            Request Estimate
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`lg:hidden ${open ? "block" : "hidden"}`}
      >
        <div className="border-t border-white/10 bg-charcoal px-5 pb-8 pt-4">
          <nav className="flex flex-col" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-white/10 py-4 text-lg font-display font-bold tracking-tight ${
                  pathname === link.href ? "text-accent" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href={`tel:${site.phoneTel}`}
            className="mt-6 flex min-h-12 items-center gap-3 text-white"
          >
            <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
            {site.phone}
          </a>
          <ButtonLink href={estimateHref} className="mt-4 w-full" size="lg" onClick={() => setOpen(false)}>
            Request Estimate
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
