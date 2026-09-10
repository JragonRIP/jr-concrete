export const site = {
  name: "JR’s Concrete",
  shortName: "JR’s",
  location: "Powers, Michigan",
  city: "Powers",
  region: "MI",
  regionName: "Michigan",
  area: "Powers, Michigan and surrounding Upper Peninsula communities",
  phone: "(906) 241-0001",
  phoneTel: "+19062410001",
  phoneCompact: "906-241-0001",
  email: "johnraab1@gmail.com",
  description:
    "JR’s Concrete provides residential concrete flatwork, driveways, patios, slabs, stamped concrete and foundations in Powers, Michigan and surrounding Upper Peninsula communities.",
  tagline: "Family-owned concrete contractor specializing in residential flatwork and foundations.",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Powers%2C%20Michigan&z=11&hl=en&output=embed",
  mapLinkUrl: "https://www.google.com/maps/search/?api=1&query=Powers%2C%20Michigan",
  formSubmitUrl: "https://formsubmit.co/ajax/johnraab1@gmail.com",
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://jr-concrete-pi.vercel.app";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerServices = [
  { href: "/services#driveways", label: "Driveways" },
  { href: "/services#patios", label: "Patios" },
  { href: "/services#sidewalks", label: "Sidewalks" },
  { href: "/services#slabs", label: "Slabs" },
  { href: "/services#foundations", label: "Foundations" },
  { href: "/services#stamped-concrete", label: "Stamped Concrete" },
] as const;

export const projectTypes = [
  "Driveway",
  "Patio",
  "Sidewalk / Walkway",
  "Slab",
  "Foundation",
  "Stamped Concrete",
  "Other",
] as const;

export type ProjectType = (typeof projectTypes)[number];

export const contactMethods = ["Call", "Text", "Email"] as const;

export type ContactMethod = (typeof contactMethods)[number];
