import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../dist/server/index.js';
const routes=['/','/employers','/work-with-us','/roles','/about','/why-hpi','/ahpra-registration-support','/faq','/privacy'];
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
test('sitemap includes all nine canonical public routes and robots advertises it',async()=>{
 const xml=await(await fetchPage('/sitemap.xml')).text();assert.equal((xml.match(/<url>/g)??[]).length,9);
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
