import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  date: string;
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
    author: data.author ?? "IkiHomes",
    image: data.image,
    lang: data.lang ?? lang,
    category: data.category,
    content,
  };
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
