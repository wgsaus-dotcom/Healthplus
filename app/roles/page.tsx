import PageSeo from "../PageSeo";
import { pageMetadata } from "../seo-pages";
import { PageIntro } from "../InnerPage";
import { roles } from "../simplified-content";

export const metadata = pageMetadata("/roles");

export default function RolesPage() {
  return <main className="hpi-inner"><PageSeo path="/roles" />
    <PageIntro title="Nursing, Aged Care and Allied Health Roles in NSW">Explore the roles we support, including doctors and community support workers. Register your interest and we’ll contact you when a suitable vacancy arises.</PageIntro>
    <nav className="inner-actions" aria-label="Position Categories"><a className="inner-link" href="#allied-health">Allied Health</a><a className="inner-link" href="#nurses">Nurses</a><a className="inner-link" href="#doctors">Doctors</a></nav>
    <section className="inner-block" id="nurses">
      <h2>Nursing and Care Placements</h2>
      <p>Healthplus International recruits, employs and places Registered Nurses, Enrolled Nurses and Assistants in Nursing for hospitals, residential aged care and community services across NSW. We coordinate role-specific compliance, rostering and commencement arrangements.</p>
      <ul>
        <li><strong>Placement settings:</strong> Hospital wards, residential aged care, respite, community and regional services.</li>
        <li><strong>Simple registration:</strong> Healthcare Workers register in two steps, providing their résumé, contact details, profession, preferred locations and availability. Compliance documents are requested after the initial review for a suitable role.</li>
        <li><strong>Employer readiness:</strong> We confirm the role brief, present suitable candidates and provide readiness information to support placement decisions.</li>
        <li><strong>Clear responsibilities:</strong> HPI employs the worker. The host facility retains clinical governance, delegation and day-to-day supervision.</li>
        <li><strong>Ongoing support:</strong> Start-date planning and early-placement follow-up support workers and facilities as the placement settles.</li>
      </ul>
      <a className="inner-link" href="#registered-nurses">Registered Nurses</a> · <a className="inner-link" href="#enrolled-nurses">Enrolled Nurses</a> · <a className="inner-link" href="#assistants-in-nursing">Assistants in Nursing</a>
    </section>
    <section className="inner-block inner-role" id="enrolled-nurses"><h2>Enrolled Nurses</h2><div className="inner-actions"><a className="hpi-action" href="/employers?role=enrolled-nurses#request">Request Workers</a><a className="hpi-action hpi-action-outline" href="/work-with-us?profession=enrolled-nurses#apply">Find Healthcare Work</a></div></section>
    <section className="inner-block inner-role" id="doctors"><h2>Doctors</h2><div className="inner-actions"><a className="hpi-action" href="/employers?role=doctors#request">Request Workers</a><a className="hpi-action hpi-action-outline" href="/work-with-us?profession=doctors#apply">Find Healthcare Work</a></div></section>
    {roles.map(role => <section className="inner-block inner-role" key={role.slug} id={role.slug}>
      <h2>{role.slug === "allied-health" ? "Selected Allied Health Placements" : role.name}</h2><p>{role.text}</p>
      {role.slug === "allied-health" ? <ul>
        <li><strong>Disciplines:</strong> Enquiries may include occupational therapy, physiotherapy, psychology, podiatry and dietetics, subject to the role requirements and suitable professional availability.</li>
        <li><strong>Service area:</strong> Sydney and regional NSW.</li>
        <li><strong>Role-specific checks:</strong> {role.checks}</li>
        <li><strong>Clinical responsibilities:</strong> The host service retains clinical governance, local induction and day-to-day professional supervision.</li>
        <li><strong>Response commitment:</strong> We acknowledge workforce requests and make initial contact within one business day to discuss requirements and next steps.</li>
      </ul> : <><h3>Checked before placement</h3><p>{role.checks}</p></>}
      {role.slug === "allied-health" && <p>Growing your allied health team? Tell us the discipline, service setting, work pattern and target start date. Looking for an allied health role? Register with your résumé, preferred locations and availability. <a href="/regional-nsw-healthcare-workforce">Explore our regional NSW workforce approach</a>.</p>}
      <div className="inner-actions"><a className="hpi-action" href={`/employers?role=${role.slug}#request`} aria-label={`Request Workers: ${role.name}`}>Request Workers</a><a className="hpi-action hpi-action-outline" href={`/work-with-us?profession=${role.slug}#apply`} aria-label={`Find Healthcare Work: ${role.name}`}>Find Healthcare Work</a></div>
    </section>)}
    <p className="inner-note">A certificate shows training was completed. It does not by itself prove competence or authority to work, so we look at more than one document.</p>
  </main>;
}
