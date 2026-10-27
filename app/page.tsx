import Link from "next/link";
import EmployerRequestForm from "./EmployerRequestForm";
import WorkerApplicationForm from "./WorkerApplicationForm";

const regions = [
  ["Far West NSW", "Broken Hill · Menindee · Wilcannia · Tibooburra", "far-west-nsw"],
  ["Western NSW", "Dubbo · Bourke · Walgett · Lightning Ridge · Cobar", "western-nsw"],
  ["Murrumbidgee", "Griffith · Wagga Wagga · Deniliquin · Hay", "murrumbidgee"],
  ["Hunter New England", "Tamworth · Armidale · Moree · Narrabri · Inverell", "hunter-new-england"],
  ["Northern NSW", "Lismore · Grafton · Ballina · Casino · Byron Bay", "northern-nsw"],
  ["Mid North Coast", "Port Macquarie · Coffs Harbour · Kempsey · Taree", "mid-north-coast"],
];

const workforce = [
  {
    number: "01",
    title: "Registered Nurses",
    text: "Ahpra-registered nurses for defined clinical roles, subject to verified scope, experience and facility requirements.",
    slug: "registered-nurses",
  },
  {
    number: "02",
    title: "Enrolled Nurses",
    text: "Ahpra-registered enrolled nurses for defined healthcare, aged-care, community, regional and remote pathways.",
    slug: "enrolled-nurses",
  },
  {
    number: "03",
    title: "Assistants in Nursing",
    text: "Trained clinical support staff prepared for ward, residential and community care.",
    slug: "assistants-in-nursing",
  },
  {
    number: "04",
    title: "Aged Care Workers",
    text: "Certificate III and IV qualified workers for residential and consumer-directed care.",
    slug: "aged-care-workers",
  },
  {
    number: "05",
    title: "Support Workers",
    text: "Person-centred support for in-home care, day programs and community services.",
    slug: "support-workers",
  },
  {
    number: "06",
    title: "Allied Health",
    text: "Selected OT, physiotherapy, psychology, podiatry and dietetics professionals.",
    slug: "allied-health",
  },
  {
    number: "07",
    title: "Remote & Site Health",
    text: "Selected health personnel for regional, remote and industrial settings, subject to verified scope and project controls.",
    slug: "remote-site-health",
  },
];

const steps = [
  ["Acknowledge", "Your request is acknowledged the same business day, with a named HPI contact."],
  ["Initial response", "We will contact your facility within 24 hours to clarify the need and next step. This is a response standard, not a worker-supply guarantee."],
  ["Ready & match", "Suitable professionals move through role-specific credential, readiness and availability checks."],
  ["Deploy & support", "Mobilisation is coordinated and the engagement moves into structured early-placement support."],
];

const offers = [
  {
    name: "Build the right pipeline",
    label: "Demand and sourcing alignment",
    text: "We define the employer, service, qualification stream, role, location, roster and timing—then align sourcing to that verified requirement.",
    includes: ["Employer and role brief", "Qualification-aligned sourcing", "Availability and role matching", "Employer selection support"],
  },
  {
    name: "Build workforce readiness",
    label: "Readiness, credentials and CPD",
    text: "We coordinate role-specific qualification, registration, screening, work-right and experience checks, then connect identified needs to role-based development.",
    includes: ["Qualification and registration review", "Screening and work-right checks", "Role-based readiness and CPD", "Outstanding-action visibility"],
  },
  {
    name: "Strengthen continuity",
    label: "Commencement and retention stability",
    text: "We coordinate agreed pre-start actions and early-placement continuity, then review the experience and retention measures included in the engagement.",
    includes: ["Pre-start coordination", "Early-placement continuity", "Structured follow-up", "Retention and experience review"],
  },
];

const employerDeliverables = [
  ["Verified role brief", "The service setting, duties, roster, location, timing and mandatory requirements recorded before sourcing begins."],
  ["Qualified shortlist", "Suitable people presented against the agreed requirement, with relevant experience and availability made clear."],
  ["Readiness summary", "Credential status, completed checks, outstanding actions and any material limitations visible before commencement."],
  ["Mobilisation plan", "Induction ownership, start requirements, key contacts and agreed support actions coordinated for commencement."],
  ["Early-placement follow-up", "Structured check-ins after commencement to identify support needs and reduce avoidable placement breakdown."],
  ["Performance reporting", "Agreed measures covering response, readiness, commencement, experience and retention."],
];

