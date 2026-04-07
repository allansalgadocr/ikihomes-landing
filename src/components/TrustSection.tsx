interface TrustSectionProps {
  dict: {
    label: string;
    title: string;
    subtitle: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
}

const cardIcons = [
  // Checkmark circle
  <svg key="check" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#A0E2BA" strokeWidth="1.5">
    <circle cx="8" cy="8" r="6" />
    <path d="M5 8l2 2 4-4" />
  </svg>,
  // Lightning / speed
  <svg key="speed" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#A0E2BA" strokeWidth="1.5">
    <path d="M9 2L4 9h4l-1 5 5-7H8l1-5z" />
  </svg>,
  // Location pin
  <svg key="pin" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#A0E2BA" strokeWidth="1.5">
    <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5z" />
    <circle cx="8" cy="6" r="1.5" />
  </svg>,
];

export function TrustSection({ dict }: TrustSectionProps) {
  return (
    <section className="py-16 px-5 md:py-16 md:px-8" style={{ background: "#091120" }}>
      <div className="max-w-[1100px] mx-auto">
        <div
          className="text-[11px] uppercase font-medium mb-2.5"
          style={{ letterSpacing: "0.1em", color: "#A0E2BA" }}
        >
          {dict.label}
        </div>
        <h2 className="type-heading text-[26px] leading-[1.25] text-white mb-2.5">
          {dict.title}
        </h2>
        <p
          className="text-sm leading-[1.65] max-w-[440px] mb-10"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {dict.subtitle}
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3 rounded-xl overflow-hidden"
          style={{
            border: "0.5px solid rgba(255,255,255,0.07)",
            gap: "1px",
            background: "rgba(255,255,255,0.07)",
          }}
        >
          {dict.cards.map((card, i) => (
            <div key={i} className="p-6" style={{ background: "#091120" }}>
              <div
                className="w-[34px] h-[34px] rounded-[7px] flex items-center justify-center mb-4"
                style={{ background: "rgba(160,226,186,0.1)" }}
              >
                {cardIcons[i]}
              </div>
              <h3 className="text-sm font-medium text-white leading-[1.35] mb-1.5">
                {card.title}
              </h3>
              <p
                className="text-xs leading-[1.6]"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
