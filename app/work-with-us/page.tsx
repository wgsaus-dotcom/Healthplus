import PageSeo from "../PageSeo";
import { pageMetadata } from "../seo-pages";
import RegionPhoto from "../RegionPhoto";
import { roleFromSearch, type FormSearchParams } from "../form-options";
import WorkerApplicationForm from "../WorkerApplicationForm";
import { PageIntro } from "../InnerPage";
import "./workers.css";
import { regions } from "../simplified-content";

export const metadata = pageMetadata("/work-with-us");

const questions = [
  ["How often will I be paid?", "Healthcare Workers employed by Healthplus are paid weekly. Your employment and onboarding information will explain your pay arrangements."],
  ["Does Healthplus support CPD?", "Yes. We support continuing professional development (CPD) through guidance on role-relevant learning and development goals. Funding is available for selected, pre-approved courses. Confirm the course and funding budget with us before enrolling, and check that any learning meets your profession’s CPD requirements."],
  ["Does Healthplus fund training?", "Yes. Funding is available for selected, pre-approved courses relevant to your role. Speak with our team and agree the course and funding budget before enrolling; funding is not automatic for every course."],
  ["Do I need documents to register?", "Upload your résumé when you register. We accept PDF, DOC or DOCX files up to 5 MB. No compliance documents are needed at this stage. We ask for registration and role-specific checks after reviewing your details. Please do not send identity, banking, police-check or health information with your first details."],
  ["Can I tell you where I want to work?", "Yes. Choose your preferred region in the form and tell us your availability. We discuss opportunities in Sydney and regional NSW. Regional work is planned for each engagement; listing a region does not mean a vacancy is open."],
  ["Can I discuss sponsorship?", "Yes. Sponsorship may be considered for suitable candidates where an eligible role and applicable requirements align. Register your interest and discuss your circumstances with our team. An application does not guarantee sponsorship."],
  ["Is travel or accommodation included?", "Arrangements vary by role and location. We discuss travel, accommodation and any available assistance for the specific opportunity before you commit."],
  ["What happens after I register?", "We review your details and contact you about roles that may suit you. We then discuss the documents and checks needed for a suitable role."],
  ["Which roles can I register for?", "Registered nurses, enrolled nurses, doctors, assistants in nursing, support workers and allied health professionals. Support workers provide community support, not NDIS."],
] as const;

