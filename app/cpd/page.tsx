import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "../seo-data";
import { Breadcrumbs, JsonLd } from "../SeoShell";

export const metadata: Metadata = {
  title: { absolute: "Staff CPD & Capability | Health Plus International" },
  description:
    "Structured continuing professional development and role-based capability for HPI staff and approved healthcare workforce cohorts, including regional transition support.",
  alternates: { canonical: "/cpd" },
  openGraph: {
    title: "Staff CPD & Capability | Health Plus International",
    description:
      "Role-relevant learning, controlled evidence and practical capability development for HPI staff and approved participating workforce cohorts.",
    url: "/cpd",
  },
  twitter: {
    card: "summary_large_image",
    title: "Staff CPD & Capability | Health Plus International",
    description:
      "Role-relevant learning, controlled evidence and practical capability development for HPI staff and approved participating workforce cohorts.",
    images: ["/assets/hero-nurse.jpg"],
  },
};

const audiences = [
  {
    number: "01",
    title: "HPI staff",
    text: "Annual learning plans combine assigned organisational learning with role-relevant professional development and review.",
  },
  {
    number: "02",
    title: "Workforce cohorts",
    text: "Approved healthcare, aged-care, disability and community pathways receive learning matched to the authorised programme, role and actual service setting.",
  },
  {
    number: "03",
    title: "Client and partner teams",
    text: "HPI may provide a defined CPD service for another organisation when the audience, responsibilities, evidence and outcomes are agreed in writing.",
  },
];

const deliveryModel = [
  {
    title: "Analyse and plan",
    text: "Learning begins with evidence about the role, people, service and risk—not with a catalogue of available courses.",
    items: [
      "Annual organisational and role-based training needs analysis",
      "Individual or approved cohort learning plans",
      "Objectives linked to standards, incidents, audits, feedback and capability gaps",
      "Clear ownership, timing, support and review points",
    ],
  },
  {
    title: "Approve and assign",
    text: "Activities are selected only when their content, educator and evidence are suitable for the intended audience and purpose.",
    items: [
      "Provider identity, qualifications and authority checked where relevant",
      "Content currency, evidence base and conflicts considered",
      "Accessibility, privacy, safety and assessment arrangements reviewed",
      "Mandatory learning assigned by role, requirement source and risk",
    ],
  },
  {
    title: "Learn with support",
    text: "Delivery can combine online, facilitated, reflective and practical learning, with support proportionate to the participant and task.",
    items: [
      "Structured modules, workshops, case review and simulation",
      "Professional supervision, peer learning and reflective practice",
      "Reasonable adjustments and accessible delivery options",
      "Paid work time for HPI-directed mandatory employee training",
    ],
  },
  {
    title: "Record and evidence",
    text: "HPI distinguishes attendance from learning, skill demonstration, contextual competence and authority to perform work.",
    items: [
      "Participant, activity, provider, date and active learning time recorded",
      "Completion, assessment, reflection and follow-up evidence retained",
      "Practical assessment used where the role and risk require it",
      "Certificates treated as evidence of completion—not automatic competence",
    ],
  },
  {
    title: "Apply and improve",
    text: "The learning cycle continues after completion so HPI can understand application, overdue risk and where the programme needs to improve.",
    items: [
      "Application reviewed through supervision, observation, audit or discussion",
      "Safety-critical overdue requirements can restrict readiness for affected duties",
      "Remediation and reassessment recorded where a standard is not met",
      "Completion, access, application and programme quality reviewed over time",
    ],
  },
];

const learningStreams = [
  ["01", "Governance", "Conduct, privacy, information security, records, conflicts, complaints and speak-up."],
  ["02", "Safety & wellbeing", "Work health and safety, emergencies, infection prevention, manual tasks and psychosocial safety."],
  ["03", "Care & safeguarding", "Rights-based care, cultural safety, consent, safeguarding, incidents and service-specific duties."],
  ["04", "Role capability", "Role, clinical or support capability, documentation, escalation and scope-relevant practice."],
  ["05", "Leadership", "Supervision, feedback, procedural fairness, quality improvement and workforce leadership."],
  ["06", "Career pathways", "Professional growth, communication, regional readiness and capability for future responsibilities."],
];

