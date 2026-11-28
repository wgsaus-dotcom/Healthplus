import { posts } from "./blog/posts";
import { seoPages, siteUrl, pageLastModified } from "./seo-pages";
import { leadership } from "./business-profile";

export default function PageSeo({ path }: { path: string }) {
  const page = seoPages[path];
  const url = `${siteUrl}${path}`;
  const graph: Record<string, unknown>[] = [{
    "@type": path === "/about" ? "AboutPage" : ["/roles", "/blog"].includes(path) ? "CollectionPage" : "WebPage",
    "@id": `${url}#webpage`, url, name: page.title, description: page.description,
    inLanguage: "en-AU", publisher: { "@id": `${siteUrl}/#organization` }, isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
    ...(pageLastModified[path] ? { dateModified: pageLastModified[path] } : {}),
    ...(path !== "/" ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  }];
  if (path === "/blog") {
    graph[0].mainEntity = {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem", position: index + 1,
        name: post.title, url: `${siteUrl}/blog/${post.slug}`,
      })),
    };
  }
  if (path === "/about") {
    graph[0].mainEntity = { "@id": `${siteUrl}/#organization` };
    graph[0].mentions = { "@id": leadership.id };
    graph.push({
      "@type": "Person", "@id": leadership.id,
      name: leadership.name, jobTitle: leadership.jobTitle, url: leadership.id,
      worksFor: { "@id": `${siteUrl}/#organization` },
    });
  }
  const orange = path === "/healthcare-staffing-orange-nsw";
  const agedCare = path === "/aged-care-workforce-nsw";
  const workforceService = orange || agedCare || path === "/employers" || path === "/regional-nsw-healthcare-workforce";
  if (workforceService || path === "/ahpra-registration-support") {
    const serviceId = `${url}#service`;
    graph[0].mainEntity = { "@id": serviceId };
    graph.push({
      "@type": "Service", "@id": serviceId, url,
      name: orange ? "Healthcare staffing and recruitment in Orange NSW" : agedCare ? "Aged care workforce providers in NSW" : path === "/regional-nsw-healthcare-workforce" ? "Healthcare recruitment in regional NSW" : workforceService ? "Healthcare workforce development and staffing in NSW" : "Ahpra registration administrative support for internationally qualified nurses",
      description: page.description,
      provider: { "@id": `${siteUrl}/#organization` },
      ...(workforceService ? { areaServed: orange ? { "@type": "City", name: "Orange", containedInPlace: { "@type": "State", name: "New South Wales" } } : { "@type": "State", name: "New South Wales" } } : {}),
      serviceType: workforceService ? "Healthcare workforce recruitment, compliance and placement" : "Administrative registration coordination and professional readiness support",
    });
  }
  if (path !== "/") graph.push({
    "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      ...((agedCare || orange) ? [
        { "@type": "ListItem", position: 2, name: "Employers", item: `${siteUrl}/employers` },
        { "@type": "ListItem", position: 3, name: page.label, item: url },
      ] : path === "/regional-nsw-healthcare-workforce" ? [
        { "@type": "ListItem", position: 2, name: "Healthcare Workers", item: `${siteUrl}/work-with-us` },
        { "@type": "ListItem", position: 3, name: page.label, item: url },
      ] : [{ "@type": "ListItem", position: 2, name: page.label, item: url }]),
    ],
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }} />;
}
