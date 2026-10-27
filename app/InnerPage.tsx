import type { Metadata } from "next";
import "./inner-pages.css";

export function innerMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title, description, url: path,
      images: [{ url: "/assets/hero-hpi-care.webp", width: 900, height: 600, alt: "Healthcare professional supporting an older woman" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/assets/hero-hpi-care.webp"] },
  };
}

export function PageIntro({ title, children }: { title: string; children?: React.ReactNode }) {
  return <header className="inner-intro"><h1>{title}</h1>{children && <p>{children}</p>}</header>;
}
