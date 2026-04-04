"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader({ lang }: { lang: string }) {
  const pathname = usePathname();

  // Don't show on homepage — hero has its own logo
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  if (isHome) return null;

  return (
    <header className="bg-white border-b border-gray-100 py-4 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <img src="/logo.svg" alt="IkiHomes" className="h-7" />
        </Link>
        <Link
          href={`/${lang}/blog`}
          className="text-sm text-gray-500 font-medium hover:text-primary transition-colors"
        >
          Blog
        </Link>
      </div>
    </header>
  );
}
