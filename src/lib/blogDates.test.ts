import { describe, expect, it, vi } from "vitest";
import { getAllSlugs, getPost, modifiedDate } from "./blog";

vi.mock("server-only", () => ({}));

import sitemap from "@/app/sitemap";

describe("the modified date of an article", () => {
  it("is the updated day when the text changed after publication", () => {
    expect(modifiedDate({ date: "2026-03-28", updated: "2026-10-28" })).toBe("2026-10-28");
  });

  it("is the publication day when the text never changed", () => {
    expect(modifiedDate({ date: "2026-03-28" })).toBe("2026-03-28");
  });

  it("never moves ahead of the publication day on its own", () => {
    for (const slug of getAllSlugs()) {
      for (const lang of ["es", "en"]) {
        const post = getPost(slug, lang);
        if (!post) continue;
        expect(post.updated === undefined || post.updated >= post.date).toBe(true);
      }
    }
  });
});

describe("the sitemap", () => {
  const entries = sitemap();

  it("gives every article the day its text last changed, not the build time", () => {
    for (const slug of getAllSlugs()) {
      for (const lang of ["es", "en"]) {
        const post = getPost(slug, lang);
        if (!post) continue;
        const entry = entries.find((e) => e.url === `https://www.ikihomescr.com/${lang}/blog/${slug}`);
        expect(entry?.lastModified).toBe(modifiedDate(post));
      }
    }
  });

  it("lists only articles that exist in that language", () => {
    const urls = entries.map((e) => e.url);
    expect(urls.filter((u) => u.includes("/blog/")).length).toBe(
      getAllSlugs().flatMap((s) => ["es", "en"].filter((l) => getPost(s, l))).length
    );
  });
});
