"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { LanguageSwitch } from "./NavBar";
import { AGENT_PAGE_URL, BUYER_SITE } from "@/lib/portal";

interface BuyerNavBarProps {
  dict: {
    links_open: string[];
    agent_door: string;
    cta_open: string;
  };
}

const LINKS_OPEN = [BUYER_SITE.findForMe, BUYER_SITE.agents, "#preguntas"];

/**
 * The Spanish header of the blog and legal pages. The Spanish home moved to
 * the buyer site on 2026-10-12, and with it the countdown phase: this header
 * knows only the open product, so no "notify me" button is ever emitted.
 *
 * The agent door is not a .link-quiet on purpose: under 760px mockup.css hides
 * the nav, .link-quiet and the header button, and this link must stay, because
 * it is the only way through for an agent on a phone.
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
            {dict.links_open.map((label, i) => (
              <a key={label} href={LINKS_OPEN[i]}>{label}</a>
            ))}
          </nav>
        )}

        <div className="hdr-right">
          {/* The English blog stays reachable from the Spanish blog and legal pages. */}
          {!isHome && <LanguageSwitch />}

          <a className="hdr-door" href={AGENT_PAGE_URL}>{dict.agent_door}</a>

          <a className="btn btn-primary btn-sm" href={BUYER_SITE.search}>
            {dict.cta_open}
          </a>
        </div>
      </div>
    </header>
  );
}
