interface FaqSectionProps {
  dict: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
}

export function FaqSection({ dict }: FaqSectionProps) {
  return (
    <section className="band bg-surface" id="preguntas">
      <div className="wrap">
        <p className="eyebrow">{dict.eyebrow}</p>
        <h2 style={{ maxWidth: "16ch", marginBottom: 36 }}>{dict.title}</h2>
        <div className="faq">
          {dict.items.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
