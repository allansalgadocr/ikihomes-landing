"use client";

import { LeadCaptureForm } from "./LeadCaptureForm";

interface HeroSectionProps {
  dict: {
    badge: string;
    headline_1: string;
    headline_2: string;
    subheadline: string;
    grounding?: string;
    cta: string; // Not used directly here as it is passed to form or separate button, but keeping for completion
    logo_alt: string;
  };
  formDict: any;
}

export function HeroSection({ dict, formDict }: HeroSectionProps) {
  return (
    <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[#fafafa]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[color-mix(in_srgb,var(--color-primary),transparent_95%)] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[color-mix(in_srgb,var(--color-primary-light),transparent_90%)] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/3"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex justify-center mb-8 animate-fade-in">
            <img src="/logo.svg" alt={dict.logo_alt} className="h-12 md:h-16" />
        </div>

        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in-up">
          {dict.badge}
        </span>
        
        
        <h1 className="text-4xl md:text-6xl text-gray-900 mb-6 tracking-tight leading-tight font-urbanist animate-fade-in-up delay-100">
          <span className="font-semibold text-gray-800">{dict.headline_1}</span> <br className="hidden md:block" />
          <span className="font-extrabold text-primary">{dict.headline_2}</span>
        </h1>
        
        {dict.grounding && (
          <p className="text-lg md:text-xl text-gray-800 font-medium mb-4 max-w-xl mx-auto animate-fade-in-up delay-150">
            {dict.grounding}
          </p>
        )}

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto animate-fade-in-up delay-200">
          {dict.subheadline}
        </p>


        <div id="join-waitlist" className="animate-fade-in-up delay-300 scroll-mt-24">
           <LeadCaptureForm dict={formDict} />
        </div>

        {/* Hero Dashboard Image */}
        <div className="mt-16 relative animate-fade-in-up delay-500">
           <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-full w-full"></div>
           <img 
              src="/hero-dashboard.png" 
              alt="IkiHomes Dashboard Preview" 
              className="rounded-xl shadow-2xl border border-gray-200/50 w-full max-w-5xl mx-auto"
           />
        </div>
      </div>
    </section>
  );
}
