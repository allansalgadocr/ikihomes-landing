import { HeroCTA } from "./HeroTracking";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "#";

interface BottomCTASectionProps {
  dict: {
    title: string;
    subtitle: string;
    cta: string;
    zones: string;
  };
}

export function BottomCTASection({ dict }: BottomCTASectionProps) {
  return (
    <section
      className="py-[72px] px-5 md:px-8 text-center"
      style={{ background: "#14425B" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <h2 className="type-heading text-[34px] text-white leading-[1.2] mb-3">
          {dict.title}
        </h2>
        <p
          className="text-[15px] mb-7"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {dict.subtitle}
        </p>
        <HeroCTA
          href={FORM_URL}
          className="inline-flex items-center gap-2 bg-[#23696A] text-white text-[15px] font-medium px-8 py-3.5 rounded-lg hover:bg-[#1d5a5b] transition-colors"
        >
          {dict.cta}
        </HeroCTA>
        <div
          className="mt-3.5 text-[11px]"
          style={{
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.04em",
          }}
        >
          {dict.zones}
        </div>
      </div>
    </section>
  );
}
