import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

const BASE = "https://ikihomescr.com";

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

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/en`,
      alternates: langAlternates(""),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/es`,
      alternates: langAlternates(""),
      changeFrequency: "weekly",
      priority: 1.0,
    },
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

  const blogPosts: MetadataRoute.Sitemap = blogSlugs.flatMap((slug) => [
    {
      url: `${BASE}/en/blog/${slug}`,
      alternates: langAlternates(`/blog/${slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE}/es/blog/${slug}`,
      alternates: langAlternates(`/blog/${slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  return [...staticPages, ...blogIndex, ...blogPosts];
}
