// HPI-BRF-WEB-001 v02.01.26: permanent redirects for retired pages.
export const legacyRedirects: Readonly<Record<string, string>> = {
  "/engage": "/employers",
  "/framework": "/employers",
  "/cpd": "/about#how-we-work",
  "/service-charter": "/about#charter",
  "/workforce/registered-nurses": "/roles#registered-nurses",
  "/workforce/assistants-in-nursing": "/roles#assistants-in-nursing",
  "/workforce/aged-care-workers": "/roles#aged-care-workers",
  "/workforce/support-workers": "/roles#support-workers",
  "/workforce/allied-health": "/roles#allied-health",
  "/workforce/enrolled-nurses": "/roles",
  "/workforce/remote-site-health": "/roles",
  "/regions/far-west-nsw": "/employers#region-far-west-nsw",
  "/regions/western-nsw": "/employers#region-western-nsw",
  "/regions/murrumbidgee": "/employers#region-murrumbidgee",
  "/regions/hunter-new-england": "/employers#region-hunter-new-england",
  "/regions/northern-nsw": "/employers#region-northern-nsw",
  "/regions/mid-north-coast": "/employers#region-mid-north-coast",
};

export function legacyDestination(pathname: string): string | undefined {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path.startsWith("/partnership/")) return "/about#partners";
  return legacyRedirects[path];
}
