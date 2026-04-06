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
      className="reveal py-24 md:py-32 relative overflow-hidden"
    >
      {/* Decorative accent gradient */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none -translate-y-1/2 translate-x-1/4"
        style={{ background: "radial-gradient(ellipse, #2D5A5E, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none translate-y-1/3 -translate-x-1/4"
        style={{ background: "radial-gradient(ellipse, #F3A712, transparent 70%)" }}
      />

      <div className="relative max-w-2xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Decorative line */}
        <div className="divider-gradient w-16 mx-auto mb-10" />

        <h2 className="type-heading text-3xl md:text-4xl text-gray-900 leading-[1.15] mb-8">
          {dict.title}
        </h2>

        <p className="type-body text-base md:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
          {dict.body}
        </p>
      </div>
    </section>
  );
}
