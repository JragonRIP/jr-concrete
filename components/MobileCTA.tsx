import { Phone } from "lucide-react";
import { site } from "@/lib/site";

export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-charcoal/96 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={`tel:${site.phoneTel}`}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-slate font-display text-[12px] font-bold uppercase tracking-[0.14em] text-white"
        >
          <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
          Call Now
        </a>
        <a
          href="/contact"
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-accent font-display text-[12px] font-bold uppercase tracking-[0.14em] text-white"
        >
          Get Estimate
        </a>
      </div>
    </div>
  );
}
