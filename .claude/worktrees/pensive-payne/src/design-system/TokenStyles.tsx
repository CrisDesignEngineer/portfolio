import { generateCSSVariables } from "./tokens";

/**
 * Injects design tokens as CSS custom properties into the document.
 * Renders a <style> tag in <head> that overrides/defines :root variables.
 * This ensures tokens.ts is the single source of truth.
 */
export function TokenStyles() {
  const vars = generateCSSVariables();
  const css = `:root {\n${Object.entries(vars)
    .map(([key, val]) => `  ${key}: ${val};`)
    .join("\n")}\n}`;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
