import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, pageMetadata, SITE_URL } from "../seo-data";
import {
  Arrow,
  Breadcrumbs,
  JsonLd,
  SeoFooter,
  SeoHeader,
} from "../SeoShell";

export const metadata: Metadata = pageMetadata(
  "Healthcare Workforce FAQs | Health Plus International",
  "Answers about HPI healthcare workforce pathways, roles, regions, readiness, CPD, employer requests, applications, privacy and service standards.",
  "/faq",
);

const questions = [
  {
    question: "What is Health Plus International?",
    answer:
      "Health Plus International is a healthcare workforce development organisation. HPI builds qualification-aligned pipelines and connects verified credentials, role-based readiness, CPD, supported commencement and retention follow-up. Sourcing and matching are enabling steps within that wider pathway.",
  },
  {
    question: "Which healthcare workforce streams does HPI support?",
    answer:
      "HPI supports defined pathways for registered nurses, enrolled nurses, assistants in nursing, aged-care workers, disability and community support workers, selected allied health professionals and selected remote or site-health personnel. Every pathway remains subject to a verified employer, role, location, credentials, professional scope and service-specific controls.",
  },
  {
    question: "Who retains clinical governance and employment authority?",
    answer:
      "The employing or host facility retains final selection, employment, clinical governance, professional supervision, site-specific induction, local policy and scope-of-practice decisions. HPI develops and coordinates the agreed workforce pathway; it does not become the Employer of Record or assume the facility’s clinical authority.",
  },
  {
    question: "Which regions does HPI serve?",
    answer:
      "HPI supports defined workforce pathways across metropolitan Sydney and has regional focus areas covering Far West NSW, Western NSW, Murrumbidgee, Hunter New England, Northern NSW and the Mid North Coast. A listed region or town does not mean a vacancy is currently available. Other Australian work is considered only within HPI’s verified capability and agreed scope.",
  },
  {
    question: "How can an employer request workforce support?",
    answer:
      "An employer can submit the workforce request form with the organisation, service setting, role, location, urgency, duration and authorised contact. HPI aims to acknowledge complete requests the same business day and contact the facility with an initial response within 24 hours. These are response standards, not placement guarantees.",
  },
  {
    question: "What does workforce readiness mean at HPI?",
    answer:
      "Readiness means comparing a professional’s evidence, experience, availability and practical circumstances with a verified role requirement. The exact checks depend on the role and setting. Registration, work rights, screening, references, qualifications, licences and training may be relevant. A certificate does not automatically establish competence or authority to work.",
  },
  {
    question: "Does HPI provide CPD for staff?",
    answer:
      "Yes. HPI provides and coordinates structured continuing professional development for its staff and approved participating workforce cohorts. Learning is planned around role and organisational needs, recorded with appropriate evidence and reviewed for practical application. CPD does not replace professional registration, facility induction, supervision or local competency assessment.",
  },
  {
    question: "How does HPI support internationally qualified or relocating healthcare workers?",
    answer:
      "For approved regional and remote workforce pathways, HPI can coordinate transition learning about the Australian health system, documentation, escalation, communication, clinical handover, cultural safety and the local community context. This is orientation and learning support only. HPI does not provide migration advice, guarantee registration or visa outcomes, or perform functions reserved to Ahpra, a National Board or an assessing authority.",
  },
  {
    question: "Does the MCCSC relationship imply a particular visa or candidate origin?",
    answer:
      "No. HPI does not assume that a candidate is overseas-qualified, a humanitarian entrant or a local bilingual worker. Work rights, registration, qualifications and pathway requirements are verified for each person and role. Where included in an engagement, MCCSC may provide settlement onboarding, cultural orientation, community navigation or retention mentoring; the host facility retains employment, induction, supervision and clinical governance authority.",
  },
  {
    question: "Does HPI currently deliver NDIS supports?",
    answer:
      "No. HPI does not currently deliver NDIS supports. Community support work is outside the NDIS unless an authorised signed agreement states otherwise. NDIS-specific orientation, screening linkages or capability requirements apply only when HPI is engaged for an in-scope workforce or learning pathway with a registered NDIS provider.",
  },
  {
    question: "Does registering with HPI guarantee a job or placement?",
    answer:
      "No. Registration, résumé submission, training, screening or participation in a pathway does not guarantee a job, interview, employer selection, visa, registration outcome, start date or placement. HPI explains verified opportunities and requirements, seeks appropriate authority before presenting information and communicates honestly when a role changes or cannot progress.",
  },
  {
    question: "Does HPI sponsor visas or guarantee Australian work rights?",
    answer:
      "HPI does not promise sponsorship, a visa, migration outcome, professional registration or work rights. Any international pathway depends on a verified role, the responsible employer, applicable Australian law and decisions made by authorised government, registration and migration bodies. Individuals should obtain appropriately qualified advice for their own circumstances.",
  },
  {
    question: "How does HPI protect applicant and employer information?",
    answer:
      "HPI collects information for defined workforce and service purposes, seeks appropriate authority before relevant candidate information is shared and asks people to submit only what is requested. Initial résumé forms should not include identity, banking, police-check or unnecessary health information. Full handling practices are explained in HPI’s Privacy Policy.",
  },
  {
    question: "Is Health Plus International available 24 hours a day?",
    answer:
      "HPI’s standard operating hours are 8:30 am to 5:00 pm Sydney time, Monday to Friday, excluding NSW public holidays. For regional engagements, any after-hours contact for travel or accommodation disruption, roster continuity and facility escalation must be defined in the engagement-specific service level. General HPI contact channels are not a 24/7 dispatch, clinical, safety or emergency service.",
  },
] as const;

