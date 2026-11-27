import { posts } from "./blog/posts";
import type { Metadata } from "next";

export const siteUrl = "https://healthplusint.com.au";
export const seoPages: Record<string, { label: string; title: string; description: string }> = {
  "/blog": { label: "Blog & Guides", title: "Nursing & Healthcare Workforce Guides", description: "Practical guides for NSW healthcare employers and workers: aged care staffing, nursing registration, regional careers and rural living." },
  ...Object.fromEntries(posts.map(post => [`/blog/${post.slug}`, { label: post.title, title: post.seoTitle, description: post.description }])),
  "/": {
    "label": "Home",
    "title": "Healthcare Workforce Development NSW | Healthplus",
    "description": "HPI recruits and places nurses, aged care workers and support workers in Sydney and regional NSW. Request staff or register for work."
  },
  "/employers": {
    "label": "Employers",
    "title": "Healthcare Recruitment & Staffing NSW",
    "description": "Request nurses, aged care workers, support workers or selected allied health staff in Sydney and regional NSW. We’ll contact you within one business day."
  },
  "/work-with-us": {
    "label": "Healthcare Workers",
    "title": "Nursing, Aged Care & Support Work NSW",
    "description": "Register for nursing, aged care or community support work in Sydney and regional NSW. Upload your résumé and tell us where and when you can work."
  },
  "/roles": {
    "label": "Roles We Support",
    "title": "Nursing, Aged Care & Support Worker Roles NSW",
    "description": "Explore roles for nurses, aged care workers and support workers in NSW, including community roles for people with disability support worker experience."
  },
  "/about": {
    "label": "About HPI",
    "title": "About Healthplus International | NSW Healthcare Workforce",
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
    "description": "How to request healthcare workers or register for work in NSW. Find out what to submit, what happens next and how HPI handles role checks."
  },
  "/ahpra-registration-support": {
    "label": "AHPRA Support",
    "title": "Ahpra Registration Support for Overseas Nurses",
    "description": "Fee-for-service Ahpra registration support for overseas nurses, including document organisation, pathway guidance and workplace readiness."
  },
  "/regional-nsw-healthcare-workforce": {
    label: "Regional NSW",
    title: "Healthcare Recruitment in Regional NSW",
    description: "Regional NSW workforce support for hospitals, aged care and community services. Plan a placement or register for regional work."
  },
  "/aged-care-workforce-nsw": {
    label: "Aged Care Workforce",
    title: "Aged Care Workforce Providers NSW",
    description: "Request nurses and aged care workers for NSW aged care facilities. HPI recruits, employs and places workers, with role-specific checks and rostering support."
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
  "/": "2026-11-27",
  "/employers": "2026-11-27",
  "/work-with-us": "2026-11-27",
  "/roles": "2026-11-27",
  "/about": "2026-11-27",
  "/why-hpi": "2026-11-13",
  "/faq": "2026-11-27",
  "/ahpra-registration-support": "2026-11-27",
  "/regional-nsw-healthcare-workforce": "2026-11-27",
  "/aged-care-workforce-nsw": "2026-11-27",
  "/blog": "2026-11-27",
  "/blog/regional-healthcare-staffing-brief-nsw": "2026-11-27",
  "/blog/regional-healthcare-first-shift-onboarding": "2026-11-27",
  "/blog/aged-care-staffing-checklist-nsw": "2026-11-13",
  "/blog/nursing-registration-australia-overseas-nurses": "2026-11-16",
  "/blog/life-in-rural-australia-healthcare-workers": "2026-11-13",
  "/blog/first-regional-nursing-job-checklist": "2026-11-13",
  "/privacy": "2026-11-12",
};

export function pageMetadata(path: string): Metadata {
  const page = seoPages[path];
  const post = posts.find(post => path === `/blog/${post.slug}`);
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
      ...(post ? { type: "article" as const, publishedTime: post.published, modifiedTime: post.modified ?? post.published, authors: [`${siteUrl}/about`], section: post.category } : { type: "website" as const }), locale: "en_AU", siteName: "Healthplus International",
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
