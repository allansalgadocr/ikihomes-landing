import Image from "next/image";
import { HeroPageView, HeroCTA } from "./HeroTracking";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "#";

interface HeroSectionProps {
  dict: {
    headline: string;
    subheadline: string;
    cta: string;
    microcopy?: string;
    logo_alt: string;
  };
}

export function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section className="relative min-h-[94vh] flex items-center overflow-hidden">
      <HeroPageView />

      {/* Full-bleed hero image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-lifestyle.jpg"
          alt="Costa Rica luxury homes aerial view"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Deep, cinematic gradient overlay — secondary-to-primary tint for brand depth */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(160deg, rgba(9,17,32,0.72) 0%, rgba(20,66,91,0.45) 40%, rgba(35,105,106,0.15) 80%, transparent 100%)",
              "linear-gradient(to top, rgba(9,17,32,0.6) 0%, rgba(9,17,32,0.15) 50%, transparent 70%)",
            ].join(", "),
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full relative z-10 py-28 md:py-36">
        <div className="max-w-2xl text-center md:text-left">
          {/* Logo */}
          <div className="mb-14 animate-fade-in">
            <Image
              src="/logo.svg"
              alt={dict.logo_alt}
              width={180}
              height={54}
              className="h-11 md:h-14 w-auto brightness-0 invert mx-auto md:mx-0"
              priority
            />
          </div>

          {/* Headline */}
          <h1
            className="type-display text-white text-[2.5rem] md:text-[3.25rem] lg:text-[4rem] leading-[1.06] mb-8 animate-fade-in-up delay-100"
            style={{ textShadow: "0 2px 32px rgba(9,17,32,0.4)" }}
          >
            {dict.headline}
          </h1>

          {/* Subheadline */}
          <p
            className="type-body text-[1.0625rem] md:text-lg text-white/60 mb-12 max-w-lg mx-auto md:mx-0 animate-fade-in-up delay-150"
          >
            {dict.subheadline}
          </p>

          {/* CTA */}
          <div className="animate-fade-in-up delay-200">
            <HeroCTA
              href={FORM_URL}
              className="btn-elevated bg-white text-midnight text-base md:text-lg shadow-[0_4px_20px_rgba(0,0,0,0.15),0_16px_48px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.2),0_24px_64px_rgba(0,0,0,0.12)] hover:bg-white/95"
            >
              {dict.cta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </HeroCTA>
          </div>

          {/* Microcopy */}
          {dict.microcopy && (
            <p className="type-body mt-8 text-sm text-white/35 tracking-wide max-w-sm mx-auto md:mx-0 animate-fade-in-up delay-300">
              {dict.microcopy}
            </p>
          )}
        </div>
      </div>

      {/* Bottom fade into content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAF9] to-transparent z-10" />
    </section>
  );
}
