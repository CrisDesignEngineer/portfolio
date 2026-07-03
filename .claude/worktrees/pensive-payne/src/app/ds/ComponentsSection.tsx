"use client";

import { ArrowRight, Mail } from "lucide-react";
import { NeonButton } from "@/components/ui/neon-button";
import { CourseCard } from "@/components/CourseCard";
import { CaseCard } from "@/components/CaseCard";
import { courses } from "@/data/courses";
import { cases } from "@/data/cases";

export function ComponentsSection() {
  const demoCourse = courses.en[0];
  const demoCase = cases.en[1]; // Vivara (non-confidential)

  return (
    <div className="space-y-16">
      {/* Buttons */}
      <div>
        <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-6">
          Buttons
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <NeonButton>Neon Default</NeonButton>
          <NeonButton variant="solid">Solid</NeonButton>
          <NeonButton variant="ghost">Ghost</NeonButton>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-text-primary rounded-full border border-border transition-all duration-300 hover:border-border-hover hover:bg-bg-card-hover"
          >
            Outlined
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div>
        <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-6">
          Cards
        </h3>
        <div className="space-y-6">
          <div>
            <p className="text-xs font-mono text-text-muted mb-3">CaseCard</p>
            <div className="max-w-2xl">
              <CaseCard caseStudy={demoCase} index={0} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            <div>
              <p className="text-xs font-mono text-text-muted mb-3">CourseCard</p>
              <CourseCard course={demoCourse} />
            </div>
            <div>
              <p className="text-xs font-mono text-text-muted mb-3">Card Surface</p>
              <div className="rounded-xl border border-border bg-bg-card p-6 hover:border-border-hover hover:bg-bg-card-hover transition-colors duration-300">
                <p className="font-bold text-text-primary mb-1">Card Title</p>
                <p className="text-sm text-text-secondary">
                  Standard card with bg-card, border, and hover transitions.
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-mono text-text-muted mb-3">ContactCard (with hover glow)</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              {[
                { color: "before:bg-[#8B5CF6]", label: "E-mail", subtitle: "user@email.com" },
                { color: "before:bg-[#25D366]", label: "WhatsApp", subtitle: "Chat rápido" },
                { color: "before:bg-[#0A66C2]", label: "LinkedIn", subtitle: "/profile" },
              ].map((card) => (
                <div
                  key={card.label}
                  className={`group relative flex flex-col justify-between p-6 rounded-2xl border border-border bg-bg-card hover:border-border-hover hover:bg-bg-card-hover transition-all duration-500 overflow-hidden before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1/3 before:opacity-0 before:blur-2xl before:transition-opacity before:duration-500 hover:before:opacity-20 ${card.color}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <Mail className="w-5 h-5 text-text-muted" />
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-text-primary text-[15px] font-semibold mb-1">{card.label}</p>
                    <p className="text-text-muted text-[13px]">{card.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-6">
          Badges
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-mono font-medium text-text-secondary px-2.5 py-1 rounded-full border border-border">
            2026
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent">
            SaaS Platform
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-2/10 text-accent-2">
            Redesign
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-3/10 text-accent-3">
            Design System
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-4/10 text-accent-4">
            Mobile
          </span>
        </div>
      </div>

      {/* Dividers & Effects */}
      <div>
        <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-6">
          Effects
        </h3>
        <div className="space-y-6">
          <div>
            <p className="text-xs font-mono text-text-muted mb-3">Section Divider</p>
            <div className="section-divider" />
          </div>
          <div>
            <p className="text-xs font-mono text-text-muted mb-3">Glass Effect</p>
            <div className="glass rounded-lg border border-border p-6 bg-white/5">
              <p className="text-sm text-text-primary">
                Backdrop blur with glass transparency.
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-mono text-text-muted mb-3">Gradient Border</p>
            <div className="gradient-border p-6 border">
              <p className="text-sm text-text-primary">
                Border with accent gradient.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
