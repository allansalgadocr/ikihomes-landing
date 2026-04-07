"use client";

interface NavBarProps {
  dict: {
    badge: string;
  };
}

export function NavBar({ dict }: NavBarProps) {
  return (
    <nav
      className="sticky top-0 z-40 flex items-center justify-between px-5 py-3.5 md:px-8"
      style={{ background: "rgba(9,17,32,0.88)" }}
    >
      <div className="flex items-center gap-2">
        <img
          src="/logo.svg"
          alt="IkiHomes"
          className="h-6 w-auto brightness-0 invert"
        />
      </div>
      <span
        className="text-[11px] border rounded-[20px] px-3 py-1"
        style={{
          color: "#A0E2BA",
          borderColor: "rgba(160,226,186,0.3)",
        }}
      >
        {dict.badge}
      </span>
    </nav>
  );
}
