# Playground Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an interactive Playground section to `/ds` where users edit design tokens in real time and see changes in a live preview card.

**Architecture:** CSS Variables Override approach — controls update a `Record<string, string>` state, which is applied as inline `style` on a wrapper `<div>`. The preview card inside inherits overridden CSS vars through normal Tailwind classes. No persistence, no external deps.

**Tech Stack:** React useState, HTML native inputs (color, range, select, text), Tailwind CSS, tokens from `src/design-system/tokens.ts`

---

### Task 1: Create PlaygroundSection with state and tab navigation

**Files:**
- Create: `src/app/ds/PlaygroundSection.tsx`

- [ ] **Step 1: Create the file with state initialization and tab UI**

```tsx
// src/app/ds/PlaygroundSection.tsx
"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import {
  colorTokens,
  typographyTokens,
  spacingTokens,
  transitionTokens,
  generateCSSVariables,
} from "@/design-system/tokens";

type Tab = "colors" | "typography" | "spacing" | "transitions";

const TABS: { id: Tab; label: string }[] = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "transitions", label: "Transitions" },
];

function getDefaultCSSVars(): Record<string, string> {
  const vars = generateCSSVariables();
  for (const t of typographyTokens) {
    vars[t.cssVar] = t.value;
  }
  return vars;
}

const DEFAULT_SPACING = { gap: 16, padding: 24 };
const DEFAULT_FONT_SIZE = 16;

export function PlaygroundSection() {
  const [activeTab, setActiveTab] = useState<Tab>("colors");
  const [cssVars, setCssVars] = useState<Record<string, string>>(getDefaultCSSVars);
  const [spacing, setSpacing] = useState(DEFAULT_SPACING);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

  const updateVar = (key: string, value: string) => {
    setCssVars((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setCssVars(getDefaultCSSVars());
    setSpacing(DEFAULT_SPACING);
    setFontSize(DEFAULT_FONT_SIZE);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Controls panel */}
      <div className="lg:w-[320px] shrink-0">
        {/* Reset button */}
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 text-sm font-mono text-text-muted hover:text-text-secondary transition-colors mb-4"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs font-mono whitespace-nowrap px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "text-accent bg-accent/10 font-medium"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="space-y-4 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto pr-2">
          {activeTab === "colors" && (
            <ColorsTab cssVars={cssVars} onUpdate={updateVar} />
          )}
          {activeTab === "typography" && (
            <TypographyTab cssVars={cssVars} onUpdate={updateVar} fontSize={fontSize} onFontSizeChange={setFontSize} />
          )}
          {activeTab === "spacing" && (
            <SpacingTab spacing={spacing} onUpdate={setSpacing} />
          )}
          {activeTab === "transitions" && (
            <TransitionsTab cssVars={cssVars} onUpdate={updateVar} />
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 min-w-0 lg:sticky lg:top-8 lg:self-start">
        <PreviewCard cssVars={cssVars} spacing={spacing} fontSize={fontSize} />
      </div>
    </div>
  );
}
```

Note: `ColorsTab`, `TypographyTab`, `SpacingTab`, `TransitionsTab`, and `PreviewCard` will be added in subsequent tasks. For now this file will not compile — that's expected; tasks 2-4 complete it.

- [ ] **Step 2: Commit scaffold**

```bash
git add src/app/ds/PlaygroundSection.tsx
git commit -m "feat(playground): scaffold PlaygroundSection with state and tabs"
```

---

### Task 2: Implement control tabs (Colors, Typography, Spacing, Transitions)

**Files:**
- Modify: `src/app/ds/PlaygroundSection.tsx`

- [ ] **Step 1: Add ColorsTab component**

Add this above the `PlaygroundSection` export in the same file:

