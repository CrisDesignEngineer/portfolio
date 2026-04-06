"use client";

interface SidebarProps {
  sections: readonly { id: string; label: string }[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function Sidebar({ sections, activeId, onSelect }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden lg:flex flex-col gap-1 min-w-[200px] shrink-0 sticky top-8 self-start">
        <p className="text-xs font-mono uppercase tracking-[0.15em] text-text-muted mb-4 px-3">
          Sections
        </p>
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`text-left text-sm px-3 py-2 rounded-lg transition-colors duration-200 ${
              activeId === id
                ? "text-accent bg-accent/10 font-medium"
                : "text-text-muted hover:text-text-secondary hover:bg-bg-card"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Mobile/tablet top nav */}
      <nav className="lg:hidden sticky top-0 z-40 bg-bg-primary/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10 overflow-x-auto scrollbar-none">
          <div className="flex gap-1 py-2 min-w-max">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onSelect(id)}
                className={`text-sm whitespace-nowrap px-3 py-1.5 rounded-lg transition-colors duration-200 ${
                  activeId === id
                    ? "text-accent bg-accent/10 font-medium"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
