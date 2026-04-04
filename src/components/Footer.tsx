import Link from "next/link";
import { FooterForm } from "./FooterForm";

interface FooterProps {
  lang: string;
  dict: {
    badge: string;
    trust_line?: string;
    links: {
      about: string;
      contact: string;
      privacy: string;
      terms: string;
      blog?: string;
    };
    contact_email: string;
    copyright: string;
  };
  formDict: {
    email_placeholder: string;
    button: string;
    success_msg: string;
  };
}

export function Footer({ lang, dict, formDict }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top row: brand + form | links */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">

          {/* Brand + quick email capture */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href={`/${lang}`} className="flex items-center gap-2">
              <img src="/logo.svg" alt="IkiHomes" className="h-8" />
              <span className="text-[10px] text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full uppercase tracking-wide font-bold">
                {dict.badge}
              </span>
            </Link>

            {/* Footer form with context label */}
            <div className="w-full max-w-xs">
              <p className="type-body text-xs text-gray-400 mb-2">
                {lang === "en"
                  ? "Get notified when we launch:"
                  : "Recibe aviso cuando lancemos:"}
              </p>
              <FooterForm
                placeholder={formDict.email_placeholder}
                buttonText={formDict.button}
                successMessage={formDict.success_msg}
              />
            </div>
          </div>

          {/* Legal & Nav Links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium">
              <Link href={`/${lang}`} className="hover:text-primary transition-colors">
                {lang === "en" ? "Home" : "Inicio"}
              </Link>
              {dict.links.blog && (
                <Link href={`/${lang}/blog`} className="hover:text-primary transition-colors">
                  {dict.links.blog}
                </Link>
              )}
              <Link href={`/${lang}/privacy`} className="hover:text-primary transition-colors">
                {dict.links.privacy}
              </Link>
              <Link href={`/${lang}/terms`} className="hover:text-primary transition-colors">
                {dict.links.terms}
              </Link>
              <a href={`mailto:${dict.contact_email}`} className="hover:text-primary transition-colors">
                {dict.contact_email}
              </a>
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} {dict.copyright}
            </div>
          </div>
        </div>

        {/* Trust line — full width, centered */}
        {dict.trust_line && (
          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <p className="type-body text-xs text-gray-300 font-medium tracking-wide">
              {dict.trust_line}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
