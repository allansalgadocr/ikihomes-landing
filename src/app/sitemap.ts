import type { MetadataRoute } from "next";
import { getAllSlugs, getPost, modifiedDate } from "@/lib/blog";

const BASE = "https://www.ikihomescr.com";

function langAlternates(path: string) {
  return {
    languages: {
      en: `${BASE}/en${path}`,
      es: `${BASE}/es${path}`,
      "x-default": `${BASE}/es${path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getAllSlugs();

  // The home is the buyer site's, and its own sitemap lists it.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/es/privacy`,
      alternates: langAlternates("/privacy"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE}/en/privacy`,
      alternates: langAlternates("/privacy"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE}/es/terms`,
      alternates: langAlternates("/terms"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE}/en/terms`,
      alternates: langAlternates("/terms"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/en/blog`,
      alternates: langAlternates("/blog"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/es/blog`,
      alternates: langAlternates("/blog"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // lastmod is the day the article's text last changed (its `updated` day, or
  // its publication day), never the build time: a date that moved on every
  // deploy would tell crawlers nothing.
  const blogPosts: MetadataRoute.Sitemap = blogSlugs.flatMap((slug) =>
    (["en", "es"] as const).flatMap((lang) => {
      const post = getPost(slug, lang);
      if (!post) return [];
      return [
        {
          url: `${BASE}/${lang}/blog/${slug}`,
          lastModified: modifiedDate(post),
          alternates: langAlternates(`/blog/${slug}`),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        },
      ];
    })
  );

  return [...staticPages, ...blogIndex, ...blogPosts];
}
