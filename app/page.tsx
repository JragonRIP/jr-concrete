import { CTASection } from "@/components/CTASection";
import { EstimateBlock } from "@/components/EstimateBlock";
import { FoundationFeature } from "@/components/FoundationFeature";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ServiceArea } from "@/components/ServiceArea";
import { Services } from "@/components/Services";
import { WhyChoose } from "@/components/WhyChoose";
import {
  getFoundationImage,
  getHeroImage,
  getIntroImage,
  getProjectImages,
} from "@/lib/projects";

export default function Home() {
  const images = getProjectImages();
  const hero = getHeroImage(images);
  const intro = getIntroImage(images);
  const foundation = getFoundationImage(images);

  return (
    <>
      <Hero image={hero} />
      <Intro image={intro} />
      <Services images={images} />
      <ProjectShowcase images={images} />
      <WhyChoose />
      <FoundationFeature image={foundation} />
      <ProjectGallery images={images} />
      <ServiceArea />
      <CTASection />
      <EstimateBlock />
    </>
  );
}
