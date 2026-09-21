// Minimal type declarations for Cloudflare Turnstile, loaded from
// https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit.
// Covers only the surface used by TurnstileField (PLAT-1122).
// See https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/

interface TurnstileRenderOptions {
  sitekey: string;
  /** Receives a single use token that submitLead exchanges with Cloudflare. */
  callback: (token: string) => void;
  /** Fired when the delivered token ages out, roughly 300 seconds after issue. */
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  "timeout-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  appearance?: "always" | "execute" | "interaction-only";
}

interface TurnstileApi {
  /** Returns the widget id used by reset and remove. */
  render(container: HTMLElement, options: TurnstileRenderOptions): string;
  reset(widgetId?: string): void;
  remove(widgetId: string): void;
}

interface Window {
  turnstile?: TurnstileApi;
}
