import type { MetadataRoute } from "next";

// Search crawlers discover public HPI content independently of model-training crawlers.
// Keep the OAI-SearchBot and Claude-SearchBot tokens explicit for crawler audits.
// robots.txt is a discovery preference, not an access-control mechanism.
const publicRules = {
  allow: "/",
  disallow: ["/api/"],
};

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...publicRules },
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Googlebot",
          "Bingbot",
        ],
        ...publicRules,
      },
    ],
    sitemap: "https://healthplusint.com.au/sitemap.xml",
    host: "https://healthplusint.com.au",
  };
}