const assuranceControls = [
  {
    title: "Verify",
    text: "Registration, qualifications, work rights and role-required screening are checked against the verified workforce brief.",
    items: ["Source and currency recorded", "Role-specific requirements applied", "Material limitations disclosed"],
  },
  {
    title: "Monitor",
    text: "Time-limited evidence is tracked by expiry, while missing or outstanding requirements remain visible to the responsible team.",
    items: ["Expiry dates monitored", "Outstanding actions assigned", "Changes reviewed before progression"],
  },
  {
    title: "Evidence",
    text: "Employers receive a clear readiness position and can request the agreed compliance evidence relevant to the engagement.",
    items: ["Readiness status", "Documented decision trail", "Audit-ready engagement records"],
  },
];

const framework = [
  ["01", "Role verification", "Service, duties, scope and workforce need"],
  ["02", "Credential screening", "Registration, qualifications and role-required checks"],
  ["03", "CPD alignment", "Role-based development linked to identified needs"],
  ["04", "Mobilisation", "Selection support, pre-start actions and commencement"],
  ["05", "Retention", "Early continuity, experience and agreed follow-up"],
];

const cpdPillars = [
  ["01", "Plan", "Learning needs, role requirements and annual objectives are defined before activities are assigned."],
  ["02", "Learn", "Accessible, role-relevant learning is delivered or coordinated through approved educators and content."],
  ["03", "Evidence", "Completion, active learning time, assessment and reflection are recorded in a controlled learning record."],
  ["04", "Apply", "Supervision, observation, audit or competency checks are used where the role and risk require them."],
];

const metrics = [
  ["Time to shortlist", "Request accepted → qualified shortlist"],
  ["Time to readiness", "Candidate enters pathway → deployment-ready"],
  ["Credential completion", "Required checks completed correctly"],
  ["Deployment conversion", "Accepted candidates successfully mobilised"],
  ["90-day retention", "Deployed professionals remaining at 90 days"],
  ["Experience", "Employer and healthcare-professional satisfaction"],
];

const charterCommitments = [
  ["Respectful service", "We listen, communicate professionally and treat every person with dignity."],
  ["Clear communication", "We explain the process, what we need, what happens next and any material delay."],
  ["Fair and inclusive access", "We assess relevant requirements fairly and consider reasonable adjustments."],
  ["Compliance-led delivery", "We never bypass registration, screening, work-right, credential, employment or safeguarding requirements to move faster."],
  ["Privacy and consent", "We explain why information is needed and handle it carefully for defined purposes."],
  ["Honest expectations", "We do not promise a job, worker, visa, registration result, start date or placement outcome we cannot substantiate."],
];

const responseStandards = [
  ["General enquiry", "Acknowledgement within 1 business day"],
  ["Employer workforce request", "We will contact your facility and provide an initial response within 24 hours of receiving your request"],
  ["Application or registration", "Receipt confirmed within 1 business day"],
  ["Progress update", "Updates at agreed milestones, with material delays explained"],
  ["Reasonable adjustment", "Acknowledgement within 2 business days and discussion of practical options"],
  ["Complaint or privacy concern", "Acknowledgement within 2 business days; target outcome within 10 business days or a progress update"],
];

const mapTowns = [
  ["Broken Hill", 69.8, 186.9, "critical"],
  ["Walgett", 331.7, 112.9, "critical"],
  ["Lightning Ridge", 327.8, 93.4, "critical"],
  ["Bourke", 244.4, 116.8, "severe"],
  ["Cobar", 240.5, 171.3, "severe"],
  ["Griffith", 248.4, 280.4, "severe"],
  ["Moree", 399.2, 93.4, "severe"],
  ["Dubbo", 351.6, 198.6, "high"],
  ["Tamworth", 442.9, 155.7, "high"],
  ["Armidale", 474.6, 132.4, "high"],
  ["Coffs Harbour", 530.2, 124.6, "high"],
  ["Wagga Wagga", 304, 311.5, "high"],
  ["Deniliquin", 169, 350.5, "high"],
] as const;

