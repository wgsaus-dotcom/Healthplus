import PageSeo from "../PageSeo";
import { pageMetadata } from "../seo-pages";
import "./faq.css";

export const metadata = pageMetadata("/faq");

const faqGroups = [
  {
    title: "About HPI",
    id: "about",
    items: [
      ["What is Health Plus International?", "Health Plus International is an Australian healthcare workforce development organisation based in Helensburgh, NSW. We support employers and Healthcare Workers through recruitment, role-specific readiness checks, placement coordination, professional development pathways and ongoing workforce support."],
      ["Which healthcare professions does HPI support?", "Depending on the employer and role requirements, we work with Registered Nurses, Enrolled Nurses, Assistants in Nursing, Aged Care Workers, community Support Workers, selected Allied Health Professionals and other defined healthcare roles. Every engagement is subject to applicable registration, qualifications and screening."],
      ["Which areas does HPI service?", "We support healthcare services across Sydney and regional NSW, including the Central Coast, Hunter and Riverina, with regional and remote engagements assessed individually. Listing a location does not mean that a vacancy or workforce supply is currently available."],
      ["Does HPI offer training and professional development?", "HPI can coordinate professional readiness, workplace orientation, learning resources and professional-development pathways relevant to a role. Some learning or examination preparation may be delivered by suitably qualified external partners. These services do not replace accredited qualifications, professional registration, employer induction or clinical supervision."],
    ],
  },
  {
    title: "Employers and Facilities",
    id: "employers",
    items: [
      ["How do I request Healthcare Workers?", "Use the Request Workers form on our Employers page. Tell us the role, location, work setting, anticipated start date and your contact details. We acknowledge requests and make initial contact within one business day."],
      ["How does HPI verify Healthcare Workers?", "Checks are tailored to the role and may include relevant Ahpra registration, qualifications, work rights, identity, screening, references and required training or clearances. Requirements are confirmed against the role and service setting."],
      ["Who is responsible for clinical supervision?", "The host healthcare service is responsible for day-to-day clinical direction, supervision and its own site-specific clinical governance. HPI coordinates its agreed employment, workforce and compliance responsibilities."],
      ["Can HPI help with regional workforce requirements?", "Yes. HPI works with employers to understand regional and remote workforce requirements, including role scope, availability, compliance and practical commencement arrangements. We assess each request before confirming an approach."],
      ["Where can government buyers find HPI?", "Our business profile is available on the NSW Government Buy NSW supplier platform. Visit the Buy NSW Supplier Profile link in the footer or the Employers page to view our listing."],
    ],
  },
  {
    title: "Healthcare Workers and Applications",
    id: "workers",
    items: [
      ["How do I register for work?", "Visit Healthcare Workers and complete the registration form. You can upload your résumé and provide your contact information, profession, preferred location and availability."],
      ["Which documents are needed when I first register?", "Start with your résumé and the information requested in the form. We will explain role-specific registration and compliance documents after reviewing your details. Please do not submit identity, banking, police-check or health documents unless requested through an appropriate secure process."],
      ["Can I choose where I want to work?", "Yes. Tell us your preferred NSW location and availability. We discuss relevant opportunities when available, but selecting a region does not mean a vacancy exists."],
      ["Does registering with HPI guarantee employment?", "Registration is an expression of interest. Employment and placement decisions depend on available roles, employer requirements, candidate eligibility and applicable checks."],
      ["Does HPI deliver NDIS services?", "HPI does not currently provide NDIS supports as an NDIS service provider. Community and in-home support workforce opportunities are assessed within the scope of an individual engagement."],
    ],
  },
  {
    title: "AHPRA Registration Support",
    id: "ahpra",
    items: [
      ["Can HPI assist internationally qualified nurses with Ahpra registration?", "HPI offers administrative coordination and professional readiness support, including pathway orientation, documentation checklists, milestone tracking and links to current official guidance. Ahpra and the Nursing and Midwifery Board of Australia (NMBA) alone determine registration requirements and outcomes."],
      ["Can HPI submit my Ahpra Self-check for me?", "No. Applicants must complete their own Ahpra Self-check. Any permitted representative activity requires appropriate authorisation; candidates remain responsible for their information and application."],
      ["Does HPI help with English tests, NCLEX-RN or OSCE preparation?", "Where relevant to the candidate's pathway, we can help identify official requirements, organise study planning and connect candidates with suitable external preparation providers. We do not guarantee examination results or imply that all applicants need the same assessments."],
      ["Can HPI assist with Australian healthcare workplace readiness?", "Yes. Support can include workplace communication, professional expectations, interview preparation, regional orientation and professional-development planning. This is not a substitute for clinical training, registration or employer competency assessment."],
      ["Does registration support guarantee a job, visa or Ahpra approval?", "No. Registration support is separate from recruitment and employment decisions. HPI does not guarantee a job, sponsorship, visa, registration or assessment result, and does not provide regulated migration advice."],
    ],
  },
  {
    title: "Contact, Privacy and Support",
    id: "general",
    items: [
      ["How does HPI handle my personal information?", "We collect and use information for defined service and workforce purposes and seek appropriate authorisation before sharing relevant information. Please read our Privacy Policy for details and avoid submitting sensitive documents in an initial enquiry."],
      ["What are HPI's operating hours?", "Our standard hours are Monday to Friday, 8:30 am to 5:00 pm Sydney time, excluding NSW public holidays. After-hours arrangements, where applicable, are agreed for individual engagements. Our contact channels are not emergency or clinical services."],
      ["How can I contact HPI?", "Email info@healthplusint.com.au or use the contact details on this website. If you cannot find what you are looking for, please contact us directly and our team will direct your enquiry."],
    ],
  },
] as const;

export default function FaqPage() {
  const allQuestions = faqGroups.flatMap(group => group.items);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map(([question, answer]) => ({
      "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  return (
    <main className="hpi-inner hpi-faq-page">
      <PageSeo path="/faq" />
      <header className="hpi-faq-hero">
        <p className="hpi-faq-eyebrow">HELP &amp; INFORMATION</p>
        <h1>Frequently asked questions</h1>
        <p>Clear answers for employers, Healthcare Workers and internationally qualified nurses exploring registration support.</p>
      </header>

      <div className="hpi-faq-content">
        <nav className="hpi-faq-categories" aria-label="FAQ categories">
          {faqGroups.map(group => <a key={group.id} href={`#faq-${group.id}`}>{group.title}</a>)}
        </nav>
        {faqGroups.map(group => (
          <section className="hpi-faq-group" key={group.id} id={`faq-${group.id}`} aria-labelledby={`faq-heading-${group.id}`}>
            <div className="hpi-faq-group-heading">
              <h2 id={`faq-heading-${group.id}`}>{group.title}</h2>
              {group.id === "ahpra" && <a href="/ahpra-registration-support">Explore AHPRA Support</a>}
              {group.id === "employers" && <a href="/employers#request">Request Workers</a>}
              {group.id === "workers" && <a href="/work-with-us#apply">Register for work</a>}
            </div>
            <div className="hpi-faq-items">
              {group.items.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
        <section className="hpi-faq-contact" aria-labelledby="faq-contact-heading">
          <h2 id="faq-contact-heading">Still have a question?</h2>
          <p>If you can&apos;t find what you&apos;re looking for, please don&apos;t hesitate to contact us directly.</p>
          <a href="mailto:info@healthplusint.com.au?subject=HPI%20Website%20Enquiry">Email the HPI team</a>
        </section>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
