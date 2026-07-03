# Design System Showcase Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/design-system` showcase page displaying all design tokens, typography, spacing, icons, components, and animations used in the portfolio.

**Architecture:** Next.js App Router page with a client-side scroll spy sidebar for navigation. Each section is a focused client component that renders real design elements. The page reuses existing components (CaseCard, CourseCard, NeonButton, FadeIn, InfiniteSlider) for authentic previews.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion, lucide-react

**Spec:** `docs/superpowers/specs/2026-04-02-design-system-page-design.md`

---

## File Structure

```
src/app/design-system/
├── page.tsx                    # Server component: metadata + layout
├── DesignSystemContent.tsx     # Client component: scroll spy + renders all sections
├── Sidebar.tsx                 # Sidebar nav with scroll spy active state
├── ColorSection.tsx            # Color swatches grid
├── TypographySection.tsx       # Font specimens
├── SpacingSection.tsx          # Spacing scale visualization
├── IconsSection.tsx            # Lucide icons grid
├── ComponentsSection.tsx       # Live component previews
├── AnimationsSection.tsx       # Animation demos with replay
└── TokensTableSection.tsx      # Full token reference table
```

---

### Task 1: Page Route and Layout

**Files:**
- Create: `src/app/design-system/page.tsx`
- Create: `src/app/design-system/DesignSystemContent.tsx`

- [ ] **Step 1: Create the server page component with metadata**

```tsx
// src/app/design-system/page.tsx
import type { Metadata } from "next";
import { DesignSystemContent } from "./DesignSystemContent";

export const metadata: Metadata = {
  title: "Design System | Cristiano Carvalho",
  description:
    "The visual language, tokens, and components behind this portfolio.",
};

export default function DesignSystemPage() {
  return <DesignSystemContent />;
}
```

- [ ] **Step 2: Create the placeholder content component**

```tsx
// src/app/design-system/DesignSystemContent.tsx
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
```

- [ ] **Step 3: Verify the route works**

Run: `npm run dev`
Navigate to: `http://localhost:3000/design-system`
Expected: Page renders with title "Design System" and 7 placeholder sections.

- [ ] **Step 4: Commit**

```bash
git add src/app/design-system/page.tsx src/app/design-system/DesignSystemContent.tsx
git commit -m "feat(design-system): add page route and layout scaffold"
```

---

### Task 2: Sidebar with Scroll Spy

**Files:**
- Create: `src/app/design-system/Sidebar.tsx`
- Modify: `src/app/design-system/DesignSystemContent.tsx`

- [ ] **Step 1: Create the Sidebar component**

```tsx
// src/app/design-system/Sidebar.tsx
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
```

- [ ] **Step 2: Integrate Sidebar into DesignSystemContent**

Update `DesignSystemContent.tsx` — add `<Sidebar sections={SECTIONS} />` before the header, and add `scroll-mt-16` to each section for mobile nav offset:

```tsx
// src/app/design-system/DesignSystemContent.tsx
"use client";

import { Sidebar } from "./Sidebar";

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
        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="py-16 scroll-mt-16"
          >
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
```

- [ ] **Step 3: Verify scroll spy works**

Run dev server, navigate to `/design-system`. Scroll down — sidebar should highlight active section. Click sidebar links — should smooth-scroll to section. On mobile viewport, nav should be horizontal sticky at top.

- [ ] **Step 4: Commit**

```bash
git add src/app/design-system/Sidebar.tsx src/app/design-system/DesignSystemContent.tsx
git commit -m "feat(design-system): add sidebar with scroll spy navigation"
```

---

### Task 3: Colors Section

**Files:**
- Create: `src/app/design-system/ColorSection.tsx`
- Modify: `src/app/design-system/DesignSystemContent.tsx`

- [ ] **Step 1: Create the ColorSection component**

