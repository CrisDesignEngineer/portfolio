"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "./FadeIn";
import type { CaseStudy } from "@/data/cases";
import { useTranslation } from "@/i18n/LanguageContext";

interface CaseCardProps {
  caseStudy: CaseStudy;
  index: number;
}

const colorMap: Record<string, { text: string; bg: string; hover: string }> = {
  accent: { text: "text-accent", bg: "bg-accent/10", hover: "group-hover:text-accent" },
  "accent-2": { text: "text-accent-2", bg: "bg-accent-2/10", hover: "group-hover:text-accent-2" },
  "accent-3": { text: "text-accent-3", bg: "bg-accent-3/10", hover: "group-hover:text-accent-3" },
  "accent-4": { text: "text-accent-4", bg: "bg-accent-4/10", hover: "group-hover:text-accent-4" },
};

export function CaseCard({ caseStudy, index }: CaseCardProps) {
  const { t } = useTranslation();
  const colors = colorMap[caseStudy.accentColor || "accent"];

  return (
    <FadeIn delay={index * 0.1} className="h-full">
      <Link href={`/case/${caseStudy.id}`} className="group block h-full">
        <article className="relative overflow-hidden rounded-2xl border border-border bg-bg-card transition-all duration-500 hover:border-border-hover hover:bg-bg-card-hover h-full flex flex-col">
          <div className="w-full aspect-[2.2/1] bg-bg-secondary overflow-hidden relative">
            {caseStudy.image ? (
              <>
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 1120px"
                  className={`object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${caseStudy.confidential ? 'blur-md' : ''}`}
                />
                {caseStudy.confidential && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[11px] font-mono uppercase tracking-wider text-white/80">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    {t("cases.confidential") as string}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-text-muted/40">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-text-muted/40 text-xs">{t("cases.preview") as string}</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-7 sm:p-9 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-[11px] font-mono font-medium ${colors.text} ${colors.bg} px-4 py-1.5 rounded-full tracking-wide uppercase`}>
                {caseStudy.tag}
              </span>
              <span className="text-[11px] text-text-muted font-mono">{caseStudy.year}</span>
            </div>

            <h3 className={`font-bold text-2xl sm:text-3xl text-text-primary mb-3 ${colors.hover} transition-colors duration-300 ${caseStudy.confidential ? 'blur-sm select-none' : ''}`}>
              {caseStudy.title}
            </h3>

            <p className="text-text-secondary text-[15px] leading-relaxed max-w-lg flex-1">
              {caseStudy.subtitle}
            </p>

            <div className={`mt-5 flex items-center gap-2 ${colors.text} text-[13px] font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300`}>
              {t("cases.viewCase") as string}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </article>
      </Link>
    </FadeIn>
  );
}
