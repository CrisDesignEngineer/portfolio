"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ColorSection } from "./ColorSection";
import { TypographySection } from "./TypographySection";
import { SpacingSection } from "./SpacingSection";
import { IconsSection } from "./IconsSection";
import { ComponentsSection } from "./ComponentsSection";
import { AnimationsSection } from "./AnimationsSection";
import { TokensTableSection } from "./TokensTableSection";

const SECTIONS = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "icons", label: "Icons" },
  { id: "components", label: "Components" },
  { id: "animations", label: "Animations" },
  { id: "tokens", label: "Tokens" },
] as const;

const SECTION_COMPONENTS: Record<string, React.FC> = {
  colors: ColorSection,
  typography: TypographySection,
  spacing: SpacingSection,
  icons: IconsSection,
  components: ComponentsSection,
  animations: AnimationsSection,
  tokens: TokensTableSection,
};

const SECTION_TITLES: Record<string, string> = {
  colors: "Colors",
  typography: "Typography",
  spacing: "Spacing",
  icons: "Icons",
  components: "Components",
  animations: "Animations",
  tokens: "Design Tokens",
};

export function DesignSystemContent() {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);

  const ActiveComponent = SECTION_COMPONENTS[activeSection];
  const activeTitle = SECTION_TITLES[activeSection];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Mobile nav */}
      <div className="lg:hidden">
        <Sidebar sections={SECTIONS} activeId={activeSection} onSelect={setActiveSection} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* Header */}
        <header className="py-12 sm:py-16 text-center lg:text-left">
          <h1 className="font-extrabold text-4xl sm:text-5xl tracking-[-0.02em] mb-3">
            Design System
          </h1>
          <p className="text-text-secondary text-lg max-w-xl mx-auto lg:mx-0">
            The visual language, tokens, and components behind this portfolio.
          </p>
        </header>

        {/* Main layout: sidebar + content */}
        <div className="flex gap-12 pb-20">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <Sidebar sections={SECTIONS} activeId={activeSection} onSelect={setActiveSection} />
          </div>

          {/* Content area */}
          <main className="flex-1 min-w-0">
            <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.02em] mb-8">
              {activeTitle}
            </h2>
            <ActiveComponent />
          </main>
        </div>
      </div>
    </div>
  );
}
