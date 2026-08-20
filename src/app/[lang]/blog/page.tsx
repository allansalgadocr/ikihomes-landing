import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { listPosts } from "@/lib/blog";
import { formatDate } from "@/lib/blogPresentation";
import { getDictionary } from "../../../dictionaries";
import { PORTAL_LIVE, primaryHref, notifyHref } from "@/lib/portal";
import { IconArrow } from "@/components/Icons";
import { PostCard } from "@/components/PostCard";

const TITLES: Record<string, { title: string; description: string; heading: string }> = {
  en: {
    title: "Real Estate Insights Costa Rica — Blog | IkiHomes",
    description:
      "Articles and insights for real estate agents in Costa Rica. Market analysis, agent strategies, and platform updates from IkiHomes.",
    heading: "Blog",
  },
  es: {
    title: "Artículos Inmobiliarios Costa Rica — Blog | IkiHomes",
    description:
      "Artículos y análisis para agentes inmobiliarios en Costa Rica. Mercado, estrategias y novedades de la plataforma IkiHomes.",
    heading: "Blog",
  },
};

export async function generateMetadata(
  props: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await props.params;
  const t = TITLES[lang] ?? TITLES.en;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `/${lang}/blog`,
      languages: {
        en: "/en/blog",
        es: "/es/blog",
        "x-default": "/es/blog",
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      type: "website",
      locale: lang === "es" ? "es_CR" : "en_US",
      siteName: "IkiHomes",
      images: [{ url: "https://ikihomescr.com/og-image.png", width: 1024, height: 1024 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: ["https://ikihomescr.com/og-image.png"],
    },
  };
}

export default async function BlogIndexPage(
  props: { params: Promise<{ lang: string }> }
) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as "en" | "es");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const b = (dict as any).blog;

  const posts = listPosts(lang);
  const [featured, ...rest] = posts;

  const ctaHref = PORTAL_LIVE ? primaryHref() : notifyHref(lang);
  const ctaLabel = PORTAL_LIVE ? dict.nav.cta : dict.nav.cta_prelaunch;

  return (
    <main>
      <section className="post-head">
        <div className="wrap">
          <nav className="crumbs" aria-label={b.crumb_blog}>
            <Link href={`/${lang}`}>{b.crumb_home}</Link>
            <span aria-hidden="true">/</span>
            <span className="here">{b.crumb_blog}</span>
          </nav>
          <p className="eyebrow">{b.eyebrow}</p>
          <h1>{b.title}</h1>
          <p className="lede">{b.lede}</p>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          {posts.length === 0 && <p className="lede">{b.empty}</p>}

          {featured && (
            <article className="feature">
              <div className="feature-media">
                {featured.image && (
                  <Image
                    src={featured.image}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                )}
              </div>
              <div className="feature-body">
                <span className="tag">{b.featured}</span>
                <h2>{featured.title}</h2>
                <p>{featured.description}</p>
                <div className="post-meta">
                  <time dateTime={featured.date}>
                    {formatDate(featured.date, lang)}
                  </time>
                </div>
                <Link
                  className="feature-link"
                  href={`/${lang}/blog/${featured.slug}`}
                >
                  {b.read_article}
                  <IconArrow />
                </Link>
              </div>
            </article>
          )}

          {rest.length > 0 && (
            <div className="post-grid">
              {rest.map((post) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  lang={lang}
                  dict={b}
                  sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="band final">
        <div className="wrap">
          <p className="eyebrow on-band">{dict.notify.eyebrow}</p>
          <h2>{b.cta_title}</h2>
          <p>{b.cta_body}</p>
          <div className="cta-row">
            <a className="btn btn-onband" href={ctaHref}>
              {ctaLabel}
              <IconArrow />
            </a>
          </div>
          <p className="zones">{b.cta_micro}</p>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
