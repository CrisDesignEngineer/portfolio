"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { useTranslation } from "@/i18n/LanguageContext";
import { cases } from "@/data/cases";

interface CaseContentProps {
  caseId: string;
}

const colorMap: Record<string, { text: string; bg: string; dot: string; line: string; hover: string; groupHover: string }> = {
  accent: {
    text: "text-accent",
    bg: "bg-accent/10",
    dot: "bg-accent shadow-[0_0_12px_rgba(191,90,242,0.4)]",
    line: "from-accent via-accent-3 to-transparent",
    hover: "group-hover:text-accent",
    groupHover: "group-hover:text-accent",
  },
  "accent-2": {
    text: "text-accent-2",
    bg: "bg-accent-2/10",
    dot: "bg-accent-2 shadow-[0_0_12px_rgba(236,72,153,0.4)]",
    line: "from-accent-2 via-accent to-transparent",
    hover: "group-hover:text-accent-2",
    groupHover: "group-hover:text-accent-2",
  },
  "accent-3": {
    text: "text-accent-3",
    bg: "bg-accent-3/10",
    dot: "bg-accent-3 shadow-[0_0_12px_rgba(99,102,241,0.4)]",
    line: "from-accent-3 via-accent-2 to-transparent",
    hover: "group-hover:text-accent-3",
    groupHover: "group-hover:text-accent-3",
  },
  "accent-4": {
    text: "text-accent-4",
    bg: "bg-accent-4/10",
    dot: "bg-accent-4 shadow-[0_0_12px_rgba(34,197,94,0.4)]",
    line: "from-accent-4 via-accent to-transparent",
    hover: "group-hover:text-accent-4",
    groupHover: "group-hover:text-accent-4",
  },
};

