import Image from "next/image";

interface ProofCard {
  tag: string;
  title: string;
  body: string;
  image: string;
  alt: string;
}

interface ProductProofSectionProps {
  dict: {
    eyebrow: string;
    title: string;
    lede: string;
    cards: ProofCard[];
  };
}

export function ProductProofSection({ dict }: ProductProofSectionProps) {
  return (
    <section className="band bg-surface" id="producto">
      <div className="wrap">
        <div className="proof-head">
          <div>
            <p className="eyebrow">{dict.eyebrow}</p>
            <h2>{dict.title}</h2>
          </div>
          <p className="lede">{dict.lede}</p>
        </div>

        <div className="proof-grid">
          {dict.cards.map((card) => (
            <article className="proof-card" key={card.title}>
              <div className="proof-media">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  quality={90}
                />
              </div>
              <div className="proof-body">
                <span className="tag">{card.tag}</span>
                <h4>{card.title}</h4>
                <p>{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
