import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, statSync } from 'node:fs';
import vm from 'node:vm';
import worker from '../dist/server/index.js';

test('mobile initial resources prioritise text, with a desktop-only photo preload', async () => {
  const response = await worker.fetch(new Request('https://healthplusint.com.au/'),
    { ASSETS: { fetch: async () => new Response('', { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} });
  const html = await response.text();
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(match => match[0]);
  const fonts = links.filter(link => /rel="preload"/.test(link) && /as="font"/.test(link));
  assert.equal(fonts.length, 2, 'heading and body fonts are discovered in the HTML');
  for (const font of fonts) {
    assert.match(font, /crossorigin="(?:anonymous)?"/i);
    assert.ok(statSync('public' + font.match(/href="([^"]+)"/)[1]).size < 14000);
  }
  const photoPreloads = links.filter(link => /rel="preload"/.test(link) && /hero-hpi-care/.test(link));
  assert.equal(photoPreloads.length, 1);
  assert.match(photoPreloads[0], /media="\(min-width: 601px\)"/);
  const hero = html.match(/<img[^>]*class="home-hero-image"[^>]*>/)[0];
  assert.match(hero, /loading="lazy"/);
  assert.doesNotMatch(hero, /fetchPriority="high"/i);
  assert.match(hero, /width="900" height="600"/);
  const variants = [...hero.matchAll(/(\/assets\/hero-hpi-care-[^\s"]+\.webp) (480|720)w/g)];
  assert.equal(variants.length, 2);
  for (const [, path, width] of variants) {
    assert.ok(statSync('public' + path).size < (width === '480' ? 20000 : 33000));
  }
});

const analytics = readFileSync('public/hpi-analytics.js', 'utf8');
function analyticsPage({ hostname = 'healthplusint.com.au', readyState = 'loading', idle = true } = {}) {
  const inserted = [], listeners = {}, pending = [];
  const window = {
    addEventListener(event, callback, options) { listeners[event] = { callback, options }; },
    setTimeout(callback) { pending.push(callback); },
  };
  if (idle) window.requestIdleCallback = callback => pending.push(callback);
  const document = { readyState, createElement: () => ({}), head: { appendChild: tag => inserted.push(tag) } };
  const context = vm.createContext({ window, document, location: { hostname } });
  return { window, inserted, listeners, pending, run: () => vm.runInContext(analytics, context) };
}

test('analytics queues exactly one view and loads after the page without interaction', () => {
  const page = analyticsPage(); page.run(); page.run();
  assert.equal(page.window.dataLayer.length, 2);
  assert.equal(page.window.dataLayer[1][0], 'config');
  assert.equal(page.window.dataLayer[1][1], 'G-EZVR5R6CX8');
  assert.equal(page.inserted.length, 0);
  assert.equal(page.listeners.load.options.once, true);
  page.listeners.load.callback();
  assert.equal(page.inserted.length, 0);
  page.pending.shift()();
  assert.equal(page.inserted.length, 1);
  assert.equal(page.inserted[0].async, true);
  assert.match(page.inserted[0].src, /G-EZVR5R6CX8$/);
});

test('analytics also loads after an already-completed document and without idle callback support', () => {
  for (const idle of [true, false]) {
    const page = analyticsPage({ readyState: 'complete', idle }); page.run();
    assert.equal(page.pending.length, 1);
    page.pending.shift()();
    assert.equal(page.inserted.length, 1);
  }
});

test('preview and test visits never load production analytics', () => {
  const page = analyticsPage({ hostname: 'terminal.local', readyState: 'complete' }); page.run();
  assert.equal(page.pending.length, 0);
  assert.equal(page.inserted.length, 0);
});