```tsx
// src/app/design-system/ColorSection.tsx
"use client";

interface ColorSwatch {
  name: string;
  value: string;
  cssVar: string;
}

const colorGroups: { title: string; colors: ColorSwatch[] }[] = [
  {
    title: "Backgrounds",
    colors: [
      { name: "Primary", value: "#050507", cssVar: "--bg-primary" },
      { name: "Secondary", value: "#0a0a0f", cssVar: "--bg-secondary" },
      { name: "Card", value: "#0d0d12", cssVar: "--bg-card" },
      { name: "Card Hover", value: "#12121a", cssVar: "--bg-card-hover" },
    ],
  },
  {
    title: "Text",
    colors: [
      { name: "Primary", value: "#f5f5f7", cssVar: "--text-primary" },
      { name: "Secondary", value: "#b8b8c8", cssVar: "--text-secondary" },
      { name: "Muted", value: "#5a5a6e", cssVar: "--text-muted" },
    ],
  },
  {
    title: "Accents",
    colors: [
      { name: "Purple", value: "#bf5af2", cssVar: "--accent" },
      { name: "Purple Hover", value: "#d27af5", cssVar: "--accent-hover" },
      { name: "Pink", value: "#ff2d55", cssVar: "--accent-2" },
      { name: "Indigo", value: "#5e5ce6", cssVar: "--accent-3" },
      { name: "Green", value: "#30d158", cssVar: "--accent-4" },
      { name: "Yellow", value: "#f9ab00", cssVar: "--accent-5" },
    ],
  },
  {
    title: "Borders",
    colors: [
      { name: "Default", value: "rgba(255,255,255,0.08)", cssVar: "--border" },
      { name: "Hover", value: "rgba(255,255,255,0.15)", cssVar: "--border-hover" },
    ],
  },
];

export function ColorSection() {
  return (
    <div className="space-y-12">
      {colorGroups.map((group) => (
        <div key={group.title}>
          <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-4">
            {group.title}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {group.colors.map((color) => (
              <div key={color.cssVar} className="space-y-2">
                <div
                  className="w-full aspect-[3/2] rounded-lg border border-border"
                  style={{ backgroundColor: color.value }}
                />
                <p className="text-sm font-medium text-text-primary">
                  {color.name}
                </p>
                <p className="text-xs font-mono text-text-muted">
                  {color.cssVar}
                </p>
                <p className="text-xs font-mono text-text-muted">
                  {color.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Replace placeholder in DesignSystemContent**

Import `ColorSection` and replace the "colors" section placeholder:

In `DesignSystemContent.tsx`, replace the `SECTIONS.map` block with individual sections. First, just replace the colors placeholder:

```tsx
// Add import at top
import { ColorSection } from "./ColorSection";

// Replace the SECTIONS.map with explicit sections:
<div className="max-w-[1120px] mx-auto px-6 sm:px-10 pb-20">
  <section id="colors" className="py-16 scroll-mt-16">
    <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.02em] mb-8">
      Colors
    </h2>
    <ColorSection />
  </section>

  {SECTIONS.filter((s) => s.id !== "colors").map((section) => (
    <section
      key={section.id}
      id={section.id}
      className="py-16 scroll-mt-16"
    >
      <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.02em] mb-8">
        {section.label}
      </h2>
      <p className="text-text-muted">Coming soon...</p>
    </section>
  ))}
</div>
```

- [ ] **Step 3: Verify colors render**

Navigate to `/design-system`. The Colors section should show a grid of color swatches grouped by Backgrounds, Text, Accents, Borders. Each swatch shows the color, name, CSS variable, and hex value.

- [ ] **Step 4: Commit**

```bash
git add src/app/design-system/ColorSection.tsx src/app/design-system/DesignSystemContent.tsx
git commit -m "feat(design-system): add colors section with swatches"
```

---

### Task 4: Typography Section

**Files:**
- Create: `src/app/design-system/TypographySection.tsx`
- Modify: `src/app/design-system/DesignSystemContent.tsx`

- [ ] **Step 1: Create the TypographySection component**

```tsx
// src/app/design-system/TypographySection.tsx
"use client";

interface Specimen {
  label: string;
  description: string;
  className: string;
  text: string;
}

