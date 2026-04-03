"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "#";

interface EarlyEdgeSectionProps {
  dict: {
    eyebrow: string;
    title: string;
    body: string;
    bullets: string[];
    cta: string;
  };
}

export function EarlyEdgeSection({ dict }: EarlyEdgeSectionProps) {
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
            sendGAEvent("event", "agent_landing_early_edge_viewed", {
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
      source: "early_edge_cta",
    });
  };

  return (
    <section
      ref={setRef}
      id="early-edge"
      className="reveal py-20 md:py-28 bg-midnight relative overflow-hidden"
    >
      {/* Subtle topo texture overlay for depth */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(/topo-pattern.svg)", backgroundSize: "600px" }} />

      <div className="relative max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <span className="type-caps inline-flex items-center justify-center gap-2 text-xs text-primary-light mb-6 font-semibold">
          <span className="w-4 h-px bg-primary-light" />
          {dict.eyebrow}
          <span className="w-4 h-px bg-primary-light" />
        </span>

        <h2 className="type-heading text-3xl md:text-4xl lg:text-[2.75rem] text-white leading-snug mb-6">
          {dict.title}
        </h2>

        <p className="type-body text-base md:text-lg text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto">
          {dict.body}
        </p>

        <ul className="space-y-4 mb-12 max-w-md mx-auto text-left">
          {dict.bullets.map((bullet, index) => (
            <li key={bullet} className="reveal-child flex items-start gap-3">
              <svg className="w-5 h-5 text-primary-light mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="type-body-semibold text-white/80 text-base">
                {bullet}
              </span>
            </li>
          ))}
        </ul>

        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCTAClick}
          className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-white text-midnight font-bold rounded-lg shadow-xl hover:bg-white/90 hover:shadow-2xl transition-all transform hover:-translate-y-0.5 text-base md:text-lg"
        >
          {dict.cta}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
