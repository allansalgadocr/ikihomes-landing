/**
 * Portal availability flag.
 *
 * The agent portal is not in production until September, so every link into it
 * has to be withheld rather than pointed at a dead URL. Components branch on
 * PORTAL_LIVE at render time, which means the sign-up markup is never emitted
 * while the portal is down -- no hidden-but-present links for a crawler or a
 * curious reader to find.
 *
 * To open sign-up, set NEXT_PUBLIC_PORTAL_LIVE=true and redeploy. Nothing else
 * changes. The default is deliberately false so that a missing or misspelled
 * env var fails closed, showing the notify path rather than broken buttons.
 */
export const PORTAL_LIVE = process.env.NEXT_PUBLIC_PORTAL_LIVE === "true";

const PORTAL_URL =
  process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://app.ikihomescr.com";

/** Anchor for the on-page notify form, used wherever sign-up would otherwise go. */
export const NOTIFY_ANCHOR = "#avisame";

/**
 * Where a primary call to action should point right now.
 * Falls back to the notify form for as long as the portal is down.
 */
export function primaryHref(path = "/sign-up"): string {
  if (!PORTAL_LIVE) return NOTIFY_ANCHOR;
  return new URL(path, PORTAL_URL).toString();
}

/** Support address, used for the Pro conversation which does not need the portal. */
export const SUPPORT_MAILTO = "mailto:soporte@ikihomescr.com";

/**
 * Where the notify call to action should point from a given route.
 *
 * `#avisame` is rendered by NotifySection, which only mounts on the home page.
 * Emitting the bare fragment from the blog, privacy or terms produced a link
 * that scrolled nowhere -- every call to action on those routes was dead. Off
 * home the CTA has to navigate home and then scroll.
 */
export function notifyHref(lang: string): string {
  return `/${lang}${NOTIFY_ANCHOR}`;
}

/**
 * Same problem for the section anchors the footer links to (#producto,
 * #precios, #preguntas). A language-qualified path works from every route and
 * still scrolls without a reload when you are already on the home page.
 */
export function sectionHref(lang: string, id: string): string {
  return `/${lang}#${id}`;
}
