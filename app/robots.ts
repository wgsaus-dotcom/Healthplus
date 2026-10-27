import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://healthplusint.com.au/sitemap.xml",
    host: "https://healthplusint.com.au",
  };
}
