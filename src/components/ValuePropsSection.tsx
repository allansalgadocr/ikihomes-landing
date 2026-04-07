"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ValuePropsSectionProps {
  dict: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

/* Icons — thinner stroke for premium feel */
const ICONS = [
  <svg key="build" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3m4-10h2m4 0h2m-6 4h2m4 0h2" />
  </svg>,
  <svg key="sparkle" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>,
  <svg key="target" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
];

export function ValuePropsSection({ dict }: ValuePropsSectionProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const firedRef = useRef<Set<number>>(new Set());
  const sectionReveal = useScrollReveal<HTMLElement>();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observers = dict.items.map((item, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !firedRef.current.has(index)) {
              firedRef.current.add(index);
              sendGAEvent("event", "agent_landing_value_prop_viewed", {
                category: "landing", prop_index: index, prop_title: item.title,
              });
            }
          });
        },
        { threshold: 0.4 }
      );
      if (cardRefs.current[index]) observer.observe(cardRefs.current[index]!);
      return observer;
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, [dict.items]);

  return (
    <section
      ref={sectionReveal}
      id="value-props"
      className="reveal py-24 md:py-32 bg-surface relative"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="type-heading text-[1.75rem] md:text-4xl text-midnight">
            {dict.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {dict.items.map((item, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="reveal-child card-elevated flex flex-col items-start text-left p-8"
            >
              {/* Accent-tinted icon container */}
              <div className="w-12 h-12 rounded-2xl bg-accent/15 text-primary flex items-center justify-center mb-6 ring-1 ring-accent/20">
                {ICONS[index]}
              </div>

              <h3 className="type-subheading text-lg text-midnight mb-3">
                {item.title}
              </h3>

              <p className="type-body text-[0.9375rem] text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
