import type { Metadata } from "next";
import { preload } from "react-dom";
import "./globals.css";
import { SiteHeader, SiteFooter, ClosingPanel } from "./SiteChrome";

const siteUrl = "https://healthplusint.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Healthcare Workforce Development NSW | Healthplus International",
    template: "%s | Healthplus International",
  },
  description:
    "Healthplus International recruits, employs and places healthcare workers in Sydney and regional NSW.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "Healthplus International",
    title: "Healthcare Workforce Development NSW | Healthplus International",
    description:
      "Healthplus International recruits, employs and places healthcare workers in Sydney and regional NSW.",
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
    title: "Healthcare Workforce Development NSW | Healthplus International",
    description:
      "Healthplus International recruits, employs and places healthcare workers in Sydney and regional NSW.",
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
      name: "Healthplus International",
      alternateName: "Health Plus International",
      legalName: "Westminster Green Solutions Pty Ltd",
      url: siteUrl,
      logo: `${siteUrl}/assets/logo-healthplus-transparent.webp`,
      image: `${siteUrl}/assets/hero-hpi-care.webp`,
      slogan: "People · Care · Compliance",
      description:
        "Healthplus International is a healthcare workforce development business in Helensburgh, NSW. We recruit, employ and place healthcare workers.",
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
        "Riverina",
        "Central Coast",
        "Newcastle",
        "Maitland",
        "Hunter New England",
        "Northern NSW",
        "Mid North Coast",
      ],
      sameAs: [
        "https://au.linkedin.com/company/health-plus-international-australia",
        "https://www.instagram.com/healthplusint/",
        "https://buy.nsw.gov.au/supplier/profile/12466498",
      ],
      knowsAbout: [
        "Registered nurses",
        "Enrolled nurses",
        "Doctors",
        "Assistants in nursing",
        "Aged care workers",
        "Community support workers",
        "Allied health professionals",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Healthplus International",
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
  // Resource hints avoid a CSS -> font request chain and React deduplicates them.
  preload("/assets/fonts/public-sans-latin-400-90e9d401.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/assets/fonts/public-sans-latin-700-f704aa5c.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="en-AU">
      <body>
        <script src="/hpi-analytics.js" defer />
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