export default function FaqPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Frequently Asked Questions", path: "/faq" },
  ]);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faq#questions`,
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="seo-page faq-seo-page">
      <SeoHeader />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [breadcrumb, faqSchema] }} />

      <section className="seo-hero faq-hero">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Frequently Asked Questions" }]} />
        <div className="seo-hero-grid">
          <div>
            <p className="eyebrow">Straight answers</p>
            <h1>Healthcare workforce frequently asked questions</h1>
            <p className="seo-lead">
              These answers explain HPI&apos;s organisation, workforce pathways,
              regional focus, readiness controls, CPD, service standards and important
              boundaries. For a role-specific decision, HPI will still need a verified
              employer requirement and relevant individual circumstances.
            </p>
          </div>
          <aside className="seo-summary-card">
            <span>Need a specific answer?</span>
            <h2>Contact the right pathway.</h2>
            <p>
              Employers can submit a workforce request. Professionals can register
              interest. General, privacy, feedback and CPD enquiries can be sent to
              info@healthplusint.com.au.
            </p>
          </aside>
        </div>
      </section>

      <section className="faq-list" aria-label="Frequently asked questions">
        {questions.map(({ question, answer }, index) => (
          <details key={question} open={index < 2}>
            <summary>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{question}</h2>
              <i aria-hidden="true">+</i>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>

      <section className="seo-related compact-related">
        <p className="eyebrow">Useful next pages</p>
        <div className="seo-link-grid">
          <Link href="/framework"><span>How the framework works</span><Arrow /></Link>
          <Link href="/cpd"><span>How HPI staff CPD works</span><Arrow /></Link>
          <Link href="/service-charter"><span>What service standards apply</span><Arrow /></Link>
          <Link href="/privacy"><span>How personal information is handled</span><Arrow /></Link>
        </div>
      </section>

      <section className="seo-contact-band">
        <div>
          <p className="eyebrow light">Still need help?</p>
          <h2>Ask HPI a specific question.</h2>
          <p>We will identify the relevant pathway, explain what can be answered now and clarify any information needed next.</p>
        </div>
        <div className="button-row">
          <a className="button button-gold" href="mailto:info@healthplusint.com.au?subject=Website%20FAQ%20Enquiry">Email HPI <Arrow /></a>
          <Link className="button capability-outline" href="/engage">Ways to engage <Arrow /></Link>
        </div>
      </section>
      <SeoFooter />
    </main>
  );
}
