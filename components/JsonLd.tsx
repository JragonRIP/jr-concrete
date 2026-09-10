import { site, siteUrl } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    name: site.name,
    description: site.description,
    url: siteUrl,
    telephone: site.phoneTel,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "Place",
      name: site.area,
    },
    image: [`${siteUrl}/images/logo/logo-on-light.png`, `${siteUrl}/opengraph-image`],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
