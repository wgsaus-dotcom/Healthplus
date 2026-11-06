import type { Metadata } from "next";

export const siteUrl = "https://healthplusint.com.au";
export const seoPages: Record<string, { label: string; title: string; description: string }> = {
  "/": {
    "label": "Home",
    "title": "Healthcare Workforce Development NSW | Healthplus International",
    "description": "Healthcare workforce development across Sydney and regional NSW. Connect with nurses, aged care and support workers, or register for work with Healthplus."
  },
  "/employers": {
    "label": "Employers",
    "title": "Nursing Agency & Healthcare Labour Hire NSW",
    "description": "Looking for a nursing agency or healthcare labour hire in Sydney or regional NSW? Request nurses, aged care and support workers with Healthplus."
  },
  "/work-with-us": {
    "label": "Healthcare Workers",
    "title": "Nursing Careers & Employer Sponsorship NSW",
    "description": "Explore NSW nursing and support work. Ask about business sponsorship, including the Skills in Demand visa (subclass 482 / SC482), subject to eligibility."
  },
  "/roles": {
    "label": "Positions",
    "title": "Nursing, Aged Care & Allied Health Roles NSW",
    "description": "Explore HPI positions for Nurses, Doctors, Allied Health, Assistants in Nursing, Aged Care Workers and Support Workers across NSW."
  },
  "/about": {
    "label": "About HPI",
    "title": "About HPI and Workforce Development",
    "description": "Meet Healthplus International, a healthcare workforce development business in Helensburgh, NSW. Read how we work and our service charter."
  },
  "/why-hpi": {
    "label": "Why HPI",
    "title": "Nursing Agency, Labour Hire & Workforce Development",
    "description": "Comparing nursing agencies and healthcare labour hire? Explore Healthplus’s NSW workforce development approach, from readiness and placement to ongoing support."
  },
  "/faq": {
    "label": "FAQ",
    "title": "Healthcare Workforce FAQs",
    "description": "Answers about HPI healthcare staffing, worker registration, role checks, regional NSW coverage, privacy and how to contact our team."
  },
  "/ahpra-registration-support": {
    "label": "AHPRA Support",
    "title": "Ahpra Registration Support for Overseas Nurses",
    "description": "Fee-for-service Ahpra registration support for internationally qualified nurses: document coordination, pathway guidance and Australian workplace readiness."
  },
  "/regional-nsw-healthcare-workforce": {
    label: "Regional NSW",
    title: "Regional NSW Healthcare Workforce",
    description: "Regional NSW nursing recruitment, aged care staffing and allied health workforce development. Request Healthcare Workers or explore regional career pathways."
  },
  "/aged-care-workforce-nsw": {
    label: "Aged Care Workforce",
    title: "Aged Care Workforce Providers NSW",
    description: "Request RNs, ENs and care workers for NSW aged care facilities. Healthplus supports roster planning with role-specific checks and placement coordination."
  },
  "/privacy": {
    "label": "Privacy Policy",
    "title": "Privacy Policy",
    "description": "How Healthplus International collects, uses, stores and protects personal information supplied through healthcare workforce enquiries and registration."
  }
};

export function pageMetadata(path: string): Metadata {
  const page = seoPages[path];
  const socialImage = path === "/aged-care-workforce-nsw"
    ? { url: `${siteUrl}/assets/aged-care-workforce-team.webp`, width: 1440, height: 810, alt: "Healthcare workers forming two hands around a heart made of older adults" }
    : path === "/regional-nsw-healthcare-workforce"
    ? { url: `${siteUrl}/assets/regions/murrumbidgee.webp`, width: 960, height: 480, alt: "Wagga Wagga in the Riverina, regional New South Wales" }
    : { url: `${siteUrl}/assets/hero-hpi-care.webp`, width: 900, height: 600, alt: "Healthcare professional supporting an older woman" };
  return {
    title: path === "/" ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      type: "website", locale: "en_AU", siteName: "Healthplus International",
      title: path === "/" ? page.title : `${page.title} | Healthplus International`,
      description: page.description, url: `${siteUrl}${path}`,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image", title: path === "/" ? page.title : `${page.title} | Healthplus International`,
      description: page.description, images: [socialImage.url],
    },
  };
}
