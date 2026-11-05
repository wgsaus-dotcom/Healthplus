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
    "title": "Nursing & Aged Care Staffing NSW",
    "description": "Request nurses, aged care and support workers for healthcare services across Sydney and regional NSW, with role-specific compliance and placement support."
  },
  "/work-with-us": {
    "label": "Healthcare Workers",
    "title": "Nursing & Support Worker Opportunities NSW",
    "description": "Register for nursing, aged care and support worker opportunities across NSW. Healthplus employees receive weekly pay and approved training support."
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
    "title": "Workforce Development & Labour Hire | The HPI Difference",
    "description": "See how Healthplus connects healthcare staffing with role readiness, onboarding, professional development and ongoing workforce support across NSW."
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
    title: "Healthcare Workforce Development & Staffing in Regional NSW",
    description: "Regional NSW healthcare staffing and workforce development for nursing, aged care and allied health. Request workers or explore regional career pathways."
  },
  "/privacy": {
    "label": "Privacy Policy",
    "title": "Privacy Policy",
    "description": "How Healthplus International collects, uses, stores and protects personal information supplied through healthcare workforce enquiries and registration."
  }
};

export function pageMetadata(path: string): Metadata {
  const page = seoPages[path];
  return {
    title: path === "/" ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      type: "website", locale: "en_AU", siteName: "Healthplus International",
      title: path === "/" ? page.title : `${page.title} | Healthplus International`,
      description: page.description, url: `${siteUrl}${path}`,
      images: [{ url: `${siteUrl}/assets/hero-hpi-care.webp`, width: 900, height: 600, alt: "Healthcare professional supporting an older woman" }],
    },
    twitter: {
      card: "summary_large_image", title: path === "/" ? page.title : `${page.title} | Healthplus International`,
      description: page.description, images: [`${siteUrl}/assets/hero-hpi-care.webp`],
    },
  };
}
