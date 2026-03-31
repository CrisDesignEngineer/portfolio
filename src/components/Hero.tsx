'use client'
import React from 'react'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { useTranslation } from "@/i18n/LanguageContext"

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

const techStack = [
  { name: "Figma", icon: "🎨" },
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Tailwind CSS", icon: "🎐" },
  { name: "TypeScript", icon: "📘" },
  { name: "Claude Code", icon: "🤖" },
  { name: "GitHub", icon: "🐙" },
  { name: "Vercel", icon: "▲" },
  { name: "Stripe", icon: "💳" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "shadcn/ui", icon: "🧩" },
  { name: "Framer Motion", icon: "✨" },
]

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="overflow-hidden">
      <div className="relative mx-auto max-w-[1120px] px-6 sm:px-10 pt-28 lg:pt-40 lg:pb-8">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <h1 className="text-balance font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.08] tracking-[-0.025em]">
              {t("hero.titleStart") as string}{' '}
              <span className="gradient-text">{t("hero.titleHighlight") as string}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-text-secondary text-lg sm:text-xl leading-[1.7]">
              {t("hero.description") as string}
            </p>

            <div className="mt-10 flex items-center justify-center gap-5">
              <a
                href="#cases"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-[14px] font-semibold rounded-[14px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(191,90,242,0.3)]"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent-3))",
                }}
              >
                {t("hero.ctaCases") as string}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#contato"
                className="inline-flex items-center px-7 py-3.5 text-text-secondary text-[14px] font-medium hover:text-text-primary transition-colors duration-200"
              >
                {t("hero.ctaContact") as string}
              </a>
            </div>

            {/* Visual decorativo - cards abstratos */}
            <div
              aria-hidden
              className="bg-radial from-[var(--accent)]/30 dark:from-[var(--accent)]/15 relative mx-auto mt-20 max-w-2xl to-transparent to-55% text-left"
            >
              <div className="absolute inset-0 mx-auto w-80 -translate-x-3 -translate-y-12 rounded-[2rem] border border-[var(--border)]/50 bg-[var(--bg-card)] p-2 [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:-translate-x-6">
                <div className="relative h-96 overflow-hidden rounded-[1.5rem] border border-[var(--border)] p-2 pb-12 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-45deg,var(--border),var(--border)_1px,transparent_1px,transparent_6px)] before:opacity-50"></div>
              </div>
              <div className="mx-auto w-80 translate-x-4 rounded-[2rem] border border-[var(--border)]/50 bg-[var(--bg-card)]/50 p-2 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:translate-x-8">
                <div className="space-y-2 overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg-card)] p-2 shadow-xl">
                  <DesignPreview />
                  <div className="rounded-[1rem] bg-[var(--bg-secondary)] p-4 pb-16"></div>
                </div>
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>
          </AnimatedGroup>
        </div>
      </div>

      {/* Tech Stack slider */}
      <div className="pb-10 md:pb-16">
        <div className="group relative m-auto max-w-[1120px] px-6 sm:px-10">
          <div className="flex flex-col items-center md:flex-row">
            <div className="inline md:max-w-44 md:border-r md:border-[var(--border)] md:pr-6">
              <p className="text-end text-sm text-text-muted font-mono uppercase tracking-wider">{t("hero.stackLabel") as string}</p>
            </div>
            <div className="relative py-6 md:w-[calc(100%-11rem)]">
              <InfiniteSlider
                speedOnHover={20}
                speed={40}
                gap={56}
              >
                {techStack.map((tech) => (
                  <div key={tech.name} className="flex items-center gap-2">
                    <span className="text-base">{tech.icon}</span>
                    <span className="text-sm text-text-secondary whitespace-nowrap">{tech.name}</span>
                  </div>
                ))}
              </InfiniteSlider>
              <ProgressiveBlur
                className="pointer-events-none absolute left-0 top-0 h-full w-20"
                direction="left"
                blurIntensity={1}
              />
              <ProgressiveBlur
                className="pointer-events-none absolute right-0 top-0 h-full w-20"
                direction="right"
                blurIntensity={1}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Mini preview de design system no card decorativo */
const DesignPreview = () => {
  const { t } = useTranslation();
  return (
    <div className="relative space-y-3 rounded-[1rem] bg-white/5 p-4">
      <div className="flex items-center gap-1.5 text-accent">
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        <div className="text-sm font-medium text-text-primary">{t("heroPreview.title") as string}</div>
      </div>
      <div className="space-y-3">
        <div className="text-text-secondary border-b border-white/10 pb-3 text-sm">
          {t("heroPreview.description") as string}
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="space-x-1">
              <span className="text-text-primary align-baseline text-xl font-medium">48</span>
              <span className="text-text-muted text-xs">{t("heroPreview.components") as string}</span>
            </div>
            <div className="flex h-5 items-center rounded px-2 text-xs text-white" style={{ background: 'linear-gradient(to right, var(--accent), var(--accent-3))' }}>
              {t("heroPreview.production") as string}
            </div>
          </div>
          <div className="space-y-1">
            <div className="space-x-1">
              <span className="text-text-primary align-baseline text-xl font-medium">120+</span>
              <span className="text-text-muted text-xs">{t("heroPreview.tokens") as string}</span>
            </div>
            <div className="flex h-5 w-2/3 items-center rounded bg-white/10 px-2 text-xs text-text-secondary">
              {t("heroPreview.semantic") as string}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
