"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { FadeIn } from "./FadeIn";
import type { CaseStudy } from "@/data/cases";

interface CasesCarouselProps {
  cases: CaseStudy[];
}

const colorMap: Record<string, { text: string; bg: string; hover: string }> = {
  accent: { text: "text-accent", bg: "bg-accent/10", hover: "group-hover:text-accent" },
  "accent-2": { text: "text-accent-2", bg: "bg-accent-2/10", hover: "group-hover:text-accent-2" },
  "accent-3": { text: "text-accent-3", bg: "bg-accent-3/10", hover: "group-hover:text-accent-3" },
  "accent-4": { text: "text-accent-4", bg: "bg-accent-4/10", hover: "group-hover:text-accent-4" },
};

export function CasesCarousel({ cases }: CasesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setCurrentIndex(index);
  };

  const scroll = (dir: "left" | "right") => {
    if (dir === "right") {
      scrollToIndex(currentIndex >= cases.length - 1 ? 0 : currentIndex + 1);
    } else {
      scrollToIndex(currentIndex <= 0 ? cases.length - 1 : currentIndex - 1);
    }
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - el.scrollLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setCurrentIndex(closest);
  };

  return (
    <FadeIn delay={0.1}>
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cases.map((caseStudy) => {
            const colors = colorMap[caseStudy.accentColor || "accent"];
            return (
              <div
                key={caseStudy.id}
                className="min-w-[calc(50%-12px)] snap-start shrink-0"
              >
                <Link href={`/case/${caseStudy.id}`} className="group block h-full">
                  <article className="relative overflow-hidden rounded-2xl border border-border bg-bg-card transition-all duration-500 hover:border-border-hover hover:bg-bg-card-hover h-full flex flex-col">
                    <div className="w-full aspect-[2.2/1] bg-bg-secondary overflow-hidden relative">
                      {caseStudy.image ? (
                        <img
                          src={caseStudy.image}
                          alt={caseStudy.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="flex flex-col items-center gap-2">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-text-muted/40">
                              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                              <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                              <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-text-muted/40 text-xs">Preview do projeto</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6 sm:p-7 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-[11px] font-mono font-medium ${colors.text} ${colors.bg} px-4 py-1.5 rounded-full tracking-wide uppercase`}>
                          {caseStudy.tag}
                        </span>
                        <span className="text-[11px] text-text-muted font-mono">{caseStudy.year}</span>
                      </div>

                      <h3 className={`font-bold text-xl sm:text-2xl text-text-primary mb-2 ${colors.hover} transition-colors duration-300`}>
                        {caseStudy.title}
                      </h3>

                      <p className="text-text-secondary text-sm leading-relaxed max-w-md flex-1">
                        {caseStudy.subtitle}
                      </p>

                      <div className={`mt-4 flex items-center gap-2 ${colors.text} text-[13px] font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300`}>
                        Ver case completo
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
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

        {/* Navigation arrows */}
        <div className="flex items-center justify-end gap-3 mt-5">
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 text-text-secondary hover:text-text-primary hover:border-border-hover"
            aria-label="Anterior"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300 text-text-secondary hover:text-text-primary hover:border-border-hover"
            aria-label="Próximo"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </FadeIn>
  );
}
