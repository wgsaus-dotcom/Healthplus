import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter, ClosingPanel } from "./SiteChrome";

const siteUrl = "https://healthplusint.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Healthcare Workforce Development NSW | HPI",
    template: "%s | Health Plus International",
  },
  description:
    "Health Plus International recruits, employs and places healthcare workers in Sydney and regional NSW.",
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
      "Health Plus International recruits, employs and places healthcare workers in Sydney and regional NSW.",
    images: [
      {
        url: "/assets/hero-hpi-care.webp",
        width: 900,
        height: 600,
        alt: "Healthcare professional supporting an older woman",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Workforce Development NSW | HPI",
    description:
      "Health Plus International recruits, employs and places healthcare workers in Sydney and regional NSW.",
    images: ["/assets/hero-hpi-care.webp"],
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
    icon: "/assets/healthplus-mark.webp",
    shortcut: "/assets/healthplus-mark.webp",
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
      logo: `${siteUrl}/assets/logo-healthplus-transparent.webp`,
      image: `${siteUrl}/assets/hero-hpi-care.webp`,
      slogan: "People · Care · Compliance",
      description:
        "Health Plus International is a healthcare workforce development business in Helensburgh, NSW. We recruit, employ and place healthcare workers.",
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
        addressLocality: "Helensburgh",
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
        "Registered Nurses",
        "Assistants in Nursing",
        "Aged care workers",
        "Community support workers",
        "Allied health professionals",
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
        "Healthcare workforce recruitment, employment and placement",
      audience: [
        { "@type": "Audience", audienceType: "Healthcare facilities and services" },
        { "@type": "Audience", audienceType: "Healthcare workers" },
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
        <script src="/legacy-anchors.js" defer />
        <SiteHeader />
        {children}
        <ClosingPanel />
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
