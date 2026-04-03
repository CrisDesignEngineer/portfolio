"use client";

import { colorTokens, typographyTokens, transitionTokens } from "@/design-system/tokens";

interface TableToken {
  name: string;
  value: string;
  tailwind: string;
}

interface TableGroup {
  title: string;
  tokens: TableToken[];
}

function buildTokenGroups(): TableGroup[] {
  const groups: TableGroup[] = [];

  for (const group of colorTokens) {
    groups.push({
      title: `Colors — ${group.title}`,
      tokens: group.colors.map((c) => ({
        name: c.cssVar,
        value: c.value,
        tailwind: c.tailwind,
      })),
    });
  }

  groups.push({
    title: "Typography",
    tokens: typographyTokens.map((t) => ({
      name: t.cssVar,
      value: t.value,
      tailwind: t.tailwind,
    })),
  });

  groups.push({
    title: "Transitions",
    tokens: transitionTokens.map((t) => ({
      name: t.cssVar,
      value: t.value,
      tailwind: "—",
    })),
  });

  return groups;
}

const tokenGroups = buildTokenGroups();

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
