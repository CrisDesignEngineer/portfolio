"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import pt from "./locales/pt.json";
import en from "./locales/en.json";

type Locale = "pt" | "en";

const locales = { pt, en } as const;

interface LanguageContextType {
  locale: Locale;
  toggleLocale: () => void;
  t: (key: string) => string | string[];
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): string | string[] {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value as string[];
  return path;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "en" || saved === "pt") {
      setLocale(saved);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("locale", locale);
      document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    }
  }, [locale, isHydrated]);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "pt" ? "en" : "pt"));
  }, []);

  const t = useCallback(
    (key: string): string | string[] => {
      return getNestedValue(locales[locale] as unknown as Record<string, unknown>, key);
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t, isHydrated }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}

export function LocaleFadeWrapper({ children }: { children: ReactNode }) {
  const { isHydrated, locale } = useTranslation();
  const [fading, setFading] = useState(false);
  const prevLocaleRef = useRef(locale);

  useEffect(() => {
    if (prevLocaleRef.current !== locale && isHydrated) {
      setFading(true);
      const timer = setTimeout(() => {
        setFading(false);
      }, 150);
      prevLocaleRef.current = locale;
      return () => clearTimeout(timer);
    }
  }, [locale, isHydrated]);

  return (
    <div
      className={`locale-fade ${!isHydrated ? "hydrating" : ""}`}
      style={{ opacity: fading ? 0 : 1 }}
    >
      {children}
    </div>
  );
}
