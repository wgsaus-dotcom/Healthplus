// Keep the existing HPI CRM as the system of record. The browser submits to
// this site's origin; this fixed server-side destination avoids a dependency
// on the CRM's browser CORS allowlist during domain migration.
const CRM_ENDPOINT =
  "https://hpi-onboarding.wgs-aus.workers.dev/api/employer/request";
const MAX_BODY_BYTES = 32 * 1024;

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") ?? "")) {
    return json({ error: "Please submit the workforce request using the form." }, 415);
  }

  let payload: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ error: "Your workforce request is empty." }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return json({ error: "Please shorten your workforce request and try again." }, 413);
      }
      chunks.push(chunk.value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return json({ error: "Please check your workforce request and try again." }, 400);
    }
    payload = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "Please check your workforce request and try again." }, 400);
  }

  if (typeof payload.company === "string" && payload.company.trim()) {
    return json({ ok: true, reference: "HPI-RECEIVED" }, 200);
  }

  const required = ["organisation", "contact_name", "email", "role_types", "location", "urgency"];
  if (required.some((key) => typeof payload[key] !== "string" || !String(payload[key]).trim()) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(payload.email)) ||
      !Number.isInteger(payload.workers_required) ||
      Number(payload.workers_required) < 1 || Number(payload.workers_required) > 10000 ||
      payload.privacy_consent !== true) {
    return json({ error: "Please complete the required fields and provide consent." }, 400);
  }

  let stage = "connect";
  let upstreamStatus: number | undefined;
  let upstreamContentType: string | null = null;
  try {
    const response = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      redirect: "error",
      signal: AbortSignal.timeout(15000),
    });
    upstreamStatus = response.status;
    upstreamContentType = response.headers.get("content-type");
    stage = "read-response";
    const result = await response.json() as { reference?: unknown; error?: unknown };
    if (!response.ok || typeof result.reference !== "string" || !result.reference.trim()) {
      console.error("HPI employer request failed", { stage: "confirm-reference", upstreamStatus, upstreamContentType });
      return json({ error: "Your workforce request could not be confirmed. Please contact HPI or try again." }, 502);
    }
    return json({ ok: true, reference: result.reference }, 201);
  } catch (error) {
    // Log connection metadata only. Never log applicant/contact details,
    // request payloads, response bodies, or exception messages.
    console.error("HPI employer request failed", {
      stage, upstreamStatus, upstreamContentType,
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return json({ error: "The workforce request service is temporarily unavailable. Please try again or contact HPI." }, 502);
  }
}
