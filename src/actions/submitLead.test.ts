import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { submitLead, type SubmitLeadState } from "@/actions/submitLead";

const FORM_URL = "https://docs.google.example/forms/d/e/abc/formResponse";
const SITE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const SECRET = "1x0000000000000000000000000000000AA";

const EMPTY_STATE: SubmitLeadState = { ok: false };

function leadForm(turnstileToken?: string): FormData {
  const form = new FormData();
  form.append("email", "ana@example.com");
  form.append("role", "agent");
  if (turnstileToken !== undefined) {
    form.append("cf-turnstile-response", turnstileToken);
  }
  return form;
}

function jsonResponse(body: unknown, ok = true): Response {
  return new Response(JSON.stringify(body), { status: ok ? 200 : 502 });
}

/** Every fetch call this test made, in order, as [url, body]. */
function calls(fetchMock: ReturnType<typeof vi.fn>): [string, string][] {
  return fetchMock.mock.calls.map(([url, init]) => [
    String(url),
    String((init as RequestInit)?.body ?? ""),
  ]);
}

describe("submitLead", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // The action reports failures through console.error by design; silence it so a
    // deliberately failing case does not read like a broken test run.
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubEnv("GOOGLE_FORMS_ACTION_URL", FORM_URL);
    vi.stubEnv("GOOGLE_FORMS_ENTRY_EMAIL", "entry.100");
    vi.stubEnv("GOOGLE_FORMS_ENTRY_ROLE", "entry.200");
    fetchMock = vi.fn(async () => jsonResponse({ success: true }));
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("skips verification entirely when no Turnstile secret is configured", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");

    const result = await submitLead(EMPTY_STATE, leadForm());

    expect(result).toEqual({ ok: true });
    expect(calls(fetchMock)).toHaveLength(1);
    expect(calls(fetchMock)[0][0]).toBe(FORM_URL);
  });

  it("verifies with Cloudflare before posting to Google Forms when the secret is set", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", SECRET);

    const result = await submitLead(EMPTY_STATE, leadForm("a-good-token"));

    expect(result).toEqual({ ok: true });
    const [verify, forms] = calls(fetchMock);
    expect(verify[0]).toBe(SITE_VERIFY_URL);
    expect(new URLSearchParams(verify[1]).get("secret")).toBe(SECRET);
    expect(new URLSearchParams(verify[1]).get("response")).toBe("a-good-token");
    expect(forms[0]).toBe(FORM_URL);
  });

  it("returns captcha and never reaches Google Forms when Cloudflare rejects the token", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", SECRET);
    fetchMock.mockResolvedValueOnce(
      jsonResponse({ success: false, "error-codes": ["invalid-input-response"] })
    );

    const result = await submitLead(EMPTY_STATE, leadForm("a-bad-token"));

    expect(result).toEqual({ ok: false, error: "captcha" });
    expect(calls(fetchMock)).toHaveLength(1);
    expect(calls(fetchMock)[0][0]).toBe(SITE_VERIFY_URL);
  });

  it("returns captcha when the secret is set and no token came with the form", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", SECRET);

    const result = await submitLead(EMPTY_STATE, leadForm());

    expect(result).toEqual({ ok: false, error: "captcha" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns captcha when Cloudflare answers with an error status", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", SECRET);
    fetchMock.mockResolvedValueOnce(jsonResponse({}, false));

    const result = await submitLead(EMPTY_STATE, leadForm("a-good-token"));

    expect(result).toEqual({ ok: false, error: "captcha" });
    expect(calls(fetchMock)).toHaveLength(1);
  });

  it("returns captcha when the verification call throws", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", SECRET);
    fetchMock.mockRejectedValueOnce(new Error("network down"));

    const result = await submitLead(EMPTY_STATE, leadForm("a-good-token"));

    expect(result).toEqual({ ok: false, error: "captcha" });
    expect(calls(fetchMock)).toHaveLength(1);
  });

  it("still short-circuits on the honeypot before any verification", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", SECRET);
    const form = leadForm();
    form.append("company", "bot-filled");

    const result = await submitLead(EMPTY_STATE, form);

    expect(result).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("still rejects a malformed email before any verification", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", SECRET);
    const form = new FormData();
    form.append("email", "not-an-email");

    const result = await submitLead(EMPTY_STATE, form);

    expect(result).toEqual({ ok: false, error: "invalid_email" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
