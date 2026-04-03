"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "#";

interface ValuePropsSectionProps {
  dict: {
    title: string;
    subtitle: string;
    cta?: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

import { TopoBackground } from "./TopoBackground";

export function ValuePropsSection({ dict }: ValuePropsSectionProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const firedRef = useRef<Set<number>>(new Set());

  // Analytics: fire agent_landing_value_prop_viewed when each card enters viewport
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
    <section id="value-props" className="py-32 bg-[var(--color-bg)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-urbanist tracking-tight">{dict.title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        {/* 3 Column Grid for Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {dict.items.map((feature, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="p-8 bg-[var(--color-card)] rounded-2xl border border-[rgba(45,90,94,0.1)] hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
                {/* Icon accent */}
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  {index === 0 && (
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-urbanist tracking-tight group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base flex-grow">
                    {feature.description}
                </p>
                {index === 0 && (
                   <div className="mt-8 rounded-lg overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
                      <img src="/whatsapp-preview.png" alt="WhatsApp Sharing Preview" className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                   </div>
                )}
                {index === 1 && (
                   <div className="mt-8 rounded-lg overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
                      <img src="/ui-detail-card.png" alt="UI Detail Preview" className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                   </div>
                )}
                {index === 2 && (
                   <div className="mt-8 rounded-lg overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
                      <img src="/costa-rica-map-preview.png" alt="Costa Rica Map Preview" className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                   </div>
                )}
            </div>
          ))}
        </div>

        {/* Secondary CTA */}
        {dict.cta && (
          <div className="text-center">
            <a 
              id="value-props-cta"
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCTAClick}
              className="inline-block px-10 py-4 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-[#3D6E72] hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              {dict.cta}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