export default async function WorkWithUsPage({ searchParams }: { searchParams?: Promise<FormSearchParams> }) {
  const params = await (searchParams ?? Promise.resolve({} as FormSearchParams));
  const initialRole = roleFromSearch(params, "profession");
  const rawRegion = Array.isArray(params.region) ? params.region[0] : params.region;
  const initialRegion = regions.find(region => region.slug === rawRegion)?.name ?? (rawRegion === "sydney" ? "Sydney metropolitan area" : "");
  return <main className="hpi-inner worker-page"><PageSeo path="/work-with-us" />
    <PageIntro title="Build Your Healthcare Career with Healthplus.">Register your interest in nursing, aged care, support work and selected allied health roles across Sydney and regional NSW. Share your résumé and work preferences, and we’ll contact you if a suitable role comes up.</PageIntro>
    <div className="inner-actions"><a className="hpi-action" href="#apply">Register your interest</a><a className="inner-link" href="https://wa.me/61411459755">Talk to Our Team</a></div>
    <section className="inner-form worker-register" id="apply" aria-labelledby="worker-apply-heading"><h2 id="worker-apply-heading">Register your interest</h2><p>Have your résumé ready (PDF, DOC or DOCX, up to 5 MB). We’ll ask for your preferred NSW region and availability. You don’t need to upload compliance documents now.</p><p className="form-trust"><strong>What happens next:</strong> You’ll get a reference when we receive your registration. We’ll review your résumé and contact you if a suitable role comes up. <a href="/privacy">How we use your information</a>.</p><WorkerApplicationForm initialRole={initialRole} initialRegion={initialRegion} /></section>
    <section className="inner-block"><h2>Opportunities for aged care workers and support workers</h2><p>Register your interest in aged care and community support work across Sydney and regional NSW. If you have disability support worker experience, tell us about your skills, preferred location and availability. Our support worker placements cover community and in-home roles, not NDIS services. We review each application against the duties and checks of a suitable role.</p><a className="inner-link" href="/roles#support-workers">Explore support worker roles and requirements</a></section>
    <section className="worker-feature" aria-labelledby="worker-feature-heading">
      <img src="/assets/hpi-happy-healthcare-team.webp" alt="Illustrative image of healthcare colleagues sharing a relaxed moment at work" width="1536" height="1024" loading="lazy" />
      <div><p className="worker-eyebrow">PEOPLE. CARE. COMPLIANCE.</p><h2 id="worker-feature-heading">Why work with Healthplus?</h2><p>More than finding your next role: support for the career and working life you want to build.</p><dl>
        <div><dt>Weekly pay</dt><dd>Healthcare Workers employed by Healthplus are paid weekly, helping you plan your everyday expenses with a regular pay cycle.</dd></div>
        <div><dt>Free uniforms for nursing and support staff</dt><dd>Start your role with a Healthplus uniform at no cost to you. We provide free uniforms for our nursing and support staff, helping you feel part of the team from day one.</dd></div>
        <div><dt>Work that considers your availability</dt><dd>Tell us when and where you want to work. We match opportunities to your availability, preferred locations and career goals, subject to suitable roles and facility roster requirements.</dd></div>
        <div><dt>Support beyond your first day</dt><dd>Prepare for your commencement with clear expectations and practical guidance. Our approach includes early follow-up and ongoing communication as agreed for your placement.</dd></div>
        <div><dt>CPD, funded training and professional development</dt><dd>Support your continuing professional development (CPD) with role-relevant learning and guidance on your development goals. Funding is available for selected, pre-approved courses; we agree the course and funding budget with you before enrolment.</dd></div>
        <div><dt>A regional career with preparation</dt><dd>Explore opportunities across NSW with guidance on regional living and transition considerations. Travel, accommodation and any role-specific assistance are discussed before you commit.</dd></div>
        <div><dt>Sponsorship considered for suitable candidates</dt><dd>Sponsorship may be considered for the right candidate, subject to eligibility, a suitable role and applicable requirements. Talk to our team about your circumstances; sponsorship is not guaranteed.</dd></div>
        <div><dt>A simpler start, with guidance along the way</dt><dd>Apply with your résumé and work preferences in two short steps. We guide you through the role-specific checks after reviewing your details, so you can focus on your next opportunity.</dd></div>
      </dl></div>
    </section>
    <section className="inner-block worker-regions" aria-labelledby="worker-regions-heading">
      <h2 id="worker-regions-heading">Which Location Would You Prefer to Work In?</h2>
      <p>Explore healthcare opportunities across metropolitan and regional NSW. <a className="inner-link" href="/regional-nsw-healthcare-workforce">Learn about our regional healthcare employment pathway</a>.</p>
      <div className="worker-region-list">{[{ slug: "sydney", name: "Sydney", places: "Sydney metropolitan area" }, ...regions].map(region => <article key={region.slug}>
        <RegionPhoto slug={region.slug} />
        <h3>{region.name}</h3><p>{region.places}.</p>
        <a className="inner-link" href={`/work-with-us?region=${region.slug}${initialRole ? `&profession=${encodeURIComponent(initialRole)}` : ""}#apply`} aria-label={`Register interest in ${region.name}`}>Register interest</a>
      </article>)}</div>
    </section>
    <section className="inner-block worker-faq" aria-labelledby="worker-faq-heading"><h2 id="worker-faq-heading">A few things you might be wondering</h2><p><strong>If you can&apos;t find what you&apos;re looking for, please don&apos;t hesitate to <a className="inner-link" href="mailto:info@healthplusint.com.au">contact us directly</a>.</strong></p>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
    <section className="inner-block worker-faq" aria-labelledby="registration-support-heading"><h2 id="registration-support-heading">Internationally qualified nurse?</h2><p>Explore practical guidance for navigating Ahpra registration requirements, organising documents and preparing for Australian healthcare workplaces.</p><p><a className="inner-link" href="/ahpra-registration-support">Explore Ahpra registration support</a></p></section>
    <section className="worker-invitation"><h2>Let’s talk about where you want to work</h2><div className="inner-actions"><a className="hpi-action" href="#apply">Register your interest</a><a className="inner-link" href="https://wa.me/61411459755">Chat on WhatsApp</a></div></section>
  </main>;
}
