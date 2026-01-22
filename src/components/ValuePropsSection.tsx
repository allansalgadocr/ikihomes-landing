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

export function ValuePropsSection({ dict }: ValuePropsSectionProps) {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-urbanist">{dict.title}</h2>
          <p className="text-gray-600">
            {dict.subtitle}
          </p>
        </div>

        {/* 3 Column Grid for Pain/Benefit/Differentiator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {dict.items.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-2xl border border-gray-100/50 hover:shadow-sm transition-shadow flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-urbanist">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                    {feature.description}
                </p>
                {index === 0 && (
                   <div className="mt-6 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                      <img src="/whatsapp-preview.png" alt="WhatsApp Sharing Preview" className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity" />
                   </div>
                )}
                {index === 1 && (
                   <div className="mt-6 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                      <img src="/ui-detail-card.png" alt="UI Detail Preview" className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity" />
                   </div>
                )}
                {index === 2 && (
                   <div className="mt-6 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                      <img src="/map-visual.png" alt="Cost Rica Map Preview" className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity" />
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
              className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              {dict.cta}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
