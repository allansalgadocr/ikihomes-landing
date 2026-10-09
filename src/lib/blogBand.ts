import { AGENT_PAGE_URL, PORTAL_LIVE, notifyHref, primaryHref } from "./portal";

/** The agent door at the end of the Spanish blog, tagged so the portal can count blog clicks. */
export const BLOG_AGENT_HREF = `${AGENT_PAGE_URL}?utm_source=blog&utm_medium=cta_band`;

interface BlogBandDict {
  nav: { cta: string; cta_prelaunch: string };
  notify: { eyebrow: string };
  blog: {
    cta_title: string;
    cta_body: string;
    cta_micro: string;
    cta_eyebrow?: string;
    cta_label?: string;
  };
}

export interface BlogBand {
  /** Shown on the index band only; the article band has none. */
  eyebrow: string;
  title: string;
  body: string;
  label: string;
  href: string;
  micro: string;
}

/**
 * The closing band of the blog index and of every article.
 *
 * Spanish speaks to agents and sends them to the portal: the Spanish home is
 * the buyer page now, so neither its notify form nor its eyebrow belongs here.
 * English keeps today's band exactly, with its label and target taken from the
 * nav, because en.json has no band label or eyebrow of its own.
 */
export function blogBand(lang: string, dict: BlogBandDict): BlogBand {
  const { cta_title: title, cta_body: body, cta_micro: micro, cta_eyebrow, cta_label } = dict.blog;

  if (lang === "es" && cta_eyebrow && cta_label) {
    return { eyebrow: cta_eyebrow, title, body, label: cta_label, href: BLOG_AGENT_HREF, micro };
  }

  return {
    eyebrow: dict.notify.eyebrow,
    title,
    body,
    label: PORTAL_LIVE ? dict.nav.cta : dict.nav.cta_prelaunch,
    href: PORTAL_LIVE ? primaryHref() : notifyHref(lang),
    micro,
  };
}