```tsx
function ColorsTab({
  cssVars,
  onUpdate,
}: {
  cssVars: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-6">
      {colorTokens.map((group) => (
        <div key={group.title}>
          <p className="text-xs font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-3">
            {group.title}
          </p>
          <div className="space-y-3">
            {group.colors.map((color) => {
              const isRgba = color.value.startsWith("rgba");
              return (
                <div key={color.cssVar} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded border border-border shrink-0"
                    style={{ backgroundColor: cssVars[color.cssVar] || color.value }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-muted truncate">{color.cssVar}</p>
                    {isRgba ? (
                      <input
                        type="text"
                        value={cssVars[color.cssVar] || color.value}
                        onChange={(e) => onUpdate(color.cssVar, e.target.value)}
                        className="w-full mt-1 text-xs font-mono bg-bg-card border border-border rounded px-2 py-1 text-text-primary focus:border-accent focus:outline-none"
                      />
                    ) : (
                      <input
                        type="color"
                        value={cssVars[color.cssVar] || color.value}
                        onChange={(e) => onUpdate(color.cssVar, e.target.value)}
                        className="mt-1 w-full h-7 cursor-pointer bg-transparent border-0 p-0"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Add TypographyTab component**

```tsx
const FONT_OPTIONS = [
  { label: "Geist Sans", value: "Geist, system-ui, sans-serif" },
  { label: "Geist Mono", value: "Geist Mono, monospace" },
  { label: "Serif", value: "Georgia, Times, serif" },
  { label: "System UI", value: "system-ui, sans-serif" },
];

