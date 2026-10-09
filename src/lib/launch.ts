/**
 * The opening of IkiHomes to buyers, in one place.
 *
 * The Spanish home is a teaser with a countdown until this instant and the
 * open buyer page from it on. Change the hour or the date here and nowhere
 * else: the phase, the countdown, the metadata and every sentence that names
 * the date read from this module (copy deck, section 0, launch tokens).
 *
 * Costa Rica is six hours behind UTC all year, with no daylight saving.
 */
export const LAUNCH = {
  iso: "2026-10-12T08:00:00-06:00",
  date_long: "Lunes 12 de octubre de 2026",
  date_short: "lunes 12 de octubre",
  time: "8:00 a.m.",
  tz: "hora de Costa Rica",
} as const;

export const LAUNCH_AT = Date.parse(LAUNCH.iso);

export type LaunchPhase = "pre" | "open";

/** The phase at a given time: open at and after the launch instant, pre before it. */
export function phaseAt(now: number): LaunchPhase {
  return now >= LAUNCH_AT ? "open" : "pre";
}

/**
 * The phase now. Read by the server when it renders a Spanish page, which on
 * the home happens again every minute (revalidate), so reading the clock at
 * render time is the point: it is how the static HTML turns open at the hour.
 */
export function currentPhase(): LaunchPhase {
  return phaseAt(Date.now());
}

type LaunchToken = Exclude<keyof typeof LAUNCH, "iso">;

/**
 * Resolves the deck's launch placeholders ({date_long}, {date_short}, {time},
 * {tz}). Any other placeholder, such as {privacy_link}, is left for the page.
 */
export function fillLaunch(text: string): string {
  return text.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key !== "iso" && key in LAUNCH ? LAUNCH[key as LaunchToken] : whole
  );
}

/**
 * The rule of the script in <head>: a page rendered before the instant turns
 * open if the visitor's clock is at or past it. It never turns open back to
 * pre, because a device with a slow clock must not undo a server that already
 * says open. A page without a phase, which is every English page, is left alone.
 */
export function correctPhase(phase: string | null, now: number): string | null {
  return phase === "pre" && now >= LAUNCH_AT ? "open" : phase;
}

/**
 * correctPhase as an inline script, run in <head> before the first paint so a
 * statically rendered "pre" page never flashes the countdown after the hour.
 */
export const PHASE_SCRIPT = `(function(r){if(r.getAttribute("data-phase")==="pre"&&Date.now()>=${LAUNCH_AT})r.setAttribute("data-phase","open")})(document.documentElement)`;
