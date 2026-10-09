import { fillLaunch } from "./launch";

export type CountdownUnit = "days" | "hours" | "minutes" | "seconds";

export const COUNTDOWN_UNITS: readonly CountdownUnit[] = ["days", "hours", "minutes", "seconds"];

export type Remaining = Record<CountdownUnit, number>;

/** The deck strings the countdown writes itself (copy deck, section 3). */
export type CountdownCopy = Record<`unit_${CountdownUnit}` | `unit_${CountdownUnit}_one`, string> & {
  aria_remaining: string;
};

/**
 * Splits a distance in milliseconds into the four units. Seconds round up, so
 * the face reads 10, 9 ... 1 and turns at zero rather than sitting on 00 for
 * the last part of a second.
 */
export function splitRemaining(ms: number): Remaining {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/** The digits a unit shows: at least two. */
export function padUnit(value: number): string {
  return String(value).padStart(2, "0");
}

/** The unit's label, singular at a value of 1. */
export function unitLabel(unit: CountdownUnit, value: number, copy: CountdownCopy): string {
  return value === 1 ? copy[`unit_${unit}_one`] : copy[`unit_${unit}`];
}

/**
 * The sentence screen readers get in place of the digits. It names days, hours
 * and minutes only, so it changes at most once a minute, never every second.
 */
export function spokenRemaining(remaining: Remaining, copy: CountdownCopy): string {
  return (["days", "hours", "minutes"] as const).reduce(
    (sentence, unit) =>
      sentence.replace(
        `{${unit}} ${copy[`unit_${unit}`]}`,
        `${remaining[unit]} ${unitLabel(unit, remaining[unit], copy)}`
      ),
    fillLaunch(copy.aria_remaining)
  );
}
