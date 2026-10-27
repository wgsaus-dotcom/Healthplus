import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbSchema, pageMetadata } from "../../seo-data";
import { Breadcrumbs, JsonLd } from "../../SeoShell";

const capabilityPages = {
  "employer-role-requirements": {
    number: "01",
    title: "Employer and role requirements",
    metadataTitle: "Employer Role Requirements | Health Plus International",
    intro: "A successful workforce pathway starts with a precise understanding of the service, the role and the environment in which a healthcare professional will work.",
    outcome: "A controlled workforce brief that gives HPI, the employer and prospective candidates one clear, evidence-based understanding of the requirement.",
    sections: [
      ["Understanding the service setting", "We clarify the facility type, care environment, location, operating model, workforce pressures and the people or communities being supported.", ["Facility, service and authorised contact details", "Regional, remote, community or site-specific context", "Current vacancy pressure, workforce gap and operational priority", "Workplace access, accommodation, transport or roster constraints"]],
      ["Defining the role", "The role is translated into a practical workforce brief before attraction or referral activity begins.", ["Position title, classification, employment type and duration", "Scope of practice, core duties and reporting relationships", "Roster, start-date, availability and location requirements", "Mandatory experience, qualifications and setting-specific capability"]],
      ["Confirming mandatory requirements", "HPI records the evidence and controls required for the role while keeping employer and facility decisions with the authorised organisation.", ["Registration, work-right and identity requirements", "Screening, vaccination, training and licence requirements", "Facility induction, policy and safeguarding expectations", "Interview, selection and final approval responsibilities"]],
    ],
  },
  "readiness-credential-controls": {
    number: "02",
    title: "Readiness and credential controls",
    metadataTitle: "Readiness & Credential Controls | Health Plus International",
    intro: "Matching is only one part of workforce delivery. HPI uses role-specific readiness and credential controls before a candidate is presented or mobilised.",
    outcome: "A traceable readiness decision supported by current evidence, documented verification and clear responsibility for any outstanding requirement.",
    sections: [
      ["Candidate evidence", "We gather the information needed to understand identity, professional standing, work eligibility and role suitability.", ["Identity, contact details and right-to-work evidence", "Qualifications, employment history and professional references", "Ahpra registration where applicable", "Role-specific screening, licences and training evidence"]],
      ["Verification and currency", "Evidence is checked against the source or authorised verification process and recorded in HPI CRM v2.14.", ["Verification source, date, result and reviewer recorded", "Document expiry and renewal dates controlled", "Discrepancies, limitations and conditions escalated", "Consent obtained before relevant third-party checks or sharing"]],
      ["Readiness decision", "Candidates progress only when mandatory controls are satisfied or an authorised, documented decision addresses an outstanding matter.", ["Role-to-candidate requirement comparison", "Risk, restriction and reasonable-adjustment consideration", "Completion status and outstanding-action ownership", "Compliance approval before presentation or deployment"]],
    ],
  },
  "deployment-workforce-support": {
    number: "03",
    title: "Deployment and workforce support",
    metadataTitle: "Deployment & Workforce Support | Health Plus International",
    intro: "HPI coordinates the transition from selection to commencement and supports the early placement period so avoidable mobilisation and retention risks are identified promptly.",
    outcome: "A coordinated commencement with visible responsibilities, documented checks and a structured early-support pathway for the employer and healthcare professional.",
    sections: [
      ["Mobilisation planning", "Once selection is confirmed, HPI establishes the practical steps, owners and dates required for commencement.", ["Placement, role, roster and commencement confirmation", "Travel, accommodation and regional logistics where agreed", "Outstanding evidence and pre-start action tracking", "Named contacts and escalation pathways"]],
      ["Facility commencement", "The facility remains responsible for workplace and clinical induction within its authority; HPI coordinates and records agreed completion evidence.", ["Facility induction and local orientation", "Scope, supervision and reporting-line confirmation", "Policies, systems, safety and emergency information", "First-shift or commencement confirmation"]],
      ["Early-placement support", "Structured contact helps surface concerns before they become preventable placement failures.", ["Agreed employer and worker check-ins", "Role, roster, wellbeing and settlement feedback", "Issue triage and accountable escalation", "Support or referral coordination within HPI’s agreed scope"]],
    ],
  },
  "performance-retention-reporting": {
    number: "04",
    title: "Performance and retention reporting",
    metadataTitle: "Performance & Retention | Health Plus International",
    intro: "HPI measures the pathway from workforce request to sustained placement using agreed definitions, controlled records and evidence that can be explained.",
    outcome: "Clear reporting that helps employers understand delivery performance, candidate experience, retention risk and opportunities for workforce improvement.",
    sections: [
      ["Agreed measures", "Measures are selected to suit the engagement and defined before performance claims are made.", ["Time to acknowledgement, initial response and shortlist", "Credential and readiness completion", "Candidate presentation, selection and deployment conversion", "30-, 60- and 90-day retention where applicable"]],
      ["Placement experience", "Reporting considers both employer and healthcare-professional experience, not only whether a role was filled.", ["Employer feedback and service satisfaction", "Healthcare-professional experience and support themes", "Performance, probation and follow-up outcomes", "Issues, complaints, incidents and improvement actions"]],
      ["Improvement and governance", "HPI uses controlled information to identify trends and strengthen future workforce pathways.", ["Exception, delay and attrition analysis", "Corrective and continuous-improvement actions", "Reporting frequency and authorised recipients", "Privacy-conscious, evidence-based reporting from HPI CRM v2.14"]],
    ],
  },
} as const;

