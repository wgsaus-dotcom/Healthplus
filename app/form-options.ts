export const workforceRoles = [
  { slug: "registered-nurses", label: "Registered Nurses", value: "Registered Nurse" },
  { slug: "assistants-in-nursing", label: "Assistants in Nursing", value: "Assistant in Nursing" },
  { slug: "aged-care-workers", label: "Aged Care Workers", value: "Aged Care Worker" },
  { slug: "support-workers", label: "Support Workers", value: "Support Worker" },
  { slug: "allied-health", label: "Allied Health Professionals", value: "Allied Health" },
] as const;

export type FormSearchParams = Record<string, string | string[] | undefined>;

export function roleValue(slug?: string): string {
  return workforceRoles.find(role => role.slug === slug)?.value ?? "";
}

export function roleFromSearch(params: FormSearchParams, preferred: "role" | "profession"): string {
  const other = preferred === "role" ? "profession" : "role";
  for (const key of [preferred, other]) {
    const raw = params[key];
    const candidate = Array.isArray(raw) ? raw[0] : raw;
    if (roleValue(candidate)) return candidate as string;
  }
  return "";
}