const specimens: Specimen[] = [
  {
    label: "H1 — Display",
    description: "font-extrabold · text-4xl/text-5xl · tracking-[-0.02em]",
    className: "font-extrabold text-4xl sm:text-5xl tracking-[-0.02em]",
    text: "From Figma to code",
  },
  {
    label: "H2 — Section Title",
    description: "font-extrabold · text-3xl/text-[32px] · tracking-[-0.02em]",
    className: "font-extrabold text-3xl sm:text-[32px] tracking-[-0.02em]",
    text: "Selected projects",
  },
  {
    label: "Section Label",
    description: "font-mono · text-[13px] · font-medium · uppercase · tracking-[0.15em]",
    className: "text-[13px] font-mono font-medium tracking-[0.15em] uppercase text-accent-3",
    text: "CASES",
  },
  {
    label: "Body",
    description: "font-sans · text-base · text-text-primary",
    className: "text-base text-text-primary",
    text: "Product Designer & Design Engineer. SaaS B2B, Design Systems, and scalable interfaces.",
  },
  {
    label: "Secondary",
    description: "font-sans · text-sm · text-text-secondary",
    className: "text-sm text-text-secondary",
    text: "Building interfaces with React/Next.js, ensuring design fidelity and performance.",
  },
  {
    label: "Mono",
    description: "font-mono · text-xs",
    className: "font-mono text-xs text-text-secondary",
    text: "font-family: Geist Mono, monospace",
  },
];

