import type { MetadataRoute } from "next";
import {
  regionPages,
  SITE_URL,
  UPDATED_DATE,
  workforcePages,
} from "./seo-data";

const partnershipRoutes = [
  "/partnership/employer-role-requirements",
  "/partnership/readiness-credential-controls",
  "/partnership/deployment-workforce-support",
  "/partnership/performance-retention-reporting",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${UPDATED_DATE}T00:00:00+10:00`);
  const coreRoutes = [
    ["", "monthly", 1],
    ["/framework", "monthly", 0.9],
    ["/engage", "monthly", 0.9],
    ["/cpd", "monthly", 0.9],
    ["/about", "monthly", 0.8],
    ["/service-charter", "monthly", 0.8],
    ["/faq", "monthly", 0.8],
    ["/privacy", "yearly", 0.5],
  ] as const;

  return [
    ...coreRoutes.map(([path, changeFrequency, priority]) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...workforcePages.map((page) => ({
      url: `${SITE_URL}/workforce/${page.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...regionPages.map((page) => ({
      url: `${SITE_URL}/regions/${page.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...partnershipRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.55,
    })),
  ];
}
