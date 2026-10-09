import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LAUNCH_AT } from "./launch";
import { launchClockStore } from "./launchClock";

class FakeInput {
  value = "";
}

/** Just enough of a browser page for the clock: <html>, the email field and the focus. */
function fakePage(phase: string) {
  const attributes = new Map<string, string>([["data-phase", phase]]);
  const root = {
    getAttribute: (name: string) => attributes.get(name) ?? null,
    setAttribute: (name: string, value: string) => void attributes.set(name, value),
    removeAttribute: (name: string) => void attributes.delete(name),
    hasAttribute: (name: string) => attributes.has(name),
  };
  const input = new FakeInput();
  const page = {
    documentElement: root,
    hidden: false,
    activeElement: null as unknown,
    addEventListener: () => {},
    removeEventListener: () => {},
    querySelector: () => null,
    getElementById: (id: string) => (id === "aviso-mail" ? input : null),
  };
  vi.stubGlobal("document", page);
  vi.stubGlobal("window", globalThis);
  vi.stubGlobal("HTMLInputElement", FakeInput);
  return { root, input, page };
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("the launch clock", () => {
  it("after the crossing, a return to the home shows the plain open state, with no second announcement", () => {
    const { root, input, page } = fakePage("pre");
    vi.setSystemTime(LAUNCH_AT - 2000);
    page.activeElement = input; // someone typing their email at the hour

    const leave = launchClockStore.subscribe(() => {});
    vi.advanceTimersByTime(2000);
    expect(launchClockStore.getSnapshot()?.crossed).toBe(true);
    expect(root.getAttribute("data-phase")).toBe("open");
    expect(root.hasAttribute("data-keep-form")).toBe(true);

    // A client navigation to the blog unmounts the home.
    leave();
    expect(root.hasAttribute("data-keep-form")).toBe(false);

    // Back on the home in the same session: open, with the photo, the closing band and no form.
    const leaveAgain = launchClockStore.subscribe(() => {});
    vi.advanceTimersByTime(5000);
    expect(launchClockStore.getSnapshot()).toBeNull();
    expect(root.getAttribute("data-phase")).toBe("open");
    leaveAgain();
  });

  it("before the hour, a return to the home picks the count up again", () => {
    fakePage("pre");
    vi.setSystemTime(LAUNCH_AT - 90_000);

    const leave = launchClockStore.subscribe(() => {});
    leave();
    vi.advanceTimersByTime(10_000);
    const leaveAgain = launchClockStore.subscribe(() => {});

    expect(launchClockStore.getSnapshot()).toEqual({
      remaining: { days: 0, hours: 0, minutes: 1, seconds: 20 },
      crossed: false,
    });
    leaveAgain();
  });
});
