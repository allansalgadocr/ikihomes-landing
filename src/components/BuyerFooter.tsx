"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { AGENT_PAGE_URL, BUYER_SITE, sectionHref } from "@/lib/portal";

interface BuyerFooterProps {
  dict: { links_pre: string[]; links_open: string[]; agent_door: string };
  /** The links and lines the footer keeps from before: blog, legal, email, copyright. */
  common: {
    copyright: string;
    links: { blog: string; privacy: string; terms: string };
    contact_email: string;
  };
}

const SECTIONS = ["cambia", "busca-por-mi", "preguntas"];
const LINKS_OPEN = [BUYER_SITE.search, BUYER_SITE.findForMe, BUYER_SITE.agents];

/** The Spanish footer. Like the header, it carries both states and the phase on <html> picks one. */
export function BuyerFooter({ dict, common }: BuyerFooterProps) {
  // On the home the section links are bare anchors, so they scroll without a
  // reload and keep the visit's query (an ad's fbclid) and the page's state.
  // Elsewhere they are language qualified, because the sections live on the home.
  const pathname = usePathname();
  const isHome = pathname === "/es" || pathname === "/es/";
  const linksPre = SECTIONS.map((id) => (isHome ? `#${id}` : sectionHref("es", id)));

  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot">
          <Logo />
          <div className="foot-links">
            {dict.links_pre.map((label, i) => (
              <a key={`pre-${label}`} data-when="pre" href={linksPre[i]}>{label}</a>
            ))}
            {dict.links_open.map((label, i) => (
              <a key={`open-${label}`} data-when="open" href={LINKS_OPEN[i]}>{label}</a>
            ))}
            <a href={AGENT_PAGE_URL}>{dict.agent_door}</a>
            <Link href="/es/blog">{common.links.blog}</Link>
            <Link href="/es/privacy">{common.links.privacy}</Link>
            <Link href="/es/terms">{common.links.terms}</Link>
            <a href={`mailto:${common.contact_email}`}>{common.contact_email}</a>
          </div>
        </div>
        <p className="foot-note">{common.copyright}</p>
      </div>
    </footer>
  );
}
