
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

interface SocialProofSectionProps {
  dict: {
    title: string;
    items: string[];
    statement: string;
  };
}

export function SocialProofSection({ dict }: SocialProofSectionProps) {
  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold font-urbanist text-gray-900 mb-8 tracking-tight">
          {dict.title}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10">
          {dict.items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200/60">
              <CheckBadgeIcon className="w-5 h-5 text-primary" />
              <span className="font-source-sans font-medium text-gray-700 text-sm md:text-base">
                {item}
              </span>
            </div>
          ))}
        </div>

        <p className="text-gray-500 font-medium text-sm md:text-base max-w-2xl mx-auto">
          {dict.statement}
        </p>
      </div>
    </section>
  );
}
