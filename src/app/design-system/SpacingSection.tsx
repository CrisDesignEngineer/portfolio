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
