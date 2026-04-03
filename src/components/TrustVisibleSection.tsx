"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "#";

interface TrustVisibleSectionProps {
  dict: {
    eyebrow: string;
    title: string;
    body: string;
    badge_speed: string;
    badge_verified: string;
    badge_zone: string;
    cta?: string;
    img_src: string;
    img_alt: string;
  };
}

export function TrustVisibleSection({ dict }: TrustVisibleSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const firedRef = useRef(false);
  const revealRef = useScrollReveal<HTMLElement>();

  // Merge refs
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
            sendGAEvent("event", "agent_landing_trust_section_viewed", {
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
      source: "trust_visible_cta",
    });
  };

  return (
    <section
      ref={setRef}
      id="trust-visible"
      className="reveal py-20 md:py-28 bg-gray-50/80 relative"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left: copy — slides in from left */}
          <div className="reveal-child">
            {/* Eyebrow */}
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

            {/* Trust signal chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-primary text-sm font-medium border border-primary/15 shadow-sm">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                {dict.badge_speed}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-primary text-sm font-medium border border-primary/15 shadow-sm">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {dict.badge_verified}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-primary text-sm font-medium border border-primary/15 shadow-sm">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {dict.badge_zone}
              </span>
            </div>

            {/* CTA */}
            {dict.cta && (
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
            )}
          </div>

          {/* Right: agent trust card mockup — scale-in reveal */}
          <div className="reveal-child flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/8 blur-2xl rounded-3xl scale-95 translate-y-4" />
              <img
                src={dict.img_src}
                alt={dict.img_alt}
                className="relative w-64 md:w-72 rounded-2xl shadow-[0_20px_48px_-8px_rgba(45,90,94,0.18)] border border-gray-100"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
