"use client";

import { colorTokens } from "@/design-system/tokens";

export function ColorSection() {
  return (
    <div className="space-y-12">
      {colorTokens.map((group) => (
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
                <p className="text-sm font-medium text-text-primary">{color.name}</p>
                <p className="text-xs font-mono text-text-muted">{color.cssVar}</p>
                <p className="text-xs font-mono text-text-muted">{color.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
