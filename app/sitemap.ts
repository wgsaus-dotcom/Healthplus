import { regionPhotos } from "./region-photos";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ["", "monthly", 1],
    ["/employers", "monthly", 0.9],
    ["/work-with-us", "monthly", 0.9],
    ["/roles", "monthly", 0.9],
    ["/about", "monthly", 0.8],
    ["/why-hpi", "monthly", 0.8],
    ["/ahpra-registration-support", "monthly", 0.8],
    ["/faq", "monthly", 0.8],
    ["/privacy", "yearly", 0.5],
  ] as const;
  return routes.map(([path, changeFrequency, priority]) => ({
    url: `https://healthplusint.com.au${path}`,
    changeFrequency,
    priority,
    ...((path === "/employers" || path === "/work-with-us") ? {
      images: [
        ...(path === "/employers" ? ["https://healthplusint.com.au/assets/hero-hpi-care.webp"] : []),
        "https://healthplusint.com.au/assets/hpi-happy-healthcare-team.webp",
        ...Object.keys(regionPhotos).map(slug => `https://healthplusint.com.au/assets/regions/${slug}.webp`),
      ],
    } : path === "" ? { images: ["https://healthplusint.com.au/assets/hero-hpi-care.webp"] } : {}),
  }));
}
