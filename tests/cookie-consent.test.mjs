import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source = readFileSync(process.env.HPI_ANALYTICS_TEST_ASSET || 'public/hpi-analytics.js','utf8');
function page(stored, hostname='healthplusint.com.au', brokenStorage=false, {pathname='/', search='', hash='', referrer='', hasForm=false}={}) {
 const inserted=[], nodes=[], events={}, deletes=[]; let reloads=0, value=stored;
 const checkbox={checked:false}, replayBox={checked:false};
 const document={readyState:'complete', head:{appendChild:x=>inserted.push(x)}, body:{appendChild:x=>nodes.push(x)},
 referrer, querySelector:()=>hasForm ? {} : null,
 createElement:()=>({setAttribute(){},remove(){this.removed=true;},querySelector:(selector)=>selector==='#hpi-allow-replay' ? replayBox : checkbox,showModal(){this.open=true},close(){this.open=false}}),
 addEventListener:(n,f)=>events[n]=f};
 Object.defineProperty(document,'cookie',{get:()=> '_ga=old; _ga_EZVR5R6CX8=old; _clck=old; _clsk=old; necessary=keep',set:x=>deletes.push(x)});
 const window={navigation:{addEventListener:(n,f)=>events[n]=f},addEventListener:(n,f)=>events[n]=f};
 const location={hostname,origin:'https://'+hostname,pathname,search,hash,reload:()=>reloads++};
 const localStorage={getItem:()=>{if(brokenStorage) throw Error();return value},setItem:(k,v)=>{if(brokenStorage)throw Error();value=v}};
 const ctx=vm.createContext({window,document,location,localStorage,URL});vm.runInContext(source,ctx);
 return {window,location,inserted,nodes,deletes,events,checkbox,replayBox,get value(){return value}, get reloads(){return reloads},rerun:()=>vm.runInContext(source,ctx),setValue:v=>value=v};
}
const stored=(analytics,time=Date.now())=>JSON.stringify({version:1,analytics,time});
test('new visitors never load Google, and legacy analytics cookies are removed',()=>{const p=page();assert.equal(p.inserted.length,0);assert.equal(p.nodes[0].hidden,false);assert.ok(p.deletes.length);assert.ok(p.deletes.every(x=>!x.startsWith('necessary=')));});
test('accept loads once and rejects advertising consent',()=>{const p=page();p.window.HPIConsent.save(true);p.window.HPIConsent.save(true);p.rerun();assert.equal(p.inserted.length,2);assert.equal(JSON.parse(p.value).analytics,true);assert.equal(p.window.dataLayer[0][2].ad_storage,'denied');assert.equal(p.window.dataLayer[2][2].allow_google_signals,false);});
test('reject persists and never downloads analytics',()=>{const p=page();p.window.HPIConsent.save(false);assert.equal(p.inserted.length,0);assert.equal(page(p.value).inserted.length,0);assert.equal(p.nodes[0].hidden,true);});
test('saved acceptance runs but expired, malformed, future or unknown choices fail closed',()=>{assert.equal(page(stored(true)).inserted.length,2);for(const s of ['bad','null',stored(true,0),stored(true,Date.now()+86400000),'{"version":9,"analytics":true}']){const p=page(s);assert.equal(p.inserted.length,0);assert.equal(p.nodes[0].hidden,false)}});
test('withdrawal disables analytics, clears cookies and reloads to remove listeners',()=>{const p=page(stored(true));p.window.HPIConsent.save(false);assert.equal(p.window['ga-disable-G-EZVR5R6CX8'],true);assert.equal(p.reloads,1);assert.equal(page(p.value).inserted.length,0)});
test('preference changes in another tab revoke current tracking',()=>{const p=page(stored(true));p.setValue(stored(false));p.events.storage({key:'hpi-cookie-choice-v1'});assert.equal(p.reloads,1)});
test('blocked storage remains usable and previews do not pollute production analytics',()=>{const p=page(null,'healthplusint.com.au',true);assert.equal(p.inserted.length,0);p.window.HPIConsent.save(false);assert.equal(p.inserted.length,0);assert.equal(page(stored(true),'terminal.local').inserted.length,0)});
test('manage preferences reflects the saved selection without implicit acceptance',()=>{const p=page();p.window.HPIConsent.open();assert.equal(p.checkbox.checked,false);assert.equal(p.nodes[1].open,true);assert.equal(p.inserted.length,0)});

test('Metricool uses the supplied account only once after permission',()=>{const p=page();p.window.HPIConsent.save(true);const tag=p.inserted.find(x=>x.src==='https://tracker.metricool.com/resources/be.js');assert.ok(tag);const calls=[];p.window.beTracker={t:x=>calls.push(x)};tag.onload();tag.onload();assert.equal(calls.length,1);assert.equal(calls[0].hash,'c8e5c8f57752e29b2baf29f4b8e3aa6c');});
test('Metricool download finishing after withdrawal sends nothing',()=>{const p=page(stored(true));const tag=p.inserted.find(x=>x.src.includes('metricool'));const calls=[];p.window.beTracker={t:x=>calls.push(x)};p.window.HPIConsent.save(false);tag.onload();assert.equal(calls.length,0);});


