import { HeroPageView, HeroCTA } from "./HeroTracking";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "#";

interface HeroSectionProps {
  dict: {
    eyebrow: string;
    headline_start: string;
    headline_em: string;
    subheadline: string;
    cta: string;
    logo_alt: string;
  };
}

export function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "520px", background: "#091120" }}
    >
      <HeroPageView />

      {/* Background photo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('/_next/image?url=%2Fhero-lifestyle.jpg&w=1920&q=75')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "#091120", opacity: 0.55 }}
      />

      {/* Content */}
      <div className="relative z-10 py-20 px-5 md:px-8 max-w-[580px]">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-1.5 mb-5 text-[11px] uppercase"
          style={{ letterSpacing: "0.08em", color: "#A0E2BA" }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: "#A0E2BA" }}
          />
          {dict.eyebrow}
        </div>

        {/* H1 */}
        <h1 className="type-heading text-white text-4xl md:text-[36px] leading-[1.2] mb-4">
          {dict.headline_start}
          <em className="not-italic" style={{ color: "#A0E2BA" }}>
            {dict.headline_em}
          </em>
        </h1>

        {/* Subheadline */}
        <p
          className="text-sm leading-[1.7] mb-8 max-w-[420px]"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {dict.subheadline}
        </p>

        {/* CTA */}
        <HeroCTA
          href={FORM_URL}
          className="inline-flex items-center gap-2 bg-[#23696A] text-white text-sm font-medium px-6 py-3.5 rounded-lg hover:bg-[#1d5a5b] transition-colors"
        >
          {dict.cta}
        </HeroCTA>
      </div>
    </section>
  );
}
