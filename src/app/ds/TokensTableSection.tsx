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
                  <th className="pb-2 pr-8 font-mono font-medium text-text-muted text-xs">Token</th>
                  <th className="pb-2 pr-8 font-mono font-medium text-text-muted text-xs">Value</th>
                  <th className="pb-2 font-mono font-medium text-text-muted text-xs">Tailwind</th>
                </tr>
              </thead>
              <tbody>
                {group.tokens.map((token) => (
                  <tr key={token.name} className="border-b border-border/50">
                    <td className="py-2.5 pr-8 font-mono text-text-primary text-xs">{token.name}</td>
                    <td className="py-2.5 pr-8 font-mono text-text-secondary text-xs">{token.value}</td>
                    <td className="py-2.5 font-mono text-accent text-xs">{token.tailwind}</td>
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