export function TypographySection() {
  return (
    <div className="space-y-10">
      <div className="space-y-2 mb-8">
        <p className="text-sm text-text-secondary">
          Font family: <span className="font-medium text-text-primary">Geist Sans</span> &{" "}
          <span className="font-medium text-text-primary font-mono">Geist Mono</span>
        </p>
      </div>

      {specimens.map((spec) => (
        <div key={spec.label} className="border-b border-border pb-8">
          <p className="text-xs font-mono text-text-muted mb-1">{spec.label}</p>
          <p className="text-xs text-text-muted mb-4">{spec.description}</p>
          <p className={spec.className}>{spec.text}</p>
        </div>
      ))}

      <div className="border-b border-border pb-8">
        <p className="text-xs font-mono text-text-muted mb-1">Gradient Text</p>
        <p className="text-xs text-text-muted mb-4">.gradient-text · background-clip: text</p>
        <p className="font-extrabold text-3xl tracking-[-0.02em] gradient-text">
          Design Engineer
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add TypographySection to DesignSystemContent**

Import `TypographySection` and add a dedicated section for "typography" — same pattern as Colors (explicit section, remove from the SECTIONS.filter list).

- [ ] **Step 3: Commit**

```bash
git add src/app/design-system/TypographySection.tsx src/app/design-system/DesignSystemContent.tsx
git commit -m "feat(design-system): add typography section with specimens"
```

---

### Task 5: Spacing Section

**Files:**
- Create: `src/app/design-system/SpacingSection.tsx`
- Modify: `src/app/design-system/DesignSystemContent.tsx`

- [ ] **Step 1: Create the SpacingSection component**

```tsx
// src/app/design-system/SpacingSection.tsx
"use client";

interface SpacingItem {
  className: string;
  px: number;
  label: string;
}

const spacings: SpacingItem[] = [
  { className: "gap-2", px: 8, label: "gap-2 / 8px" },
  { className: "gap-3", px: 12, label: "gap-3 / 12px" },
  { className: "gap-4", px: 16, label: "gap-4 / 16px" },
  { className: "gap-6", px: 24, label: "gap-6 / 24px" },
  { className: "gap-8", px: 32, label: "gap-8 / 32px" },
  { className: "py-14", px: 56, label: "py-14 / 56px" },
  { className: "py-16", px: 64, label: "py-16 / 64px" },
  { className: "px-6", px: 24, label: "px-6 / 24px" },
  { className: "px-10", px: 40, label: "px-10 / 40px" },
];

const maxPx = 64;

export function SpacingSection() {
  return (
    <div className="space-y-4">
      {spacings.map((item) => (
        <div key={item.label} className="flex items-center gap-4">
          <div
            className="h-6 rounded bg-accent/20 border border-accent/30 shrink-0"
            style={{ width: `${(item.px / maxPx) * 100}%`, maxWidth: "80%" }}
          />
          <span className="text-sm font-mono text-text-secondary whitespace-nowrap">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Add SpacingSection to DesignSystemContent**

Same pattern: import, add explicit section, remove from filter list.

- [ ] **Step 3: Commit**

```bash
git add src/app/design-system/SpacingSection.tsx src/app/design-system/DesignSystemContent.tsx
git commit -m "feat(design-system): add spacing section with scale bars"
```

---

### Task 6: Icons Section

**Files:**
- Create: `src/app/design-system/IconsSection.tsx`
- Modify: `src/app/design-system/DesignSystemContent.tsx`

- [ ] **Step 1: Create the IconsSection component**

```tsx
// src/app/design-system/IconsSection.tsx
"use client";

import {
  Award,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Linkedin,
  Phone,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Lock,
  type LucideIcon,
} from "lucide-react";

interface IconItem {
  icon: LucideIcon;
  name: string;
}

const icons: IconItem[] = [
  { icon: Award, name: "Award" },
  { icon: ArrowRight, name: "ArrowRight" },
  { icon: ArrowUpRight, name: "ArrowUpRight" },
  { icon: Mail, name: "Mail" },
  { icon: Linkedin, name: "Linkedin" },
  { icon: Phone, name: "Phone" },
  { icon: Menu, name: "Menu" },
  { icon: X, name: "X" },
  { icon: ChevronLeft, name: "ChevronLeft" },
  { icon: ChevronRight, name: "ChevronRight" },
  { icon: ExternalLink, name: "ExternalLink" },
  { icon: Lock, name: "Lock" },
];

export function IconsSection() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
      {icons.map(({ icon: Icon, name }) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-border-hover transition-colors"
        >
          <Icon className="w-6 h-6 text-text-primary" />
          <span className="text-xs font-mono text-text-muted">{name}</span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Add IconsSection to DesignSystemContent**

Same pattern.

- [ ] **Step 3: Commit**

```bash
git add src/app/design-system/IconsSection.tsx src/app/design-system/DesignSystemContent.tsx
git commit -m "feat(design-system): add icons section with lucide grid"
```

---

### Task 7: Components Section

**Files:**
- Create: `src/app/design-system/ComponentsSection.tsx`
- Modify: `src/app/design-system/DesignSystemContent.tsx`

- [ ] **Step 1: Create the ComponentsSection component**

```tsx
// src/app/design-system/ComponentsSection.tsx
"use client";

import { ArrowRight } from "lucide-react";
import { NeonButton } from "@/components/ui/neon-button";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/courses";

export function ComponentsSection() {
  const demoCourse = courses.en[0];

  return (
    <div className="space-y-16">
      {/* Buttons */}
      <div>
        <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-6">
          Buttons
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <NeonButton>Neon Default</NeonButton>
          <NeonButton variant="solid">Solid</NeonButton>
          <NeonButton variant="ghost">Ghost</NeonButton>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-text-primary rounded-full border border-border transition-all duration-300 hover:border-border-hover hover:bg-bg-card-hover"
          >
            Outlined
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div>
        <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-6">
          Cards
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          <div>
            <p className="text-xs font-mono text-text-muted mb-3">CourseCard</p>
            <CourseCard course={demoCourse} />
          </div>
          <div>
            <p className="text-xs font-mono text-text-muted mb-3">Card Surface</p>
            <div className="rounded-xl border border-border bg-bg-card p-6 hover:border-border-hover hover:bg-bg-card-hover transition-colors duration-300">
              <p className="font-bold text-text-primary mb-1">Card Title</p>
              <p className="text-sm text-text-secondary">
                Standard card with bg-card, border, and hover transitions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-6">
          Badges
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-mono font-medium text-text-secondary px-2.5 py-1 rounded-full border border-border">
            2026
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent">
            SaaS Platform
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-2/10 text-accent-2">
            Redesign
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-3/10 text-accent-3">
            Design System
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-4/10 text-accent-4">
            Mobile
          </span>
        </div>
      </div>

      {/* Dividers & Effects */}
      <div>
        <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-6">
          Effects
        </h3>
        <div className="space-y-6">
          <div>
            <p className="text-xs font-mono text-text-muted mb-3">Section Divider</p>
            <div className="section-divider" />
          </div>
          <div>
            <p className="text-xs font-mono text-text-muted mb-3">Glass Effect</p>
            <div className="glass rounded-lg border border-border p-6 bg-white/5">
              <p className="text-sm text-text-primary">
                Backdrop blur with glass transparency.
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-mono text-text-muted mb-3">Gradient Border</p>
            <div className="gradient-border p-6 border">
              <p className="text-sm text-text-primary">
                Border with accent gradient.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add ComponentsSection to DesignSystemContent**

Same pattern.

- [ ] **Step 3: Commit**

```bash
git add src/app/design-system/ComponentsSection.tsx src/app/design-system/DesignSystemContent.tsx
git commit -m "feat(design-system): add components section with live previews"
```

---

### Task 8: Animations Section

**Files:**
- Create: `src/app/design-system/AnimationsSection.tsx`
- Modify: `src/app/design-system/DesignSystemContent.tsx`

- [ ] **Step 1: Create the AnimationsSection component**

```tsx
// src/app/design-system/AnimationsSection.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function AnimationDemo({
  label,
  direction,
}: {
  label: string;
  direction: "up" | "down" | "left" | "right";
}) {
  const [key, setKey] = useState(0);

  const directionOffset = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-text-muted">{label}</p>
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="text-xs font-mono text-accent hover:text-accent-hover transition-colors"
        >
          Replay
        </button>
      </div>
      <div className="h-20 flex items-center justify-center rounded-lg border border-border bg-bg-card">
        <motion.div
          key={key}
          initial={{ opacity: 0, ...directionOffset[direction] }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/40"
        />
      </div>
    </div>
  );
}

function HoverDemo() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono text-text-muted">whileHover — Scale</p>
      <div className="h-20 flex items-center justify-center rounded-lg border border-border bg-bg-card">
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="w-12 h-12 rounded-lg bg-accent-3/20 border border-accent-3/40 cursor-pointer"
        />
      </div>
    </div>
  );
}

