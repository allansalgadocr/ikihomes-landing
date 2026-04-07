interface MechanicSectionProps {
  dict: {
    label: string;
    title: string;
    subtitle: string;
    steps: Array<{
      title: string;
      description: string;
      pill?: string;
    }>;
  };
}

const stepIcons = [
  // Search/magnifier with location pin — buyer describes what they want
  <svg key="search" width="18" height="18" viewBox="0 0 18 18" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="7.5" r="5" stroke="#23696A" strokeWidth="1.5" />
    <path d="M11.5 11.5L16 16" stroke="#23696A" strokeWidth="1.5" />
    <circle cx="7.5" cy="6.5" r="1.5" stroke="#A0E2BA" strokeWidth="1.2" />
    <path d="M7.5 8v1" stroke="#A0E2BA" strokeWidth="1.2" />
  </svg>,
  // Bell with signal waves — IkiHomes notifies agents
  <svg key="notify" width="18" height="18" viewBox="0 0 18 18" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 14a2 2 0 0 0 4 0" stroke="#23696A" strokeWidth="1.5" />
    <path d="M9 2v1" stroke="#23696A" strokeWidth="1.5" />
    <path d="M9 3a5 5 0 0 1 5 5c0 2.5 1 4 1 4H3s1-1.5 1-4a5 5 0 0 1 5-5z" stroke="#23696A" strokeWidth="1.5" />
    <path d="M14.5 5.5c1 .8 1.5 2 1.5 2" stroke="#A0E2BA" strokeWidth="1.2" />
    <path d="M15.5 3c1.2 1 2 2.8 2 2.8" stroke="#A0E2BA" strokeWidth="1.2" />
  </svg>,
  // Trophy/podium — first 3 win
  <svg key="trophy" width="18" height="18" viewBox="0 0 18 18" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 14h6" stroke="#23696A" strokeWidth="1.5" />
    <path d="M9 11v3" stroke="#23696A" strokeWidth="1.5" />
    <path d="M5 2h8v5a4 4 0 0 1-8 0V2z" stroke="#23696A" strokeWidth="1.5" />
    <path d="M5 4H3.5a1.5 1.5 0 0 0 0 3H5" stroke="#A0E2BA" strokeWidth="1.2" />
    <path d="M13 4h1.5a1.5 1.5 0 0 1 0 3H13" stroke="#A0E2BA" strokeWidth="1.2" />
  </svg>,
];

export function MechanicSection({ dict }: MechanicSectionProps) {
  return (
    <section className="bg-white py-16 px-5 md:py-16 md:px-8">
      <div className="max-w-[1100px] mx-auto">
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
          className="text-sm leading-[1.65] max-w-[440px] mb-10"
          style={{ color: "#666" }}
        >
          {dict.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {dict.steps.map((step, i) => (
            <div
              key={i}
              className={`py-5 md:py-0 md:px-6 ${
                i === 0
                  ? "md:pl-0 border-t md:border-t-0 md:border-l-0"
                  : "border-t md:border-t-0 md:border-l"
              }`}
              style={{
                borderColor: "#ebebeb",
                borderWidth: i === 0 ? 0 : undefined,
              }}
            >
              <div
                className="text-[11px] uppercase font-medium mb-3.5"
                style={{ letterSpacing: "0.08em", color: "#23696A" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                className="w-[38px] h-[38px] rounded-lg flex items-center justify-center mb-3.5"
                style={{ background: "#f0faf6" }}
              >
                {stepIcons[i]}
              </div>
              <h3
                className="text-sm font-medium leading-[1.35] mb-1.5"
                style={{ color: "#091120" }}
              >
                {step.title}
              </h3>
              <p className="text-xs leading-[1.6]" style={{ color: "#777" }}>
                {step.description}
              </p>
              {step.pill && (
                <span
                  className="inline-block mt-2.5 text-[11px] font-medium rounded px-2.5 py-1"
                  style={{ background: "#e8f7f0", color: "#0f6e56" }}
                >
                  {step.pill}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
