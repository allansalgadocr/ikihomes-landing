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
    <section ref={sectionReveal} className="reveal py-24 md:py-32 bg-secondary relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[700px] h-[500px] rounded-full opacity-[0.08] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #A0E2BA, transparent 70%)" }}
      />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="type-heading text-[1.75rem] md:text-4xl text-white">
            {dict.title}
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div
            className="line-draw hidden md:block absolute top-7 left-1/6 right-1/6 h-px"
            aria-hidden="true"
            style={{ background: "linear-gradient(90deg, transparent, rgba(160,226,186,0.35), transparent)" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {dict.steps.map((step, index) => (
              <div
                key={index}
                className="reveal-child flex flex-col items-center text-center relative"
              >
                {/* Step number — accent ring on dark */}
                <div
                  className="w-14 h-14 rounded-full bg-accent/15 text-accent flex items-center justify-center mb-8 type-heading text-base relative z-10 ring-1 ring-accent/25"
                >
                  {index + 1}
                </div>

                <h3 className="type-subheading text-lg text-white mb-3 min-h-14 flex items-end justify-center">
                  {step.title}
                </h3>

                <p className="type-body text-[0.9375rem] text-white/50 leading-relaxed max-w-xs">
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
