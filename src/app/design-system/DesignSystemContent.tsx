"use client";

const SECTIONS = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "icons", label: "Icons" },
  { id: "components", label: "Components" },
  { id: "animations", label: "Animations" },
  { id: "tokens", label: "Tokens" },
] as const;

export function DesignSystemContent() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="py-16 sm:py-20 max-w-[1120px] mx-auto px-6 sm:px-10 text-center">
        <h1 className="font-extrabold text-4xl sm:text-5xl tracking-[-0.02em] mb-4">
          Design System
        </h1>
        <p className="text-text-secondary text-lg max-w-xl mx-auto">
          The visual language, tokens, and components behind this portfolio.
        </p>
      </header>

      <div className="max-w-[1120px] mx-auto px-6 sm:px-10 pb-20">
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="py-16">
            <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.02em] mb-8">
              {section.label}
            </h2>
            <p className="text-text-muted">Coming soon...</p>
          </section>
        ))}
      </div>
    </div>
  );
}
