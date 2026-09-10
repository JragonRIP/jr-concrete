import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectImage } from "@/lib/projects";

type ServiceCardProps = {
  id: string;
  title: string;
  summary: string;
  image?: ProjectImage;
  index: number;
};

export function ServiceCard({ id, title, summary, image, index }: ServiceCardProps) {
  return (
    <Link
      href={`/services#${id}`}
      className="group relative flex min-h-[280px] flex-col overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative h-44 overflow-hidden bg-mist">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="concrete-panel absolute inset-0 opacity-90" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        <span className="absolute left-4 top-4 font-display text-xs font-bold tracking-[0.16em] text-white/80">
          0{index + 1}
        </span>
      </div>
      <div className="flex flex-1 flex-col border-t-2 border-transparent p-6 transition-colors group-hover:border-accent">
        <h3 className="font-display text-xl font-extrabold tracking-tight text-ink">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-concrete">{summary}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink">
          View service
          <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
