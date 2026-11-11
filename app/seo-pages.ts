import { posts } from "./blog/posts";
import type { Metadata } from "next";

export const siteUrl = "https://healthplusint.com.au";
export const seoPages: Record<string, { label: string; title: string; description: string }> = {
  "/blog": { label: "Blog & Guides", title: "Healthcare Workforce Guides", description: "Practical guides for NSW healthcare employers and workers: aged care staffing, nursing registration, regional careers and rural living." },
  ...Object.fromEntries(posts.map(post => [`/blog/${post.slug}`, { label: post.title, title: post.seoTitle, description: post.description }])),
  "/": {
    "label": "Home",
    "title": "Healthcare Workforce Development NSW | Healthplus International",
    "description": "Healthplus International recruits, employs and places nurses, aged care and support workers across Sydney and regional NSW. Request workers or register for work."
  },
  "/employers": {
    "label": "Employers",
    "title": "Healthcare Recruitment & Staffing NSW",
    "description": "Request nurses, aged care, support workers and allied health professionals across NSW. HPI coordinates recruitment, compliance, rostering and placement support."
  },
  "/work-with-us": {
    "label": "Healthcare Workers",
    "title": "Nursing Careers & Employer Sponsorship NSW",
    "description": "Explore NSW nursing and support work. Ask about business sponsorship, including the Skills in Demand visa (subclass 482 / SC482), subject to eligibility."
  },
  "/roles": {
    "label": "Positions",
    "title": "Nursing, Aged Care & Allied Health Roles NSW",
    "description": "Explore nursing, aged care and allied health recruitment across Sydney and regional NSW. See role checks, request Healthcare Workers or register for work."
  },
  "/about": {
    "label": "About HPI",
    "title": "About HPI and Workforce Development",
    "description": "Meet Healthplus International, a healthcare workforce development business in Helensburgh, NSW. Read how we work and our service charter."
  },
  "/why-hpi": {
    "label": "Why HPI",
    "title": "Why Healthplus: Healthcare Workforce Development",
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
    ? { url: `${siteUrl}/assets/aged-care-workforce-community.webp`, width: 1440, height: 810, alt: "Healthcare workers forming two hands around a heart made of older adults" }
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
