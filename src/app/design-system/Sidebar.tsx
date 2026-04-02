"use client";

import { useEffect, useState } from "react";

interface SidebarProps {
  sections: readonly { id: string; label: string }[];
}

export function Sidebar({ sections }: SidebarProps) {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <ul className="flex flex-col gap-3">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`text-sm transition-colors duration-200 ${
                  activeId === id
                    ? "text-accent font-medium"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile/tablet top nav */}
      <nav className="lg:hidden sticky top-0 z-40 bg-bg-primary/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10 overflow-x-auto scrollbar-none">
          <ul className="flex gap-6 py-3 min-w-max">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeId === id
                      ? "text-accent font-medium"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
