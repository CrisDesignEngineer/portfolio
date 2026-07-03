"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/data/cases";
import { useTranslation } from "@/i18n/LanguageContext";

const colorMap: Record<string, { text: string; bg: string }> = {
  accent: { text: "text-accent", bg: "bg-accent/10" },
  "accent-2": { text: "text-accent-2", bg: "bg-accent-2/10" },
  "accent-3": { text: "text-accent-3", bg: "bg-accent-3/10" },
  "accent-4": { text: "text-accent-4", bg: "bg-accent-4/10" },
};

interface MobileCasesCarouselProps {
  cases: CaseStudy[];
}

export function MobileCasesCarousel({ cases }: MobileCasesCarouselProps) {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.children;
    if (!cards.length) return;
    const card = cards[index] as HTMLElement;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setCurrentIndex(index);
  };

  const scroll = (dir: "left" | "right") => {
    if (dir === "right") {
      const next = currentIndex >= cases.length - 1 ? 0 : currentIndex + 1;
      scrollToIndex(next);
    } else {
      const prev = currentIndex <= 0 ? cases.length - 1 : currentIndex - 1;
      scrollToIndex(prev);
    }
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const scrollLeft = el.scrollLeft;
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setCurrentIndex(closest);
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {cases.map((caseStudy) => {
          const colors = colorMap[caseStudy.accentColor || "accent"];
          return (
            <div
              key={caseStudy.id}
              className="w-[85vw] min-w-[85vw] snap-start shrink-0"
            >
              <Link href={`/case/${caseStudy.id}`} className="group block h-full">
                <article className="relative overflow-hidden rounded-2xl border border-border bg-bg-card h-full flex flex-col">
                  <div className="w-full aspect-[16/10] bg-bg-secondary overflow-hidden relative">
                    {caseStudy.image ? (
                      <>
                        <Image
                          src={caseStudy.image}
                          alt={caseStudy.title}
                          fill
                          sizes="90vw"
                          className={`object-cover ${caseStudy.confidential ? "blur-md" : ""}`}
                        />
                        {caseStudy.confidential && (
                          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white/80">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            {t("cases.confidential")}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-text-muted/40">
                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-text-muted/40 text-xs">{t("cases.preview")}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-mono font-medium ${colors.text} ${colors.bg} px-3 py-1 rounded-full tracking-wide uppercase`}>
                        {caseStudy.tag}
                      </span>
                      <span className="text-[10px] text-text-muted font-mono">{caseStudy.year}</span>
                    </div>

                    <h3 className={`font-bold text-lg text-text-primary mb-1.5 ${caseStudy.confidential ? "blur-sm select-none" : ""}`}>
                      {caseStudy.title}
                    </h3>

                    <p className="text-text-secondary text-[13px] leading-relaxed flex-1">
                      {caseStudy.subtitle}
                    </p>

                    <div className={`mt-3 flex items-center gap-2 ${colors.text} text-[12px] font-medium`}>
                      {t("cases.viewCaseShort")}
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Dots + arrows */}
      <div className="flex items-center justify-between mt-4">
        {/* Dots indicator */}
        <div className="flex items-center gap-2">
          {cases.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 h-2 bg-accent"
                  : "w-2 h-2 bg-text-muted/30"
              }`}
              aria-label={`${t("cases.goToCase")} ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-secondary active:text-text-primary active:border-border-hover"
            aria-label={t("cases.previous")}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-secondary active:text-text-primary active:border-border-hover"
            aria-label={t("cases.next")}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
