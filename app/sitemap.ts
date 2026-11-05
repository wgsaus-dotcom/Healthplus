import { seoPages, siteUrl } from "./seo-pages";
import { regionPhotos } from "./region-photos";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(seoPages).map(path => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    changeFrequency: path === "/privacy" ? "yearly" as const : "monthly" as const,
    priority: path === "/" ? 1 : ["/employers", "/work-with-us", "/roles"].includes(path) ? 0.9 : path === "/privacy" ? 0.5 : 0.8,
    ...((path === "/employers" || path === "/work-with-us") ? {
      images: [
        ...(path === "/employers" ? ["https://healthplusint.com.au/assets/hero-hpi-care.webp"] : []),
        "https://healthplusint.com.au/assets/hpi-happy-healthcare-team.webp",
        ...Object.keys(regionPhotos).map(slug => `https://healthplusint.com.au/assets/regions/${slug}.webp`),
      ],
    } : path === "/" ? { images: ["https://healthplusint.com.au/assets/hero-hpi-care.webp"] } : {}),
  }));
}
