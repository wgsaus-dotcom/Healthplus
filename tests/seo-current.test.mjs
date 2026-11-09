import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../dist/server/index.js';
const routes=['/','/employers','/work-with-us','/roles','/about','/why-hpi','/ahpra-registration-support','/faq','/privacy','/regional-nsw-healthcare-workforce','/aged-care-workforce-nsw','/blog','/blog/nursing-registration-australia-overseas-nurses','/blog/life-in-rural-australia-healthcare-workers','/blog/first-regional-nursing-job-checklist'];
const env={ASSETS:{fetch:async()=>new Response('Not found',{status:404})}};
const ctx={waitUntil(){},passThroughOnException(){}};
const fetchPage=(path)=>worker.fetch(new Request(`https://healthplusint.com.au${path}`),env,ctx);
function schemas(html){return [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(m=>{const data=JSON.parse(m[1]);return data['@graph']??[data];});}
test('all public pages have unique metadata, self canonicals and one H1',async()=>{
 const titles=new Set(),descriptions=new Set();
 for(const path of routes){
  const res=await fetchPage(path);assert.equal(res.status,200,path);
  const html=await res.text();const title=html.match(/<title>(.*?)<\/title>/s)?.[1];
  const desc=html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  assert.ok(title&&desc,path);assert.ok(!titles.has(title),path);assert.ok(!descriptions.has(desc),path);titles.add(title);descriptions.add(desc);
  assert.ok(html.includes(`rel="canonical" href="https://healthplusint.com.au${path}"`),path);
  assert.equal([...html.matchAll(/<h1\b/g)].length,1,path);
  assert.doesNotMatch(html,/<meta[^>]+content="[^"]*noindex/);
  const data=schemas(html);assert.ok(data.some(d=>d['@id']===`https://healthplusint.com.au${path}#webpage`),path);
  if(path!=='/')assert.ok(data.some(d=>d['@type']==='BreadcrumbList'),path);
  if(['/employers','/work-with-us'].includes(path)){const images=data.filter(d=>d['@type']==='ImageObject');assert.equal(images.length,6);for(const image of images)assert.ok(image.copyrightNotice&&image.license);}
  if(['/employers','/ahpra-registration-support'].includes(path))assert.ok(data.some(d=>d['@id']===`https://healthplusint.com.au${path}#service`));
 }
});
test('sitemap includes all canonical public routes and robots advertises it',async()=>{
 const xml=await(await fetchPage('/sitemap.xml')).text();assert.equal((xml.match(/<url>/g)??[]).length,routes.length);
 for(const path of routes)assert.ok(xml.includes(`<loc>https://healthplusint.com.au${path==='/'?'':path}</loc>`),path);
 const robots=await(await fetchPage('/robots.txt')).text();assert.match(robots,/Sitemap: https:\/\/healthplusint.com.au\/sitemap.xml/);
});
test('HTTP and www permanently consolidate on HTTPS apex preserving path and query',async()=>{
 for(const origin of ['http://healthplusint.com.au','http://www.healthplusint.com.au','https://www.healthplusint.com.au']){
  const res=await worker.fetch(new Request(`${origin}/roles?region=western-nsw`),env,ctx);
  assert.equal(res.status,308);assert.equal(res.headers.get('location'),'https://healthplusint.com.au/roles?region=western-nsw');
 }
});
test('unknown public URLs return 404',async()=>{assert.equal((await fetchPage('/not-a-real-page')).status,404);});

test('regional landing page includes pathway, region links, working CTAs and licensed image', async()=>{
 const html=await(await fetchPage('/regional-nsw-healthcare-workforce')).text();
 assert.match(html,/Delivering Dedicated Healthcare Professionals to Regional NSW/);
 assert.match(html,/href="https:\/\/mccsc.org.au"/);
 assert.match(html,/href="\/employers#request"/);
 assert.match(html,/href="\/work-with-us#apply"/);
 assert.match(html,/Ahpra registration where required/);
 assert.ok(schemas(html).some(d=>d['@type']==='ImageObject' && d.copyrightNotice && d.license));
 assert.ok(schemas(html).some(d=>d['@id']==='https://healthplusint.com.au/regional-nsw-healthcare-workforce#service'));
});

