"use client";

import { useState, useMemo } from "react";
import { RotateCcw } from "lucide-react";
import {
  colorTokens,
  typographyTokens,
  transitionTokens,
  generateCSSVariables,
} from "@/design-system/tokens";

// ─── Types ──────────────────────────────────────────────────

type TabId = "colors" | "typography" | "spacing" | "transitions";

interface SpacingState {
  gap: number;
  padding: number;
}

// ─── Helpers ────────────────────────────────────────────────

function isHexColor(value: string): boolean {
  return /^#[0-9a-fA-F]{3,8}$/.test(value.trim());
}

function parseTransitionValue(value: string): { duration: number; easing: string } {
  const match = value.match(/^(\d+)ms\s+(.+)$/);
  if (match) {
    return { duration: parseInt(match[1], 10), easing: match[2] };
  }
  return { duration: 300, easing: "ease" };
}

function buildTransitionValue(duration: number, easing: string): string {
  return `${duration}ms ${easing}`;
}

// ─── Initial state factory ──────────────────────────────────

function getInitialCSSVars(): Record<string, string> {
  const vars = generateCSSVariables();
  for (const token of typographyTokens) {
    vars[token.cssVar] = token.value;
  }
  return vars;
}

const INITIAL_SPACING: SpacingState = { gap: 16, padding: 24 };
const INITIAL_FONT_SIZE = 16;

const TABS: { id: TabId; label: string }[] = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "transitions", label: "Transitions" },
];

const FONT_OPTIONS = [
  "Geist, system-ui, sans-serif",
  "Geist Mono, monospace",
  "Georgia, serif",
  "system-ui, sans-serif",
];

const FONT_LABELS: Record<string, string> = {
  "Geist, system-ui, sans-serif": "Geist Sans",
  "Geist Mono, monospace": "Geist Mono",
  "Georgia, serif": "Serif",
  "system-ui, sans-serif": "System UI",
};

const EASING_OPTIONS = [
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "linear",
  "cubic-bezier(0.4, 0, 0.2, 1)",
  "cubic-bezier(0.4, 0, 1, 1)",
  "cubic-bezier(0, 0, 0.2, 1)",
];

// ─── ColorsTab ──────────────────────────────────────────────

