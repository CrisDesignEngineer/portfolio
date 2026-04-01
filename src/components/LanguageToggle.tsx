"use client";

import { useTranslation } from "@/i18n/LanguageContext";

export function LanguageToggle() {
  const { locale, toggleLocale } = useTranslation();

  return (
    <div role="radiogroup" aria-label="Language" className="flex items-center bg-white/[0.08] rounded-lg p-1 gap-0.5">
      <button
        role="radio"
        aria-checked={locale === "pt"}
        onClick={locale === "pt" ? undefined : toggleLocale}
        className={`px-2.5 py-1 rounded-md text-[12px] font-semibold transition-all duration-200 ${
          locale === "pt"
            ? "bg-accent text-white"
            : "text-text-muted hover:text-text-secondary"
        }`}
        aria-label="Português"
      >
        PT
      </button>
      <button
        role="radio"
        aria-checked={locale === "en"}
        onClick={locale === "en" ? undefined : toggleLocale}
        className={`px-2.5 py-1 rounded-md text-[12px] font-semibold transition-all duration-200 ${
          locale === "en"
            ? "bg-accent text-white"
            : "text-text-muted hover:text-text-secondary"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