test('regional SEO follows Healthcare Workers hierarchy and uses the regional social image',async()=>{
 const html=await(await fetchPage('/regional-nsw-healthcare-workforce')).text();
 const breadcrumb=schemas(html).find(d=>d['@type']==='BreadcrumbList');
 assert.deepEqual(breadcrumb.itemListElement.map(i=>[i.position,i.item]),[[1,'https://healthplusint.com.au/'],[2,'https://healthplusint.com.au/work-with-us'],[3,'https://healthplusint.com.au/regional-nsw-healthcare-workforce']]);
 assert.match(html,/<meta property="og:image" content="https:\/\/healthplusint.com.au\/assets\/regions\/murrumbidgee.webp"/);
 assert.match(html,/<title>Regional NSW Healthcare Workforce \| Healthplus International<\/title>/);
});

test('workforce and sponsorship metadata stays conditional and visible copy is preserved', async()=>{
 const employers=await(await fetchPage('/employers')).text();
 assert.match(employers,/<title>Healthcare Recruitment &amp; Staffing NSW/);
 assert.match(employers,/<h1>Request Healthcare Workers for Your NSW Facility<\/h1>/);
 const workers=await(await fetchPage('/work-with-us')).text();
 const description=workers.match(/<meta name="description" content="([^"]*)"/)?.[1];
 assert.match(description,/business sponsorship/);
 assert.match(description,/Skills in Demand visa \(subclass 482 \/ SC482\), subject to eligibility/);
 assert.match(workers,/Build Your Healthcare Career with Healthplus\./);
 assert.match(workers,/sponsorship is not guaranteed/);
});

test('retired static links and URL variants redirect once to working canonical pages and anchors',async()=>{
 const links=[
  ['/ahpra-verify','/ahpra-registration-support',''],['/ahpra-verify.html','/ahpra-registration-support',''],
  ['/index.html','/',''],['/about.html','/about',''],
  ['/contact','/','#contact'],['/contact.html','/','#contact'],
  ['/join','/work-with-us','#apply'],['/join.html','/work-with-us','#apply'],
  ['/submit-a-request','/employers','#request'],['/submit-a-request.html','/employers','#request'],
  ['/aged-care','/aged-care-workforce-nsw',''],['/aged-care.html','/aged-care-workforce-nsw',''],
  ['/ain','/roles','#assistants-in-nursing'],['/ain.html','/roles','#assistants-in-nursing'],
  ['/allied-health','/roles','#allied-health'],['/allied-health.html','/roles','#allied-health'],
  ['/services-remote','/regional-nsw-healthcare-workforce',''],['/services-remote.html','/regional-nsw-healthcare-workforce',''],
  ['/how-we-work','/about','#how-we-work'],['/how-we-work.html','/about','#how-we-work'],
  ['/our-pillars','/why-hpi',''],['/our-pillars.html','/why-hpi',''],
  ['/workforce/enrolled-nurses','/roles','#enrolled-nurses'],['/workforce/allied-health','/roles','#allied-health'],
  ['/regions/far-west-nsw.html','/employers','#region-far-west-nsw'],['/regions/northern-nsw','/employers','#region-northern-nsw'],
  ['/partnership/employer-role-requirements','/employers','#request'],
  ['/partnership/readiness-credential-controls','/employers',''],
  ['/partnership/deployment-workforce-support','/employers',''],
  ['/partnership/performance-retention-reporting','/employers',''],
 ];
 for(const [from,path,hash] of links){
  const response=await worker.fetch(new Request(`http://www.healthplusint.com.au${from}?source=legacy`),env,ctx);
  assert.equal(response.status,301,from);
  const target=new URL(response.headers.get('location'));
  assert.equal(target.origin,'https://healthplusint.com.au');
  assert.equal(target.pathname,path);assert.equal(target.hash,hash);assert.equal(target.search,'?source=legacy');
  const page=await fetchPage(target.pathname+target.search);assert.equal(page.status,200,from);
  if(hash)assert.ok((await page.text()).includes(`id="${hash.slice(1)}"`),from);
 }
 const slash=await fetchPage('/employers/?role=registered-nurses');
 assert.equal(slash.status,308);assert.equal(slash.headers.get('location'),'https://healthplusint.com.au/employers?role=registered-nurses');
 const unknown=await fetchPage('/not-a-real-page/');
 assert.equal(unknown.status,308);
 assert.equal((await fetchPage(new URL(unknown.headers.get('location'),'https://healthplusint.com.au').pathname)).status,404);
});

