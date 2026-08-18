import Image from "next/image";
import { HeroPageView, HeroCTA } from "./HeroTracking";
import { IconArrow, IconCheck } from "./Icons";
import { PORTAL_LIVE, primaryHref, NOTIFY_ANCHOR } from "@/lib/portal";

interface HeroSectionProps {
  dict: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    cta_primary: string;
    cta_primary_prelaunch: string;
    cta_secondary: string;
    prelaunch_note: string;
    trust: string[];
    screenshot_chrome: string;
    screenshot_caption: string;
    screenshot_alt: string;
  };
}

export function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section className="band hero">
      <HeroPageView />
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">{dict.eyebrow}</p>
          <h1>{dict.headline}</h1>
          <p className="lede">{dict.subheadline}</p>

          <div className="cta-row">
            <HeroCTA
              href={PORTAL_LIVE ? primaryHref() : NOTIFY_ANCHOR}
              className="btn btn-primary"
              source="hero"
            >
              {PORTAL_LIVE ? dict.cta_primary : dict.cta_primary_prelaunch}
              <IconArrow />
            </HeroCTA>
            <a className="btn btn-ghost" href="#producto">
              {dict.cta_secondary}
            </a>
          </div>

          {!PORTAL_LIVE && <p className="p-note">{dict.prelaunch_note}</p>}

          <div className="trust-row">
            {dict.trust.map((t) => (
              <span key={t}>
                <IconCheck />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-shot">
          <div className="frame">
            <div className="frame-bar">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="frame-url">{dict.screenshot_chrome}</span>
            </div>
            <Image
              src="/hero-dashboard-real.png"
              alt={dict.screenshot_alt}
              width={1661}
              height={920}
              quality={90}
              priority
              sizes="(max-width: 1024px) 100vw, 720px"
            />
          </div>
          <span className="shot-tag">{dict.screenshot_caption}</span>
        </div>
      </div>
    </section>
  );
}
