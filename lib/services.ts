export const services = [
  {
    id: "driveways",
    title: "Driveways",
    summary: "Durable concrete driveways built for Michigan weather and everyday use.",
    details:
      "JR’s Concrete pours residential driveways designed for daily traffic and Upper Peninsula seasons. We focus on a clean finish and a surface that holds up to the way people actually use their property.",
    category: "Driveway",
    goodFit: "New homes, replacements for cracked or settling drives, and wider approaches for trucks or trailers.",
    estimateFactors:
      "Size, removal of existing concrete or gravel, base preparation, access for trucks, slope for drainage, and the finish you want.",
    expect:
      "We review the site, set grades for drainage, prepare the base, form the edges, pour, and finish. Cure time depends on weather.",
  },
  {
    id: "patios",
    title: "Patios",
    summary: "Clean, functional outdoor spaces including standard and decorative concrete.",
    details:
      "From a straightforward backyard patio to a decorative pour, we build outdoor living spaces that stay level, drain well, and look finished when the forms come off.",
    category: "Patio",
    goodFit: "Backyard living areas, raised pads, and custom shapes that follow the house or the view.",
    estimateFactors:
      "Shape and size, steps or raised edges, decorative vs. standard finish, and how the patio meets the house and yard.",
    expect:
      "We confirm the layout, prepare the base, form the edges — including rounded or custom shapes — then pour and finish.",
  },
  {
    id: "sidewalks",
    title: "Sidewalks & Walkways",
    summary: "Professional sidewalks, paths and residential flatwork.",
    details:
      "We install sidewalks and walkways that connect the house to the yard, the garage, or the street — with clean edges and a surface that’s comfortable to walk on.",
    category: "Sidewalk Installation",
    goodFit: "Front walks, paths to outbuildings, and replacements for uneven or broken sidewalks.",
    estimateFactors: "Length and width, steps or stoops, grade changes, and whether old concrete needs to come out.",
    expect:
      "Walks are formed to the path you use every day, poured, and finished so edges stay clean and the surface drains away from the house.",
  },
  {
    id: "slabs",
    title: "Garage & Building Slabs",
    summary: "Properly prepared and finished concrete slabs for garages, shops and other structures.",
    details:
      "Garage slabs, shop floors, and building pads need the right preparation before the pour. JR’s Concrete handles residential slabs for garages, shops, and other structures.",
    category: "Garage Slab",
    goodFit: "Garages, shops, outbuildings, and other residential building pads.",
    estimateFactors:
      "Footprint, thickness, reinforcement, vapor barrier, interior vs. outdoor, and access for placing concrete.",
    expect:
      "We prepare the base, set forms, place reinforcement and vapor barrier where the job needs it, then pour and finish the slab.",
  },
  {
    id: "foundations",
    title: "Foundations",
    summary: "Foundation walls, basement foundations and residential foundation work.",
    details:
      "A strong build starts with a strong foundation. We handle residential foundation walls, basement foundations, and structural concrete work with careful preparation and execution.",
    category: "Residential Foundation",
    goodFit: "New homes, additions, and basement or crawlspace foundation walls.",
    estimateFactors:
      "Wall height and layout, basement vs. frost walls, site access, and how the floor slab is handled.",
    expect:
      "Forms are set and braced, concrete is placed, and walls are stripped after they have set. Floor slabs can follow once the walls are ready.",
  },
  {
    id: "stamped-concrete",
    title: "Stamped Concrete",
    summary: "Decorative concrete that adds texture and character to patios, walkways and outdoor spaces.",
    details:
      "Stamped and decorative concrete brings texture and character to patios, walkways, and outdoor living areas — a finished look without losing the durability of a proper concrete pour.",
    category: "Stamped Patio",
    goodFit: "Patios, porches, and walkways where you want a wood, stone, or patterned look.",
    estimateFactors:
      "Pattern, color, size, and whether the pour includes curves, steps, or a fire-pit opening.",
    expect:
      "The slab is poured, stamped while the concrete is still workable, and left to cure. Timing on stamp day is important, so weather matters.",
  },
] as const;

export const additionalServices = [
  "Residential flatwork",
  "Building slabs",
  "Basement foundations",
  "Foundation walls",
  "Custom concrete projects",
] as const;