function GlowDemo() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono text-text-muted">Card Glow — Hover shadow</p>
      <div className="h-20 flex items-center justify-center">
        <div className="card-glow w-32 h-14 rounded-lg border border-border bg-bg-card cursor-pointer flex items-center justify-center">
          <span className="text-xs text-text-muted">Hover me</span>
        </div>
      </div>
    </div>
  );
}

export function AnimationsSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-6">
          FadeIn Directions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimationDemo label="FadeIn Up" direction="up" />
          <AnimationDemo label="FadeIn Down" direction="down" />
          <AnimationDemo label="FadeIn Left" direction="left" />
          <AnimationDemo label="FadeIn Right" direction="right" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-6">
          Interactions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <HoverDemo />
          <GlowDemo />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add AnimationsSection to DesignSystemContent**

Same pattern.

- [ ] **Step 3: Commit**

```bash
git add src/app/design-system/AnimationsSection.tsx src/app/design-system/DesignSystemContent.tsx
git commit -m "feat(design-system): add animations section with replay demos"
```

---

### Task 9: Tokens Table Section

**Files:**
- Create: `src/app/design-system/TokensTableSection.tsx`
- Modify: `src/app/design-system/DesignSystemContent.tsx`

- [ ] **Step 1: Create the TokensTableSection component**

