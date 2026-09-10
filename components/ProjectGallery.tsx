"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectImage } from "@/lib/projects";

type ProjectGalleryProps = {
  images: ProjectImage[];
  heading?: string;
  eyebrow?: string;
};

const aspects = [
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[5/4]",
  "aspect-[4/5]",
  "aspect-[16/11]",
];

export function ProjectGallery({
  images,
  heading = "Recent Work",
  eyebrow = "Gallery",
}: ProjectGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => {
    setActive((current) => {
      if (current === null || images.length === 0) return current;
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);
  const next = useCallback(() => {
    setActive((current) => {
      if (current === null || images.length === 0) return current;
      return (current + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, next, prev]);

  const current = active !== null ? images[active] : null;

  return (
    <section id="gallery" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-accent">
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {heading}
        </h2>

        {images.length === 0 ? (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-concrete">
            Call JR’s Concrete to talk through a driveway, slab, patio, or
            foundation project — or send photos with your estimate request.
          </p>
        ) : (
          <div className="mt-12 columns-1 gap-3 sm:columns-2 lg:columns-3">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActive(index)}
                className="group relative mb-3 block w-full overflow-hidden bg-mist text-left"
              >
                <span className={`relative block ${aspects[index % aspects.length]}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </span>
                <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/35" />
                <span className="absolute bottom-0 left-0 p-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {image.caption}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {current && active !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${current.category} project photo`}
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center text-white"
            aria-label="Close gallery"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              prev();
            }}
            className="absolute left-2 z-10 inline-flex h-12 w-12 items-center justify-center text-white md:left-6"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
            className="absolute right-2 z-10 inline-flex h-12 w-12 items-center justify-center text-white md:right-6"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <figure
            className="relative h-[78vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => {
              touchStartX.current = event.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const start = touchStartX.current;
              const end = event.changedTouches[0]?.clientX;
              if (start == null || end == null) return;
              const delta = end - start;
              if (delta > 40) prev();
              if (delta < -40) next();
              touchStartX.current = null;
            }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 text-center text-sm font-medium text-white">
              {current.caption}
              <span className="ml-3 text-white/55">
                {active + 1} / {images.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
