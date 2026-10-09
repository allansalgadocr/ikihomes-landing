/**
 * The hero film on the Spanish home: one 17.3 second timeline in four crops,
 * one for each box the photograph used to fill.
 *
 *   desktop-side   before the opening, two columns (the right 64 % of the panel)
 *   desktop-full   the open panel, two columns
 *   phone-pre      before the opening, under 761px (the strip under the countdown)
 *   phone-full     the open panel, under 761px
 *
 * The files live in public/hero-film/, renamed from the render:
 * ikihomes-hero-<crop>.webm|mp4 becomes <crop>.webm|mp4 and
 * poster-<crop>.webp|jpg becomes <crop>-poster.webp|jpg. A re-render can be
 * copied over them under the same names. Nothing here depends on their content
 * but the poster's second: each poster is the frame at HERO_FILM_START.
 *
 * Built to the approved mockup (landing-compradores/mockup.html, the film script).
 */

export type FilmCrop = "desktop-side" | "desktop-full" | "phone-pre" | "phone-full";

/**
 * The panel's mode, as the mockup names it: countdown before the hour, done
 * when the hour passes with the page open (it keeps the countdown's box), and
 * photo on a page that loads open.
 */
export type FilmMode = "countdown" | "done" | "photo";

export interface FilmSource {
  src: string;
  type: string;
}

const DIR = "/hero-film/";

/** The second each poster was taken at. Starting there makes the handoff from poster to video invisible. */
export const HERO_FILM_START = 5;

/** The stylesheet's phone breakpoint: the panel stacks at 760px and below. */
export const HERO_FILM_PHONE_QUERY = "(max-width: 760px)";

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** The mode the stylesheet gives the panel, from the phase on <html> and the crossing at zero. */
export function filmMode(phase: string | null, crossed: boolean): FilmMode {
  if (crossed) return "done";
  return phase === null || phase === "pre" ? "countdown" : "photo";
}

/** The crop for the panel's mode and the width: the full crops only in the photo mode. */
export function filmCrop(mode: FilmMode, phone: boolean): FilmCrop {
  const full = mode === "photo";
  if (phone) return full ? "phone-full" : "phone-pre";
  return full ? "desktop-full" : "desktop-side";
}

export type FilmFormat = "mp4" | "webm";

/**
 * The formats, in the order the video tries them. The MP4 (H.264 High, yuv420p)
 * plays on every phone. The WebM (VP9) comes second: an iPhone can say it plays
 * VP9 and then fail to fetch or decode it.
 */
const FORMATS: readonly { format: FilmFormat; type: string }[] = [
  { format: "mp4", type: "video/mp4" },
  { format: "webm", type: 'video/webm; codecs="vp9"' },
];

/** The crop's sources, MP4 first, without the formats that have failed. */
export function filmSources(crop: FilmCrop, failed: readonly FilmFormat[] = []): FilmSource[] {
  return FORMATS.filter(({ format }) => !failed.includes(format)).map(({ format, type }) => ({
    src: `${DIR}${crop}.${format}`,
    type,
  }));
}

/**
 * The failed formats once one more has failed: the format at the URL that
 * failed (a <source>'s src, or the video's currentSrc), or the first format
 * left when the video failed before it chose one. A failed format is never
 * attached again, so each is tried once and a broken network cannot keep the
 * film reloading; an error from a format that has already failed changes nothing.
 */
