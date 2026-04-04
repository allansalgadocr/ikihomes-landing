import type { Metadata } from "next";
import Link from "next/link";
import { listPosts } from "@/lib/blog";

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
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
  };
}

export default async function BlogIndexPage(
  props: { params: Promise<{ lang: string }> }
) {
  const { lang } = await props.params;
  const t = TITLES[lang] ?? TITLES.en;
  const posts = listPosts(lang);

  const backLabel = lang === "es" ? "← Volver al inicio" : "← Back to home";
  const readMore = lang === "es" ? "Leer artículo" : "Read article";

  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="type-heading text-3xl mb-10">{t.heading}</h1>

        {posts.length === 0 && (
          <p className="type-body text-gray-500">
            {lang === "es" ? "Próximamente." : "Coming soon."}
          </p>
        )}

        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`}
              className="group block rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 sm:h-56 object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-6 sm:p-8">
                <time
                  dateTime={post.date}
                  className="type-body text-sm text-gray-400"
                >
                  {new Date(post.date).toLocaleDateString(
                    lang === "es" ? "es-CR" : "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </time>
                <h2 className="type-heading text-xl mt-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="type-body text-gray-600 mt-2">
                  {post.description}
                </p>
                <span className="inline-block mt-4 text-sm font-medium text-primary">
                  {readMore} →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-12">
          <Link
            href={`/${lang}`}
            className="text-primary font-medium hover:underline"
          >
            {backLabel}
          </Link>
        </p>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
