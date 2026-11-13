import { posts } from "./blog/posts";
import type { Metadata } from "next";

export const siteUrl = "https://healthplusint.com.au";
export const seoPages: Record<string, { label: string; title: string; description: string }> = {
  "/blog": { label: "Blog & Guides", title: "Nursing & Healthcare Workforce Guides", description: "Practical guides for NSW healthcare employers and workers: aged care staffing, nursing registration, regional careers and rural living." },
  ...Object.fromEntries(posts.map(post => [`/blog/${post.slug}`, { label: post.title, title: post.seoTitle, description: post.description }])),
  "/": {
    "label": "Home",
    "title": "Healthcare Workforce Development NSW | Healthplus",
    "description": "Healthplus International recruits, employs and places nurses, aged care and support workers across Sydney and regional NSW. Request workers or apply."
  },
  "/employers": {
    "label": "Employers",
    "title": "Healthcare Recruitment & Staffing NSW",
    "description": "Request nurses, aged care, support and allied health workers across NSW. We recruit, employ and place them, with checks and rostering support."
  },
  "/work-with-us": {
    "label": "Healthcare Workers",
    "title": "Nursing, Aged Care & Support Worker Jobs NSW",
    "description": "Explore nursing, aged care and support work across NSW. Upload your résumé and preferences so HPI can contact you about suitable opportunities."
  },
  "/roles": {
    "label": "Positions",
    "title": "Nursing, Aged Care & Allied Health Roles NSW",
    "description": "Explore nursing, aged care and allied health roles across NSW, with role-specific registration, qualification and screening requirements."
  },
  "/about": {
    "label": "About HPI",
    "title": "About Healthplus International | Healthcare Workforce NSW",
    "description": "Meet Healthplus International, a healthcare workforce development business in Helensburgh, NSW. Read how we work and our service charter."
  },
  "/why-hpi": {
    "label": "Why HPI",
    "title": "Healthcare Staffing vs Workforce Development",
    "description": "Comparing staffing agencies and labour hire? Explore HPI's NSW workforce development approach: role readiness, placement and ongoing support."
  },
  "/faq": {
    "label": "FAQ",
    "title": "Healthcare Recruitment & Job FAQs",
    "description": "Answers about healthcare recruitment, job applications, role checks, regional NSW coverage, Ahpra support and contacting Healthplus."
  },
  "/ahpra-registration-support": {
    "label": "AHPRA Support",
    "title": "Ahpra Registration Support for Overseas Nurses",
    "description": "Fee-for-service Ahpra registration support for overseas nurses, including document organisation, pathway guidance and workplace readiness."
  },
  "/regional-nsw-healthcare-workforce": {
    label: "Regional NSW",
    title: "Healthcare Recruitment in Regional NSW",
    description: "Healthcare recruitment for regional NSW hospitals, aged care and community services. Request workers or explore regional employment pathways."
  },
  "/aged-care-workforce-nsw": {
    label: "Aged Care Workforce",
    title: "Aged Care Workforce Providers NSW",
    description: "Request RNs, ENs and care workers for NSW aged care facilities. We recruit, employ and place staff, with role-specific checks and rostering support."
  },
  "/privacy": {
    "label": "Privacy Policy",
    "title": "Privacy Policy",
    "description": "How Healthplus International collects, uses, stores and protects personal information supplied through healthcare workforce enquiries and registration."
  }
};

// Dates of meaningful page content or search-metadata updates, in Sydney time.
// Change only affected entries when those pages change, never on every build.
export const pageLastModified: Record<string, string> = {
  "/": "2026-11-13",
  "/employers": "2026-11-13",
  "/work-with-us": "2026-11-13",
  "/roles": "2026-11-13",
  "/about": "2026-11-13",
  "/why-hpi": "2026-11-13",
  "/faq": "2026-11-13",
  "/ahpra-registration-support": "2026-11-13",
  "/regional-nsw-healthcare-workforce": "2026-11-13",
  "/aged-care-workforce-nsw": "2026-11-13",
  "/blog": "2026-11-13",
  "/blog/aged-care-staffing-checklist-nsw": "2026-11-13",
  "/blog/nursing-registration-australia-overseas-nurses": "2026-11-13",
  "/blog/life-in-rural-australia-healthcare-workers": "2026-11-13",
  "/blog/first-regional-nursing-job-checklist": "2026-11-13",
  "/privacy": "2026-11-12",
};

export function pageMetadata(path: string): Metadata {
  const page = seoPages[path];
  const title = path === "/" || path === "/about" ? page.title : `${page.title} | Healthplus`;
  const socialImage = path === "/aged-care-workforce-nsw"
    ? { url: `${siteUrl}/assets/aged-care-workforce-community.webp`, width: 1440, height: 810, alt: "Healthcare workers forming two hands around a heart made of older adults" }
    : path === "/regional-nsw-healthcare-workforce"
    ? { url: `${siteUrl}/assets/regions/murrumbidgee.webp`, width: 960, height: 480, alt: "Wagga Wagga in the Riverina, regional New South Wales" }
    : { url: `${siteUrl}/assets/hero-hpi-care.webp`, width: 900, height: 600, alt: "Healthcare professional supporting an older woman" };
  return {
    title: { absolute: title },
    description: page.description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      type: "website", locale: "en_AU", siteName: "Healthplus International",
      title,
      description: page.description, url: `${siteUrl}${path}`,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image", title,
      description: page.description, images: [socialImage.url],
    },
  };
}