export function failFormat(failed: readonly FilmFormat[], url: string): readonly FilmFormat[] {
  const path = url.split(/[?#]/)[0];
  const format =
    FORMATS.find(({ format }) => path.endsWith(`.${format}`))?.format ??
    FORMATS.find(({ format }) => !failed.includes(format))?.format;
  return format === undefined || failed.includes(format) ? failed : [...failed, format];
}

function poster(crop: FilmCrop) {
  return { webp: `${DIR}${crop}-poster.webp`, jpg: `${DIR}${crop}-poster.jpg` };
}

/** The posters for the panel's mode, one per side of the breakpoint. */
export function filmPosters(mode: FilmMode) {
  return { phone: poster(filmCrop(mode, true)), desktop: poster(filmCrop(mode, false)) };
}

export interface FilmState {
  mode: FilmMode;
  /** At or under the phone breakpoint. */
  phone: boolean;
  /** prefers-reduced-motion: reduce. */
  calm: boolean;
  /** The window load event has passed. */
  loaded: boolean;
  /** The video has started playing at least once. */
  played: boolean;
  /** The visitor paused it, or the browser refused to start it. */
  paused: boolean;
  /** The formats that have failed, none by default. */
  failed?: readonly FilmFormat[];
  /** The browser refused to start the film on its own (NotAllowedError); false by default. */
  refused?: boolean;
}

export interface FilmView {
  mode: FilmMode;
  /** The crop whose sources are attached, or null while none may be and once every format has failed. */
  crop: FilmCrop | null;
  /** The sources attached, in the order the video tries them. */
  sources: FilmSource[];
  /** The video is shown over the poster. */
  on: boolean;
  /** The pause control, offered while there is motion to pause or a refused film to start. */
  control: { paused: boolean } | null;
}

/**
 * What the film shows. The sources wait for the load event, so the film never
 * competes with the page for the network; under reduced motion they are never
 * attached and the poster stays. The pause control appears with the motion, so
 * no one is offered a control for a film that does not move, except when the
 * browser refused to start it: then the control is offered paused, and the
 * visitor's tap starts it. Once every format has failed the poster stays, with
 * no source and no control.
 */
export function filmView({ mode, phone, calm, loaded, played, paused, failed = [], refused = false }: FilmState): FilmView {
  const crop = filmCrop(mode, phone);
  const sources = loaded && !calm ? filmSources(crop, failed) : [];
  const live = sources.length > 0;
  return {
    mode,
    crop: live ? crop : null,
    sources,
    on: played && live,
    control: (played || refused) && live ? { paused } : null,
  };
}

/** The parts of a <video> a crop switch uses. */
export interface FilmVideo {
  currentTime: number;
  readonly duration: number;
  load(): void;
  addEventListener(type: "loadedmetadata", listener: () => void): void;
  removeEventListener(type: "loadedmetadata", listener: () => void): void;
}

/**
 * Loads the sources now attached to the video. The first crop starts on the
 * poster's second; every later load (a new crop, or the next format after one
 * failed) carries on from the time the last one had reached, folded into the
 * loop in case a re-render is shorter. A time still waiting for its metadata (a
 * film paused off screen loads nothing, a format that failed before its
 * metadata) is left to land, because the video already reads 0 again.
 */
export function loadCrop(video: FilmVideo, first: boolean): void {
  const at = first ? HERO_FILM_START : video.currentTime || 0;
  video.load();
  if (!at) return;
  const resume = () => {
    video.removeEventListener("loadedmetadata", resume);
    const { duration } = video;
    video.currentTime = Number.isFinite(duration) && duration > 0 ? at % duration : at;
  };
  video.addEventListener("loadedmetadata", resume);
}

/** The part of a <video> that starts it. Older browsers return no promise. */
export interface FilmPlayer {
  play(): Promise<void> | undefined;
}

/**
 * Starts the film. A browser that refuses (NotAllowedError: Low Power Mode on
 * an iPhone, an in-app browser) calls onRefused, so the visitor is offered the
 * control to start it. Any other rejection, such as the AbortError of a load
 * that interrupts play(), is left alone.
 */
export function playFilm(video: FilmPlayer, onRefused: () => void): void {
  video.play()?.catch((error: unknown) => {
    if ((error as { name?: unknown } | null)?.name === "NotAllowedError") onRefused();
  });
}

/**
 * The visitor's click, tap, Enter or Space on the film, and whether it is
 * paused after it. Playing happens at once, inside the gesture, so a browser
 * that refused to start the film on its own starts it now; pausing is left to
 * the film's state.
 */
export function toggleFilm(video: FilmPlayer | null, paused: boolean, onRefused: () => void): boolean {
  if (paused && video) playFilm(video, onRefused);
  return !paused;
}
