"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/i18n/LanguageContext";

function BrazilFlag() {
  return (
    <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="brClip"><circle cx="256" cy="256" r="256" /></clipPath>
      <g clipPath="url(#brClip)">
        <rect width="512" height="512" fill="#6DA544" />
        <polygon points="256,100.2 467.5,256 256,411.8 44.5,256" fill="#FFDA44" />
        <circle cx="256" cy="256" r="89" fill="#F0F0F0" />
        <path d="M167 256 A89 89 0 0 0 345 256 A89 89 0 0 1 167 256Z" fill="#0052B4" />
        <path d="M182.1 247.5 C210 228 302 228 329.9 247.5 A89 89 0 0 0 182.1 247.5Z" fill="#F0F0F0" opacity="0.3" />
      </g>
    </svg>
  );
}

function USAFlag() {
  return (
    <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="usClip"><circle cx="256" cy="256" r="256" /></clipPath>
      </defs>
      <g clipPath="url(#usClip)">
        <rect width="512" height="512" fill="#F0F0F0" />
        <rect y="0" width="512" height="39.4" fill="#D80027" />
        <rect y="78.8" width="512" height="39.4" fill="#D80027" />
        <rect y="157.5" width="512" height="39.4" fill="#D80027" />
        <rect y="236.3" width="512" height="39.4" fill="#D80027" />
        <rect y="315" width="512" height="39.4" fill="#D80027" />
        <rect y="393.8" width="512" height="39.4" fill="#D80027" />
        <rect y="472.6" width="512" height="39.4" fill="#D80027" />
        <rect width="256" height="275.7" fill="#0052B4" />
        <g fill="#F0F0F0">
          <circle cx="51.2" cy="46" r="8" />
          <circle cx="102.4" cy="46" r="8" />
          <circle cx="153.6" cy="46" r="8" />
          <circle cx="204.8" cy="46" r="8" />
          <circle cx="76.8" cy="82.8" r="8" />
          <circle cx="128" cy="82.8" r="8" />
          <circle cx="179.2" cy="82.8" r="8" />
          <circle cx="230.4" cy="82.8" r="8" />
          <circle cx="51.2" cy="119.6" r="8" />
          <circle cx="102.4" cy="119.6" r="8" />
          <circle cx="153.6" cy="119.6" r="8" />
          <circle cx="204.8" cy="119.6" r="8" />
          <circle cx="76.8" cy="156.4" r="8" />
          <circle cx="128" cy="156.4" r="8" />
          <circle cx="179.2" cy="156.4" r="8" />
          <circle cx="230.4" cy="156.4" r="8" />
          <circle cx="51.2" cy="193.2" r="8" />
          <circle cx="102.4" cy="193.2" r="8" />
          <circle cx="153.6" cy="193.2" r="8" />
          <circle cx="204.8" cy="193.2" r="8" />
          <circle cx="76.8" cy="230" r="8" />
          <circle cx="128" cy="230" r="8" />
          <circle cx="179.2" cy="230" r="8" />
          <circle cx="230.4" cy="230" r="8" />
        </g>
      </g>
    </svg>
  );
}

export function MobileLanguageFab() {
  const { locale, toggleLocale, isHydrated } = useTranslation();
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    if (switching) {
      const timer = setTimeout(() => setSwitching(false), 150);
      return () => clearTimeout(timer);
    }
  }, [switching]);

  if (!isHydrated) return null;

  const handleClick = () => {
    setSwitching(true);
    toggleLocale();
  };

  return (
    <button
      onClick={handleClick}
      className="md:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md flex items-center justify-center transition-transform duration-200 active:scale-90 hover:scale-105"
      aria-label={locale === "pt" ? "Switch to English" : "Mudar para Português"}
    >
      <span
        className="transition-all duration-150"
        style={{
          opacity: switching ? 0 : 1,
          transform: switching ? "scale(0.5)" : "scale(1)",
        }}
      >
        {locale === "pt" ? <BrazilFlag /> : <USAFlag />}
      </span>
    </button>
  );
}
