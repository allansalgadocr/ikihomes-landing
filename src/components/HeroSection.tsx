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
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.28) 50%, transparent 75%)",
              "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 45%)",
            ].join(", "),
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full relative z-10 py-20">
        <div className="max-w-xl text-center md:text-left">
          {/* Logo */}
          <div className="mb-12 animate-fade-in">
            <Image
              src="/logo.svg"
              alt={dict.logo_alt}
              width={160}
              height={48}
              className="h-10 md:h-12 w-auto brightness-0 invert mx-auto md:mx-0"
              priority
            />
          </div>

          {/* h1 — server-rendered for SEO crawlability */}
          <h1
            className="type-display text-white text-[2.25rem] md:text-5xl lg:text-6xl leading-[1.1] mb-8 animate-fade-in-up delay-100"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            {dict.headline}
          </h1>

          {/* Subheadline */}
          <p
            className="type-body text-base md:text-lg text-white/70 mb-10 max-w-md mx-auto md:mx-0 animate-fade-in-up delay-150"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
          >
            {dict.subheadline}
          </p>

          {/* CTA block */}
          <div className="animate-fade-in-up delay-200">
            <HeroCTA
              href={FORM_URL}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-white text-gray-900 font-bold rounded-lg shadow-xl hover:bg-white/90 hover:shadow-2xl transition-all transform hover:-translate-y-0.5 text-base md:text-lg min-h-[52px]"
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
              className="type-body mt-6 text-sm text-white/45 max-w-sm mx-auto md:mx-0 animate-fade-in-up delay-300"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
            >
              {dict.microcopy}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