test('unknown retired-looking routes stay 404 and HEAD redirects preserve enquiry parameters',async()=>{
 for(const path of ['/partnership/not-a-real-page','/regions/not-a-real-region','/workforce/not-a-real-role']){
  assert.equal((await fetchPage(path)).status,404,path);
 }
 const response=await worker.fetch(new Request('http://www.healthplusint.com.au/allied-health/?source=search&role=allied-health',{method:'HEAD'}),env,ctx);
 assert.equal(response.status,301);
 assert.equal(response.headers.get('location'),'https://healthplusint.com.au/roles?source=search&role=allied-health#allied-health');
});

test('search-focused content connects allied health, overseas nurse guidance and HPI Instagram',async()=>{
 const roles=await(await fetchPage('/roles?source=search')).text();
 assert.match(roles,/rel="canonical" href="https:\/\/healthplusint.com.au\/roles"/);
 assert.match(roles,/Allied Health Recruitment in Sydney and Regional NSW/);
 assert.match(roles,/Ahpra registration where the profession requires it/);
 assert.match(roles,/href="\/employers\?role=allied-health#request"/);
 assert.match(roles,/href="\/work-with-us\?profession=allied-health#apply"/);
 const employers=await(await fetchPage('/employers')).text();
 assert.match(employers,/href="\/roles#allied-health"/);
 const support=await(await fetchPage('/ahpra-registration-support')).text();
 assert.match(support,/<h1>AHPRA Registration <em>Support for Overseas Nurses<\/em><\/h1>/);
 assert.match(support,/href="\/blog\/nursing-registration-australia-overseas-nurses"/);
 const home=await(await fetchPage('/')).text();
 const org=schemas(home).find(d=>d['@id']==='https://healthplusint.com.au/#organization');
 assert.ok(org.sameAs.includes('https://www.instagram.com/healthplusint/'));
 assert.match(home,/href="https:\/\/www.instagram.com\/healthplusint\/"/);
});

test('alternate Worker host remains excluded while canonical public pages stay indexable',async()=>{
 const preview=await worker.fetch(new Request('https://hpi-website.example.workers.dev/roles'),env,ctx);
 assert.equal(preview.status,200);
 assert.equal(preview.headers.get('x-robots-tag'),'noindex, follow');
 const production=await fetchPage('/roles');
 assert.equal(production.status,200);
 assert.doesNotMatch(production.headers.get('x-robots-tag')??'',/noindex/i);
});


test('aged care page has matching FAQ, service, employer hierarchy and working conversion links',async()=>{
 const html=await(await fetchPage('/aged-care-workforce-nsw')).text();
 const data=schemas(html);
 assert.match(html,/<title>Aged Care Workforce Providers NSW \| Healthplus International<\/title>/);
 assert.ok(data.some(d=>d['@id']==='https://healthplusint.com.au/aged-care-workforce-nsw#service'));
 const breadcrumb=data.find(d=>d['@type']==='BreadcrumbList');
 assert.deepEqual(breadcrumb.itemListElement.map(i=>i.item),['https://healthplusint.com.au/','https://healthplusint.com.au/employers','https://healthplusint.com.au/aged-care-workforce-nsw']);
 const faq=data.find(d=>d['@type']==='FAQPage');assert.equal(faq.mainEntity.length,6);
 for(const q of faq.mainEntity){assert.ok(html.includes(q.name));assert.ok(html.includes(q.acceptedAnswer.text));}
 assert.match(html,/href="\/employers#request"/);
 assert.match(html,/href="\/regional-nsw-healthcare-workforce"/);
 assert.doesNotMatch(html,/<form\b/);
 assert.match(html,/1 November 2025/);
 assert.match(html,/Your facility remains responsible/);
 const employer=await(await fetchPage('/employers')).text();assert.match(employer,/href="\/aged-care-workforce-nsw"/);assert.match(employer,/id="request"/);
 for(const link of [...html.matchAll(/href="(\/roles#[^"]+)"/g)]){const [path,id]=link[1].split('#');const target=await(await fetchPage(path)).text();assert.ok(target.includes(`id="${id}"`));}
});
