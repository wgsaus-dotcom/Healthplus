import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { Miniflare } from "miniflare";

test("the built employer route forwards successfully in the Workers runtime", async () => {
  const root = fileURLToPath(new URL("../dist/server/", import.meta.url));
  const paths = ["index.js", ...readdirSync(root, { recursive: true })
    .filter((path) => path.endsWith(".js") && path !== "index.js")];
  const payload = {
    organisation: "SYSTEM TEST", contact_name: "Local runtime check",
    email: "test@example.com", role_types: "Other", location: "NSW",
    urgency: "Future planning", workers_required: 1,
    privacy_consent: true, company: "",
  };
  let calls = 0;
  const runtime = new Miniflare({
    modules: paths.map((path) => ({ type: "ESModule", path: root + path })),
    modulesRoot: root,
    // The installed local workerd binary supports dates through May 22.
    // Keep production's compatibility date unchanged.
    compatibilityDate: "2026-05-22",
    compatibilityFlags: ["nodejs_compat"],
    outboundService: async (request) => {
      calls++;
      assert.equal(request.url, "https://hpi-onboarding.wgs-aus.workers.dev/api/employer/request");
      assert.equal(request.method, "POST");
      assert.deepEqual(await request.json(), payload);
      return Response.json({ reference: "HPI-LOCAL-RUNTIME-TEST" }, { status: 201 });
    },
  });
  try {
    const response = await runtime.dispatchFetch("http://localhost/api/employer-requests", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), { ok: true, reference: "HPI-LOCAL-RUNTIME-TEST" });
    assert.equal(calls, 1);
  } finally {
    await runtime.dispose();
  }
});
