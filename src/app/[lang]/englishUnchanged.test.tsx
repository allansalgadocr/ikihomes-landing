import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

// The snapshots in __snapshots__ were written from the English site as it was
// before the Spanish home became the buyer page. They hold /en to that output:
// any change to the English home, its header, footer, sticky bar, blog bands
// or metadata fails here.

vi.mock("server-only", () => ({}));
vi.mock("next/font/google", () => ({
  Urbanist: () => ({ variable: "font-urbanist" }),
  Source_Sans_3: () => ({ variable: "font-source-sans" }),
}));

const route = vi.hoisted(() => ({ pathname: "/en" }));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  usePathname: () => route.pathname,
  useRouter: () => ({ push: () => {} }),
}));

import RootLayout, { generateMetadata } from "./layout";
import Home from "./page";
import BlogIndexPage from "./blog/page";
import BlogPostPage from "./blog/[slug]/page";
import { listPosts } from "@/lib/blog";

const en = () => Promise.resolve({ lang: "en" });

async function renderEnglish(pathname: string, page: React.ReactNode) {
  route.pathname = pathname;
  return renderToStaticMarkup(await RootLayout({ children: page, params: en() }));
}

describe("the English site", () => {
  it("keeps its home page, header, footer and sticky bar", async () => {
    const markup = await renderEnglish("/en", await Home({ params: en() }));
    expect(markup).toMatchSnapshot();
  });

  it("keeps its metadata", async () => {
    expect(await generateMetadata({ params: en() })).toMatchSnapshot();
  });

  it("keeps the blog index and its closing band", async () => {
    const markup = await renderEnglish("/en/blog", await BlogIndexPage({ params: en() }));
    expect(markup).toMatchSnapshot();
  });

  it("keeps the article and its closing band", async () => {
    const [post] = listPosts("en");
    const params = Promise.resolve({ lang: "en", slug: post.slug });
    const markup = await renderEnglish(`/en/blog/${post.slug}`, await BlogPostPage({ params }));
    expect(markup).toMatchSnapshot();
  });
});
