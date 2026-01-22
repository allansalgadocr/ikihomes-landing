import {  
    CheckCircleIcon,
    XCircleIcon
} from "@heroicons/react/24/solid";

interface DifferentiationSectionProps {
  dict: {
    title: string;
    subtitle_1: string;
    subtitle_2: string;
    competitor: {
      title: string;
      items: string[];
    };
    ikihomes: {
      badge: string;
      title: string;
      items: string[];
    };
  };
}

export function DifferentiationSection({ dict }: DifferentiationSectionProps) {
    return (
        <section className="py-24 bg-olive/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 font-arsenal">{dict.title}</h2>
                    <p className="text-gray-600">
                      {dict.subtitle_1}<strong>{dict.subtitle_2}</strong>.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {/* The Old Way */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 opacity-70 hover:opacity-100 transition-opacity">
                        <h3 className="text-xl font-semibold text-gray-500 mb-6 font-arsenal text-center">{dict.competitor.title}</h3>
                        <ul className="space-y-4">
                            {dict.competitor.items.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-500">
                                    <XCircleIcon className="w-5 h-5 text-red-300 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* The IkiHomes Way */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-olive/20 relative transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-olive text-white text-xs font-bold px-3 py-1 rounded-full px-2">
                            {dict.ikihomes.badge}
                        </div>
                        <h3 className="text-xl font-semibold text-olive mb-6 font-arsenal text-center">{dict.ikihomes.title}</h3>
                        <ul className="space-y-4">
                            {dict.ikihomes.items.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-800">
                                    <CheckCircleIcon className="w-5 h-5 text-olive flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
