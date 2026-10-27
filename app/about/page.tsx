import { innerMetadata, PageIntro } from "../InnerPage";
import { responseStandards } from "../simplified-content";

export const metadata = innerMetadata("About and how we work", "Health Plus International is a healthcare workforce development business in Helensburgh, NSW. We recruit, employ and place healthcare workers.", "/about");

export default function AboutPage() {
  return <main className="hpi-inner">
    <PageIntro title="About and how we work" />
    <section className="inner-block"><h2>Who we are</h2><p>Health Plus International is a healthcare workforce development business in Helensburgh, NSW. We recruit, employ and place healthcare workers. We do not train them.</p></section>
    <section className="inner-block" id="how-we-work"><h2>How we work</h2><p>Role verification, credential screening, mobilisation and retention follow-up. We check that workers hold current registration and the evidence their role requires. Staff CPD does not replace registration, induction or supervision.</p></section>
    <section className="inner-block" id="charter"><h2>Service Charter</h2><ul>{["Respectful service", "Clear communication", "Fair access", "Compliance-led delivery", "Privacy and consent", "Honest expectations"].map(item=><li key={item}>{item}</li>)}</ul>
      <div className="inner-table-wrap"><table><caption>Response standards</caption><thead><tr><th scope="col">Contact</th><th scope="col">Commitment</th></tr></thead><tbody>{responseStandards.map(([contact, standard])=><tr key={contact}><th scope="row">{contact}</th><td>{standard}</td></tr>)}</tbody></table></div>
    </section>
    <section className="inner-block" id="partners"><h2>Partners</h2><p>We work with the Multicultural Communities Support Centre (MCCSC) to support candidates into healthcare work. The pathway has three steps: HPI, MCCSC, host facility. No visa category or overseas origin is assumed; each person&apos;s work rights and qualifications are verified individually.</p><a className="inner-partner-logo" href="https://mccsc.org.au" aria-label="Multicultural Communities Support Centre website"><img src="/assets/mccsc-logo-small.webp" alt="Multicultural Communities Support Centre" width="160" height="160" loading="lazy" /></a></section>
  </main>;
}
