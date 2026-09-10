import fs from "fs";
import path from "path";

export type ProjectImage = {
  src: string;
  filename: string;
  alt: string;
  category: string;
  hero: boolean;
  featured: boolean;
};

const PROJECTS_DIR = path.join(process.cwd(), "public", "images", "projects");
const LOGO_DIR = path.join(process.cwd(), "public", "images", "logo");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const CATEGORY_RULES: { test: RegExp; category: string; hero?: boolean }[] = [
  { test: /hero/i, category: "Featured Project", hero: true },
  { test: /foundation|basement|wall/i, category: "Residential Foundation" },
  { test: /stamped|decorative/i, category: "Stamped Patio" },
  { test: /sidewalk|walkway/i, category: "Sidewalk Installation" },
  { test: /garage/i, category: "Garage Slab" },
  { test: /driveway/i, category: "Driveway" },
  { test: /patio/i, category: "Patio" },
  { test: /slab/i, category: "Concrete Slab" },
  { test: /flatwork|finish/i, category: "Flatwork" },
];

function categorize(filename: string) {
  for (const rule of CATEGORY_RULES) {
    if (rule.test.test(filename)) {
      return { category: rule.category, hero: Boolean(rule.hero) };
    }
  }
  return { category: "Residential Concrete", hero: false };
}

function titleFromFilename(filename: string) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b(hero|project)\b/gi, "")
    .replace(/\b\d+\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getFeaturedImages(images: ProjectImage[], count = 6) {
  const picked: ProjectImage[] = [];
  const seen = new Set<string>();

  const hero = images.find((image) => image.hero);
  if (hero) {
    picked.push(hero);
    seen.add(hero.category);
  }

  for (const image of images) {
    if (picked.length >= count) break;
    if (picked.includes(image) || seen.has(image.category)) continue;
    picked.push(image);
    seen.add(image.category);
  }

  for (const image of images) {
    if (picked.length >= count) break;
    if (!picked.includes(image)) picked.push(image);
  }

  return picked;
}

export function getProjectImages(): ProjectImage[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => IMAGE_EXT.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return files.map((filename, index) => {
    const { category, hero } = categorize(filename);
    const label = titleFromFilename(filename);
    const alt = label
      ? `JR’s Concrete ${label} — ${category} in the Powers, Michigan area`
      : `JR’s Concrete ${category.toLowerCase()} project in the Powers, Michigan area`;

    return {
      src: `/images/projects/${filename}`,
      filename,
      alt,
      category,
      hero,
      featured: hero || index < 8,
    };
  });
}

export function getHeroImage(images: ProjectImage[]): ProjectImage | undefined {
  return images.find((image) => image.hero) ?? images[0];
}

export function getFoundationImage(images: ProjectImage[]): ProjectImage | undefined {
  return (
    images.find((image) => image.category === "Residential Foundation") ??
    images.find((image) => /foundation/i.test(image.filename)) ??
    images[1] ??
    images[0]
  );
}

export function getIntroImage(images: ProjectImage[]): ProjectImage | undefined {
  return (
    images.find((image) => image.category === "Garage Slab") ??
    images.find((image) => image.category === "Sidewalk Installation") ??
    images.find((image) => image.category === "Concrete Slab" && !/prep/i.test(image.filename)) ??
    images.find((image) => !image.hero) ??
    images[0]
  );
}

export function getImagesByCategory(images: ProjectImage[], category: string) {
  return images.filter((image) => image.category === category);
}

export function getLogoSrc() {
  if (!fs.existsSync(LOGO_DIR)) return null;

  const preferred = [
    "jr-concrete-logo.png",
    "jr-concrete-logo.svg",
    "jr-concrete-logo.webp",
    "logo.png",
    "logo.svg",
    "logo.webp",
  ];

  for (const name of preferred) {
    if (fs.existsSync(path.join(LOGO_DIR, name))) {
      return `/images/logo/${name}`;
    }
  }

  const match = fs
    .readdirSync(LOGO_DIR)
    .find((file) => IMAGE_EXT.has(path.extname(file).toLowerCase()) || file.endsWith(".svg"));

  return match ? `/images/logo/${match}` : null;
}
