export const roles = [
  {
    slug: "registered-nurses", name: "Registered Nurses",
    text: "HPI recruits, employs and places registered nurses for hospital, subacute and multipurpose services, residential aged care and transition care, and community and regional services. HPI employs the nurse; the facility keeps clinical governance, local scope and day-to-day supervision.",
    checks: "Ahpra registration and conditions, qualifications, identity, work rights, employment history, role-required screening, and specialty experience and recency of practice.",
  },
  {
    slug: "assistants-in-nursing", name: "Assistants in Nursing",
    text: "For hospital wards and multipurpose services, residential aged care and respite, community and transitional-care programmes, and regional services with defined supervision. HPI employs the worker; the facility keeps delegation and day-to-day supervision, and site induction is agreed with the facility in the mobilisation plan.",
    checks: "Training and placements, employment history, identity, work rights, screening and references.",
  },
  {
    slug: "aged-care-workers", name: "Aged Care Workers",
    text: "For residential aged care and respite, home care and consumer-directed support, transition and restorative care, and regional services. HPI employs the worker; the approved provider keeps care governance and day-to-day supervision, and site induction is agreed in the mobilisation plan.",
    checks: "Qualifications and experience, identity, work rights, screening, police check, vaccination and training evidence, and safeguarding awareness.",
  },
  {
    slug: "support-workers", name: "Support Workers",
    text: "Community and in-home support, not NDIS. Matching starts from the duties, the setting and the safeguards of the role, not a list of certificates. HPI employs the worker; the provider keeps responsibility for service delivery and day-to-day supervision.",
    checks: "Identity, work rights, training and employment history, plus worker screening, a Working with Children Check, and licence and availability where the role needs them.",
  },
  {
    slug: "allied-health", name: "Allied Health Professionals",
    text: "For services that have a defined discipline, service model and scope. HPI employs the professional; the host service keeps clinical governance and professional supervision, and site induction is agreed in the mobilisation plan.",
    checks: "Registration, qualifications, identity, work rights, scope, references, screening, licences and insurance, in proportion to the profession and setting.",
  },
] as const;

// Towns and practical planning details retained from the existing regional source pages.
export const regions = [
  { slug: "far-west-nsw", name: "Far West NSW", places: "Broken Hill, Menindee, Wilcannia and Tibooburra", detail: "Planning accounts for travel time, accommodation, communications, roster design and supervision." },
  { slug: "western-nsw", name: "Western NSW", places: "Dubbo, Bourke, Walgett, Lightning Ridge and Cobar", detail: "Travel and settlement conditions are considered for the specific workplace and community." },
  { slug: "murrumbidgee", name: "Murrumbidgee", places: "Griffith, Wagga Wagga, Deniliquin and Hay", detail: "Planning accounts for regional centres, smaller communities, outreach services and travel between locations." },
  { slug: "hunter-new-england", name: "Hunter New England", places: "Tamworth, Armidale, Moree, Narrabri and Inverell", detail: "The service setting, roster and practical travel requirements are recorded for each engagement." },
  { slug: "northern-nsw", name: "Northern NSW", places: "Lismore, Grafton, Ballina, Casino and Byron Bay", detail: "Planning considers the service model, work pattern, travel, credentials and local governance." },
  { slug: "mid-north-coast", name: "Mid North Coast", places: "Port Macquarie, Coffs Harbour, Kempsey and Taree", detail: "The specific service model, travel expectations and supervision arrangements guide planning." },
] as const;

export const responseStandards = [
  ["General enquiry", "Acknowledgement within one business day"],
  ["Employer workforce request", "Facility contact and an initial response within 24 hours of receiving the request"],
  ["Application or registration", "Receipt confirmed within one business day"],
  ["Progress update", "Updates at agreed milestones, with material delays explained"],
  ["Reasonable adjustment", "Acknowledgement within two business days and discussion of practical options"],
  ["Complaint or privacy concern", "Acknowledgement within two business days; target outcome within ten business days or a progress update"],
] as const;

export const questions = [
  ["What is Health Plus International?", "A healthcare workforce development business in Helensburgh, NSW. We recruit, employ and place healthcare workers."],
  ["Do you train workers?", "No. We recruit, employ and place."],
  ["Who is responsible for clinical care and supervision?", "The facility or host service directs day-to-day work and clinical supervision. HPI employs the worker and checks them for the role."],
  ["Which roles do you place?", "Registered nurses, assistants in nursing, aged care workers, community support workers and allied health professionals."],
  ["Where do you work?", "Sydney and regional NSW. Regional work is planned for each engagement. Listing a region does not mean a vacancy is open."],
  ["How do I request workers?", "Use the workforce request form. We acknowledge it the same business day and contact you within 24 hours."],
  ["What does “checked for the role” mean?", "We compare a worker’s evidence with the role: registration, qualifications, identity, work rights and the screening that role needs. A certificate alone does not prove competence. The checks for each role are on the roles page."],
  ["Does registering guarantee a job?", "No. Registration does not guarantee a role, interview or start date."],
  ["What kind of support workers do you place?", "Community and in-home support workers, not NDIS."],
  ["How is my information protected, and when are you open?", "We collect information for defined purposes and ask before sharing it. Please leave identity, banking and unnecessary health details out of first contact. We are open 8:30am to 5:00pm Sydney time, Monday to Friday, excluding NSW public holidays. We are not an emergency or clinical service. See the Privacy Policy."],
] as const;
