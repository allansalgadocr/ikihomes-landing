import { AGENT_PAGE_URL } from "./portal";

/** The agent door at the end of the blog, tagged so the portal can count blog clicks. */
export const BLOG_AGENT_HREF = `${AGENT_PAGE_URL}?utm_source=blog&utm_medium=cta_band`;

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
 * The closing band of the blog index and of every article, in both languages:
 * it speaks to agents and sends them to the portal's sign in. The English band
 * used to fall back to the prelaunch notify form, which no longer exists.
 */
export function blogBand(_lang: string, dict: BlogBandDict): BlogBand {
  const { cta_eyebrow: eyebrow, cta_title: title, cta_body: body, cta_label: label, cta_micro: micro } = dict.blog;
  return { eyebrow, title, body, label, href: BLOG_AGENT_HREF, micro };
}
