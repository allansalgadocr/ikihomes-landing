"use client";

import { usePathname, useRouter } from "next/navigation";

export function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();

  // Assuming format is always /[lang]/...
  const currentLang = pathname.split("/")[1] as "en" | "es";
  
  const handleLanguageChange = (newLang: string) => {
    if (newLang === currentLang) return;
    
    // Replace the first segment of the path
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
      <div className="bg-white/80 backdrop-blur-md border border-primary/20 rounded-full p-1 flex shadow-sm">
        <button
          onClick={() => handleLanguageChange("en")}
          className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${
            currentLang === "en"
              ? "bg-primary text-white shadow-sm"
              : "text-gray-500 hover:text-primary"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange("es")}
          className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${
            currentLang === "es"
              ? "bg-primary text-white shadow-sm"
              : "text-gray-500 hover:text-primary"
          }`}
        >
          ES
        </button>
      </div>
    </div>
  );
}
