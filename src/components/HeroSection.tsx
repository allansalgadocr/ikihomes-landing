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
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* GA page view tracker */}
      <HeroPageView />

      {/* Full-bleed hero image — next/image for LCP optimization */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-lifestyle.jpg"
          alt="Costa Rica luxury homes aerial view"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Elevated gradient: multi-layer for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(135deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.35) 40%, transparent 70%)",
              "linear-gradient(to top, rgba(15,23,42,0.5) 0%, rgba(15,23,42,0.1) 40%, transparent 60%)",
              "radial-gradient(ellipse at 20% 80%, rgba(45,90,94,0.2) 0%, transparent 60%)",
            ].join(", "),
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full relative z-10 py-24 md:py-32">
        <div className="max-w-2xl text-center md:text-left">
          {/* Logo */}
          <div className="mb-16 animate-fade-in">
            <Image
              src="/logo.svg"
              alt={dict.logo_alt}
              width={180}
              height={54}
              className="h-11 md:h-14 w-auto brightness-0 invert mx-auto md:mx-0 drop-shadow-lg"
              priority
            />
          </div>

          {/* h1 — server-rendered for SEO crawlability */}
          <h1
            className="type-display text-white text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] leading-[1.08] mb-8 animate-fade-in-up delay-100"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.4), 0 8px 48px rgba(0,0,0,0.2)" }}
          >
            {dict.headline}
          </h1>

          {/* Subheadline */}
          <p
            className="type-body text-base md:text-lg text-white/65 mb-12 max-w-lg mx-auto md:mx-0 animate-fade-in-up delay-150"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.3)" }}
          >
            {dict.subheadline}
          </p>

          {/* CTA block */}
          <div className="animate-fade-in-up delay-200">
            <HeroCTA
              href={FORM_URL}
              className="btn-elevated bg-white text-gray-900 text-base md:text-lg shadow-[0_4px_16px_rgba(255,255,255,0.2),0_12px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(255,255,255,0.25),0_20px_60px_rgba(0,0,0,0.2)] hover:bg-white/95"
            >
              {dict.cta}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </HeroCTA>
          </div>

          {/* Microcopy */}
          {dict.microcopy && (
            <p
              className="type-body mt-8 text-sm text-white/40 tracking-wide max-w-sm mx-auto md:mx-0 animate-fade-in-up delay-300"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
            >
              {dict.microcopy}
            </p>
          )}
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAFAF9] to-transparent z-10" />
    </section>
  );
}
