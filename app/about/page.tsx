import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, pageMetadata } from "../seo-data";
import {
  Arrow,
  Breadcrumbs,
  ContactBand,
  JsonLd,
  SeoFooter,
  SeoHeader,
} from "../SeoShell";

export const metadata: Metadata = pageMetadata(
  "About HPI | Health Plus International",
  "HPI builds qualification-aligned healthcare workforce pipelines through verified readiness, role-based development and retention support across Sydney and regional NSW.",
  "/about",
);

export default function AboutPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "" },
    { name: "About HPI", path: "/about" },
  ]);

  return (
    <main className="seo-page about-seo-page">
      <SeoHeader />
      <JsonLd data={breadcrumb} />

      <section className="seo-hero">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About HPI" }]} />
        <div className="seo-hero-grid">
          <div>
            <p className="eyebrow">Building Australia&apos;s healthcare workforce</p>
            <h1>About Health Plus International</h1>
            <p className="seo-lead">
              Health Plus International builds qualification-aligned healthcare workforce
              pipelines through verified credentials, role-based readiness, CPD,
              commencement coordination and structured retention support.
            </p>
          </div>
          <aside className="seo-summary-card">
            <span>Our operating principles</span>
            <h2>People · Care · Compliance</h2>
            <p>
              People keeps workforce and community needs visible. Care shapes how we
              communicate and support. Compliance defines the controls, evidence and
              boundaries that cannot be bypassed for speed.
            </p>
          </aside>
        </div>
      </section>

      <section className="seo-answer-section">
        <article>
          <p className="eyebrow">Who we are</p>
          <h2>What kind of organisation is HPI?</h2>
          <p className="answer-first">
            HPI is an Australian healthcare workforce development organisation. We build
            qualification-aligned pipelines, verify role readiness, connect identified needs
            to role-based development and support early-placement continuity and retention.
            Sourcing and matching are enabling steps rather than the end of the service.
          </p>
          <p>
            Health Plus International Pty Ltd operates from New South Wales and serves
            healthcare, aged-care, disability and community workforce contexts across
            Sydney, regional NSW and selected remote locations within its agreed capability
            and scope. The company&apos;s ABN is
            13 155 901 723. Public contact details are maintained consistently across
            this website and its controlled business channels.
          </p>
        </article>

        <article>
          <p className="eyebrow">What we do</p>
          <h2>How does HPI support employers?</h2>
          <p className="answer-first">
            HPI turns a workforce need into a controlled pathway. Work may include
            defining the role, attracting suitable people, reviewing evidence,
            coordinating employer selection and mobilisation, supporting the early
            placement period and measuring agreed aspects of experience or retention.
          </p>
          <p>
            Employers can engage through Workforce Starter, Workforce Core or Workforce
            Partnership. These are different scopes within one operating model, not
            promises of a fixed outcome. The smallest suitable scope is selected after
            the actual problem, authority, timing and dependencies are understood.
          </p>
        </article>

        <article>
          <p className="eyebrow">Who we support</p>
          <h2>Which workforce and service settings are in scope?</h2>
          <p className="answer-first">
            HPI supports defined pathways for enrolled nurses, assistants in nursing,
            aged-care workers, support workers, selected allied health professionals
            and selected remote or site-health personnel. Every opportunity remains
            subject to the employer, role, location, credentials and service controls.
          </p>
          <p>
            The settings can include healthcare, aged care, disability, community,
            regional and remote services. A role title does not create automatic
            suitability. HPI compares requirements with evidence and makes clear which
            decisions belong to the employer, facility, professional or another
            authorised party.
          </p>
        </article>

        <article>
          <p className="eyebrow">Community connection</p>
          <h2>How does HPI work with partners?</h2>
          <p className="answer-first">
            HPI may work with educational institutions, community organisations,
            employers, governments and other authorised partners when a programme needs
            their distinct capability. Responsibilities are defined in writing and
            personal information is shared only for an authorised, relevant purpose.
          </p>
          <p>
            Where included in an engagement, the Multicultural Communities Support
            Centre may assist participants with local settlement onboarding, cultural
            orientation, community and services navigation, and retention mentoring for
            regional pathways. MCCSC does not perform credentialling, candidate selection,
            clinical governance or CPD assessment, and its involvement does not transfer
            HPI&apos;s contractual workforce responsibilities.
          </p>
        </article>

        <article>
          <p className="eyebrow">Truthful evidence</p>
          <h2>How does HPI describe outcomes responsibly?</h2>
          <p className="answer-first">
            HPI distinguishes service commitments from guarantees. Response standards,
            readiness decisions and performance measures use defined terms and
            controlled records. We do not promise a worker, job, visa, registration,
            start date, retention result or capability outcome that cannot be
            substantiated.
          </p>
          <p>
            Read the <Link className="inline-link" href="/service-charter">HPI Service Charter</Link>{" "}
            for the standards employers, professionals, applicants and partners can
            expect in communication, privacy, fairness and compliance.
          </p>
        </article>
      </section>

      <section className="seo-related compact-related">
        <p className="eyebrow">Explore HPI</p>
        <div className="seo-link-grid">
          <Link href="/framework"><span>Workforce Development Framework</span><Arrow /></Link>
          <Link href="/cpd"><span>Staff CPD and Capability</span><Arrow /></Link>
          <Link href="/engage"><span>Ways to engage</span><Arrow /></Link>
          <Link href="/faq"><span>Frequently asked questions</span><Arrow /></Link>
        </div>
      </section>

      <ContactBand
        heading="Talk to HPI about a defined workforce need."
        text="We can begin with an immediate requirement or explore a longer-term workforce capability problem once the scope and responsibilities are clear."
      />
      <SeoFooter />
    </main>
  );
}
