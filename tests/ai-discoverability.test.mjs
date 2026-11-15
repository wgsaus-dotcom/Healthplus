import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("AI search crawler policy names current discovery agents", () => {
  const robotsSource = read("app/robots.ts");
  for (const agent of ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Googlebot", "Bingbot"]) {
    assert.ok(robotsSource.includes(agent), `Missing ${agent}`);
  }
  assert.match(robotsSource, /\/api\//);
  assert.match(robotsSource, /https:\/\/healthplusint\.com\.au\/sitemap\.xml/);
});

test("AI reference files represent the current workforce-development model", () => {
  for (const path of ["public/llms.txt", "public/llms-full.txt"]) {
    const content = read(path);
    assert.match(content, /recruits, employs and places/i, path);
    assert.match(content, /healthcare workforce development/i, path);
    assert.match(content, /https:\/\/healthplusint\.com\.au\/employers/, path);
    assert.match(content, /https:\/\/healthplusint\.com\.au\/work-with-us/, path);
    assert.match(content, /info@healthplusint\.com\.au/, path);
    assert.doesNotMatch(content, /24.hour response|24\/7 staffing promise|connect@healthplusint\.com\.au/i, path);
  }
});

test("AI reference index links to existing canonical source routes", () => {
  const index = read("public/llms.txt");
  const routes = read("app/seo-pages.ts");
  for (const path of ["/employers", "/work-with-us", "/roles", "/aged-care-workforce-nsw", "/regional-nsw-healthcare-workforce", "/ahpra-registration-support", "/faq"]) {
    assert.ok(index.includes(`https://healthplusint.com.au${path}`), path);
    assert.ok(routes.includes(`"${path}"`), `Route absent from SEO registry: ${path}`);
  }
});
