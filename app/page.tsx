import "./home.css";

const roles = [
  ["Registered Nurses", "Hospital, aged care, community and regional services."],
  ["Assistants in Nursing", "Wards, residential aged care, respite and community programmes."],
  ["Aged care workers", "Residential aged care, respite and home care."],
  ["Support workers", "Community and in-home support, not NDIS."],
  ["Allied health professionals", "Where an employer has a defined service and scope."],
] as const;

const pathways = [
  { heading: "If you need workers", steps: [
    ["Tell us what you need.", "Acknowledged the same business day.", "Send a short request. We name your contact."],
    ["We check and match.", "Contact within 24 hours.", "We check and match workers to your role brief. Checks are role-specific."],
    ["Start and settle.", "You choose who you accept.", "We plan the start with you and follow up early in the placement. You direct day-to-day work and clinical supervision."],
  ] },
  { heading: "If you are looking for work", steps: [
    ["Register.", "Two short steps.", "Your contact details, profession and region, then your availability and an optional résumé."],
    ["We get in touch.", "We contact you about roles that may suit you.", "We review your details first."],
    ["Documents come later.", "Only for roles that fit.", "We ask for registration and compliance documents after we have reviewed your details. Please do not send identity, banking or health information with your first details."],
  ] },
] as const;

export default function Home() {
  return (
    <main className="hpi-home" id="top">
      <section className="home-hero" aria-labelledby="home-heading">
        <div className="home-hero-heading">
          <div>
            <p className="atmos-eyebrow">PEOPLE. CARE. COMPLIANCE.</p><h1 id="home-heading">People who make<br />care possible.</h1>
            <p className="home-subhead">Health Plus International recruits, employs and places healthcare workers in Sydney and regional NSW.</p>
          </div>
          <img className="home-hero-image" src="/assets/hero-hpi-care.webp" alt="Healthcare professional supporting an older woman" width="900" height="600" fetchPriority="high" />
        </div>
        <div className="home-audiences">
          <article>
            <h2>For employers and facilities.</h2>
            <p>Tell us the role and the location. We acknowledge your request the same business day.</p>
            <a className="hpi-action" href="/employers#request">Request Staff</a>
          </article>
          <article>
            <h2>For healthcare workers.</h2>
            <p>Register in two short steps. Documents come later.</p>
            <a className="hpi-action hpi-action-outline" href="/work-with-us#apply">Register for Work</a>
          </article>
        </div>
        <p className="home-response-line">Same business day acknowledgement · Contact within 24 hours · Sydney and regional NSW</p>
      </section>

      <section className="home-section" aria-labelledby="home-assurance-heading">
        <h2 id="home-assurance-heading">What you can count on</h2>
        <dl className="home-plain-list">
          <div><dt>We employ and place.</dt><dd>We recruit, employ and place healthcare workers.</dd></div>
          <div><dt>Checked for the role.</dt><dd>Registration, qualifications, work rights and the screening the role needs, where required.</dd></div>
          <div><dt>Plain response standards.</dt><dd>Acknowledged the same business day. Contact within 24 hours.</dd></div>
        </dl>
        <a className="home-text-link" href="/about#charter">See our service charter</a>
      </section>

      <section className="home-section" id="how" aria-labelledby="home-how-heading">
        <h2 id="home-how-heading">How it works</h2>
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
        <h2 id="home-roles-heading">Who we place</h2>
        <dl className="home-plain-list">{roles.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>
        <a className="home-text-link" href="/roles">See each role and how we check it</a>
      </section>

      <section className="home-section home-coverage" aria-labelledby="home-coverage-heading">
        <h2 id="home-coverage-heading">Sydney and regional NSW</h2>
        <p>Regional work is planned for each engagement. A listed region does not mean a vacancy is open.</p>
        <a className="home-text-link" href="/employers#where-we-work">See the six regions</a>
      </section>
    </main>
  );
}