type CapabilitySlug = keyof typeof capabilityPages;
function Arrow() { return <span aria-hidden="true">↗</span>; }

export function generateStaticParams() {
  return Object.keys(capabilityPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = capabilityPages[slug as CapabilitySlug];
  if (!page) return {};
  return pageMetadata(page.metadataTitle, page.intro, `/partnership/${slug}`);
}

export default async function CapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = capabilityPages[slug as CapabilitySlug];
  if (!page) notFound();
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Partnership", path: "/#partnership" },
    { name: page.title, path: `/partnership/${slug}` },
  ]);

  return (
    <main className="capability-page">
      <JsonLd data={breadcrumb} />
      <header className="site-header capability-header">
        <Link className="brand" href="/"><img src="/assets/healthplus-mark.png" alt="" width="180" height="190" /><span><strong>Health Plus International</strong><small>People · Care · Compliance</small></span></Link>
        <nav className="capability-nav"><Link href="/#partnership">Partnership</Link><Link href="/framework">Framework</Link><Link className="button button-small" href="/#request">Request Workforce <Arrow /></Link></nav>
      </header>
      <section className="capability-hero">
        <div><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Partnership", href: "/#partnership" }, { label: page.title }]} /><p className="eyebrow">HPI workforce accountability · {page.number}</p><h1>{page.title}</h1><p>{page.intro}</p><Link className="text-link" href="/#partnership">← Back to HPI–MCCSC partnership</Link></div>
        <aside><span>Our understanding</span><p>HPI is accountable for healthcare workforce, employer, compliance and contractual decisions within its agreed scope. Community-partner involvement does not transfer these responsibilities.</p></aside>
      </section>
      <section className="capability-body">
        <div className="capability-intro"><p className="eyebrow">How HPI approaches this</p><h2>Defined, controlled and <em>evidence-led.</em></h2></div>
        <div className="capability-sections">
          {page.sections.map(([title, text, items], index) => <article key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{text}</p><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></div></article>)}
        </div>
      </section>
      <section className="capability-outcome"><p className="eyebrow light">Intended outcome</p><h2>{page.outcome}</h2><div className="button-row"><Link className="button button-gold" href="/#request">Submit a workforce request <Arrow /></Link><Link className="button capability-outline" href="/#partnership">View the partnership <Arrow /></Link></div></section>
      <footer className="capability-footer"><Link className="brand inverse" href="/"><img src="/assets/healthplus-mark.png" alt="" width="180" height="190" loading="lazy" /><span><strong>Health Plus International</strong><small>People · Care · Compliance</small></span></Link><p>© 2026 Health Plus International Pty Ltd · ABN 13 155 901 723</p><a href="mailto:info@healthplusint.com.au">info@healthplusint.com.au</a></footer>
    </main>
  );
}
