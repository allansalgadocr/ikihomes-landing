interface StatsBarProps {
  dict: {
    items: Array<{ number: string; label: string }>;
  };
}

export function StatsBar({ dict }: StatsBarProps) {
  return (
    <div
      className="flex items-center justify-center gap-5 md:gap-10 flex-wrap px-5 py-4 md:px-8"
      style={{ background: "#14425B" }}
    >
      {dict.items.map((item, i) => (
        <div key={i} className="contents">
          {i > 0 && (
            <div
              className="hidden md:block w-px h-8"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />
          )}
          <div className="text-center">
            <div
              className="text-[22px] font-medium leading-none mb-0.5 flex items-center justify-center"
              style={{ color: "#A0E2BA" }}
            >
              {item.number === "—" ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#A0E2BA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="9" width="12" height="9" rx="2" />
                  <path d="M7 9V6a3 3 0 0 1 6 0v3" />
                </svg>
              ) : (
                item.number
              )}
            </div>
            <div
              className="text-[11px]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
