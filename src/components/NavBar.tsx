"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { primaryHref } from "@/lib/portal";

interface NavBarProps {
  dict: {
    product: string; owners: string; pricing: string; faq: string;
    login: string; cta: string;
  };
}

/** The ES and EN pills. The Spanish header reuses it on blog and legal pages. */
export function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  const lang = (pathname.split("/")[1] || "es") as "en" | "es";

  return (
    <div className="lang" role="group" aria-label="Idioma">
      {(["es", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() =>
            code !== lang && router.push(pathname.replace(`/${lang}`, `/${code}`))
          }
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function NavBar({ dict }: NavBarProps) {
  const pathname = usePathname();
  const lang = (pathname.split("/")[1] || "es") as "en" | "es";
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  return (
    <header className="site">
      <div className="wrap hdr">
        <Link href={`/${lang}`} aria-label="IkiHomes">
          <Logo />
        </Link>

        {isHome && (
          <nav className="nav" aria-label="Principal">
            <a href="#producto">{dict.product}</a>
            <a href="#caminos">{dict.owners}</a>
            <a href="#precios">{dict.pricing}</a>
            <a href="#preguntas">{dict.faq}</a>
          </nav>
        )}

        <div className="hdr-right">
          <LanguageSwitch />

          <a className="link-quiet" href={primaryHref("/login")}>
            {dict.login}
          </a>

          <a className="btn btn-primary btn-sm" href={primaryHref()}>
            {dict.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
