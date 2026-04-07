import { HeroCTA } from "./HeroTracking";

const FORM_URL = process.env.NEXT_PUBLIC_EARLY_ACCESS_FORM_URL || "#";

const badgeStyles: Record<string, { bg: string; color: string }> = {
  lightning: { bg: "#fffbea", color: "#7a5200" },
  fast: { bg: "#e8f3fe", color: "#1a527a" },
  active: { bg: "#edf9f3", color: "#0f5e3a" },
};

const avatarColors: Record<string, string> = {
  CM: "#14425B",
  AL: "#1a3a5c",
  RV: "#0f4a3a",
};

interface SplitSectionProps {
  dict: {
    label: string;
    title: string;
    body: string;
    cta: string;
    microcopy: string;
    preview_label: string;
    preview_footer_text: string;
    preview_footer_value: string;
    preview_caption: string;
    agents: Array<{
      initials: string;
      name: string;
      zone: string;
      badge: string;
      badge_type: string;
    }>;
  };
}

export function SplitSection({ dict }: SplitSectionProps) {
  return (
    <section className="bg-white py-16 px-5 md:py-16 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-14 items-center">
          {/* Left: text */}
          <div>
            <div
              className="text-[11px] uppercase font-medium mb-2.5"
              style={{ letterSpacing: "0.1em", color: "#23696A" }}
            >
              {dict.label}
            </div>
            <h2
              className="type-heading text-[26px] leading-[1.25] mb-2.5"
              style={{ color: "#091120" }}
            >
              {dict.title}
            </h2>
            <p
              className="text-sm leading-[1.65] mb-7"
              style={{ color: "#666" }}
            >
              {dict.body}
            </p>
            <div>
              <HeroCTA
                href={FORM_URL}
                className="inline-flex items-center gap-2 bg-[#23696A] text-white text-sm font-medium px-6 py-3.5 rounded-lg hover:bg-[#1d5a5b] transition-colors"
              >
                {dict.cta}
              </HeroCTA>
            </div>
            <p className="text-[11px] mt-3" style={{ color: "#aaa" }}>
              {dict.microcopy}
            </p>
          </div>

          {/* Right: agent preview card */}
          <div>
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "#f7fffe",
                border: "0.5px solid #cde8e4",
              }}
            >
              {/* Header */}
              <div
                className="px-4 py-3.5"
                style={{ borderBottom: "0.5px solid #cde8e4" }}
              >
                <div
                  className="text-[11px] uppercase font-medium"
                  style={{ letterSpacing: "0.07em", color: "#23696A" }}
                >
                  {dict.preview_label}
                </div>
              </div>

              {/* Agent rows */}
              {dict.agents.map((agent, i) => {
                const badge = badgeStyles[agent.badge_type] || badgeStyles.active;
                const avatarBg = avatarColors[agent.initials] || "#14425B";
                const isLast = i === dict.agents.length - 1;

                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      borderBottom: isLast ? "none" : "0.5px solid #eef5f4",
                    }}
                  >
                    <div
                      className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[11px] font-medium shrink-0"
                      style={{ background: avatarBg, color: "#A0E2BA" }}
                    >
                      {agent.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[13px] font-medium"
                        style={{ color: "#091120" }}
                      >
                        {agent.name}
                      </div>
                      <div className="text-[11px]" style={{ color: "#999" }}>
                        {agent.zone}
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-[20px] whitespace-nowrap"
                      style={{ background: badge.bg, color: badge.color }}
                    >
                      {agent.badge}
                    </span>
                  </div>
                );
              })}

              {/* Footer */}
              <div className="px-4 py-3" style={{ background: "#f0faf6" }}>
                <div className="text-[11px]" style={{ color: "#888" }}>
                  {dict.preview_footer_text}{" "}
                  <span className="font-medium" style={{ color: "#23696A" }}>
                    {dict.preview_footer_value}
                  </span>
                </div>
                <div
                  className="text-[10px] mt-1.5"
                  style={{ color: "#bbb" }}
                >
                  {dict.preview_caption}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
