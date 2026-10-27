import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  breadcrumbSchema,
  pageMetadata,
  regionBySlug,
  regionPages,
  SITE_URL,
  workforcePages,
} from "../../seo-data";
import {
  Arrow,
  Breadcrumbs,
  ContactBand,
  JsonLd,
  SeoFooter,
  SeoHeader,
} from "../../SeoShell";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return regionPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = regionBySlug[slug];
  if (!page) return {};
  return pageMetadata(page.title, page.description, `/regions/${page.slug}`);
}

export default async function RegionLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = regionBySlug[slug];
  if (!page) notFound();

  const path = `/regions/${page.slug}`;
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Regions", path: "/#regions" },
    { name: page.name, path },
  ]);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name: `Healthcare workforce development in ${page.name}`,
    url: `${SITE_URL}${path}`,
    description: page.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: page.name,
      containedInPlace: { "@type": "State", name: "New South Wales" },
    },
    serviceType:
      "Healthcare workforce planning, attraction, readiness, mobilisation, support and retention",
  };

  return (
    <main className="seo-page region-seo-page">
      <SeoHeader />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb, serviceSchema] }} />

      <section className="seo-hero region-seo-hero">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Regions", href: "/#regions" },
            { label: page.name },
          ]}
        />
        <div className="seo-hero-grid">
          <div>
            <p className="eyebrow">Regional healthcare workforce pathways</p>
            <h1>Healthcare workforce development in {page.name}</h1>
            <p className="seo-lead">{page.lead}</p>
            <div className="button-row">
              <Link className="button" href="/#employer-request">Request workforce <Arrow /></Link>
              <Link className="button button-outline" href="/#worker-application">Register interest <Arrow /></Link>
            </div>
          </div>
          <aside className="seo-summary-card region-place-card">
            <span>Regional focus</span>
            <h2>{page.name}</h2>
            <ul>
              {page.places.map((place) => <li key={place}>{place}</li>)}
            </ul>
            <p>Locations are indicative regional focus areas, not a promise of a current vacancy or placement.</p>
          </aside>
        </div>
      </section>

      <section className="seo-answer-section">
        <article>
          <p className="eyebrow">Regional context</p>
          <h2>How does HPI approach workforce development in {page.name}?</h2>
          <p className="answer-first">
            HPI begins with a verified employer requirement and the real service
            environment. We connect defined workforce demand with readiness,
            capability, planned mobilisation, support and retention activity. The scope is
            scaled to the need instead of applying one generic regional solution.
          </p>
          <p>{page.context}</p>
        </article>

        <article>
          <p className="eyebrow">For employers</p>
          <h2>What should a {page.name} workforce brief include?</h2>
          <p className="answer-first">
            A useful regional workforce brief identifies the exact service, role,
            location, scope, roster, duration, urgency and required evidence. It also
            records practical conditions such as travel, accommodation, supervision,
            induction and local decision owners where they are relevant to the
            engagement.
          </p>
          <p>{page.planning}</p>
          <ul className="check-list">
            <li>Facility, programme or service setting and authorised contact</li>
            <li>Role duties, exclusions, experience and mandatory controls</li>
            <li>Roster, commencement, duration and location requirements</li>
            <li>Local support, induction, supervision and escalation ownership</li>
          </ul>
        </article>

        <article>
          <p className="eyebrow">Mobilisation</p>
          <h2>How are regional commencements supported?</h2>
          <p className="answer-first">
            HPI coordinates the agreed transition from employer selection to
            commencement, keeping responsibilities and outstanding actions visible.
            Support is engagement-specific and may include practical logistics,
            evidence status, named contacts and early check-ins. It never transfers
            the employer&apos;s workplace or clinical responsibilities to HPI.
          </p>
          <p>{page.mobilisation}</p>
        </article>

        <article>
          <p className="eyebrow">For professionals</p>
          <h2>What should professionals know before choosing a regional pathway?</h2>
          <p className="answer-first">
            A regional opportunity should be considered using verified information
            about the service, work, roster, location and available support. HPI asks
            about preferences and practical constraints so suitability is not assumed.
            Candidates remain free to ask questions and decline an unsuitable
            opportunity.
          </p>
          <p>{page.professional}</p>
          <p>
            HPI&apos;s <Link className="inline-link" href="/service-charter">Service Charter</Link>{" "}
            explains the communication, privacy, fairness and compliance standards
            professionals and employers can expect.
          </p>
        </article>

        <article>
          <p className="eyebrow">Sustainable capability</p>
          <h2>How does HPI move beyond one placement?</h2>
          <p className="answer-first">
            Where workforce pressure is recurring or structural, HPI can broaden the
            engagement from one role to a managed pipeline or Workforce Partnership.
            Planning, role-based development, early support, retention
            measures and improvement activity are selected only where they serve the
            defined problem.
          </p>
          <p>
            The <Link className="inline-link" href="/framework">HPI Workforce Development Framework™</Link>{" "}
            shows how five stages connect a verified role with credential screening,
            CPD alignment, mobilisation and longer-term
            capability. Employers can compare the three options on the{" "}
            <Link className="inline-link" href="/engage">Engage HPI page</Link>.
          </p>
        </article>
      </section>

      <section className="seo-related">
        <div>
          <p className="eyebrow">Workforce pathways</p>
          <h2>Explore the roles HPI supports.</h2>
        </div>
        <div className="seo-link-grid">
          {workforcePages.map((item) => (
            <Link href={`/workforce/${item.slug}`} key={item.slug}>
              <span>{item.name}</span><Arrow />
            </Link>
          ))}
        </div>
        <div>
          <p className="eyebrow">Other regions</p>
          <div className="seo-chip-list">
            {regionPages.filter((region) => region.slug !== page.slug).map((region) => (
              <Link key={region.slug} href={`/regions/${region.slug}`}>{region.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <ContactBand
        heading={`Start a workforce conversation about ${page.name}.`}
        text="Tell HPI the service, role, location, urgency and likely duration. We will clarify what is verified, what remains to be decided and the appropriate next step."
      />
      <SeoFooter />
    </main>
  );
}
