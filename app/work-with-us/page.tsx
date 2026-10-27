import { roleFromSearch, type FormSearchParams } from "../form-options";
import WorkerApplicationForm from "../WorkerApplicationForm";
import { innerMetadata, PageIntro } from "../InnerPage";

export const metadata = innerMetadata("For healthcare workers", "HPI recruits, employs and places healthcare workers in Sydney and regional NSW. Register in two short steps.", "/work-with-us");

export default async function WorkWithUsPage({ searchParams }: { searchParams?: Promise<FormSearchParams> }) {
  const initialRole = roleFromSearch(await (searchParams ?? Promise.resolve({})), "profession");
  return <main className="hpi-inner">
    <PageIntro title="Looking for healthcare work in NSW?">Tell us your profession and where you want to work. HPI recruits, employs and places Registered Nurses, Assistants in Nursing, aged care workers, community support workers and allied health professionals in Sydney and regional NSW. You register in two short steps. We ask for compliance documents only after we have reviewed your details.</PageIntro>
    <div className="inner-form" id="apply"><WorkerApplicationForm initialRole={initialRole} /></div>
    <section className="inner-block"><h2>What happens next</h2><ol><li>We review your details.</li><li>We contact you about roles that may suit you.</li><li>We ask for documents and checks only for roles that fit.</li></ol><p>Registering does not guarantee a role, interview or start date.</p></section>
    <section className="inner-block"><h2>Where the work is</h2><p>Roles are in Sydney and regional NSW. Choose your preferred region in the form. Regional work is planned for each engagement. Listing a region does not mean a vacancy is open.</p></section>
    <section className="inner-block"><h2>Privacy</h2><p>Please do not send identity, banking, police-check or health information with your first details.</p></section>
  </main>;
}
