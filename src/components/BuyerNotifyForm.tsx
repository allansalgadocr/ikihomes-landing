"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { submitLead, SubmitLeadState } from "@/actions/submitLead";
import { trackMetaEvent } from "@/components/MetaPixel";
import { TurnstileField } from "./TurnstileField";
import { IconAlert, IconDone } from "./Icons";

// PLAT-1122: inlined at build time. Empty means no challenge, which is how the
// landing ships until Cloudflare is configured.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export interface BuyerNotifyCopy {
  email_label: string;
  email_placeholder: string;
  submit: string;
  submit_pending: string;
  /** The micro line with the privacy link already in place. */
  micro: ReactNode;
  success_title: string;
  success_msg: string;
  error_email: string;
  error_generic: string;
}

interface BuyerNotifyFormViewProps {
  state: SubmitLeadState;
  formAction: (formData: FormData) => void;
  isPending: boolean;
  copy: BuyerNotifyCopy;
}

const initialState: SubmitLeadState = { ok: false };

/**
 * Logs the result of a submit. A saved email is a buyer Lead: content_category
 * splits it from the agent and owner Leads of the waitlist in Ads Manager.
 */
export function reportBuyerNotify(state: SubmitLeadState) {
  if (state.ok) {
    const role = state.role ? { role: state.role } : {};
    sendGAEvent("event", "lead_form_success", { category: "lead", source: "buyer_notify", ...role });
    trackMetaEvent("Lead", {
      content_name: "opening_notify",
      ...(state.role ? { content_category: state.role } : {}),
    });
  } else if (state.error) {
    sendGAEvent("event", "lead_form_error", { category: "lead", error: state.error });
  }
}

/**
 * submitLead as the browser calls it. A call that gets no answer it can read
 * (the connection drops, the server replies 500, or the action is stale after
 * a redeploy) throws, and a throw inside useActionState replaces the whole
 * page with Next's error screen. Here it ends like a refused submit instead:
 * the generic error, a fresh Turnstile challenge and one lead_form_error.
 *
 * The cost: the form no longer posts without JavaScript, because only a server
 * action itself carries Next's no-JS fallback. With Turnstile on it never
 * could, since the button waits for a token only the script can get.
 */
async function sendNotify(previous: SubmitLeadState, formData: FormData): Promise<SubmitLeadState> {
  try {
    return await submitLead(previous, formData);
  } catch {
    return { ok: false, error: "network" };
  }
}

/**
 * The opening notice for buyers: one email, posted with the role "comprador"
 * so these addresses never land in the list that decides the first 20 agents.
 */
export function BuyerNotifyForm({ copy }: { copy: BuyerNotifyCopy }) {
  const [state, formAction, isPending] = useActionState(sendNotify, initialState);
  return <BuyerNotifyFormView state={state} formAction={formAction} isPending={isPending} copy={copy} />;
}

export function BuyerNotifyFormView({ state, formAction, isPending, copy }: BuyerNotifyFormViewProps) {
  // Controlled, so the automatic reset after a form action does not wipe an
  // address the visitor is asked to correct.
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Same rule as NotifySection: a refused submit got past siteverify, so its
  // token is spent and the challenge has to run again. invalid_email returns
  // before siteverify, so that token is still good.
  const [refusal, setRefusal] = useState<SubmitLeadState | null>(null);
  if (state.error && state.error !== "invalid_email" && state !== refusal) {
    setRefusal(state);
    setToken(null);
    setResetSignal((signal) => signal + 1);
  }

  // Typing again clears the error until the next submit answers.
  const [dismissed, setDismissed] = useState<SubmitLeadState | null>(null);
  const error = state === dismissed ? undefined : state.error;
  const invalid = error === "invalid_email";

  useEffect(() => {
    reportBuyerNotify(state);
    if (state.ok) successRef.current?.focus({ preventScroll: true });
    else if (state.error === "invalid_email") inputRef.current?.focus();
  }, [state]);

  // Every "Avisame cuando abra" on the page lands in the field, ready to type.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href="#aviso"]') : null;
      if (!link || successRef.current) return;
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), calm ? 0 : 650);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="signup-card">
      <form action={formAction} noValidate hidden={state.ok}>
        <input
          type="text" name="company" tabIndex={-1} autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", width: 0, height: 0, opacity: 0, padding: 0, border: 0 }}
        />
        <input type="hidden" name="role" value="comprador" />
        <div>
          <label htmlFor="aviso-mail">{copy.email_label}</label>
          <input
            ref={inputRef}
            id="aviso-mail" name="email" type="email" inputMode="email"
            autoComplete="email" autoCapitalize="off" spellCheck={false}
            placeholder={copy.email_placeholder}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setDismissed(state);
            }}
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? "aviso-error aviso-micro" : "aviso-micro"}
            style={{ marginTop: 8, width: "100%" }}
          />
        </div>
        <p className="field-error" id="aviso-error" role="alert" hidden={!error}>
          <IconAlert />
          <span>{error ? (invalid ? copy.error_email : copy.error_generic) : null}</span>
        </p>
        {TURNSTILE_SITE_KEY !== "" ? (
          <TurnstileField
            siteKey={TURNSTILE_SITE_KEY}
            onToken={setToken}
            resetSignal={resetSignal}
          />
        ) : null}
        <button
          className="btn btn-onband" type="submit"
          disabled={isPending || (TURNSTILE_SITE_KEY !== "" && token === null)}
          aria-busy={isPending || undefined}
          style={{ justifySelf: "stretch" }}
        >
          <span>{isPending ? copy.submit_pending : copy.submit}</span>
        </button>
        <p className="micro" id="aviso-micro">{copy.micro}</p>
      </form>
      <div role="status">
        {state.ok && (
          <div className="notify-success" data-notify-success tabIndex={-1} ref={successRef}>
            <IconDone />
            <h3>{copy.success_title}</h3>
            <p>{copy.success_msg}</p>
          </div>
        )}
      </div>
    </div>
  );
}
