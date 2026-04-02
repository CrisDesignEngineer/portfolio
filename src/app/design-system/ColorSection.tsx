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
