"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "#";

interface ValuePropsSectionProps {
  dict: {
    title: string;
    subtitle?: string;
    cta?: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

/* Icon per card — construction, sparkle, target */
const ICONS = [
  <svg key="build" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3m4-10h2m4 0h2m-6 4h2m4 0h2" />
  </svg>,
  <svg key="sparkle" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>,
  <svg key="target" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
];

export function ValuePropsSection({ dict }: ValuePropsSectionProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observers = dict.items.map((item, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !firedRef.current.has(index)) {
              firedRef.current.add(index);
              sendGAEvent("event", "agent_landing_value_prop_viewed", {
                category: "landing",
                prop_index: index,
                prop_title: item.title,
              });
            }
          });
        },
        { threshold: 0.4 }
      );
      if (cardRefs.current[index]) {
        observer.observe(cardRefs.current[index]!);
      }
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [dict.items]);

  const handleCTAClick = () => {
    sendGAEvent("event", "agent_signup_started", {
      category: "landing",
      source: "value_props_cta",
    });
  };

  return (
    <section id="value-props" className="py-20 md:py-28 bg-gray-50/80 relative">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section headline + urgency line */}
        <div className="text-center mb-14">
          <h2 className="type-heading text-3xl md:text-4xl text-gray-900 mb-3">
            {dict.title}
          </h2>
          {dict.subtitle && (
            <p className="type-caps text-xs text-gray-400">
              {dict.subtitle}
            </p>
          )}
        </div>

        {/* Value points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {dict.items.map((item, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="flex flex-col items-center md:items-start text-center md:text-left bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                {ICONS[index]}
              </div>

              <h3 className="type-heading text-lg text-gray-900 mb-2 min-h-[3.5rem] flex items-end">
                {item.title}
              </h3>

              <p className="type-body text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        {dict.cta && (
          <div className="text-center">
            <a
              id="value-props-cta"
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
