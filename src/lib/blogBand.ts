import { AGENT_PAGE_URL, AGENT_PRODUCT_PAGE_URL } from "./portal";

const BLOG_UTM = "?utm_source=blog&utm_medium=cta_band";

/** The Spanish band's door: the portal's sign in, tagged so the portal can count blog clicks. */
export const BLOG_AGENT_HREF = `${AGENT_PAGE_URL}${BLOG_UTM}`;

/** The English band's door: the public agent page on www, tagged the same way. */
export const BLOG_AGENT_PAGE_HREF = `${AGENT_PRODUCT_PAGE_URL}${BLOG_UTM}`;

interface BlogBandDict {
  blog: {
    cta_eyebrow: string;
    cta_title: string;
    cta_body: string;
    cta_label: string;
    cta_micro: string;
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
 * The closing band of the blog index and of every article. It speaks to agents
 * in both languages. The Spanish band sends them to the portal's sign in; the
 * English band sends them to the public agent page (Spanish only, and its label
 * says so), decided by the founder on 2026-10-28. The English band used to fall
 * back to the prelaunch notify form, which no longer exists.
 */
export function blogBand(lang: string, dict: BlogBandDict): BlogBand {
  const { cta_eyebrow: eyebrow, cta_title: title, cta_body: body, cta_label: label, cta_micro: micro } = dict.blog;
  const href = lang === "en" ? BLOG_AGENT_PAGE_HREF : BLOG_AGENT_HREF;
  return { eyebrow, title, body, label, href, micro };
}
