import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, pageMetadata } from "../seo-data";
import {
  Arrow,
  Breadcrumbs,
  JsonLd,
  SeoFooter,
  SeoHeader,
} from "../SeoShell";

export const metadata: Metadata = pageMetadata(
  "Engage HPI | Health Plus International",
  "Compare HPI Workforce Starter, Workforce Core and Workforce Partnership for contained, recurring and ongoing healthcare workforce needs.",
  "/engage",
);

const models = [
  {
    number: "01",
    name: "Workforce Starter",
    need: "An immediate or contained workforce need",
    answer:
      "Workforce Starter is a focused entry pathway for an urgent vacancy, defined cohort or contained workforce requirement. The scope can cover role definition, attraction, readiness, selection support, mobilisation and early follow-up without turning a practical need into an unnecessarily large programme.",
    includes: [
      "Controlled employer and role brief",
      "Targeted attraction and matching",
      "Role-specific readiness controls",
      "Agreed mobilisation and early support",
    ],
  },
  {
    number: "02",
    name: "Workforce Core",
    need: "Recurring vacancies or persistent workforce pressure",
    answer:
      "Workforce Core is a managed pathway for employers facing repeat demand, difficult-to-sustain pipelines or regional workforce pressure. It connects individual requirements with cohort planning, readiness, capability, deployment support and agreed retention measures over a defined period.",
    includes: [
      "Demand and pipeline planning",
      "Cohort attraction and readiness",
      "Role-based development where agreed",
      "Support, retention and performance review",
    ],
  },
  {
    number: "03",
    name: "Workforce Partnership",
    need: "An ongoing pipeline and retention requirement",
    answer:
      "Workforce Partnership is a defined programme for an organisation that needs a sustained qualification-aligned pipeline, planned readiness activity, role-based development and retention review. Responsibilities and measures are agreed without transferring the facility’s clinical governance or employment authority to HPI.",
    includes: [
      "Demand and qualification-stream planning",
      "Managed readiness and evidence controls",
      "Role-based development and CPD",
      "Retention, continuity and pathway review",
    ],
  },
];

export default function EngagePage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Engage HPI", path: "/engage" },
  ]);

  return (
    <main className="seo-page engage-seo-page">
      <SeoHeader />
      <JsonLd data={breadcrumb} />

      <section className="seo-hero">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Engage HPI" }]} />
        <div className="seo-hero-grid">
          <div>
            <p className="eyebrow">Three ways to engage</p>
            <h1>Start at the level your workforce problem requires</h1>
            <p className="seo-lead">
              HPI uses one workforce development framework across three engagement
              levels. Employers can begin with an urgent role, establish a managed
              response to recurring pressure or establish an ongoing workforce
              partnership. Scope, authority, evidence and measures are agreed for the
              chosen engagement.
            </p>
          </div>
          <aside className="seo-summary-card">
            <span>HPI&apos;s approach</span>
            <h2>Urgent workforce relief. Lasting capability.</h2>
            <p>
              Sourcing and matching are enabling steps within the pathway. HPI&apos;s
              defining work connects qualification-aligned attraction with readiness,
              role-based development, supported commencement and retention review.
            </p>
          </aside>
        </div>
      </section>

      <section className="engagement-models">
        {models.map((model) => (
          <article key={model.number}>
            <div className="engagement-model-heading">
              <span>{model.number}</span>
              <p>{model.need}</p>
              <h2>{model.name}</h2>
            </div>
            <div>
              <p className="answer-first">{model.answer}</p>
              <h3>Typical inclusions</h3>
              <ul className="check-list">
                {model.includes.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <Link className="text-link" href="/#employer-request">
                Discuss {model.name} <Arrow />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="seo-answer-section compact-answers">
        <article>
          <p className="eyebrow">Choosing well</p>
          <h2>Which HPI engagement model should an employer choose?</h2>
          <p className="answer-first">
            Choose Workforce Starter for a contained need, Workforce Core
            for recurring pressure and Workforce Partnership for an ongoing pipeline
            and retention requirement. If the boundary is unclear, begin with the smallest verified
            problem. HPI can clarify dependencies before a wider programme is agreed.
          </p>
        </article>
        <article>
          <p className="eyebrow">No lock-in assumption</p>
          <h2>Can an engagement begin small and expand?</h2>
          <p className="answer-first">
            Yes, where evidence shows a broader need and both parties agree a revised
            scope. Expansion is not automatic. Responsibilities, deliverables,
            privacy, controls, fees, timing and measures must be documented before HPI
            performs additional work.
          </p>
        </article>
        <article>
          <p className="eyebrow">Employer authority</p>
          <h2>What decisions stay with the employer?</h2>
          <p className="answer-first">
            Employers retain selection, employment, workplace, clinical governance,
            induction, supervision, local policy and scope decisions within their
            authority. HPI coordinates its agreed workforce pathway and does not use a
            partnership or service model to transfer those responsibilities.
          </p>
        </article>
      </section>

      <section className="seo-contact-band">
        <div>
          <p className="eyebrow light">Employer workforce request</p>
          <h2>Describe the need before choosing the label.</h2>
          <p>
            Tell HPI the role, setting, location, urgency and likely duration. We will
            help determine the appropriate starting scope and explain what information
            is needed next.
          </p>
        </div>
        <div className="button-row">
          <Link className="button button-gold" href="/#employer-request">Submit a request <Arrow /></Link>
          <Link className="button capability-outline" href="/framework">View the framework <Arrow /></Link>
        </div>
      </section>
      <SeoFooter />
    </main>
  );
}
