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

/* Icons — shield/trust, clock/speed, map-pin/zone */
const ICONS = [
  <svg key="trust" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="speed" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="zone" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      className="reveal py-28 md:py-40 relative overflow-hidden"
    >
      {/* Visual centerpiece: accent-tinted background with depth */}
      <div className="absolute inset-0 bg-linear-to-b from-accent/6 via-accent/3 to-transparent pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #23696A, transparent 70%)" }}
      />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Headline + intro — larger scale for centerpiece */}
        <div className="text-center mb-16 md:mb-20">
          <span className="pill-accent mb-6 inline-flex type-caps text-xs">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Trust
          </span>

          <h2 className="type-heading text-[1.875rem] md:text-[2.5rem] lg:text-[2.75rem] text-midnight leading-[1.12] mb-8">
            {dict.title}
          </h2>
          <p className="type-body text-[1.0625rem] md:text-lg text-gray-500 max-w-2xl mx-auto">
            {dict.body}
          </p>
        </div>

        {/* Trust signal cards — larger, more prominent */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {dict.cards.map((card, index) => (
            <div
              key={index}
              className="reveal-child group relative bg-white rounded-2xl p-8 md:p-10 border border-accent/15 transition-all duration-200 hover:-translate-y-1"
              style={{ boxShadow: "0 1px 3px rgba(9,17,32,0.04), 0 8px 24px rgba(35,105,106,0.06), 0 20px 48px rgba(35,105,106,0.04)" }}
            >
              {/* Accent top border highlight */}
              <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />

              <div className="w-14 h-14 rounded-2xl bg-primary/8 text-primary flex items-center justify-center mb-7 group-hover:bg-primary/12 transition-colors">
                {ICONS[index]}
              </div>

              <h3 className="type-subheading text-xl text-midnight mb-3">
                {card.title}
              </h3>

              <p className="type-body text-[0.9375rem] text-gray-500 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
