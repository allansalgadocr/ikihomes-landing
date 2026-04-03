"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "#";

interface HowItWorksSectionProps {
  dict: {
    title: string;
    cta?: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
}

export function HowItWorksSection({ dict }: HowItWorksSectionProps) {
  const sectionReveal = useScrollReveal<HTMLElement>();

  const handleCTAClick = () => {
    sendGAEvent("event", "agent_signup_started", {
      category: "landing",
      source: "how_it_works_cta",
    });
  };

  return (
    <section ref={sectionReveal} className="reveal py-20 md:py-28 bg-white relative">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section headline */}
        <div className="text-center mb-14">
          <h2 className="type-heading text-3xl md:text-4xl text-gray-900">
            {dict.title}
          </h2>
        </div>

        {/* Steps — 3 columns on desktop with connecting line */}
        <div className="relative mb-16">
          {/* Connecting line — animates with a draw effect */}
          <div
            className="line-draw hidden md:block absolute top-[1.375rem] left-1/6 right-1/6 h-px bg-primary/30"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {dict.steps.map((step, index) => (
              <div
                key={index}
                className="reveal-child flex flex-col items-center text-center relative"
              >
                {/* Step number */}
                <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center mb-6 type-heading text-sm relative z-10 ring-4 ring-white">
                  {index + 1}
                </div>

                <h3 className="type-heading text-lg text-gray-900 mb-2 min-h-14 flex items-end justify-center">
                  {step.title}
                </h3>

                <p className="type-body text-sm text-gray-600 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {dict.cta && (
          <div className="text-center">
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
        )}
      </div>
    </section>
  );
}
