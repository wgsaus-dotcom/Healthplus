import type { Metadata } from "next";

export const SITE_URL = "https://healthplusint.com.au";
export const UPDATED_DATE = "2026-10-01";

export type WorkforcePage = {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  eyebrow: string;
  lead: string;
  pathwayAnswer: string;
  pathwayDetail: string;
  settings: string[];
  readiness: string[];
  development: string[];
  employerInputs: string[];
  professionalAnswer: string;
};

export const workforcePages: WorkforcePage[] = [
  {
    slug: "registered-nurses",
    name: "Registered Nurses",
    shortName: "Registered nurses",
    title: "Registered Nurse Workforce NSW | Health Plus International",
    description:
      "Registered nurse workforce pathways for NSW services, with verified registration, role readiness, capability development and supported commencement.",
    eyebrow: "Registered nurse workforce pathways",
    lead:
      "HPI helps employers define registered nurse requirements, align sourcing to the required clinical stream and coordinate a controlled workforce development pathway from verified role brief to supported commencement.",
    pathwayAnswer:
      "HPI supports registered nurse workforce pathways through role definition, targeted attraction, credential-led readiness, employer selection support, role-based development and early-placement continuity. The employing or host facility retains clinical governance, professional supervision, site induction, local scope and final employment decisions.",
    pathwayDetail:
      "Registered nursing requirements vary by specialty, service setting, classification, recency of practice and level of responsibility. HPI therefore records the actual clinical context, experience requirements, roster, supervision, location and mandatory evidence before progressing a candidate.",
    settings: [
      "Hospital, subacute and multipurpose services",
      "Residential aged-care and transition-care settings",
      "Community, outreach and regional services",
      "Selected remote pathways with defined governance and support",
    ],
    readiness: [
      "Current Ahpra registration and any conditions relevant to the role",
      "Qualifications, identity, work rights and employment history",
      "Role-required screening, vaccination, training and reference evidence",
      "Specialty experience, recency of practice, scope and local requirements",
    ],
    development: [
      "Role-relevant CPD and identified capability planning",
      "Documentation, escalation, handover and scope-aware practice",
      "Safety, infection prevention and service-specific learning",
      "Reflective follow-up and practical application where included",
    ],
    employerInputs: [
      "Service, specialty, classification, scope and reporting line",
      "Roster, start date, duration, location and supervision arrangements",
      "Mandatory credentials, experience and facility requirements",
      "Selection process, induction ownership and authorised contacts",
    ],
    professionalAnswer:
      "Registered nurses can register interest in verified workforce pathways and provide a résumé first. HPI explains the evidence required for a specific role and seeks appropriate authority before sharing information. Registration with HPI does not guarantee a role, interview, placement or start date.",
  },
  {
    slug: "enrolled-nurses",
    name: "Enrolled Nurses",
    shortName: "Enrolled nurses",
    title: "Enrolled Nurse Workforce NSW | Health Plus International",
    description:
      "Enrolled nurse workforce pathways for NSW healthcare, aged-care, community, regional and remote services, with role-specific readiness and support.",
    eyebrow: "Enrolled nurse workforce pathways",
    lead:
      "HPI helps employers define enrolled nurse requirements, identify appropriately registered professionals and coordinate a controlled pathway from role brief to supported commencement. Every pathway is shaped around the actual service, scope, supervision and location rather than a generic job title.",
    pathwayAnswer:
      "HPI provides an end-to-end workforce pathway for enrolled nurse requirements: role definition, targeted attraction, evidence-led readiness, employer selection, mobilisation and early-placement support. The employer or facility retains its clinical governance, scope, supervision, induction and final appointment responsibilities.",
    pathwayDetail:
      "Enrolled nursing work varies across acute, subacute, residential aged-care, community and regional environments. HPI therefore records the practice context, reporting relationships, roster, location and mandatory evidence before candidate presentation. This gives employers and professionals a clearer basis for deciding whether an opportunity is suitable.",
    settings: [
      "Hospital, multipurpose and subacute services",
      "Residential aged-care and transition-care settings",
      "Community, outreach and regional services",
      "Remote pathways where role scope and support are verified",
    ],
    readiness: [
      "Current Ahpra registration and any recorded conditions relevant to the role",
      "Identity, work rights, qualifications and employment history",
      "Role-required screening, vaccination, training and reference evidence",
      "Experience, recency of practice, scope, supervision and local requirements",
    ],
    development: [
      "Role-relevant CPD and learning-needs planning",
      "Documentation, escalation and scope-aware practice",
      "Safety, infection prevention, safeguarding and service-specific learning",
      "Reflective follow-up and practical application where included",
    ],
    employerInputs: [
      "Service setting, classification, scope and reporting line",
      "Roster, start date, duration, location and supervision arrangements",
      "Mandatory credentials, experience and facility requirements",
      "Selection process, induction ownership and authorised contacts",
    ],
    professionalAnswer:
      "Enrolled nurses can register interest in verified opportunities and provide a résumé first. HPI then explains the evidence needed for a specific pathway, obtains appropriate permission before relevant information is shared and communicates honestly about progress. Registration does not guarantee a role, interview, placement or start date.",
  },
  {
    slug: "assistants-in-nursing",
    name: "Assistants in Nursing",
    shortName: "Assistants in nursing",
    title: "Assistants in Nursing NSW | Health Plus International",
    description:
      "Assistant in nursing workforce pathways for NSW health and aged-care services, supported by role definition, readiness checks, mobilisation and follow-up.",
    eyebrow: "Assistant in nursing workforce pathways",
    lead:
      "HPI supports assistant in nursing pathways by translating each employer’s care environment, duties and supervision model into a clear workforce brief. Candidates progress against that brief so training, experience, screening and practical readiness are considered in context.",
    pathwayAnswer:
      "HPI coordinates attraction, matching, evidence checks, mobilisation and early support for assistant in nursing requirements. The pathway is designed to help an employer see how a candidate’s training and experience align with the defined duties while preserving the facility’s responsibility for delegation, supervision, induction and final selection.",
    pathwayDetail:
      "An assistant in nursing role can differ significantly between a ward, residential service, community programme and regional facility. HPI does not assume that one title creates one scope. We clarify direct-care tasks, exclusions, reporting lines, resident or patient needs, roster conditions and the support available at the workplace.",
    settings: [
      "Hospital wards and multipurpose services",
      "Residential aged-care and respite settings",
      "Community and transitional-care programmes",
      "Regional services with defined supervision and duties",
    ],
    readiness: [
      "Relevant training, placement experience and recent employment history",
      "Identity, work rights and role-required screening evidence",
      "References and experience relevant to the defined care setting",
      "Understanding of delegation, escalation, documentation and role boundaries",
    ],
    development: [
      "Person-centred care, communication and documentation",
      "Infection prevention, manual tasks and workplace safety",
      "Recognising deterioration and using escalation pathways",
      "Role-based CPD and practical follow-up where agreed",
    ],
    employerInputs: [
      "Care environment, duties, exclusions and supervision model",
      "Roster pattern, location, duration and commencement requirements",
      "Required training, screening and setting-specific experience",
      "Facility induction, local competency and delegation arrangements",
    ],
    professionalAnswer:
      "Assistants in nursing can submit a résumé and describe their training, placements, care experience and preferred locations. HPI reviews that information against verified opportunities and requests further evidence only when relevant. Every employer makes its own selection decision, and local duties remain subject to facility authority and supervision.",
  },
  {
    slug: "aged-care-workers",
    name: "Aged Care Workers",
    shortName: "Aged-care workers",
    title: "Aged Care Workforce NSW | Health Plus International",
    description:
      "Aged-care workforce pathways for residential and community services in NSW, with screening, role readiness, capability development and placement support.",
    eyebrow: "Aged-care workforce development",
    lead:
      "HPI helps aged-care providers respond to immediate workforce pressure while keeping resident rights, safeguarding, screening, role readiness and sustainable support visible. Requirements are defined for the actual service model and the people receiving care.",
    pathwayAnswer:
      "HPI builds aged-care workforce pathways around the provider’s service, role profile and mandatory controls. Work can include attraction and matching, readiness review, employer selection, mobilisation, early support and agreed retention measures. The approved provider remains responsible for care governance, local induction, supervision and workplace decisions.",
    pathwayDetail:
      "Residential and community aged-care roles involve different environments, travel patterns, client needs and reporting arrangements. HPI records these distinctions before progressing candidates. We also make clear that training evidence or prior experience does not remove the need for provider-specific induction, policy understanding and authorised local practice.",
    settings: [
      "Residential aged-care and respite services",
      "Home-care and consumer-directed support programmes",
      "Transition, restorative and community-care settings",
      "Regional aged-care services with defined local support",
    ],
    readiness: [
      "Relevant qualifications, experience and employment references",
      "Identity, work rights and applicable aged-care screening controls",
      "Role-required police, vaccination, training and licence evidence",
      "Safeguarding, documentation, incident and escalation awareness",
    ],
    development: [
      "Rights-based, person-centred and culturally safe care",
      "Dementia-aware communication and behaviour support within role scope",
      "Safeguarding, incidents, infection prevention and workplace safety",
      "Reflective and practical learning connected to the service context",
    ],
    employerInputs: [
      "Service model, resident or client cohort and defined duties",
      "Roster, location, travel, duration and start requirements",
      "Mandatory qualification, screening and experience criteria",
      "Induction, supervision, escalation and local policy ownership",
    ],
    professionalAnswer:
      "Aged-care workers can register their experience, qualifications, availability and preferred work settings. HPI uses this information only for relevant workforce purposes and asks applicants not to upload unnecessary sensitive documents initially. Progress depends on a verified opportunity, role requirements, evidence, employer selection and agreed commencement arrangements.",
  },
  {
    slug: "support-workers",
    name: "Support Workers",
    shortName: "Support workers",
    title: "Support Worker Workforce NSW | Health Plus International",
    description:
      "Support worker pathways for disability, community and in-home services in NSW, with role-specific screening, readiness, matching and ongoing support.",
    eyebrow: "Support worker pathways",
    lead:
      "HPI develops support worker pathways for disability, community, in-home and programme-based services. The pathway begins with the person-centred outcomes, worker duties, environment, safeguards and practical logistics that define a suitable match.",
    pathwayAnswer:
      "HPI coordinates a controlled pathway from employer brief to supported commencement for defined support worker requirements. Matching considers capability, communication, availability, location and the service context—not only a list of certificates. The provider retains responsibility for service delivery, participant safeguards, delegation, supervision and final appointment.",
    pathwayDetail:
      "Support work may involve personal support, community access, household activity, transport or structured programmes. Each role must therefore identify what is included, what is excluded and what support is available. HPI records these boundaries and the relevant screening or licence requirements before presenting a candidate.",
    settings: [
      "In-home and community participation services",
      "Day programmes and community-service settings",
      "Disability support under an authorised provider model",
      "Regional services with verified travel and support arrangements",
    ],
    readiness: [
      "Identity, work rights, relevant training and employment history",
      "NDIS Worker Screening, WWCC or other checks where the role requires them",
      "Driver licence, travel and availability evidence where applicable",
      "Role boundaries, safeguarding, documentation and incident awareness",
    ],
    development: [
      "Rights, choice, control and person-centred communication",
      "Safeguarding, incidents, complaints and escalation",
      "Safe work, infection prevention and service-specific practices",
      "Role-relevant CPD, reflection and supported application",
    ],
    employerInputs: [
      "Participant or service context without unnecessary personal information",
      "Defined duties, exclusions, schedule, location and travel needs",
      "Screening, training, licence and experience requirements",
      "Supervision, induction, communication and escalation arrangements",
    ],
    professionalAnswer:
      "Support workers can register a résumé, work preferences, availability and relevant experience. HPI then considers suitable, verified pathways and explains the evidence required for a particular service. Applicants should not send identity, banking, police-check or unnecessary health information until it is requested through an approved process.",
  },
  {
    slug: "allied-health",
    name: "Allied Health Professionals",
    shortName: "Allied health",
    title: "Allied Health Workforce NSW | Health Plus International",
    description:
      "Selected allied health workforce pathways for NSW services, with discipline-specific registration, scope, readiness, mobilisation and support controls.",
    eyebrow: "Selected allied health pathways",
    lead:
      "HPI supports selected allied health pathways where an employer has a defined discipline, service model and scope. Current areas of interest include occupational therapy, physiotherapy, psychology, podiatry and dietetics, subject to verified opportunities and profession-specific requirements.",
    pathwayAnswer:
      "HPI can support selected allied health workforce requirements through role clarification, targeted attraction, discipline-specific evidence review, employer selection and mobilisation. The employing or host service retains clinical governance, professional supervision, local scope, induction and all decisions that require its authority.",
    pathwayDetail:
      "Allied health is not a single interchangeable workforce stream. Registration, qualification, supervision, caseload, service modality and documentation requirements vary by profession and setting. HPI therefore establishes the discipline, patient or client cohort, expected activities, reporting arrangements and any travel or outreach component before beginning a pathway.",
    settings: [
      "Health, aged-care, disability and community services",
      "Clinic, outreach, home-based and regional service models",
      "Selected public, private and not-for-profit environments",
      "Hybrid or mobile services where the employer defines safe arrangements",
    ],
    readiness: [
      "Profession-specific registration or membership where applicable",
      "Qualifications, identity, work rights and relevant employment history",
      "Scope, supervision, references and setting-specific experience",
      "Role-required screening, licences, insurance or training evidence",
    ],
    development: [
      "Profession-relevant learning and reflective practice",
      "Documentation, consent, privacy and multidisciplinary communication",
      "Cultural safety, safeguarding and service-specific governance",
      "Supervision and capability follow-up where agreed in the programme",
    ],
    employerInputs: [
      "Discipline, caseload, service model and expected scope",
      "Registration, experience, supervision and reporting requirements",
      "Location, travel, modality, roster and commencement details",
      "Selection, induction, systems access and clinical governance ownership",
    ],
    professionalAnswer:
      "Selected allied health professionals can register interest and describe their discipline, registration status, experience and preferred service settings. HPI will only progress a person against a relevant, verified requirement and with appropriate information-sharing authority. No expression of interest guarantees a vacancy, interview or placement.",
  },
  {
    slug: "remote-site-health",
    name: "Remote and Site Health Personnel",
    shortName: "Remote and site health",
    title: "Remote Site Health Workforce | Health Plus International",
    description:
      "Selected remote and site-health workforce pathways with verified role scope, credentials, logistics, mobilisation and project controls.",
    eyebrow: "Remote and site-health pathways",
    lead:
      "HPI supports selected regional, remote and site-health requirements only where the employer, service context, role scope, governance and mobilisation controls can be defined. Suitability depends on the actual project and cannot be inferred from a broad occupational label.",
    pathwayAnswer:
      "HPI can coordinate selected remote or site-health pathways from detailed workforce brief through evidence review, selection, mobilisation and early support. Each engagement requires verified scope, escalation, communications, insurance, travel, accommodation and emergency arrangements. The authorised employer or site controller retains workplace and clinical governance decisions.",
    pathwayDetail:
      "Remote and site-based health work can involve isolation, travel, changing conditions and limited immediate support. HPI therefore treats logistics and operational controls as part of readiness, not as an afterthought. No person is represented as suitable until the role, environment, evidence and available support have been reviewed.",
    settings: [
      "Regional and remote health-service pathways",
      "Selected industrial or project-based health settings",
      "Outreach and mobile services with defined governance",
      "Time-limited deployments subject to verified project controls",
    ],
    readiness: [
      "Role-specific registration, qualifications, experience and references",
      "Identity, work rights, screening, licences and required training",
      "Remote-context capability, escalation and communications awareness",
      "Fitness, travel or other evidence only where lawful and role-relevant",
    ],
    development: [
      "Remote readiness, escalation and situational communication",
      "Emergency, safety and site-specific learning within role scope",
      "Cultural safety and community-context preparation",
      "Structured debrief, reflective practice and support where agreed",
    ],
    employerInputs: [
      "Site, environment, hazards, role scope and governance model",
      "Roster, rotation, travel, accommodation and communications arrangements",
      "Credentials, licences, experience and project-specific controls",
      "Induction, supervision, escalation and emergency responsibilities",
    ],
    professionalAnswer:
      "Professionals interested in remote or site-health work can register their verified experience, credentials, availability and location preferences. HPI assesses interest only against defined opportunities. Applicants receive information about the role and mobilisation pathway before consented presentation, and may decline an opportunity that is not suitable.",
  },
];