function ColorsTab({
  cssVars,
  onChange,
}: {
  cssVars: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-6">
      {colorTokens.map((group) => (
        <div key={group.title}>
          <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">
            {group.title}
          </h4>
          <div className="space-y-2">
            {group.colors.map((color) => {
              const currentValue = cssVars[color.cssVar] ?? color.value;
              const hex = isHexColor(currentValue);
              return (
                <div key={color.cssVar} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded border border-border shrink-0"
                    style={{ backgroundColor: currentValue }}
                  />
                  {hex ? (
                    <input
                      type="color"
                      value={currentValue}
                      onChange={(e) => onChange(color.cssVar, e.target.value)}
                      aria-label={`${color.name} color`}
                      className="w-8 h-8 p-0 border-0 bg-transparent cursor-pointer shrink-0"
                    />
                  ) : (
                    <input
                      type="text"
                      value={currentValue}
                      onChange={(e) => onChange(color.cssVar, e.target.value)}
                      aria-label={`${color.name} color value`}
                      className="flex-1 min-w-0 bg-bg-secondary border border-border rounded px-2 py-1 text-xs font-mono text-text-primary focus:outline-none focus:border-accent"
                    />
                  )}
                  <span className="text-xs font-mono text-text-muted truncate">
                    {color.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TypographyTab ──────────────────────────────────────────

function TypographyTab({
  cssVars,
  fontSize,
  onFontChange,
  onFontSizeChange,
}: {
  cssVars: Record<string, string>;
  fontSize: number;
  onFontChange: (key: string, value: string) => void;
  onFontSizeChange: (size: number) => void;
}) {
  return (
    <div className="space-y-6">
      {typographyTokens.map((token) => {
        const currentValue = cssVars[token.cssVar] ?? token.value;
        return (
          <div key={token.cssVar}>
            <label htmlFor={`font-${token.cssVar}`} className="text-xs font-mono text-text-muted uppercase tracking-wider block mb-2">
              {token.name}
            </label>
            <select
              id={`font-${token.cssVar}`}
              value={currentValue}
              onChange={(e) => onFontChange(token.cssVar, e.target.value)}
              className="w-full bg-bg-secondary border border-border rounded px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent"
            >
              {FONT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {FONT_LABELS[opt]}
                </option>
              ))}
            </select>
          </div>
        );
      })}
      <div>
        <label htmlFor="playground-font-size" className="text-xs font-mono text-text-muted uppercase tracking-wider block mb-2">
          Font Size: {fontSize}px
        </label>
        <input
          id="playground-font-size"
          type="range"
          min={12}
          max={24}
          value={fontSize}
          onChange={(e) => onFontSizeChange(parseInt(e.target.value, 10))}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs font-mono text-text-muted mt-1">
          <span>12px</span>
          <span>24px</span>
        </div>
      </div>
    </div>
  );
}

// ─── SpacingTab ─────────────────────────────────────────────

function SpacingTab({
  spacing,
  onChange,
}: {
  spacing: SpacingState;
  onChange: (key: keyof SpacingState, value: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="playground-gap" className="text-xs font-mono text-text-muted uppercase tracking-wider block mb-2">
          Gap: {spacing.gap}px
        </label>
        <input
          id="playground-gap"
          type="range"
          min={0}
          max={64}
          value={spacing.gap}
          onChange={(e) => onChange("gap", parseInt(e.target.value, 10))}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs font-mono text-text-muted mt-1">
          <span>0px</span>
          <span>64px</span>
        </div>
      </div>
      <div>
        <label htmlFor="playground-padding" className="text-xs font-mono text-text-muted uppercase tracking-wider block mb-2">
          Padding: {spacing.padding}px
        </label>
        <input
          id="playground-padding"
          type="range"
          min={0}
          max={64}
          value={spacing.padding}
          onChange={(e) => onChange("padding", parseInt(e.target.value, 10))}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs font-mono text-text-muted mt-1">
          <span>0px</span>
          <span>64px</span>
        </div>
      </div>
    </div>
  );
}

// ─── TransitionsTab ─────────────────────────────────────────

function TransitionsTab({
  cssVars,
  onChange,
}: {
  cssVars: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-6">
      {transitionTokens.map((token) => {
        const currentValue = cssVars[token.cssVar] ?? token.value;
        const { duration, easing } = parseTransitionValue(currentValue);
        return (
          <div key={token.cssVar} className="space-y-3">
            <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider">
              {token.name}
            </h4>
            <div>
              <label htmlFor={`duration-${token.cssVar}`} className="text-xs text-text-secondary block mb-1">
                Duration: {duration}ms
              </label>
              <input
                id={`duration-${token.cssVar}`}
                type="range"
                min={0}
                max={1000}
                step={50}
                value={duration}
                onChange={(e) =>
                  onChange(
                    token.cssVar,
                    buildTransitionValue(parseInt(e.target.value, 10), easing)
                  )
                }
                className="w-full accent-accent"
              />
              <div className="flex justify-between text-xs font-mono text-text-muted mt-1">
                <span>0ms</span>
                <span>1000ms</span>
              </div>
            </div>
            <div>
              <label htmlFor={`easing-${token.cssVar}`} className="text-xs text-text-secondary block mb-1">
                Easing
              </label>
              <select
                id={`easing-${token.cssVar}`}
                value={easing}
                onChange={(e) =>
                  onChange(
                    token.cssVar,
                    buildTransitionValue(duration, e.target.value)
                  )
                }
                className="w-full bg-bg-secondary border border-border rounded px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent"
              >
                {EASING_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── PreviewCard ────────────────────────────────────────────

const ACCENT_BADGES = [
  { label: "Purple", var: "--accent", bg: "rgba(191, 90, 242, 0.1)" },
  { label: "Pink", var: "--accent-2", bg: "rgba(255, 45, 85, 0.1)" },
  { label: "Indigo", var: "--accent-3", bg: "rgba(94, 92, 230, 0.1)" },
  { label: "Green", var: "--accent-4", bg: "rgba(48, 209, 88, 0.1)" },
  { label: "Yellow", var: "--accent-5", bg: "rgba(249, 171, 0, 0.1)" },
];

function PreviewCard({
  cssVars,
  spacing,
  fontSize,
}: {
  cssVars: Record<string, string>;
  spacing: SpacingState;
  fontSize: number;
}) {
  const style = useMemo(() => {
    const s: Record<string, string | number> = {};
    for (const [key, value] of Object.entries(cssVars)) {
      s[key] = value;
    }
    s.fontSize = `${fontSize}px`;
    s.padding = `${spacing.padding}px`;
    return s;
  }, [cssVars, spacing.padding, fontSize]);

  return (
    <div style={style} className="rounded-xl border border-border bg-bg-card overflow-hidden">
      <div className="flex flex-col" style={{ gap: `${spacing.gap}px` }}>
        <span className="text-xs font-mono text-text-muted tracking-[0.15em] uppercase">
          DESIGN SYSTEM
        </span>

        <h2
          className="text-2xl font-semibold text-text-primary"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Preview Card
        </h2>

        <p className="text-text-secondary leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
          This card previews your token changes in real time. Adjust colors,
          typography, spacing, and transitions using the controls.
        </p>

        {/* Section divider */}
        <div className="w-full h-px bg-border" />

        {/* Accent badges */}
        <div className="flex flex-wrap" style={{ gap: `${spacing.gap}px` }}>
          {ACCENT_BADGES.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              style={{
                color: `var(${badge.var})`,
                backgroundColor: badge.bg,
              }}
            >
              {badge.label}
            </span>
          ))}
        </div>

        {/* Button styled like NeonButton */}
        <button
          type="button"
          className="self-start px-5 py-2.5 rounded-lg font-medium text-sm transition-all"
          style={{
            backgroundColor: "var(--accent)",
            color: "#fff",
            boxShadow: "0 0 20px rgba(191, 90, 242, 0.3)",
            transition: "var(--transition-base)",
          }}
        >
          Neon Button
        </button>

        {/* Nested card with bg-secondary */}
        <div
          className="rounded-lg border border-border p-4"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <p
            className="text-sm text-text-secondary"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Nested card with <span className="text-text-muted font-mono">bg-secondary</span> background.
            Transitions and spacing are applied from the playground controls.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── PlaygroundSection (exported) ───────────────────────────

export function PlaygroundSection() {
  const [cssVars, setCssVars] = useState<Record<string, string>>(getInitialCSSVars);
  const [spacing, setSpacing] = useState<SpacingState>(INITIAL_SPACING);
  const [fontSize, setFontSize] = useState(INITIAL_FONT_SIZE);
  const [activeTab, setActiveTab] = useState<TabId>("colors");

  const handleCssVarChange = (key: string, value: string) => {
    setCssVars((prev) => ({ ...prev, [key]: value }));
  };

  const handleSpacingChange = (key: keyof SpacingState, value: number) => {
    setSpacing((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setCssVars(getInitialCSSVars());
    setSpacing(INITIAL_SPACING);
    setFontSize(INITIAL_FONT_SIZE);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Controls panel */}
        <div className="w-full lg:w-80 shrink-0 space-y-4">
          {/* Tabs + Reset */}
          <div className="flex items-center gap-2 flex-wrap" role="tablist" aria-label="Playground controls">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  activeTab === tab.id
                    ? "text-accent bg-accent/10"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              type="button"
              onClick={handleReset}
              className="ml-auto p-1.5 rounded-md text-text-muted hover:text-text-secondary transition-colors"
              aria-label="Reset to defaults"
              title="Reset to defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Tab content */}
          <div role="tabpanel" aria-label={`${activeTab} controls`} className="bg-bg-card border border-border rounded-lg p-4 max-h-[600px] overflow-y-auto">
            {activeTab === "colors" && (
              <ColorsTab cssVars={cssVars} onChange={handleCssVarChange} />
            )}
            {activeTab === "typography" && (
              <TypographyTab
                cssVars={cssVars}
                fontSize={fontSize}
                onFontChange={handleCssVarChange}
                onFontSizeChange={setFontSize}
              />
            )}
            {activeTab === "spacing" && (
              <SpacingTab spacing={spacing} onChange={handleSpacingChange} />
            )}
            {activeTab === "transitions" && (
              <TransitionsTab cssVars={cssVars} onChange={handleCssVarChange} />
            )}
          </div>
        </div>

        {/* Preview panel */}
        <div className="flex-1 lg:sticky lg:top-6 lg:self-start">
          <PreviewCard cssVars={cssVars} spacing={spacing} fontSize={fontSize} />
        </div>
      </div>
    </div>
  );
}
