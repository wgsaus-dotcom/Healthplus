import RegionPhoto from "../RegionPhoto";
import { roleFromSearch, type FormSearchParams } from "../form-options";
import NSWMap from "../NSWMap";
import EmployerRequestForm from "../EmployerRequestForm";
import { innerMetadata } from "../InnerPage";
import { regions } from "../simplified-content";
import "./employers.css";

export const metadata = innerMetadata("Employers", "We acknowledge your request and contact you within one business day to discuss your staffing needs.", "/employers");

export default async function EmployersPage({ searchParams }: { searchParams?: Promise<FormSearchParams> }) {
  const initialRole = roleFromSearch(await (searchParams ?? Promise.resolve({})), "role");
  return <main className="hpi-inner employer-page">
    <header className="inner-intro employer-intro"><div><h1>Start Your Next Chapter in Healthcare with Health Plus International</h1><p className="employer-promise">We Manage Compliance and Rostering, So You Can Focus on Care.</p><p>Submit your request and we’ll acknowledge it within one business day. We’ll contact you within the same timeframe to discuss your staffing needs and provide an honest assessment of what we can deliver. Not ready to commit? Simply ask about a trial engagement in your request.</p><p>We operate across metropolitan and regional NSW, delivering tailored workforce solutions to hospitals, aged care providers and community healthcare facilities.</p></div><figure className="employer-care-photo"><img src="/assets/hero-hpi-care.webp" alt="Healthcare professional sharing a warm moment with an older woman" width="900" height="600" fetchPriority="high" /></figure></header>
    <div className="inner-form" id="request"><EmployerRequestForm initialRole={initialRole} /></div>
    <section className="inner-block employer-receive"><h2>What We Deliver</h2><ul className="inner-deliverables">{["A verified role brief", "A qualified shortlist", "A readiness summary for each worker", "A start-date plan", "Early-placement follow-up", "Performance reporting"].map(text => <li key={text}>{text}</li>)}</ul></section>
    <section className="inner-block employer-checks"><h2>Check for the role</h2><p>Checks depend on the role: AHPRA registration, qualifications, work rights and the screening that role needs. See the checks for each role on the <a className="inner-link" href="/roles">roles page</a>.</p></section>
    <section className="inner-block employer-regional" id="where-we-work">
      <div className="regional-feature">
        <img src="/assets/hpi-happy-healthcare-team.webp" alt="Illustrative image of healthcare colleagues enjoying a relaxed moment in a bright workplace" width="1536" height="1024" loading="lazy" />
        <div className="regional-feature-copy"><h2>Where<br /> we work</h2><p>Sydney, the Central Coast and regional NSW, including the Hunter and Riverina. Regional work is planned for each engagement; listing a region does not mean a vacancy is open.</p></div>
      </div>
      <div className="inner-regions employer-regions">{regions.map(region => <article key={region.slug} id={`region-${region.slug}`}>
        <RegionPhoto slug={region.slug} />
        <h3>{region.name}</h3>
        <p className="region-places">{region.places}.</p>
        <p>{region.detail}</p>
        <a className="inner-link region-map-link" href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(region.name + " Australia")}`} target="_blank" rel="noopener noreferrer">View {region.name} on a map<span aria-hidden="true"> ↗</span></a>
        <a className="inner-link region-map-link" href={`/work-with-us?region=${region.slug}#apply`} aria-label={`Find Healthcare Work in ${region.name}`}>Find Healthcare Work</a>
      </article>)}</div>
      <NSWMap />
    </section>
  </main>;
}