export function CaseContent({ caseId }: CaseContentProps) {
  const { t, locale } = useTranslation();
  const localizedCases = cases[locale];
  const caseIndex = localizedCases.findIndex((c) => c.id === caseId);
  if (caseIndex === -1) return null;
  const caseStudy = localizedCases[caseIndex];
  const nextCase = localizedCases[(caseIndex + 1) % localizedCases.length];

  const colors = colorMap[caseStudy.accentColor || "accent"];
  const nextColors = colorMap[nextCase.accentColor || "accent"];

  return (
    <main className="pt-28 pb-16">
      {/* Hero do case */}
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10 mb-12">
        <FadeIn>
          <div className="flex items-center gap-3 mb-5">
            <span className={`text-[11px] font-mono font-medium ${colors.text} ${colors.bg} px-4 py-1.5 rounded-full tracking-wide uppercase`}>
              {caseStudy.tag}
            </span>
            <span className="text-[11px] text-text-muted font-mono">{caseStudy.year}</span>
            {caseStudy.confidential && (
              <span className="text-[11px] font-mono font-medium text-white/70 bg-white/10 px-3 py-1.5 rounded-full tracking-wide uppercase flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                {t("cases.confidential")}
              </span>
            )}
          </div>

          <h1 className={`font-extrabold text-4xl sm:text-5xl tracking-[-0.025em] mb-4 ${caseStudy.confidential ? 'blur-sm select-none' : ''}`}>
            {caseStudy.title}
          </h1>

          <p className="text-text-secondary text-lg leading-[1.7] max-w-2xl">
            {caseStudy.subtitle}
          </p>
        </FadeIn>
      </div>

      {/* Imagem de capa */}
      {caseStudy.image && (
        <FadeIn>
          <div className="max-w-[1120px] mx-auto px-6 sm:px-10 mb-12">
            <div className="w-full aspect-[2.4/1] rounded-2xl overflow-hidden border border-border relative">
              <Image
                src={caseStudy.image}
                alt={caseStudy.title}
                fill
                priority
                sizes="1120px"
                className={`object-cover ${caseStudy.confidential ? 'blur-lg' : ''}`}
              />
              {caseStudy.confidential && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/80 text-sm font-mono">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    {t("caseDetail.confidentialContent")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      )}

      {/* Metadados */}
      <div className="max-w-[720px] mx-auto px-6 sm:px-10">
        <FadeIn>
          <div className="grid grid-cols-3 gap-6 py-5 border-t border-b border-border mb-12">
            <div>
              <p className={`text-[11px] font-mono uppercase tracking-[0.15em] mb-2 ${colors.text}`}>
                {t("caseDetail.role")}
              </p>
              <p className="text-text-primary text-[14px] font-medium">
                {caseStudy.role}
              </p>
            </div>
            <div>
              <p className={`text-[11px] font-mono uppercase tracking-[0.15em] mb-2 ${colors.text}`}>
                {t("caseDetail.duration")}
              </p>
              <p className="text-text-primary text-[14px] font-medium">
                {caseStudy.duration}
              </p>
            </div>
            <div>
              <p className={`text-[11px] font-mono uppercase tracking-[0.15em] mb-2 ${colors.text}`}>
                {t("caseDetail.scope")}
              </p>
              <p className="text-text-primary text-[14px] font-medium">
                {caseStudy.scope}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Overview */}
        <FadeIn>
          <section className="mb-12">
            <h2 className="font-bold text-xl tracking-tight mb-4">
              {t("caseDetail.overview")}
            </h2>
            <p className="text-text-secondary text-[15px] leading-[1.75]">
              {caseStudy.overview}
            </p>
          </section>
        </FadeIn>

        {/* Challenges */}
        <FadeIn>
          <section className="mb-12">
            <h2 className="font-bold text-xl tracking-tight mb-5">
              {t("caseDetail.challenges")}
            </h2>
            <ul className="space-y-0">
              {caseStudy.challenges.map((challenge, i) => (
                <li
                  key={i}
                  className="flex gap-3.5 text-text-secondary text-[15px] leading-[1.7] py-3 border-b border-border last:border-0"
                >
                  <span className="mt-[3px] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className={colors.text}>
                      <rect width="20" height="20" rx="6" fill="currentColor" fillOpacity="0.1" />
                      <path d="M6 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  {challenge}
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>

        {/* Process */}
        <FadeIn>
          <section className="mb-12">
            <h2 className="font-bold text-xl tracking-tight mb-6">
              {t("caseDetail.process")}
            </h2>
            <div className="relative pl-8">
              <div className={`absolute left-[3px] top-2 bottom-2 w-[2px] bg-gradient-to-b ${colors.line} rounded-full`} />
              <div className="space-y-7">
                {caseStudy.process.map((phase, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-8 top-[6px] w-[8px] h-[8px] rounded-full ${colors.dot}`} />
                    <h3 className="text-text-primary text-[15px] font-semibold mb-1.5">
                      {`${i + 1}. ${phase.title}`}
                    </h3>
                    <p className="text-text-secondary text-[15px] leading-[1.7]">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Results */}
        <FadeIn>
          <section className="mb-12">
            <h2 className="font-bold text-xl tracking-tight mb-5">
              {t("caseDetail.results")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {caseStudy.results.map((result, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-border bg-bg-card hover:border-border-hover transition-colors duration-300"
                >
                  <div className="flex gap-3 items-start">
                    <span className="mt-0.5 shrink-0">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className={colors.text}>
                        <rect width="20" height="20" rx="6" fill="currentColor" fillOpacity="0.1" />
                        <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-text-secondary text-[14px] leading-[1.65]">
                      {result}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Learnings */}
        <FadeIn>
          <section className="mb-14">
            <h2 className="font-bold text-xl tracking-tight mb-4">
              {t("caseDetail.learnings")}
            </h2>
            <p className="text-text-secondary text-[15px] leading-[1.75]">
              {caseStudy.learnings}
            </p>
          </section>
        </FadeIn>

        {/* Next case navigation */}
        <FadeIn>
          <div className="border-t border-border pt-10">
            <p className="text-text-muted text-[11px] font-mono uppercase tracking-[0.15em] mb-4">
              {t("caseDetail.nextCase")}
            </p>
            <Link
              href={`/case/${nextCase.id}`}
              className="group flex items-center justify-between py-4 px-5 rounded-2xl border border-border bg-bg-card hover:border-border-hover hover:bg-bg-card-hover transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] font-mono font-medium ${nextColors.text} ${nextColors.bg} px-3 py-1 rounded-full tracking-wide uppercase`}>
                    {nextCase.tag}
                  </span>
                  <span className="text-[10px] text-text-muted font-mono">{nextCase.year}</span>
                </div>
                <h3 className={`font-bold text-lg text-text-primary ${nextColors.hover} transition-colors duration-300 ${nextCase.confidential ? 'blur-sm select-none' : ''}`}>
                  {nextCase.title}
                </h3>
                <p className="text-text-secondary text-sm mt-1">
                  {nextCase.subtitle}
                </p>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className={`text-text-muted ${nextColors.groupHover} group-hover:translate-x-1.5 transition-all duration-300 shrink-0 ml-6`}
              >
                <path
                  d="M4 10h12M11 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
