export type ProjectImage = {
  src: string;
  filename: string;
  alt: string;
  category: string;
  caption: string;
  hero: boolean;
  featured: boolean;
  serviceId?: string;
};

const catalog: Array<Omit<ProjectImage, "src">> = [
  {
    filename: "hero-patio.jpg",
    category: "Patio",
    caption: "Custom patio — Upper Peninsula",
    alt: "Finished curved concrete patio overlooking woods in the Powers, Michigan area",
    hero: true,
    featured: true,
    serviceId: "patios",
  },
  {
    filename: "patio-01.jpg",
    category: "Patio",
    caption: "Raised patio with rounded edge — residential",
    alt: "Raised concrete patio with bullnose edge in front of a brick home near Powers, Michigan",
    hero: false,
    featured: false,
    serviceId: "patios",
  },
  {
    filename: "sidewalk-01.jpg",
    category: "Sidewalk Installation",
    caption: "Walkway to outbuilding — residential",
    alt: "Newly poured concrete sidewalk leading to a green outbuilding in the Powers, Michigan area",
    hero: false,
    featured: true,
    serviceId: "sidewalks",
  },
  {
    filename: "sidewalk-02.jpg",
    category: "Sidewalk Installation",
    caption: "Front walk and stoop — Powers area",
    alt: "Finished concrete stoop and walkway beside a home, with a JR’s Concrete work truck in the yard",
    hero: false,
    featured: true,
    serviceId: "sidewalks",
  },
  {
    filename: "garage-slab-01.jpg",
    category: "Garage Slab",
    caption: "Interior garage slab — residential",
    alt: "Finished interior concrete garage slab inside a wood-framed building near Powers, Michigan",
    hero: false,
    featured: true,
    serviceId: "slabs",
  },
  {
    filename: "concrete-slab-01.jpg",
    category: "Concrete Slab",
    caption: "Building slab — rural site",
    alt: "Finished outdoor concrete building slab in an open field near Powers, Michigan",
    hero: false,
    featured: false,
    serviceId: "slabs",
  },
  {
    filename: "concrete-slab-prep-01.jpg",
    category: "Concrete Slab",
    caption: "Slab preparation with reinforcement",
    alt: "Concrete slab forms with vapor barrier and wire reinforcement before the pour",
    hero: false,
    featured: false,
    serviceId: "slabs",
  },
  {
    filename: "stamped-concrete-01.jpg",
    category: "Stamped Patio",
    caption: "Stamped patio with fire pit — residential",
    alt: "Circular wood-plank stamped concrete patio with a fire ring, surrounded by lawn and pines",
    hero: false,
    featured: true,
    serviceId: "stamped-concrete",
  },
  {
    filename: "stamped-concrete-02.jpg",
    category: "Stamped Patio",
    caption: "Ashlar stamped patio — residential",
    alt: "Rectangular stamped concrete patio with an ashlar stone pattern beside a house",
    hero: false,
    featured: false,
    serviceId: "stamped-concrete",
  },
  {
    filename: "stamped-concrete-03.jpg",
    category: "Stamped Patio",
    caption: "Wood-look stamped porch — residential",
    alt: "Covered porch with wood-grain stamped concrete around support posts",
    hero: false,
    featured: false,
    serviceId: "stamped-concrete",
  },
  {
    filename: "foundation-project-01.jpg",
    category: "Residential Foundation",
    caption: "Foundation walls — residential build",
    alt: "Completed residential concrete foundation walls in an excavated lot near Powers, Michigan",
    hero: false,
    featured: true,
    serviceId: "foundations",
  },
  {
    filename: "foundation-project-02.jpg",
    category: "Residential Foundation",
    caption: "Foundation forms before the pour",
    alt: "Residential foundation wall forms set and braced before concrete is poured",
    hero: false,
    featured: false,
    serviceId: "foundations",
  },
  {
    filename: "foundation-project-03.jpg",
    category: "Residential Foundation",
    caption: "Basement foundation and floor",
    alt: "Finished basement foundation walls and concrete floor slab in a wooded lot",
    hero: false,
    featured: false,
    serviceId: "foundations",
  },
];

function toProject(entry: Omit<ProjectImage, "src">): ProjectImage {
  return {
    ...entry,
    src: `/images/projects/${entry.filename}`,
  };
}

export function getProjectImages(): ProjectImage[] {
  return catalog.map(toProject);
}

export function getHeroImage(images: ProjectImage[] = getProjectImages()) {
  return images.find((image) => image.hero) ?? images[0];
}

export function getFoundationImage(images: ProjectImage[] = getProjectImages()) {
  return images.find((image) => image.filename === "foundation-project-01.jpg") ?? images[0];
}

export function getIntroImage(images: ProjectImage[] = getProjectImages()) {
  return images.find((image) => image.filename === "garage-slab-01.jpg") ?? images.find((image) => !image.hero);
}

export function getFeaturedImages(images: ProjectImage[] = getProjectImages()) {
  return images.filter((image) => image.featured && !image.hero);
}

export function getGalleryImages(images: ProjectImage[] = getProjectImages()) {
  return images.filter((image) => !image.hero);
}

export function getServiceImage(serviceId: string, images: ProjectImage[] = getProjectImages()) {
  return images.find((image) => image.serviceId === serviceId && image.featured) ??
    images.find((image) => image.serviceId === serviceId);
}

export function getImagesByCategory(images: ProjectImage[], category: string) {
  return images.filter((image) => image.category === category);
}
