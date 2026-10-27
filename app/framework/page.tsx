import type { Metadata } from "next";
import Link from "next/link";
import {
  breadcrumbSchema,
  frameworkStages,
  pageMetadata,
  SITE_URL,
} from "../seo-data";
import {
  Arrow,
  Breadcrumbs,
  ContactBand,
  JsonLd,
  SeoFooter,
  SeoHeader,
} from "../SeoShell";

export const metadata: Metadata = pageMetadata(
  "Workforce Framework | Health Plus International",
  "The five-stage HPI Workforce Development Framework connects role verification, credential screening, CPD alignment, mobilisation and retention.",
  "/framework",
);

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/framework#stages`,
  name: "HPI Workforce Development Framework stages",
  numberOfItems: frameworkStages.length,
  itemListElement: frameworkStages.map(([number, name, description], index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${number} ${name}`,
    description,
  })),
};

export default function FrameworkPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Workforce Framework", path: "/framework" },
  ]);

  return (
    <main className="seo-page framework-seo-page">
      <SeoHeader />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb, itemList] }} />

      <section className="seo-hero">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Workforce Framework" }]} />
        <div className="seo-hero-grid">
          <div>
            <p className="eyebrow">HPI Workforce Development Framework™</p>
            <h1>Five stages from verified role to workforce retention</h1>
            <p className="seo-lead">
              The HPI Workforce Development Framework™ is the operating system behind
              our workforce pathways. It connects role verification, credential screening,
              CPD alignment, mobilisation and retention in one accountable sequence. It
              supports workforce development without assuming the host facility&apos;s
              employment, supervision or clinical governance authority.
            </p>
            <Link className="button" href="/engage">Choose a starting point <Arrow /></Link>
          </div>
          <aside className="seo-summary-card">
            <span>One framework · three engagement levels</span>
            <h2>Scaled to the need.</h2>
            <p>
              Workforce Starter supports a contained need. Workforce Core addresses
              recurring pressure. Workforce Partnership supports an agreed ongoing
              pipeline and continuity programme. Scope and measures are agreed before work begins.
            </p>
          </aside>
        </div>
      </section>

      <section className="framework-stage-section">
        <div className="seo-section-heading">
          <p className="eyebrow">The complete framework</p>
          <h2>Each stage has a distinct purpose.</h2>
          <p>
            The sequence creates traceability from an employer&apos;s verified role to
            readiness evidence, development activity, commencement responsibilities and
            retention follow-up. Activities scale to the engagement, but the five control
            points remain visible.
          </p>
        </div>
        <div className="framework-stage-grid">
          {frameworkStages.map(([number, name, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h2>{name}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="seo-answer-section">
        <article>
          <p className="eyebrow">Direct answer</p>
          <h2>What problem does the framework solve?</h2>
          <p className="answer-first">
            It prevents workforce activity from ending at a résumé match. HPI uses the
            framework to connect a verified role with candidate evidence, role-based
            development, practical mobilisation and early retention support. This creates
            clearer decisions without assuming the facility&apos;s clinical authority.
          </p>
          <p>
            A facility with one urgent vacancy may need a rapid controlled response.
            An employer experiencing repeat shortages may need pipeline planning and
            retention measures. A sustained workforce challenge may require an agreed
            pipeline, development and continuity programme. The framework provides one
            language for all three situations without pretending they are the same project.
          </p>
        </article>

        <article>
          <p className="eyebrow">Application</p>
          <h2>Does every engagement use all five stages?</h2>
          <p className="answer-first">
            Every engagement considers all five control points, but the work within each
            stage is proportionate to the verified need. HPI and the authorised employer
            agree the activities, responsibilities, controls, timeframes and measures
            before delivery begins.
          </p>
          <p>
            A narrow scope does not transfer employer responsibilities to HPI. Clinical
            governance, facility induction, workplace supervision, local policy,
            employment decisions and professional scope remain with the organisations
            or people authorised to make them.
          </p>
        </article>

        <article>
          <p className="eyebrow">Development</p>
          <h2>Where does staff CPD fit?</h2>
          <p className="answer-first">
            CPD sits within the CPD Alignment stage and connects verified role needs
            with appropriate development activity. HPI plans learning around identified needs,
            records appropriate evidence and reviews application where the role and
            programme require it. Completion does not automatically establish
            competence or authorisation.
          </p>
          <p>
            The dedicated <Link className="inline-link" href="/cpd">CPD and workforce capability page</Link>{" "}
            explains the learning cycle, participant groups, governance boundaries and
            core streams in more detail.
          </p>
        </article>

        <article>
          <p className="eyebrow">Evidence</p>
          <h2>How is performance discussed responsibly?</h2>
          <p className="answer-first">
            Measures are selected for the engagement and defined before claims are
            made. Depending on scope, they may cover response, readiness, deployment,
            early support, retention or experience. HPI does not publish invented case
            studies, unsupported success rates or outcomes that cannot be traced to
            controlled evidence.
          </p>
        </article>
      </section>

      <ContactBand
        heading="Choose the smallest scope that solves the real problem."
        text="Start with one urgent role, a recurring workforce pipeline or a broader capability challenge. HPI will help define the appropriate engagement boundary."
      />
      <SeoFooter />
    </main>
  );
}
