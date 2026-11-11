import { posts } from "./posts";
import { pageMetadata } from "../seo-pages";
import PageSeo from "../PageSeo";
import "./blog.css";
export const metadata = pageMetadata("/blog");
export default function BlogPage() { return <main className="hpi-blog"><PageSeo path="/blog"/><header className="blog-intro"><p className="blog-kicker">PEOPLE · CARE · COMPLIANCE</p><h1>Blog &amp; Guides</h1><p>Practical guidance for healthcare employers and Healthcare Workers.</p><p>Plan your workforce, explore nursing registration and prepare for regional work with clear checklists and useful official resources.</p></header><div className="blog-grid">{posts.map(p=><article className="blog-card" key={p.slug}><p className="blog-kicker">{p.category}</p><h2><a href={`/blog/${p.slug}`}>{p.title}</a></h2><p>{p.description}</p><p className="blog-meta">{p.publishedLabel} · HPI</p><a href={`/blog/${p.slug}`}>Read guide →</a></article>)}</div><aside className="blog-cta"><h2>Ready to explore your next role?</h2><p>Tell us about your experience and preferred NSW regions.</p><a className="hpi-action" href="/work-with-us#apply">Find Healthcare Work</a></aside></main>; }
