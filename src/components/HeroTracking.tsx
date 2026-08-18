"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { trackMetaEvent } from "@/components/MetaPixel";

/** Fires the landing page view, plus ViewContent once the reader passes half the page. */
export function HeroPageView() {
  useEffect(() => {
    sendGAEvent("event", "agent_landing_page_viewed", { category: "landing" });

    let fired = false;
    const handleScroll = () => {
      if (fired) return;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= 0.5) {
        fired = true;
        trackMetaEvent("ViewContent", { content_name: "landing_page" });
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}

/**
 * Primary CTA wrapper.
 *
 * `source` is a real parameter rather than the hardcoded "hero_cta" the old
 * version sent from every placement, which made hero, pricing and sticky clicks
 * indistinguishable in analytics.
 *
 * Only genuinely external destinations open in a new tab. The pre-launch CTA is
 * an in-page anchor, and sending that to a new tab would break the scroll.
 */
export function HeroCTA({
  href,
  className,
  source = "hero",
  children,
}: {
  href: string;
  className: string;
  source?: string;
  children: React.ReactNode;
}) {
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <a
      href={href}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      onClick={() =>
        sendGAEvent("event", "agent_signup_started", {
          category: "landing",
          source,
        })
      }
      className={className}
    >
      {children}
    </a>
  );
}
