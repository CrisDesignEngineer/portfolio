"use client";

import { useRef, useState } from "react";

// Shared snap-scroll logic for the case carousels (desktop + mobile share this; markup differs).
export function useCarousel(count: number) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setCurrentIndex(index);
  };

  const scroll = (dir: "left" | "right") => {
    scrollToIndex(
      dir === "right"
        ? currentIndex >= count - 1 ? 0 : currentIndex + 1
        : currentIndex <= 0 ? count - 1 : currentIndex - 1
    );
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    let closest = 0;
    let minDist = Infinity;
    Array.from(el.children).forEach((card, i) => {
      const dist = Math.abs((card as HTMLElement).offsetLeft - el.scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setCurrentIndex(closest);
  };

  return { scrollRef, currentIndex, scrollToIndex, scroll, handleScroll };
}
