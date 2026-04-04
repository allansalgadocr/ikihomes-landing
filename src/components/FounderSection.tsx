"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface FounderSectionProps {
  dict: {
    body: string;
    signature: string;
  };
}

export function FounderSection({ dict }: FounderSectionProps) {
  const sectionReveal = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionReveal}
      className="reveal py-16 md:py-24 bg-white relative"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative">
          {/* Decorative quote mark */}
          <div className="absolute -top-4 -left-2 text-primary/10 text-7xl md:text-8xl type-display leading-none select-none" aria-hidden="true">
            &ldquo;
          </div>

          <blockquote className="relative">
            <p className="type-body text-lg md:text-xl text-gray-700 leading-relaxed pl-6 md:pl-8 border-l-2 border-primary/20">
              {dict.body}
            </p>

            <footer className="mt-6 pl-6 md:pl-8">
              <cite className="type-body-semibold text-sm text-primary/70 not-italic">
                {dict.signature}
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
