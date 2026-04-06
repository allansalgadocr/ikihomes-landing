"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface BuiltForCostaRicaSectionProps {
  dict: {
    title: string;
    body: string;
  };
}

export function BuiltForCostaRicaSection({ dict }: BuiltForCostaRicaSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const firedRef = useRef(false);
  const revealRef = useScrollReveal<HTMLElement>();

  const setRef = (el: HTMLElement | null) => {
    sectionRef.current = el;
    (revealRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            sendGAEvent("event", "agent_landing_built_for_cr_viewed", {
              category: "landing",
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={setRef}
      id="built-for-costa-rica"
      className="reveal py-20 md:py-28 bg-white relative"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="type-heading text-3xl md:text-4xl text-gray-900 leading-snug mb-6">
          {dict.title}
        </h2>

        <p className="type-body text-base md:text-lg text-gray-600 leading-relaxed">
          {dict.body}
        </p>
      </div>
    </section>
  );
}
