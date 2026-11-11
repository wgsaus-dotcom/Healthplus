import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source = readFileSync('public/hpi-analytics.js','utf8');
function page(stored, hostname='healthplusint.com.au', brokenStorage=false) {
 const inserted=[], nodes=[], events={}, deletes=[]; let reloads=0, value=stored;
 const checkbox={checked:false};
 const document={readyState:'complete', head:{appendChild:x=>inserted.push(x)}, body:{appendChild:x=>nodes.push(x)},
 createElement:()=>({setAttribute(){},querySelector:()=>checkbox,showModal(){this.open=true},close(){this.open=false}}),
 addEventListener:(n,f)=>events[n]=f};
 Object.defineProperty(document,'cookie',{get:()=> '_ga=old; _ga_EZVR5R6CX8=old; necessary=keep',set:x=>deletes.push(x)});
 const window={addEventListener:(n,f)=>events[n]=f};
 const location={hostname,origin:'https://'+hostname,pathname:'/',reload:()=>reloads++};
 const localStorage={getItem:()=>{if(brokenStorage) throw Error();return value},setItem:(k,v)=>{if(brokenStorage)throw Error();value=v}};
 const ctx=vm.createContext({window,document,location,localStorage});vm.runInContext(source,ctx);
 return {window,inserted,nodes,deletes,events,checkbox,get value(){return value}, get reloads(){return reloads},rerun:()=>vm.runInContext(source,ctx),setValue:v=>value=v};
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
