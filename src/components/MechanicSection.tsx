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
  // Clock
  <svg key="clock" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#23696A" strokeWidth="1.5">
    <circle cx="9" cy="9" r="7" />
    <path d="M9 5v4l3 2" />
  </svg>,
  // Envelope
  <svg key="envelope" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#23696A" strokeWidth="1.5">
    <rect x="2" y="4" width="14" height="10" rx="2" />
    <path d="M2 7l7 4 7-4" />
  </svg>,
  // Star
  <svg key="star" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#23696A" strokeWidth="1.5">
    <path d="M9 2l2 4.5H16l-4 3 1.5 4.5L9 11.5l-4.5 2.5L6 9.5 2 6.5h5z" />
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
