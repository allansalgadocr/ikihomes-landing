import { describe, expect, it } from "vitest";
import { padUnit, splitRemaining, spokenRemaining, unitLabel } from "./countdown";
import es from "@/dictionaries/es.json";

const copy = es.buyer.countdown;
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe("splitRemaining", () => {
  it("splits the distance into days, hours, minutes and seconds", () => {
    expect(splitRemaining(3 * DAY + 14 * HOUR + 22 * MINUTE + 9 * SECOND)).toEqual({
      days: 3, hours: 14, minutes: 22, seconds: 9,
    });
  });

  it("rounds a part second up, so the face reads 1 until zero and never sits on 00 early", () => {
    expect(splitRemaining(1)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 1 });
    expect(splitRemaining(SECOND + 1)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 2 });
  });

  it("stops at zero", () => {
    expect(splitRemaining(0)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    expect(splitRemaining(-5 * SECOND)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});

describe("padUnit", () => {
  it("pads a single digit to two", () => {
    expect(padUnit(0)).toBe("00");
    expect(padUnit(4)).toBe("04");
  });

  it("leaves two or more digits as they are", () => {
    expect(padUnit(11)).toBe("11");
    expect(padUnit(123)).toBe("123");
  });
});

describe("unitLabel", () => {
  it("uses the singular at a value of 1", () => {
    expect(unitLabel("days", 1, copy)).toBe("día");
    expect(unitLabel("hours", 1, copy)).toBe("hora");
    expect(unitLabel("minutes", 1, copy)).toBe("minuto");
    expect(unitLabel("seconds", 1, copy)).toBe("segundo");
  });

  it("uses the plural at any other value, zero included", () => {
    expect(unitLabel("days", 0, copy)).toBe("días");
    expect(unitLabel("hours", 2, copy)).toBe("horas");
    expect(unitLabel("minutes", 59, copy)).toBe("minutos");
    expect(unitLabel("seconds", 10, copy)).toBe("segundos");
  });
});

describe("spokenRemaining, the sentence for screen readers", () => {
  it("reads the deck's sentence with the launch tokens resolved", () => {
    expect(spokenRemaining({ days: 3, hours: 14, minutes: 22, seconds: 9 }, copy)).toBe(
      "Faltan 3 días, 14 horas y 22 minutos para la apertura: Lunes 12 de octubre de 2026, 8:00 a.m., hora de Costa Rica."
    );
  });

  it("uses the singular units at a value of 1", () => {
    expect(spokenRemaining({ days: 1, hours: 1, minutes: 1, seconds: 30 }, copy)).toBe(
      "Faltan 1 día, 1 hora y 1 minuto para la apertura: Lunes 12 de octubre de 2026, 8:00 a.m., hora de Costa Rica."
    );
  });

  it("does not name the seconds, so it changes at most once a minute", () => {
    const early = spokenRemaining({ days: 0, hours: 2, minutes: 5, seconds: 59 }, copy);
    const late = spokenRemaining({ days: 0, hours: 2, minutes: 5, seconds: 1 }, copy);
    expect(early).toBe(late);
  });
});
