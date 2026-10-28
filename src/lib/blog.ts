import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  date: string;
  /**
   * The day the text last changed, set in the frontmatter only when an article
   * is edited after publication. `date` stays the publication day; this one
   * feeds dateModified, og:modified_time and the sitemap's lastmod.
   */
  updated?: string;
  author: string;
  image?: string;
  lang: string;
  /**
   * Optional editorial tag shown on cards and in the article eyebrow. No post
   * sets it yet; the pages fall back to a per-slug label from the dictionary,
   * so adding `category:` to a post's frontmatter later takes precedence
   * without a code change.
   */
  category?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function getPostFile(slug: string, lang: string): string {
  return path.join(CONTENT_DIR, slug, `${lang}.md`);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export const BLOG_LANGS = ["en", "es"] as const;
export type BlogLang = (typeof BLOG_LANGS)[number];

/** The languages a post exists in, by file presence, without reading the file. */
export function postLanguages(slug: string): BlogLang[] {
  return BLOG_LANGS.filter((lang) => fs.existsSync(getPostFile(slug, lang)));
}

export function getPost(slug: string, lang: string): BlogPost | null {
  const filePath = getPostFile(slug, lang);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    keywords: data.keywords ?? [],
    date: data.date ?? "",
    updated: data.updated,
    author: data.author ?? "IkiHomes",
    image: data.image,
    lang: data.lang ?? lang,
    category: data.category,
    content,
  };
}

/** The date a post was last modified: its `updated` day, or its publication day when never edited. */
export function modifiedDate(post: Pick<BlogPostMeta, "date" | "updated">): string {
  return post.updated ?? post.date;
}

export function listPosts(lang: string): BlogPostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const post = getPost(slug, lang);
      if (!post) return null;
      const { content: _, ...meta } = post;
      return meta;
    })
    .filter((p): p is BlogPostMeta => p !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
