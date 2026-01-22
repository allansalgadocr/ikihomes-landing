interface FooterProps {
  dict: {
    badge: string;
    links: {
      about: string;
      contact: string;
      privacy: string;
    };
    copyright: string;
  };
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="bg-white border-t border-olive/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
           <span className="text-olive font-arsenal font-bold text-lg">IkiHomes</span>
           <span className="text-xs text-olive/60 bg-olive/10 px-2 py-0.5 rounded-full">{dict.badge}</span>
        </div>
        
        <div className="flex gap-6 text-sm text-gray-400">
          <span>{dict.links.about}</span>
          <span>{dict.links.contact}</span>
          <span>{dict.links.privacy}</span>
        </div>

        <div className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} {dict.copyright}
        </div>
      </div>
    </footer>
  );
}
