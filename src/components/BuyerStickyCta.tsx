"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BUYER_SITE } from "@/lib/portal";

/**
 * The mobile action bar of the Spanish home, carrying the action of each
 * phase. It steps aside while the notify form or the closing band is on
 * screen, because both already hold the same action.
 */
export function BuyerStickyCta({ dict }: { dict: { label_pre: string; label_open: string } }) {
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
      <a className="btn btn-primary" data-when="pre" href="#aviso">{dict.label_pre}</a>
      <a className="btn btn-primary" data-when="open" href={BUYER_SITE.search}>{dict.label_open}</a>
    </div>
  );
}
