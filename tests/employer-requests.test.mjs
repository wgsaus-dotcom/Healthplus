import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../app/api/employer-requests/route.ts";

const valid = {
  organisation: "SYSTEM TEST", contact_name: "Migration check",
  email: "migration@example.com", role_types: "Other", location: "NSW",
  urgency: "Future workforce planning", workers_required: 1,
  privacy_consent: true, company: "", message: "Synthetic test only",
};
function request(body, type = "application/json") {
  return new Request("https://hpi.example/api/employer-requests", {
    method: "POST", headers: { "Content-Type": type },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("a confirmed CRM submission preserves its reference and original payload", async (t) => {
  let forwarded;
  t.mock.method(globalThis, "fetch", async (url, options) => {
    forwarded = { url, options };
    return Response.json({ reference: "HPI-EMP-TEST" }, { status: 201 });
  });
  const response = await POST(request(valid));
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true, reference: "HPI-EMP-TEST" });
  assert.equal(forwarded.url, "https://hpi-onboarding.wgs-aus.workers.dev/api/employer/request");
  assert.deepEqual(JSON.parse(forwarded.options.body), valid);
  assert.equal(forwarded.options.redirect, "error");
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("an upstream error or missing reference never reports a successful request", async (t) => {
  for (const upstream of [
    Response.json({ error: "unavailable" }, { status: 503 }),
    Response.json({ ok: true }),
  ]) {
    t.mock.method(globalThis, "fetch", async () => upstream);
    const response = await POST(request(valid));
    assert.equal(response.status, 502);
    assert.equal((await response.json()).reference, undefined);
    t.mock.restoreAll();
  }
});

test("a network failure returns an actionable error", async (t) => {
  t.mock.method(globalThis, "fetch", async () => { throw new Error("network failed"); });
  const response = await POST(request(valid));
  assert.equal(response.status, 502);
  assert.match((await response.json()).error, /temporarily unavailable/);
});

test("invalid requests are rejected before contacting the CRM", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch", async () => { throw new Error("unexpected"); });
  for (const payload of ["{", "[]", { ...valid, privacy_consent: false }, { ...valid, email: "invalid" }]) {
    const response = await POST(request(payload));
    assert.equal(response.status, 400);
  }
  assert.equal(fetch.mock.callCount(), 0);
});

test("oversized and non-JSON requests are rejected before contacting the CRM", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch", async () => { throw new Error("unexpected"); });
  assert.equal((await POST(request({ ...valid, message: "x".repeat(33000) }))).status, 413);
  assert.equal((await POST(request("plain text", "text/plain"))).status, 415);
  assert.equal(fetch.mock.callCount(), 0);
});

test("honeypot submissions are not forwarded", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch", async () => { throw new Error("unexpected"); });
  const response = await POST(request({ ...valid, company: "bot" }));
  assert.equal(response.status, 200);
  assert.equal(fetch.mock.callCount(), 0);
});


test("a non-JSON upstream response logs metadata without contact details", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response("upstream private content", {
    status: 403, headers: { "Content-Type": "text/html" },
  }));
  const log = t.mock.method(console, "error", () => {});
  const response = await POST(request(valid));
  assert.equal(response.status, 502);
  assert.equal(log.mock.callCount(), 1);
  const metadata = log.mock.calls[0].arguments[1];
  assert.equal(metadata.stage, "read-response");
  assert.equal(metadata.upstreamStatus, 403);
  assert.equal(metadata.upstreamContentType, "text/html");
  assert.equal(metadata.errorName, "SyntaxError");
  const logged = JSON.stringify(log.mock.calls[0].arguments);
  assert.ok(!logged.includes(valid.email));
  assert.ok(!logged.includes("upstream private content"));
});
