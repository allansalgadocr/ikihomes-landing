import { existsSync, readdirSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { LAUNCH_AT, PHASE_SCRIPT } from "@/lib/launch";

vi.mock("server-only", () => ({}));
vi.mock("next/font/google", () => ({
  Urbanist: () => ({ variable: "font-urbanist" }),
  Source_Sans_3: () => ({ variable: "font-source-sans" }),
}));

const route = vi.hoisted(() => ({ pathname: "/es" }));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  usePathname: () => route.pathname,
  useRouter: () => ({ push: () => {} }),
}));

import RootLayout, { generateMetadata } from "./layout";
import sitemap from "../sitemap";

const BEFORE = LAUNCH_AT - 60 * 60 * 1000;
const AFTER = LAUNCH_AT + 60 * 1000;

const params = (lang: string) => Promise.resolve({ lang });

async function renderSite(lang: string, pathname = `/${lang}`) {
  route.pathname = pathname;
  return renderToStaticMarkup(await RootLayout({ children: <main />, params: params(lang) }));
}

function websiteSchema(markup: string) {
  const blocks = [...markup.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)];
  return blocks.map(([, json]) => JSON.parse(json)).find((schema) => schema["@type"] === "WebSite");
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
});

afterEach(() => {
  vi.useRealTimers();
});

describe("the Spanish pages", () => {
  it("are rendered before the opening with the phase pre on <html>", async () => {
    vi.setSystemTime(BEFORE);
    expect(await renderSite("es")).toMatch(/^<html lang="es" data-js="true" data-phase="pre">/);
  });

  it("are rendered from the opening with the phase open on <html>", async () => {
    vi.setSystemTime(LAUNCH_AT);
    expect(await renderSite("es")).toMatch(/^<html lang="es" data-js="true" data-phase="open">/);
  });

  it("correct the phase in <head>, before the first paint", async () => {
    vi.setSystemTime(BEFORE);
    const markup = await renderSite("es");
    const head = markup.slice(0, markup.indexOf("</head>"));
    expect(head).toContain(`<script>${PHASE_SCRIPT}</script>`);
  });

  it("carry the buyer header and footer, with the agent door to the portal", async () => {
    vi.setSystemTime(BEFORE);
    const markup = await renderSite("es");
    expect(markup).toContain('<a class="hdr-door" href="https://app.ikihomescr.com/login">Soy agente</a>');
    expect(markup).toContain('<a href="https://app.ikihomescr.com/login">Para agentes</a>');
    expect(markup).not.toContain("Anotarme en la lista");
  });

  it("describe the site to search engines for buyers", async () => {
    vi.setSystemTime(BEFORE);
    expect(websiteSchema(await renderSite("es")).description).toBe(
      "Propiedades en venta y alquiler en Costa Rica, con las insignias de confianza de cada agente a la vista."
    );
  });
});

describe("the English pages", () => {
  it("carry no phase and no phase script, whatever the time", async () => {
    vi.setSystemTime(AFTER);
    const markup = await renderSite("en");
    expect(markup).toMatch(/^<html lang="en" data-js="true">/);
    expect(markup).not.toContain("data-phase");
    expect(markup).not.toContain(PHASE_SCRIPT);
    expect(markup).not.toContain("data-when");
  });
});

