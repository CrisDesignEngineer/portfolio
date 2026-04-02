"use client";

import { Sidebar } from "./Sidebar";
import { ColorSection } from "./ColorSection";
import { TypographySection } from "./TypographySection";
import { SpacingSection } from "./SpacingSection";
import { IconsSection } from "./IconsSection";

const SECTIONS = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "icons", label: "Icons" },
  { id: "components", label: "Components" },
  { id: "animations", label: "Animations" },
  { id: "tokens", label: "Tokens" },
] as const;

const REMAINING = ["components", "animations", "tokens"];

export function DesignSystemContent() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar sections={SECTIONS} />

      <header className="py-16 sm:py-20 max-w-[1120px] mx-auto px-6 sm:px-10 text-center">
        <h1 className="font-extrabold text-4xl sm:text-5xl tracking-[-0.02em] mb-4">
          Design System
        </h1>
        <p className="text-text-secondary text-lg max-w-xl mx-auto">
          The visual language, tokens, and components behind this portfolio.
        </p>
      </header>

      <div className="max-w-[1120px] mx-auto px-6 sm:px-10 pb-20">
        <section id="colors" className="py-16 scroll-mt-16">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.02em] mb-8">Colors</h2>
          <ColorSection />
        </section>

        <section id="typography" className="py-16 scroll-mt-16">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.02em] mb-8">Typography</h2>
          <TypographySection />
        </section>

        <section id="spacing" className="py-16 scroll-mt-16">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.02em] mb-8">Spacing</h2>
          <SpacingSection />
        </section>

        <section id="icons" className="py-16 scroll-mt-16">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.02em] mb-8">Icons</h2>
          <IconsSection />
        </section>

        {SECTIONS.filter((s) => REMAINING.includes(s.id)).map((section) => (
          <section key={section.id} id={section.id} className="py-16 scroll-mt-16">
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
