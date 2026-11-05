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
  ["The question we address","Who can cover this shift or vacancy?","What people, preparation and support will help this service build a dependable workforce?"],
  ["Before recruitment","Confirm the assignment, hours and required skills","Understand the care setting, role scope, roster, location and continuity needs before matching people"],
  ["Readiness","Meet the requirements of the assignment","Coordinate role-specific checks and identify preparation or development needs before commencement"],
  ["Starting work","Confirm the booking and start arrangements","Agree expectations, induction responsibilities, communication and practical regional arrangements"],
  ["During the engagement","Manage the staffing assignment","Follow up early, address feedback and coordinate agreed workforce and development support"],
  ["Longer-term purpose","Provide staff for a defined period","Support professional growth, workforce continuity and retention alongside the placement"],
] as const;

export default function WhyHPIPage() {
  return <main className="difference-page"><PageSeo path="/why-hpi" />
    <header className="difference-hero">
      <div className="difference-hero-copy">
        <p className="difference-eyebrow">THE HEALTHPLUS INTERNATIONAL APPROACH</p>
        <h1>We are the bridge.<span>From filling roles to developing a workforce.</span></h1>
        <p>We recruit, employ and place Healthcare Workers. Our workforce development approach connects that placement with role readiness, planned onboarding, professional growth and ongoing support.</p>
        <div className="difference-actions">
          <a className="hpi-action" href="/employers#request">Discuss Your Workforce Needs</a>
          <a className="difference-secondary" href="#our-approach">Explore Our Approach</a>
        </div>
      </div>
      <img src="/assets/hpi-happy-healthcare-team.webp" alt="Healthcare colleagues working together in a supportive environment" width="1536" height="1024" loading="lazy" />
    </header>

    <section className="difference-intro" aria-labelledby="difference-intro-heading">
      <p className="difference-eyebrow">PEOPLE · CARE · COMPLIANCE</p>
      <h2 id="difference-intro-heading">What is the difference between staffing and workforce development?</h2>
      <p>Staffing meets a need for people to perform a role. Workforce development also considers what helps those people become ready, settle into the workplace, develop their capability and stay. HPI brings these activities together around the needs of a healthcare service and the people working within it.</p>
      <p>Established following consultation with <a href="https://immi.homeaffairs.gov.au/visas/employing-and-sponsoring-someone/business-industry-and-regional-outreach" target="_blank" rel="noopener noreferrer" className="inner-link">the Department of Home Affairs’ Business, Industry and Regional Outreach (BIRO) team</a>, HPI was shaped around workforce development as a bridge between employer needs and sustainable healthcare careers. Our aim is not simply to fill a position: it is to help build a dependable workforce relationship with clear expectations on both sides.</p>
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

    <section className="difference-section difference-outcomes" aria-labelledby="difference-outcomes-heading">
      <div className="difference-section-heading"><p className="difference-eyebrow">WHAT THIS MEANS FOR YOU</p><h2 id="difference-outcomes-heading">Practical support on both sides of the placement</h2></div>
      <div className="difference-audiences">
        <article><h3>For healthcare employers</h3><ul>
          <li><strong>A role understood in context:</strong> duties, care setting, required experience, roster, location and supervision arrangements.</li>
          <li><strong>Role-specific readiness:</strong> registration where required, qualifications, work rights, relevant screening and suitability checks.</li>
          <li><strong>A coordinated start:</strong> clear commencement arrangements and an agreed division of induction and workplace responsibilities.</li>
          <li><strong>A contact beyond the booking:</strong> early follow-up and a route for raising feedback or changing workforce requirements.</li>
        </ul><a className="difference-secondary" href="/employers#request">Discuss your service’s workforce needs</a></article>
        <article><h3>For Healthcare Workers</h3><ul>
          <li><strong>A pathway based on your goals:</strong> your experience, preferred location, availability and readiness guide the conversation.</li>
          <li><strong>Clear preparation:</strong> guidance on the evidence and checks needed for a suitable role, followed by commencement planning.</li>
          <li><strong>CPD and support to develop:</strong> guidance on continuing professional development and funding for selected, pre-approved role-relevant courses, with the course and budget agreed before enrolment.</li>
          <li><strong>Support to settle in:</strong> early placement follow-up and discussion of practical regional arrangements before you commit.</li>
        </ul><a className="difference-secondary" href="/work-with-us">Explore working with Healthplus</a></article>
      </div><p className="difference-scope">The service scope, support arrangements and responsibilities are agreed for each engagement. Development funding is subject to prior approval.</p>
    </section>

    <section className="difference-section difference-example" aria-labelledby="difference-example-heading">
      <div className="difference-section-heading"><p className="difference-eyebrow">AN ILLUSTRATIVE EXAMPLE</p><h2 id="difference-example-heading">A regional facility needs Registered Nurses</h2><p>The immediate need is to fill roles. The wider challenge may include continuity, suitable experience, regional relocation and helping new staff settle in.</p><p>HPI starts with the facility’s role and roster requirements, assesses candidate readiness and coordinates the agreed commencement arrangements. Before the start, the facility and worker clarify induction, supervision and any travel or accommodation arrangements. After commencement, early follow-up provides an opportunity to address feedback and discuss agreed development needs.</p><p><strong>That is the added value:</strong> connecting recruitment and placement with the preparation and support needed for a workable employment relationship.</p><a className="difference-secondary" href="/regional-nsw-healthcare-workforce">Explore our regional NSW workforce pathway</a></div>
    </section>

    <section className="difference-section difference-compare" aria-labelledby="difference-compare-heading">
      <div className="difference-section-heading">
        <p className="difference-eyebrow">A PRACTICAL COMPARISON</p>
        <h2 id="difference-compare-heading">What makes our approach different?</h2>
        <p>Staffing providers can also offer development and retention services. This comparison explains the scope HPI brings to an engagement; it does not suggest that compliance or worker support is unique to us.</p>
      </div>
      <div className="difference-table-wrap">
        <table>
          <thead><tr><th scope="col">Consideration</th><th scope="col">Staffing assignment focus</th><th scope="col">HPI workforce-development focus</th></tr></thead>
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
