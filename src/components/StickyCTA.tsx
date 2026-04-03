"use client";

import { useEffect, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "#";

interface StickyCTAProps {
  label: string;
}

export function StickyCTA({ label }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero (approx 600px)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    sendGAEvent("event", "agent_signup_started", {
      category: "landing",
      source: "sticky_cta",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[rgba(45,90,94,0.1)] shadow-sm py-3 px-6 md:px-8 animate-fade-in-down transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="hidden sm:block">
            <img src="/logo.svg" alt="IkiHomes" className="h-8" />
        </div>
        <a 
          id="sticky-cta"
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="bg-primary text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:bg-primary/90 hover:shadow-lg transition-all text-sm md:text-base ml-auto sm:ml-0 min-h-[44px] flex items-center"
        >
          {label}
        </a>
      </div>
    </div>
  );
}
