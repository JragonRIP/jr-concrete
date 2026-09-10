import { CTASection } from "@/components/CTASection";
import { EstimateBlock } from "@/components/EstimateBlock";
import { FoundationFeature } from "@/components/FoundationFeature";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ServiceArea } from "@/components/ServiceArea";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { WhyChoose } from "@/components/WhyChoose";
import {
  getFeaturedImages,
  getFoundationImage,
  getGalleryImages,
  getHeroImage,
  getIntroImage,
  getProjectImages,
} from "@/lib/projects";

export default function Home() {
  const images = getProjectImages();
  const hero = getHeroImage(images);
  const intro = getIntroImage(images);
  const foundation = getFoundationImage(images);
  const featured = getFeaturedImages(images);
  const gallery = getGalleryImages(images);

  return (
    <>
      <Hero image={hero} />
      <Intro image={intro} />
      <Services images={images} />
      <ProjectShowcase images={featured} />
      <WhyChoose />
      <Process />
      <FoundationFeature image={foundation} />
      <ProjectGallery images={gallery} />
      <ServiceArea />
      <CTASection />
      <EstimateBlock />
    </>
  );
}
