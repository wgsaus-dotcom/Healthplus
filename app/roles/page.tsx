import PageSeo from "../PageSeo";
import { pageMetadata } from "../seo-pages";
import { PageIntro } from "../InnerPage";
import { roles } from "../simplified-content";

export const metadata = pageMetadata("/roles");

export default function RolesPage() {
  return <main className="hpi-inner"><PageSeo path="/roles" />
    <PageIntro title="Nursing, Aged Care and Allied Health Roles in NSW">Explore the roles we support, including doctors and community support workers. Register your interest and we’ll contact you when a suitable vacancy arises.</PageIntro>
    <nav className="inner-actions" aria-label="Position Categories"><a className="inner-link" href="#allied-health">Allied Health</a><a className="inner-link" href="#nurses">Nurses</a><a className="inner-link" href="#doctors">Doctors</a></nav>
    <section className="inner-block" id="nurses"><h2>Nurses</h2><a className="inner-link" href="#registered-nurses">Registered Nurses</a> · <a className="inner-link" href="#enrolled-nurses">Enrolled Nurses</a></section>
    <section className="inner-block inner-role" id="enrolled-nurses"><h2>Enrolled Nurses</h2><div className="inner-actions"><a className="hpi-action" href="/employers?role=enrolled-nurses#request">Request Workers</a><a className="hpi-action hpi-action-outline" href="/work-with-us?profession=enrolled-nurses#apply">Find Healthcare Work</a></div></section>
    <section className="inner-block inner-role" id="doctors"><h2>Doctors</h2><div className="inner-actions"><a className="hpi-action" href="/employers?role=doctors#request">Request Workers</a><a className="hpi-action hpi-action-outline" href="/work-with-us?profession=doctors#apply">Find Healthcare Work</a></div></section>
    {roles.map(role => <section className="inner-block inner-role" key={role.slug} id={role.slug}>
      <h2>{role.slug === "allied-health" ? "Allied Health Recruitment in Sydney and Regional NSW" : role.name}</h2><p>{role.text}</p>
      <h3>Checked before placement</h3><p>{role.checks}</p>
      {role.slug === "allied-health" && <p>Growing your allied health team? Tell us the discipline, service setting, work pattern and target start date. Looking for an allied health role? Register with your résumé, preferred locations and availability. <a href="/regional-nsw-healthcare-workforce">Explore our regional NSW workforce approach</a>.</p>}
      <div className="inner-actions"><a className="hpi-action" href={`/employers?role=${role.slug}#request`} aria-label={`Request Workers: ${role.name}`}>Request Workers</a><a className="hpi-action hpi-action-outline" href={`/work-with-us?profession=${role.slug}#apply`} aria-label={`Find Healthcare Work: ${role.name}`}>Find Healthcare Work</a></div>
    </section>)}
    <p className="inner-note">A certificate shows training was completed. It does not by itself prove competence or authority to work, so we look at more than one document.</p>
  </main>;
}
