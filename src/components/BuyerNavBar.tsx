"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { LanguageSwitch } from "./NavBar";
import { AGENT_PAGE_URL, BUYER_SITE } from "@/lib/portal";

interface BuyerNavBarProps {
  dict: {
    links_pre: string[];
    links_open: string[];
    agent_door: string;
    cta_pre: string;
    cta_open: string;
  };
}

// Before the opening the buyer links scroll on the page, so nothing sends a
// visitor into the product ahead of the date. From the opening they go to it.
const LINKS_PRE = ["#cambia", "#busca-por-mi", "#preguntas"];
const LINKS_OPEN = [BUYER_SITE.findForMe, BUYER_SITE.agents, "#preguntas"];

/**
 * The Spanish header. Both states are in the markup and the phase on <html>
 * picks one, so it turns at the hour with the rest of the page.
 *
 * The agent door is not a .link-quiet on purpose: under 760px mockup.css hides
 * the nav, .link-quiet and the header button, and this link must stay, because
 * it is the only way through for an agent on a phone until the manifesto band.
 */
export function BuyerNavBar({ dict }: BuyerNavBarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/es" || pathname === "/es/";

  return (
    <header className="site">
      <div className="wrap hdr">
        <Link href="/es" aria-label="IkiHomes">
          <Logo />
        </Link>

        {isHome && (
          <nav className="nav" aria-label="Principal">
            {dict.links_pre.map((label, i) => (
              <a key={`pre-${label}`} data-when="pre" href={LINKS_PRE[i]}>{label}</a>
            ))}
            {dict.links_open.map((label, i) => (
              <a key={`open-${label}`} data-when="open" href={LINKS_OPEN[i]}>{label}</a>
            ))}
          </nav>
        )}

        <div className="hdr-right">
          {/* The English blog stays reachable from the Spanish blog and legal pages. */}
          {!isHome && <LanguageSwitch />}

          <a className="hdr-door" href={AGENT_PAGE_URL}>{dict.agent_door}</a>

          <a className="btn btn-primary btn-sm" data-when="pre" href={isHome ? "#aviso" : "/es#aviso"}>
            {dict.cta_pre}
          </a>
          <a className="btn btn-primary btn-sm" data-when="open" href={BUYER_SITE.search}>
            {dict.cta_open}
          </a>
        </div>
      </div>
    </header>
  );
}
