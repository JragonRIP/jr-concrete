import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getProjectImages } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Concrete Projects in the Upper Peninsula",
  description:
    "See residential concrete flatwork, foundations, slabs and stamped concrete from JR’s Concrete in Powers, Michigan.",
};

export default function ProjectsPage() {
  const images = getProjectImages();

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work Around the U.P."
        description="A look at residential concrete from JR’s Concrete — foundations, slabs, driveways, sidewalks, patios and decorative work."
      />
      <ProjectGallery images={images} heading="Project Gallery" eyebrow="All Work" />
      <CTASection />
    </>
  );
}