```tsx
// src/app/design-system/TokensTableSection.tsx
"use client";

interface Token {
  name: string;
  value: string;
  tailwind: string;
}

const tokenGroups: { title: string; tokens: Token[] }[] = [
  {
    title: "Colors — Backgrounds",
    tokens: [
      { name: "--bg-primary", value: "#050507", tailwind: "bg-bg-primary" },
      { name: "--bg-secondary", value: "#0a0a0f", tailwind: "bg-bg-secondary" },
      { name: "--bg-card", value: "#0d0d12", tailwind: "bg-bg-card" },
      { name: "--bg-card-hover", value: "#12121a", tailwind: "bg-bg-card-hover" },
    ],
  },
  {
    title: "Colors — Text",
    tokens: [
      { name: "--text-primary", value: "#f5f5f7", tailwind: "text-text-primary" },
      { name: "--text-secondary", value: "#b8b8c8", tailwind: "text-text-secondary" },
      { name: "--text-muted", value: "#5a5a6e", tailwind: "text-text-muted" },
    ],
  },
  {
    title: "Colors — Accents",
    tokens: [
      { name: "--accent", value: "#bf5af2", tailwind: "text-accent" },
      { name: "--accent-hover", value: "#d27af5", tailwind: "text-accent-hover" },
      { name: "--accent-2", value: "#ff2d55", tailwind: "text-accent-2" },
      { name: "--accent-3", value: "#5e5ce6", tailwind: "text-accent-3" },
      { name: "--accent-4", value: "#30d158", tailwind: "text-accent-4" },
      { name: "--accent-5", value: "#f9ab00", tailwind: "text-accent-5" },
    ],
  },
  {
    title: "Colors — Borders",
    tokens: [
      { name: "--border", value: "rgba(255,255,255,0.08)", tailwind: "border-border" },
      { name: "--border-hover", value: "rgba(255,255,255,0.15)", tailwind: "border-border-hover" },
    ],
  },
  {
    title: "Typography",
    tokens: [
      { name: "--font-sans", value: "Geist, system-ui, sans-serif", tailwind: "font-sans" },
      { name: "--font-display", value: "Geist, system-ui, sans-serif", tailwind: "font-display" },
      { name: "--font-mono", value: "Geist Mono, monospace", tailwind: "font-mono" },
    ],
  },
  {
    title: "Transitions",
    tokens: [
      { name: "--transition-fast", value: "150ms ease", tailwind: "—" },
      { name: "--transition-base", value: "300ms cubic-bezier(0.4, 0, 0.2, 1)", tailwind: "—" },
      { name: "--transition-slow", value: "500ms cubic-bezier(0.4, 0, 0.2, 1)", tailwind: "—" },
    ],
  },
];

export function TokensTableSection() {
  return (
    <div className="space-y-10">
      {tokenGroups.map((group) => (
        <div key={group.title}>
          <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-4">
            {group.title}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-8 font-mono font-medium text-text-muted text-xs">
                    Token
                  </th>
                  <th className="pb-2 pr-8 font-mono font-medium text-text-muted text-xs">
                    Value
                  </th>
                  <th className="pb-2 font-mono font-medium text-text-muted text-xs">
                    Tailwind
                  </th>
                </tr>
              </thead>
              <tbody>
                {group.tokens.map((token) => (
                  <tr key={token.name} className="border-b border-border/50">
                    <td className="py-2.5 pr-8 font-mono text-text-primary text-xs">
                      {token.name}
                    </td>
                    <td className="py-2.5 pr-8 font-mono text-text-secondary text-xs">
                      {token.value}
                    </td>
                    <td className="py-2.5 font-mono text-accent text-xs">
                      {token.tailwind}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Add TokensTableSection to DesignSystemContent and finalize the layout**

Replace the remaining `SECTIONS.filter` with all explicit sections. The final `DesignSystemContent.tsx` should import and render all 7 section components with no more placeholder text.

```tsx
// Final DesignSystemContent.tsx
"use client";

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

        <section id="components" className="py-16 scroll-mt-16">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.02em] mb-8">Components</h2>
          <ComponentsSection />
        </section>

        <section id="animations" className="py-16 scroll-mt-16">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.02em] mb-8">Animations</h2>
          <AnimationsSection />
        </section>

        <section id="tokens" className="py-16 scroll-mt-16">
          <h2 className="font-extrabold text-2xl sm:text-3xl tracking-[-0.02em] mb-8">Design Tokens</h2>
          <TokensTableSection />
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/design-system/TokensTableSection.tsx src/app/design-system/DesignSystemContent.tsx
git commit -m "feat(design-system): add tokens table and finalize all sections"
```

---

### Task 10: Tests

**Files:**
- Create: `src/app/design-system/__tests__/DesignSystemPage.test.tsx`

- [ ] **Step 1: Create tests for the design system page**

```tsx
// src/app/design-system/__tests__/DesignSystemPage.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DesignSystemContent } from "../DesignSystemContent";

