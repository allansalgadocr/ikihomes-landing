"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBarProps {
  dict: {
    badge: string;
  };
}

export function NavBar({ dict }: NavBarProps) {
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "es";

  return (
    <nav
      className="sticky top-0 z-40 flex items-center justify-between px-5 py-3.5 md:px-8"
      style={{ background: "rgba(9,17,32,0.88)" }}
    >
      <Link href={`/${lang}`} className="flex items-center gap-2">
        <img
          src="/logo.svg"
          alt="IkiHomes"
          className="h-6 w-auto brightness-0 invert"
        />
      </Link>
      <span
        className="text-[11px] border rounded-[20px] px-3 py-1"
        style={{
          color: "#A0E2BA",
          borderColor: "rgba(160,226,186,0.3)",
        }}
      >
        {dict.badge}
      </span>
    </nav>
  );
}
