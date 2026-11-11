import { Fragment } from "react";
import "./site-chrome.css";
import "./atmos.css";

const navigation = [
  ["About HPI", "/about"],
  ["Why HPI", "/why-hpi"],
  ["Employers", "/employers"],
  ["Healthcare Workers", "/work-with-us"],
  ["AHPRA Support", "/ahpra-registration-support"],
  ["Positions", "/roles"],
  ["Blog", "/blog"],
  ["Contact Us", "#contact"],
] as const;

function NavigationLinks() {
  return navigation.map(([label, href]) => href === "/employers" ? (
    <details className="hpi-worker-menu" key={href}>
      <summary>Employers</summary>
      <div className="hpi-worker-submenu">
        <a href="/employers">Employers and Facilities</a>
        <a href="/aged-care-workforce-nsw">Aged Care Workforce</a>
      </div>
    </details>
  ) : href === "/work-with-us" ? (
    <details className="hpi-worker-menu" key={href}>
      <summary>Healthcare Workers</summary>
      <div className="hpi-worker-submenu">
        <a href="/work-with-us">Why work with Healthplus?</a>
        <a href="/regional-nsw-healthcare-workforce">Regional NSW Workforce</a>
      </div>
    </details>
  ) : <a key={href} href={href}>{label}</a>);
}

function Brand() {
  return (
    <a className="hpi-brand" href="/" aria-label="Healthplus International Home">
      <img src="/assets/healthplus-mark-76-d5ac59f7.webp" alt="" width="76" height="80" decoding="async" />
      <span><strong>Healthplus International</strong><small>People · Care · Compliance</small></span>
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="hpi-header">
      <Brand />
      <nav className="hpi-desktop-nav" aria-label="Primary Navigation">
        <NavigationLinks />
      </nav>
      <a className="hpi-action hpi-header-action" href="/employers#request">Request Workers</a>
      <details className="hpi-mobile-menu">
        <summary aria-label="Navigation Menu"><span></span><span></span><span></span></summary>
        <nav aria-label="Mobile Navigation">
          <a className="hpi-action" href="/employers#request">Request Workers</a>
          <a className="hpi-action hpi-action-outline" href="/work-with-us#apply">Find Healthcare Work</a>
          <NavigationLinks />
          <a href="/faq">FAQ</a>
          <a href="/privacy">Privacy Policy</a>
        </nav>
      </details>
    </header>
  );
}

export function ClosingPanel() {
  return (
    <section className="hpi-closing" id="start" aria-labelledby="hpi-start-heading">
      <p className="hpi-closing-title" id="hpi-start-heading">Start here</p>
      <div className="hpi-doors">
        <article>
          <p className="hpi-door-title">Employers and Facilities</p>
          <p>Tell us the roles, the location and when you need them.</p>
          <a className="hpi-action" href="/employers#request">Request Workers</a>
        </article>
        <article>
          <p className="hpi-door-title">Healthcare Workers</p>
          <p>Tell us your profession and where in NSW you want to work.</p>
          <a className="hpi-action hpi-action-outline" href="/work-with-us#apply">Find Healthcare Work</a>
        </article>
      </div>
      <p className="hpi-talk">Prefer to talk? <a href="tel:+61411459755">+61 411 459 755</a>, <a href="mailto:info@healthplusint.com.au">info@healthplusint.com.au</a>, or <a href="https://wa.me/61411459755">WhatsApp</a>. <span>Mon-Fri 8:30am-5:00pm Sydney time, excluding NSW public holidays.</span></p>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="hpi-footer" id="contact">
      <div className="hpi-footer-columns">
        <div>
          <a href="/" aria-label="Healthplus International Home" className="hpi-footer-logo"><img src="/assets/logo-healthplus-transparent.webp" alt="Healthplus International" width="158" height="144" loading="lazy" /></a>
          <p className="hpi-footer-tagline">People · Care · Compliance</p>
          <address>Helensburgh, NSW</address>
          <p>Sydney &amp; regional NSW · Australia</p>

        </div>
        <div>
          <p className="hpi-footer-title">Contact</p>
          <a href="tel:+61411459755">+61 411 459 755</a>
          <a href="mailto:info@healthplusint.com.au">info@healthplusint.com.au</a>
          <a href="https://wa.me/61411459755">WhatsApp</a>
          <p className="hpi-hours">Mon-Fri 8:30am-5:00pm Sydney time, excluding NSW public holidays.</p>
          <p>Regional after-hours support is set per engagement.</p>
        </div>

        <nav className="hpi-footer-links" aria-label="Footer Navigation">
          <p className="hpi-footer-title">Links</p>
          {navigation.map(([label, href]) => <Fragment key={href}><a href={href}>{label}</a>{href === "/work-with-us" && <a className="hpi-footer-sublink" href="/regional-nsw-healthcare-workforce">Regional NSW Workforce</a>}</Fragment>)}
          <a href="/faq">FAQ</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/privacy#cookies" data-cookie-settings="true">Cookie settings</a>
          <a href="https://buy.nsw.gov.au/supplier/profile/12466498" target="_blank" rel="noopener noreferrer">Buy NSW Supplier Profile</a>
          <a href="https://au.linkedin.com/company/health-plus-international-australia" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/healthplusint/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </nav>
      </div>
      <section className="hpi-acknowledgement" aria-labelledby="country-heading">
        <div className="hpi-country-flags">
          <img src="/assets/aboriginal-flag.webp" alt="Australian Aboriginal flag" width="42" height="28" loading="lazy" />
          <img src="/assets/torres-strait-islander-flag.webp" alt="Torres Strait Islander flag" width="42" height="28" loading="lazy" />
        </div>
        <div><p className="hpi-footer-title" id="country-heading">Acknowledgement of Country</p><p>Healthplus International acknowledges the Dharawal people, the Traditional Custodians of the land in Helensburgh where we are based. We pay our respects to Elders past and present, and extend that respect to Aboriginal and Torres Strait Islander peoples across the communities where we work.</p></div>
      </section>
      <div className="hpi-footer-bottom">
        <p>Copyright 2026 Westminster Green Solutions Pty Ltd trading as Healthplus International, ABN 13 155 901 723</p>
      </div>
      <a className="hpi-whatsapp-float" href="https://wa.me/61411459755" target="_blank" rel="noopener noreferrer" aria-label="Chat with Healthplus International on WhatsApp">
        <span className="hpi-whatsapp-tooltip">Chat with HPI Now</span>
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none" aria-hidden="true">
          <path d="M27 15.5a11 11 0 0 1-16.3 9.65L5 27l1.8-5.8A11 11 0 1 1 27 15.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 9.5c-.5-.3-1.1-.2-1.5.3-1.1 1.3-.8 3.7.6 5.9 1.5 2.4 3.9 4.3 6.3 5 1.6.5 3.1-.2 3.6-1.5.2-.5.1-.9-.4-1.2l-2.2-1.1c-.4-.2-.7-.1-1 .3l-.8 1c-1.8-.8-3.4-2.4-4.2-4.1l.9-.9c.3-.3.4-.6.2-1l-1.5-2.7Z" fill="currentColor" />
        </svg>
      </a>
    </footer>
  );
}
