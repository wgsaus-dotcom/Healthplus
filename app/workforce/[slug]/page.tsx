import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  breadcrumbSchema,
  pageMetadata,
  regionPages,
  SITE_URL,
  workforceBySlug,
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
  return workforcePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = workforceBySlug[slug];
  if (!page) return {};
  return pageMetadata(page.title, page.description, `/workforce/${page.slug}`);
}

export default async function WorkforceLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = workforceBySlug[slug];
  if (!page) notFound();

  const path = `/workforce/${page.slug}`;
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Workforce", path: "/#workforce" },
    { name: page.name, path },
  ]);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name: `${page.name} workforce development`,
    url: `${SITE_URL}${path}`,
    description: page.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "State", name: "New South Wales" },
    serviceType:
      "Healthcare workforce planning, attraction, readiness, capability development, mobilisation, support and retention",
    audience: [
      { "@type": "Audience", audienceType: "Healthcare and community-service employers" },
      { "@type": "Audience", audienceType: page.name },
    ],
  };

  return (
    <main className="seo-page workforce-seo-page">
      <SeoHeader />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb, serviceSchema] }} />

      <section className="seo-hero">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Workforce", href: "/#workforce" },
            { label: page.name },
          ]}
        />
        <div className="seo-hero-grid">
          <div>
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.name} workforce pathways in NSW</h1>
            <p className="seo-lead">{page.lead}</p>
            <div className="button-row">
              <Link className="button" href="/#employer-request">Request workforce <Arrow /></Link>
              <Link className="button button-outline" href="/#worker-application">Register interest <Arrow /></Link>
            </div>
          </div>
          <aside className="seo-summary-card">
            <span>Pathway scope</span>
            <h2>Urgent response with visible controls.</h2>
            <p>
              HPI is a healthcare workforce development organisation. Recruitment
              and matching are enabling steps within a wider readiness, development,
              deployment, support and retention system.
            </p>
          </aside>
        </div>
      </section>

      <section className="seo-answer-section">
        <article>
          <p className="eyebrow">Direct answer</p>
          <h2>What does HPI&apos;s {page.shortName.toLowerCase()} pathway provide?</h2>
          <p className="answer-first">{page.pathwayAnswer}</p>
          <p>{page.pathwayDetail}</p>
          <h3>Potential service settings</h3>
          <ul className="check-list">
            {page.settings.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>

        <article>
          <p className="eyebrow">Readiness</p>
          <h2>How does HPI check role readiness?</h2>
          <p className="answer-first">
            HPI compares evidence with the verified role requirement and records the
            source, currency, result and any limitation. Checks are proportionate to
            the profession, setting and legal or employer requirement. A certificate
            can evidence completion, but it does not automatically prove competence or
            authority to work.
          </p>
          <ul className="check-list">
            {page.readiness.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p>
            Outstanding requirements remain visible and owned. A person progresses
            only when mandatory controls are addressed or an authorised decision is
            documented within the responsible organisation&apos;s authority.
          </p>
        </article>

        <article>
          <p className="eyebrow">Capability</p>
          <h2>How can CPD support this workforce pathway?</h2>
          <p className="answer-first">
            HPI can connect role-based CPD to identified capability needs for its staff
            and approved programme cohorts. Learning is planned, assigned, evidenced
            and reviewed for application. It complements professional obligations,
            employer induction, supervision and local competency decisions rather than
            replacing them.
          </p>
          <ul className="check-list">
            {page.development.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p>
            Read more about the controlled learning cycle on the{" "}
            <Link className="inline-link" href="/cpd">staff CPD and workforce capability page</Link>.
          </p>
        </article>

        <article>
          <p className="eyebrow">Employer brief</p>
          <h2>What information should an employer provide?</h2>
          <p className="answer-first">
            A useful workforce request identifies the service, role, location, urgency,
            duration and decision owner. It should also explain the actual duties,
            supervision and mandatory evidence. HPI uses this information to build a
            controlled brief before attraction or candidate presentation begins.
          </p>
          <ul className="check-list">
            {page.employerInputs.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p>
            Employers can begin with one requirement or compare the three engagement
            models on the <Link className="inline-link" href="/engage">Engage HPI page</Link>.
          </p>
        </article>

        <article>
          <p className="eyebrow">For professionals</p>
          <h2>What can {page.shortName.toLowerCase()} expect from HPI?</h2>
          <p className="answer-first">{page.professionalAnswer}</p>
          <p>
            HPI handles applicant information for defined workforce purposes. Submit
            only the information requested and review the{" "}
            <Link className="inline-link" href="/privacy">Privacy Policy</Link> before
            using the registration form.
          </p>
        </article>
      </section>

      <section className="seo-related">
        <div>
          <p className="eyebrow">Related workforce streams</p>
          <h2>Explore role-specific pathways.</h2>
        </div>
        <div className="seo-link-grid">
          {workforcePages.filter((item) => item.slug !== page.slug).map((item) => (
            <Link href={`/workforce/${item.slug}`} key={item.slug}>
              <span>{item.name}</span><Arrow />
            </Link>
          ))}
        </div>
        <div>
          <p className="eyebrow">Regional pathways</p>
          <div className="seo-chip-list">
            {regionPages.map((region) => (
              <Link key={region.slug} href={`/regions/${region.slug}`}>{region.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <ContactBand
        heading={`Define a ${page.shortName.toLowerCase()} workforce pathway.`}
        text="Tell HPI the role, service setting, location, urgency and likely duration. We will clarify the requirement and explain the next controlled step."
      />
      <SeoFooter />
    </main>
  );
}
