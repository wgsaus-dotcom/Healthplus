import "./site-chrome.css";

const navigation = [
  ["For employers", "/employers"],
  ["For healthcare workers", "/work-with-us"],
  ["Roles", "/roles"],
  ["About", "/about"],
] as const;

function Brand() {
  return (
    <a className="hpi-brand" href="/" aria-label="Health Plus International home">
      <img src="/assets/healthplus-mark.webp" alt="" width="180" height="190" />
      <span><strong>Health Plus International</strong><small>People · Care · Compliance</small></span>
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="hpi-header">
      <Brand />
      <nav className="hpi-desktop-nav" aria-label="Primary navigation">
        {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <a className="hpi-header-phone" href="tel:+61411459755">
        <span className="hpi-phone-number">+61 411 459 755</span>
        <svg className="hpi-phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m7 3 3 5-2 2c1.5 3 3 4.5 6 6l2-2 5 3c0 3-2 4-4 4C10 20 4 14 3 7c0-2 1-4 4-4Z" /></svg>
        <span className="hpi-sr-only">Call Health Plus International</span>
      </a>
      <a className="hpi-action hpi-header-action" href="/employers#request">Request workers</a>
      <details className="hpi-mobile-menu">
        <summary aria-label="Navigation menu"><span></span><span></span><span></span></summary>
        <nav aria-label="Mobile navigation">
          <a className="hpi-action" href="/employers#request">Request workers</a>
          <a className="hpi-action hpi-action-outline" href="/work-with-us#apply">Find healthcare work</a>
          {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
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
      <h2 id="hpi-start-heading">Start here.</h2>
      <div className="hpi-doors">
        <article>
          <h3>Employers and facilities.</h3>
          <p>Tell us the roles, the location and when you need them.</p>
          <a className="hpi-action" href="/employers#request">Request workers</a>
        </article>
        <article>
          <h3>Healthcare workers.</h3>
          <p>Tell us your profession and where in NSW you want to work.</p>
          <a className="hpi-action hpi-action-outline" href="/work-with-us#apply">Find healthcare work</a>
        </article>
      </div>
      <p className="hpi-talk">Prefer to talk? <a href="tel:+61411459755">+61 411 459 755</a>, <a href="mailto:info@healthplusint.com.au">info@healthplusint.com.au</a>, or <a href="https://wa.me/61411459755">WhatsApp</a>. <span>Mon-Fri 8:30am-5:00pm Sydney time, excluding NSW public holidays.</span></p>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="hpi-footer">
      <div className="hpi-footer-columns">
        <div>
          <a href="/" aria-label="Health Plus International home" className="hpi-footer-logo"><img src="/assets/logo-healthplus-transparent.webp" alt="Health Plus International" width="158" height="144" loading="lazy" /></a>
          <p className="hpi-footer-tagline">People · Care · Compliance</p>
          <address>Helensburgh, NSW</address>
          <p>Sydney &amp; Regional NSW · Australia</p>

        </div>
        <div>
          <h2>Contact</h2>
          <a href="tel:+61411459755">+61 411 459 755</a>
          <a href="mailto:info@healthplusint.com.au">info@healthplusint.com.au</a>
          <a href="https://wa.me/61411459755">WhatsApp</a>
          <p className="hpi-hours">Mon-Fri 8:30am-5:00pm Sydney time, excluding NSW public holidays.</p>
          <p>Regional after-hours support is set per engagement.</p>
        </div>

        <nav className="hpi-footer-links" aria-label="Footer navigation">
          <h2>Links</h2>
          {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <a href="/faq">FAQ</a>
          <a href="/privacy">Privacy Policy</a>
        </nav>
      </div>
      <section className="hpi-acknowledgement" aria-labelledby="country-heading">
        <div className="hpi-country-flags">
          <img src="/assets/aboriginal-flag.webp" alt="Australian Aboriginal flag" width="42" height="28" loading="lazy" />
          <img src="/assets/torres-strait-islander-flag.webp" alt="Torres Strait Islander flag" width="42" height="28" loading="lazy" />
        </div>
        <div><h2 id="country-heading">Acknowledgement of Country</h2><p>Health Plus International acknowledges the Dharawal people, the Traditional Custodians of the land in Helensburgh where we are based. We pay our respects to Elders past and present, and extend that respect to Aboriginal and Torres Strait Islander peoples across the communities where we work.</p></div>
      </section>
      <div className="hpi-footer-bottom">
        <p>Copyright 2026 Health Plus International Pty Ltd, ABN 13 155 901 723</p>
        <p className="hpi-staff">Staff: <a href="https://documents.healthplusint.com.au">Documents</a> · <a href="https://crm.healthplusint.com.au/crm">CRM login</a></p>
      </div>
    </footer>
  );
}
