"use client";

import { usePathname } from "next/navigation";
import { IconArrow } from "./Icons";
import { primaryHref } from "@/lib/portal";

/**
 * The mobile action bar. mockup.css hides the header nav, the login link and
 * the header CTA below 760px because this bar carries the action there, and it
 * already reserves the room for it via `main { padding-bottom: 84px }`.
 * Without it rendered, mobile had no call to action at all and an empty slab
 * above the footer.
 */
export function StickyCta({ label }: { label: string }) {
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "es";
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  if (!isHome) return null;

  return (
    <div className="sticky">
      <a className="btn btn-primary" href={primaryHref()}>
        {label}
        <IconArrow />
      </a>
    </div>
  );
}