vi.mock("framer-motion", () => ({
  motion: {
    a: ({ children, whileHover, transition, ...props }: any) => (
      <a {...props}>{children}</a>
    ),
    div: ({
      children,
      whileHover,
      whileInView,
      viewport,
      initial,
      animate,
      transition,
      ...props
    }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock("@/i18n/LanguageContext", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    locale: "en",
  }),
}));

describe("DesignSystemContent", () => {
  it("renders the page title", () => {
    render(<DesignSystemContent />);
    expect(screen.getByText("Design System")).toBeInTheDocument();
  });

  it("renders all 7 section headings", () => {
    render(<DesignSystemContent />);
    expect(screen.getByText("Colors")).toBeInTheDocument();
    expect(screen.getByText("Typography")).toBeInTheDocument();
    expect(screen.getByText("Spacing")).toBeInTheDocument();
    expect(screen.getByText("Icons")).toBeInTheDocument();
    expect(screen.getByText("Components")).toBeInTheDocument();
    expect(screen.getByText("Animations")).toBeInTheDocument();
    expect(screen.getByText("Design Tokens")).toBeInTheDocument();
  });

  it("renders color swatches", () => {
    render(<DesignSystemContent />);
    expect(screen.getByText("--accent")).toBeInTheDocument();
    expect(screen.getByText("#bf5af2")).toBeInTheDocument();
  });

  it("renders typography specimens", () => {
    render(<DesignSystemContent />);
    expect(screen.getByText("From Figma to code")).toBeInTheDocument();
  });

  it("renders icon names", () => {
    render(<DesignSystemContent />);
    expect(screen.getByText("Award")).toBeInTheDocument();
    expect(screen.getByText("ArrowRight")).toBeInTheDocument();
  });

  it("renders sidebar navigation links", () => {
    render(<DesignSystemContent />);
    const colorLinks = screen.getAllByText("Colors");
    // One in sidebar, one as section heading
    expect(colorLinks.length).toBeGreaterThanOrEqual(2);
  });
});
```

- [ ] **Step 2: Run tests**

```bash
npm test
```

Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add src/app/design-system/__tests__/DesignSystemPage.test.tsx
git commit -m "test(design-system): add page rendering tests"
```

---

### Task 11: Visual Verification

- [ ] **Step 1: Start dev server and verify**

```bash
npm run dev
```

Navigate to `http://localhost:3000/design-system` and check:

1. Page title "Design System" renders centered at top
2. **Desktop**: Sidebar fixed on left with 7 links, active section highlights on scroll
3. **Mobile**: Horizontal sticky nav at top with scrollable links
4. **Colors**: Grid of swatches by group (Backgrounds, Text, Accents, Borders)
5. **Typography**: Font specimens with Geist Sans/Mono, gradient text demo
6. **Spacing**: Proportional bars with pixel values
7. **Icons**: Grid of 12 Lucide icons with names
8. **Components**: Buttons (Neon, Solid, Ghost, Outlined), CourseCard, Card surface, Badges, Divider, Glass, Gradient border
9. **Animations**: FadeIn 4 directions with Replay, Hover scale, Card glow
10. **Tokens**: Full table with Token/Value/Tailwind columns
11. **Build passes**: `npm run build`

- [ ] **Step 2: Commit any visual adjustments**

```bash
git add -A
git commit -m "fix(design-system): visual adjustments after review"
```
