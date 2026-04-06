"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface EarlyEdgeSectionProps {
  dict: {
    title: string;
    body: string;
  };
}

export function EarlyEdgeSection({ dict }: EarlyEdgeSectionProps) {
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
            sendGAEvent("event", "agent_landing_early_edge_viewed", {
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
      id="early-edge"
      className="reveal py-24 md:py-32 bg-midnight relative overflow-hidden"
    >
      {/* Elevated dark section: subtle gradient layers + glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse at 30% 20%, rgba(45,90,94,0.15) 0%, transparent 60%)",
            "radial-gradient(ellipse at 70% 80%, rgba(45,90,94,0.1) 0%, transparent 50%)",
          ].join(", "),
        }}
      />
      {/* Subtle topo texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(/topo-pattern.svg)", backgroundSize: "600px" }}
      />

      <div className="relative max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="type-heading text-3xl md:text-4xl lg:text-[2.75rem] text-white leading-[1.15] mb-8">
          {dict.title}
        </h2>

        <p className="type-body text-base md:text-lg text-white/55 leading-relaxed max-w-2xl mx-auto">
          {dict.body}
        </p>
      </div>
    </section>
  );
}
