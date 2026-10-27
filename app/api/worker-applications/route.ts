import { getDb } from "@/db";
import { workerApplications } from "@/db/schema";
import { workforceRoles } from "@/app/form-options";

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const allowedTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const allowedExtensions = new Set(["pdf", "doc", "docx"]);

function textValue(form: FormData, key: string, maxLength: number) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function safeExtension(filename: string) {
  const extension = filename.split(".").pop()?.toLowerCase() ?? "";
  return allowedExtensions.has(extension) ? extension : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let resumeKey = "";

  try {
    const { env } = await import("cloudflare:workers");
    const form = await request.formData();

    // Quietly accept bot submissions without storing them.
    if (textValue(form, "company", 200)) {
      return Response.json({ ok: true, reference: "HPI-RECEIVED" });
    }

    const firstName = textValue(form, "firstName", 100);
    const lastName = textValue(form, "lastName", 100);
    const fullName = `${firstName} ${lastName}`;
    const email = textValue(form, "email", 180).toLowerCase();
    const phone = textValue(form, "phone", 40);
    const profession = textValue(form, "profession", 100);
    const ahpraStatus = textValue(form, "registrationType", 80);
    const ahpraRegistrationNumber = textValue(form, "ahpraRegistrationNumber", 30);
    const preferredRegion = textValue(form, "preferredLocations", 100);
    const applicantMessage = textValue(form, "message", 1200);
    const message = [
      ahpraRegistrationNumber ? `Ahpra registration number: ${ahpraRegistrationNumber}` : "",
      applicantMessage,
    ].filter(Boolean).join("\n");
    const consent = textValue(form, "privacy_consent", 10);
    const resume = form.get("resume");

    if (
      !firstName ||
      !lastName ||
      !isEmail(email) ||
      !phone ||
      !profession ||
      !ahpraStatus ||
      !preferredRegion
    ) {
      return Response.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    if (!workforceRoles.some(role => role.value === profession)) {
      return Response.json({ error: "Please choose one of the listed professions." }, { status: 400 });
    }

    if (consent !== "yes") {
      return Response.json(
        { error: "Consent is required to submit an application." },
        { status: 400 }
      );
    }

    const reference = `HPI-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    let resumeName = "";
    let resumeType = "";
    let resumeSize = 0;

    if (resume instanceof File && resume.size > 0) {
      const extension = safeExtension(resume.name);
      if (!extension || !allowedTypes.has(resume.type) || resume.size > MAX_RESUME_SIZE) {
        return Response.json(
          { error: "Upload a PDF, DOC or DOCX résumé no larger than 5 MB." },
          { status: 400 }
        );
      }
      if (!env.BUCKET) throw new Error("Resume storage is temporarily unavailable.");

      resumeKey = `worker-applications/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
      resumeName = resume.name.slice(0, 180);
      resumeType = resume.type;
      resumeSize = resume.size;

      await env.BUCKET.put(resumeKey, resume.stream(), {
        httpMetadata: { contentType: resume.type },
        customMetadata: { reference, originalName: resumeName },
      });
    }

    try {
      const db = await getDb();
      await db.insert(workerApplications).values({
        reference,
        fullName,
        email,
        phone,
        profession,
        ahpraStatus,
        preferredRegion,
        message,
        resumeKey,
        resumeName,
        resumeType,
        resumeSize,
      });
    } catch (error) {
      if (resumeKey && env.BUCKET) await env.BUCKET.delete(resumeKey);
      throw error;
    }

    return Response.json({ ok: true, reference }, { status: 201 });
  } catch {
    return Response.json({ error: "We could not submit your application. Please try again." }, { status: 500 });
  }
}
