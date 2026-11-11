import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, statSync } from 'node:fs';
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
