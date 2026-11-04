import type { Metadata } from "next";

export const siteUrl = "https://healthplusint.com.au";
export const seoPages: Record<string, { label: string; title: string; description: string }> = {
  "/": {
    "label": "Home",
    "title": "Healthcare Workforce Development NSW | HPI",
    "description": "Health Plus International recruits, employs and places healthcare workers across Sydney and regional NSW. Based in Helensburgh, NSW."
  },
  "/employers": {
    "label": "Employers",
    "title": "Healthcare Staffing NSW",
    "description": "Request healthcare workers for hospitals, aged care and community services across NSW. HPI acknowledges requests and contacts you within one business day."
  },
  "/work-with-us": {
    "label": "Healthcare Workers",
    "title": "Healthcare Work in NSW",
    "description": "Register for healthcare work across Sydney and regional NSW. Upload your r\u00e9sum\u00e9 and complete two short steps with HPI. Compliance documents come later."
  },
  "/roles": {
    "label": "Positions",
    "title": "Healthcare Positions in NSW",
    "description": "Explore HPI positions for Nurses, Doctors, Allied Health, Assistants in Nursing, Aged Care Workers and Support Workers across NSW."
  },
  "/about": {
    "label": "About HPI",
    "title": "About HPI and Workforce Development",
    "description": "Meet Health Plus International, a healthcare workforce development business in Helensburgh, NSW. Read how we work and our service charter."
  },
  "/why-hpi": {
    "label": "Why HPI",
    "title": "More Than Labour Hire | The HPI Difference",
    "description": "HPI is the bridge connecting healthcare workforce needs with people, professional readiness and long-term workforce development across NSW."
  },
  "/faq": {
    "label": "FAQ",
    "title": "Healthcare Workforce FAQs",
    "description": "Answers about HPI healthcare staffing, worker registration, role checks, regional NSW coverage, privacy and how to contact our team."
  },
  "/ahpra-registration-support": {
    "label": "AHPRA Support",
    "title": "AHPRA Support for International Nurses",
    "description": "Explore administrative registration guidance, document coordination, examination preparation referrals and Australian professional readiness support with HPI."
  },
  "/privacy": {
    "label": "Privacy Policy",
    "title": "Privacy Policy",
    "description": "How Health Plus International collects, uses, stores and protects personal information supplied through healthcare workforce enquiries and registration."
  }
};

export function pageMetadata(path: string): Metadata {
  const page = seoPages[path];
  return {
    title: path === "/" ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      type: "website", locale: "en_AU", siteName: "Health Plus International",
      title: path === "/" ? page.title : `${page.title} | Health Plus International`,
      description: page.description, url: `${siteUrl}${path}`,
      images: [{ url: `${siteUrl}/assets/hero-hpi-care.webp`, width: 900, height: 600, alt: "Healthcare professional supporting an older woman" }],
    },
    twitter: {
      card: "summary_large_image", title: path === "/" ? page.title : `${page.title} | Health Plus International`,
      description: page.description, images: [`${siteUrl}/assets/hero-hpi-care.webp`],
    },
  };
}
