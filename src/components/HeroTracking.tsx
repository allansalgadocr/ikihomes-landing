"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

/** Fires page-view event on mount */
export function HeroPageView() {
  useEffect(() => {
    sendGAEvent("event", "agent_landing_page_viewed", { category: "landing" });
  }, []);
  return null;
}

/** CTA wrapper that fires GA event on click */
export function HeroCTA({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const handleClick = () => {
    sendGAEvent("event", "agent_signup_started", {
      category: "landing",
      source: "hero_cta",
    });
  };

  return (
    <a
      id="hero-cta"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
