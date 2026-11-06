import PageSeo from "../PageSeo";
import { pageMetadata, siteUrl } from "../seo-pages";
import "../inner-pages.css";
import "./aged-care.css";

export const metadata = pageMetadata("/aged-care-workforce-nsw");

const roles = [
  ["Registered Nurses", "Discuss temporary RNs for aged care, planned leave and ongoing roster needs. Registration, experience and clinical capabilities are checked against your role brief.", "registered-nurses"],
  ["Enrolled Nurses", "Match ENs to the required duties, registration conditions and supervision arrangements. Medication-related duties depend on individual education, competence and scope.", "enrolled-nurses"],
  ["AINs and Personal Care Workers", "Build support for personal care, mobility and daily living. Relevant qualifications, experience and role-specific screening are reviewed before placement.", "aged-care-workers"],
  ["Allied Health Professionals", "Discuss defined physiotherapy, occupational therapy and other allied health requirements. Availability, professional credentials and service scope are confirmed for each request.", "allied-health"],
] as const;

const questions = [
  ["How quickly can you arrange aged care shift cover?", "We acknowledge your request and make initial contact within one business day. Tell us the required start time and roster gap. We assess availability, role-specific checks and commencement arrangements before confirming a placement; immediate or 24/7 dispatch is not promised."],
  ["How do you verify agency nurses and care workers?", "Checks are matched to the role and may include Ahpra registration and conditions for nurses, qualifications, work rights, employment history, references and applicable screening. We clarify evidence gaps and agreed readiness requirements before a worker progresses."],
  ["Can staffing support our care minutes and 24/7 RN requirements?", "We can discuss RN, EN and AIN or personal care workforce needs as part of your roster planning. Your facility remains responsible for its care-minute targets, 24/7 RN obligations where applicable, reporting and clinical governance. A staffing request does not establish compliance."],
  ["Do you support regional and remote NSW facilities?", "Yes. We assess regional and remote requests individually, including role scope, availability, travel, accommodation and practical commencement arrangements. Regional coverage describes where we consider engagements, rather than a confirmed pool of available workers."],
  ["How are infection control, manual handling and SIRS readiness checked?", "Tell us the training and competencies your facility requires. We review relevant evidence and identify gaps as part of readiness checks. Site-specific induction, infection prevention procedures, safe handling requirements and incident escalation arrangements must be agreed before commencement."],
  ["How do we request a staffing proposal or rate card?", "Use our existing employer request form with your facility details, roles, location, roster and anticipated start date. Ask for a proposal or rate card in the staffing brief. We discuss scope, availability and commercial terms with your nominated contact."],
] as const;

