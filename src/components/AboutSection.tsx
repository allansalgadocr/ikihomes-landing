
interface AboutSectionProps {
  dict: {
    title: string;
    content: string;
  };
}

export function AboutSection({ dict }: AboutSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-block mb-4">
             <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">{dict.title}</span>
        </div>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-source-sans">
          {dict.content}
        </p>
      </div>
    </section>
  );
}
