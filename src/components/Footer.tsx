import Link from "next/link";

interface FooterProps {
  lang: string;
  dict: {
    copyright: string;
    links: {
      blog: string;
      privacy: string;
      terms: string;
    };
    contact_email: string;
  };
}

export function Footer({ lang, dict }: FooterProps) {
  return (
    <footer
      className="px-5 py-5 md:px-8"
      style={{
        background: "#091120",
        borderTop: "0.5px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-between gap-2.5">
        <span
          className="text-xs"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          {dict.copyright}
        </span>
        <div className="flex gap-5">
          <Link
            href={`/${lang}/blog`}
            className="text-xs no-underline hover:opacity-60 transition-opacity"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {dict.links.blog}
          </Link>
          <Link
            href={`/${lang}/privacy`}
            className="text-xs no-underline hover:opacity-60 transition-opacity"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {dict.links.privacy}
          </Link>
          <Link
            href={`/${lang}/terms`}
            className="text-xs no-underline hover:opacity-60 transition-opacity"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {dict.links.terms}
          </Link>
          <a
            href={`mailto:${dict.contact_email}`}
            className="text-xs no-underline hover:opacity-60 transition-opacity"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {dict.contact_email}
          </a>
        </div>
      </div>
    </footer>
  );
}
