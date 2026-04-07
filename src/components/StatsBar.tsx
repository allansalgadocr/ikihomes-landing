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
              className="text-[22px] font-medium leading-none mb-0.5"
              style={{ color: "#A0E2BA" }}
            >
              {item.number}
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
