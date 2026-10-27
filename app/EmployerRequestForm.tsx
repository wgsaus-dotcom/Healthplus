"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { roleValue, workforceRoles } from "./form-options";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string };

type EmployerRequestResult = {
  error?: string;
  message?: string;
  reference?: string;
};

export default function EmployerRequestForm({ initialRole = "" }: { initialRole?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<SubmissionState>({ status: "idle" });

  const inFlight = useRef(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(() => roleValue(initialRole) ? [roleValue(initialRole)] : []);
  useEffect(() => { setSelectedRoles(roleValue(initialRole) ? [roleValue(initialRole)] : []); }, [initialRole]);

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);

    const roles = data
      .getAll("roles")
      .filter((value): value is string => typeof value === "string");

    if (!roles.length) {
      setState({
        status: "error",
        message: "Please select at least one workforce role.",
      });
      form.querySelector<HTMLInputElement>('input[name="roles"]')?.focus();
      return;
    }

    const details = [
      `Additional information: ${String(data.get("notes") || "")}`,
      `Company website: ${String(data.get("website") || "")}`,
      `Sector: ${String(data.get("sector") || "")}`,
      `Employment type: ${String(data.get("employmentType") || "")}`,
      `Shift / roster requirements: ${String(data.get("roster") || "Not specified")}`,
      `Mandatory qualifications / checks: ${String(data.get("mandatoryChecks") || "Not specified")}`,
      `Workforce challenge and support required: ${String(data.get("workforceChallenge") || "Not specified")}`,
    ].join("\n");

    const payload = {
      organisation: String(data.get("organisation") || ""),
      contact_name: String(data.get("contactName") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      role_types: roles.join(", "),
      location: String(data.get("location") || ""),
      workers_required: Number(data.get("workersRequired") || 1),
      start_date: String(data.get("startDate") || ""),
      urgency: String(data.get("urgency") || ""),
      message: details,
      privacy_consent: data.get("privacyConsent") === "yes",
      source: "hpi-website",
      company: String(data.get("company") || ""),
    };

    inFlight.current = true;
    setState({ status: "submitting" });

    try {
      const response = await fetch(
        "/api/employer-requests",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = (await response.json()) as EmployerRequestResult;

      if (!response.ok || !result.reference) {
        throw new Error(result.error || "We could not submit your workforce request.");
      }

      setState({ status: "success", reference: result.reference });
      formRef.current?.reset();
      setSelectedRoles(roleValue(initialRole) ? [roleValue(initialRole)] : []);
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not submit your workforce request.",
      });
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <form className="worker-form employer-form" ref={formRef} onSubmit={submitRequest} onInvalid={event => {
      const optional = (event.target as HTMLElement).closest("details");
      if (optional) optional.open = true;
    }}>
      <div className="form-honeypot" aria-hidden="true"><label htmlFor="employer-company">Company</label><input id="employer-company" name="company" tabIndex={-1} autoComplete="off" /></div>
      <div className="form-grid">
        <label><span>Organisation *</span><input name="organisation" autoComplete="organization" required maxLength={200} /></label>
        <label><span>Contact person *</span><input name="contactName" autoComplete="name" required maxLength={160} /></label>
        <label><span>Email *</span><input name="email" type="email" autoComplete="email" required maxLength={180} /></label>
        <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" maxLength={50} /></label>
        <label><span>Service location *</span><input name="location" required maxLength={300} /></label>
        <label><span>Number of workers *</span><input name="workersRequired" type="number" min={1} max={10000} required /></label>
        <label><span>When you need them *</span><select name="urgency" required defaultValue="">
          <option value="" disabled>Choose timing</option>
          <option>Immediate roster / bench mobilisation — subject to pre-verified pool availability</option>
          <option>Targeted sourcing — allow an indicative 2–4 weeks for complete compliance clearance</option>
          <option>Planned workforce pipeline — within 1–3 months</option>
          <option>Future workforce planning</option>
        </select><small>Timeframes are indicative and depend on role requirements, candidate availability and external screening or registration processes.</small></label>
      </div>
      <fieldset className="role-selector" aria-required="true"><legend>Roles required *</legend><div>{workforceRoles.map(role => <label key={role.value}><input type="checkbox" name="roles" value={role.value} checked={selectedRoles.includes(role.value)} onChange={event => setSelectedRoles(current => event.target.checked ? [...current, role.value] : current.filter(value => value !== role.value))} /><span>{role.label}</span></label>)}</div></fieldset>
      <label className="form-message"><span>Anything we should know?</span><textarea name="notes" rows={3} maxLength={1500} /><small>Useful to us: the service, the duties, how long you need the worker, supervision arrangements and any mandatory evidence.</small></label>
      <details className="form-optional"><summary>Add detail (optional)</summary><div className="form-grid">
        <label><span>Sector</span><select name="sector" defaultValue=""><option value="">Choose a sector</option><option>Public health</option><option>Private hospital or health service</option><option>Residential aged care</option><option>Home and community care</option><option>Community services</option><option>Regional health</option><option>Other</option></select></label>
        <label><span>Employment type</span><select name="employmentType" defaultValue=""><option value="">Choose employment type</option><option>Permanent full-time</option><option>Permanent part-time</option><option>Fixed-term contract</option><option>Casual or relief</option><option>Agency or temporary</option><option>To be discussed</option></select></label>
        <label><span>Anticipated start date</span><input name="startDate" type="date" /></label>
        <label><span>Company website</span><input name="website" type="url" maxLength={300} /></label>
        <label><span>Shift or roster needs</span><textarea name="roster" rows={3} maxLength={1200} /></label>
        <label><span>Mandatory qualifications and checks</span><textarea name="mandatoryChecks" rows={3} maxLength={1200} /></label>
        <label><span>Workforce challenge</span><textarea name="workforceChallenge" rows={3} maxLength={1500} /></label>
      </div></details>
      <label className="consent-check"><input name="privacyConsent" type="checkbox" value="yes" required /><span>I confirm I am authorised to submit this request and consent to Health Plus International securely storing and using these details to respond, as explained in the <a href="/privacy">Privacy Policy</a>.</span></label>
      <div className="form-submit-row"><button className="hpi-action" type="submit" disabled={state.status === "submitting"}>{state.status === "submitting" ? "Submitting…" : "Submit request"}</button><p className="form-security">Do not include patient information, identity documents or sensitive records.</p></div>
      <div className="form-status" aria-live="polite">{state.status === "success" && <p className="form-success">Thank you. We will acknowledge your request the same business day. Your contact will be named in our reply.</p>}{state.status === "error" && <p className="form-error">{state.message}</p>}</div>
    </form>
  );
}
