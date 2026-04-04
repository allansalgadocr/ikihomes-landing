"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface BlogTeaserSectionProps {
  lang: string;
  dict: {
    eyebrow: string;
    title: string;
    card_title: string;
    card_description: string;
    card_date: string;
    card_image?: string;
    read_article: string;
    view_all: string;
  };
}

export function BlogTeaserSection({ lang, dict }: BlogTeaserSectionProps) {
  const sectionReveal = useScrollReveal<HTMLElement>();

  const dateStr = (() => {
    try {
      return new Date(dict.card_date).toLocaleDateString(
        lang === "es" ? "es-CR" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      );
    } catch {
      return dict.card_date;
    }
  })();

  return (
    <section
      ref={sectionReveal}
      id="blog"
      className="reveal py-20 md:py-28 bg-gray-50"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <span className="type-caps inline-flex items-center gap-2 text-xs text-primary mb-4 font-semibold">
          <span className="w-4 h-px bg-primary/40" />
          {dict.eyebrow}
          <span className="w-4 h-px bg-primary/40" />
        </span>

        <h2 className="type-heading text-2xl md:text-3xl mb-8">
          {dict.title}
        </h2>

        <Link
          href={`/${lang}/blog/mls-costa-rica-reality`}
          className="group block rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          {dict.card_image && (
            <img
              src={dict.card_image}
              alt={dict.card_title}
              className="w-full h-48 sm:h-56 object-cover"
              loading="lazy"
            />
          )}
          <div className="p-6 sm:p-8">
            <time className="type-body text-sm text-gray-400">{dateStr}</time>
            <h3 className="type-heading text-lg sm:text-xl mt-2 group-hover:text-primary transition-colors">
              {dict.card_title}
            </h3>
            <p className="type-body text-gray-600 mt-2">{dict.card_description}</p>
            <span className="inline-block mt-4 text-sm font-medium text-primary">
              {dict.read_article} →
            </span>
          </div>
        </Link>

        <div className="mt-8 text-center">
          <Link
            href={`/${lang}/blog`}
            className="text-sm font-medium text-primary hover:underline"
          >
            {dict.view_all} →
          </Link>
        </div>
      </div>
    </section>
  );
}
