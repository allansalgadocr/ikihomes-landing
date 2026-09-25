import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ProductVideo } from "@/components/ProductVideo";
import { PRODUCT_VIDEO_ID, PRODUCT_VIDEO_POSTER, youtubeEmbedUrl } from "./productVideo";

describe("ProductVideo before play is pressed", () => {
  const markup = renderToStaticMarkup(<ProductVideo playLabel="Play" playerTitle="Walkthrough" />);

  it("renders only our poster and a labelled button, no player", () => {
    expect(markup).toContain('<button type="button"');
    expect(markup).toContain('aria-label="Play"');
    expect(markup).not.toContain("<iframe");
  });

  it("references no YouTube host, so nothing is requested before the click", () => {
    expect(markup).not.toMatch(/youtube|ytimg|googlevideo/i);
  });
});

describe("youtubeEmbedUrl", () => {
  it("plays from the no-cookie host, so YouTube sets no cookies before playback", () => {
    const url = new URL(youtubeEmbedUrl("bCwutFtCtp0"));

    expect(url.origin).toBe("https://www.youtube-nocookie.com");
    expect(url.pathname).toBe("/embed/bCwutFtCtp0");
  });

  it("autoplays, keeps suggestions to this channel and plays inline on iOS", () => {
    const params = new URL(youtubeEmbedUrl("bCwutFtCtp0")).searchParams;

    expect(params.get("autoplay")).toBe("1");
    expect(params.get("rel")).toBe("0");
    expect(params.get("playsinline")).toBe("1");
  });

  it("encodes the id so it cannot leave the embed path", () => {
    expect(new URL(youtubeEmbedUrl("x/../y?z")).pathname).toBe("/embed/x%2F..%2Fy%3Fz");
  });
});

describe("the product video settings", () => {
  it("holds a bare 11 character YouTube id, not a pasted link", () => {
    expect(PRODUCT_VIDEO_ID).toMatch(/^[A-Za-z0-9_-]{11}$/);
  });

  it("serves the poster from this site, so nothing is fetched from YouTube before a click", () => {
    expect(PRODUCT_VIDEO_POSTER).toMatch(/^\/[^/]/);
  });
});
