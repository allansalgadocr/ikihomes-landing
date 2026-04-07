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
      className="reveal py-24 md:py-36 relative"
    >
      <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="type-heading text-[1.75rem] md:text-4xl lg:text-[2.625rem] text-midnight leading-[1.15] mb-10">
          {dict.title}
        </h2>

        <div className="divider-gradient w-12 mx-auto mb-10" />

        <div className="space-y-5">
          <p className="type-body text-[1.0625rem] md:text-lg text-gray-500 max-w-xl mx-auto">
            {dict.body_1}
          </p>

          <p className="type-body text-[1.0625rem] md:text-lg text-gray-500 max-w-xl mx-auto">
            {dict.body_2}
          </p>
        </div>
      </div>
    </section>
  );
}
