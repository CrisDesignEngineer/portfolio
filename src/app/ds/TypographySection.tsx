"use client";

interface Specimen {
  label: string;
  description: string;
  className: string;
  text: string;
}

const specimens: Specimen[] = [
  {
    label: "H1 — Display",
    description: "font-extrabold · text-4xl/text-5xl · tracking-[-0.02em]",
    className: "font-extrabold text-4xl sm:text-5xl tracking-[-0.02em]",
    text: "From Figma to code",
  },
  {
    label: "H2 — Section Title",
    description: "font-extrabold · text-3xl/text-[32px] · tracking-[-0.02em]",
    className: "font-extrabold text-3xl sm:text-[32px] tracking-[-0.02em]",
    text: "Selected projects",
  },
  {
    label: "Section Label",
    description: "font-mono · text-[13px] · font-medium · uppercase · tracking-[0.15em]",
    className: "text-[13px] font-mono font-medium tracking-[0.15em] uppercase text-accent-3",
    text: "CASES",
  },
  {
    label: "Body",
    description: "font-sans · text-base · text-text-primary",
    className: "text-base text-text-primary",
    text: "Product Designer & Design Engineer. SaaS B2B, Design Systems, and scalable interfaces.",
  },
  {
    label: "Secondary",
    description: "font-sans · text-sm · text-text-secondary",
    className: "text-sm text-text-secondary",
    text: "Building interfaces with React/Next.js, ensuring design fidelity and performance.",
  },
  {
    label: "Mono",
    description: "font-mono · text-xs",
    className: "font-mono text-xs text-text-secondary",
    text: "font-family: Geist Mono, monospace",
  },
];

export function TypographySection() {
  return (
    <div className="space-y-10">
      <div className="space-y-2 mb-8">
        <p className="text-sm text-text-secondary">
          Font family: <span className="font-medium text-text-primary">Geist Sans</span> &{" "}
          <span className="font-medium text-text-primary font-mono">Geist Mono</span>
        </p>
      </div>

      {specimens.map((spec) => (
        <div key={spec.label} className="border-b border-border pb-8">
          <p className="text-xs font-mono text-text-muted mb-1">{spec.label}</p>
          <p className="text-xs text-text-muted mb-4">{spec.description}</p>
          <p className={spec.className}>{spec.text}</p>
        </div>
      ))}

      <div className="border-b border-border pb-8">
        <p className="text-xs font-mono text-text-muted mb-1">Gradient Text</p>
        <p className="text-xs text-text-muted mb-4">.gradient-text · background-clip: text</p>
        <p className="font-extrabold text-3xl tracking-[-0.02em] gradient-text">
          Design Engineer
        </p>
      </div>
    </div>
  );
}