const transitionSupport = [
  {
    title: "Australian health-system orientation",
    text: "Orientation can cover documentation expectations, escalation culture, professional boundaries and Ahpra registration-pathway awareness without performing a regulator or assessing-authority function.",
  },
  {
    title: "Communication and clinical handover",
    text: "Role-appropriate English-language, documentation and handover practice can be built into a learning plan, with reasonable adjustment and additional supported practice where needed.",
  },
  {
    title: "Regional and cultural readiness",
    text: "Learning can address the specific regional or remote community, local Aboriginal and Torres Strait Islander cultural context, and practical expectations of the service setting.",
  },
  {
    title: "Community and settlement connection",
    text: "Where agreed, MCCSC may support local settlement onboarding, cultural orientation, community and services navigation, and retention mentoring for regional participants. It does not perform credentialling, candidate selection, clinical governance or CPD-assessment functions.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function CpdPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Staff CPD and Capability", path: "/cpd" },
  ]);

  return (
    <main className="capability-page cpd-page">
      <JsonLd data={breadcrumb} />
      <header className="site-header capability-header">
        <Link className="brand" href="/" aria-label="Health Plus International home">
          <img src="/assets/healthplus-mark.png" alt="" width="180" height="190" />
          <span>
            <strong>Health Plus International</strong>
            <small>People · Care · Compliance</small>
          </span>
        </Link>
        <nav className="capability-nav" aria-label="CPD page navigation">
          <Link href="/">Home</Link>
          <Link href="/#framework">Framework</Link>
          <Link href="/#contact">Contact</Link>
          <a
            className="button button-small"
            href="mailto:info@healthplusint.com.au?subject=CPD%20and%20Workforce%20Capability%20Enquiry"
          >
            Discuss CPD <Arrow />
          </a>
        </nav>
      </header>

      <section className="capability-hero cpd-hero">
        <div>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Staff CPD and Capability" }]} />
          <p className="eyebrow">Staff CPD &amp; workforce capability</p>
          <h1>Structured learning. Visible evidence. Safer application.</h1>
          <p>
            HPI provides and coordinates continuing professional development for its
            staff and approved participating workforce cohorts. The programme connects
            learning needs, role-relevant activity, evidence and practical follow-up.
          </p>
          <Link className="text-link" href="/#framework">← See where CPD sits in the HPI framework</Link>
        </div>
        <aside>
          <span>Important boundary</span>
          <p>
            CPD supports capability; it does not replace professional registration
            obligations, qualifications, employer or facility induction, authorised
            supervision, local scope decisions or a valid assessment of competence.
          </p>
        </aside>
      </section>

      <section className="capability-body cpd-body">
        <div className="capability-intro">
          <p className="eyebrow">Who the service supports</p>
          <h2>Development shaped around the <em>person and role.</em></h2>
        </div>
        <div className="cpd-audience-grid">
          {audiences.map((audience) => (
            <article key={audience.number}>
              <span>{audience.number}</span>
              <h3>{audience.title}</h3>
              <p>{audience.text}</p>
            </article>
          ))}
        </div>

        <div className="capability-intro cpd-model-intro">
          <p className="eyebrow">The HPI learning cycle</p>
          <h2>Plan, learn, evidence, apply and <em>improve.</em></h2>
        </div>
        <div className="capability-sections">
          {deliveryModel.map((stage, index) => (
            <article key={stage.title}>
              <span>0{index + 1}</span>
              <div>
                <h2>{stage.title}</h2>
                <p>{stage.text}</p>
                <ul>{stage.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cpd-streams">
        <div className="cpd-streams-heading">
          <p className="eyebrow light">Core learning streams</p>
          <h2>Relevant to the work.<br /><em>Proportionate to the risk.</em></h2>
          <p>
            The approved programme and role matrix determine what each person needs;
            every topic is not assigned to every participant.
          </p>
        </div>
        <div className="cpd-stream-grid">
          {learningStreams.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cpd-transition" id="international-workforce">
        <div className="cpd-transition-copy">
          <div>
            <p className="eyebrow">International and relocating workforce</p>
            <h2>Transition learning for regional and remote NSW.</h2>
          </div>
          <aside>
            <span>Defined boundary</span>
            <p>
              HPI provides orientation and learning support only. It does not provide
              migration advice, guarantee a visa or professional-registration outcome,
              or perform a function reserved to Ahpra, a National Board or an assessing
              authority.
            </p>
            <p>
              HPI does not currently deliver NDIS supports. NDIS-specific learning
              applies only when an authorised signed service scope requires it.
            </p>
          </aside>
        </div>
        <div className="cpd-transition-grid">
          {transitionSupport.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cpd-governance">
        <div>
          <p className="eyebrow">Governed CPD</p>
          <h2>A controlled system—not a collection of certificates.</h2>
        </div>
        <div className="cpd-governance-grid">
          <article>
            <span>What HPI controls</span>
            <ul>
              <li>Learning plans, role assignments and approved providers</li>
              <li>Access, participation, evidence and overdue follow-up</li>
              <li>Assessment or competency checks where expressly included</li>
              <li>Service-scope applicability, programme review, privacy and public claims</li>
            </ul>
          </article>
          <article>
            <span>What remains with others</span>
            <ul>
              <li>Each practitioner&apos;s professional Board obligations</li>
              <li>Employer and facility induction, supervision and local policies</li>
              <li>Scope authorisation and site-specific competency decisions</li>
              <li>Formal credit or CPD points unless expressly verified</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="capability-outcome cpd-outcome">
        <p className="eyebrow light">Start a conversation</p>
        <h2>Build a CPD pathway that can be planned, evidenced and improved.</h2>
        <div className="button-row">
          <a
            className="button button-gold"
            href="mailto:info@healthplusint.com.au?subject=CPD%20and%20Workforce%20Capability%20Enquiry"
          >
            Discuss your CPD needs <Arrow />
          </a>
          <Link className="button capability-outline" href="/#contact">Contact HPI <Arrow /></Link>
        </div>
      </section>

      <footer className="capability-footer">
        <Link className="brand inverse" href="/">
          <img src="/assets/healthplus-mark.png" alt="" width="180" height="190" loading="lazy" />
          <span><strong>Health Plus International</strong><small>People · Care · Compliance</small></span>
        </Link>
        <p>© 2026 Health Plus International Pty Ltd · ABN 13 155 901 723</p>
        <Link href="/privacy">Privacy Policy</Link>
      </footer>
    </main>
  );
}
