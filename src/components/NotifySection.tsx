"use client";

import { useActionState, useEffect, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { submitLead, SubmitLeadState } from "@/actions/submitLead";
import { trackMetaEvent } from "@/components/MetaPixel";
import { TurnstileField } from "./TurnstileField";
import { IconArrow } from "./Icons";

// PLAT-1122: inlined at build time. Empty means no challenge, which is how the
// landing ships until Cloudflare is configured.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

interface NotifySectionProps {
  dict: {
    eyebrow: string; title: string; lede: string;
    trust_line: string; card_title: string;
    name_label: string; name_placeholder: string;
    email_label: string; email_placeholder: string;
    role_legend: string; role_agent: string; role_owner: string;
    submit: string; submit_pending: string; micro: string;
    success_title: string; success_msg: string;
    error_email: string; error_generic: string;
  };
}

const initialState: SubmitLeadState = { ok: false };

export function NotifySection({ dict }: NotifySectionProps) {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);
  const [token, setToken] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    if (state.ok) {
      const role = state.role ? { role: state.role } : {};
      sendGAEvent("event", "lead_form_success", { category: "lead", source: "notify_section", ...role });
      // content_category splits agent Leads from owner Leads in Ads Manager.
      trackMetaEvent("Lead", {
        content_name: "prelaunch_notify",
        ...(state.role ? { content_category: state.role } : {}),
      });
    } else if (state.error) {
      sendGAEvent("event", "lead_form_error", { category: "lead", error: state.error });
    }
  }, [state]);

  // Turnstile tokens are single use and expire 300 seconds after issue, so a
  // spent one cannot back a retry. submitLead redeems the token before it posts
  // to Google Forms, which means a "config" or "network" result leaves a
  // consumed token sitting in the hidden input and the next press is a
  // guaranteed captcha refusal. Re-challenge on any error that got that far.
  // invalid_email returns before siteverify, so that token is still unspent.
  //
  // Adjusting during render rather than in an effect is React's documented
  // pattern for state derived from a hook result changing, and it avoids
  // rendering a form whose submit is briefly enabled against a dead token.
  const [refusal, setRefusal] = useState<SubmitLeadState | null>(null);
  if (state.error && state.error !== "invalid_email" && state !== refusal) {
    setRefusal(state);
    setToken(null);
    setResetSignal((signal) => signal + 1);
  }

  return (
    <section className="signup" id="avisame">
      <div className="wrap">
        <div className="signup-copy">
          <p className="eyebrow on-band">{dict.eyebrow}</p>
          <h2>{dict.title}</h2>
          <p className="lede">{dict.lede}</p>
          <p className="zones" style={{ marginTop: 18 }}>{dict.trust_line}</p>
        </div>

        <div className="signup-card">
          {state.ok ? (
            <div role="status">
              <h3>{dict.success_title}</h3>
              <p className="micro" style={{ marginTop: 8 }}>{dict.success_msg}</p>
            </div>
          ) : (
            <>
              <h3>{dict.card_title}</h3>
              <form action={formAction}>
                <input
                  type="text" name="company" tabIndex={-1} autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", width: 0, height: 0, opacity: 0, padding: 0, border: 0 }}
                />
                <div>
                  <label htmlFor="av-name">{dict.name_label}</label>
                  <input
                    id="av-name" name="name" type="text" required autoComplete="name" maxLength={80}
                    placeholder={dict.name_placeholder}
                    style={{ marginTop: 8, width: "100%" }}
                  />
                </div>
                <div>
                  <label htmlFor="av-mail">{dict.email_label}</label>
                  <input
                    id="av-mail" name="email" type="email" required
                    placeholder={dict.email_placeholder}
                    style={{ marginTop: 8, width: "100%" }}
                  />
                </div>
                <div className="roles" role="group" aria-label={dict.role_legend}>
                  <label>
                    <input type="radio" name="role" value="agente" defaultChecked />
                    {dict.role_agent}
                  </label>
                  <label>
                    <input type="radio" name="role" value="propietario" />
                    {dict.role_owner}
                  </label>
                </div>
                {TURNSTILE_SITE_KEY !== "" ? (
                  <TurnstileField
                    siteKey={TURNSTILE_SITE_KEY}
                    onToken={setToken}
                    resetSignal={resetSignal}
                  />
                ) : null}
                <button className="btn btn-onband" type="submit"
                        disabled={isPending || (TURNSTILE_SITE_KEY !== "" && token === null)}
                        style={{ justifySelf: "stretch" }}>
                  {isPending ? dict.submit_pending : dict.submit}
                  {!isPending && <IconArrow />}
                </button>
                {state.error && (
                  <p className="micro" role="alert">
                    {state.error === "invalid_email" ? dict.error_email : dict.error_generic}
                  </p>
                )}
                <p className="micro">{dict.micro}</p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
