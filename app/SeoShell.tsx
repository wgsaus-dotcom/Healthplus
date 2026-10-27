import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SeoHeader() {
  return (
    <header className="site-header seo-header">
      <Link className="brand" href="/" aria-label="Health Plus International home">
        <img
          src="/assets/healthplus-mark.png"
          alt=""
          width="180"
          height="190"
        />
        <span>
          <strong>Health Plus International</strong>
          <small>People · Care · Compliance</small>
        </span>
      </Link>
      <nav className="seo-nav" aria-label="Primary navigation">
        <Link href="/#employer-request">Employers</Link>
        <Link href="/#worker-application">Healthcare Professionals</Link>
        <Link href="/#workforce">Roles</Link>
        <Link href="/framework">How It Works</Link>
        <Link href="/about">About HPI</Link>
        <Link href="/faq">FAQs</Link>
      </nav>
      <Link className="button button-small" href="/#employer-request">
        Discuss a Workforce Need <Arrow />
      </Link>
      <details className="mobile-menu seo-mobile-menu">
        <summary aria-label="Open menu"><span></span><span></span></summary>
        <nav aria-label="Mobile navigation">
          <Link href="/#employer-request">Employers</Link>
          <Link href="/#worker-application">Healthcare Professionals</Link>
          <Link href="/#workforce">Roles</Link>
          <Link href="/framework">How It Works</Link>
          <Link href="/about">About HPI</Link>
          <Link href="/service-charter">Service Charter</Link>
          <Link href="/faq">FAQs</Link>
          <Link href="/engage">Ways to engage</Link>
        </nav>
      </details>
    </header>
  );
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SeoFooter() {
  return (
    <footer className="seo-footer">
      <div className="footer-brand">
        <Link className="brand inverse" href="/">
          <img
            src="/assets/healthplus-mark.png"
            alt=""
            width="180"
            height="190"
            loading="lazy"
          />
          <span>
            <strong>Health Plus International</strong>
            <small>People · Care · Compliance</small>
          </span>
        </Link>
        <p>Building qualification-aligned healthcare workforce pipelines through readiness, role-based development and retention support.</p>
      </div>
      <div>
        <p className="footer-label">Explore</p>
        <Link href="/framework">Workforce Framework</Link>
        <Link href="/cpd">Staff CPD &amp; Capability</Link>
        <Link href="/engage">Ways to engage</Link>
        <Link href="/service-charter">Service Charter</Link>
        <Link href="/faq">Frequently asked questions</Link>
      </div>
      <div>
        <p className="footer-label">Contact</p>
        <a href="tel:+61411459755">+61 411 459 755</a>
        <a href="mailto:info@healthplusint.com.au">info@healthplusint.com.au</a>
        <address>Carlingford NSW</address>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Health Plus International Pty Ltd · ABN 13 155 901 723</span>
        <span><Link href="/privacy">Privacy Policy</Link> · Sydney &amp; Regional NSW · Australia</span>
      </div>
    </footer>
  );
}

export function ContactBand({
  heading,
  text,
}: {
  heading: string;
  text: string;
}) {
  return (
    <section className="seo-contact-band">
      <div>
        <p className="eyebrow light">Start with a clear requirement</p>
        <h2>{heading}</h2>
        <p>{text}</p>
      </div>
      <div className="button-row">
        <Link className="button button-gold" href="/#employer-request">
          Submit a workforce request <Arrow />
        </Link>
        <Link className="button capability-outline" href="/#worker-application">
          Register as a professional <Arrow />
        </Link>
      </div>
    </section>
  );
}

export { Arrow };
