import PageSeo from "../PageSeo";
import { pageMetadata } from "../seo-pages";
import "./registration-support.css";

export const metadata = pageMetadata("/ahpra-registration-support");

const supportAreas = [
  {
    title: "Registration pathway orientation",
    description: "Understand the steps in the Ahpra and Nursing and Midwifery Board of Australia (NMBA) process, including where to find the official Self-check and applicable guidance. Eligibility and pathway decisions are made by the regulator.",
  },
  {
    title: "Documentation and application coordination",
    description: "Organise a personalised document checklist, track evidence requests, plan deadlines and prepare for communication with the regulator. Candidates complete their own Self-check and retain control of their application.",
  },
  {
    title: "English and examination preparation coordination",
    description: "Identify official English language and examination information and connect candidates with suitable external preparation providers where relevant. Examination requirements differ between pathways.",
  },
  {
    title: "Australian healthcare workplace readiness",
    description: "Plan professional communication, workplace orientation, interview preparation, employment documentation and an understanding of Australian workplace expectations.",
  },
  {
    title: "Regional NSW transition guidance",
    description: "Explore practical settlement information, regional living considerations and professional transition resources for candidates considering opportunities in NSW.",
  },
  {
    title: "Professional development planning",
    description: "Map continuing professional development goals and identify relevant professional learning resources after registration, with appropriate professional oversight.",
  },
] as const;

const steps = [
  ["Initial conversation", "We discuss your qualification, current registration status and what support you are seeking."],
  ["Individual support plan", "We identify administrative and professional readiness steps relevant to your circumstances, using current regulator guidance."],
  ["Milestone coordination", "We help you organise documents, track progress and prepare questions for official channels."],
  ["Professional transition", "Where relevant, we provide workplace-readiness resources and information about career pathways."],
] as const;

export default function AhpraRegistrationSupportPage() {
  return (
    <main className="policy-page registration-support-page">
      <PageSeo path="/ahpra-registration-support" />
      <header className="policy-hero">
        <p className="eyebrow light">HEALTH PLUS INTERNATIONAL · PROFESSIONAL READINESS</p>
        <h1>AHPRA <em>Support</em></h1>
        <p>Practical guidance and coordination for internationally qualified nurses exploring Australian registration and professional transition.</p>
      </header>
      <div className="policy-content registration-support-content">
        <section className="policy-summary" aria-labelledby="support-intro">
          <h2 id="support-intro">Support through each stage, with you in control</h2>
          <p>Understanding Australia's nursing registration process can involve documents, assessments, examinations and unfamiliar requirements. Health Plus International can assist with administrative organisation and career-readiness planning while you use official Ahpra and NMBA guidance.</p>
        </section>

        <section className="policy-section registration-support-services" aria-labelledby="support-areas">
          <h2 id="support-areas">How we can support you</h2>
          {supportAreas.map(area => (
            <div key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </div>
          ))}
        </section>

        <section className="policy-section registration-support-process" aria-labelledby="support-process">
          <h2 id="support-process">A clear, personalised process</h2>
          <ol>
            {steps.map(([title, description]) => <li key={title}><strong>{title}.</strong> {description}</li>)}
          </ol>
          <p>There is no single pathway that suits every applicant. The requirements depend on your qualifications, professional background and the regulator's assessment.</p>
        </section>

        <section className="policy-section registration-support-boundaries" aria-labelledby="support-boundaries">
          <h2 id="support-boundaries">Important information</h2>
          <ul>
            <li>Ahpra and the NMBA alone determine registration requirements, eligibility and outcomes. HPI cannot guarantee registration, assessment results or processing times.</li>
            <li>Applicants must complete their own Ahpra Self-check. Any permitted representative activity requires appropriate authority and does not transfer responsibility for accurate information.</li>
            <li>Registration support is separate from employment applications and recruitment decisions. Enquiring about this service does not secure a job or sponsorship.</li>
            <li>HPI does not provide immigration advice. Matters requiring migration advice should be discussed with an appropriately authorised professional.</li>
            <li>Nursing registration and scope of practice must be confirmed before undertaking regulated nursing duties in Australia.</li>
          </ul>
          <p>Check the current official requirements directly with <a href="https://www.ahpra.gov.au/Registration/International-practitioners.aspx" target="_blank" rel="noopener noreferrer">Ahpra</a> and the <a href="https://www.nursingmidwiferyboard.gov.au/Registration-and-Endorsement/International.aspx" target="_blank" rel="noopener noreferrer">NMBA</a>.</p>
        </section>

        <section className="policy-contact registration-support-contact" aria-labelledby="support-contact">
          <h2 id="support-contact">Discuss your registration journey</h2>
          <p>Tell us your nursing qualification, country of qualification and where you are in the registration process. Please do not email identity documents, health records or other sensitive evidence with your first enquiry.</p>
          <p><a href="mailto:info@healthplusint.com.au?subject=Ahpra%20Registration%20Support%20Enquiry">Email HPI about registration support</a></p>
          <p>Already registered and looking for work? <a href="/work-with-us#apply">Explore healthcare work with HPI</a>.</p>
        </section>
      </div>
    </main>
  );
}
