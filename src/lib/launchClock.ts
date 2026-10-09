import { useSyncExternalStore } from "react";
import { LAUNCH_AT } from "./launch";
import { splitRemaining, type Remaining } from "./countdown";

/**
 * The countdown's single clock, shared by the hero face, the small face beside
 * the notify form and the opening stage, so the three turn on the same tick.
 *
 * It runs only while <html> says pre, in the browser. On the server, and on a
 * page that is already open, it never starts and the faces keep the reserved,
 * invisible digits the server rendered.
 */
export interface LaunchClock {
  remaining: Remaining;
  /** The hour passed while this page was open. */
  crossed: boolean;
}

let clock: LaunchClock | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

function emit(next: LaunchClock) {
  clock = next;
  listeners.forEach((listener) => listener());
}

/** Someone typing their email at the hour, or who just left it, keeps the form until they leave. */
function formInUse(): boolean {
  if (document.querySelector("[data-notify-success]")) return true;
  const input = document.getElementById("aviso-mail");
  return input instanceof HTMLInputElement && (document.activeElement === input || input.value.trim() !== "");
}

/** Zero, with the page open: the stage says so and the page turns to its open state. */
function cross() {
  const root = document.documentElement;
  if (formInUse()) root.setAttribute("data-keep-form", "");
  root.setAttribute("data-crossed", "");
  window.setTimeout(() => root.removeAttribute("data-crossed"), 700);
  root.setAttribute("data-phase", "open");
  emit({ remaining: splitRemaining(0), crossed: true });
}

function tick() {
  clearTimeout(timer);
  if (document.documentElement.getAttribute("data-phase") !== "pre") return;
  const ms = LAUNCH_AT - Date.now();
  if (ms <= 0) {
    cross();
    return;
  }
  emit({ remaining: splitRemaining(ms), crossed: false });
  // Lands on the target's own second boundary, so the face never drifts.
  timer = setTimeout(tick, ms % 1000 || 1000);
}

// A background tab throttles timers. Recount the moment it is looked at again.
function onVisibilityChange() {
  if (!document.hidden) tick();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    document.addEventListener("visibilitychange", onVisibilityChange);
    tick();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size > 0) return;
    clearTimeout(timer);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    // The last face left: the visitor navigated away from the home. "Ya
    // abrimos." and a form kept at the crossing belong to that visit, so back
    // on the home in the same session the page is simply open and nothing is
    // announced again. Before the hour, the next visit counts afresh.
    clock = null;
    document.documentElement.removeAttribute("data-keep-form");
  };
}

/** The store behind useLaunchClock, exported for its tests. */
export const launchClockStore = {
  subscribe,
  getSnapshot: (): LaunchClock | null => clock,
  getServerSnapshot: (): LaunchClock | null => null,
};

/** The current count, or null on the server, on an open page and before the first tick. */
export function useLaunchClock(): LaunchClock | null {
  const { getSnapshot, getServerSnapshot } = launchClockStore;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
