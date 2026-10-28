import { roleFromSearch, type FormSearchParams } from "../form-options";
import WorkerApplicationForm from "../WorkerApplicationForm";
import { innerMetadata, PageIntro } from "../InnerPage";
import "./workers.css";

export const metadata = innerMetadata("Healthcare work in NSW", "Register for healthcare work in Sydney and regional NSW in two short steps. Tell HPI your role, preferred location and availability.", "/work-with-us");

const questions = [
  ["Do I need documents to register?", "Upload your résumé when you register. We accept PDF, DOC or DOCX files up to 5 MB. No compliance documents are needed at this stage. We ask for registration and role-specific checks after reviewing your details. Please do not send identity, banking, police-check or health information with your first details."],
  ["Can I tell you where I want to work?", "Yes. Choose your preferred region in the form and tell us your availability. We discuss opportunities in Sydney and regional NSW. Regional work is planned for each engagement; listing a region does not mean a vacancy is open."],
  ["What happens after I register?", "We review your details and contact you about roles that may suit you. We then discuss the documents and checks needed for a suitable role."],
  ["Which roles can I register for?", "Registered nurses, assistants in nursing, aged care workers, support workers and allied health professionals. Support workers provide community support, not NDIS."],
] as const;

export default async function WorkWithUsPage({ searchParams }: { searchParams?: Promise<FormSearchParams> }) {
  const initialRole = roleFromSearch(await (searchParams ?? Promise.resolve({})), "profession");
  return <main className="hpi-inner worker-page">
    <PageIntro title="Your Next Chapter in Healthcare. Here in NSW.">Tell us your role, where you want to work and when you’re available. Upload your résumé and register in two short steps; compliance documents come later.</PageIntro>
    <div className="inner-form" id="apply"><WorkerApplicationForm initialRole={initialRole} /></div>
    <section className="worker-feature" aria-labelledby="worker-feature-heading">
      <img src="/assets/hpi-happy-healthcare-team.webp" alt="Illustrative image of healthcare colleagues sharing a relaxed moment at work" width="1536" height="1024" loading="lazy" />
      <div><p className="worker-eyebrow">PEOPLE. CARE. COMPLIANCE.</p><h2 id="worker-feature-heading">A Conversation About What Comes Next.</h2><dl>
        <div><dt>Two-Step Registration.</dt><dd>Start with your résumé, details and work preferences.</dd></div>
        <div><dt>Compliance Documents Later.</dt><dd>We ask for checks only for roles that fit.</dd></div>
        <div><dt>Let’s Talk About Suitable Roles.</dt><dd>We review your details and get in touch.</dd></div>
      </dl></div>
    </section>
    <section className="inner-block worker-faq" aria-labelledby="worker-faq-heading"><h2 id="worker-faq-heading">A Few Things You Might Be Wondering.</h2><p><strong>If you can&apos;t find what you&apos;re looking for, please don&apos;t hesitate to <a className="inner-link" href="mailto:info@healthplusint.com.au">contact us directly</a>.</strong></p>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
    <section className="worker-invitation"><h2>Let’s Talk About Where You Want to Work.</h2><div className="inner-actions"><a className="hpi-action" href="#apply">Register Your Interest</a><a className="inner-link" href="https://wa.me/61411459755">Chat on WhatsApp</a></div></section>
  </main>;
}
