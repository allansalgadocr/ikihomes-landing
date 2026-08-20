"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { PORTAL_LIVE, primaryHref, notifyHref } from "@/lib/portal";

interface NavBarProps {
  dict: {
    product: string; owners: string; pricing: string; faq: string;
    login: string; cta: string; cta_prelaunch: string;
  };
}

export function NavBar({ dict }: NavBarProps) {
  const pathname = usePathname();
  const router = useRouter();
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

          {PORTAL_LIVE && (
            <a className="link-quiet" href={primaryHref("/login")}>
              {dict.login}
            </a>
          )}

          <a
            className="btn btn-primary btn-sm"
            href={PORTAL_LIVE ? primaryHref() : notifyHref(lang)}
          >
            {PORTAL_LIVE ? dict.cta : dict.cta_prelaunch}
          </a>
        </div>
      </div>
    </header>
  );
}