export type RegionPage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  places: string[];
  lead: string;
  context: string;
  planning: string;
  mobilisation: string;
  professional: string;
};

export const regionPages: RegionPage[] = [
  {
    slug: "far-west-nsw",
    name: "Far West NSW",
    title: "Far West NSW Workforce | Health Plus International",
    description:
      "Healthcare workforce planning and supported pathways for Far West NSW, including Broken Hill, Menindee, Wilcannia and Tibooburra.",
    places: ["Broken Hill", "Menindee", "Wilcannia", "Tibooburra"],
    lead:
      "HPI supports defined healthcare workforce pathways across Far West NSW. Each engagement starts with the service, community, role, distance and practical support available—so workforce activity reflects the real operating environment.",
    context:
      "Far West pathways require more than a location label. Travel time, accommodation, communications, roster design, supervision, community connection and access to escalation may materially affect suitability. HPI works with employers to make these requirements visible before attraction, selection or mobilisation begins.",
    planning:
      "For Far West workforce planning, HPI asks employers to identify the precise facility or service, role scope, start requirement, roster, duration and authorised contacts. We also clarify local induction, clinical or operational governance, accommodation and travel ownership, and what support is available after commencement.",
    mobilisation:
      "Mobilisation is coordinated against an agreed checklist rather than assumed. Depending on the engagement, this can include evidence completion, travel and accommodation confirmation, local contacts, arrival arrangements, first-shift information and early check-ins. Responsibilities remain documented between HPI, the employer, the professional and any authorised partner.",
    professional:
      "Professionals considering Far West opportunities should receive enough verified information to make an informed decision. HPI discusses the service context, role, roster, location and pathway before consented presentation. Registration of interest does not guarantee a particular town, facility, start date or placement outcome.",
  },
  {
    slug: "western-nsw",
    name: "Western NSW",
    title: "Western NSW Workforce | Health Plus International",
    description:
      "Healthcare workforce pathways for Western NSW services, including Dubbo, Bourke, Walgett, Lightning Ridge and Cobar.",
    places: ["Dubbo", "Bourke", "Walgett", "Lightning Ridge", "Cobar"],
    lead:
      "HPI helps Western NSW employers define immediate and recurring healthcare workforce needs, then connect attraction, readiness, mobilisation, support and retention activity around a controlled service brief.",
    context:
      "Western NSW includes different service environments and very different travel or settlement conditions. A requirement in a regional centre cannot be assumed to operate like one in a smaller community. HPI documents the specific workplace, community, role and logistics so a pathway is built on relevant information.",
    planning:
      "Workforce planning begins with demand: which role is required, what duties and experience matter, when the need starts, how long it may continue and who makes the final decision. Where shortages recur, HPI can help structure a cohort or pipeline rather than treating every vacancy as an isolated transaction.",
    mobilisation:
      "A Western NSW mobilisation plan may cover role evidence, travel, accommodation, site access, local orientation, reporting lines and early support. The exact inclusions depend on the agreed engagement. HPI does not replace the employer’s workplace, clinical, safeguarding or facility responsibilities.",
    professional:
      "Candidates can describe preferred locations, transport considerations, availability and relevant regional experience when registering. HPI uses those preferences to consider suitable verified opportunities, while employers retain selection authority. Professionals can ask questions and decline an opportunity that does not fit their circumstances.",
  },
  {
    slug: "murrumbidgee",
    name: "Murrumbidgee",
    title: "Murrumbidgee Workforce | Health Plus International",
    description:
      "Healthcare workforce planning and pathways across Murrumbidgee, including Griffith, Wagga Wagga, Deniliquin and Hay.",
    places: ["Griffith", "Wagga Wagga", "Deniliquin", "Hay"],
    lead:
      "HPI supports healthcare, aged-care and community-service workforce pathways in Murrumbidgee through clear role definition, targeted attraction, readiness controls and practical commencement support.",
    context:
      "Murrumbidgee workforce requirements can involve regional centres, smaller communities, outreach services and travel between locations. HPI treats the workplace model and geography as core selection information. This helps avoid presenting a role as suitable before its roster, scope, transport and support conditions are understood.",
    planning:
      "Employers provide a controlled workforce brief covering the service, role, classification, responsibilities, roster, duration, start need and mandatory evidence. HPI can scale its response from one urgent role to a recurring pipeline or broader workforce-development programme, depending on the agreed problem.",
    mobilisation:
      "Before commencement, agreed actions and owners are made visible. These may include credential completion, local induction scheduling, travel or accommodation confirmation, facility contacts, systems access and early check-ins. HPI coordinates within scope; the employer retains its own governance and workplace decisions.",
    professional:
      "Professionals interested in Murrumbidgee can register their role, experience, preferred communities and availability. HPI only seeks additional documents when a relevant purpose and pathway exist. An expression of interest is not a job offer, and final selection belongs to the authorised employer.",
  },
  {
    slug: "hunter-new-england",
    name: "Hunter New England",
    title: "Hunter New England Workforce | Health Plus International",
    description:
      "Healthcare workforce pathways for Hunter New England, including Tamworth, Armidale, Moree, Narrabri and Inverell.",
    places: ["Tamworth", "Armidale", "Moree", "Narrabri", "Inverell"],
    lead:
      "HPI supports defined workforce pathways across Hunter New England, connecting employer demand with role-specific readiness, candidate choice, mobilisation and early-placement support.",
    context:
      "Hunter New England covers varied communities, service types and travel patterns. HPI does not treat the region as a single labour market. Each pathway records the facility or programme, role scope, local setting, roster and practical requirements that may influence attraction, suitability and retention.",
    planning:
      "A useful workforce brief explains not only the title but why the role exists, who it supports, what the professional will do and how the service will supervise or govern the work. HPI uses that brief to structure attraction, evidence review, communication and presentation decisions.",
    mobilisation:
      "Where a candidate is selected, HPI coordinates the agreed transition to commencement. Travel, accommodation, contact points, outstanding evidence, arrival and check-ins are addressed only where included in scope. Facility induction, systems, local policies and clinical authorisation remain with the service.",
    professional:
      "Professionals can register interest in Hunter New England pathways and identify preferred settings or communities. HPI explains a verified opportunity before seeking permission to present relevant information. Suitability is considered against the specific role, not inferred solely from occupation or registration.",
  },
  {
    slug: "northern-nsw",
    name: "Northern NSW",
    title: "Northern NSW Workforce | Health Plus International",
    description:
      "Healthcare workforce pathways for Northern NSW, including Lismore, Grafton, Ballina, Casino and Byron Bay.",
    places: ["Lismore", "Grafton", "Ballina", "Casino", "Byron Bay"],
    lead:
      "HPI helps Northern NSW services respond to defined healthcare workforce needs through targeted attraction, controlled readiness, employer selection and supported mobilisation.",
    context:
      "Northern NSW workforce planning may span hospital, aged-care, disability, community and outreach environments. Location alone does not explain the role. HPI clarifies the service model, people supported, work pattern, travel, credentials and local governance before a workforce pathway progresses.",
    planning:
      "The employer brief identifies the exact role, scope, roster, location, duration, mandatory controls and decision owners. HPI can then scale its activity to an urgent vacancy, recurring workforce pressure or a wider programme that includes pipeline, development, support and retention measures.",
    mobilisation:
      "A supported commencement relies on clear responsibilities. HPI may coordinate evidence status, practical logistics, nominated contacts and early check-ins under the engagement. The host service remains responsible for workplace orientation, local policy, supervision, safety and any clinical authority.",
    professional:
      "Professionals interested in Northern NSW can register their background, availability and setting preferences. HPI does not represent an opportunity as confirmed until it has been verified, and does not promise an interview or placement. Candidates can make an informed choice before consented presentation.",
  },
  {
    slug: "mid-north-coast",
    name: "Mid North Coast",
    title: "Mid North Coast Workforce | Health Plus International",
    description:
      "Healthcare workforce pathways for the Mid North Coast, including Port Macquarie, Coffs Harbour, Kempsey and Taree.",
    places: ["Port Macquarie", "Coffs Harbour", "Kempsey", "Taree"],
    lead:
      "HPI supports healthcare workforce planning and pathways across the Mid North Coast, from immediate role response to structured readiness, support and longer-term capability activity.",
    context:
      "Mid North Coast services can differ in size, model, travel expectations, supervision and the communities they support. HPI builds each pathway around a specific employer requirement. This creates clearer information for attraction and helps professionals assess the actual role rather than a broad regional description.",
    planning:
      "HPI asks the service to define duties, classification, required experience, roster, location, duration, start need and mandatory evidence. For recurring pressure, the conversation can extend to cohort planning, learning, deployment support and retention measures instead of repeating one-off searches.",
    mobilisation:
      "Once selection is confirmed, HPI coordinates agreed pre-start actions and communication. These can include credential status, travel, accommodation, local contacts and early follow-up. Local orientation, workplace systems, supervision, safeguarding and scope decisions remain with the authorised service.",
    professional:
      "Professionals can identify Mid North Coast preferences when registering with HPI. Information is assessed against verified opportunities and shared with appropriate authority. Candidates should expect honest updates and can ask about the service, role and arrangements before deciding whether to proceed.",
  },
];

export const frameworkStages = [
  ["01", "Role verification", "Define the service, duties, scope, roster, location, requirements and decision owners."],
  ["02", "Credential screening", "Review registration, qualifications, work rights and role-required screening against the verified brief."],
  ["03", "CPD alignment", "Connect identified capability needs to role-based learning and appropriate evidence."],
  ["04", "Mobilisation", "Coordinate employer selection support, pre-start actions, logistics and commencement responsibilities."],
  ["05", "Retention", "Support early continuity and review experience, risks and agreed retention indicators."],
] as const;

export const workforceBySlug = Object.fromEntries(
  workforcePages.map((page) => [page.slug, page]),
) as Record<string, WorkforcePage>;

export const regionBySlug = Object.fromEntries(
  regionPages.map((page) => [page.slug, page]),
) as Record<string, RegionPage>;

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: "Health Plus International",
      title,
      description,
      url: path,
      images: [
        {
          url: "/assets/hero-nurse.jpg",
          width: 900,
          height: 506,
          alt: "Healthcare professional supporting a patient",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/hero-nurse.jpg"],
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
