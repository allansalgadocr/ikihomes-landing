import Link from "next/link";
import { Logo } from "./Logo";

interface FooterProps {
  lang: string;
  dict: {
    copyright: string;
    nav: { product: string; pricing: string; faq: string };
    links: { blog: string; privacy: string; terms: string };
    contact_email: string;
  };
}

export function Footer({ lang, dict }: FooterProps) {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot">
          <Logo />
          <div className="foot-links">
            <a href="#producto">{dict.nav.product}</a>
            <a href="#precios">{dict.nav.pricing}</a>
            <a href="#preguntas">{dict.nav.faq}</a>
            <Link href={`/${lang}/blog`}>{dict.links.blog}</Link>
            <Link href={`/${lang}/privacy`}>{dict.links.privacy}</Link>
            <Link href={`/${lang}/terms`}>{dict.links.terms}</Link>
            <a href={`mailto:${dict.contact_email}`}>{dict.contact_email}</a>
          </div>
        </div>
        <p className="foot-note">{dict.copyright}</p>
      </div>
    </footer>
  );
}
