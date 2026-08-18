"use client";

import { useActionState, useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { submitLead, SubmitLeadState } from "@/actions/submitLead";
import { trackMetaEvent } from "@/components/MetaPixel";
import { IconArrow } from "./Icons";
import { SUPPORT_MAILTO } from "@/lib/portal";

interface NotifySectionProps {
  dict: {
    eyebrow: string; title: string; lede: string;
    secondary_cta: string; trust_line: string; card_title: string;
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

  useEffect(() => {
    if (state.ok) {
      sendGAEvent("event", "lead_form_success", { category: "lead", source: "notify_section" });
      trackMetaEvent("Lead", { content_name: "prelaunch_notify" });
    } else if (state.error) {
      sendGAEvent("event", "lead_form_error", { category: "lead", error: state.error });
    }
  }, [state]);

  return (
    <section className="signup" id="avisame">
      <div className="wrap">
        <div className="signup-copy">
          <p className="eyebrow on-band">{dict.eyebrow}</p>
          <h2>{dict.title}</h2>
          <p className="lede">{dict.lede}</p>
          <div className="cta-row" style={{ marginTop: 26 }}>
            <a className="btn btn-onband-ghost" href={SUPPORT_MAILTO}>
              {dict.secondary_cta}
            </a>
          </div>
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
                <button className="btn btn-onband" type="submit" disabled={isPending}
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
