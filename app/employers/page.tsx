import { roleFromSearch, type FormSearchParams } from "../form-options";
import NSWMap from "../NSWMap";
import EmployerRequestForm from "../EmployerRequestForm";
import { innerMetadata } from "../InnerPage";
import { regions } from "../simplified-content";
import "./employers.css";

export const metadata = innerMetadata("For Employers", "Send a request and we acknowledge it the same business day. We contact you within 24 hours.", "/employers");

export default async function EmployersPage({ searchParams }: { searchParams?: Promise<FormSearchParams> }) {
  const initialRole = roleFromSearch(await (searchParams ?? Promise.resolve({})), "role");
  return <main className="hpi-inner employer-page">
    <header className="inner-intro employer-intro"><div><h1>Tell Us the Workers You Need.<br /><span>We Handle the Compliance &amp; Rostering.</span></h1><p>Send a request and we acknowledge it the same business day. We contact you within 24 hours, and we will be straightforward about what we can fill. Not ready to commit? Ask about a trial engagement in the request.</p></div><figure className="employer-care-photo"><img src="/assets/hero-hpi-care.webp" alt="Healthcare professional sharing a warm moment with an older woman" width="900" height="600" fetchPriority="high" /></figure></header>
    <div className="inner-form" id="request"><EmployerRequestForm initialRole={initialRole} /></div>
    <section className="inner-block employer-receive"><h2>What You Receive</h2><ul className="inner-deliverables">{["A verified role brief", "A qualified shortlist", "A readiness summary for each worker", "A mobilisation plan", "Early-placement follow-up", "Performance reporting"].map(text => <li key={text}>{text}</li>)}</ul></section>
    <section className="inner-block employer-checks"><h2>Checked for the Role</h2><p>Checks depend on the role: Ahpra registration, qualifications, work rights and the screening that role needs. See the checks for each role on the <a className="inner-link" href="/roles">Roles Page</a>.</p></section>
    <section className="inner-block employer-regional" id="where-we-work">
      <div className="regional-feature">
        <img src="/assets/hpi-happy-healthcare-team.webp" alt="Illustrative image of healthcare colleagues enjoying a relaxed moment in a bright workplace" width="1536" height="1024" loading="lazy" />
        <div className="regional-feature-copy"><h2>Where<br /> We Work</h2><p>Sydney, and regional NSW in six areas. Regional work is planned for each engagement. Tell us the service and location in your request.</p></div>
      </div>
      <div className="inner-regions employer-regions">{regions.map(region => <article key={region.slug} id={`region-${region.slug}`}>
        <h3>{region.name}</h3>
        <p className="region-places">{region.places}.</p>
        <p>{region.detail}</p>
        <p className="region-engagement">We plan regional work for each engagement in {region.name}. Listing a region does not mean a vacancy is open.</p>
        <a className="inner-link region-map-link" href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(region.name + " Australia")}`} target="_blank" rel="noopener noreferrer">View {region.name} on a map<span aria-hidden="true"> ↗</span></a>
      </article>)}</div>
      <NSWMap />
    </section>
  </main>;
}