function TypographyTab({
  cssVars,
  onUpdate,
  fontSize,
  onFontSizeChange,
}: {
  cssVars: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}) {
  return (
    <div className="space-y-6">
      {typographyTokens.map((token) => (
        <div key={token.cssVar}>
          <p className="text-xs text-text-muted mb-2">{token.cssVar}</p>
          <select
            value={cssVars[token.cssVar] || token.value}
            onChange={(e) => onUpdate(token.cssVar, e.target.value)}
            className="w-full text-xs font-mono bg-bg-card border border-border rounded px-2 py-2 text-text-primary focus:border-accent focus:outline-none"
          >
            {FONT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div>
        <p className="text-xs text-text-muted mb-2">Body font size</p>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={12}
            max={24}
            value={fontSize}
            onChange={(e) => onFontSizeChange(Number(e.target.value))}
            className="flex-1 accent-[var(--accent)]"
          />
          <span className="text-xs font-mono text-text-secondary w-10 text-right">{fontSize}px</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add SpacingTab component**

```tsx
function SpacingTab({
  spacing,
  onUpdate,
}: {
  spacing: { gap: number; padding: number };
  onUpdate: (s: { gap: number; padding: number }) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-text-muted mb-2">Card gap</p>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={64}
            value={spacing.gap}
            onChange={(e) => onUpdate({ ...spacing, gap: Number(e.target.value) })}
            className="flex-1 accent-[var(--accent)]"
          />
          <span className="text-xs font-mono text-text-secondary w-10 text-right">{spacing.gap}px</span>
        </div>
      </div>
      <div>
        <p className="text-xs text-text-muted mb-2">Card padding</p>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={64}
            value={spacing.padding}
            onChange={(e) => onUpdate({ ...spacing, padding: Number(e.target.value) })}
            className="flex-1 accent-[var(--accent)]"
          />
          <span className="text-xs font-mono text-text-secondary w-10 text-right">{spacing.padding}px</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Add TransitionsTab component**

```tsx
const EASING_OPTIONS = [
  { label: "ease", value: "ease" },
  { label: "linear", value: "linear" },
  { label: "ease-in", value: "ease-in" },
  { label: "ease-out", value: "ease-out" },
  { label: "cubic-bezier (default)", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
];

function TransitionsTab({
  cssVars,
  onUpdate,
}: {
  cssVars: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
}) {
  const parseTransition = (val: string) => {
    const match = val.match(/^(\d+)ms\s+(.+)$/);
    return match ? { duration: Number(match[1]), easing: match[2] } : { duration: 300, easing: "ease" };
  };

  return (
    <div className="space-y-6">
      {transitionTokens.map((token) => {
        const current = cssVars[token.cssVar] || token.value;
        const { duration, easing } = parseTransition(current);

        const updateTransition = (d: number, e: string) => {
          onUpdate(token.cssVar, `${d}ms ${e}`);
        };

        return (
          <div key={token.cssVar}>
            <p className="text-xs text-text-muted mb-2">{token.cssVar}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={50}
                  value={duration}
                  onChange={(e) => updateTransition(Number(e.target.value), easing)}
                  className="flex-1 accent-[var(--accent)]"
                />
                <span className="text-xs font-mono text-text-secondary w-14 text-right">{duration}ms</span>
              </div>
              <select
                value={easing}
                onChange={(e) => updateTransition(duration, e.target.value)}
                className="w-full text-xs font-mono bg-bg-card border border-border rounded px-2 py-1.5 text-text-primary focus:border-accent focus:outline-none"
              >
                {EASING_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[10px] font-mono text-text-muted mt-1">{cssVars[token.cssVar] || token.value}</p>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 5: Commit control tabs**

```bash
git add src/app/ds/PlaygroundSection.tsx
git commit -m "feat(playground): add color, typography, spacing, transition controls"
```

---

### Task 3: Implement the PreviewCard component

**Files:**
- Modify: `src/app/ds/PlaygroundSection.tsx`

- [ ] **Step 1: Add PreviewCard component**

Add above the `PlaygroundSection` export:

```tsx
function PreviewCard({
  cssVars,
  spacing,
  fontSize,
}: {
  cssVars: Record<string, string>;
  spacing: { gap: number; padding: number };
  fontSize: number;
}) {
  const wrapperStyle: Record<string, string> = {};
  for (const [key, val] of Object.entries(cssVars)) {
    wrapperStyle[key] = val;
  }

  return (
    <div style={wrapperStyle as React.CSSProperties}>
      <p className="text-xs font-mono text-text-muted mb-3">Live Preview</p>
      <div
        className="rounded-2xl border border-border bg-bg-card hover:border-border-hover transition-all"
        style={{
          padding: `${spacing.padding}px`,
          transitionDuration: cssVars["--transition-base"]?.match(/^(\d+)ms/)?.[1] + "ms" || "300ms",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: `${spacing.gap}px` }}>
          {/* Mono label */}
          <p className="font-mono text-[11px] font-medium text-text-muted uppercase tracking-[0.15em]">
            DESIGN SYSTEM
          </p>

          {/* Heading */}
          <h3 className="font-display font-extrabold text-2xl text-text-primary tracking-[-0.02em]">
            Preview Card
          </h3>

          {/* Body */}
          <p className="font-sans text-text-secondary leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
            This card uses every token in your design system. Edit the controls on the left and watch it update in real time.
          </p>

          {/* Divider */}
          <div className="section-divider" />

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent">Purple</span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-2/10 text-accent-2">Pink</span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-3/10 text-accent-3">Indigo</span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-4/10 text-accent-4">Green</span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-5/10 text-accent-5">Yellow</span>
          </div>

          {/* Button */}
          <div>
            <button
              type="button"
              className="px-6 py-2.5 text-sm font-medium rounded-full border border-accent text-accent hover:bg-accent hover:text-bg-primary transition-all"
              style={{
                transitionDuration: cssVars["--transition-base"]?.match(/^(\d+)ms/)?.[1] + "ms" || "300ms",
              }}
            >
              Neon Button
            </button>
          </div>

          {/* Card surface */}
          <div className="rounded-xl border border-border bg-bg-secondary p-4 hover:border-border-hover transition-colors">
            <p className="text-sm font-bold text-text-primary mb-1">Nested Card</p>
            <p className="text-xs text-text-muted">bg-secondary with border tokens.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the file compiles (no import errors)**

```bash
cd C:\Users\desig\portfolio\.claude\worktrees\inspiring-montalcini && npx tsc --noEmit src/app/ds/PlaygroundSection.tsx 2>&1 || echo "Check errors above"
```

- [ ] **Step 3: Commit preview card**

```bash
git add src/app/ds/PlaygroundSection.tsx
git commit -m "feat(playground): add PreviewCard with full token coverage"
```

---

### Task 4: Wire PlaygroundSection into DesignSystemContent

**Files:**
- Modify: `src/app/ds/DesignSystemContent.tsx`

- [ ] **Step 1: Add import and register the section**

In `src/app/ds/DesignSystemContent.tsx`, add the import:

```tsx
import { PlaygroundSection } from "./PlaygroundSection";
```

Add to `SECTIONS` array (last item before `] as const`):

```tsx
  { id: "playground", label: "Playground" },
```

Add to `SECTION_COMPONENTS`:

```tsx
  playground: PlaygroundSection,
```

Add to `SECTION_TITLES`:

```tsx
  playground: "Playground",
```

- [ ] **Step 2: Build to verify**

```bash
cd C:\Users\desig\portfolio\.claude\worktrees\inspiring-montalcini && npm run build 2>&1 | tail -20
```

Expected: Build succeeds, `/ds` route listed.

- [ ] **Step 3: Commit wiring**

```bash
git add src/app/ds/DesignSystemContent.tsx
git commit -m "feat(playground): wire section into /ds page navigation"
```

---

### Task 5: Add tests for PlaygroundSection

**Files:**
- Modify: `src/app/ds/__tests__/DesignSystemPage.test.tsx`

- [ ] **Step 1: Add Playground test cases to the existing test file**

Add these tests inside the existing `describe("DesignSystemContent", ...)` block:

```tsx
  it("switches to Playground section on click", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Playground" })[0]);
    expect(screen.getByRole("heading", { level: 2, name: "Playground" })).toBeInTheDocument();
    expect(screen.getByText("Preview Card")).toBeInTheDocument();
  });

  it("renders playground control tabs", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Playground" })[0]);
    expect(screen.getByText("Colors")).toBeInTheDocument();
    expect(screen.getByText("Typography")).toBeInTheDocument();
    expect(screen.getByText("Spacing")).toBeInTheDocument();
    expect(screen.getByText("Transitions")).toBeInTheDocument();
  });

  it("renders playground reset button", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Playground" })[0]);
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("renders playground badges in preview", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Playground" })[0]);
    expect(screen.getByText("Purple")).toBeInTheDocument();
    expect(screen.getByText("Pink")).toBeInTheDocument();
    expect(screen.getByText("Indigo")).toBeInTheDocument();
    expect(screen.getByText("Green")).toBeInTheDocument();
    expect(screen.getByText("Yellow")).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run tests**

```bash
cd C:\Users\desig\portfolio\.claude\worktrees\inspiring-montalcini && npx vitest run 2>&1 | tail -15
```

Expected: All tests pass (previous 16 + 4 new = 20).

- [ ] **Step 3: Commit tests**

```bash
git add src/app/ds/__tests__/DesignSystemPage.test.tsx
git commit -m "test(playground): add rendering and interaction tests"
```

---

### Task 6: Visual verification and final build

**Files:** None (verification only)

- [ ] **Step 1: Run full test suite**

```bash
cd C:\Users\desig\portfolio\.claude\worktrees\inspiring-montalcini && npx vitest run
```

Expected: 20/20 pass.

- [ ] **Step 2: Run production build**

```bash
cd C:\Users\desig\portfolio\.claude\worktrees\inspiring-montalcini && npm run build 2>&1 | tail -15
```

Expected: Build succeeds with `/ds` route.

- [ ] **Step 3: Start dev server and verify visually**

Navigate to `http://localhost:3000/ds`, click "Playground" in sidebar:
- Verify 4 control tabs render (Colors, Typography, Spacing, Transitions)
- Verify preview card shows heading, body, badges, button, nested card
- Verify changing a color updates the preview in real time
- Verify Reset button restores original values
- Verify responsive layout (controls top, preview bottom on mobile)

- [ ] **Step 4: Push and update PR**

```bash
git push
```
