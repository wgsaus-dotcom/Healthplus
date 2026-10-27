"use client";

import { FormEvent, useRef, useState } from "react";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string };

const stepLabels = ["Basic details", "Review & submit"];

export default function WorkerApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<SubmissionState>({ status: "idle" });
  const [fileName, setFileName] = useState("");
  const [step, setStep] = useState(1);

  function nextStep() {
    const panel = formRef.current?.querySelector(`[data-form-step="${step}"]`);
    const controls = panel?.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >("input, select, textarea");

    for (const control of controls ?? []) {
      if (!control.reportValidity()) return;
    }

    setState({ status: "idle" });
    setStep((current) => Math.min(2, current + 1));
  }

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const resume = data.get("resume");

    if (resume instanceof File && resume.size > 5 * 1024 * 1024) {
      setState({ status: "error", message: "Please upload a résumé no larger than 5 MB." });
      return;
    }

    setState({ status: "submitting" });

    try {
      const response = await fetch(
        "/api/worker-applications",
        { method: "POST", body: data }
      );
      const result = (await response.json()) as { error?: string; reference?: string };

      if (!response.ok || !result.reference) {
        throw new Error(result.error || "We could not submit your application.");
      }

      setState({ status: "success", reference: result.reference });
      formRef.current?.reset();
      setFileName("");
      setStep(1);
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "We could not submit your application.",
      });
    }
  }

  return (
    <form className="worker-form express-worker-form" ref={formRef} onSubmit={submitApplication} encType="multipart/form-data">
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="express-form-heading">
        <strong>Express registration</strong>
        <p>Register your interest in two short steps. Detailed compliance evidence is requested only after HPI contacts you about a relevant pathway.</p>
      </div>

      <ol className="form-progress" aria-label="Registration progress">
        {stepLabels.map((label, index) => {
          const number = index + 1;
          return (
            <li key={label} className={number <= step ? "active" : ""} aria-current={number === step ? "step" : undefined}>
              <span>{number}</span><small>{label}</small>
            </li>
          );
        })}
      </ol>

      <fieldset className="form-step" data-form-step="1" hidden={step !== 1}>
        <legend>Step 1: Your details</legend>
        <div className="form-grid">
          <label><span>First name *</span><input name="firstName" autoComplete="given-name" required maxLength={100} /></label>
          <label><span>Last name *</span><input name="lastName" autoComplete="family-name" required maxLength={100} /></label>
          <label><span>Email address *</span><input name="email" type="email" autoComplete="email" required maxLength={180} /></label>
          <label><span>Phone number *</span><input name="phone" type="tel" autoComplete="tel" required maxLength={40} /></label>
          <label>
            <span>Profession *</span>
            <select name="profession" required defaultValue="">
              <option value="" disabled>Select your profession</option>
              <option>Registered Nurse</option><option>Enrolled Nurse</option><option>Assistant in Nursing</option>
              <option>Aged Care Worker</option><option>Support Worker</option><option>Occupational Therapist</option>
              <option>Physiotherapist</option><option>Psychologist</option><option>Podiatrist</option>
              <option>Dietitian</option><option>Other Allied Health</option>
            </select>
          </label>
          <label>
            <span>Registration or qualification status *</span>
            <select name="registrationType" required defaultValue="">
              <option value="" disabled>Select status</option><option>Current Ahpra registration</option>
              <option>Ahpra application in progress</option><option>Certificate III or IV completed</option>
              <option>Certificate III or IV in progress</option><option>Not currently registered or qualified</option>
            </select>
          </label>
          <label><span>Ahpra registration number</span><input name="ahpraRegistrationNumber" maxLength={30} placeholder="If applicable to your profession" autoComplete="off" /></label>
          <label>
            <span>Preferred NSW region *</span>
            <select name="preferredLocations" required defaultValue="">
              <option value="" disabled>Select a region</option><option>Sydney metropolitan area</option><option>Far West NSW</option>
              <option>Western NSW</option><option>Murrumbidgee</option><option>Hunter New England</option>
              <option>Northern NSW</option><option>Mid North Coast</option><option>Open to any regional NSW location</option>
              <option>Open to any NSW location</option>
            </select>
          </label>
        </div>
        <div className="form-navigation form-navigation-next">
          <button className="button button-gold" type="button" onClick={nextStep}>Continue <span aria-hidden="true">↗</span></button>
        </div>
      </fieldset>

      <fieldset className="form-step" data-form-step="2" hidden={step !== 2}>
        <legend>Step 2: Review and submit</legend>
        <label className="form-message"><span>Availability and preferred setting</span><textarea name="message" rows={4} maxLength={1200} placeholder="Availability, experience, preferred setting or anything else we should know" /></label>
        <label className="resume-upload">
          <input name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")} />
          <span className="upload-icon" aria-hidden="true">↑</span>
          <span><strong>{fileName || "Upload your résumé (optional)"}</strong><small>PDF, DOC or DOCX · maximum 5 MB</small></span>
        </label>
        <label className="consent-check">
          <input name="privacy_consent" type="checkbox" value="yes" required />
          <span>I consent to Health Plus International securely storing and using my information, and résumé if supplied, to assess suitable workforce pathways, as explained in the <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</span>
        </label>
        <div className="form-navigation form-submit-row">
          <input type="hidden" name="source" value="hpi-website" />
          <button className="button form-back-button" type="button" onClick={() => setStep(1)}>Back</button>
          <button className="button button-gold" type="submit" disabled={state.status === "submitting"}>{state.status === "submitting" ? "Submitting…" : "Submit Registration"}<span aria-hidden="true">↗</span></button>
        </div>
        <p className="form-security">Upload your résumé only. Do not include identity documents, police checks, banking details or other sensitive compliance records at this stage.</p>
      </fieldset>

      <div className="form-status" aria-live="polite">
        {state.status === "success" && <p className="form-success">Thank you—your registration has been received. Reference: <strong>{state.reference}</strong></p>}
        {state.status === "error" && <p className="form-error">{state.message}</p>}
      </div>
    </form>
  );
}
