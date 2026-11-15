import PageSeo from "../PageSeo";
import { pageMetadata } from "../seo-pages";
import RegionPhoto from "../RegionPhoto";
import { roleFromSearch, type FormSearchParams } from "../form-options";
import NSWMap from "../NSWMap";
import EmployerRequestForm from "../EmployerRequestForm";
import { regions } from "../simplified-content";
import "../inner-pages.css";
import "./employers.css";

export const metadata = pageMetadata("/employers");

export default async function EmployersPage({ searchParams }: { searchParams?: Promise<FormSearchParams> }) {
  const initialRole = roleFromSearch(await (searchParams ?? Promise.resolve({})), "role");
  return <main className="hpi-inner employer-page"><PageSeo path="/employers" />
    <header className="inner-intro employer-intro"><div><h1>Healthcare Recruitment for Sydney and Regional NSW</h1><p className="employer-promise">We Manage Compliance and Rostering, So You Can Focus on Care.</p><p>Submit your request and we’ll acknowledge it within one business day. We’ll contact you within the same timeframe to discuss your staffing needs and provide an honest assessment of what we can deliver. Not ready to commit? Simply ask about a trial engagement in your request.</p><p>HPI recruits, employs and places Healthcare Workers for hospitals, aged care providers and community services across Sydney and regional NSW. Tell us the workers you need. We handle the Compliance & Rostering.</p></div><figure className="employer-care-photo"><img src="/assets/hero-hpi-care.webp" alt="Healthcare professional supporting an older woman" width="900" height="600" fetchPriority="high" /></figure></header>
    <div className="inner-form" id="request"><EmployerRequestForm initialRole={initialRole} /></div>
    <section className="inner-block"><h2>Nursing recruitment and healthcare staffing for NSW employers</h2><p>Plan your workforce around the roles, skills and continuity your service needs. Discuss Registered Nurses, Enrolled Nurses, Assistants in Nursing, Aged Care Workers, Support Workers and allied health requirements with HPI. We agree the engagement model, worker checks and placement arrangements before confirming a start.</p><p>Looking for a nursing agency or healthcare labour hire provider? Our workforce development approach connects recruitment with readiness, rostering, placement support and retention. <a className="inner-link" href="/why-hpi">See how our workforce development approach works</a>.</p></section>
    <section className="inner-block"><h2>From your workforce brief to commencement</h2><ol><li><strong>Define the requirement.</strong> Share the facility location, duties, number of workers, roster, preferred start date and expected duration.</li><li><strong>Agree the proposal.</strong> Confirm the employment or placement arrangement, responsibilities, rate basis and any travel or accommodation costs in writing.</li><li><strong>Review readiness.</strong> Check role suitability, current registration where required, work rights and the screening and evidence needed for your service.</li><li><strong>Plan the start and follow-up.</strong> Agree induction, supervision, the site contact and early feedback arrangements.</li></ol><p><a className="inner-link" href="/blog/aged-care-staffing-checklist-nsw">Use our aged care staffing checklist to prepare your brief</a>.</p></section>
    <section className="inner-block employer-receive"><h2>What We Deliver</h2><ul className="inner-deliverables">{["A verified role brief", "A qualified shortlist", "A readiness summary for each worker", "A start-date plan", "Early-placement follow-up", "Performance reporting"].map(text => <li key={text}>{text}</li>)}</ul></section>
    <section className="inner-block"><h2>Aged care workforce partnerships</h2><p>Discuss nursing and care workforce requirements for your aged care facility, including roster gaps, planned leave and regional placements.</p><a className="inner-link" href="/aged-care-workforce-nsw">Explore Aged Care Workforce Support in NSW</a></section>
    <section className="inner-block"><h2>Allied health recruitment</h2><p>Build your allied health team around the discipline, service setting and supervision your patients need. We discuss recruitment and placement requirements for Sydney and regional NSW, with checks suited to the profession.</p><a className="inner-link" href="/roles#allied-health">Explore allied health roles and placement checks</a></section>
    <section className="inner-block employer-buy-nsw" aria-labelledby="employer-buy-nsw-heading"><h2 id="employer-buy-nsw-heading">Find HPI on Buy NSW</h2><p>View our business profile on the NSW Government Buy NSW platform. Some supplier information or actions may require signing in.</p><p><a className="inner-link" href="https://buy.nsw.gov.au/supplier/profile/12466498" target="_blank" rel="noopener noreferrer">View our Buy NSW supplier profile</a></p></section>
    <section className="inner-block employer-difference"><h2>We bridge the workforce gap</h2><p>HPI connects healthcare workforce requirements with people, professional readiness and long-term workforce development. Our approach looks beyond filling vacancies to suitability, compliance, commencement and continuity.</p><a className="inner-link" href="/why-hpi">How HPI is different from conventional labour hire</a></section>
    <section className="inner-block employer-checks"><h2>Check for the role</h2><p>Checks depend on the role: AHPRA registration, qualifications, work rights and the screening that role needs. See the checks for each role on the <a className="inner-link" href="/roles">roles page</a>.</p></section>
    <section className="inner-block"><h2>Healthcare recruitment questions from employers</h2><h3>Can HPI help with regional NSW nursing recruitment?</h3><p>We discuss requirements in the Far West, Western NSW, Murrumbidgee, Hunter New England and other NSW regions. Availability, travel, accommodation and clinical support are assessed for each engagement. Send the actual facility location and roster so we can assess your request.</p><h3>Who employs the Healthcare Workers?</h3><p>For an HPI-employed placement, HPI employs the worker and agrees the placement arrangements with your organisation. If you are seeking a direct hire, tell us at the outset so the written proposal identifies the employer, recruitment scope and responsibilities.</p><h3>What do you need to quote for nursing or care staff?</h3><p>Include the role, required experience, location, shifts, expected hours, duration and intended start date. Identify any travel, accommodation, supervision or site-specific requirements. We confirm the scope and commercial terms in a written proposal.</p><h3>Can you guarantee an immediate start?</h3><p>A start date depends on suitable worker availability, completed checks and agreed onboarding. We discuss what is achievable for your requirement before confirming arrangements. Compliance before speed.</p><p><a className="inner-link" href="#request">Request Healthcare Workers for your facility</a>.</p></section>
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
      <p><a className="inner-link" href="/regional-nsw-healthcare-workforce">Explore our regional NSW healthcare workforce pathway</a></p>
      <NSWMap />
    </section>
  </main>;
}
