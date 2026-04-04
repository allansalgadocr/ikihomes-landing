"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "#";

interface HeroSectionProps {
  dict: {
    badge: string;
    headline_1: string;
    headline_2: string;
    subheadline: string;
    cta: string;
    cta_secondary?: string;
    cta_footnote?: string;
    logo_alt: string;
  };
}

export function HeroSection({ dict }: HeroSectionProps) {
  useEffect(() => {
    sendGAEvent("event", "agent_landing_page_viewed", { category: "landing" });
  }, []);

  const handleCTAClick = () => {
    sendGAEvent("event", "agent_signup_started", {
      category: "landing",
      source: "hero_cta",
    });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Full-bleed hero image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/hero-lifestyle.jpg"
          alt="Costa Rica luxury homes aerial view"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/*
          Two-layer gradient:
          1. Left-to-right scrim — protects left-aligned text, lets right side breathe
          2. Bottom vignette — anchors the lower portion for CTA readability
        */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.28) 50%, transparent 75%)",
              "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 45%)",
            ].join(", "),
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full relative z-10 py-20">
        <div className="max-w-xl text-center md:text-left">
          {/* Logo */}
          <div className="mb-12 animate-fade-in">
            <img
              src="/logo.svg"
              alt={dict.logo_alt}
              className="h-10 md:h-12 brightness-0 invert mx-auto md:mx-0"
            />
          </div>

          {/*
            Headline hierarchy:
            Line 1 = value prop (the hook) → largest, heaviest (Urbanist 900)
            Line 2 = motivator (urgency)   → smaller, lighter (Urbanist 700)
            This follows the F-pattern: hook first, context second.
          */}
          <h1
            className="mb-8 animate-fade-in-up delay-100"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            <span className="type-display text-white text-[2.25rem] md:text-5xl lg:text-6xl leading-[1.1] block mb-4">
              {dict.headline_1}
            </span>
            <span className="type-heading text-white/75 text-xl md:text-2xl lg:text-3xl leading-snug block">
              {dict.headline_2}
            </span>
          </h1>

          {/* Subheadline — quiet, supporting */}
          <p
            className="type-body text-base md:text-lg text-white/60 mb-10 max-w-sm mx-auto md:mx-0 animate-fade-in-up delay-150"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
          >
            {dict.subheadline}
          </p>

          {/* CTA block — stacked vertically for clear hierarchy */}
          <div className="animate-fade-in-up delay-200 flex flex-col sm:flex-row items-center md:items-start gap-5">
            <a
              id="hero-cta"
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCTAClick}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-white text-gray-900 font-bold rounded-lg shadow-xl hover:bg-white/90 hover:shadow-2xl transition-all transform hover:-translate-y-0.5 text-base md:text-lg min-h-[52px]"
            >
              {dict.cta}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            {dict.cta_secondary && (
              <a
                href="#value-props"
                className="type-caps text-xs text-white/45 hover:text-white/80 transition-colors font-semibold py-4"
              >
                {dict.cta_secondary}
              </a>
            )}
          </div>

          {/* Post-signup clarity */}
          {dict.cta_footnote && (
            <p
              className="type-body mt-8 text-sm text-white/45 max-w-sm mx-auto md:mx-0 animate-fade-in-up delay-300"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
            >
              {dict.cta_footnote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
