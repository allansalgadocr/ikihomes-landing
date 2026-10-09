import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import es from "@/dictionaries/es.json";
import { filmView } from "@/lib/heroFilm";
import { HeroFilm, HeroFilmView } from "./HeroFilm";

const LABEL = es.buyer.hero.film_toggle;
const video = (markup: string) => markup.match(/<video[^>]*>.*?<\/video>/)?.[0] ?? "";
const toggle = (markup: string) => markup.match(/<button[^>]*>/)?.[0] ?? "";

describe("the hero film as the server renders it", () => {
  const pre = renderToStaticMarkup(<HeroFilm label={LABEL} serverPhase="pre" />);
  const open = renderToStaticMarkup(<HeroFilm label={LABEL} serverPhase="open" />);

  it("renders the video with no source, so nothing of the film is requested before the client asks", () => {
    expect(video(pre)).toMatch(/^<video [^>]*><\/video>$/);
    expect(video(pre)).not.toMatch(/\ssrc=/);
    expect(pre).not.toContain("<source src=");
  });

  it("renders a silent, looping, inline video with no player of its own, hidden from assistive technology", () => {
    const tag = video(pre);
    for (const attribute of ['muted=""', 'loop=""', 'playsInline=""', 'preload="none"', 'aria-hidden="true"', 'tabindex="-1"']) {
      expect(tag).toContain(attribute);
    }
    expect(tag).not.toContain("controls");
    expect(tag).not.toContain("autoplay");
  });

  it("keeps the photograph's box and shows the poster of the side crops before the opening", () => {
    expect(pre).toMatch(/^<div class="opening-photo opening-film">/);
    expect(pre).toContain('<source media="(max-width: 760px)" type="image/webp" srcSet="/hero-film/phone-pre-poster.webp"/>');
    expect(pre).toContain('<source media="(max-width: 760px)" srcSet="/hero-film/phone-pre-poster.jpg"/>');
    expect(pre).toContain('<source type="image/webp" srcSet="/hero-film/desktop-side-poster.webp"/>');
    expect(pre).toMatch(/<img src="\/hero-film\/desktop-side-poster\.jpg" alt="" fetchPriority="high"\/>/);
  });

  it("shows the poster of the full crops on a page rendered open", () => {
    expect(open).toContain('srcSet="/hero-film/phone-full-poster.webp"');
    expect(open).toContain('<img src="/hero-film/desktop-full-poster.jpg"');
    expect(open).not.toContain("-side-");
    expect(open).not.toContain("-pre-");
  });

  it("offers no pause control: without JavaScript nothing moves", () => {
    expect(pre).not.toContain("<button");
  });
});

describe("the pause control", () => {
  const playing = filmView({ mode: "countdown", phone: false, calm: false, loaded: true, played: true, paused: false });
  const paused = filmView({ mode: "countdown", phone: false, calm: false, loaded: true, played: true, paused: true });

  it("is named Pausar el video and says it is not pressed while the film plays", () => {
    expect(LABEL).toBe("Pausar el video");
    expect(toggle(renderToStaticMarkup(<HeroFilmView view={playing} label={LABEL} />))).toBe(
      '<button type="button" class="opening-film-toggle" aria-label="Pausar el video" aria-pressed="false">'
    );
  });

  it("keeps its name and says it is pressed while the visitor has the film paused", () => {
    expect(toggle(renderToStaticMarkup(<HeroFilmView view={paused} label={LABEL} />))).toBe(
      '<button type="button" class="opening-film-toggle" aria-label="Pausar el video" aria-pressed="true">'
    );
  });

  it("sits in the film, after the video, with the sources of the crop, MP4 first", () => {
    const markup = renderToStaticMarkup(<HeroFilmView view={playing} label={LABEL} />);
    expect(markup).toContain('<div class="opening-photo opening-film is-on">');
    expect(video(markup)).toContain(
      '<source src="/hero-film/desktop-side.mp4" type="video/mp4"/><source src="/hero-film/desktop-side.webm" type="video/webm; codecs=&quot;vp9&quot;"/></video>'
    );
    expect(markup.indexOf("<button")).toBeGreaterThan(markup.indexOf("</video>"));
  });
});

describe("a refused autoplay", () => {
  const base = { mode: "countdown" as const, phone: false, calm: false, loaded: true, played: false };

  it("offers the control, named Pausar el video and pressed, over the poster, so a tap starts the film", () => {
    const markup = renderToStaticMarkup(
      <HeroFilmView view={filmView({ ...base, paused: true, refused: true })} label={LABEL} />
    );
    expect(markup).toMatch(/^<div class="opening-photo opening-film">/);
    expect(toggle(markup)).toBe(
      '<button type="button" class="opening-film-toggle" aria-label="Pausar el video" aria-pressed="true">'
    );
    expect(video(markup)).toContain('<source src="/hero-film/desktop-side.mp4" type="video/mp4"/>');
  });

  it("offers no control while play() has not been refused, an AbortError included", () => {
    expect(renderToStaticMarkup(<HeroFilmView view={filmView({ ...base, paused: false })} label={LABEL} />)).not.toContain(
      "<button"
    );
  });
});

describe("once every format has failed", () => {
  const broken = filmView({
    mode: "countdown",
    phone: false,
    calm: false,
    loaded: true,
    played: true,
    paused: false,
    failed: ["mp4", "webm"],
  });
  const markup = renderToStaticMarkup(<HeroFilmView view={broken} label={LABEL} />);

  it("shows the poster with no source and no control", () => {
    expect(markup).toMatch(/^<div class="opening-photo opening-film">/);
    expect(video(markup)).not.toContain("<source");
    expect(markup).not.toContain("<button");
  });
});

describe("after a format has failed", () => {
  it("attaches only the formats left, in order", () => {
    const view = filmView({
      mode: "photo",
      phone: true,
      calm: false,
      loaded: true,
      played: true,
      paused: false,
      failed: ["mp4"],
    });
    expect(video(renderToStaticMarkup(<HeroFilmView view={view} label={LABEL} />))).toMatch(
      /^<video [^>]*><source src="\/hero-film\/phone-full\.webm" type="video\/webm; codecs=&quot;vp9&quot;"\/><\/video>$/
    );
  });
});

describe("under reduced motion", () => {
  const calm = filmView({ mode: "countdown", phone: false, calm: true, loaded: true, played: true, paused: false });
  const markup = renderToStaticMarkup(<HeroFilmView view={calm} label={LABEL} />);

  it("attaches no source: the poster stays", () => {
    expect(video(markup)).not.toContain("<source");
    expect(markup).toContain('<img src="/hero-film/desktop-side-poster.jpg"');
    expect(markup).not.toContain("is-on");
  });

  it("renders no control, so nothing focusable is offered for motion that is not there", () => {
    expect(markup).not.toContain("<button");
    expect(markup).not.toMatch(/tabindex="(?!-1)/);
  });
});
