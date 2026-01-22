import Link from "next/link";

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
    contact_email: string; // New field
    copyright: string;
  };
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
        
        {/* Brand & Badge */}
        <div className="flex flex-col items-center md:items-start gap-2">
           <div className="flex items-center gap-2">
                <span className="text-primary font-urbanist font-bold text-lg">IkiHomes</span>
                <span className="text-[10px] text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full uppercase tracking-wide font-bold">{dict.badge}</span>
           </div>
           
           {/* Contact Email Displayed Prominently */}
           <a href={`mailto:${dict.contact_email}`} className="text-sm text-gray-500 hover:text-primary transition-colors">
             {dict.contact_email}
           </a>
        </div>

        {/* Trust Line (New) */}
        {dict.trust_line && (
            <div className="hidden md:block text-sm text-gray-400 font-medium">
                {dict.trust_line}
            </div>
        )}
        
        {/* Legal & Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium">
          {/* Privacy & Terms Links */}
          <Link href="/privacy" className="hover:text-primary transition-colors">{dict.links.privacy}</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">{dict.links.terms}</Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} {dict.copyright}
        </div>
      </div>
    </footer>
  );
}
