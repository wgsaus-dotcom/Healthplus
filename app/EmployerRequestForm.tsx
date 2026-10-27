"use client";

import { FormEvent, useRef, useState } from "react";

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

export default function EmployerRequestForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<SubmissionState>({ status: "idle" });

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const roles = data
      .getAll("roles")
      .filter((value): value is string => typeof value === "string");

    if (!roles.length) {
      setState({
        status: "error",
        message: "Please select at least one workforce role.",
      });
      return;
    }

    const details = [
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
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not submit your workforce request.",
      });
    }
  }

  return (
    <form className="worker-form employer-form" ref={formRef} onSubmit={submitRequest}>
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="employer-company">Company website</label>
        <input
          id="employer-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="form-grid">
        <label>
          <span>Organisation *</span>
          <input name="organisation" autoComplete="organization" required maxLength={200} />
        </label>
        <label>
          <span>Contact person *</span>
          <input name="contactName" autoComplete="name" required maxLength={160} />
        </label>
        <label>
          <span>Email address *</span>
          <input name="email" type="email" autoComplete="email" required maxLength={180} />
        </label>
        <label>
          <span>Phone number</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={50} />
        </label>
        <label>
          <span>Sector *</span>
          <select name="sector" required defaultValue="">
            <option value="" disabled>Select your sector</option>
            <option>Public health</option>
            <option>Private hospital or health service</option>
            <option>Residential aged care</option>
            <option>Home and community care</option>
            <option>Disability services</option>
            <option>Community services</option>
            <option>Regional or remote health</option>
            <option>Industrial or site health</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          <span>Service location *</span>
          <input
            name="location"
            required
            maxLength={300}
            placeholder="Town, region or facility"
          />
        </label>
        <label>
          <span>Number of workers *</span>
          <input name="workersRequired" type="number" min={1} max={10000} required />
        </label>
        <label>
          <span>Anticipated start date</span>
          <input name="startDate" type="date" />
        </label>
        <label>
          <span>Employment type *</span>
          <select name="employmentType" required defaultValue="">
            <option value="" disabled>Select employment type</option>
            <option>Permanent full-time</option>
            <option>Permanent part-time</option>
            <option>Fixed-term contract</option>
            <option>Casual or relief</option>
            <option>Agency or temporary</option>
            <option>To be discussed</option>
          </select>
        </label>
        <label>
          <span>Workforce pathway and timing *</span>
          <select name="urgency" required defaultValue="">
            <option value="" disabled>Select a pathway</option>
            <option>Immediate roster / bench mobilisation — subject to pre-verified pool availability</option>
            <option>Targeted sourcing — allow an indicative 2–4 weeks for complete compliance clearance</option>
            <option>Planned workforce pipeline — within 1–3 months</option>
            <option>Future workforce planning</option>
          </select>
          <small className="field-note">Timeframes are indicative and depend on role requirements, candidate availability and external screening or registration processes.</small>
        </label>
      </div>

      <fieldset className="role-selector">
        <legend>Workforce roles required *</legend>
        <div>
          {[
            "Registered Nurse",
            "Enrolled Nurse",
            "Assistant in Nursing",
            "Aged Care Worker",
            "Support Worker",
            "Allied Health",
            "Remote or Site Health",
            "Other",
          ].map((role) => (
            <label key={role}>
              <input type="checkbox" name="roles" value={role} />
              <span>{role}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="form-message">
        <span>Shift or roster requirements</span>
        <textarea
          name="roster"
          rows={3}
          maxLength={1200}
          placeholder="Shift pattern, roster cycle, on-call or accommodation details"
        />
      </label>

      <label className="form-message">
        <span>Mandatory qualifications and checks</span>
        <textarea
          name="mandatoryChecks"
          rows={3}
          maxLength={1200}
          placeholder="Registration, experience, licences, screening or role-specific requirements"
        />
      </label>

      <label className="form-message">
        <span>Workforce challenge and support required</span>
        <textarea
          name="workforceChallenge"
          rows={4}
          maxLength={1500}
          placeholder="Tell us about the vacancy pressure, likely duration and support you need"
        />
      </label>

      <label className="consent-check">
        <input name="privacyConsent" type="checkbox" value="yes" required />
        <span>
          I confirm I am authorised to submit this request and consent to Health Plus
          International securely storing and using these details to respond, as explained
          in the{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>.
        </span>
      </label>

      <div className="form-submit-row">
        <button className="button" type="submit" disabled={state.status === "submitting"}>
          {state.status === "submitting" ? "Submitting…" : "Submit Workforce Request"}
          <span aria-hidden="true">↗</span>
        </button>
        <p className="form-security">
          Please do not include patient information, identity documents or other
          sensitive records in this initial request.
        </p>
      </div>

      <div className="form-status" aria-live="polite">
        {state.status === "success" && (
          <p className="form-success">
            Thank you—your workforce request has been received. Reference:{" "}
            <strong>{state.reference}</strong>
          </p>
        )}
        {state.status === "error" && <p className="form-error">{state.message}</p>}
      </div>
    </form>
  );
}
