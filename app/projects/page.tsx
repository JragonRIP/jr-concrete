import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getGalleryImages } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Concrete Projects in the Upper Peninsula",
  description:
    "See residential concrete flatwork, foundations, slabs and stamped concrete from JR’s Concrete in Powers, Michigan.",
};

export default function ProjectsPage() {
  const images = getGalleryImages();

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work Around the U.P."
        description="A look at residential concrete from JR’s Concrete — foundations, slabs, sidewalks, patios and stamped work around the Powers area."
      />
      <ProjectGallery images={images} heading="Project Gallery" eyebrow="All Work" />
      <CTASection />
    </>
  );
}
