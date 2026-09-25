import Image from "next/image";
import { HeroCTA } from "@/components/HeroTracking";
import { ProductVideo } from "@/components/ProductVideo";
import { PORTAL_LIVE, primaryHref, NOTIFY_ANCHOR } from "@/lib/portal";

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
    video: {
      play_label: string;
      player_title: string;
      note: string;
      note_prelaunch: string;
      cta: string;
      cta_prelaunch: string;
    };
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

        <div className="proof-video-block">
          <ProductVideo
            playLabel={dict.video.play_label}
            playerTitle={dict.video.player_title}
          />
          <div className="proof-video-cta">
            <p>{PORTAL_LIVE ? dict.video.note : dict.video.note_prelaunch}</p>
            <HeroCTA
              href={PORTAL_LIVE ? primaryHref() : NOTIFY_ANCHOR}
              className="btn btn-primary btn-sm"
              source="product_video"
            >
              {PORTAL_LIVE ? dict.video.cta : dict.video.cta_prelaunch}
            </HeroCTA>
          </div>
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
