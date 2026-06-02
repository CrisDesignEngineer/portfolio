/**
 * Design System Tokens — Single Source of Truth
 *
 * All design tokens are defined here and consumed by:
 * 1. globals.css (via generated CSS custom properties)
 * 2. /ds showcase page (for visual display)
 * 3. Components across the portfolio (via CSS vars / Tailwind)
 *
 * To change a token: update the value here → it propagates everywhere.
 */

// ─── Color Tokens ───────────────────────────────────────────

export interface ColorToken {
  name: string;
  cssVar: string;
  value: string;
  tailwind: string;
}

export interface ColorGroup {
  title: string;
  colors: ColorToken[];
}

export const colorTokens: ColorGroup[] = [
  {
    title: "Backgrounds",
    colors: [
      { name: "Primary", cssVar: "--bg-primary", value: "oklch(0.155 0.006 250)", tailwind: "bg-bg-primary" },
      { name: "Secondary", cssVar: "--bg-secondary", value: "oklch(0.185 0.007 250)", tailwind: "bg-bg-secondary" },
      { name: "Card", cssVar: "--bg-card", value: "oklch(0.205 0.008 250)", tailwind: "bg-bg-card" },
      { name: "Card Hover", cssVar: "--bg-card-hover", value: "oklch(0.245 0.009 250)", tailwind: "bg-bg-card-hover" },
    ],
  },
  {
    title: "Text",
    colors: [
      { name: "Primary", cssVar: "--text-primary", value: "oklch(0.965 0.004 250)", tailwind: "text-text-primary" },
      { name: "Secondary", cssVar: "--text-secondary", value: "oklch(0.74 0.008 250)", tailwind: "text-text-secondary" },
      { name: "Muted", cssVar: "--text-muted", value: "oklch(0.58 0.008 250)", tailwind: "text-text-muted" },
    ],
  },
  {
    title: "Accents",
    colors: [
      { name: "Violet", cssVar: "--accent", value: "oklch(0.71 0.16 300)", tailwind: "text-accent" },
      { name: "Violet Hover", cssVar: "--accent-hover", value: "oklch(0.77 0.15 300)", tailwind: "text-accent-hover" },
      { name: "Accent Muted", cssVar: "--accent-muted", value: "oklch(0.71 0.16 300 / 0.1)", tailwind: "text-accent-muted" },
      { name: "Magenta", cssVar: "--accent-2", value: "oklch(0.66 0.21 348)", tailwind: "text-accent-2" },
      { name: "Cyan", cssVar: "--accent-3", value: "oklch(0.78 0.115 220)", tailwind: "text-accent-3" },
      { name: "Green", cssVar: "--accent-4", value: "oklch(0.80 0.16 150)", tailwind: "text-accent-4" },
      { name: "Orange", cssVar: "--accent-5", value: "oklch(0.80 0.13 64)", tailwind: "text-accent-5" },
    ],
  },
  {
    title: "Borders",
    colors: [
      { name: "Default", cssVar: "--border", value: "oklch(0.31 0.010 250)", tailwind: "border-border" },
      { name: "Hover", cssVar: "--border-hover", value: "oklch(0.37 0.012 250)", tailwind: "border-border-hover" },
    ],
  },
];

// ─── Typography Tokens ──────────────────────────────────────

export interface TypographyToken {
  name: string;
  cssVar: string;
  value: string;
  tailwind: string;
}

export const typographyTokens: TypographyToken[] = [
  { name: "Sans", cssVar: "--font-sans", value: "Hanken Grotesk, system-ui, sans-serif", tailwind: "font-sans" },
  { name: "Display", cssVar: "--font-display", value: "Sora, system-ui, sans-serif", tailwind: "font-display" },
  { name: "Mono", cssVar: "--font-mono", value: "JetBrains Mono, monospace", tailwind: "font-mono" },
];

// ─── Transition Tokens ──────────────────────────────────────

export interface TransitionToken {
  name: string;
  cssVar: string;
  value: string;
}

export const transitionTokens: TransitionToken[] = [
  { name: "Fast", cssVar: "--transition-fast", value: "150ms ease" },
  { name: "Base", cssVar: "--transition-base", value: "300ms cubic-bezier(0.4, 0, 0.2, 1)" },
  { name: "Slow", cssVar: "--transition-slow", value: "500ms cubic-bezier(0.4, 0, 0.2, 1)" },
];

// ─── Spacing Tokens ─────────────────────────────────────────

export interface SpacingToken {
  className: string;
  px: number;
  label: string;
}

export const spacingTokens: SpacingToken[] = [
  { className: "gap-2", px: 8, label: "gap-2 / 8px" },
  { className: "gap-3", px: 12, label: "gap-3 / 12px" },
  { className: "gap-4", px: 16, label: "gap-4 / 16px" },
  { className: "gap-6", px: 24, label: "gap-6 / 24px" },
  { className: "gap-8", px: 32, label: "gap-8 / 32px" },
  { className: "mb-3", px: 12, label: "mb-3 / 12px" },
  { className: "mb-6", px: 24, label: "mb-6 / 24px" },
  { className: "mb-10", px: 40, label: "mb-10 / 40px" },
  { className: "mb-14", px: 56, label: "mb-14 / 56px" },
  { className: "px-6", px: 24, label: "px-6 / 24px" },
  { className: "px-10", px: 40, label: "px-10 / 40px" },
  { className: "py-14", px: 56, label: "py-14 / 56px" },
  { className: "py-16", px: 64, label: "py-16 / 64px" },
];

// ─── CSS Generation ─────────────────────────────────────────

/**
 * Generates the CSS custom properties string for :root injection.
 * Used by globals.css (static) and can be used dynamically if needed.
 */
export function generateCSSVariables(): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const group of colorTokens) {
    for (const color of group.colors) {
      vars[color.cssVar] = color.value;
    }
  }

  for (const token of transitionTokens) {
    vars[token.cssVar] = token.value;
  }

  return vars;
}
