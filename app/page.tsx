import "./home.css";

const roles = [
  ["Registered Nurses", "Hospital, aged care, community and regional services."],
  ["Assistants in Nursing", "Wards, residential aged care, respite and community programmes."],
  ["Aged Care Workers", "Residential aged care, respite and home care."],
  ["Support Workers", "Community and in-home support, not NDIS."],
  ["Allied Health Professionals", "Where an employer has a defined service and scope."],
] as const;

const pathways = [
  { heading: "If You Need Workers", steps: [
    ["Tell us what you need.", "Acknowledged the same business day.", "Send a short request. We name your contact."],
    ["We check and match.", "Contact within 24 hours.", "We check and match workers to your role brief. Checks are role-specific."],
    ["Start and settle.", "You choose who you accept.", "We plan the start with you and follow up early in the placement. You direct day-to-day work and clinical supervision."],
  ] },
  { heading: "If You Are Looking for Work", steps: [
    ["Register.", "Two short steps.", "Upload your résumé with your contact details, profession and region, then tell us your availability."],
    ["We get in touch.", "We contact you about roles that may suit you.", "We review your details first."],
    ["Compliance documents come later.", "Only for roles that fit.", "We ask for registration and compliance documents after we have reviewed your details. Please do not send identity, banking or health information with your first details."],
  ] },
] as const;

export default function Home() {
  return (
    <main className="hpi-home" id="top">
      <section className="home-hero" aria-labelledby="home-heading">
        <div className="home-hero-heading">
          <div>
            <p className="atmos-eyebrow">PEOPLE. CARE. COMPLIANCE.</p><h1 id="home-heading">People Who Make<br />Care Possible.</h1>
            <p className="home-subhead">Health Plus International recruits, employs and places healthcare workers in Sydney and regional NSW.</p>
          </div>
          <img className="home-hero-image" src="/assets/hero-hpi-care.webp" alt="Healthcare professional supporting an older woman" width="900" height="600" fetchPriority="high" />
        </div>
        <div className="home-audiences">
          <article>
            <h2>For Employers and Facilities.</h2>
            <p>Tell us the role and the location. We acknowledge your request the same business day.</p>
            <a className="hpi-action" href="/employers#request">Request Staff</a>
          </article>
          <article>
            <h2>For Healthcare Workers.</h2>
            <p>Upload your résumé and register in two short steps. Compliance documents come later.</p>
            <a className="hpi-action hpi-action-outline" href="/work-with-us#apply">Register for Work</a>
          </article>
        </div>
        <p className="home-response-line">Same business day acknowledgement · Contact within 24 hours · Sydney and regional NSW</p>
      </section>

      <section className="home-section" aria-labelledby="home-assurance-heading">
        <h2 id="home-assurance-heading">What You Can Count On</h2>
        <dl className="home-plain-list">
          <div><dt>We Employ and Place.</dt><dd>We recruit, employ and place healthcare workers.</dd></div>
          <div><dt>Checked for the Role.</dt><dd>Registration, qualifications, work rights and the screening the role needs, where required.</dd></div>
          <div><dt>Plain Response Standards.</dt><dd>Acknowledged the same business day. Contact within 24 hours.</dd></div>
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
        <h2 id="home-roles-heading">Who We Place</h2>
        <dl className="home-plain-list">{roles.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>
        <a className="home-text-link" href="/roles">See Each Role and How We Check It</a>
      </section>

      <section className="home-section home-coverage" aria-labelledby="home-coverage-heading">
        <h2 id="home-coverage-heading">Sydney and Regional NSW</h2>
        <p>Regional work is planned for each engagement. A listed region does not mean a vacancy is open.</p>
        <a className="home-text-link" href="/employers#where-we-work">See the Six Regions</a>
      </section>
    </main>
  );
}
