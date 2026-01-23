interface ValuePropsSectionProps {
  dict: {
    title: string;
    subtitle: string;
    cta?: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}
import { TopoBackground } from "./TopoBackground";

export function ValuePropsSection({ dict }: ValuePropsSectionProps) {
  return (
    <section className="py-32 bg-[var(--color-bg)] relative overflow-hidden">
      {/* Abstract topo pattern could go here */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-urbanist tracking-tight">{dict.title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        {/* 3 Column Grid for Pain/Benefit/Differentiator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {dict.items.map((feature, index) => (
            <div key={index} className="p-8 bg-[var(--color-card)] rounded-2xl border border-[rgba(45,90,94,0.1)] hover:shadow-lg transition-all duration-300 flex flex-col group">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-urbanist tracking-tight group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base flex-grow">
                    {feature.description}
                </p>
                {index === 0 && (
                   <div className="mt-8 rounded-lg overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
                      <img src="/whatsapp-preview.png" alt="WhatsApp Sharing Preview" className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                   </div>
                )}
                {index === 1 && (
                   <div className="mt-8 rounded-lg overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
                      <img src="/ui-detail-card.png" alt="UI Detail Preview" className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                   </div>
                )}
                {index === 2 && (
                   <div className="mt-8 rounded-lg overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
                      <img src="/costa-rica-map-preview.png" alt="Costa Rica Map Preview" className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                   </div>
                )}
            </div>
          ))}
        </div>

        {/* Secondary CTA */}
        {dict.cta && (
          <div className="text-center">
            <a 
              href="#join-waitlist"
              className="inline-block px-10 py-4 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-[#3D6E72] hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              {dict.cta}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
