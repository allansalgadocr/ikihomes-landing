import type { BlogPostMeta } from "./blog";

/**
 * Presentation helpers shared by the blog index and the article page.
 *
 * These deliberately live outside lib/blog.ts: that module reads the content
 * directory and is the SEO source of truth, and nothing here may change what
 * generateMetadata or the JSON-LD emit.
 */

export interface BlogDict {
  reading_time: string;
  categories: Record<string, string>;
}

/** Words per minute. Spanish runs denser per word than English. */
function wordsPerMinute(lang: string): number {
  return lang === "es" ? 200 : 250;
}

export function readingMinutes(content: string, lang: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMinute(lang)));
}

export function formatDate(date: string, lang: string): string {
  return new Date(date).toLocaleDateString(lang === "es" ? "es-CR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * The editorial tag. Frontmatter wins if a post ever sets one; otherwise the
 * dictionary maps the slug to a label, with a generic fallback so a newly
 * added post never renders an empty chip.
 */
export function categoryLabel(post: BlogPostMeta, dict: BlogDict): string {
  return (
    post.category ??
    dict.categories[post.slug] ??
    dict.categories._default
  );
}

/**
 * Related posts for the end of an article: same-language siblings, newest
 * first, excluding the current post. listPosts already sorts by date desc.
 */
export function relatedPosts(
  all: BlogPostMeta[],
  currentSlug: string,
  limit = 3
): BlogPostMeta[] {
  return all.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
