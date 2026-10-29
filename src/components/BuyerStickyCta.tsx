"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BUYER_SITE } from "@/lib/portal";

/**
 * The mobile action bar of the Spanish home. It steps aside while the closing
 * band is on screen, because the band already holds the same action.
 */
export function BuyerStickyCta({ dict }: { dict: { label_open: string } }) {
  const pathname = usePathname();
  const isHome = pathname === "/es" || pathname === "/es/";
  const [away, setAway] = useState(false);

  useEffect(() => {
    if (!isHome || !("IntersectionObserver" in window)) return;
    const onScreen = new Set<Element>();
    const watcher = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        setAway(onScreen.size > 0);
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-notify], [data-closing]").forEach((el) => watcher.observe(el));
    return () => watcher.disconnect();
  }, [isHome]);

  if (!isHome) return null;

  return (
    <div className={away ? "sticky is-away" : "sticky"}>
      <a className="btn btn-primary" href={BUYER_SITE.search}>{dict.label_open}</a>
    </div>
  );
}