describe("the Spanish home's metadata", () => {
  it("before the opening, announces the date", async () => {
    vi.setSystemTime(BEFORE);
    const metadata = await generateMetadata({ params: params("es") });

    expect(metadata.title).toBe("Comprar o alquilar casa en Costa Rica | IkiHomes");
    expect(metadata.description).toBe(
      "IkiHomes abre el lunes 12 de octubre. Propiedades con precio a la vista, agentes con insignias de confianza y visitas en los horarios que vos proponés."
    );
    expect(metadata.openGraph).toMatchObject({
      title: "IkiHomes abre el lunes 12 de octubre",
      description: "Buscar casa en Costa Rica está por cambiar. Dejá tu correo y te avisamos el día de la apertura.",
      locale: "es_CR",
      images: [
        {
          url: "/og-compradores.png",
          width: 1200,
          height: 630,
          alt: "IkiHomes: una forma distinta de buscar casa en Costa Rica",
        },
      ],
    });
    expect(metadata.twitter).toMatchObject({ images: ["/og-compradores.png"] });
  });

  it("from the opening, keeps the title and says it is open", async () => {
    vi.setSystemTime(AFTER);
    const metadata = await generateMetadata({ params: params("es") });

    expect(metadata.title).toBe("Comprar o alquilar casa en Costa Rica | IkiHomes");
    expect(metadata.description).toBe(
      "Propiedades con precio a la vista, agentes con insignias de confianza y visitas en tus horarios. Gratis para quien busca casa en Costa Rica."
    );
    expect(metadata.openGraph).toMatchObject({
      title: "Buscar casa en Costa Rica ya es distinto",
      description: "Precio a la vista, insignias de confianza antes de contactar y visitas en tus horarios. Gratis para quien busca.",
    });
  });

  it("keeps the alternates as they were", async () => {
    vi.setSystemTime(BEFORE);
    const metadata = await generateMetadata({ params: params("es") });

    expect(metadata.alternates).toEqual({
      canonical: "/es",
      languages: { en: "/en", es: "/es", "x-default": "/es" },
    });
  });
});

// The home, the privacy policy and the terms are the buyer site's. A page for
// any of them here would answer ahead of the fallback rewrite and hide the
// buyer site's home and its versioned legal texts on the public domain.
describe("the addresses that belong to the buyer site", () => {
  const here = (path: string) => new URL(path, import.meta.url);

  it("have no home page in this app", () => {
    expect(readdirSync(here("./")).filter((name) => /^page\./.test(name))).toEqual([]);
  });

  it.each(["privacy", "terms"])("have no %s route in this app", (route) => {
    expect(existsSync(here(`./${route}`))).toBe(false);
  });

  it("leave the home out of this app's sitemap, which keeps the legal pages and the blog", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls.filter((url) => /\/(en|es)$/.test(url))).toEqual([]);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://www.ikihomescr.com/es/privacy",
        "https://www.ikihomescr.com/en/terms",
        "https://www.ikihomescr.com/es/blog",
        "https://www.ikihomescr.com/en/blog",
      ])
    );
  });
});

// The apex redirects to www, so an apex address in a canonical, an alternate or
// the sitemap points search engines at a redirect and Google picks the apex as
// the canonical over the page itself.
describe("the addresses this app declares", () => {
  const APEX = "https://ikihomescr.com";
  const WWW = "https://www.ikihomescr.com";

  it("resolve relative canonicals and alternates against www", async () => {
    const metadata = await generateMetadata({ params: params("es") });
    expect(metadata.metadataBase?.toString()).toBe(`${WWW}/`);
  });

  it.each(["es", "en"])("are all on www in the %s layout", async (lang) => {
    vi.setSystemTime(AFTER);
    expect(await renderSite(lang)).not.toContain(APEX);
  });

  it("are all on www in the sitemap, alternates included", () => {
    const addresses = sitemap().flatMap((entry) => [
      entry.url,
      ...Object.values(entry.alternates?.languages ?? {}),
    ]);
    expect(addresses.length).toBeGreaterThan(0);
    expect(addresses.filter((url) => !String(url).startsWith(`${WWW}/`))).toEqual([]);
  });

  it("leave the hreflang links to each page's metadata, so a page carries one set", async () => {
    vi.setSystemTime(AFTER);
    expect(await renderSite("es")).not.toMatch(/hreflang/i);
  });

  it("name the brand's Instagram and Facebook profiles", async () => {
    vi.setSystemTime(AFTER);
    const blocks = [...(await renderSite("es")).matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)];
    const organization = blocks
      .map(([, json]) => JSON.parse(json))
      .find((schema) => schema["@type"] === "Organization");
    expect(organization.url).toBe(WWW);
    expect(organization.sameAs).toEqual([
      "https://www.instagram.com/ikihomescr",
      "https://www.facebook.com/ikihomescr",
    ]);
  });
});
