import { describe, expect, it } from "vitest";
import { LAUNCH, LAUNCH_AT, PHASE_SCRIPT, correctPhase, fillLaunch, phaseAt } from "./launch";

const DAY = 24 * 60 * 60 * 1000;

describe("the launch instant", () => {
  it("is 8:00 a.m. on Monday 12 October 2026 in Costa Rica, six hours behind UTC", () => {
    expect(LAUNCH.iso).toBe("2026-10-12T08:00:00-06:00");
    expect(LAUNCH_AT).toBe(Date.UTC(2026, 9, 12, 14, 0, 0));
  });
});

describe("phaseAt", () => {
  it("is pre one millisecond before the instant", () => {
    expect(phaseAt(LAUNCH_AT - 1)).toBe("pre");
  });

  it("is open at the instant", () => {
    expect(phaseAt(LAUNCH_AT)).toBe("open");
  });

  it("is open after the instant", () => {
    expect(phaseAt(LAUNCH_AT + DAY)).toBe("open");
  });
});

describe("the display tokens", () => {
  it("hold the deck's launch tokens", () => {
    expect(LAUNCH.date_long).toBe("Lunes 12 de octubre de 2026");
    expect(LAUNCH.date_short).toBe("lunes 12 de octubre");
    expect(LAUNCH.time).toBe("8:00 a.m.");
    expect(LAUNCH.tz).toBe("hora de Costa Rica");
  });

  it("resolve the date line", () => {
    expect(fillLaunch("{date_long} · {time}, {tz}")).toBe(
      "Lunes 12 de octubre de 2026 · 8:00 a.m., hora de Costa Rica"
    );
  });

  it("resolve every placeholder in a sentence", () => {
    expect(fillLaunch("Abrimos el {date_short} a las {time}, {tz}.")).toBe(
      "Abrimos el lunes 12 de octubre a las 8:00 a.m., hora de Costa Rica."
    );
  });

  it("leave a placeholder that is not a launch token for the page to fill", () => {
    expect(fillLaunch("Leé la {privacy_link}.")).toBe("Leé la {privacy_link}.");
  });
});

describe("correctPhase, the rule of the script in <head>", () => {
  it("keeps pre while the visitor's clock is before the instant", () => {
    expect(correctPhase("pre", LAUNCH_AT - 1)).toBe("pre");
  });

  it("moves pre to open when the visitor's clock reaches the instant", () => {
    expect(correctPhase("pre", LAUNCH_AT)).toBe("open");
    expect(correctPhase("pre", LAUNCH_AT + DAY)).toBe("open");
  });

  it("never moves open back to pre, whatever the visitor's clock says", () => {
    expect(correctPhase("open", LAUNCH_AT - DAY)).toBe("open");
    expect(correctPhase("open", 0)).toBe("open");
  });

  it("leaves a page without a phase alone", () => {
    expect(correctPhase(null, LAUNCH_AT + DAY)).toBeNull();
  });
});

describe("PHASE_SCRIPT", () => {
  function run(phase: string | null, now: number) {
    const attributes = new Map<string, string>();
    if (phase !== null) attributes.set("data-phase", phase);
    const documentElement = {
      getAttribute: (name: string) => attributes.get(name) ?? null,
      setAttribute: (name: string, value: string) => void attributes.set(name, value),
    };
    new Function("document", "Date", PHASE_SCRIPT)({ documentElement }, { now: () => now });
    return attributes.get("data-phase") ?? null;
  }

  const cases: [string | null, number][] = [
    ["pre", LAUNCH_AT - 1],
    ["pre", LAUNCH_AT],
    ["pre", LAUNCH_AT + DAY],
    ["open", LAUNCH_AT - DAY],
    ["open", LAUNCH_AT + DAY],
    [null, LAUNCH_AT + DAY],
  ];

  it.each(cases)("applies the same rule as correctPhase from %s at %d", (phase, now) => {
    expect(run(phase, now)).toBe(correctPhase(phase, now));
  });

  it("is a single statement with no dependency, so it can run inline before first paint", () => {
    expect(PHASE_SCRIPT).not.toMatch(/import|require|\n/);
  });
});
