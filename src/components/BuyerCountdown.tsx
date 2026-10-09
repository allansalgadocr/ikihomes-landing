"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { LAUNCH } from "@/lib/launch";
import {
  COUNTDOWN_UNITS,
  padUnit,
  spokenRemaining,
  unitLabel,
  type CountdownCopy,
} from "@/lib/countdown";
import { useLaunchClock } from "@/lib/launchClock";

export type CountdownFaceCopy = CountdownCopy & {
  kicker: string;
  aria_label: string;
  /** With the launch tokens resolved. */
  date_line: string;
  /** With the launch tokens resolved. */
  noscript: string;
};

/** One digit. A new digit settles in, with no movement, and nothing at all under reduced motion. */
function Digit({ value, live }: { value: string; live: boolean }) {
  const cell = useRef<HTMLSpanElement>(null);
  const shown = useRef<string | null>(null);

  useEffect(() => {
    if (!live) return;
    const before = shown.current;
    shown.current = value;
    // The first live paint only fills the reserved space: nothing to settle.
    if (before === null || before === value || !cell.current?.animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cell.current.animate([{ opacity: 0.4 }, { opacity: 1 }], {
      duration: 360,
      easing: "cubic-bezier(.2,.8,.2,1)",
    });
  }, [value, live]);

  return <span ref={cell}>{value}</span>;
}

/** The date line, with the date and the hour each kept on one line. */
function DateLine({ text }: { text: string }) {
  const [date, ...rest] = text.split(" · ");
  if (rest.length === 0) return <>{text}</>;
  return (
    <>
      <span className="nw">{date} ·</span> <span className="nw">{rest.join(" · ")}</span>
    </>
  );
}

/**
 * The countdown face. The server renders reserved, invisible digits (00, with
 * the plural labels), so the client's first paint has no hydration mismatch
 * and moves nothing. The hero face speaks; the small one beside the form is
 * hidden from assistive technology, because the hero one already does.
 */
export function CountdownFace({ copy, compact = false }: { copy: CountdownFaceCopy; compact?: boolean }) {
  const clock = useLaunchClock();
  const remaining = clock?.remaining;
  const live = remaining !== undefined;
  const className = `countdown${compact ? " countdown-compact" : ""}${live ? " is-live" : ""}`;

  const row = (
    <div className="cd-row">
      {COUNTDOWN_UNITS.map((unit) => {
        const digits = remaining ? padUnit(remaining[unit]) : "00";
        return (
          <div className="cd-unit" key={unit}>
            <span className="cd-num">
              {[...digits].map((digit, i) => (
                <Digit key={i} value={digit} live={live} />
              ))}
            </span>
            {/* Each label reserves the width of its plural, so "1 minuto" moves nothing. */}
            <span className="cd-label" data-plural={copy[`unit_${unit}`]}>
              {remaining ? unitLabel(unit, remaining[unit], copy) : copy[`unit_${unit}`]}
            </span>
          </div>
        );
      })}
    </div>
  );

  if (compact) {
    return (
      <div className={className} aria-hidden="true">
        <div className="cd-face">
          {row}
          <p className="cd-date">
            <DateLine text={copy.date_line} />
          </p>
        </div>
        <noscript>
          <style>{".countdown-compact{display:none}"}</style>
        </noscript>
      </div>
    );
  }

  return (
    <div className={className} role="group" aria-label={copy.aria_label}>
      {/* One sentence, which changes with the minute, never every second. */}
      <p className="sr-only">{remaining ? spokenRemaining(remaining, copy) : ""}</p>
      <div className="cd-face" aria-hidden="true">
        <p className="kicker">{copy.kicker}</p>
        {row}
        <p className="cd-date">
          <time dateTime={LAUNCH.iso}>
            <DateLine text={copy.date_line} />
          </time>
        </p>
      </div>
      <noscript>
        <style>{".cd-face{display:none}"}</style>
        <p className="cd-noscript">{copy.noscript}</p>
      </noscript>
    </div>
  );
}

/**
 * The opening stage in the hero: the countdown before the hour, the photo
 * after it, and "Ya abrimos." when the hour passes with the page open. The
 * phase on <html> picks countdown or photo; the done state is this page's own,
 * announced once in a polite live region.
 */
export function OpeningStage({ announcement, children }: { announcement: string; children: ReactNode }) {
  const crossed = useLaunchClock()?.crossed === true;

  return (
    <div className="opening" data-mode={crossed ? "done" : undefined}>
      {children}
      <p className="sr-only" role="status">{crossed ? announcement : ""}</p>
    </div>
  );
}
