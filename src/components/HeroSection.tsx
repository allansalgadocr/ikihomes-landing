"use client";

import { LeadCaptureForm } from "./LeadCaptureForm";

interface HeroSectionProps {
  dict: {
    badge: string;
    headline_1: string;
    headline_2: string;
    subheadline: string;
    logo_alt: string;
  };
  formDict: any; // Using any for simplicity in parent passing to child, but cleaner to export interface
}

export function HeroSection({ dict, formDict }: HeroSectionProps) {
  return (
    <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[#fafafa]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[color-mix(in_srgb,var(--color-olive),transparent_95%)] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[color-mix(in_srgb,var(--color-sand),transparent_90%)] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex justify-center mb-8 animate-fade-in">
            <img src="/logo.svg" alt={dict.logo_alt} className="h-12 md:h-16" />
        </div>

        <span className="inline-block py-1 px-3 rounded-full bg-olive/10 text-olive text-sm font-medium mb-6 animate-fade-in-up">
          {dict.badge}
        </span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-tight font-arsenal animate-fade-in-up delay-100">
          {dict.headline_1} <br className="hidden md:block" />
          <span className="text-olive">{dict.headline_2}</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
          {dict.subheadline}
        </p>

        <div className="animate-fade-in-up delay-300">
           <LeadCaptureForm dict={formDict} />
        </div>
      </div>
    </section>
  );
}
