"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

const TURNSTILE_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface TurnstileFieldProps {
  siteKey: string;
  /** Receives the token, or null whenever the current one stops being usable. */
  onToken: (token: string | null) => void;
  /** Increment to force a fresh challenge. Turnstile tokens are single use. */
  resetSignal: number;
}

/**
 * PLAT-1122: the waitlist form's Turnstile challenge.
 *
 * Rendered explicitly rather than through the `cf-turnstile` class so the
 * script never scans the page for widgets. Explicit render still injects the
 * hidden `cf-turnstile-response` input into the enclosing form, which is the
 * field submitLead reads, so this component owns the whole client half.
 */
export function TurnstileField({
  siteKey,
  onToken,
  resetSignal,
}: TurnstileFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const previousResetRef = useRef(resetSignal);

  // Cloudflare's callbacks live for as long as the widget does, so they must
  // not close over the first render's onToken.
  const onTokenRef = useRef(onToken);
  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  const renderWidget = useCallback(() => {
    if (widgetIdRef.current !== null) return;
    const container = containerRef.current;
    if (!container || !window.turnstile) return;

    const clearToken = () => onTokenRef.current(null);
    widgetIdRef.current = window.turnstile.render(container, {
      sitekey: siteKey,
      theme: "light",
      appearance: "always",
      callback: (token) => onTokenRef.current(token),
      "expired-callback": clearToken,
      "error-callback": clearToken,
      "timeout-callback": clearToken,
    });
  }, [siteKey]);

  // A client navigation back to this section finds the script already loaded,
  // so next/script skips it and onLoad never fires. This mount path is what
  // renders the widget in that case; on a fresh load it is a no op because the
  // global does not exist yet.
  useEffect(() => {
    renderWidget();
    return () => {
      const widgetId = widgetIdRef.current;
      widgetIdRef.current = null;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [renderWidget]);

  useEffect(() => {
    if (previousResetRef.current === resetSignal) return;
    previousResetRef.current = resetSignal;
    onTokenRef.current(null);
    const widgetId = widgetIdRef.current;
    if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
  }, [resetSignal]);

  return (
    <>
      <Script
        src={TURNSTILE_SRC}
        strategy="afterInteractive"
        onLoad={renderWidget}
      />
      <div ref={containerRef} />
    </>
  );
}
