"use server";

export type SubmitLeadState = {
  ok: boolean;
  error?: string;
};

export async function submitLead(
  prevState: SubmitLeadState,
  formData: FormData
): Promise<SubmitLeadState> {
  const name = (formData.get("name") as string) || "";
  const email = formData.get("email") as string;
  const zones = (formData.get("zones") as string) || "";
  const company = formData.get("company") as string; // Honeypot

  // 1. Bot Protection (Honeypot)
  if (company) {
    // Silently succeed to fool bots
    return { ok: true };
  }

  // 2. Validate required fields
  if (!name.trim()) {
    return { ok: false, error: "Por favor ingresa tu nombre." };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Por favor ingresa un correo válido." };
  }

  if (!zones.trim()) {
    return { ok: false, error: "Por favor ingresa tus zonas de trabajo." };
  }

  // 3. Prepare Google Forms Payload
  const formUrl = process.env.GOOGLE_FORMS_ACTION_URL;
  const nameEntryId = process.env.GOOGLE_FORMS_ENTRY_NAME;
  const emailEntryId = process.env.GOOGLE_FORMS_ENTRY_EMAIL;
  const zonesEntryId = process.env.GOOGLE_FORMS_ENTRY_ZONES;

  if (!formUrl || !emailEntryId || !nameEntryId || !zonesEntryId) {
    console.error("Missing Google Forms configuration");
    return { ok: false, error: "Error de configuración. Intenta de nuevo." };
  }

  const googleFormData = new URLSearchParams();
  googleFormData.append(nameEntryId, name.trim());
  googleFormData.append(emailEntryId, email.trim());
  googleFormData.append(zonesEntryId, zones.trim());

  try {
    const response = await fetch(formUrl, {
      method: "POST",
      body: googleFormData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      console.error("Google Forms returned status:", response.status, response.statusText);
      return { ok: false, error: "Error al enviar. Intenta de nuevo." };
    }

    return { ok: true };
  } catch (err) {
    console.error("Lead submission error:", err);
    return { ok: false, error: "Ocurrió un error inesperado." };
  }
}
