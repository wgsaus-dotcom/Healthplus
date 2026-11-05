import { seoPages, siteUrl } from "./seo-pages";

export default function PageSeo({ path }: { path: string }) {
  const page = seoPages[path];
  const url = `${siteUrl}${path}`;
  const graph: Record<string, unknown>[] = [{
    "@type": path === "/about" ? "AboutPage" : path === "/roles" ? "CollectionPage" : "WebPage",
    "@id": `${url}#webpage`, url, name: page.title, description: page.description,
    inLanguage: "en-AU", publisher: { "@id": `${siteUrl}/#organization` }, isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
    ...(path !== "/" ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  }];
  const workforceService = path === "/employers" || path === "/regional-nsw-healthcare-workforce";
  if (workforceService || path === "/ahpra-registration-support") {
    const serviceId = `${url}#service`;
    graph[0].mainEntity = { "@id": serviceId };
    graph.push({
      "@type": "Service", "@id": serviceId, url,
      name: workforceService ? "Healthcare workforce development and staffing in NSW" : "Ahpra registration administrative support for internationally qualified nurses",
      description: page.description,
      provider: { "@id": `${siteUrl}/#organization` },
      ...(workforceService ? { areaServed: { "@type": "State", name: "New South Wales" } } : {}),
      serviceType: workforceService ? "Healthcare workforce recruitment, compliance and placement" : "Administrative registration coordination and professional readiness support",
    });
  }
  if (path !== "/") graph.push({
    "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      ...(path === "/regional-nsw-healthcare-workforce" ? [
        { "@type": "ListItem", position: 2, name: "Healthcare Workers", item: `${siteUrl}/work-with-us` },
        { "@type": "ListItem", position: 3, name: page.label, item: url },
      ] : [{ "@type": "ListItem", position: 2, name: page.label, item: url }]),
    ],
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }} />;
}
