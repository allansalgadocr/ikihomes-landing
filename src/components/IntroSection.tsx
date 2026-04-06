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
      className="reveal py-20 md:py-28 bg-white relative"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="type-heading text-3xl md:text-4xl text-gray-900 leading-snug mb-8">
          {dict.title}
        </h2>

        <p className="type-body text-base md:text-lg text-gray-600 leading-relaxed mb-6">
          {dict.body_1}
        </p>

        <p className="type-body text-base md:text-lg text-gray-600 leading-relaxed">
          {dict.body_2}
        </p>
      </div>
    </section>
  );
}
