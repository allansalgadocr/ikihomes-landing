/**
 * Where the agent doors of this site go.
 *
 * The portal has been live since launch, so no door is withheld any more: the
 * header, the sticky bar and the blog band link to it in both languages. The
 * notify form that once replaced every door is not mounted by any route (both
 * homes are served by the buyer site now).
 */

/**
 * Prelaunch flag and notify-form anchor, kept only because the retired
 * agent-home sections (HeroSection, PathSplitSection, ProductProofSection,
 * PricingSection), which no route mounts, still compile against them. They go
 * when those files go. No rendered component reads them.
 */
export const PORTAL_LIVE = process.env.NEXT_PUBLIC_PORTAL_LIVE === "true";
export const NOTIFY_ANCHOR = "#avisame";

const PORTAL_URL =
  process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://app.ikihomescr.com";

/** A primary call to action: the portal's sign up, or another portal path. */
export function primaryHref(path = "/sign-up"): string {
  return new URL(path, PORTAL_URL).toString();
}

/**
 * Where the agent doors of the header and the blog band go. An agent is sent
 * to the portal's sign in, whose "Crear cuenta" tab serves an agent with no
 * account. Fixed rather than built from PORTAL_URL, because it is the
 * founder's chosen address and does not depend on whether sign up is open.
 */
export const AGENT_PAGE_URL = "https://app.ikihomescr.com/login";

/**
 * The public agent product page, on the buyer site, served on www through the
 * fallback rewrite. The footer's "Para agentes" door goes here; the header
 * door and the band keep sending an agent to sign in.
 */
export const AGENT_PRODUCT_PAGE_URL = "https://www.ikihomescr.com/es/para-agentes";

/**
 * The buyer site's pages the Spanish home sends people to once it opens. They
 * are not routes of this app: on ikihomescr.com the fallback rewrite in
 * next.config.ts serves them from the buyer site. So they are plain links,
 * never next/link, which would try a client navigation into a route this app
 * does not have.
 */
export const BUYER_SITE = {
  search: "/es/search",
  findForMe: "/es/busca-por-mi",
  agents: "/es/agents",
} as const;

/** Support address, used for the Pro conversation which does not need the portal. */
export const SUPPORT_MAILTO = "mailto:soporte@ikihomescr.com";

/**
 * The section anchors the footer links to (#producto, #precios, #preguntas).
 * A language-qualified path works from every route and still scrolls without
 * a reload when you are already on the home page.
 */
export function sectionHref(lang: string, id: string): string {
  return `/${lang}#${id}`;
}
