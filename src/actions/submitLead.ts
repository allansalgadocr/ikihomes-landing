"use server";

export type SubmitLeadState = {
  ok: boolean;
  error?: string;
};

export async function submitLead(
  prevState: SubmitLeadState,
  formData: FormData
): Promise<SubmitLeadState> {
  const email = formData.get("email") as string;
  const role = (formData.get("role") as string) || "";
  const company = formData.get("company") as string; // Honeypot

  // 1. Bot Protection (Honeypot)
  if (company) {
    // Silently succeed to fool bots
    return { ok: true };
  }

  // 2. Validate Email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  // 3. Prepare Google Forms Payload
  const formUrl = process.env.GOOGLE_FORMS_ACTION_URL;
  const emailEntryId = process.env.GOOGLE_FORMS_ENTRY_EMAIL;
  const roleEntryId = process.env.GOOGLE_FORMS_ENTRY_ROLE;

  if (!formUrl || !emailEntryId) {
    console.error("Missing Google Forms configuration");
    return { ok: false, error: "Configuration error. Please try again later." };
  }

  const googleFormData = new URLSearchParams();
  googleFormData.append(emailEntryId, email);
  if (role && roleEntryId) {
    googleFormData.append(roleEntryId, role);
  }

  try {
    const response = await fetch(formUrl, {
      method: "POST",
      body: googleFormData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // Google Forms returns opaque response for cors usually, but server-side fetch is fine.
      // However, Google Forms might return 200 even on error if it's a form view.
      // We assume if it doesn't throw, it worked.
    });

    if (!response.ok) {
       // Log status text if possible
      console.error("Google Forms returned status:", response.status, response.statusText);
      return { ok: false, error: "Failed to submit. Please try again." };
    }

    return { ok: true };
  } catch (err) {
    console.error("Lead submission error:", err);
    return { ok: false, error: "An unexpected error occurred." };
  }
}
