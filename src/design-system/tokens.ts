/**
 * Design System Tokens — Single Source of Truth
 *
 * Color tokens are the single source of truth for the site palette.
 * TokenStyles injects them at :root; components consume them via CSS vars / Tailwind.
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

// ─── CSS Generation ─────────────────────────────────────────

/** Color custom properties injected at :root by TokenStyles. */
export function generateCSSVariables(): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const group of colorTokens) {
    for (const color of group.colors) {
      vars[color.cssVar] = color.value;
    }
  }
  return vars;
}
