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

type Phase = "pre" | "open";
type Link = { text: string; href: string };

/**
 * The links a visitor sees in a phase. Both states are in the markup, and the
 * stylesheet hides the one whose data-when does not match the phase on <html>.
 */
function visibleLinks(markup: string, phase: Phase): Link[] {
  return [...markup.matchAll(/<a\b([^>]*)>(.*?)<\/a>/g)]
    .filter(([, attributes]) => {
      const when = attributes.match(/data-when="(\w+)"/)?.[1];
      return when === undefined || when === phase;
    })
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

describe("the Spanish header on the home", () => {
  const markup = header("/es");

  it("before the opening, scrolls on the page and asks for the email", () => {
    expect(visibleLinks(markup, "pre")).toEqual([
      { text: "Qué cambia", href: "#cambia" },
      { text: "Buscá por mí", href: "#busca-por-mi" },
      { text: "Preguntas", href: "#preguntas" },
      { text: "Soy agente", href: PORTAL },
      { text: "Avisame cuando abra", href: "#aviso" },
    ]);
  });

  it("from the opening, goes to the product and carries search in the button", () => {
    expect(visibleLinks(markup, "open")).toEqual([
      { text: "Buscá por mí", href: "/es/busca-por-mi" },
      { text: "Encontrar un agente", href: "/es/agents" },
      { text: "Preguntas", href: "#preguntas" },
      { text: "Soy agente", href: PORTAL },
      { text: "Buscar propiedades", href: "/es/search" },
    ]);
  });

  it("keeps the agent door out of the nav, so it stays on phones", () => {
    expect(markup).toContain(`<a class="hdr-door" href="${PORTAL}">Soy agente</a>`);
  });

  it("has no login link, no language switch and no arrow in the button", () => {
    expect(markup).not.toContain("Entrar");
    expect(markup).not.toContain('class="lang"');
    expect(markup).not.toMatch(/<a class="btn[^"]*"[^>]*>[^<]*<svg/);
  });
});

describe("the Spanish header on blog and legal pages", () => {
  const markup = header("/es/blog");

  it("shows no buyer nav, as the agent page showed none off the home", () => {
    expect(markup).not.toContain('class="nav"');
  });

  it("keeps the language switch, so the English blog stays reachable", () => {
    expect(markup).toContain('class="lang"');
  });

  it("sends the notify button to the home's form, and the open button to search", () => {
    expect(visibleLinks(markup, "pre")).toEqual([
      { text: "Soy agente", href: PORTAL },
      { text: "Avisame cuando abra", href: "/es#aviso" },
    ]);
    expect(visibleLinks(markup, "open")).toEqual([
      { text: "Soy agente", href: PORTAL },
      { text: "Buscar propiedades", href: "/es/search" },
    ]);
  });
});

describe("the Spanish sticky bar", () => {
  it("carries the action of each phase on the home, with no arrow", () => {
    const markup = sticky("/es");

    expect(visibleLinks(markup, "pre")).toEqual([{ text: "Avisame cuando abra", href: "#aviso" }]);
    expect(visibleLinks(markup, "open")).toEqual([{ text: "Buscar propiedades", href: "/es/search" }]);
    expect(markup).not.toContain("<svg");
  });

  it("is not on other pages, as today", () => {
    expect(sticky("/es/blog")).toBe("");
  });
});

describe("the Spanish footer", () => {
  const markup = footer("/es/blog");
  const rest = [
    { text: "Para agentes", href: PORTAL },
    { text: "Blog", href: "/es/blog" },
    { text: "Privacidad", href: "/es/privacy" },
    { text: "Términos", href: "/es/terms" },
    { text: "soporte@ikihomescr.com", href: "mailto:soporte@ikihomescr.com" },
  ];

  it("before the opening, scrolls on the home with bare anchors, so a visit's query and state survive", () => {
    expect(visibleLinks(footer("/es"), "pre")).toEqual([
      { text: "Qué cambia", href: "#cambia" },
      { text: "Buscá por mí", href: "#busca-por-mi" },
      { text: "Preguntas", href: "#preguntas" },
      ...rest,
    ]);
  });

  it("before the opening, points at the home's sections from the blog and legal pages", () => {
    expect(visibleLinks(markup, "pre")).toEqual([
      { text: "Qué cambia", href: "/es#cambia" },
      { text: "Buscá por mí", href: "/es#busca-por-mi" },
      { text: "Preguntas", href: "/es#preguntas" },
      ...rest,
    ]);
  });

  it("from the opening, points at the product", () => {
    expect(visibleLinks(markup, "open")).toEqual([
      { text: "Buscar propiedades", href: "/es/search" },
      { text: "Buscá por mí", href: "/es/busca-por-mi" },
      { text: "Encontrar un agente", href: "/es/agents" },
      ...rest,
    ]);
  });

  it("keeps the copyright line", () => {
    expect(markup).toContain('<p class="foot-note">© 2026 IkiHomes · Hecho en Costa Rica</p>');
  });
});
