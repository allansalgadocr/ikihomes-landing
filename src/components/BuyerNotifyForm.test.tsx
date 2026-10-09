import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { SubmitLeadState } from "@/actions/submitLead";
import es from "@/dictionaries/es.json";

// The site key is inlined at build time, so it has to be set before the form loads.
vi.hoisted(() => {
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "test-site-key";
});

// Stands in for the Cloudflare widget, and shows how many times it was reset.
vi.mock("@/components/TurnstileField", () => ({
  TurnstileField: ({ resetSignal }: { resetSignal: number }) => <div data-turnstile-reset={resetSignal} />,
}));

const analytics = vi.hoisted(() => ({ ga: vi.fn(), meta: vi.fn() }));
vi.mock("@next/third-parties/google", () => ({ sendGAEvent: analytics.ga }));
vi.mock("@/components/MetaPixel", () => ({ trackMetaEvent: analytics.meta }));

// The real submitLead, unless a test makes the browser's call to it throw.
const lead = vi.hoisted(() => ({ throws: null as Error | null }));
vi.mock("@/actions/submitLead", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/actions/submitLead")>();
  return {
    ...actual,
    submitLead: async (...args: Parameters<typeof actual.submitLead>) => {
      if (lead.throws) throw lead.throws;
      return actual.submitLead(...args);
    },
  };
});

// Keeps the action the form hands to useActionState, so a test can call it.
const actionState = vi.hoisted(() => ({
  action: null as ((state: unknown, formData: FormData) => Promise<unknown>) | null,
}));
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useActionState: (action: (state: unknown, formData: FormData) => Promise<unknown>, initial: unknown) => {
      actionState.action = action;
      return [initial, () => {}, false];
    },
  };
});

import { BuyerNotifyForm, BuyerNotifyFormView, reportBuyerNotify } from "./BuyerNotifyForm";
import { submitLead } from "@/actions/submitLead";

const n = es.buyer.notify;
const copy = {
  email_label: n.email_label,
  email_placeholder: n.email_placeholder,
  submit: n.submit,
  submit_pending: n.submit_pending,
  micro: "Te escribimos una sola vez.",
  success_title: n.success_title,
  success_msg: "El lunes 12 de octubre te escribimos a este correo.",
  error_email: n.error_email,
  error_generic: n.error_generic,
};

function render(state: SubmitLeadState, isPending = false) {
  return renderToStaticMarkup(
    <BuyerNotifyFormView state={state} formAction={() => {}} isPending={isPending} copy={copy} />
  );
}

const emailInput = (markup: string) => markup.match(/<input[^>]*name="email"[^>]*\/>/)?.[0] ?? "";
const fieldError = (markup: string) => markup.match(/<p class="field-error"[^>]*>.*?<\/p>/)?.[0] ?? "";
const fieldErrorTag = (markup: string) => markup.match(/<p class="field-error"[^>]*>/)?.[0] ?? "";
const submitButton = (markup: string) => markup.match(/<button[^>]*type="submit"[^>]*>.*?<\/button>/)?.[0] ?? "";
const resets = (markup: string) => Number(markup.match(/data-turnstile-reset="(\d+)"/)?.[1]);

describe("the buyer notify form before submitting", () => {
  const markup = render({ ok: false });

  it("posts the buyer role, exactly comprador", () => {
    expect(markup).toContain('<input type="hidden" name="role" value="comprador"/>');
  });

  it("asks for the email only: no name and no role to choose", () => {
    expect(markup).not.toContain('name="name"');
    expect(markup).not.toContain('type="radio"');
    expect(emailInput(markup)).toContain('id="aviso-mail"');
    expect(emailInput(markup)).toContain('aria-describedby="aviso-micro"');
  });

  it("keeps the honeypot", () => {
    const honeypot = markup.match(/<input[^>]*name="company"[^>]*\/>/)?.[0] ?? "";
    expect(honeypot).toContain('tabindex="-1"');
    expect(honeypot).toContain('aria-hidden="true"');
  });

  it("waits for the Turnstile challenge before it can be sent", () => {
    expect(submitButton(markup)).toContain('disabled=""');
    expect(resets(markup)).toBe(0);
  });

  it("shows no error and no success yet", () => {
    expect(fieldErrorTag(markup)).toContain('hidden=""');
    expect(markup).not.toContain(n.success_title);
  });
});

describe("the post", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubEnv("GOOGLE_FORMS_ACTION_URL", "https://forms.example/submit");
    vi.stubEnv("GOOGLE_FORMS_ENTRY_EMAIL", "entry.email");
    vi.stubEnv("GOOGLE_FORMS_ENTRY_ROLE", "entry.role");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockResolvedValue({ ok: true, status: 200, statusText: "OK" });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  });

  it("sends what the form holds, and reaches the Google Form as comprador", async () => {
    const data = new FormData();
    for (const input of render({ ok: false }).match(/<input[^>]*>/g) ?? []) {
      const name = input.match(/name="([^"]*)"/)?.[1];
      if (name) data.append(name, input.match(/value="([^"]*)"/)?.[1] ?? "");
    }
    data.set("email", "ana@example.com");

    const result = await submitLead({ ok: false }, data);

    expect(result).toEqual({ ok: true, role: "comprador" });
    const body = fetchMock.mock.calls[0][1].body as URLSearchParams;
    expect(body.get("entry.role")).toBe("comprador");
    expect(body.get("entry.email")).toBe("ana@example.com");
  });
});