export default function AgedCareWorkforcePage() {
  const faq = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "@id": `${siteUrl}/aged-care-workforce-nsw#faq`,
    mainEntity: questions.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
  };
  return <main className="hpi-inner aged-care-page">
    <PageSeo path="/aged-care-workforce-nsw" />
    <nav className="aged-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true"> / </span><a href="/employers">Employers</a><span aria-hidden="true"> / </span><span aria-current="page">Aged Care Workforce</span></nav>
    <header className="aged-hero">
      <div><p className="aged-eyebrow">FACILITY PARTNERSHIPS · SYDNEY &amp; REGIONAL NSW</p>
        <h1>Aged Care Workforce Providers in NSW</h1>
        <p className="aged-lead">The right people. Clear checks. A considered start.</p>
        <p>Healthplus International supports aged care facilities with nursing recruitment, healthcare labour hire and workforce development. Plan for roster gaps, leave coverage and continuity of resident care with role-specific readiness and placement support.</p>
        <div className="inner-actions"><a className="hpi-action" href="/employers#request">Request a Staffing Proposal</a><a className="inner-link" href="tel:+61411459755">Speak to Our Team</a></div>
        <p className="aged-response">Acknowledgement and initial contact within one business day.</p>
      </div>
      <img src="/assets/aged-care-workforce-community.webp" alt="Healthcare workers forming two hands around a heart made of older adults" width="1440" height="810" fetchPriority="high" />
    </header>
    <ul className="aged-trust" aria-label="Our workforce approach"><li>Registration checks for nurses</li><li>Role-specific screening</li><li>Planned onboarding</li><li>Early-placement follow-up</li></ul>

    <section className="inner-block aged-intro" aria-labelledby="aged-roster"><div><p className="aged-eyebrow">WORKFORCE PLANNING</p><h2 id="aged-roster">Support your roster and care delivery</h2></div><div>
      <p>Whether you are comparing a nursing agency in Sydney or a clinical staffing agency for regional NSW, start with the care your residents need. We discuss the clinical mix, roster, experience and practical requirements before matching Healthcare Workers.</p>
      <p>RN, EN and AIN or personal care staffing can support your care-minute planning. Residential providers retain responsibility for their home’s targets, applicable 24/7 RN obligations, reporting and clinical governance.</p>
      <a className="inner-link" href="https://www.agedcarequality.gov.au/providers/workforce-obligations/247-registered-nurse-and-care-minutes-obligations" target="_blank" rel="noopener noreferrer">Read the Commission’s workforce obligations guidance</a>
    </div></section>

    <section className="inner-block" aria-labelledby="aged-roles"><h2 id="aged-roles">Nurses and care workers for your facility</h2><div className="aged-role-grid">{roles.map(([title, text, slug]) => <article key={slug}><h3>{title}</h3><p>{text}</p><a className="inner-link" href={`/roles#${slug}`}>View role checks<span className="hpi-sr-only"> for {title}</span></a></article>)}</div></section>

    <section className="inner-block aged-checks" aria-labelledby="aged-readiness"><p className="aged-eyebrow">PEOPLE · CARE · COMPLIANCE</p><h2 id="aged-readiness">Make readiness visible before placement</h2>
      <p>We agree the required evidence for the role, including professional registration where relevant, qualifications, work rights, references and applicable screening. Police checks, NDIS worker screening and Working with Children Checks are assessed against the position and setting.</p>
      <p>Tell us about dementia care, wound care, medication management or palliative care duties so we can assess the individual’s experience and scope. Infection prevention, safe manual handling and Serious Incident Response Scheme (SIRS) awareness should form part of the agreed training and induction requirements.</p>
      <p>The strengthened Aged Care Quality Standards have applied since 1 November 2025. Your facility directs clinical supervision and site-specific governance; we coordinate the agreed workforce checks, commencement and follow-up.</p>
      <div className="inner-actions"><a className="inner-link" href="https://www.agedcarequality.gov.au/providers/quality-standards/strengthened-aged-care-quality-standards" target="_blank" rel="noopener noreferrer">Current Quality Standards</a><a className="inner-link" href="/about#charter">Our Service Charter</a><a className="inner-link" href="/why-hpi">Our Workforce Development Approach</a></div>
    </section>

    <section className="inner-block" aria-labelledby="aged-process"><h2 id="aged-process">From facility brief to supported commencement</h2><ol className="aged-steps">
      <li><span aria-hidden="true">01</span><h3>Understand your facility</h3><p>Share the role, location, roster, anticipated start date, care setting and required competencies.</p></li>
      <li><span aria-hidden="true">02</span><h3>Check and match</h3><p>We review availability and readiness against your brief, discuss suitability and confirm outstanding requirements.</p></li>
      <li><span aria-hidden="true">03</span><h3>Plan the start</h3><p>Agree induction, supervision, practical arrangements and early follow-up before commencement.</p></li>
    </ol></section>

    <section className="inner-block aged-intro" aria-labelledby="aged-regions"><div><p className="aged-eyebrow">NSW COVERAGE</p><h2 id="aged-regions">Local conversations. Regional planning.</h2></div><div><p>Based in Helensburgh, we welcome enquiries from Sydney, South Western Sydney and the Illawarra, as well as the Central Coast, Hunter New England, Riverina and Murrumbidgee, Western NSW, Far West NSW, Northern NSW and the Mid North Coast.</p><p>Each engagement is assessed for availability and practical delivery. For regional placements, discuss travel, accommodation and commencement arrangements with us early.</p><a className="inner-link" href="/regional-nsw-healthcare-workforce">Explore Regional NSW Workforce Pathways</a></div></section>

    <section className="inner-block inner-faq" aria-labelledby="aged-faq"><h2 id="aged-faq">Aged care staffing questions</h2>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
    <section className="aged-contact" aria-labelledby="aged-contact-title"><div><p className="aged-eyebrow">START WITH YOUR WORKFORCE NEED</p><h2 id="aged-contact-title">Let’s plan your next staffing requirement</h2><p>Request a proposal or rate card through our employer form. Tell us what your facility needs and we will discuss the next steps with you.</p><p><a href="tel:+61411459755">+61 411 459 755</a> · <a href="mailto:info@healthplusint.com.au">info@healthplusint.com.au</a></p></div><a className="hpi-action" href="/employers#request">Request a Staffing Proposal</a></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g,"\\u003c") }} />
  </main>;
}
