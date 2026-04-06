"use client";

import {
  Award,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Link2,
  Phone,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Lock,
  type LucideIcon,
} from "lucide-react";

interface IconItem {
  icon: LucideIcon;
  name: string;
}

const icons: IconItem[] = [
  { icon: Award, name: "Award" },
  { icon: ArrowRight, name: "ArrowRight" },
  { icon: ArrowUpRight, name: "ArrowUpRight" },
  { icon: Mail, name: "Mail" },
  { icon: Link2, name: "Link2" },
  { icon: Phone, name: "Phone" },
  { icon: Menu, name: "Menu" },
  { icon: X, name: "X" },
  { icon: ChevronLeft, name: "ChevronLeft" },
  { icon: ChevronRight, name: "ChevronRight" },
  { icon: ExternalLink, name: "ExternalLink" },
  { icon: Lock, name: "Lock" },
];

export function IconsSection() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
      {icons.map(({ icon: Icon, name }) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-border-hover transition-colors"
        >
          <Icon className="w-6 h-6 text-text-primary" />
          <span className="text-xs font-mono text-text-muted">{name}</span>
        </div>
      ))}
    </div>
  );
}
