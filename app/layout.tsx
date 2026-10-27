import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://healthplusint.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Healthcare Workforce Development NSW | HPI",
    template: "%s | Health Plus International",
  },
  description:
    "HPI builds qualification-aligned healthcare workforce pipelines through verified readiness, role-based development and retention support across Sydney and regional NSW.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "Health Plus International",
    title: "Healthcare Workforce Development NSW | HPI",
    description:
      "HPI builds qualification-aligned healthcare workforce pipelines through verified readiness, role-based development and retention support across Sydney and regional NSW.",
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
    title: "Healthcare Workforce Development NSW | HPI",
    description:
      "HPI builds qualification-aligned healthcare workforce pipelines through verified readiness, role-based development and retention support across Sydney and regional NSW.",
    images: ["/assets/hero-nurse.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/assets/healthplus-mark.png",
    shortcut: "/assets/healthplus-mark.png",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Health Plus International",
      legalName: "Health Plus International Pty Ltd",
      url: siteUrl,
      logo: `${siteUrl}/assets/logo-healthplus-transparent.png`,
      image: `${siteUrl}/assets/hero-nurse.jpg`,
      slogan: "People · Care · Compliance",
      description:
        "Health Plus International is a healthcare workforce development organisation building qualification-aligned pipelines through verified readiness, structured CPD, early-placement continuity and retention support.",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "ABN",
        value: "13 155 901 723",
      },
      email: "info@healthplusint.com.au",
      telephone: "+61 411 459 755",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+61 411 459 755",
        email: "info@healthplusint.com.au",
        areaServed: "AU",
        availableLanguage: ["English"],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Carlingford",
        addressRegion: "NSW",
        addressCountry: "AU",
      },
      areaServed: [
        "Sydney",
        "Far West NSW",
        "Western NSW",
        "Murrumbidgee",
        "Hunter New England",
        "Northern NSW",
        "Mid North Coast",
      ],
      knowsAbout: [
        "Healthcare workforce development",
        "Rapid workforce response",
        "Healthcare workforce attraction and matching",
        "Enrolled nurse workforce pathways",
        "Assistants in nursing",
        "Aged care workforce",
        "Disability and community support workers",
        "Allied health workforce pathways",
        "Healthcare worker credentialling",
        "Regional workforce mobilisation",
        "Continuing professional development",
        "Staff capability development",
        "Role-based learning",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Health Plus International",
      inLanguage: "en-AU",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#workforce-service`,
      name: "Healthcare and Care Workforce Development",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: {
        "@type": "State",
        name: "New South Wales",
      },
      serviceType:
        "Healthcare workforce planning, attraction, matching, readiness, credentialling, deployment, support and retention",
      audience: [
        { "@type": "Audience", audienceType: "Healthcare facilities and services" },
        { "@type": "Audience", audienceType: "Healthcare workers" },
      ],
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/cpd#service`,
      name: "Staff Continuing Professional Development and Workforce Capability",
      url: `${siteUrl}/cpd`,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: {
        "@type": "Country",
        name: "Australia",
      },
      description:
        "Structured, role-relevant continuing professional development coordinated for HPI staff and approved workforce cohorts, including transition learning for selected international and relocating healthcare pathways.",
      serviceType:
        "Continuing professional development, role-based learning, regional transition support and workforce capability development",
      audience: [
        { "@type": "Audience", audienceType: "Health Plus International staff" },
        { "@type": "Audience", audienceType: "Participating workforce cohorts" },
        { "@type": "Audience", audienceType: "Client and partner teams under an agreed programme" },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
