"use client";

import { FadeIn } from "./FadeIn";

const designSkills = [
  "Estruturação e evolução de design systems escaláveis com tokens semânticos e componentes reutilizáveis",
  "Desenho de fluxos complexos e jornadas críticas com foco em redução de fricção e clareza da informação",
  "Prototipação de média e alta fidelidade para validação e tomada de decisão",
  "UX research incluindo análise comportamental, testes de usabilidade e validação contínua",
  "Arquitetura da informação para sistemas com grande volume de dados e regras de negócio",
  "Uso estratégico de dados e métricas para orientar decisões de produto",
];

const engineeringSkills = [
  "Implementação de interfaces com React/Next.js, garantindo fidelidade ao design e performance",
  "Deploy e gerenciamento via Vercel, com workflow profissional usando GitHub",
  "Integração Figma-to-code com IA (Claude Code), acelerando a ponte entre design e código",
  "Banco de dados (Neon/PostgreSQL), pagamentos (Stripe) e emails transacionais (Resend)",
  "Design systems técnicos com shadcn/ui, HeroUI e Tailwind CSS",
  "Colaboração direta com engenharia, eliminando handoff e entregando soluções end-to-end",
];

const skills = [
  { name: "Pesquisa com usuários", color: "text-accent" },
  { name: "Wireframing e prototipação", color: "text-accent-2" },
  { name: "Design de interface (UI)", color: "text-accent-3" },
  { name: "Design Thinking", color: "text-accent-4" },
  { name: "Design responsivo e mobile-first", color: "text-accent" },
  { name: "Design Engineering", color: "text-accent-2" },
];

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
  return (
    <section id="sobre" className="py-14 sm:py-16 max-w-[1120px] mx-auto px-6 sm:px-10">
      {/* Bio */}
      <div className="mb-14">
        <FadeIn>
          <span className="inline-block text-[13px] font-mono font-medium text-accent-3 tracking-[0.15em] uppercase mb-3">
            Sobre mim
          </span>
          <h2 className="font-extrabold text-3xl sm:text-[32px] tracking-[-0.02em] mb-6 leading-[1.2]">
            Product Designer &amp;{" "}
            <span className="gradient-text">Design Engineer</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="space-y-4">
            <p className="text-text-secondary text-[15px] leading-[1.75]">
              Product Designer e Design Engineer com formação em Sistemas de Informação e experiência desde 2016 em produtos digitais B2B e SaaS.
            </p>
            <p className="text-text-secondary text-[15px] leading-[1.75]">
              Minha atuação conecta design e engenharia: vou do discovery e definição de problemas até a implementação em código, eliminando o gap entre o que é projetado no Figma e o que chega em produção.
            </p>
            <p className="text-text-secondary text-[15px] leading-[1.75]">
              Organizo arquitetura, reduzo ruído, crio padrões escaláveis e conecto experiência a métricas e impacto real no negócio. Quando necessário, coloco a mão no código para garantir que a entrega final tenha o nível de polimento e performance que o produto precisa.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Experiência em 2 colunas */}
      <div className="grid lg:grid-cols-2 gap-10 mb-14">
        {/* Product Design */}
        <FadeIn delay={0.15}>
          <div>
            <h3 className="text-[12px] font-mono font-medium text-accent tracking-[0.15em] uppercase mb-5">
              Product Design
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
              Design Engineering
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
              Skills
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill) => (
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
              Ferramentas &amp; Stack
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
