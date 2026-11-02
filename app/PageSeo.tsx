import { seoPages, siteUrl } from "./seo-pages";

export default function PageSeo({ path }: { path: string }) {
  const page = seoPages[path];
  const url = `${siteUrl}${path}`;
  const graph: Record<string, unknown>[] = [{
    "@type": path === "/about" ? "AboutPage" : path === "/roles" ? "CollectionPage" : "WebPage",
    "@id": `${url}#webpage`, url, name: page.label, description: page.description,
    inLanguage: "en-AU", isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
    ...(path !== "/" ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  }];
  if (path !== "/") graph.push({
    "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: page.label, item: url },
    ],
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }} />;
}
