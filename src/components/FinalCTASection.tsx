"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "#";

interface FinalCTASectionProps {
  dict: {
    title: string;
    body: string;
    cta: string;
  };
}

export function FinalCTASection({ dict }: FinalCTASectionProps) {
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
            sendGAEvent("event", "agent_landing_final_cta_viewed", {
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
      source: "final_cta",
    });
  };

  return (
    <section
      ref={setRef}
      id="final-cta"
      className="reveal py-20 md:py-28 bg-primary/4 relative"
    >
      <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="type-heading text-3xl md:text-4xl text-gray-900 leading-snug mb-5">
          {dict.title}
        </h2>

        <p className="type-body text-base md:text-lg text-gray-600 leading-relaxed mb-10 max-w-xl mx-auto">
          {dict.body}
        </p>

        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCTAClick}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-10 py-4 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-base md:text-lg"
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
