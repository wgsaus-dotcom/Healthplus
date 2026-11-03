import PageSeo from "../PageSeo";
import { pageMetadata } from "../seo-pages";
import "./difference.css";

export const metadata = pageMetadata("/why-hpi");

const strengths = [
  {number:"01",title:"We start with the workforce challenge",copy:"We take time to understand the role, care setting, location, roster requirements and the workforce problem an employer is trying to solve."},
  {number:"02",title:"We focus on readiness, not just availability",copy:"We coordinate role-specific registration and credential checks, relevant screening and the information needed to assess whether a worker is suitable for a defined position."},
  {number:"03",title:"We plan a considered commencement",copy:"We work with employers to clarify role expectations, required induction, practical arrangements and communication before a worker begins."},
  {number:"04",title:"We support people beyond placement",copy:"We aim to maintain contact through the early engagement, address feedback promptly and support professional development and retention where agreed."},
  {number:"05",title:"We understand regional workforce realities",copy:"We consider regional access, continuity, travel and settlement considerations when planning viable workforce solutions across NSW."},
  {number:"06",title:"We make responsibilities visible",copy:"We document the agreed division of responsibilities, including employment administration, site-specific induction, supervision, work health and safety and clinical governance."},
] as const;

const comparisons = [
  ["Starting point","A request for available staff","A discussion about workforce needs, service context and continuity"],
  ["Candidate assessment","Matching availability and basic requirements","Role-specific credential evidence, readiness and suitability coordination"],
  ["Commencement","Filling an immediate shift or vacancy","Planned commencement, agreed expectations and induction coordination"],
  ["After commencement","Support varies by agency and arrangement","Early follow-up, feedback and workforce-development support where agreed"],
  ["Longer-term focus","Often centred on filling demand","Building workforce readiness, stability and retention"],
] as const;

export default function WhyHPIPage() {
  return <main className="difference-page"><PageSeo path="/why-hpi" />
    <header className="difference-hero">
      <div className="difference-hero-copy">
        <p className="difference-eyebrow">THE HEALTH PLUS INTERNATIONAL APPROACH</p>
        <h1>We are the bridge.<span>More than labour hire. Workforce development that looks further.</span></h1>
        <p>Connecting healthcare organisations with people, professional readiness and sustainable career pathways — because filling a vacancy is only the beginning.</p>
        <div className="difference-actions">
          <a className="hpi-action" href="/employers#request">Discuss Your Workforce Needs</a>
          <a className="difference-secondary" href="#our-approach">Explore Our Approach</a>
        </div>
      </div>
      <img src="/assets/hpi-happy-healthcare-team.webp" alt="Healthcare colleagues working together in a supportive environment" width="1536" height="1024" loading="lazy" />
    </header>

    <section className="difference-intro" aria-labelledby="difference-intro-heading">
      <p className="difference-eyebrow">PEOPLE · CARE · COMPLIANCE</p>
      <h2 id="difference-intro-heading">A different starting point</h2>
      <p>Conventional agency staffing can play an important role when healthcare services need additional workers. HPI's workforce-development approach extends beyond sourcing staff. We seek to understand the service, coordinate the right checks and prepare for a supported commencement and ongoing engagement.</p>
      <p>Established following consultation with <a href="https://birostrategy.com.au/" target="_blank" rel="noopener noreferrer" className="inner-link">BIRO Strategy</a>, HPI was shaped around workforce development as a bridge between employer needs and sustainable healthcare careers. Our aim is not simply to fill a position: it is to help build a dependable workforce relationship with clear expectations on both sides.</p>
    </section>

    <section className="difference-section" id="our-approach" aria-labelledby="difference-approach-heading">
      <div className="difference-section-heading">
        <p className="difference-eyebrow">HOW WE WORK</p>
        <h2 id="difference-approach-heading">Six ways HPI brings added value</h2>
      </div>
      <div className="difference-strengths">
        {strengths.map(item=><article key={item.number}>
          <span aria-hidden="true">{item.number}</span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </article>)}
      </div>
    </section>

    <section className="difference-section difference-compare" aria-labelledby="difference-compare-heading">
      <div className="difference-section-heading">
        <p className="difference-eyebrow">A PRACTICAL COMPARISON</p>
        <h2 id="difference-compare-heading">What makes our approach different?</h2>
        <p>These are broad service-model comparisons, not claims that every labour hire provider operates in the same way.</p>
      </div>
      <div className="difference-table-wrap">
        <table>
          <thead><tr><th scope="col">Consideration</th><th scope="col">Conventional short-term staffing focus</th><th scope="col">HPI workforce-development focus</th></tr></thead>
          <tbody>{comparisons.map(([topic,traditional,hpi])=><tr key={topic}><th scope="row">{topic}</th><td>{traditional}</td><td>{hpi}</td></tr>)}</tbody>
        </table>
      </div>
    </section>

    <section className="difference-section difference-journey" aria-labelledby="difference-journey-heading">
      <div className="difference-section-heading">
        <p className="difference-eyebrow">FROM NEED TO CONTINUITY</p>
        <h2 id="difference-journey-heading">The HPI workforce journey</h2>
      </div>
      <ol>
        <li><strong>Understand</strong><span>Define the role and service requirements</span></li>
        <li><strong>Attract</strong><span>Identify suitable Healthcare Workers</span></li>
        <li><strong>Verify</strong><span>Coordinate registration, screening and role-specific evidence</span></li>
        <li><strong>Prepare</strong><span>Clarify expectations and commencement requirements</span></li>
        <li><strong>Support</strong><span>Maintain agreed communication and early follow-up</span></li>
        <li><strong>Develop</strong><span>Encourage capability, continuity and retention</span></li>
      </ol>
    </section>

    <section className="difference-responsibility" aria-labelledby="difference-responsibility-heading">
      <h2 id="difference-responsibility-heading">Clear accountability matters</h2>
      <p>Where HPI employs workers who undertake work for a host facility, the arrangement may be legally treated as labour hire regardless of how the service is described. We do not claim exemption from applicable employment, industrial, work health and safety or labour hire requirements.</p>
      <p>Healthcare facilities retain responsibility for their clinical governance, day-to-day clinical direction, site-specific induction and supervision. HPI and the host also address their respective and shared duties, including work health and safety, as required by law and their engagement arrangements.</p>
      <p>For further information see <a href="https://www.safework.nsw.gov.au/advice-and-resources/labour-hire" target="_blank" rel="noopener noreferrer">SafeWork NSW's labour hire guidance</a>.</p>
    </section>

    <section className="difference-contact" aria-labelledby="difference-contact-heading">
      <p className="difference-eyebrow">LET'S TALK WORKFORCE DEVELOPMENT</p>
      <h2 id="difference-contact-heading">Looking for more than a staffing transaction?</h2>
      <p>Tell us what your healthcare service needs. We will discuss a practical, compliance-led workforce approach suited to your requirements.</p>
      <div className="difference-actions"><a className="hpi-action" href="/employers#request">Request a Workforce Discussion</a><a className="difference-secondary" href="mailto:info@healthplusint.com.au?subject=Workforce%20Development%20Enquiry">Email HPI</a></div>
    </section>
  </main>;
}
