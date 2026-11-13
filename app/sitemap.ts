import { seoPages, siteUrl, pageLastModified } from "./seo-pages";
import { regionPhotos } from "./region-photos";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(seoPages).map(path => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    ...(pageLastModified[path] ? { lastModified: pageLastModified[path] } : {}),
    changeFrequency: path === "/privacy" ? "yearly" as const : "monthly" as const,
    priority: path === "/" ? 1 : ["/employers", "/work-with-us", "/roles", "/aged-care-workforce-nsw"].includes(path) ? 0.9 : path === "/privacy" ? 0.5 : 0.8,
    ...((path === "/employers" || path === "/work-with-us") ? {
      images: [
        ...(path === "/employers" ? ["https://healthplusint.com.au/assets/hero-hpi-care.webp"] : []),
        "https://healthplusint.com.au/assets/hpi-happy-healthcare-team.webp",
        ...Object.keys(regionPhotos).map(slug => `https://healthplusint.com.au/assets/regions/${slug}.webp`),
      ],
    } : path === "/regional-nsw-healthcare-workforce" ? { images: [`${siteUrl}/assets/regions/murrumbidgee.webp`] } : path === "/aged-care-workforce-nsw" ? { images: [`${siteUrl}/assets/aged-care-workforce-community.webp`] } : path === "/" ? { images: ["https://healthplusint.com.au/assets/hero-hpi-care.webp"] } : {}),
  }));
}