const clarityURL = 'https://www.clarity.ms/tag/zk2c9x902o';
const hasClarity = p => p.inserted.some(tag => tag.src === clarityURL);
const replayChoice = {version:1, analytics:true, replay:true, time:Date.now()};
test('existing analytics choices never opt in to replays',()=>{
 const p=page(stored(true));
 assert.equal(p.inserted.length,2);
 assert.equal(hasClarity(p),false);
 p.window.HPIConsent.open();
 assert.equal(p.checkbox.checked,true);
 assert.equal(p.replayBox.checked,false);
});
test('express replay permission loads once and never allows ads',()=>{
 const p=page();
 p.window.HPIConsent.save(true,true);
 p.window.HPIConsent.save(true,true);
 p.rerun();
 assert.equal(p.inserted.filter(t=>t.src===clarityURL).length,1);
 assert.equal(p.window.clarity.q[0][0],'consentv2');
 assert.equal(p.window.clarity.q[0][1].analytics_Storage,'granted');
 assert.equal(p.window.clarity.q[0][1].ad_Storage,'denied');
 assert.equal(JSON.parse(p.value).replay,true);
});
test('replay can be enabled independently of ordinary analytics',()=>{
 const p=page();
 p.window.HPIConsent.save(false,true);
 assert.deepEqual(p.inserted.map(t=>t.src),[clarityURL]);
});
test('replays fail closed on forms, unsafe URLs and all nonproduction hosts',()=>{
 const fresh=JSON.stringify(replayChoice);
 for(const pathname of ['/work-with-us','/employers','/api/worker-applications','/staff','/privacy','/unknown']){
  assert.equal(hasClarity(page(fresh,'healthplusint.com.au',false,{pathname})),false,pathname);
 }
 for(const hostname of ['staff.healthplusint.com.au','crm.healthplusint.com.au','preview.workers.dev']){
  assert.equal(hasClarity(page(fresh,hostname)),false,hostname);
 }
 for (const opts of [{search:'?email=example'},{hasForm:true},{referrer:'https://healthplusint.com.au/work-with-us'},{referrer:'https://www.example.com/?identifier=example'}]) {
  assert.equal(hasClarity(page(fresh,'healthplusint.com.au',false,opts)),false);
 }
 assert.equal(hasClarity(page(fresh,'healthplusint.com.au',false,{pathname:'/about',referrer:'https://healthplusint.com.au/'})),true);
 assert.equal(hasClarity(page(fresh,'www.healthplusint.com.au')),true);
});
test('withdrawing replay revokes consent, clears Clarity cookies, and reloads without replay',()=>{
 const p=page(JSON.stringify(replayChoice));
 p.window.HPIConsent.save(true,false);
 assert.equal(p.window.clarity.q[1][1].analytics_Storage,'denied');
 assert.ok(p.deletes.some(item=>item.startsWith('_clck=')));
 assert.ok(p.deletes.some(item=>item.startsWith('_clsk=')));
 assert.equal(p.reloads,1);
 assert.equal(hasClarity(page(p.value)),false);
 assert.equal(page(p.value).inserted.length,2);
});
test('reopening a cached page after replay withdrawal reloads tracking-free',()=>{
 const p=page(JSON.stringify(replayChoice));
 p.setValue(stored(false));
 p.events.pageshow({persisted:true});
 assert.equal(p.reloads,1);
});

test('fragment landing pages never request the replay tag even when opted in',()=>{
 const p=page(JSON.stringify(replayChoice),'healthplusint.com.au',false,{hash:'#qa-inert'});
 assert.equal(hasClarity(p),false);
 assert.equal(p.inserted.length,2);
});
test('same-document fragment navigation stops replay before the URL commits',()=>{
 const p=page(JSON.stringify(replayChoice));
 const calls=[];
 p.window.clarity=(...args)=>calls.push(args);
 p.window.clarity.v='test';
 p.events.navigate({destination:{sameDocument:true,url:'https://healthplusint.com.au/#qa-inert'}});
 assert.deepEqual(calls,[['stop']]);
 assert.equal(p.location.hash,'');
 assert.equal(p.inserted.find(t=>t.src===clarityURL).removed,true);
 p.location.hash='#qa-inert';
 p.events.hashchange();
 p.events.popstate();
 assert.equal(p.reloads,1);
 assert.equal(JSON.parse(p.value).replay,true);
});
test('hashchange fallback clears queued consent and reloads without toggling preference',()=>{
 const p=page(JSON.stringify(replayChoice));
 p.location.hash='#qa-inert';
 p.events.hashchange();
 assert.equal(p.window.clarity.q.length,0);
 assert.equal(p.inserted.find(t=>t.src===clarityURL).removed,true);
 assert.equal(p.reloads,1);
 assert.equal(JSON.parse(p.value).replay,true);
});
