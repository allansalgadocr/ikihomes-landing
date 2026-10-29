/**
 * A post may exist in one language only (the guide, so far). Its page must not
 * declare an English twin that answers 404, and the header language switch,
 * which swaps the lang segment, must land on the page that exists.
 */
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
  permanentRedirect: (url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  },
}));

import BlogPostPage, { generateMetadata } from "@/app/[lang]/blog/[slug]/page";
import sitemap from "@/app/sitemap";
import { postLanguages } from "./blog";

const BASE = "https://www.ikihomescr.com";
const GUIDE = "donde-publicar-propiedades-costa-rica";
const BILINGUAL = "stand-out-agent";
const params = (lang: string, slug: string) => ({ params: Promise.resolve({ lang, slug }) });

describe("a post that exists in one language", () => {
  it("is known by file presence", () => {
    expect(postLanguages(GUIDE)).toEqual(["es"]);
    expect(postLanguages(BILINGUAL)).toEqual(["en", "es"]);
    expect(postLanguages("no-such-post")).toEqual([]);
  });

  it("declares hreflang for that language only, with x-default on it", async () => {
    const md = await generateMetadata(params("es", GUIDE));
    expect(md.alternates?.languages).toEqual({
      es: `/es/blog/${GUIDE}`,
      "x-default": `/es/blog/${GUIDE}`,
    });

    const both = await generateMetadata(params("es", BILINGUAL));
    expect(both.alternates?.languages).toEqual({
      en: `/en/blog/${BILINGUAL}`,
      es: `/es/blog/${BILINGUAL}`,
      "x-default": `/es/blog/${BILINGUAL}`,
    });
  });

  it("serves the English address from the Spanish page instead of a 404", async () => {
    await expect(BlogPostPage(params("en", GUIDE))).rejects.toThrow(`NEXT_REDIRECT:/es/blog/${GUIDE}`);
    await expect(BlogPostPage(params("en", "no-such-post"))).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("lists only its own language in the sitemap, alternates included", () => {
    const entries = sitemap();
    const guide = entries.find((e) => e.url === `${BASE}/es/blog/${GUIDE}`);
    expect(guide?.alternates?.languages).toEqual({
      es: `${BASE}/es/blog/${GUIDE}`,
      "x-default": `${BASE}/es/blog/${GUIDE}`,
    });
    expect(entries.find((e) => e.url === `${BASE}/en/blog/${GUIDE}`)).toBeUndefined();

    const other = entries.find((e) => e.url === `${BASE}/es/blog/${BILINGUAL}`);
    expect(other?.alternates?.languages).toHaveProperty("en", `${BASE}/en/blog/${BILINGUAL}`);
  });
});
