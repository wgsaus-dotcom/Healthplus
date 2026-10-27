import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ["", "monthly", 1],
    ["/employers", "monthly", 0.9],
    ["/work-with-us", "monthly", 0.9],
    ["/roles", "monthly", 0.9],
    ["/about", "monthly", 0.8],
    ["/faq", "monthly", 0.8],
    ["/privacy", "yearly", 0.5],
  ] as const;
  return routes.map(([path, changeFrequency, priority]) => ({
    url: `https://healthplusint.com.au${path}`,
    changeFrequency,
    priority,
  }));
}
