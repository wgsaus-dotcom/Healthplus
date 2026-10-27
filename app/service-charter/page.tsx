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
  "HPI Service Charter | Health Plus International",
  "The HPI Service Charter sets public commitments for respect, communication, fairness, privacy, compliance, response and complaints.",
  "/service-charter",
);

const commitments = [
  ["Respectful service", "We listen, communicate professionally and treat every person with dignity."],
  ["Clear communication", "We explain the pathway, what information is needed, what happens next and any material delay."],
  ["Fair and inclusive access", "We assess relevant requirements fairly and discuss reasonable adjustments where practical."],
  ["Compliance-led delivery", "We do not bypass registration, screening, work-right, credential, employment or safeguarding controls for speed."],
  ["Privacy and consent", "We explain why information is needed and handle it carefully for defined, authorised purposes."],
  ["Honest expectations", "We do not promise a job, worker, visa, registration result, start date or placement outcome we cannot substantiate."],
] as const;

const standards = [
  ["General enquiry", "Acknowledgement within one business day"],
  ["Employer workforce request", "Facility contact and an initial response within 24 hours of receiving the request"],
  ["Application or registration", "Receipt confirmed within one business day"],
  ["Progress update", "Updates at agreed milestones, with material delays explained"],
  ["Reasonable adjustment", "Acknowledgement within two business days and discussion of practical options"],
  ["Complaint or privacy concern", "Acknowledgement within two business days; target outcome within ten business days or a progress update"],
] as const;

export default function ServiceCharterPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Service Charter", path: "/service-charter" },
  ]);

  return (
    <main className="seo-page charter-seo-page">
      <SeoHeader />
      <JsonLd data={breadcrumb} />

      <section className="seo-hero">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Charter" }]} />
        <div className="seo-hero-grid">
          <div>
            <p className="eyebrow">Our Service Charter</p>
            <h1>Respect in every interaction. Compliance in every decision.</h1>
            <p className="seo-lead">
              This charter explains what employers, healthcare professionals,
              applicants and partners can expect from Health Plus International—and
              what HPI asks from the people and organisations who work with us.
            </p>
          </div>
          <aside className="seo-summary-card">
            <span>Our service promise</span>
            <h2>Clear, fair and honest.</h2>
            <p>
              We will treat you with respect, communicate honestly, protect your
              information and put compliance before speed. A fast response never means
              weak checks or false certainty.
            </p>
          </aside>
        </div>
      </section>

      <section className="charter-page-commitments">
        <div className="seo-section-heading">
          <p className="eyebrow">What people can expect</p>
          <h2>Six public commitments.</h2>
        </div>
        <div className="charter-commitment-grid">
          {commitments.map(([title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="seo-answer-section">
        <article>
          <p className="eyebrow">Response standards</p>
          <h2>When should you hear from HPI?</h2>
          <p className="answer-first">
            Standard operating hours are 8:30 am to 5:00 pm Sydney time, Monday to
            Friday, excluding NSW public holidays. HPI aims to acknowledge complete
            enquiries within the published period and explains material delays. A
            contract or agreed service level may set different requirements.
          </p>
          <div className="charter-page-standards" role="table" aria-label="HPI public response standards">
            {standards.map(([contact, commitment]) => (
              <div role="row" key={contact}>
                <strong role="cell">{contact}</strong>
                <span role="cell">{commitment}</span>
              </div>
            ))}
          </div>
          <p>
            These are acknowledgement and triage standards. They do not guarantee that
            a suitable professional, role, interview, placement or start date will be
            available within a fixed period.
          </p>
        </article>

        <article>
          <p className="eyebrow">For applicants</p>
          <h2>What can professionals and applicants expect?</h2>
          <p className="answer-first">
            HPI explains the relevant pathway and evidence, seeks appropriate authority
            before sharing confidential information and communicates honestly when a
            role changes, closes or cannot progress. Training, bridging or registration
            with HPI does not guarantee employment, an interview or placement.
          </p>
          <p>
            Applicants should provide accurate, current information and advise HPI when
            availability, work rights, credentials or circumstances change. They should
            submit only requested information and use an approved channel for identity,
            police, banking or other highly sensitive documents.
          </p>
        </article>

        <article>
          <p className="eyebrow">For employers and partners</p>
          <h2>What does HPI ask from organisations?</h2>
          <p className="answer-first">
            Employers and partners should provide an accurate brief, nominate authorised
            decision owners, keep material requirements current and perform the workplace
            or clinical responsibilities that remain within their authority. Concerns,
            incidents and changes should be raised promptly so they can be triaged.
          </p>
          <p>
            A partnership does not blur accountability. Where community engagement or
            settlement connection is included, the partner performs its agreed role;
            HPI retains its healthcare workforce and contractual responsibilities, and
            the employer retains its employment, workplace and governance authority.
          </p>
        </article>

        <article>
          <p className="eyebrow">Feedback and complaints</p>
          <h2>How can someone raise a concern?</h2>
          <p className="answer-first">
            A person can give a compliment, suggestion or complaint without being
            disadvantaged for speaking up in good faith. HPI handles concerns
            respectfully and as confidentially as practicable, and acts promptly where
            safety, privacy, safeguarding or serious misconduct may be involved.
          </p>
          <p>
            Email <a className="inline-link" href="mailto:info@healthplusint.com.au?subject=Feedback%20or%20Complaint">info@healthplusint.com.au</a>{" "}
            with what happened, when it happened, who was involved if known, the effect
            and the outcome sought. Using HPI&apos;s process does not prevent anyone from
            seeking independent advice or contacting an appropriate regulator.
          </p>
        </article>

        <article>
          <p className="eyebrow">After hours</p>
          <h2>Is HPI a 24/7 emergency service?</h2>
          <p className="answer-first">
            No. For regional engagements, any after-hours contact for travel or
            accommodation disruption, roster continuity and facility escalation must
            be defined in the engagement-specific service level. General website,
            email, telephone and messaging channels are not a 24/7 dispatch, clinical,
            personal safety or emergency response service.
          </p>
        </article>
      </section>

      <section className="seo-contact-band">
        <div>
          <p className="eyebrow light">Need help?</p>
          <h2>Ask a question or raise a concern.</h2>
          <p>HPI will acknowledge the contact, identify the appropriate owner and explain the next step.</p>
        </div>
        <div className="button-row">
          <a className="button button-gold" href="mailto:info@healthplusint.com.au">Contact HPI <Arrow /></a>
          <Link className="button capability-outline" href="/privacy">Read the Privacy Policy <Arrow /></Link>
        </div>
      </section>
      <SeoFooter />
    </main>
  );
}
