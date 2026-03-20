"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

const PORTAL_URL = process.env.NEXT_PUBLIC_REALTORS_APP_URL || "https://app.ikihomescr.com";

interface HeroSectionProps {
  dict: {
    badge: string;
    headline_1: string;
    headline_2: string;
    subheadline: string;
    grounding?: string;
    cta: string;
    cta_secondary?: string;
    cta_footnote?: string;
    logo_alt: string;
  };
}

export function HeroSection({ dict }: HeroSectionProps) {
  // Analytics: fire page-viewed event once on mount
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
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[#fafafa]">
         {/* Lifestyle Background Image */}
         <img 
            src="/lifestyle-background.png" 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-30"
         />
         <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[color-mix(in_srgb,var(--color-primary),transparent_95%)] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[color-mix(in_srgb,var(--color-primary-light),transparent_90%)] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/3 z-0"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex justify-center mb-8 animate-fade-in">
            <img src="/logo.svg" alt={dict.logo_alt} className="h-12 md:h-16" />
        </div>

        {/* Trust badge */}
        <div className="flex justify-center mb-6 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {dict.badge}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl text-gray-900 mb-6 tracking-tight leading-tight font-urbanist animate-fade-in-up delay-100">
          <span className="font-semibold text-gray-800 tracking-tight">{dict.headline_1}</span> <br className="hidden md:block" />
          <span className="font-extrabold text-primary tracking-tight">{dict.headline_2}</span>
        </h1>
        
        {dict.grounding && (
          <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4 max-w-xl mx-auto animate-fade-in-up delay-150">
            {dict.grounding}
          </p>
        )}

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto animate-fade-in-up delay-200">
          {dict.subheadline}
        </p>

        {/* Primary CTA — direct link to portal sign-up */}
        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            id="hero-cta"
            href={`${PORTAL_URL}/sign-up`}
            onClick={handleCTAClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-base md:text-lg min-h-[52px] min-w-[200px]"
          >
            {dict.cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          {dict.cta_secondary && (
            <a
              href="#value-props"
              className="text-sm text-gray-500 hover:text-primary transition-colors font-medium underline underline-offset-4"
            >
              {dict.cta_secondary}
            </a>
          )}
        </div>

        {/* Social proof micro-line */}
        {dict.cta_footnote && (
          <p className="mt-6 text-xs text-gray-400 animate-fade-in-up delay-400">
            {dict.cta_footnote}
          </p>
        )}

        {/* Hero Dashboard Image */}
        <div className="mt-16 relative animate-fade-in-up delay-500">
           <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-full w-full"></div>
           <img 
              src="/hero-dashboard.png" 
              alt="IkiHomes Dashboard Preview" 
              className="relative rounded-xl shadow-[0_20px_50px_-12px_rgba(45,90,94,0.15)] border border-[rgba(45,90,94,0.1)] w-full max-w-5xl mx-auto"
           />
        </div>
      </div>
    </section>
  );
}
