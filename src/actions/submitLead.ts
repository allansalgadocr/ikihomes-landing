"use server";

/**
 * Pre-launch notify capture.
 *
 * Returns a stable error CODE rather than a sentence, so the copy lives at the
 * presentation boundary and the English page does not render Spanish errors.
 *
 * `role` is sent now. The Google Form has always had a role entry configured,
 * but the previous version of this action never populated it, so every captured
 * lead arrived with a blank role column and agents could not be told apart from
 * property owners.
 */

export type SubmitLeadErrorCode = "invalid_email" | "config" | "network";

export type SubmitLeadState = {
  ok: boolean;
  error?: SubmitLeadErrorCode;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(
  prevState: SubmitLeadState,
  formData: FormData
): Promise<SubmitLeadState> {
  const email = ((formData.get("email") as string) || "").trim();
  const role = ((formData.get("role") as string) || "").trim();
  const name = ((formData.get("name") as string) || "").trim();
  const zones = ((formData.get("zones") as string) || "").trim();
  const company = formData.get("company") as string; // honeypot

  // Silently succeed so a bot cannot tell it was caught.
  if (company) return { ok: true };

  if (!EMAIL.test(email)) return { ok: false, error: "invalid_email" };

  const formUrl = process.env.GOOGLE_FORMS_ACTION_URL;
  const emailEntryId = process.env.GOOGLE_FORMS_ENTRY_EMAIL;
  const roleEntryId = process.env.GOOGLE_FORMS_ENTRY_ROLE;
  const nameEntryId = process.env.GOOGLE_FORMS_ENTRY_NAME;
  const zonesEntryId = process.env.GOOGLE_FORMS_ENTRY_ZONES;

  if (!formUrl || !emailEntryId) {
    console.error("submitLead: missing Google Forms configuration");
    return { ok: false, error: "config" };
  }

  const payload = new URLSearchParams();
  payload.append(emailEntryId, email);
  if (roleEntryId && role) payload.append(roleEntryId, role);
  // The form still has these fields; send them when a surface collects them.
  if (nameEntryId && name) payload.append(nameEntryId, name);
  if (zonesEntryId && zones) payload.append(zonesEntryId, zones);

  try {
    const response = await fetch(formUrl, {
      method: "POST",
      body: payload,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!response.ok) {
      console.error(
        "submitLead: Google Forms returned",
        response.status,
        response.statusText
      );
      return { ok: false, error: "network" };
    }

    return { ok: true };
  } catch (err) {
    console.error("submitLead: submission failed", err);
    return { ok: false, error: "network" };
  }
}
