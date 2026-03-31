"use client";

import { FadeIn } from "./FadeIn";
import { useTranslation } from "@/i18n/LanguageContext";

const tools = [
  { name: "Figma", color: "text-accent" },
  { name: "Photoshop", color: "text-accent-3" },
  { name: "React / Next.js", color: "text-accent-2" },
  { name: "Tailwind CSS", color: "text-accent-4" },
  { name: "Claude Code", color: "text-accent" },
  { name: "GitHub", color: "text-text-secondary" },
  { name: "Vercel", color: "text-text-secondary" },
  { name: "Neon / PostgreSQL", color: "text-accent-4" },
  { name: "Stripe", color: "text-accent-3" },
  { name: "Resend", color: "text-accent-2" },
  { name: "Crazy Egg", color: "text-[#f9ab00]" },
  { name: "Google Analytics", color: "text-[#f9ab00]" },
  { name: "Scrum / Kanban", color: "text-accent-4" },
  { name: "shadcn/ui / HeroUI", color: "text-accent" },
];

export function About() {
  const { t } = useTranslation();

  const designSkills = t("about.designSkills") as string[];
  const engineeringSkills = t("about.engineeringSkills") as string[];

  const skillColors = [
    "text-accent", "text-accent-2", "text-accent-3",
    "text-accent-4", "text-accent", "text-accent-2",
  ];
  const translatedSkills = (t("about.skills") as string[]).map((name, i) => ({
    name,
    color: skillColors[i],
  }));

  return (
    <section id="sobre" className="py-14 sm:py-16 max-w-[1120px] mx-auto px-6 sm:px-10">
      {/* Bio */}
      <div className="mb-14">
        <FadeIn>
          <span className="inline-block text-[13px] font-mono font-medium text-accent-3 tracking-[0.15em] uppercase mb-3">
            {t("about.label") as string}
          </span>
          <h2 className="font-extrabold text-3xl sm:text-[32px] tracking-[-0.02em] mb-6 leading-[1.2]">
            {t("about.title") as string}{" "}
            <span className="gradient-text">{t("about.titleHighlight") as string}</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-4">
            {(t("about.bio") as string[]).map((paragraph, i) => (
              <p key={i} className="text-text-secondary text-[15px] leading-[1.75]">
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Experiência em 2 colunas */}
      <div className="grid lg:grid-cols-2 gap-10 mb-14">
        {/* Product Design */}
        <FadeIn delay={0.15}>
          <div>
            <h3 className="text-[12px] font-mono font-medium text-accent tracking-[0.15em] uppercase mb-5">
              {t("about.productDesign") as string}
            </h3>
            <ul className="space-y-0">
              {designSkills.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3.5 text-text-secondary text-[14px] leading-[1.65] py-3 border-b border-border last:border-0"
                >
                  <span className="mt-[3px] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-accent">
                      <rect width="20" height="20" rx="6" fill="currentColor" fillOpacity="0.1" />
                      <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Design Engineering */}
        <FadeIn delay={0.2}>
          <div>
            <h3 className="text-[12px] font-mono font-medium text-accent-2 tracking-[0.15em] uppercase mb-5">
              {t("about.designEngineering") as string}
            </h3>
            <ul className="space-y-0">
              {engineeringSkills.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3.5 text-text-secondary text-[14px] leading-[1.65] py-3 border-b border-border last:border-0"
                >
                  <span className="mt-[3px] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-accent-2">
                      <rect width="20" height="20" rx="6" fill="currentColor" fillOpacity="0.1" />
                      <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>

      {/* Skills + Ferramentas */}
      <div className="grid lg:grid-cols-2 gap-10">
        <FadeIn delay={0.25}>
          <div>
            <h3 className="text-[12px] font-mono font-medium text-accent-4 tracking-[0.15em] uppercase mb-4">
              {t("about.skillsLabel") as string}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {translatedSkills.map((skill) => (
                <span
                  key={skill.name}
                  className={`text-[13px] ${skill.color} border border-border px-4 py-2 rounded-full hover:border-current/30 transition-all duration-300`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div>
            <h3 className="text-[12px] font-mono font-medium text-[#f9ab00] tracking-[0.15em] uppercase mb-4">
              {t("about.toolsLabel") as string}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {tools.map((tool) => (
                <span
                  key={tool.name}
                  className={`text-[13px] ${tool.color} border border-border px-4 py-2 rounded-full hover:border-current/30 transition-all duration-300`}
                >
                  {tool.name}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
