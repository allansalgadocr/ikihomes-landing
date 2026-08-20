import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { categoryLabel, formatDate } from "@/lib/blogPresentation";
import type { BlogDict } from "@/lib/blogPresentation";

/**
 * One card in the blog grid. Shared by the index and by the article page's
 * "keep reading" strip so both stay on the same anatomy.
 *
 * The image is decorative here: the post title sits immediately beside it, so
 * an empty alt avoids a screen reader announcing the same string twice.
 */
export function PostCard({
  post,
  lang,
  dict,
  sizes,
}: {
  post: BlogPostMeta;
  lang: string;
  dict: BlogDict;
  sizes: string;
}) {
  return (
    <Link className="post-card" href={`/${lang}/blog/${post.slug}`}>
      <div className="post-media">
        {post.image && (
          <Image
            src={post.image}
            alt=""
            fill
            sizes={sizes}
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div className="post-body">
        <span className="tag">{categoryLabel(post, dict)}</span>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <div className="post-meta">
          <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
        </div>
      </div>
    </Link>
  );
}
