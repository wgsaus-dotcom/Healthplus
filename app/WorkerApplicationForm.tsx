"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { roleValue, workforceRoles } from "./form-options";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string };

export default function WorkerApplicationForm({ initialRole = "" }: { initialRole?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<SubmissionState>({ status: "idle" });
  const [fileName, setFileName] = useState("");
  const [step, setStep] = useState(1);

  const inFlight = useRef(false);
  const [profession, setProfession] = useState(() => roleValue(initialRole));
  useEffect(() => { setProfession(roleValue(initialRole)); }, [initialRole]);

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
    if (inFlight.current) return;
    if (step === 1) { nextStep(); return; }
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const resume = data.get("resume");

    if (resume instanceof File && resume.size > 5 * 1024 * 1024) {
      setState({ status: "error", message: "Please upload a résumé no larger than 5 MB." });
      return;
    }

    inFlight.current = true;
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
      setProfession(roleValue(initialRole));
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "We could not submit your application.",
      });
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <form className="worker-form express-worker-form" ref={formRef} onSubmit={submitApplication} encType="multipart/form-data" noValidate>
      <div className="form-honeypot" aria-hidden="true"><label htmlFor="company">Company</label><input id="company" name="company" tabIndex={-1} autoComplete="off" /></div>
      <p className="form-progress" aria-live="polite">Step {step} of 2</p>
      <fieldset className="form-step" data-form-step="1" hidden={step !== 1}><legend>Your details</legend><div className="form-grid">
        <label><span>First name *</span><input name="firstName" autoComplete="given-name" required maxLength={100} /></label>
        <label><span>Last name *</span><input name="lastName" autoComplete="family-name" required maxLength={100} /></label>
        <label><span>Email *</span><input name="email" type="email" autoComplete="email" required maxLength={180} /></label>
        <label><span>Phone *</span><input name="phone" type="tel" autoComplete="tel" required maxLength={40} /></label>
        <label><span>Profession *</span><select name="profession" required value={profession} onChange={event => setProfession(event.target.value)}><option value="" disabled>Choose your profession</option>{workforceRoles.map(role => <option key={role.value} value={role.value}>{role.label}</option>)}</select></label>
        <label><span>Registration or qualification status *</span><select name="registrationType" required defaultValue=""><option value="" disabled>Choose status</option><option>Current Ahpra registration</option><option>Ahpra application in progress</option><option>Certificate III or IV completed</option><option>Certificate III or IV in progress</option><option>Not currently registered or qualified</option></select></label>
        <label><span>Ahpra number</span><input name="ahpraRegistrationNumber" maxLength={30} autoComplete="off" /></label>
        <label><span>Preferred NSW region *</span><select name="preferredLocations" required defaultValue=""><option value="" disabled>Choose a region</option><option>Sydney metropolitan area</option><option>Far West NSW</option><option>Western NSW</option><option>Murrumbidgee</option><option>Hunter New England</option><option>Northern NSW</option><option>Mid North Coast</option><option>Open to any regional NSW location</option><option>Open to any NSW location</option></select></label>
      </div><div className="form-navigation"><button className="hpi-action" type="button" onClick={nextStep}>Continue</button></div></fieldset>
      <fieldset className="form-step" data-form-step="2" hidden={step !== 2}><legend>Availability and résumé</legend>
        <label className="form-message"><span>Availability</span><textarea name="message" rows={3} maxLength={1200} /></label>
        <label className="resume-upload"><span>Résumé (optional)</span><input name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={event=>setFileName(event.target.files?.[0]?.name ?? "")} /><small>{fileName || "PDF, DOC or DOCX · maximum 5 MB"}</small></label>
        <label className="consent-check"><input name="privacy_consent" type="checkbox" value="yes" required /><span>I consent to Health Plus International securely storing and using my information, and résumé if supplied, to assess suitable workforce pathways, as explained in the <a href="/privacy">Privacy policy</a>.</span></label>
        <input type="hidden" name="source" value="hpi-website" />
        <div className="form-navigation"><button className="hpi-action hpi-action-outline" type="button" onClick={()=>setStep(1)}>Back</button><button className="hpi-action" type="submit" disabled={state.status === "submitting"}>{state.status === "submitting" ? "Submitting…" : "Register"}</button></div>
      </fieldset>
      <div className="form-status" aria-live="polite">{state.status === "success" && <p className="form-success">Thank you. We will review your details and contact you.</p>}{state.status === "error" && <p className="form-error">{state.message}</p>}</div>
    </form>
  );
}
