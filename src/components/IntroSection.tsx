"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface IntroSectionProps {
  dict: {
    title: string;
    body_1: string;
    body_2: string;
  };
}

export function IntroSection({ dict }: IntroSectionProps) {
  const sectionReveal = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionReveal}
      className="reveal py-24 md:py-32 relative overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #2D5A5E, transparent 70%)" }}
      />

      <div className="relative max-w-2xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="type-heading text-3xl md:text-4xl lg:text-[2.75rem] text-gray-900 leading-[1.15] mb-10">
          {dict.title}
        </h2>

        <div className="divider-gradient w-16 mx-auto mb-10" />

        <p className="type-body text-base md:text-lg text-gray-500 leading-relaxed mb-6 max-w-xl mx-auto">
          {dict.body_1}
        </p>

        <p className="type-body text-base md:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
          {dict.body_2}
        </p>
      </div>
    </section>
  );
}
