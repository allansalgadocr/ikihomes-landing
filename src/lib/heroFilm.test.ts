import { describe, expect, it } from "vitest";
import {
  HERO_FILM_START,
  failFormat,
  filmCrop,
  filmMode,
  filmPosters,
  filmSources,
  filmView,
  loadCrop,
  playFilm,
  toggleFilm,
  type FilmCrop,
  type FilmMode,
  type FilmState,
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
  it.each<FilmCrop>(["desktop-side", "desktop-full", "phone-pre", "phone-full"])(
    "offer the %s crop as MP4 first, which every phone plays, then WebM",
    (crop) => {
      expect(filmSources(crop)).toEqual([
        { src: `/hero-film/${crop}.mp4`, type: "video/mp4" },
        { src: `/hero-film/${crop}.webm`, type: 'video/webm; codecs="vp9"' },
      ]);
    }
  );

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

describe("a format that fails", () => {
  const playing: FilmState = { mode: "countdown", phone: false, calm: false, loaded: true, played: true, paused: false };
  const MP4 = { src: "/hero-film/desktop-side.mp4", type: "video/mp4" };
  const WEBM = { src: "/hero-film/desktop-side.webm", type: 'video/webm; codecs="vp9"' };

  it("attaches both formats, MP4 first, while none has failed", () => {
    expect(filmView(playing).sources).toEqual([MP4, WEBM]);
  });

  it("moves a failed MP4 on to the WebM, from where the film was", () => {
    const video = fakeVideo(0);
    loadCrop(video, true);
    video.metadata();
    video.currentTime = 9.2; // it decodes, plays, then fails

    // The video reports the failure with the MP4 as its currentSrc.
    const failed = failFormat([], "https://www.ikihomescr.com/hero-film/desktop-side.mp4");
    const next = filmView({ ...playing, failed });
    loadCrop(video, false);
    video.metadata();

    expect(failed).toEqual(["mp4"]);
    expect(next).toMatchObject({ crop: "desktop-side", sources: [WEBM], on: true, control: { paused: false } });
    expect(video.loads).toBe(2);
    expect(video.currentTime).toBe(9.2);
  });

  it("keeps the poster's second when the MP4 fails before its metadata", () => {
    const video = fakeVideo(0);
    loadCrop(video, true);
    // An error on the MP4's <source>: no metadata ever came.
    const failed = failFormat([], "https://www.ikihomescr.com/hero-film/desktop-side.mp4");
    loadCrop(video, false);
    video.metadata();

    expect(filmView({ ...playing, played: false, failed }).sources).toEqual([WEBM]);
    expect(video.currentTime).toBe(HERO_FILM_START);
  });

  it("moves a failed WebM, when it is current, on to the format left, from where the film was", () => {
    // A browser that went past the MP4 on its own is playing the WebM.
    const video = fakeVideo(0);
    loadCrop(video, true);
    video.metadata();
    video.currentTime = 11.5;

    const failed = failFormat([], "https://www.ikihomescr.com/hero-film/desktop-side.webm");
    loadCrop(video, false);
    video.metadata();

    expect(failed).toEqual(["webm"]);
    expect(filmView({ ...playing, failed }).sources).toEqual([MP4]);
    expect(video.currentTime).toBe(11.5);
  });

  it("keeps the visitor's pause through the move", () => {
    expect(filmView({ ...playing, paused: true, failed: ["mp4"] })).toMatchObject({
      sources: [WEBM],
      control: { paused: true },
    });
  });

  it("stays failed when the crop changes, so a new crop starts on the format that works", () => {
    expect(filmView({ ...playing, mode: "photo", phone: true, failed: ["mp4"] }).sources).toEqual([
      { src: "/hero-film/phone-full.webm", type: 'video/webm; codecs="vp9"' },
    ]);
  });

  it("takes a video that fails before it has chosen a source as a failure of the first format left", () => {
    expect(failFormat([], "")).toEqual(["mp4"]);
    expect(failFormat(["mp4"], "")).toEqual(["mp4", "webm"]);
  });

  it("tries each format once: a second error from a failed format changes nothing", () => {
    const mp4 = failFormat([], "https://www.ikihomescr.com/hero-film/phone-pre.mp4");
    const both = failFormat(mp4, "https://www.ikihomescr.com/hero-film/phone-pre.webm");

    expect(both).toEqual(["mp4", "webm"]);
    expect(failFormat(mp4, "https://www.ikihomescr.com/hero-film/phone-pre.mp4")).toBe(mp4);
    expect(failFormat(both, "https://www.ikihomescr.com/hero-film/phone-pre.webm")).toBe(both);
    expect(failFormat(both, "")).toBe(both);
  });

  it("leaves the poster with no control and no source once every format has failed", () => {
    for (const state of [playing, { ...playing, paused: true }, { ...playing, played: false, paused: true, refused: true }]) {
      expect(filmView({ ...state, failed: ["mp4", "webm"] })).toMatchObject({
        crop: null,
        sources: [],
        on: false,
        control: null,
      });
    }
  });
});

/** Just enough of a <video> to play it: play() resolves, or rejects with the named DOMException. */
function fakePlayer(rejection?: string) {
  return {
    plays: 0,
    play() {
      this.plays += 1;
      return rejection ? Promise.reject(new DOMException("play() failed", rejection)) : Promise.resolve();
    },
  };
}

const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("a refused autoplay", () => {
  const waiting: FilmState = { mode: "countdown", phone: false, calm: false, loaded: true, played: false, paused: false };

  it("offers the control in its paused state over the poster when play() is refused", async () => {
    let state = waiting;
    playFilm(fakePlayer("NotAllowedError"), () => (state = { ...state, refused: true, paused: true }));
    expect(filmView(state).control).toBeNull();

    await settle();

    expect(filmView(state)).toMatchObject({ crop: "desktop-side", on: false, control: { paused: true } });
  });

  it("plays at once, inside the visitor's gesture, when the paused control is activated", () => {
    const video = fakePlayer();

    expect(toggleFilm(video, true, () => {})).toBe(false);
    expect(video.plays).toBe(1);
  });

  it("leaves pausing to the film's state when the control pauses it", () => {
    const video = fakePlayer();

    expect(toggleFilm(video, false, () => {})).toBe(true);
    expect(video.plays).toBe(0);
  });

  it("offers the control again if the visitor's play is refused too", async () => {
    let refused = false;
    toggleFilm(fakePlayer("NotAllowedError"), true, () => (refused = true));
    await settle();

    expect(refused).toBe(true);
  });

  it("does not offer the control for an AbortError alone, as when a load interrupts play()", async () => {
    let refused = false;
    playFilm(fakePlayer("AbortError"), () => (refused = true));
    await settle();

    expect(refused).toBe(false);
    expect(filmView(waiting).control).toBeNull();
  });

  it("offers nothing under reduced motion", () => {
    expect(filmView({ ...waiting, calm: true, paused: true, refused: true }).control).toBeNull();
  });
});
