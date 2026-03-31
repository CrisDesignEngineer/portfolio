"use client";

import { useTranslation } from "@/i18n/LanguageContext";
import { cases } from "@/data/cases";
import { CaseCard } from "@/components/CaseCard";
import { CasesCarousel } from "@/components/CasesCarousel";
import { MobileCasesCarousel } from "@/components/MobileCasesCarousel";

export function CasesSection() {
  const { t, locale } = useTranslation();
  const localizedCases = cases[locale];

  return (
    <section id="cases" className="pt-10 pb-14 sm:pt-12 sm:pb-16 max-w-[1120px] mx-auto px-6 sm:px-10">
      <div className="mb-10">
        <span className="inline-block text-[13px] font-mono font-medium text-accent-2 tracking-[0.15em] uppercase mb-3">
          {t("cases.label") as string}
        </span>
        <h2 className="font-extrabold text-3xl sm:text-[32px] tracking-[-0.02em] text-text-primary">
          {t("cases.title") as string}
        </h2>
      </div>

      <div className="hidden md:block space-y-6">
        <CaseCard caseStudy={localizedCases[0]} index={0} />
        <CasesCarousel cases={localizedCases.slice(1)} />
      </div>

      <div className="md:hidden">
        <MobileCasesCarousel cases={localizedCases} />
      </div>
    </section>
  );
}
