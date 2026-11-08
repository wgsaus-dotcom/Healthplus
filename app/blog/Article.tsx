import { posts } from "./posts";
import { siteUrl } from "../seo-pages";
import "./blog.css";
export default function Article({ slug }: { slug: string }) {
 const post = posts.find(p => p.slug === slug)!;
 const url = `${siteUrl}/blog/${slug}`;
 const schema = { "@context": "https://schema.org", "@graph": [
 { "@type": "BlogPosting", "@id": `${url}#article`, headline: post.title, description: post.description, datePublished: "2026-11-08", dateModified: "2026-11-08", author: { "@type": "Organization", name: "Healthplus International", url: siteUrl }, publisher: { "@id": `${siteUrl}/#organization` }, mainEntityOfPage: { "@id": `${url}#webpage` }, inLanguage: "en-AU" },
 { "@type": "WebPage", "@id": `${url}#webpage`, url, name: post.title },
 { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Blog & Guides", item: `${siteUrl}/blog` }, { "@type": "ListItem", position: 3, name: post.title, item: url }] }
 ] };
 return <main className="hpi-blog"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
 <nav className="blog-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/blog">Blog &amp; Guides</a></nav>
 <article className="blog-article"><header><p className="blog-kicker">{post.category}</p><h1>{post.title}</h1><p className="blog-meta">By Healthplus International · Published 8 November 2026</p><p className="blog-lead">{post.intro}</p></header>
 <nav className="blog-contents" aria-label="In this guide"><strong>In this guide</strong><ol>{post.sections.map(([heading],i)=><li key={heading}><a href={`#section-${i+1}`}>{heading}</a></li>)}</ol></nav>
 {post.sections.map(([heading,body],i)=><section id={`section-${i+1}`} key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
 <section className="blog-sources"><h2>Official sources and further reading</h2><p>Sources checked 8 November 2026. Requirements and local arrangements can change; use current official guidance for your circumstances.</p><ul>{post.sources.map(([label,href])=><li key={href}><a href={href}>{label}</a></li>)}</ul></section>
 <aside className="blog-cta"><h2>Your next step</h2><a className="hpi-action" href={post.href}>{post.cta}</a></aside>
 </article><section className="blog-related"><h2>Keep reading</h2><div className="blog-grid">{posts.filter(p=>p.slug!==slug).map(p=><a className="blog-card" href={`/blog/${p.slug}`} key={p.slug}><span className="blog-kicker">{p.category}</span><h3>{p.title}</h3><p>{p.description}</p><span>Read guide →</span></a>)}</div></section></main>;
}
