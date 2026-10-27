import assert from "node:assert/strict";
import test from "node:test";

const siteUrl = "https://healthplusint.com.au";
let workerPromise;

function loadWorker() {
  if (!workerPromise) {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
    workerPromise = import(workerUrl.href).then((module) => module.default);
  }
  return workerPromise;
}

async function fetchRoute(pathname, accept = "text/html") {
  const worker = await loadWorker();
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function canonicalPattern(pathname) {
  const expected = escapeRegex(`${siteUrl}${pathname || "/"}`);
  return new RegExp(
    `<link(?=[^>]*\\brel=["']canonical["'])(?=[^>]*\\bhref=["']${expected}["'])[^>]*>`,
    "i",
  );
}

test("homepage publishes clean, aligned production metadata and SEO links", async () => {
  const response = await fetchRoute("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const body = await response.text();
  assert.match(body, /<title>Healthcare Workforce Development NSW \| HPI<\/title>/i);
  assert.match(body, canonicalPattern(""));
  assert.doesNotMatch(body, /codex-preview/i);
  assert.doesNotMatch(body, /<meta[^>]+name=["']keywords["']/i);
  assert.match(body, /property=["']og:title["'][^>]+content=["']Healthcare Workforce Development NSW \| HPI["']/i);
  assert.match(body, /name=["']twitter:title["'][^>]+content=["']Healthcare Workforce Development NSW \| HPI["']/i);
  assert.match(body, /Build workforce readiness\./i);
  assert.match(body, /Strengthen retention\./i);
  assert.match(body, /What employers receive/i);
  assert.match(body, /Discuss a trial engagement/i);
  assert.match(body, /Compliance assurance/i);
  assert.match(body, /Sydney and regional NSW/i);
  assert.match(body, /I need workers/i);
  assert.match(body, /I(?:&#x27;|')m looking for work/i);
  assert.match(body, /hero-nurse\.jpg/i);
  assert.match(body, /far-west-community-health\.webp/i);
  assert.match(body, /Far West NSW/i);
  assert.match(body, /Representative setting/i);
  assert.doesNotMatch(body, /far-west-nsw-landscape\.webp/i);
  assert.doesNotMatch(body, /hero-outback\.jpg/i);
  assert.match(body, /href=["']\/workforce\/enrolled-nurses["']/i);
  assert.match(body, /href=["']\/regions\/far-west-nsw["']/i);
  assert.match(body, /href=["']\/cpd["']/i);
  assert.match(body, /structured continuing professional development/i);
  assert.match(body, /Express registration/i);
  assert.match(body, /Two short steps/i);
  assert.match(body, /Ahpra registration number/i);
  assert.match(body, /Upload your résumé \(optional\)/i);
  assert.match(body, /Immediate roster \/ bench mobilisation/i);
  assert.match(body, /Targeted sourcing/i);
  assert.match(body, /local settlement onboarding/i);
  assert.match(body, /No visa category or overseas origin is assumed/i);
  assert.match(body, /"propertyID":"ABN"/i);
});

const indexableRoutes = [
  ["/about", "About Health Plus International"],
  ["/engage", "Start at the level your workforce problem requires"],
  ["/framework", "Five stages from verified role to workforce retention"],
  ["/service-charter", "Respect in every interaction"],
  ["/faq", "Healthcare workforce frequently asked questions"],
  ["/cpd", "Structured learning. Visible evidence. Safer application."],
  ["/privacy", "Privacy"],
  ["/workforce/registered-nurses", "Registered Nurses workforce pathways in NSW"],
  ["/workforce/enrolled-nurses", "Enrolled Nurses workforce pathways in NSW"],
  ["/workforce/assistants-in-nursing", "Assistants in Nursing workforce pathways in NSW"],
  ["/workforce/aged-care-workers", "Aged Care Workers workforce pathways in NSW"],
  ["/workforce/support-workers", "Support Workers workforce pathways in NSW"],
  ["/workforce/allied-health", "Allied Health Professionals workforce pathways in NSW"],
  ["/workforce/remote-site-health", "Remote and Site Health Personnel workforce pathways in NSW"],
  ["/regions/far-west-nsw", "Healthcare workforce development in Far West NSW"],
  ["/regions/western-nsw", "Healthcare workforce development in Western NSW"],
  ["/regions/murrumbidgee", "Healthcare workforce development in Murrumbidgee"],
  ["/regions/hunter-new-england", "Healthcare workforce development in Hunter New England"],
  ["/regions/northern-nsw", "Healthcare workforce development in Northern NSW"],
  ["/regions/mid-north-coast", "Healthcare workforce development in Mid North Coast"],
  ["/partnership/employer-role-requirements", "Employer and role requirements"],
  ["/partnership/readiness-credential-controls", "Readiness and credential controls"],
  ["/partnership/deployment-workforce-support", "Deployment and workforce support"],
  ["/partnership/performance-retention-reporting", "Performance and retention reporting"],
];

test("every indexable page renders a self-canonical and one intended H1", async () => {
  for (const [pathname, heading] of indexableRoutes) {
    const response = await fetchRoute(pathname);
    assert.equal(response.status, 200, `${pathname} should return 200`);
    const body = await response.text();
    const normalizedBody = body.replace(/<!-- -->/g, "");
    assert.match(body, canonicalPattern(pathname), `${pathname} should be self-canonical`);
    assert.equal((body.match(/<h1\b/gi) ?? []).length, 1, `${pathname} should have one H1`);
    assert.match(normalizedBody, new RegExp(escapeRegex(heading), "i"), `${pathname} should render its intended heading`);
    assert.doesNotMatch(body, /codex-preview/i, `${pathname} should not expose preview metadata`);
  }
});

test("workforce, region, framework and FAQ pages expose matching structured data", async () => {
  const workforce = await (await fetchRoute("/workforce/enrolled-nurses")).text();
  assert.match(workforce, /"@type":"Service"/i);
  assert.match(workforce, /"@type":"BreadcrumbList"/i);
  assert.match(workforce, /end-to-end workforce pathway for enrolled nurse requirements/i);

  const region = await (await fetchRoute("/regions/far-west-nsw")).text();
  assert.match(region, /"@type":"AdministrativeArea"/i);
  assert.match(region, /Locations are indicative regional focus areas/i);

  const framework = await (await fetchRoute("/framework")).text();
  assert.match(framework, /"@type":"ItemList"/i);
  assert.match(framework, /"numberOfItems":5/i);

  const faq = await (await fetchRoute("/faq")).text();
  assert.match(faq, /"@type":"FAQPage"/i);
  assert.match(faq, /Does HPI provide CPD for staff\?/i);
  assert.match(faq, /internationally qualified or relocating healthcare workers/i);
  assert.match(faq, /Does HPI currently deliver NDIS supports\?/i);
});

test("dedicated CPD page preserves controlled capability boundaries", async () => {
  const response = await fetchRoute("/cpd");
  assert.equal(response.status, 200);
  const body = await response.text();
  assert.match(body, /Staff CPD &amp; Capability \| Health Plus International/i);
  assert.match(body, /does not replace professional registration/i);
  assert.match(body, /A controlled system/i);
  assert.match(body, /Transition learning for regional and remote NSW/i);
  assert.match(body, /does not currently deliver NDIS supports/i);
  assert.match(body, /does not provide\s+migration advice/i);
  assert.match(body, /"@type":"BreadcrumbList"/i);
});

test("sitemap contains the complete 25-page indexable architecture", async () => {
  const response = await fetchRoute("/sitemap.xml", "application/xml");
  assert.equal(response.status, 200);
  const body = await response.text();
  assert.equal((body.match(/<url>/g) ?? []).length, 25);

  for (const [pathname] of [["", "home"], ...indexableRoutes]) {
    assert.match(body, new RegExp(`<loc>${escapeRegex(`${siteUrl}${pathname}`)}</loc>`));
  }
  assert.match(body, /<lastmod>2026-09-30T14:00:00\.000Z<\/lastmod>/i);
});

test("unknown workforce and region slugs return a real 404", async () => {
  const workforce = await fetchRoute("/workforce/not-a-real-role");
  const region = await fetchRoute("/regions/not-a-real-region");
  assert.equal(workforce.status, 404);
  assert.equal(region.status, 404);
});
