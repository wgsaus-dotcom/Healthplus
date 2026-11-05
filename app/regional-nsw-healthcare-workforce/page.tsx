import PageSeo from "../PageSeo";
import { pageMetadata } from "../seo-pages";
import { regions } from "../simplified-content";
import "./regional.css";

export const metadata = pageMetadata("/regional-nsw-healthcare-workforce");

function RegionalActions() {
  return <div className="regional-actions"><a className="hpi-action" href="/employers#request">Request Workers</a><a className="hpi-action hpi-action-outline" href="/work-with-us#apply">Find Regional Healthcare Work</a></div>;
}

export default function RegionalWorkforcePage() {
  return <main className="regional-page">
    <PageSeo path="/regional-nsw-healthcare-workforce" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "ImageObject",
      "@id": "https://healthplusint.com.au/assets/regions/murrumbidgee.webp#image",
      contentUrl: "https://healthplusint.com.au/assets/regions/murrumbidgee.webp",
      name: "Wagga Wagga, NSW", description: "Panoramic view across Wagga Wagga in regional New South Wales",
      creator: { "@type": "Person", name: "Bidgee" },
      creditText: "Photo: Bidgee. Cropped and resized.",
      copyrightNotice: "© Bidgee. Licensed under CC BY 3.0.",
      license: "https://creativecommons.org/licenses/by/3.0/",
      acquireLicensePage: "https://commons.wikimedia.org/wiki/File:Wagga_Wagga_WNW_panorama.jpg",
      width: 960, height: 480, encodingFormat: "image/webp"
    }) }} />
    <header className="regional-hero">
      <div><p className="regional-eyebrow">PEOPLE · CARE · COMPLIANCE</p>
        <h1>Delivering Dedicated Healthcare Professionals to Regional NSW</h1>
        <p>Supporting regional communities through healthcare workforce development, role-specific readiness and planned placements across nursing, allied health and aged care. We recruit, employ and place Healthcare Workers where their skills match the needs of the service.</p>
        <RegionalActions />
      </div>
      <figure><img src="/assets/regions/murrumbidgee.webp" alt="Panoramic view across Wagga Wagga in the Riverina, regional NSW" width="960" height="480" fetchPriority="high" /><figcaption>Wagga Wagga, Riverina · Photo: <a href="https://commons.wikimedia.org/wiki/File:Wagga_Wagga_WNW_panorama.jpg" target="_blank" rel="noopener noreferrer">Bidgee</a> · <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer">CC BY 3.0</a> · Cropped and resized</figcaption></figure>
    </header>
    <section className="regional-section" aria-labelledby="regional-gap"><p className="regional-eyebrow">FOR REGIONAL EMPLOYERS</p><h2 id="regional-gap">Bridging the Gap in Regional Healthcare</h2><p>Regional hospitals, aged care facilities and community services face workforce challenges shaped by location, service scope and continuity of care. HPI brings recruitment, employment, compliance coordination and commencement planning together in one workforce development approach.</p><p>We assess your requirements, identify suitable candidates and plan placements around role-specific checks, availability and practical regional arrangements. From a defined vacancy to longer-term workforce planning, our approach is built on <strong>People, Care and Compliance</strong>.</p><a className="regional-text-link" href="/why-hpi">How our workforce development approach works</a></section>
    <section className="regional-section regional-pathway" aria-labelledby="regional-pathway"><p className="regional-eyebrow">PEOPLE + COMMUNITY</p><h2 id="regional-pathway">The Regional Healthcare Employment Pathway</h2><p>Through collaboration with the <a href="https://mccsc.org.au" target="_blank" rel="noopener noreferrer">Multicultural Communities Support Centre (MCCSC)</a>, the Regional Healthcare Employment Pathway aims to connect migrant and refugee healthcare professionals with suitable opportunities across regional New South Wales.</p><p>The pathway focuses on professional readiness, employment opportunities and community connection. Each candidate’s qualifications, registration where required, work rights and suitability are assessed against the specific role.</p>
      <div className="regional-grid"><article><h3>Developing a Regional Talent Pool</h3><p>Connecting with professionals interested in building careers in regional communities, with readiness and eligibility considered individually.</p></article><article><h3>Supported Integration</h3><p>Coordinating workplace preparation, onboarding and practical settlement considerations with candidates, employers and community partners.</p></article><article><h3>Stronger Communities</h3><p>Supporting workforce continuity while helping Healthcare Workers establish professional and community connections.</p></article></div>
    </section>
    <section className="regional-section" aria-labelledby="regional-partner"><h2 id="regional-partner">Why Regional Facilities Partner with Us</h2><div className="regional-grid"><article><h3>A Clear Response</h3><p>Tell us the role and location. We acknowledge your request and make initial contact within one business day to discuss requirements and next steps.</p></article><article><h3>Role-Specific Compliance</h3><p>Checks include Ahpra registration where required, qualifications, work rights and relevant screening. Required checks are completed before commencement; the host service retains clinical governance and day-to-day supervision.</p></article><article><h3>Placements Planned for Your Service</h3><p>We support Registered Nurses, Enrolled Nurses, Assistants in Nursing, Aged Care Workers and Allied Health Professionals, matched to your service scope and role requirements.</p></article></div><p><a className="regional-text-link" href="/roles">Explore healthcare roles and checks</a> · <a className="regional-text-link" href="/about#charter">Read our Service Charter</a></p></section>
    <section className="regional-section regional-locations" aria-labelledby="regional-locations"><h2 id="regional-locations">Explore Regional NSW</h2><p>Planning reflects the workplace, roster, travel, accommodation and supervision arrangements for each engagement. These locations describe our regional focus; current opportunities are discussed individually.</p><div className="regional-grid">{regions.map(region=><article key={region.slug}><h3>{region.name}</h3><p>{region.places}.</p><p>{region.detail}</p><a className="regional-text-link" href={`/work-with-us?region=${region.slug}#apply`}>Register interest in {region.name}</a></article>)}</div></section>
    <section className="regional-section" aria-labelledby="regional-journey"><p className="regional-eyebrow">FOR HEALTHCARE WORKERS</p><h2 id="regional-journey">Start Your Journey in Regional NSW</h2><p>Looking for nursing jobs in regional NSW, aged care opportunities or an allied health placement? Tell us about your experience and preferred location. We discuss suitable opportunities as they become available and help you prepare for the next step.</p><ol className="regional-steps"><li><h3>Register Simply</h3><p>Upload your résumé, select your preferred region and tell us your availability in two short steps.</p></li><li><h3>Discuss a Suitable Role</h3><p>We review your details first, then explain the registration and compliance documents needed for relevant opportunities. Please keep sensitive identity, banking and health documents out of your initial enquiry.</p></li><li><h3>Prepare and Settle In</h3><p>We plan commencement with the facility and follow up early in the placement. Travel, accommodation and any role-specific assistance are discussed before you commit.</p></li></ol><p><a className="regional-text-link" href="/work-with-us">Explore working with Healthplus</a> · <a className="regional-text-link" href="/ahpra-registration-support">Ahpra registration support for overseas nurses</a></p></section>
    <section className="regional-section regional-contact" aria-labelledby="regional-contact"><h2 id="regional-contact">Ready to Move Forward?</h2><p>Whether you need Healthcare Workers for your regional facility or are exploring your next role, our team is ready to discuss the next steps.</p><RegionalActions /><p><a href="tel:+61411459755">+61 411 459 755</a> · <a href="mailto:info@healthplusint.com.au">info@healthplusint.com.au</a></p><p>Monday–Friday, 8:30 am–5:00 pm Sydney time, excluding NSW public holidays. Regional after-hours arrangements are agreed for individual engagements.</p></section>
  </main>;
}
