"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-reveal hook using IntersectionObserver.
 * Adds `data-revealed="true"` to observed elements when they enter the viewport.
 * CSS handles the actual animation via transitions (progressive enhancement).
 *
 * Usage:
 *   const ref = useScrollReveal<HTMLElement>();
 *   <section ref={ref} className="reveal">...</section>
 *
 * Or for a container with staggered children:
 *   const ref = useScrollReveal<HTMLElement>();
 *   <div ref={ref} className="reveal-parent">
 *     <div className="reveal-child">...</div>
 *     <div className="reveal-child">...</div>
 *   </div>
 */
export function useScrollReveal<T extends HTMLElement>(
  options?: { threshold?: number; rootMargin?: string }
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-revealed", "true");
          observer.unobserve(el);
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return ref;
}
