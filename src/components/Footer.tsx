import Link from "next/link";
import { FooterForm } from "./FooterForm";

interface FooterProps {
  dict: {
    badge: string;
    trust_line?: string;
    links: {
      about: string;
      contact: string;
      privacy: string;
      terms: string;
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

export function Footer({ dict, formDict }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
        
        {/* Brand & Badge */}
        {/* Brand & Badge */}
        <div className="flex flex-col items-center md:items-start gap-4">
           <div className="flex items-center gap-2">
                <img src="/logo.svg" alt="IkiHomes" className="h-8" />
                <span className="text-[10px] text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full uppercase tracking-wide font-bold">{dict.badge}</span>
           </div>
           


           {/* Footer Form */}
           <div className="w-full max-w-xs">
              <FooterForm 
                 placeholder={formDict.email_placeholder} 
                 buttonText={formDict.button}
                 successMessage={formDict.success_msg}
              />
           </div>
        </div>

        {/* Trust Line (New) */}
        {dict.trust_line && (
            <div className="hidden lg:block text-sm text-gray-400 font-medium text-center">
                {dict.trust_line}
            </div>
        )}
        
        {/* Legal & Nav Links */}
        <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium">
                {/* Privacy & Terms Links */}
                <Link href="/privacy" className="hover:text-primary transition-colors">{dict.links.privacy}</Link>
                <Link href="/terms" className="hover:text-primary transition-colors">{dict.links.terms}</Link>
                <a href={`mailto:${dict.contact_email}`} className="hover:text-primary transition-colors">{dict.contact_email}</a>
            </div>
            
            {/* Copyright */}
            <div className="text-xs text-gray-400">
                &copy; {new Date().getFullYear()} {dict.copyright}
            </div>
        </div>
      </div>
    </footer>
  );
}