const partnershipCapabilities = [
  ["Employer and role requirements", "/partnership/employer-role-requirements"],
  ["Readiness and credential controls", "/partnership/readiness-credential-controls"],
  ["Deployment and workforce support", "/partnership/deployment-workforce-support"],
  ["Performance and retention reporting", "/partnership/performance-retention-reporting"],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Health Plus International home">
          <img src="/assets/healthplus-mark.png" alt="" width="180" height="190" />
          <span>
            <strong>Health Plus International</strong>
            <small>People · Care · Compliance</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#employer-request">Employers</a>
          <a href="#worker-application">Healthcare Professionals</a>
          <a href="#workforce">Roles</a>
          <a href="#rapid-response">How It Works</a>
          <a href="/about">About HPI</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="button button-small" href="#employer-request">
          Discuss a Workforce Need <Arrow />
        </a>
        <details className="mobile-menu">
          <summary aria-label="Open menu"><span></span><span></span></summary>
          <nav>
            <a href="#employer-request">Employers</a>
            <a href="#worker-application">Healthcare Professionals</a>
            <a href="#workforce">Roles</a>
            <a href="#rapid-response">How It Works</a>
            <a href="/about">About HPI</a>
            <a href="#contact">Contact</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Healthcare workforce development · Sydney and regional NSW</p>
          <h1>Build workforce readiness. <em>Strengthen retention.</em></h1>
          <p className="hero-lead">
            HPI develops qualification-aligned healthcare workforce pipelines across
            NSW—connecting verified credentials, role-based capability development and
            early-placement continuity from workforce need to sustained retention.
          </p>
          <div className="button-row">
            <a className="button" href="#employer-request">I need workers <Arrow /></a>
            <a className="button button-outline" href="#worker-application">I&apos;m looking for work <Arrow /></a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Healthcare professionals serving regional communities">
          <figure className="arch arch-main"><img src="/assets/hero-nurse.jpg" alt="Healthcare professional supporting a patient" width="900" height="506" fetchPriority="high" /></figure>
          <figure className="arch arch-clinical"><img src="/assets/hero-nurse2.jpg" alt="Nurse working in a clinical setting" width="900" height="600" loading="lazy" decoding="async" /></figure>
          <figure className="arch arch-region">
            <img src="/assets/far-west-community-health.webp" alt="Representative Far West NSW regional community health setting" width="1200" height="800" loading="lazy" decoding="async" />
            <figcaption className="region-label"><strong>Far West NSW</strong><span>Representative setting</span></figcaption>
          </figure>
          <span className="orbit orbit-one"></span><span className="orbit orbit-two"></span>
        </div>
        <div className="proof-strip">
          <div><b>Same day</b><span>Request acknowledgement</span></div>
          <div><b>24 hours</b><span>Facility contact—not a supply guarantee</span></div>
          <div><b>Verified</b><span>Credential-led readiness</span></div>
          <div><b>NSW</b><span>Sydney, regional and selected remote locations</span></div>
        </div>
      </section>

      <section className="intro section" id="about">
        <div>
          <p className="eyebrow">What Health Plus International does</p>
          <h2>
            Find the right people.<br className="intro-title-break" />{" "}
            Prepare them well.<br className="intro-title-break" />{" "}
            <em>Help them stay.</em>
          </h2>
        </div>
        <div className="intro-copy">
          <p className="large-copy">HPI is a healthcare workforce development organisation focused on readiness, role-based development and retention stability.</p>
          <p>For employers, HPI turns a workforce need into a defined, qualification-aligned pipeline—from role requirements and sourcing through to readiness, CPD, commencement coordination and early-placement continuity.</p>
          <p>HPI verifies and develops workforce readiness. The employing or host facility retains final selection, employment, clinical governance, supervision, site induction and local scope-of-practice decisions.</p>
        </div>
      </section>

      <section className="rapid-response section" id="rapid-response">
        <div className="rapid-copy">
          <p className="eyebrow light">How it works</p>
          <h2>From workforce request to <em>supported commencement.</em></h2>
          <p>
            Employers can begin with one urgent vacancy or a recurring workforce need.
            HPI keeps the role, credentials, responsibilities, readiness and mobilisation
            requirements visible throughout the process.
          </p>
          <a className="button button-gold" href="#employer-request">Submit a workforce request <Arrow /></a>
        </div>
        <div className="response-steps">
          {steps.map(([title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="solutions section" id="solutions">
        <div className="section-heading dark-copy">
          <p className="eyebrow">What HPI actually provides</p>
          <h2>One workforce need.<br /><em>Clear support from request to retention.</em></h2>
        </div>
        <div className="offer-grid">
          {offers.map((offer, index) => (
            <article key={offer.name}>
              <span className="offer-number">0{index + 1}</span>
              <p className="offer-label">{offer.label}</p>
              <h3>{offer.name}</h3>
              <p>{offer.text}</p>
              <ul>{offer.includes.map((item) => <li key={item}>{item}</li>)}</ul>
              <a href="/framework">See how the full pathway works <Arrow /></a>
            </article>
          ))}
        </div>
        <div className="employer-deliverables">
          <div className="deliverables-heading">
            <p className="eyebrow light">What employers receive</p>
            <h3>A visible workforce pathway—not just a résumé.</h3>
            <p>Deliverables are scaled to the engagement and confirmed before work begins.</p>
          </div>
          <div className="deliverables-grid">
            {employerDeliverables.map(([title, text], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <div><h4>{title}</h4><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="workforce section" id="workforce">
        <div className="section-heading">
          <p className="eyebrow light">Roles we support</p>
          <h2>Healthcare and care workers<br /><em>matched to real service needs.</em></h2>
          <p>Seven qualification-aligned workforce streams—from Certificate-level care roles through to registered nursing and selected allied health pathways.</p>
        </div>
        <div className="workforce-list">
          {workforce.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3><a href={`/workforce/${item.slug}`}>{item.title}</a></h3>
              <p>{item.text}</p>
              <a className="workforce-arrow" href={`/workforce/${item.slug}`} aria-label={`Explore ${item.title}`}><Arrow /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="regions section" id="regions">
        <div className="nsw-map">
          <div className="map-title">
            <span>Existing coverage network</span>
            <strong>Regional NSW Workforce Map</strong>
          </div>
          <svg viewBox="0 0 600 450" role="img" aria-labelledby="map-title map-desc">
            <title id="map-title">Health Plus International regional NSW workforce map</title>
            <desc id="map-desc">New South Wales map showing regional communities within HPI workforce focus areas.</desc>
            <defs>
              <pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,.055)" strokeWidth="1" />
              </pattern>
              <filter id="map-glow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <rect width="600" height="450" fill="url(#map-grid)" />
            <polygon
              className="nsw-outline"
              points="50,268.7 50,190.8 50,112.9 50,73.9 69.8,66.2 109.5,81.7 149.2,77.8 188.9,73.9 228.6,77.8 248.4,70.1 268.3,58.4 288.1,58.4 307.9,58.4 327.8,62.3 347.6,62.3 367.5,54.5 387.3,50.6 407.1,50.6 427,46.7 446.8,50.6 466.7,46.7 486.5,42.8 506.3,42.8 526.2,38.9 538.1,35 546,42.8 550,58.4 546,81.7 538.1,105.1 530.2,124.6 522.2,147.9 518.3,167.4 506.3,186.9 490.5,210.3 482.5,225.8 470.6,241.4 454.8,264.8 446.8,272.6 438.9,288.2 431,311.5 423,327.1 415.1,342.7 407.1,358.3 399.2,373.8 395.2,385.5 391.3,397.2 383.3,405 359.5,393.3 335.7,385.5 307.9,377.7 288.1,358.3 268.3,350.5 248.4,342.7 228.6,338.8 208.7,334.9 188.9,334.9 169,331 149.2,319.3 129.4,311.5 109.5,299.8 89.7,288.2 69.8,276.5 50,268.7"
            />
            <path className="placement-flow" d="M72 187 C170 105 260 210 332 113 S430 74 530 125" />
            <path className="placement-flow flow-two" d="M72 187 C156 250 222 292 304 312 S415 238 443 156" />
            {mapTowns.map(([name, x, y, level]) => (
              <g className={`map-node ${level}`} key={name} transform={`translate(${x} ${y})`}>
                <circle className="pulse" r="10" />
                <circle className="dot" r="4.5" />
                {["Broken Hill", "Bourke", "Dubbo", "Tamworth", "Coffs Harbour", "Wagga Wagga"].includes(name) && (
                  <text x="0" y="-15" textAnchor="middle">{name}</text>
                )}
              </g>
            ))}
          </svg>
          <div className="map-legend">
            <span><i className="critical"></i>Far west focus</span>
            <span><i className="severe"></i>Inland focus</span>
            <span><i className="high"></i>Regional hubs</span>
            <span><i className="flow"></i>Workforce pathways</span>
          </div>
        </div>
        <div className="regions-content">
          <p className="eyebrow">Where we work</p>
          <h2>Sydney plus six regional<br /><em>focus areas.</em></h2>
          <p>Supporting planned workforce pipelines and structured block placements across metropolitan Sydney, the coast, inland communities and the far west. Regional work is not presented as 24/7 ad-hoc dispatch: travel, accommodation, local contacts, roster contingencies and any after-hours escalation pathway are agreed for each engagement.</p>
          <div className="region-grid">
            {regions.map(([name, places, slug], index) => (
              <article key={name}>
                <span>0{index + 1}</span><h3><a href={`/regions/${slug}`}>{name}</a></h3><p>{places}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="framework section" id="framework">
        <div className="section-heading dark-copy">
          <p className="eyebrow">HPI Workforce Development Framework™</p>
          <h2>Five practical stages.<br /><em>Clear accountability.</em></h2>
          <p>Role verification, credential screening, CPD alignment, mobilisation and retention—without crossing into the facility&apos;s clinical governance authority.</p>
        </div>
        <div className="framework-grid">
          {framework.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
        <a className="text-link framework-page-link" href="/framework">Explore the full workforce framework <Arrow /></a>
      </section>

      <section className="cpd-home section" id="cpd">
        <div className="cpd-home-copy">
          <p className="eyebrow light">Staff CPD &amp; workforce capability</p>
          <h2>Learning designed to be <em>used.</em></h2>
          <p className="cpd-home-lead">
            HPI provides and coordinates structured continuing professional
            development for its staff and approved participating workforce cohorts.
            Learning is planned around the role, supported with evidence and reviewed
            for practical application.
          </p>
          <a className="button button-gold" href="/cpd">Explore HPI CPD <Arrow /></a>
          <p className="cpd-qualification">
            CPD complements—rather than replaces—professional registration
            requirements, employer or facility induction, supervision and local
            competency assessment.
          </p>
        </div>
        <div className="cpd-pillar-grid">
          {cpdPillars.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="performance section">
        <div>
          <p className="eyebrow">Performance and proof</p>
          <h2>Measured from request<br />to <em>retention.</em></h2>
          <p>Every engagement begins with agreed baselines and reporting definitions. These are measurement categories—not published performance claims. Pilot outcomes, case studies or testimonials will be added only after the evidence is verified and publication authority is obtained.</p>
        </div>
        <div className="metric-list">
          {metrics.map(([name, definition], index) => (
            <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{definition}</p></article>
          ))}
        </div>
      </section>

      <section className="partnership section" id="partnership">
        <div className="partnership-copy">
          <p className="eyebrow light">Community-connected delivery</p>
          <h2>Workforce pathways need more than <em>matching.</em></h2>
          <p>
            Where a programme includes community participation or settlement support, HPI works with the{" "}
            <a className="partner-link" href="https://www.mccsc.org.au" target="_blank" rel="noopener noreferrer">
              Multicultural Communities Support Centre (MCCSC)
            </a>{" "}
            through clearly defined responsibilities. Where included in an engagement,
            MCCSC can support local settlement onboarding, cultural orientation,
            community connection and retention mentoring for regional participants.
          </p>
        </div>
        <div className="partner-grid">
          <article>
            <p className="partner-name">Health Plus International</p>
            <h3>Healthcare workforce accountability</h3>
            <ul className="capability-links">
              {partnershipCapabilities.map(([title, href]) => (
                <li key={href}>
                  <a href={href}><span>{title}</span><Arrow /></a>
                </li>
              ))}
            </ul>
          </article>
          <article className="mccsc-partner-card">
            <a
              className="partner-logo-link"
              href="https://www.mccsc.org.au"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the Multicultural Communities Support Centre website"
            >
              <img
                className="partner-logo"
                src="/assets/mccsc-logo.webp"
                alt="Multicultural Communities Support Centre (MCCSC) logo"
                width="512"
                height="512"
                loading="lazy"
              />
            </a>
            <p className="partner-name">
              <a className="partner-link" href="https://www.mccsc.org.au" target="_blank" rel="noopener noreferrer">
                Multicultural Communities Support Centre (MCCSC)
              </a>
            </p>
            <h3>Community connection and retention support</h3>
            <ul><li>Local settlement onboarding</li><li>Cultural and community orientation</li><li>Regional services navigation</li><li>Retention mentoring and referral support</li></ul>
          </article>
        </div>
        <div className="settlement-flow" aria-labelledby="settlement-flow-title">
          <div>
            <p className="eyebrow light">Candidate support pathway</p>
            <h3 id="settlement-flow-title">How HPI, MCCSC and the host facility connect</h3>
          </div>
          <ol>
            <li><span>01</span><strong>HPI workforce pathway</strong><p>Role verification, credential screening, CPD alignment and mobilisation coordination.</p></li>
            <li><span>02</span><strong>MCCSC support—where engaged</strong><p>Settlement onboarding, cultural orientation, services navigation and retention mentoring.</p></li>
            <li><span>03</span><strong>Host facility authority</strong><p>Candidate selection, employment, site induction, supervision and clinical governance.</p></li>
          </ol>
          <small>No visa category or overseas origin is assumed. Work rights, registration and pathway requirements are verified for each individual and role.</small>
        </div>
        <p className="partnership-note">Responsibilities are confirmed for each engagement. HPI retains workforce-pathway, compliance-coordination and contractual accountability within its agreed scope; the host facility retains employment and clinical governance authority.</p>
      </section>

      <section className="service-charter section" id="service-charter">
        <div className="charter-hero">
          <div>
            <p className="eyebrow">Our Service Charter</p>
            <h2>Respect in every interaction.<br /><em>Compliance in every decision.</em></h2>
          </div>
          <div className="charter-promise">
            <p className="charter-kicker">Our service promise</p>
            <p>We will treat you with respect, communicate honestly, protect your information and put compliance before speed.</p>
          </div>
        </div>

        <div className="charter-intro">
          <p>
            This charter explains what employers, healthcare professionals, applicants
            and partners can expect from Health Plus International—and what we ask from
            the people and organisations who work with us.
          </p>
          <p>
            We respond to immediate workforce needs while supporting readiness,
            mobilisation, professional experience and retention. Fast communication
            never means weak checks or false certainty.
          </p>
        </div>

        <div className="charter-commitments">
          {charterCommitments.map(([title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className="charter-standards">
          <div className="charter-standards-copy">
            <p className="eyebrow light">Response standards</p>
            <h2>When you should<br /><em>hear from us.</em></h2>
            <p>
              Standard operating hours are 8:30 am–5:00 pm Sydney time, Monday–Friday,
              excluding NSW public holidays. A contract or agreed service level may
              set different requirements.
            </p>
            <div className="after-hours-note">
              <strong>Regional after-hours arrangements</strong>
              <p>
                For regional engagements, any after-hours contact for travel or
                accommodation disruption, roster continuity and facility escalation
                must be defined in the engagement-specific SLA. General HPI contact
                channels are not a 24/7 dispatch, clinical or emergency service.
              </p>
            </div>
          </div>
          <div className="response-table" role="table" aria-label="HPI public response standards">
            {responseStandards.map(([contact, commitment]) => (
              <div className="response-row" role="row" key={contact}>
                <strong role="cell">{contact}</strong>
                <span role="cell">{commitment}</span>
              </div>
            ))}
            <p className="response-caveat">
              Acknowledgement and triage standards do not guarantee that a suitable
              healthcare professional, role or placement will be available within a
              fixed period.
            </p>
          </div>
        </div>

        <div className="charter-groups">
          <article>
            <p className="charter-kicker">For professionals and applicants</p>
            <h3>Clear pathways. No false promises.</h3>
            <ul>
              <li>We explain the pathway and evidence required for each opportunity.</li>
              <li>We only present or deploy people when applicable mandatory requirements are addressed.</li>
              <li>We seek appropriate permission before sharing confidential information.</li>
              <li>We communicate honestly when a role changes, closes or cannot progress.</li>
              <li>Training or qualification bridging is voluntary and does not guarantee employment or placement.</li>
            </ul>
          </article>
          <article>
            <p className="charter-kicker">Working together</p>
            <h3>Your rights and responsibilities.</h3>
            <ul>
              <li>Expect respect, inclusion, clear information, privacy-conscious handling and accessible communication.</li>
              <li>Provide accurate, current and complete information.</li>
              <li>Tell us promptly if availability, credentials, work rights or circumstances change.</li>
              <li>Treat HPI personnel, clients, candidates and partners respectfully.</li>
              <li>Raise concerns early so we can respond and improve.</li>
            </ul>
          </article>
        </div>

        <div className="charter-feedback">
          <div>
            <p className="eyebrow">Feedback and complaints</p>
            <h2>Help us improve.</h2>
            <p>
              You can give a compliment, suggestion or complaint without being
              disadvantaged for speaking up in good faith. We handle concerns
              respectfully and as confidentially as practicable, and take immediate
              action where safety, privacy or serious misconduct may be involved.
            </p>
          </div>
          <div className="feedback-actions">
            <a className="button" href="mailto:info@healthplusint.com.au?subject=Feedback%20or%20Complaint">
              Send feedback or a complaint <Arrow />
            </a>
            <p>
              Tell us what happened, when it happened, who was involved if known, how
              it affected you and the outcome you are seeking. Using HPI&apos;s process
              does not prevent you from seeking independent advice or contacting an
              appropriate regulator or authority.
            </p>
          </div>
        </div>

        <div className="charter-partner-note">
          <strong>Community-connected delivery</strong>
          <p>
            Where a programme includes community engagement or settlement connection,
            HPI may work with the{" "}
            <a href="https://www.mccsc.org.au" target="_blank" rel="noopener noreferrer">
              Multicultural Communities Support Centre (MCCSC)
            </a>{" "}
            under a written arrangement. MCCSC does not make HPI&apos;s employer,
            credential, deployment or clinical-workforce decisions.
          </p>
        </div>
        <a className="text-link charter-page-link" href="/service-charter">Read the full HPI Service Charter <Arrow /></a>
      </section>

      <section className="pathways">
        <article id="request">
          <p className="eyebrow">For facilities & services</p>
          <h2>Need qualified workers?</h2>
          <p>Tell us the role, setting, location, urgency and likely duration. We aim to acknowledge complete requests the same business day and complete initial triage within one business day.</p>
          <a className="button button-ivory" href="#employer-request">Submit a Workforce Request <Arrow /></a>
        </article>
        <article id="join">
          <p className="eyebrow light">For healthcare workers</p>
          <h2>Looking for your next opportunity?</h2>
          <p>Register for healthcare, aged-care, disability and community-service opportunities across Sydney, regional NSW and selected remote locations—subject to verified vacancies and role requirements.</p>
          <a className="button button-gold" href="#worker-application">Apply & Upload Résumé <Arrow /></a>
        </article>
      </section>

      <section className="trial-engagement section">
        <div>
          <p className="eyebrow light">A practical first step</p>
          <h2>Start with one role.<br /><em>Prove the pathway.</em></h2>
        </div>
        <div className="trial-copy">
          <p>
            Begin with one vacancy, one workforce stream or one facility. HPI will
            clarify the role, required checks, sourcing approach, readiness controls,
            mobilisation responsibilities and the measures used to review the engagement.
          </p>
          <a className="button button-gold" href="#employer-request">Discuss a trial engagement <Arrow /></a>
        </div>
      </section>

      <section className="employer-request section" id="employer-request">
        <div className="application-intro employer-intro">
          <p className="eyebrow">Employer workforce request</p>
          <h2>Tell us what your<br /><em>service needs.</em></h2>
          <p>
            Submit a practical workforce brief for healthcare, aged care,
            disability, community or regional service needs. HPI will review the
            requirement and contact you to clarify scope, compliance and timing.
          </p>
          <ul>
            <li><span>01</span>Same-business-day acknowledgement target</li>
            <li><span>02</span>Initial triage within one business day</li>
            <li><span>03</span>Compliance-led workforce planning</li>
          </ul>
        </div>
        <EmployerRequestForm />
      </section>

      <section className="worker-application section" id="worker-application">
        <div className="application-intro">
          <p className="eyebrow light">Healthcare professional express registration</p>
          <h2>Two short steps.<br /><em>Detailed checks later.</em></h2>
          <p>
            Register on mobile or desktop with your contact details, role, preferred
            region and résumé. Detailed compliance documents are requested only after
            an initial pathway review—never through this public form.
          </p>
          <ul>
            <li><span>01</span>Contact, profession, location and registration or qualification status</li>
            <li><span>02</span>Availability, optional résumé and consent</li>
          </ul>
        </div>
        <WorkerApplicationForm />
      </section>

      <section className="standards section" id="compliance">
        <div className="standards-heading">
          <p className="eyebrow">Compliance assurance</p>
          <h2>Controls employers can understand—and evidence.</h2>
          <p>
            HPI does more than collect documents. We compare evidence with the actual
            role, keep outstanding requirements visible and record the readiness position
            before a person progresses.
          </p>
        </div>
        <div className="assurance-grid">
          {assuranceControls.map((control, index) => (
            <article key={control.title}>
              <span>0{index + 1}</span>
              <h3>{control.title}</h3>
              <p>{control.text}</p>
              <ul>{control.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="compliance-scope">
          <strong>Checks coordinated according to the role</strong>
          <p>Ahpra registration · qualifications · work rights · NDIS Worker Screening · aged-care screening · National Police Check · WWCC · vaccination or training evidence where required.</p>
          <small>HPI develops and coordinates the workforce pathway. The employing or host organisation remains the Employer of Record and retains final selection, clinical governance, supervision, induction and site-specific scope decisions.</small>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-brand">
          <a className="brand inverse" href="#top">
            <img src="/assets/healthplus-mark.png" alt="" width="180" height="190" loading="lazy" />
            <span><strong>Health Plus International</strong><small>People · Care · Compliance</small></span>
          </a>
          <p>Building qualification-aligned healthcare workforce pipelines through readiness, role-based development and retention support.</p>
        </div>
        <div>
          <p className="footer-label">Contact</p>
          <a href="tel:+61411459755">+61 411 459 755</a>
          <a href="mailto:info@healthplusint.com.au">info@healthplusint.com.au</a>
          <address>Carlingford NSW</address>
        </div>
        <div>
          <p className="footer-label">Navigate</p>
          <a href="/engage">Solutions</a><a href="/framework">Framework</a>
          <a href="/cpd">Staff CPD &amp; Capability</a>
          <a href="#partnership">Partnership</a><a href="/service-charter">Service Charter</a>
          <a href="/faq">Frequently Asked Questions</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="#request">Request Workforce</a>
          <a
            className="staff-login"
            href="https://documents.healthplusint.com.au"
            target="_blank"
            rel="noreferrer"
          >
            Documents <Arrow />
          </a>
          <a
            className="staff-login"
            href="https://crm.healthplusint.com.au/crm"
            target="_blank"
            rel="noreferrer"
          >
            Staff CRM Login <Arrow />
          </a>
        </div>
        <div className="country-acknowledgement">
          <p className="footer-label">Acknowledgement of Country</p>
          <p>
            Health Plus International acknowledges the Dharug people as the
            Traditional Custodians of the land on which our Carlingford office
            stands. We also acknowledge the Traditional Custodians of all the
            Countries where we work, and recognise their continuing connection
            to land, waters and community. We pay our respects to Elders past
            and present, and extend that respect to all Aboriginal and Torres
            Strait Islander peoples.
          </p>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Health Plus International Pty Ltd · ABN 13 155 901 723</span>
          <span><a href="/privacy">Privacy Policy</a> · Sydney &amp; Regional NSW · Australia</span>
        </div>
      </footer>

      <aside className="floating-contact" aria-label="Quick contact">
        <a
          className="contact-pill contact-email"
          href="mailto:info@healthplusint.com.au?subject=Website%20Enquiry"
          aria-label="Email Health Plus International"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 5.5h18v13H3z" />
            <path d="m4 7 8 6 8-6" />
          </svg>
          <span>Email us</span>
        </a>
        <a
          className="contact-pill contact-whatsapp"
          href="https://wa.me/61411459755?text=Hello%20Health%20Plus%20International%2C%20I%20have%20an%20enquiry."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message Health Plus International on WhatsApp"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.2-4.3a8.5 8.5 0 1 1 15.8-4.4Z" />
            <path d="M8.2 7.7c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.7 1.7c.1.3 0 .5-.2.7l-.6.7c-.2.2-.1.4 0 .6.7 1.2 1.7 2.1 2.9 2.7.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.8.8c.3.1.4.3.4.5 0 .3-.2 1.5-1.1 2.1-.6.5-1.5.8-2.4.6-1.2-.2-2.8-.8-4.7-2.5-1.5-1.4-2.6-3.1-2.9-4.3-.3-1.1.1-1.8.5-2.3Z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </aside>
    </main>
  );
}
