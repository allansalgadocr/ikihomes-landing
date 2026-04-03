"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "#";

interface BuiltForCostaRicaSectionProps {
  dict: {
    eyebrow: string;
    title: string;
    body: string;
    zones: string[];
    cta: string;
    img_src: string;
    img_alt: string;
  };
}

export function BuiltForCostaRicaSection({ dict }: BuiltForCostaRicaSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const firedRef = useRef(false);
  const revealRef = useScrollReveal<HTMLElement>();

  const setRef = (el: HTMLElement | null) => {
    sectionRef.current = el;
    (revealRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            sendGAEvent("event", "agent_landing_built_for_cr_viewed", {
              category: "landing",
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCTAClick = () => {
    sendGAEvent("event", "agent_signup_started", {
      category: "landing",
      source: "built_for_cr_cta",
    });
  };

  return (
    <section
      ref={setRef}
      id="built-for-costa-rica"
      className="reveal py-20 md:py-28 bg-white relative"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left: copy */}
          <div className="reveal-child">
            <span className="type-caps inline-flex items-center gap-2 text-xs text-primary mb-5 font-semibold">
              <span className="w-4 h-px bg-primary" />
              {dict.eyebrow}
            </span>

            <h2 className="type-heading text-3xl md:text-4xl text-gray-900 leading-snug mb-5">
              {dict.title}
            </h2>

            <p className="type-body text-base text-gray-600 leading-relaxed mb-8">
              {dict.body}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {dict.zones.map((zone) => (
                <span
                  key={zone}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-primary text-sm font-medium border border-primary/15 shadow-sm"
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  {zone}
                </span>
              ))}
            </div>

            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCTAClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-base"
            >
              {dict.cta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Right: Costa Rica zone map — scale reveal */}
          <div className="reveal-child flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/8 blur-2xl rounded-3xl scale-95 translate-y-4" />
              <img
                src={dict.img_src}
                alt={dict.img_alt}
                loading="lazy"
                className="relative w-72 md:w-80 rounded-2xl shadow-[0_20px_48px_-8px_rgba(45,90,94,0.18)] border border-gray-100"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
