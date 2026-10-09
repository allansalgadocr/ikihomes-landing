import { describe, expect, it } from "vitest";
import {
  HERO_FILM_START,
  filmCrop,
  filmMode,
  filmPosters,
  filmSources,
  filmView,
  loadCrop,
  type FilmMode,
} from "./heroFilm";

/** Just enough of a <video> for a crop switch: its clock, load() and the metadata event. */
function fakeVideo(currentTime: number) {
  const listeners = new Set<() => void>();
  return {
    currentTime,
    duration: 17.333,
    loads: 0,
    load() {
      // As in the browser: load() rewinds and forgets the duration until the new metadata.
      this.loads += 1;
      this.currentTime = 0;
      this.duration = Number.NaN;
    },
    addEventListener(_type: "loadedmetadata", listener: () => void) {
      listeners.add(listener);
    },
    removeEventListener(_type: "loadedmetadata", listener: () => void) {
      listeners.delete(listener);
    },
    metadata(duration = 17.333) {
      this.duration = duration;
      [...listeners].forEach((listener) => listener());
    },
    pending: () => listeners.size,
  };
}

describe("the panel's mode", () => {
  it("is the countdown before the opening", () => {
    expect(filmMode("pre", false)).toBe("countdown");
  });

  it("is the photo mode on a page that loads open", () => {
    expect(filmMode("open", false)).toBe("photo");
  });

  it("is done when the hour passes with the page open", () => {
    expect(filmMode("open", true)).toBe("done");
  });
});

describe("the crop", () => {
  it.each<[FilmMode, boolean, string]>([
    ["countdown", false, "desktop-side"],
    ["countdown", true, "phone-pre"],
    ["done", false, "desktop-side"],
    ["done", true, "phone-pre"],
    ["photo", false, "desktop-full"],
    ["photo", true, "phone-full"],
  ])("in the %s mode, on a phone %s, is %s", (mode, phone, crop) => {
    expect(filmCrop(mode, phone)).toBe(crop);
  });
});

describe("the files", () => {
  it("offers WebM first, then MP4, for the crop", () => {
    expect(filmSources("desktop-side")).toEqual([
      { src: "/hero-film/desktop-side.webm", type: 'video/webm; codecs="vp9"' },
      { src: "/hero-film/desktop-side.mp4", type: "video/mp4" },
    ]);
  });

  it("takes the posters of the side crops before the opening and of the full ones after it", () => {
    expect(filmPosters("countdown")).toEqual({
      phone: { webp: "/hero-film/phone-pre-poster.webp", jpg: "/hero-film/phone-pre-poster.jpg" },
      desktop: { webp: "/hero-film/desktop-side-poster.webp", jpg: "/hero-film/desktop-side-poster.jpg" },
    });
    expect(filmPosters("done")).toEqual(filmPosters("countdown"));
    expect(filmPosters("photo")).toEqual({
      phone: { webp: "/hero-film/phone-full-poster.webp", jpg: "/hero-film/phone-full-poster.jpg" },
      desktop: { webp: "/hero-film/desktop-full-poster.webp", jpg: "/hero-film/desktop-full-poster.jpg" },
    });
  });
});

describe("a crop switch", () => {
  it("keeps the playback time", () => {
    const video = fakeVideo(12.4);

    loadCrop(video, false);
    expect(video.loads).toBe(1);
    video.metadata();

    expect(video.currentTime).toBe(12.4);
    expect(video.pending()).toBe(0);
  });

  it("starts the first crop on the poster's second, so the handoff from the poster is invisible", () => {
    const video = fakeVideo(0);

    loadCrop(video, true);
    video.metadata();

    expect(HERO_FILM_START).toBe(5);
    expect(video.currentTime).toBe(5);
  });

  it("folds a time past the end of a shorter re-render back into the loop", () => {
    const video = fakeVideo(16);

    loadCrop(video, false);
    video.metadata(10);

    expect(video.currentTime).toBe(6);
  });

  it("keeps a time that is still waiting for its metadata when the crop changes again", () => {
    const video = fakeVideo(12.4);

    loadCrop(video, false); // paused off screen: preload none, no metadata yet
    loadCrop(video, false); // the width crosses back
    video.metadata();

    expect(video.currentTime).toBe(12.4);
  });
});

describe("what the film shows", () => {
  const base = { mode: "countdown" as const, phone: false, paused: false };

  it("attaches no source and offers no control before the page has loaded", () => {
    expect(filmView({ ...base, calm: false, loaded: false, played: false })).toMatchObject({
      crop: null,
      on: false,
      control: null,
    });
  });

  it("attaches the crop's sources after the load event, and offers the control once the film plays", () => {
    expect(filmView({ ...base, calm: false, loaded: true, played: false })).toMatchObject({
      crop: "desktop-side",
      control: null,
    });
    expect(filmView({ ...base, calm: false, loaded: true, played: true })).toMatchObject({
      crop: "desktop-side",
      on: true,
      control: { paused: false },
    });
  });

  it("under reduced motion attaches no source and offers no control, ever", () => {
    expect(filmView({ ...base, calm: true, loaded: true, played: true, paused: true })).toMatchObject({
      crop: null,
      on: false,
      control: null,
    });
  });

  it("follows the mode and the width", () => {
    expect(filmView({ mode: "photo", phone: true, calm: false, loaded: true, played: true, paused: true })).toMatchObject({
      mode: "photo",
      crop: "phone-full",
      control: { paused: true },
    });
  });
});