describe("the buyer notify form after a result", () => {
  it("shows the success message in the status region and hides the form", () => {
    const markup = render({ ok: true, role: "comprador" });

    expect(markup).toMatch(/<form[^>]*hidden=""/);
    expect(markup).toMatch(/<div role="status"><div class="notify-success"[^>]*>.*Listo, quedó anotado\./);
    expect(markup).toContain(copy.success_msg);
  });

  it("marks an invalid email on the field, and keeps the unspent challenge", () => {
    const markup = render({ ok: false, error: "invalid_email" });

    expect(fieldErrorTag(markup)).not.toContain("hidden");
    expect(fieldError(markup)).toContain(n.error_email);
    expect(emailInput(markup)).toContain('aria-invalid="true"');
    expect(emailInput(markup)).toContain('aria-describedby="aviso-error aviso-micro"');
    expect(resets(markup)).toBe(0);
  });

  it("shows the generic error when the address was fine but saving it failed", () => {
    const markup = render({ ok: false, error: "network" });

    expect(fieldError(markup)).toContain(n.error_generic);
    expect(emailInput(markup)).not.toContain("aria-invalid");
  });

  it.each(["network", "config", "captcha"] as const)(
    "asks Turnstile for a fresh challenge after a refused submit (%s), because the token is spent",
    (error) => {
      const markup = render({ ok: false, error });

      expect(resets(markup)).toBe(1);
      expect(submitButton(markup)).toContain('disabled=""');
    }
  );

  it("says it is sending while the post is on its way", () => {
    const button = submitButton(render({ ok: false }, true));

    expect(button).toContain(n.submit_pending);
    expect(button).toContain('aria-busy="true"');
    expect(button).toContain('disabled=""');
  });
});

describe("a send whose call throws in the browser", () => {
  afterEach(() => {
    lead.throws = null;
    analytics.ga.mockReset();
    analytics.meta.mockReset();
  });

  it.each([
    ["the connection drops", new TypeError("Failed to fetch")],
    ["the server replies 500", new Error("An unexpected response was received from the server.")],
    ["the action is stale after a redeploy", new Error('Server Action "7f3a" was not found on the server.')],
  ])("ends like a refused submit when %s, instead of replacing the page", async (_, error) => {
    renderToStaticMarkup(<BuyerNotifyForm copy={copy} />);
    lead.throws = error;

    const state = (await actionState.action!({ ok: false }, new FormData())) as SubmitLeadState;

    expect(state).toEqual({ ok: false, error: "network" });

    const markup = render(state);
    expect(fieldErrorTag(markup)).not.toContain("hidden");
    expect(fieldError(markup)).toContain(n.error_generic);
    expect(submitButton(markup)).not.toContain("aria-busy");
    expect(submitButton(markup)).toContain(n.submit);
    expect(resets(markup)).toBe(1);

    reportBuyerNotify(state);
    expect(analytics.ga).toHaveBeenCalledTimes(1);
    expect(analytics.ga).toHaveBeenCalledWith("event", "lead_form_error", { category: "lead", error: "network" });
    expect(analytics.meta).not.toHaveBeenCalled();
  });

  it("passes an answered call through untouched", async () => {
    renderToStaticMarkup(<BuyerNotifyForm copy={copy} />);
    const data = new FormData();
    data.set("email", "not an email");

    expect(await actionState.action!({ ok: false }, data)).toEqual({ ok: false, error: "invalid_email" });
  });
});

describe("reportBuyerNotify", () => {
  afterEach(() => {
    analytics.ga.mockReset();
    analytics.meta.mockReset();
  });

  it("logs a saved buyer email as a buyer lead in GA and Meta", () => {
    reportBuyerNotify({ ok: true, role: "comprador" });

    expect(analytics.ga).toHaveBeenCalledWith("event", "lead_form_success", {
      category: "lead",
      source: "buyer_notify",
      role: "comprador",
    });
    expect(analytics.meta).toHaveBeenCalledWith("Lead", {
      content_name: "opening_notify",
      content_category: "comprador",
    });
  });

  it("logs a refused submit as a form error, and no lead", () => {
    reportBuyerNotify({ ok: false, error: "network" });

    expect(analytics.ga).toHaveBeenCalledWith("event", "lead_form_error", { category: "lead", error: "network" });
    expect(analytics.meta).not.toHaveBeenCalled();
  });

  it("logs nothing before the first submit", () => {
    reportBuyerNotify({ ok: false });

    expect(analytics.ga).not.toHaveBeenCalled();
    expect(analytics.meta).not.toHaveBeenCalled();
  });
});
