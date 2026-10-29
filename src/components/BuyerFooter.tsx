"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { AGENT_PRODUCT_PAGE_URL, BUYER_SITE } from "@/lib/portal";

interface BuyerFooterProps {
  dict: { links_open: string[]; agent_door: string };
  /** The links and lines the footer keeps from before: blog, legal, email, copyright. */
  common: {
    copyright: string;
    links: { blog: string; privacy: string; terms: string };
    contact_email: string;
  };
}

const LINKS_OPEN = [BUYER_SITE.search, BUYER_SITE.findForMe, BUYER_SITE.agents];

/** The Spanish footer: the open product's pages, the agent door, blog, legal and contact. */
export function BuyerFooter({ dict, common }: BuyerFooterProps) {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot">
          <Logo />
          <div className="foot-links">
            {dict.links_open.map((label, i) => (
              <a key={label} href={LINKS_OPEN[i]}>{label}</a>
            ))}
            <a href={AGENT_PRODUCT_PAGE_URL}>{dict.agent_door}</a>
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
