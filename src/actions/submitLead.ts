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

export type SubmitLeadErrorCode =
  | "invalid_email"
  | "captcha"
  | "config"
  | "network";

export type SubmitLeadState = {
  ok: boolean;
  error?: SubmitLeadErrorCode;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * PLAT-1121: confirms a human answered the Turnstile challenge.
 *
 * Absent TURNSTILE_SECRET_KEY the whole check is skipped, which is how this ships:
 * the widget and the flip are a separate change. Once the secret is set the check
 * fails closed, because a verification we could not complete is the exact moment a
 * bot would pick.
 */
async function humanVerified(formData: FormData): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  const token = ((formData.get("cf-turnstile-response") as string) || "").trim();
  if (!token) {
    console.error("submitLead: Turnstile token missing");
    return false;
  }

  const body = new URLSearchParams();
  body.append("secret", secret);
  body.append("response", token);

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!response.ok) {
      console.error(
        "submitLead: Turnstile siteverify returned",
        response.status,
        response.statusText
      );
      return false;
    }

    const result = (await response.json()) as { success?: boolean };
    if (!result.success) {
      console.error("submitLead: Turnstile rejected the challenge");
      return false;
    }

    return true;
  } catch {
    console.error("submitLead: Turnstile siteverify could not be reached");
    return false;
  }
}

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

  if (!(await humanVerified(formData))) return { ok: false, error: "captcha" };

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
