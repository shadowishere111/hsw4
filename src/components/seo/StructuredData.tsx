export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "House of Software",
    alternateName: "بيت البرمجيات",
    url: "https://houseofsw.com",
    description:
      "International software engineering company specializing in enterprise software, CRM, ERP, SaaS, and AI solutions.",
    founder: {
      "@type": "Person",
      name: "Mohamed Ehab",
      birthDate: "2000-11-07",
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Enterprise Software",
      "Web Development",
      "CRM Systems",
      "ERP Systems",
      "AI Solutions",
      "SaaS Platforms",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@houseofsw.com",
      contactType: "customer service",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
