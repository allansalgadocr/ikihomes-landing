import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import es from "@/dictionaries/es.json";

const route = vi.hoisted(() => ({ pathname: "/es" }));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  usePathname: () => route.pathname,
  useRouter: () => ({ push: () => {} }),
}));

import { BuyerNavBar } from "./BuyerNavBar";
import { BuyerStickyCta } from "./BuyerStickyCta";
import { BuyerFooter } from "./BuyerFooter";

const PORTAL = "https://app.ikihomescr.com/login";
const AGENT_PAGE = "https://www.ikihomescr.com/es/para-agentes";

type Link = { text: string; href: string };

/** Every link in the markup, in order. */
function links(markup: string): Link[] {
  return [...markup.matchAll(/<a\b([^>]*)>(.*?)<\/a>/g)]
    .map(([, attributes, inner]) => ({
      text: inner.replace(/<[^>]+>/g, ""),
      href: (attributes.match(/href="([^"]*)"/)?.[1] ?? "").replace(/&amp;/g, "&"),
    }))
    .filter((link) => link.text !== "");
}

function renderAt(pathname: string, element: React.ReactElement) {
  route.pathname = pathname;
  return renderToStaticMarkup(element);
}

const header = (pathname: string) => renderAt(pathname, <BuyerNavBar dict={es.buyer.nav} />);
const sticky = (pathname: string) => renderAt(pathname, <BuyerStickyCta dict={es.buyer.sticky} />);
const footer = (pathname: string) =>
  renderAt(pathname, <BuyerFooter dict={es.buyer.footer} common={es.footer} />);

/** The prelaunch phase left with the Spanish home; nothing of it may be emitted, hidden or not. */
function expectNoPrelaunch(markup: string) {
  expect(markup).not.toContain("Avisame");
  expect(markup).not.toContain("#aviso");
  expect(markup).not.toContain("data-when");
}

describe("the Spanish header on blog and legal pages", () => {
  const markup = header("/es/blog");

  it("shows no buyer nav, as the agent page showed none off the home", () => {
    expect(markup).not.toContain('class="nav"');
  });

  it("keeps the language switch, so the English blog stays reachable", () => {
    expect(markup).toContain('class="lang"');
  });

  it("carries the agent door and the search button, and nothing of the prelaunch", () => {
    expect(links(markup)).toEqual([
      { text: "Soy agente", href: PORTAL },
      { text: "Buscar propiedades", href: "/es/search" },
    ]);
    expectNoPrelaunch(markup);
  });

  it("keeps the agent door out of the nav, so it stays on phones", () => {
    expect(markup).toContain(`<a class="hdr-door" href="${PORTAL}">Soy agente</a>`);
  });

  it("has no login link and no arrow in the button", () => {
    expect(markup).not.toContain("Entrar");
    expect(markup).not.toMatch(/<a class="btn[^"]*"[^>]*>[^<]*<svg/);
  });
});

describe("the Spanish header on the home path", () => {
  it("links to the product only", () => {
    const markup = header("/es");
    expect(links(markup)).toEqual([
      { text: "Buscá por mí", href: "/es/busca-por-mi" },
      { text: "Encontrar un agente", href: "/es/agents" },
      { text: "Preguntas", href: "#preguntas" },
      { text: "Soy agente", href: PORTAL },
      { text: "Buscar propiedades", href: "/es/search" },
    ]);
    expectNoPrelaunch(markup);
  });
});

describe("the Spanish sticky bar", () => {
  it("carries search on the home path, with no arrow and nothing of the prelaunch", () => {
    const markup = sticky("/es");

    expect(links(markup)).toEqual([{ text: "Buscar propiedades", href: "/es/search" }]);
    expect(markup).not.toContain("<svg");
    expectNoPrelaunch(markup);
  });

  it("is not on other pages, as today", () => {
    expect(sticky("/es/blog")).toBe("");
  });
});

describe("the Spanish footer", () => {
  const markup = footer("/es/blog");

  it("points at the product, the agent door, the blog, the legal pages and support", () => {
    expect(links(markup)).toEqual([
      { text: "Buscar propiedades", href: "/es/search" },
      { text: "Buscá por mí", href: "/es/busca-por-mi" },
      { text: "Encontrar un agente", href: "/es/agents" },
      { text: "Para agentes", href: AGENT_PAGE },
      { text: "Blog", href: "/es/blog" },
      { text: "Privacidad", href: "/es/privacy" },
      { text: "Términos", href: "/es/terms" },
      { text: "soporte@ikihomescr.com", href: "mailto:soporte@ikihomescr.com" },
    ]);
    expectNoPrelaunch(markup);
  });

  it("keeps the copyright line", () => {
    expect(markup).toContain('<p class="foot-note">© 2026 IkiHomes · Hecho en Costa Rica</p>');
  });
});
