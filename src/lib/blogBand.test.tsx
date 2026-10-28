import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { BLOG_AGENT_HREF, blogBand } from "./blogBand";
import es from "@/dictionaries/es.json";
import en from "@/dictionaries/en.json";

vi.mock("server-only", () => ({}));

import BlogIndexPage from "@/app/[lang]/blog/page";
import BlogPostPage from "@/app/[lang]/blog/[slug]/page";
import { listPosts } from "./blog";

describe("the Spanish blog band", () => {
  const band = blogBand("es", es);

  it("speaks to agents with the approved set A", () => {
    expect(band.eyebrow).toBe("Para agentes");
    expect(band.title).toBe("Mandá propiedades, no capturas.");
    expect(band.body).toBe(
      "Cada propiedad publicada tiene su página, con fotos, precio, ubicación y tu perfil. La mandás con un enlace. En el plan gratis tenés hasta 10 publicadas a la vez."
    );
    expect(band.micro).toBe("Sin tarjeta de crédito · Plan gratis sin vencimiento");
  });

  it("labels the button like the home's agent door", () => {
    expect(band.label).toBe("Ingresá o creá tu cuenta");
  });

  it("sends the agent to the portal's sign in, tagged as a click from the blog band", () => {
    expect(band.href).toBe("https://app.ikihomescr.com/login?utm_source=blog&utm_medium=cta_band");
    expect(BLOG_AGENT_HREF).toBe(band.href);
  });

  it("no longer borrows the label of a notify form", () => {
    expect(band.eyebrow).not.toBe(es.notify.eyebrow);
  });
});

describe("the English blog band", () => {
  const band = blogBand("en", en);

  it("speaks to agents with the approved set B", () => {
    expect(band.eyebrow).toBe("For agents in Costa Rica");
    expect(band.title).toBe("Send listings, not screenshots.");
    expect(band.body).toBe(
      "Every published listing gets its own page with photos, price, location and your profile. You send it as a link. The free plan holds up to 10 published listings at a time."
    );
    expect(band.micro).toBe("No credit card. The free plan does not expire.");
  });

  it("sends the agent to the portal's sign in, like the Spanish band, and never to the notify form", () => {
    expect(band.label).toBe("Sign in or create your account");
    expect(band.href).toBe(BLOG_AGENT_HREF);
    expect(band.href).not.toContain("#avisame");
  });
});

describe("the Spanish blog pages", () => {
  const es_ = () => Promise.resolve({ lang: "es" });

  it("close the index with the agent band and its eyebrow", async () => {
    const markup = renderToStaticMarkup(await BlogIndexPage({ params: es_() }));
    const band = markup.slice(markup.lastIndexOf('<section class="band final">'));

    expect(band).toContain('<p class="eyebrow on-band">Para agentes</p>');
    expect(band).toContain("<h2>Mandá propiedades, no capturas.</h2>");
    expect(band).toContain(`href="${BLOG_AGENT_HREF.replace(/&/g, "&amp;")}"`);
    expect(band).toContain("Ingresá o creá tu cuenta");
    expect(band).not.toContain("#avisame");
  });

  it("close every article with the same band, without the eyebrow", async () => {
    const [post] = listPosts("es");
    const params = Promise.resolve({ lang: "es", slug: post.slug });
    const markup = renderToStaticMarkup(await BlogPostPage({ params }));
    const band = markup.slice(markup.indexOf('<div class="article-cta">'), markup.indexOf('<div class="article-foot">'));

    expect(band).toContain("<h3>Mandá propiedades, no capturas.</h3>");
    expect(band).toContain(`href="${BLOG_AGENT_HREF.replace(/&/g, "&amp;")}"`);
    expect(band).toContain("Ingresá o creá tu cuenta");
    expect(band).not.toContain("Para agentes<");
    expect(band).not.toContain("#avisame");
  });
});
