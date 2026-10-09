import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import es from "@/dictionaries/es.json";
import { BuyerHome } from "./BuyerHome";

const PORTAL = "https://app.ikihomescr.com/login";
const markup = renderToStaticMarkup(<BuyerHome dict={es.buyer} />);

/** The markup of the section with this id, up to the next section. */
function section(id: string) {
  const start = markup.indexOf(`id="${id}"`);
  const end = markup.indexOf("<section", start);
  return markup.slice(start, end === -1 ? undefined : end);
}

const anchors = (html: string) =>
  [...html.matchAll(/<a\b([^>]*)>(.*?)<\/a>/g)].map(([, attributes, inner]) => ({
    attributes,
    text: inner.replace(/<[^>]+>/g, ""),
    href: attributes.match(/href="([^"]*)"/)?.[1] ?? "",
    when: attributes.match(/data-when="(\w+)"/)?.[1],
  }));

describe("the buyer home", () => {
  it("follows the mockup's order: hero, what changes, Buscá por mí, the statement, questions, notify, closing", () => {
    const order = ['id="top"', 'id="cambia"', 'id="busca-por-mi"', 'class="band manifesto"', 'id="preguntas"', 'id="aviso"', "data-closing"];
    const positions = order.map((marker) => markup.indexOf(marker));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it("renders no eyebrow labels", () => {
    expect(markup).not.toContain('class="eyebrow');
  });

  it("puts no icon in any button or link", () => {
    expect(markup).not.toMatch(/<a [^>]*>(?:(?!<\/a>).)*<svg/);
    expect(markup).not.toMatch(/<button[^>]*>(?:(?!<\/button>).)*<svg/);
  });

  it("keeps both kickers as plain sentence case labels", () => {
    expect(markup).toContain('<p class="kicker">Abrimos en</p>');
    expect(markup).toContain('<p class="kicker">Buscá por mí</p>');
  });
});

describe("the two states", () => {
  it("carries both headlines, ledes and actions in the hero, each tagged with its phase", () => {
    const hero = section("top");
    expect(hero).toContain('<span data-when="pre">Buscar casa en Costa Rica está por cambiar.</span>');
    expect(hero).toContain('<span data-when="open">Buscar casa en Costa Rica ya es distinto.</span>');
    const preRow = hero.match(/<div class="cta-row" data-when="pre">.*?<\/div>/)?.[0] ?? "";
    expect(anchors(preRow)).toMatchObject([
      { text: "Avisame cuando abra", href: "#aviso" },
      { text: "Ver qué cambia", href: "#cambia" },
    ]);
    expect(hero).toContain('<p class="p-note" data-when="pre">Un solo correo, el día de la apertura.</p>');
  });

  it("sends the open hero to search and to Buscá por mí", () => {
    const openRow = section("top").match(/<div class="cta-row" data-when="open">.*?<\/div>/)?.[0] ?? "";
    expect(anchors(openRow)).toMatchObject([
      { text: "Buscar propiedades", href: "/es/search" },
      { text: "Buscá por mí", href: "/es/busca-por-mi" },
    ]);
  });

  it("swaps the Buscá por mí action with the phase", () => {
    expect(anchors(section("busca-por-mi"))).toMatchObject([
      { text: "Avisame cuando abra", href: "#aviso", when: "pre" },
      { text: "Publicar mi búsqueda", href: "/es/busca-por-mi", when: "open" },
    ]);
  });

  it("marks the notify form as before the opening and the closing band as after it", () => {
    expect(markup).toContain('<section class="signup" id="aviso" data-notify="true">');
    expect(markup).toMatch(/<section class="band final" data-closing="true">.*Empezá por donde querás\./);
  });
});

describe("the agent doors", () => {
  it("send the statement band's door to the portal", () => {
    expect(markup).toContain(`<a class="btn btn-onband-ghost" href="${PORTAL}">Ingresá o creá tu cuenta</a>`);
  });

  it("send the FAQ's door to the portal", () => {
    expect(anchors(section("preguntas"))).toContainEqual(
      expect.objectContaining({ text: "Ingresá o creá tu cuenta", href: PORTAL })
    );
  });

  it("promise only what the portal's sign in shows", () => {
    expect(markup).toContain("Creás tu cuenta gratis y elegís tu perfil.");
    expect(section("preguntas")).toContain(
      "Iniciás sesión en app.ikihomescr.com. Si todavía no tenés cuenta, la creás ahí mismo, gratis."
    );
    expect(markup).not.toContain("Realtor Pro");
  });

  it("never point at an agent page on this site or at the agent form", () => {
    expect(markup).not.toMatch(/href="[^"]*(agentes|avisame)[^"]*"/);
  });
});

describe("the privacy link", () => {
  it("sits inside the FAQ answer and the form's micro line", () => {
    expect(section("preguntas")).toContain('El detalle completo está en la <a href="/es/privacy">Política de privacidad</a>.');
    expect(section("aviso")).toContain('Conocé cómo tratamos tus datos en la <a href="/es/privacy">Política de privacidad</a>.');
  });
});

describe("the countdown as the server renders it", () => {
  const hero = section("top");

  it("reserves invisible digits, so the client's first paint moves nothing", () => {
    expect(hero).toContain('<div class="countdown" role="group" aria-label="Cuenta regresiva para la apertura de IkiHomes">');
    expect(hero).toContain('<span class="cd-num"><span>0</span><span>0</span></span>');
    expect(markup).not.toContain("is-live");
  });

  it("hides the digits from assistive technology and leaves the sentence to the client", () => {
    expect(hero).toContain('<p class="sr-only"></p><div class="cd-face" aria-hidden="true">');
  });

  it("names the date and the hour under the digits", () => {
    expect(hero).toContain(
      '<time dateTime="2026-10-12T08:00:00-06:00"><span class="nw">Lunes 12 de octubre de 2026 ·</span> <span class="nw">8:00 a.m., hora de Costa Rica</span></time>'
    );
  });

  it("falls back to a sentence without JavaScript", () => {
    expect(hero).toContain(
      '<p class="cd-noscript">Abrimos el lunes 12 de octubre a las 8:00 a.m., hora de Costa Rica.</p>'
    );
  });

  it("repeats the face beside the form, silent for screen readers", () => {
    expect(section("aviso")).toContain('<div class="countdown countdown-compact" aria-hidden="true">');
  });

  it("has the done state and an empty polite live region ready for zero", () => {
    expect(hero).toContain('<p class="opening-done-title">Ya abrimos.</p><a class="btn btn-onband" href="/es/search">Buscar propiedades</a>');
    expect(hero).toContain('<p class="sr-only" role="status"></p>');
  });
});

describe("the images", () => {
  it("puts the hero film in the photograph's place, with the photograph gone", () => {
    const hero = section("top");
    expect(hero).toMatch(/<div class="opening-photo opening-film"><picture>.*?<\/picture><video [^>]*><\/video><\/div>/);
    expect(markup).not.toContain("hero-lifestyle");
  });

  it("loads the film's poster first and no source of the film from the server markup", () => {
    const hero = section("top");
    const poster = hero.match(/<img[^>]*hero-film[^>]*>/)?.[0] ?? "";
    expect(poster).toContain('fetchPriority="high"');
    expect(poster).not.toContain('loading="lazy"');
    expect(hero).not.toMatch(/<video[^>]*\ssrc=/);
    expect(hero).not.toMatch(/\.(webm|mp4)/);
  });

  it("uses the sample listing photo in the listing card", () => {
    expect(section("cambia")).toMatch(/<img[^>]*class="pv-photo"[^>]*buyer-listing-sample\.jpg/);
  });
});
