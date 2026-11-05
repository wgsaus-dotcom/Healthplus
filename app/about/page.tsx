import "./about.css";
import PageSeo from "../PageSeo";
import { pageMetadata } from "../seo-pages";
import { PageIntro } from "../InnerPage";
import { responseStandards } from "../simplified-content";

export const metadata = pageMetadata("/about");

export default function AboutPage() {
  return <main className="hpi-inner"><PageSeo path="/about" />
    <PageIntro title="About HPI" />
    <section className="inner-block"><h2>Who we are</h2><p>Healthplus International is a healthcare workforce development business in Helensburgh, NSW. We recruit, employ and place healthcare workers.</p></section>
    <section className="inner-block"><h2>We are the bridge</h2><p>Healthplus International was established following consultation with <a href="https://immi.homeaffairs.gov.au/visas/employing-and-sponsoring-someone/business-industry-and-regional-outreach" target="_blank" rel="noopener noreferrer" className="inner-link">the Department of Home Affairs’ Business, Industry and Regional Outreach (BIRO) team</a>, placing healthcare workforce development at the centre of our purpose. We bridge the gap between healthcare organisations needing dependable workers and people seeking pathways into sustainable healthcare careers. Our approach brings together workforce planning, professional readiness, role-specific compliance, coordinated commencement and ongoing support.</p><a className="inner-link" href="/why-hpi">Discover why HPI is different</a></section>
    <section className="inner-block" id="how-we-work"><h2>How we work</h2><p>We confirm the role, check each worker’s credentials, plan their start and follow up to support them in the role. We check that workers hold current registration and the evidence their role requires. Staff CPD does not replace registration, induction or supervision.</p></section>
    <section className="inner-block" id="charter"><h2>Service charter</h2><ul>{["Respectful service", "Clear communication", "Fair access", "Compliance-led delivery", "Privacy and consent", "Honest expectations"].map(item=><li key={item}>{item}</li>)}</ul>
      <div className="inner-table-wrap"><table><caption>Response standards</caption><thead><tr><th scope="col">Contact</th><th scope="col">Commitment</th></tr></thead><tbody>{responseStandards.map(([contact, standard])=><tr key={contact}><th scope="row">{contact}</th><td>{standard}</td></tr>)}</tbody></table></div>
    </section>
    <section className="inner-block" aria-labelledby="buy-nsw-heading">
      <div className="buy-nsw-registration">
        <p className="buy-nsw-eyebrow">Supplier registration</p>
        <h2 id="buy-nsw-heading">Buy NSW</h2>
        <p>Healthplus International is registered on the buy.nsw Supplier Hub.</p>
        <a className="buy-nsw-link" href="https://buy.nsw.gov.au/suppliers" target="_blank" rel="noopener noreferrer">Visit the Supplier Hub <span aria-hidden="true">↗</span></a>
      </div>
    </section>
    <section className="inner-block" id="partners"><h2>Partners</h2><p>We work with the Multicultural Communities Support Centre (MCCSC) to support candidates into healthcare work. The pathway has three steps: HPI, MCCSC, host facility. No visa category or overseas origin is assumed; each person&apos;s work rights and qualifications are verified individually.</p><a className="inner-partner-logo" href="https://mccsc.org.au" aria-label="Multicultural Communities Support Centre Website"><img src="/assets/mccsc-logo-small.webp" alt="Multicultural Communities Support Centre" width="160" height="160" loading="lazy" /></a></section>
  </main>;
}
