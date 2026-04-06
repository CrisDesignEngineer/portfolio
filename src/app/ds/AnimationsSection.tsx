"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const techStack = [
  { name: "Figma", icon: "🎨" },
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Tailwind CSS", icon: "🎐" },
  { name: "TypeScript", icon: "📘" },
  { name: "Framer Motion", icon: "✨" },
];

function AnimationDemo({
  label,
  direction,
}: {
  label: string;
  direction: "up" | "down" | "left" | "right";
}) {
  const [key, setKey] = useState(0);

  const directionOffset = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-text-muted">{label}</p>
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="text-xs font-mono text-accent hover:text-accent-hover transition-colors"
        >
          Replay
        </button>
      </div>
      <div className="h-20 flex items-center justify-center rounded-lg border border-border bg-bg-card">
        <motion.div
          key={key}
          initial={{ opacity: 0, ...directionOffset[direction] }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/40"
        />
      </div>
    </div>
  );
}

function HoverDemo() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono text-text-muted">whileHover — Scale</p>
      <div className="h-20 flex items-center justify-center rounded-lg border border-border bg-bg-card">
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="w-12 h-12 rounded-lg bg-accent-3/20 border border-accent-3/40 cursor-pointer"
        />
      </div>
    </div>
  );
}

function GlowDemo() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-mono text-text-muted">Card Glow — Hover shadow</p>
      <div className="h-20 flex items-center justify-center">
        <div className="card-glow w-32 h-14 rounded-lg border border-border bg-bg-card cursor-pointer flex items-center justify-center">
          <span className="text-xs text-text-muted">Hover me</span>
        </div>
      </div>
    </div>
  );
}

function BreatheGlowDemo() {
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-text-muted">Breathe Glow — Background pulse</p>
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="text-xs font-mono text-accent hover:text-accent-hover transition-colors"
        >
          Replay
        </button>
      </div>
      <div className="h-24 flex items-center justify-center rounded-lg border border-border bg-bg-card overflow-hidden">
        <div key={key} className="relative w-24 h-16 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-60"
            style={{
              background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
              animation: "breathe 4s ease-in-out infinite",
            }}
          />
          <span className="relative text-xs font-mono text-text-primary z-10">Glow</span>
        </div>
      </div>
    </div>
  );
}

export function AnimationsSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-6">
          FadeIn Directions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimationDemo label="FadeIn Up" direction="up" />
          <AnimationDemo label="FadeIn Down" direction="down" />
          <AnimationDemo label="FadeIn Left" direction="left" />
          <AnimationDemo label="FadeIn Right" direction="right" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-6">
          Interactions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <HoverDemo />
          <GlowDemo />
          <BreatheGlowDemo />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-mono font-medium text-text-secondary tracking-[0.1em] uppercase mb-6">
          InfiniteSlider
        </h3>
        <div className="rounded-lg border border-border bg-bg-card p-6 overflow-hidden">
          <InfiniteSlider speed={40} speedOnHover={20} gap={56}>
            {techStack.map((tech) => (
              <div key={tech.name} className="flex items-center gap-2">
                <span className="text-base">{tech.icon}</span>
                <span className="text-sm text-text-secondary whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </div>
  );
}
