"use client";

import { spacingTokens } from "@/design-system/tokens";

const maxPx = Math.max(...spacingTokens.map((s) => s.px));

export function SpacingSection() {
  return (
    <div className="space-y-4">
      {spacingTokens.map((item) => (
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
