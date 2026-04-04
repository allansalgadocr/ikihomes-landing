import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPost } from "@/lib/blog";
import { BlogMarkdown } from "@/components/BlogMarkdown";

const BASE = "https://ikihomescr.com";
const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "#";

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

  // Estimate reading time (~200 words/min for Spanish, ~250 for English)
  const wordCount = post.content.split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / (lang === "es" ? 200 : 250)));

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    wordCount,
    timeRequired: `PT${readingMinutes}M`,
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

  const dateStr = new Date(post.date).toLocaleDateString(
    lang === "es" ? "es-CR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const wordCount = post.content.split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / (lang === "es" ? 200 : 250)));
  const readingLabel = lang === "es"
    ? `${readingMinutes} min de lectura`
    : `${readingMinutes} min read`;

  const ctaLabel = lang === "es"
    ? "Únete al Acceso Anticipado"
    : "Join Early Access";
  const ctaContext = lang === "es"
    ? "¿Listo para posicionarte antes de que todos lo hagan?"
    : "Ready to position yourself before everyone else?";

  return (
    <>
      <BlogPostingJsonLd post={post} lang={lang} slug={slug} />
      <main className="min-h-screen bg-white py-20 px-4">
        <article className="max-w-3xl mx-auto">
          <nav className="mb-8">
            <Link
              href={`/${lang}/blog`}
              className="text-primary font-medium hover:underline text-sm"
            >
              ← Blog
            </Link>
          </nav>

          <header className="mb-10">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <time dateTime={post.date} className="type-body">
                {dateStr}
              </time>
              <span aria-hidden="true">·</span>
              <span className="type-body">{readingLabel}</span>
            </div>
            <h1 className="type-heading text-3xl sm:text-4xl mt-2 leading-tight">
              {post.title}
            </h1>
          </header>

          {post.image && (
            <div className="mb-10 rounded-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                width={1376}
                height={768}
                className="w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          <BlogMarkdown content={post.content} />

          {/* CTA — internal link for SEO juice */}
          <div className="mt-12 p-6 sm:p-8 bg-primary/4 rounded-2xl text-center">
            <p className="type-body text-gray-600 mb-4">{ctaContext}</p>
            <a
              href={FORM_URL}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-base"
            >
              {ctaLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-100">
            <Link
              href={`/${lang}/blog`}
              className="text-primary font-medium hover:underline"
            >
              {lang === "es" ? "← Volver al blog" : "← Back to blog"}
            </Link>
          </footer>
        </article>
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
