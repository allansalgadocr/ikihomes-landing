"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type Ref } from "react";
import type { LaunchPhase } from "@/lib/launch";
import { useLaunchClock } from "@/lib/launchClock";
import {
  HERO_FILM_PHONE_QUERY,
  REDUCED_MOTION_QUERY,
  filmMode,
  filmPosters,
  filmSources,
  filmView,
  loadCrop,
  type FilmCrop,
  type FilmView,
} from "@/lib/heroFilm";

/** A media query as a store, so the server and the hydration render agree on serverValue. */
function mediaQueryStore(query: string) {
  return {
    subscribe(onChange: () => void) {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    read: () => window.matchMedia(query).matches,
  };
}

const calmStore = mediaQueryStore(REDUCED_MOTION_QUERY);
const phoneStore = mediaQueryStore(HERO_FILM_PHONE_QUERY);

/** The phase on <html>: the script in <head> can turn it open before the first paint, the countdown at zero. */
function subscribePhase(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-phase"] });
  return () => observer.disconnect();
}
const readPhase = () => document.documentElement.getAttribute("data-phase");

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}
const readVisible = () => !document.hidden;

/** Turns true in the task after the window load event, so the film never competes with the page. */
let afterLoad = false;
function subscribeLoad(onChange: () => void) {
  if (afterLoad) return () => {};
  let timer: ReturnType<typeof setTimeout> | undefined;
  const settle = () => {
    timer = setTimeout(() => {
      afterLoad = true;
      onChange();
    }, 0);
  };
  if (document.readyState === "complete") settle();
  else window.addEventListener("load", settle, { once: true });
  return () => {
    window.removeEventListener("load", settle);
    clearTimeout(timer);
  };
}
const readLoaded = () => afterLoad;

/**
 * The film in the photograph's box: the poster for the panel's mode (a picture
 * that follows the breakpoint, so it is right with JavaScript off), the video
 * over it with the crop's sources once they may load, and the pause control
 * over both while the film moves. No player chrome, no audio track.
 */
export function HeroFilmView({
  view,
  label,
  onToggle,
  onPlaying,
  boxRef,
  videoRef,
}: {
  view: FilmView;
  label: string;
  onToggle?: () => void;
  onPlaying?: () => void;
  boxRef?: Ref<HTMLDivElement>;
  videoRef?: Ref<HTMLVideoElement>;
}) {
  const posters = filmPosters(view.mode);

  return (
    <div ref={boxRef} className={`opening-photo opening-film${view.on ? " is-on" : ""}`}>
      <picture>
        <source media={HERO_FILM_PHONE_QUERY} type="image/webp" srcSet={posters.phone.webp} />
        <source media={HERO_FILM_PHONE_QUERY} srcSet={posters.phone.jpg} />
        <source type="image/webp" srcSet={posters.desktop.webp} />
        {/* The poster has to be the film's own frame, so the optimizer must not re-encode or resize it. */}
        <img src={posters.desktop.jpg} alt="" fetchPriority="high" />
      </picture>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        disableRemotePlayback
        onPlaying={onPlaying}
      >
        {view.crop !== null &&
          filmSources(view.crop).map((source) => <source key={source.src} src={source.src} type={source.type} />)}
      </video>
      {view.control && (
        <button
          type="button"
          className="opening-film-toggle"
          aria-label={label}
          aria-pressed={view.control.paused}
          onClick={onToggle}
        />
      )}
    </div>
  );
}

/**
 * The hero film (mockup.html, the film script). The crop follows the panel's
 * mode and the breakpoint and keeps its time when it changes. It plays muted,
 * in a loop, from the poster's second, and stops while it cannot be seen: off
 * screen, in a hidden tab, or paused by the visitor (click, tap, Enter or
 * Space). Under reduced motion it never loads and the poster stays.
 *
 * serverPhase is the phase the server rendered <html> with, so the server and
 * the hydration render pick the same poster; the client then follows <html>.
 */
export function HeroFilm({ label, serverPhase }: { label: string; serverPhase: LaunchPhase }) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const loadedCrop = useRef<FilmCrop | null>(null);

  const phase = useSyncExternalStore(subscribePhase, readPhase, () => serverPhase);
  const crossed = useLaunchClock()?.crossed === true;
  const phone = useSyncExternalStore(phoneStore.subscribe, phoneStore.read, () => false);
  const calm = useSyncExternalStore(calmStore.subscribe, calmStore.read, () => true);
  const loaded = useSyncExternalStore(subscribeLoad, readLoaded, () => false);
  const visible = useSyncExternalStore(subscribeVisibility, readVisible, () => true);
  const [seen, setSeen] = useState(true);
  const [played, setPlayed] = useState(false);
  const [paused, setPaused] = useState(false);

  const view = filmView({ mode: filmMode(phase, crossed), phone, calm, loaded, played, paused });
  const crop = view.crop;

  // A new crop: load its sources, from the poster's second the first time and
  // from where the last crop was every time after.
  useEffect(() => {
    const element = video.current;
    if (!element || crop === null || crop === loadedCrop.current) return;
    loadCrop(element, loadedCrop.current === null);
    loadedCrop.current = crop;
  }, [crop]);

  // It plays only while it can be seen and the visitor has not paused it.
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (crop !== null && seen && visible && !paused) {
      // A refused autoplay (low power mode, for one) leaves the poster.
      element.play()?.catch(() => {});
    } else {
      element.pause();
    }
  }, [crop, seen, visible, paused]);

  useEffect(() => {
    const element = box.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => setSeen(entries[entries.length - 1].isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <HeroFilmView
      view={view}
      label={label}
      onToggle={() => setPaused((was) => !was)}
      onPlaying={() => setPlayed(true)}
      boxRef={box}
      videoRef={video}
    />
  );
}
