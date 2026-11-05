import PageSeo from "./PageSeo";
import { pageMetadata } from "./seo-pages";
import "./home.css";

export const metadata = pageMetadata("/");

const roles = [
  ["Registered Nurses", "Hospital, aged care, community and regional services."],
  ["Assistants in Nursing", "Wards, residential aged care, respite and community programmes."],
  ["Aged Care Workers", "Residential aged care, respite and home care."],
  ["Support Workers", "Community and in-home support, not NDIS."],
  ["Allied Health Professionals", "Where an employer has a defined service and scope."],
] as const;

const pathways = [
  { heading: "If you need workers", steps: [
    ["Tell Us What You Need", "Acknowledged within one business day.", "Send a short request. We name your contact."],
    ["We check and match", "Contact within one business day.", "We check and match workers to your role brief. Checks are role-specific."],
    ["Start and settle", "You choose who you accept.", "We plan the start with you and follow up early in the placement. You direct day-to-day work and clinical supervision."],
  ] },
  { heading: "If you are looking for work", steps: [
    ["Register", "Two short steps.", "Upload your résumé with your contact details, profession and region, then tell us your availability."],
    ["We get in touch", "We contact you about roles that may suit you.", "We review your details first."],
    ["Compliance documents", "Only for roles that fit.", "We ask for registration and compliance documents after we have reviewed your details. Please do not send identity, banking or health information with your first details."],
  ] },
] as const;

export default function Home() {
  return (
    <main className="hpi-home" id="top"><PageSeo path="/" />
      <section className="home-hero" aria-labelledby="home-heading">
        <div className="home-hero-heading">
          <div>
            <p className="atmos-eyebrow">PEOPLE. CARE. COMPLIANCE.</p><h1 id="home-heading">Healthcare Workforce Development in NSW</h1>
            <p className="home-subhead">We make care possible. Healthplus International recruits, employs and places Healthcare Workers in Sydney and regional NSW.</p>
          </div>
          <img className="home-hero-image" src="/assets/hero-hpi-care.webp" alt="Healthcare professional supporting an older woman" width="900" height="600" fetchPriority="high" />
        </div>
        <div className="home-audiences">
          <article>
            <h2>Employers and Facilities</h2>
            <p>Tell us the role and the location. We acknowledge your request within one business day.</p>
            <a className="hpi-action" href="/employers#request">Request Workers</a>
          </article>
          <article>
            <h2>Healthcare Workers</h2>
            <p>Upload your résumé and register in two short steps. Compliance documents come later.</p>
            <a className="hpi-action hpi-action-outline" href="/work-with-us#apply">Find Healthcare Work</a>
          </article>
        </div>
        <p className="home-response-line">Acknowledgement and contact within one business day · Sydney and regional NSW</p>
      </section>

      <section className="home-section" aria-labelledby="home-assurance-heading">
        <h2 id="home-assurance-heading">What You Can Count On</h2>
        <dl className="home-plain-list">
          <div><dt>We employ and place</dt><dd>We recruit, employ and place healthcare workers.</dd></div>
          <div><dt>Checked for the role</dt><dd>Registration, qualifications, work rights and the screening the role needs, where required.</dd></div>
          <div><dt>Acknowledgement and response</dt><dd>We acknowledge your request and contact you within one business day.</dd></div>
        </dl>
        <a className="home-text-link" href="/about#charter">See Our Service Charter</a>
      </section>

      <section className="home-section" id="how" aria-labelledby="home-how-heading">
        <h2 id="home-how-heading">How It Works</h2>
        <div className="home-process">
          {pathways.map(({heading, steps}, index) => <article key={heading}>
            <h3>{heading}</h3>
            {steps.map(([title, visible, detail]) => <details key={title}>
              <summary><strong>{title}</strong><span>{visible}</span></summary>
              <p>{detail}</p>
            </details>)}
            
          </article>)}
        </div>
      </section>

      <section className="home-section" aria-labelledby="home-roles-heading">
        <h2 id="home-roles-heading">Nursing, Aged Care and Support Worker Roles</h2><ul className="home-placement-categories"><li><a className="home-text-link" href="/roles#allied-health">Allied Health</a></li><li><a className="home-text-link" href="/roles#nurses">Nurses</a></li><li><a className="home-text-link" href="/roles#doctors">Doctors</a></li></ul>
        <dl className="home-plain-list">{roles.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>
        <a className="home-text-link" href="/roles">See Positions and How We Check Them</a>
      </section>

      <section className="home-section home-coverage" aria-labelledby="home-coverage-heading">
        <h2 id="home-coverage-heading">Sydney and Regional NSW</h2>
        <p>Based in Helensburgh, we support healthcare employers and Healthcare Workers across Sydney, the Central Coast, Hunter, Riverina and regional NSW. Our workforce development approach connects role-specific readiness, compliance, placement and ongoing support.</p>
        <a className="home-text-link" href="/regional-nsw-healthcare-workforce">Explore Our Regional Workforce Pathways</a><p><a className="home-text-link" href="/why-hpi">Our workforce development approach</a> · <a className="home-text-link" href="/ahpra-registration-support">Ahpra registration support for overseas nurses</a></p>
      </section>
    </main>
  );
}
