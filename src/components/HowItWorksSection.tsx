"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface HowItWorksSectionProps {
  dict: {
    title: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
}

export function HowItWorksSection({ dict }: HowItWorksSectionProps) {
  const sectionReveal = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionReveal} className="reveal py-24 md:py-32 relative">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section headline */}
        <div className="text-center mb-16">
          <h2 className="type-heading text-3xl md:text-4xl text-gray-900">
            {dict.title}
          </h2>
        </div>

        {/* Steps — 3 columns on desktop with connecting line */}
        <div className="relative">
          {/* Connecting line — gradient fade for elevated feel */}
          <div
            className="line-draw hidden md:block absolute top-6.5 left-1/6 right-1/6 h-px"
            aria-hidden="true"
            style={{ background: "linear-gradient(90deg, transparent, rgba(45,90,94,0.25), transparent)" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {dict.steps.map((step, index) => (
              <div
                key={index}
                className="reveal-child flex flex-col items-center text-center relative"
              >
                {/* Step number — elevated with glow */}
                <div
                  className="w-13 h-13 rounded-full bg-primary text-white flex items-center justify-center mb-8 type-heading text-sm relative z-10 ring-4 ring-[#FAFAF9]"
                  style={{ boxShadow: "0 2px 8px rgba(45,90,94,0.25), 0 0 0 1px rgba(45,90,94,0.1)" }}
                >
                  {index + 1}
                </div>

                <h3 className="type-heading text-lg text-gray-900 mb-3 min-h-14 flex items-end justify-center">
                  {step.title}
                </h3>

                <p className="type-body text-sm text-gray-500 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
