"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface DifferentiationSectionProps {
  dict: {
    title: string;
    body: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
}

/* Icon per card — shield/trust, clock/speed, map-pin/zone */
const ICONS = [
  <svg key="trust" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="speed" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="zone" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
];

export function DifferentiationSection({ dict }: DifferentiationSectionProps) {
  const sectionReveal = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionReveal}
      id="differentiation"
      className="reveal py-24 md:py-32 bg-[#F5F5F3] relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #2D5A5E 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section headline + intro copy */}
        <div className="text-center mb-16">
          <h2 className="type-heading text-3xl md:text-4xl text-gray-900 mb-6">
            {dict.title}
          </h2>
          <p className="type-body text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            {dict.body}
          </p>
        </div>

        {/* Cards — elevated 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {dict.cards.map((card, index) => (
            <div
              key={index}
              className="reveal-child card-elevated flex flex-col items-center md:items-start text-center md:text-left p-8"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/8 text-primary flex items-center justify-center mb-6">
                {ICONS[index]}
              </div>

              <h3 className="type-heading text-lg text-gray-900 mb-3">
                {card.title}
              </h3>

              <p className="type-body text-sm text-gray-500 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
