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
            sendGAEvent("event", "agent_landing_final_cta_viewed", { category: "landing" });
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCTAClick = () => {
    sendGAEvent("event", "agent_signup_started", { category: "landing", source: "final_cta" });
  };

  return (
    <section
      ref={setRef}
      id="final-cta"
      className="reveal py-28 md:py-36 bg-midnight relative overflow-hidden"
    >
      {/* Layered depth: primary glow + accent glow */}
      <div
        className="absolute top-0 left-1/3 w-[500px] h-[400px] rounded-full opacity-[0.1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #23696A, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #A0E2BA, transparent 70%)" }}
      />

      <div className="relative max-w-2xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="type-heading text-[1.875rem] md:text-[2.5rem] text-white leading-[1.12] mb-6">
          {dict.title}
        </h2>

        <p className="type-body text-[1.0625rem] md:text-lg text-white/50 leading-relaxed mb-12 max-w-xl mx-auto">
          {dict.body}
        </p>

        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCTAClick}
          className="btn-elevated w-full sm:w-auto bg-white text-midnight text-base md:text-lg shadow-[0_4px_20px_rgba(0,0,0,0.2),0_16px_48px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.25),0_24px_64px_rgba(0,0,0,0.15)] hover:bg-white/95"
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
