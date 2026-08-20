import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPost, listPosts } from "@/lib/blog";
import {
  categoryLabel,
  formatDate,
  readingMinutes,
  relatedPosts,
} from "@/lib/blogPresentation";
import { BlogMarkdown } from "@/components/BlogMarkdown";
import { BlogPixelTracker } from "@/components/BlogPixelTracker";
import { PostCard } from "@/components/PostCard";
import { IconArrow, IconShare, IconUsers } from "@/components/Icons";
import { getDictionary } from "../../../../dictionaries";
import { PORTAL_LIVE, primaryHref, notifyHref } from "@/lib/portal";

const BASE = "https://ikihomescr.com";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const post = getPost(slug, lang);
  if (!post) return {};

  const imageUrl = post.image ? `${BASE}${post.image}` : `${BASE}/og-image.png`;

  return {
    title: `${post.title} — IkiHomes`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        es: `/es/blog/${slug}`,
        "x-default": `/es/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      section: "Real Estate",
      tags: post.keywords,
      locale: lang === "es" ? "es_CR" : "en_US",
      siteName: "IkiHomes",
      images: [
        {
          url: imageUrl,
          width: 1376,
          height: 768,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

function BlogPostingJsonLd({
  post,
  lang,
  slug,
}: {
  post: NonNullable<ReturnType<typeof getPost>>;
  lang: string;
  slug: string;
}) {
  const imageUrl = post.image
    ? `${BASE}${post.image}`
    : `${BASE}/og-image.png`;

  const wordCount = post.content.split(/\s+/).length;
  const readingTime = readingMinutes(post.content, lang);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    wordCount,
    timeRequired: `PT${readingTime}M`,
    author: {
      "@type": "Organization",
      name: post.author,
      url: BASE,
    },
    publisher: {
      "@type": "Organization",
      name: "IkiHomes",
      url: BASE,
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/${post.lang}/blog/${slug}`,
    },
    inLanguage: post.lang,
    image: imageUrl,
    keywords: post.keywords.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "IkiHomes",
        item: `${BASE}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE}/${lang}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${BASE}/${lang}/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export default async function BlogPostPage(props: PageProps) {
  const { lang, slug } = await props.params;
  const post = getPost(slug, lang);
  if (!post) notFound();

  const dict = await getDictionary(lang as "en" | "es");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const b = (dict as any).blog;

  const dateStr = formatDate(post.date, lang);
  const readingLabel = `${readingMinutes(post.content, lang)} ${b.reading_time}`;
  const tag = categoryLabel(post, b);
  const related = relatedPosts(listPosts(lang), slug);

  const ctaHref = PORTAL_LIVE ? primaryHref() : notifyHref(lang);
  const ctaLabel = PORTAL_LIVE ? dict.nav.cta : dict.nav.cta_prelaunch;

  const canonical = `${BASE}/${lang}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(canonical);
  const shareText = encodeURIComponent(`${post.title} ${canonical}`);

  return (
    <>
      <BlogPostingJsonLd post={post} lang={lang} slug={slug} />
      <BlogPixelTracker slug={slug} />

      <main>
        {/* The visible breadcrumb mirrors the BreadcrumbList schema above. */}
        <section className="post-head">
          <div className="wrap">
            <nav className="crumbs" aria-label={b.crumb_blog}>
              <Link href={`/${lang}`}>{b.crumb_home}</Link>
              <span aria-hidden="true">/</span>
              <Link href={`/${lang}/blog`}>{b.crumb_blog}</Link>
              <span aria-hidden="true">/</span>
              <span className="here">{tag}</span>
            </nav>
            <p className="eyebrow">{tag}</p>
            <h1 className="article-title">{post.title}</h1>
            <p className="article-lede">{post.description}</p>
            <div className="post-meta" style={{ marginTop: 22 }}>
              <time dateTime={post.date}>{dateStr}</time>
              <span aria-hidden="true">·</span>
              <span>{readingLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{post.author}</span>
            </div>
          </div>
        </section>

        <article className="band article">
          <div className="wrap">
            {post.image && (
              <figure className="article-hero">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1376}
                  height={768}
                  priority
                  sizes="(max-width: 1240px) 100vw, 1160px"
                />
              </figure>
            )}

            <div className="measure prose">
              <BlogMarkdown content={post.content} />
            </div>

            <div className="measure">
              {/*
                .btn-onband sets an explicit colour. The previous
                `bg-primary text-white` anchor did not: mockup.css is imported
                unlayered, so its bare `a{color:var(--brand)}` outranked the
                Tailwind utility and painted teal on teal at 1.0:1 contrast.
              */}
              <div className="article-cta">
                <h3>{b.cta_title}</h3>
                <p>{b.cta_body}</p>
                <a className="btn btn-onband" href={ctaHref}>
                  {ctaLabel}
                  <IconArrow />
                </a>
                <p className="micro">{b.cta_micro}</p>
              </div>

              <div className="article-foot">
                <div className="who">
                  <div className="avatar" aria-hidden="true">
                    IH
                  </div>
                  <div>
                    <b>{post.author}</b>
                    {b.author_role}
                  </div>
                </div>
                {/*
                  Share targets are plain links so this stays a server
                  component. A copy-to-clipboard button would need client JS
                  for no real gain over the browser's own share affordances.
                */}
                <div className="share">
                  <a
                    href={`https://wa.me/?text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={b.share_whatsapp}
                  >
                    <IconShare />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={b.share_linkedin}
                  >
                    <IconUsers />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="band keep-reading">
            <div className="wrap">
              <div className="head">
                <h2 style={{ fontSize: "clamp(24px,2.2vw,32px)" }}>
                  {b.keep_reading}
                </h2>
                <Link href={`/${lang}/blog`}>{b.view_all} →</Link>
              </div>
              <div className="post-grid">
                {related.map((p) => (
                  <PostCard
                    key={p.slug}
                    post={p}
                    lang={lang}
                    dict={b}
                    sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { lang: string; slug: string }[] = [];
  for (const slug of slugs) {
    for (const lang of ["en", "es"]) {
      if (getPost(slug, lang)) {
        params.push({ lang, slug });
      }
    }
  }
  return params;
}
