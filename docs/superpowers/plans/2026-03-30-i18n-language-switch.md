# i18n Language Switch (PT/EN) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a PT/EN language toggle to the portfolio that switches all visible text content between Portuguese and English, with fade transition and localStorage persistence.

**Architecture:** React Context + JSON locale files. A `LanguageProvider` wraps the app, exposing `t(key)`, `locale`, and `toggleLocale()` via a `useTranslation()` hook. CSS opacity transition handles fade between languages. Hydration flash mitigated by rendering content at opacity 0 until locale is resolved from localStorage.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion (existing)

**Spec:** `docs/superpowers/specs/2026-03-30-i18n-language-switch-design.md`

---

## File Structure

### New files
- `src/i18n/locales/pt.json` — All Portuguese strings for the interface
- `src/i18n/locales/en.json` — All English strings for the interface
- `src/i18n/LanguageContext.tsx` — LanguageProvider, useTranslation hook, locale types
- `src/components/LanguageToggle.tsx` — PT|EN toggle button component

### Modified files
- `src/app/layout.tsx` — Wrap children with LanguageProvider
- `src/app/page.tsx` — Extract hardcoded PT strings to client component, pass locale-aware cases
- `src/data/cases.ts` — Restructure to `{ pt: CaseStudy[], en: CaseStudy[] }`
- `src/components/Header.tsx` — Use `t()` for nav labels, add LanguageToggle
- `src/components/Hero.tsx` — Use `t()` for all text including DesignPreview
- `src/components/About.tsx` — Use `t()` for bio, skills, tools
- `src/components/Contact.tsx` — Use `t()` for section title, labels, descriptions
- `src/components/Footer.tsx` — Add `"use client"`, use `t()` for text
- `src/components/CaseCard.tsx` — Use `t()` for "Confidencial", "Preview do projeto", "Ver case completo"
- `src/components/CasesCarousel.tsx` — Use `t()` for "Preview do projeto", "Ver case completo", aria-labels
- `src/components/MobileCasesCarousel.tsx` — Use `t()` for "Confidencial", "Ver case", aria-labels
- `src/app/case/[id]/CaseContent.tsx` — Use `t()` for all section headings and labels

---

## Task 1: Create LanguageContext and locale files

**Files:**
- Create: `src/i18n/LanguageContext.tsx`
- Create: `src/i18n/locales/pt.json`
- Create: `src/i18n/locales/en.json`

- [ ] **Step 1: Create `src/i18n/locales/pt.json`**

Extract all hardcoded Portuguese strings from the codebase into a structured JSON file. Keys are organized by component/section.

```json
{
  "header": {
    "cases": "Cases",
    "about": "Sobre",
    "contact": "Contato",
    "role": "Product Designer + Engineer",
    "back": "Voltar",
    "openMenu": "Abrir menu",
    "closeMenu": "Fechar menu"
  },
  "hero": {
    "titleStart": "Do Figma ao código",
    "titleHighlight": "em produção",
    "description": "Product Designer & Design Engineer. SaaS B2B, Design Systems e interfaces escaláveis. Não desenho apenas interfaces. Estruturo produtos e construo soluções.",
    "ctaCases": "Ver cases",
    "ctaContact": "Contato",
    "stackLabel": "Stack & Tools"
  },
  "heroPreview": {
    "title": "Design System",
    "description": "Componentes, tokens e padrões escaláveis para produtos consistentes.",
    "components": "Componentes",
    "production": "Produção",
    "tokens": "Tokens",
    "semantic": "Semânticos"
  },
  "cases": {
    "label": "Cases",
    "title": "Projetos selecionados",
    "viewCase": "Ver case completo",
    "viewCaseShort": "Ver case",
    "preview": "Preview do projeto",
    "confidential": "Confidencial",
    "previous": "Anterior",
    "next": "Próximo",
    "goToCase": "Ir para case"
  },
  "caseDetail": {
    "role": "Role",
    "duration": "Duração",
    "scope": "Escopo",
    "overview": "Visão geral",
    "challenges": "Desafios",
    "process": "Processo",
    "results": "Resultados",
    "learnings": "Aprendizados",
    "nextCase": "Próximo case",
    "confidentialContent": "Conteúdo confidencial"
  },
  "about": {
    "label": "Sobre mim",
    "title": "Product Designer &",
    "titleHighlight": "Design Engineer",
    "bio": [
      "Product Designer e Design Engineer com formação em Sistemas de Informação e experiência desde 2016 em produtos digitais B2B e SaaS.",
      "Minha atuação conecta design e engenharia: vou do discovery e definição de problemas até a implementação em código, eliminando o gap entre o que é projetado no Figma e o que chega em produção.",
      "Organizo arquitetura, reduzo ruído, crio padrões escaláveis e conecto experiência a métricas e impacto real no negócio. Quando necessário, coloco a mão no código para garantir que a entrega final tenha o nível de polimento e performance que o produto precisa."
    ],
    "productDesign": "Product Design",
    "designEngineering": "Design Engineering",
    "designSkills": [
      "Estruturação e evolução de design systems escaláveis com tokens semânticos e componentes reutilizáveis",
      "Desenho de fluxos complexos e jornadas críticas com foco em redução de fricção e clareza da informação",
      "Prototipação de média e alta fidelidade para validação e tomada de decisão",
      "UX research incluindo análise comportamental, testes de usabilidade e validação contínua",
      "Arquitetura da informação para sistemas com grande volume de dados e regras de negócio",
      "Uso estratégico de dados e métricas para orientar decisões de produto"
    ],
    "engineeringSkills": [
      "Implementação de interfaces com React/Next.js, garantindo fidelidade ao design e performance",
      "Deploy e gerenciamento via Vercel, com workflow profissional usando GitHub",
      "Integração Figma-to-code com IA (Claude Code), acelerando a ponte entre design e código",
      "Banco de dados (Neon/PostgreSQL), pagamentos (Stripe) e emails transacionais (Resend)",
      "Design systems técnicos com shadcn/ui, HeroUI e Tailwind CSS",
      "Colaboração direta com engenharia, eliminando handoff e entregando soluções end-to-end"
    ],
    "skillsLabel": "Skills",
    "skills": [
      "Pesquisa com usuários",
      "Wireframing e prototipação",
      "Design de interface (UI)",
      "Design Thinking",
      "Design responsivo e mobile-first",
      "Design Engineering"
    ],
    "toolsLabel": "Ferramentas & Stack"
  },
  "contact": {
    "label": "Contato",
    "title": "Vamos conversar?",
    "description": "Se você busca um designer que entende de produto e tecnologia, estou disponível para novos projetos.",
    "email": "Email",
    "linkedin": "LinkedIn",
    "phone": "Telefone"
  },
  "footer": {
    "available": "Disponível para novos projetos"
  }
}
```

- [ ] **Step 2: Create `src/i18n/locales/en.json`**

Create the English translation file with the same key structure.

```json
{
  "header": {
    "cases": "Cases",
    "about": "About",
    "contact": "Contact",
    "role": "Product Designer + Engineer",
    "back": "Back",
    "openMenu": "Open menu",
    "closeMenu": "Close menu"
  },
  "hero": {
    "titleStart": "From Figma to code",
    "titleHighlight": "in production",
    "description": "Product Designer & Design Engineer. B2B SaaS, Design Systems, and scalable interfaces. I don't just design interfaces. I structure products and build solutions.",
    "ctaCases": "View cases",
    "ctaContact": "Contact",
    "stackLabel": "Stack & Tools"
  },
  "heroPreview": {
    "title": "Design System",
    "description": "Scalable components, tokens, and patterns for consistent products.",
    "components": "Components",
    "production": "Production",
    "tokens": "Tokens",
    "semantic": "Semantic"
  },
  "cases": {
    "label": "Cases",
    "title": "Selected projects",
    "viewCase": "View full case",
    "viewCaseShort": "View case",
    "preview": "Project preview",
    "confidential": "Confidential",
    "previous": "Previous",
    "next": "Next",
    "goToCase": "Go to case"
  },
  "caseDetail": {
    "role": "Role",
    "duration": "Duration",
    "scope": "Scope",
    "overview": "Overview",
    "challenges": "Challenges",
    "process": "Process",
    "results": "Results",
    "learnings": "Learnings",
    "nextCase": "Next case",
    "confidentialContent": "Confidential content"
  },
  "about": {
    "label": "About me",
    "title": "Product Designer &",
    "titleHighlight": "Design Engineer",
    "bio": [
      "Product Designer and Design Engineer with a degree in Information Systems and experience since 2016 in B2B and SaaS digital products.",
      "My work connects design and engineering: from discovery and problem definition to code implementation, closing the gap between what's designed in Figma and what ships to production.",
      "I organize architecture, reduce noise, create scalable patterns, and connect experience to metrics and real business impact. When needed, I write code to ensure the final delivery has the level of polish and performance the product demands."
    ],
    "productDesign": "Product Design",
    "designEngineering": "Design Engineering",
    "designSkills": [
      "Building and evolving scalable design systems with semantic tokens and reusable components",
      "Designing complex flows and critical journeys focused on reducing friction and information clarity",
      "Medium and high-fidelity prototyping for validation and decision-making",
      "UX research including behavioral analysis, usability testing, and continuous validation",
      "Information architecture for systems with large data volumes and business rules",
      "Strategic use of data and metrics to guide product decisions"
    ],
    "engineeringSkills": [
      "Building interfaces with React/Next.js, ensuring design fidelity and performance",
      "Deployment and management via Vercel, with professional GitHub workflow",
      "Figma-to-code integration with AI (Claude Code), accelerating the design-to-code bridge",
      "Databases (Neon/PostgreSQL), payments (Stripe), and transactional emails (Resend)",
      "Technical design systems with shadcn/ui, HeroUI, and Tailwind CSS",
      "Direct collaboration with engineering, eliminating handoff and delivering end-to-end solutions"
    ],
    "skillsLabel": "Skills",
    "skills": [
      "User research",
      "Wireframing & prototyping",
      "Interface design (UI)",
      "Design Thinking",
      "Responsive & mobile-first design",
      "Design Engineering"
    ],
    "toolsLabel": "Tools & Stack"
  },
  "contact": {
    "label": "Contact",
    "title": "Let's talk?",
    "description": "If you're looking for a designer who understands product and technology, I'm available for new projects.",
    "email": "Email",
    "linkedin": "LinkedIn",
    "phone": "Phone"
  },
  "footer": {
    "available": "Available for new projects"
  }
}
```

- [ ] **Step 3: Create `src/i18n/LanguageContext.tsx`**

```tsx
"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import pt from "./locales/pt.json";
import en from "./locales/en.json";

type Locale = "pt" | "en";

const locales = { pt, en } as const;

interface LanguageContextType {
  locale: Locale;
  toggleLocale: () => void;
  t: (key: string) => string | string[];
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): string | string[] {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value as string[];
  return path;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "en" || saved === "pt") {
      setLocale(saved);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("locale", locale);
      document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    }
  }, [locale, isHydrated]);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "pt" ? "en" : "pt"));
  }, []);

  const t = useCallback(
    (key: string): string | string[] => {
      return getNestedValue(locales[locale] as unknown as Record<string, unknown>, key);
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t, isHydrated }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `cd src/i18n && npx tsc --noEmit ../../src/i18n/LanguageContext.tsx 2>&1 || true`

Or more practically, run the Next.js dev server briefly to check for type errors:

Run: `npx next build --no-lint 2>&1 | head -30`

- [ ] **Step 5: Commit**

```bash
git add src/i18n/
git commit -m "feat(i18n): add LanguageContext, PT and EN locale files"
```

---

## Task 2: Create LanguageToggle component and wire into layout

**Files:**
- Create: `src/components/LanguageToggle.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/components/LanguageToggle.tsx`**

```tsx
"use client";

import { useTranslation } from "@/i18n/LanguageContext";

export function LanguageToggle() {
  const { locale, toggleLocale } = useTranslation();

  return (
    <div className="flex items-center bg-white/[0.08] rounded-lg p-1 gap-0.5">
      <button
        onClick={locale === "pt" ? undefined : toggleLocale}
        className={`px-2.5 py-1 rounded-md text-[12px] font-semibold transition-all duration-200 ${
          locale === "pt"
            ? "bg-accent text-white"
            : "text-text-muted hover:text-text-secondary"
        }`}
        aria-label="Português"
      >
        PT
      </button>
      <button
        onClick={locale === "en" ? undefined : toggleLocale}
        className={`px-2.5 py-1 rounded-md text-[12px] font-semibold transition-all duration-200 ${
          locale === "en"
            ? "bg-accent text-white"
            : "text-text-muted hover:text-text-secondary"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Modify `src/app/layout.tsx` — wrap children with LanguageProvider**

Add `import { LanguageProvider } from "@/i18n/LanguageContext";` at the top.

Replace the body content:

```tsx
<body className="min-h-screen bg-bg-primary text-text-primary font-sans">
  <LanguageProvider>
    <div className="bg-glow" />
    <div className="relative z-10">
      {children}
    </div>
  </LanguageProvider>
</body>
```

Note: `layout.tsx` remains a server component. Importing a client component (`LanguageProvider`) inside a server component is a valid App Router pattern.

- [ ] **Step 3: Verify the app builds without errors**

Run: `npx next build --no-lint 2>&1 | tail -10`

Expected: Build succeeds. No runtime errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/LanguageToggle.tsx src/app/layout.tsx
git commit -m "feat(i18n): add LanguageToggle component and wire LanguageProvider into layout"
```

---

## Task 3: Refactor Header with i18n + add toggle

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Update Header.tsx**

Add imports at top:

```tsx
import { useTranslation } from "@/i18n/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
```

Inside the `Header` function, add:

```tsx
const { t } = useTranslation();
```

Replace all hardcoded strings:
- `"Cases"` → `{t("header.cases") as string}`
- `"Sobre"` → `{t("header.about") as string}`
- `"Contato"` → `{t("header.contact") as string}`
- `"Product Designer + Engineer"` → `{t("header.role") as string}`
- `"Voltar"` → `{t("header.back") as string}`
- `aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}` → `aria-label={menuOpen ? t("header.closeMenu") as string : t("header.openMenu") as string}`

Add `<LanguageToggle />` in desktop nav after the nav links (inside the `hidden md:flex` div), and at the bottom of the mobile menu.

Desktop nav — add after the closing `</>` of `isHome ? (...)` ternary, before `</div>`:

```tsx
<LanguageToggle />
```

Mobile menu — add a `<LanguageToggle />` at the bottom of the mobile menu, after the nav links inside each branch of the ternary.

- [ ] **Step 2: Verify the header renders correctly**

Run dev server: `npx next dev`

Check: toggle appears on desktop right side, toggle appears in mobile menu, clicking toggles the language, nav labels change.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat(i18n): add language toggle to Header, translate nav labels"
```

---

## Task 4: Add fade transition wrapper

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add CSS transition class to `src/app/globals.css`**

Add at the end of the file (before the closing of any block):

```css
.locale-fade {
  transition: opacity 150ms ease-in-out;
}

.locale-fade.hydrating {
  opacity: 0;
}
```

- [ ] **Step 2: Create a client wrapper component for the fade**

Since `layout.tsx` is a server component, we need a small client wrapper. Create it inline in `LanguageContext.tsx` or as a separate export.

Add to `src/i18n/LanguageContext.tsx` at the bottom:

```tsx
export function LocaleFadeWrapper({ children }: { children: ReactNode }) {
  const { isHydrated, locale } = useTranslation();
  const [fading, setFading] = useState(false);
  const prevLocaleRef = useRef(locale);

  useEffect(() => {
    if (prevLocaleRef.current !== locale && isHydrated) {
      setFading(true);
      const timer = setTimeout(() => {
        setFading(false);
      }, 150);
      prevLocaleRef.current = locale;
      return () => clearTimeout(timer);
    }
  }, [locale, isHydrated]);

  return (
    <div
      className={`locale-fade ${!isHydrated ? "hydrating" : ""}`}
      style={{ opacity: fading ? 0 : 1 }}
    >
      {children}
    </div>
  );
}
```

Note: `useRef` is already included in the import line from Task 1 Step 3.

- [ ] **Step 3: Wrap content in layout.tsx with LocaleFadeWrapper**

Update `src/app/layout.tsx`:

```tsx
import { LanguageProvider, LocaleFadeWrapper } from "@/i18n/LanguageContext";
```

```tsx
<LanguageProvider>
  <div className="bg-glow" />
  <LocaleFadeWrapper>
    <div className="relative z-10">
      {children}
    </div>
  </LocaleFadeWrapper>
</LanguageProvider>
```

- [ ] **Step 4: Verify the fade works**

Run dev server. Toggle the language. Content should fade out and back in smoothly (~150ms each way). On first load, content should appear smoothly without a flash of wrong language.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/LanguageContext.tsx src/app/layout.tsx src/app/globals.css
git commit -m "feat(i18n): add fade transition wrapper and hydration flash mitigation"
```

---

## Task 5: Refactor Hero with i18n

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Update Hero.tsx**

Add import:

```tsx
import { useTranslation } from "@/i18n/LanguageContext";
```

Inside `Hero()`, add:

```tsx
const { t } = useTranslation();
```

Replace hardcoded strings:
- `"Do Figma ao código "` → `{t("hero.titleStart") as string}{" "}`
- `"em produção"` → `{t("hero.titleHighlight") as string}`
- The `<p>` description → `{t("hero.description") as string}`
- `"Ver cases"` → `{t("hero.ctaCases") as string}`
- `"Contato"` → `{t("hero.ctaContact") as string}`
- `"Stack & Tools"` → `{t("hero.stackLabel") as string}`

Inside `DesignPreview`, also use `t()`. Since it's a nested component in the same file, pass `t` as prop or use the hook directly:

```tsx
const DesignPreview = () => {
  const { t } = useTranslation();
  return (
    // ... replace:
    // "Design System" → {t("heroPreview.title") as string}
    // "Componentes, tokens e padrões escaláveis..." → {t("heroPreview.description") as string}
    // "Componentes" → {t("heroPreview.components") as string}
    // "Produção" → {t("heroPreview.production") as string}
    // "Tokens" → {t("heroPreview.tokens") as string}
    // "Semânticos" → {t("heroPreview.semantic") as string}
  );
}
```

- [ ] **Step 2: Verify Hero renders in both languages**

Toggle the language and confirm all Hero text switches correctly.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat(i18n): translate Hero section"
```

---

## Task 6: Refactor About with i18n

**Files:**
- Modify: `src/components/About.tsx`

- [ ] **Step 1: Update About.tsx**

Add import:

```tsx
import { useTranslation } from "@/i18n/LanguageContext";
```

Inside `About()`, add:

```tsx
const { t } = useTranslation();
```

Replace the hardcoded arrays and strings. The `designSkills`, `engineeringSkills`, `skills`, and `tools` arrays currently live outside the component. The skills text needs to come from `t()` now. Move the translatable content inside the component:

- `designSkills` array → use `t("about.designSkills") as string[]`
- `engineeringSkills` array → use `t("about.engineeringSkills") as string[]`
- `skills` array names → use `(t("about.skills") as string[])` and zip with the existing color data
- `"Sobre mim"` → `{t("about.label") as string}`
- `"Product Designer &"` → `{t("about.title") as string}`
- `"Design Engineer"` → `{t("about.titleHighlight") as string}`
- Bio paragraphs → `(t("about.bio") as string[]).map(...)`
- `"Product Design"` → `{t("about.productDesign") as string}`
- `"Design Engineering"` → `{t("about.designEngineering") as string}`
- `"Skills"` → `{t("about.skillsLabel") as string}`
- `"Ferramentas & Stack"` → `{t("about.toolsLabel") as string}`

The `skills` array has colors tied to each skill name. Keep the colors as a static array and pair with translated names:

```tsx
const skillColors = [
  "text-accent", "text-accent-2", "text-accent-3",
  "text-accent-4", "text-accent", "text-accent-2",
];
const translatedSkills = (t("about.skills") as string[]).map((name, i) => ({
  name,
  color: skillColors[i],
}));
```

The `tools` array names are NOT translated (they are proper nouns like "Figma", "React"), so keep tools as-is.

- [ ] **Step 2: Verify About renders in both languages**

Toggle language and confirm bio, skills, and labels all switch.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat(i18n): translate About section"
```

---

## Task 7: Refactor Contact and Footer with i18n

**Files:**
- Modify: `src/components/Contact.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Update Contact.tsx**

Add import and hook. Replace:
- `"Contato"` (label) → `{t("contact.label") as string}`
- `"Vamos conversar?"` → `{t("contact.title") as string}`
- The description `<p>` → `{t("contact.description") as string}`
- Contact labels `"Email"`, `"LinkedIn"`, `"Telefone"` → use `t()` keys

The `contacts` array is defined outside the component with JSX in `display`. Since `t()` requires the hook (only available inside the component), move the `contacts` array inside the `Contact()` function body and make labels dynamic:

```tsx
export function Contact() {
  const { t } = useTranslation();

  const contacts = [
    {
      label: t("contact.email") as string,
      value: "design.cristianocarvalho@gmail.com",
      href: "mailto:design.cristianocarvalho@gmail.com",
      display: (
        <>design.cristianocarvalho<br />@gmail.com</>
      ),
      color: "group-hover:text-accent-2",
    },
    {
      label: t("contact.linkedin") as string,
      // ... same structure, translated label
    },
    {
      label: t("contact.phone") as string,
      // ... same structure, translated label
    },
  ];
  // ... rest of component
}
```

- [ ] **Step 2: Update Footer.tsx**

Add `"use client";` at the top of the file.

Add import:

```tsx
import { useTranslation } from "@/i18n/LanguageContext";
```

Inside `Footer()`, add:

```tsx
const { t } = useTranslation();
```

Replace:
- `"Disponível para novos projetos"` → `{t("footer.available") as string}`

The copyright line `© {year} Cristiano Carvalho` stays as-is (proper noun + year).

- [ ] **Step 3: Verify Contact and Footer render in both languages**

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.tsx src/components/Footer.tsx
git commit -m "feat(i18n): translate Contact and Footer sections"
```

---

## Task 8: Refactor cases data and update all consumers (atomic)

> **Important:** The cases data restructure and consumer updates MUST be done together in a single commit to avoid breaking the build.

**Files:**
- Modify: `src/data/cases.ts`
- Create: `src/components/CasesSection.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/CaseCard.tsx`
- Modify: `src/components/CasesCarousel.tsx`
- Modify: `src/components/MobileCasesCarousel.tsx`

- [ ] **Step 1: Restructure `src/data/cases.ts`**

Keep the `CaseStudy` interface unchanged. Rename the current array to be the `pt` value, create English translations, and export:

```tsx
export const cases: Record<"pt" | "en", CaseStudy[]> = {
  pt: [ /* current cases array, unchanged */ ],
  en: [ /* translated cases array */ ],
};
```

The English translations of case study content:

- **Keoto**: translate subtitle, overview, challenges, process titles/descriptions, results, learnings. Keep `tag: "SaaS Platform"`, `role: "Product Designer"`.
- **Vivara**: translate all text. `tag: "System Redesign"`, `role: "UX/Product Designer"`.
- **Leiteiro**: translate all text. `tag: "Multilateral Platform"`, `role: "Product Designer"`.
- **Honda**: translate all text. `tag: "Conversion Optimization"`, `role: "UX Designer"`.

Keep `id`, `image`, `year`, `accentColor`, `confidential` identical between PT and EN.

- [ ] **Step 2: Update `src/app/page.tsx`**

`page.tsx` is a server component. It imports `cases` and passes them to child components. Since `cases` is now `Record<"pt" | "en", CaseStudy[]>`, the server component cannot know the client locale. Two approaches:

**Approach: Pass both locales down, let client components pick.**

Change `page.tsx` to pass the full `cases` object. Create a small client wrapper for the Cases section:

Create a new client component inline or extract to a file. The simplest approach: make the cases section a client component.

Create `src/components/CasesSection.tsx`:

```tsx
"use client";

import { useTranslation } from "@/i18n/LanguageContext";
import { cases } from "@/data/cases";
import { CaseCard } from "@/components/CaseCard";
import { CasesCarousel } from "@/components/CasesCarousel";
import { MobileCasesCarousel } from "@/components/MobileCasesCarousel";

export function CasesSection() {
  const { t, locale } = useTranslation();
  const localizedCases = cases[locale];

  return (
    <section id="cases" className="pt-10 pb-14 sm:pt-12 sm:pb-16 max-w-[1120px] mx-auto px-6 sm:px-10">
      <div className="mb-10">
        <span className="inline-block text-[13px] font-mono font-medium text-accent-2 tracking-[0.15em] uppercase mb-3">
          {t("cases.label") as string}
        </span>
        <h2 className="font-extrabold text-3xl sm:text-[32px] tracking-[-0.02em] text-text-primary">
          {t("cases.title") as string}
        </h2>
      </div>

      <div className="hidden md:block space-y-6">
        <CaseCard caseStudy={localizedCases[0]} index={0} />
        <CasesCarousel cases={localizedCases.slice(1)} />
      </div>

      <div className="md:hidden">
        <MobileCasesCarousel cases={localizedCases} />
      </div>
    </section>
  );
}
```

Update `page.tsx` to use `CasesSection` instead of the inline cases section. Remove the `cases` import from `page.tsx`.

- [ ] **Step 3: Update CaseCard.tsx**

Add import and hook:

```tsx
import { useTranslation } from "@/i18n/LanguageContext";
```

Inside `CaseCard()`:

```tsx
const { t } = useTranslation();
```

Replace:
- `"Confidencial"` → `{t("cases.confidential") as string}`
- `"Preview do projeto"` → `{t("cases.preview") as string}`
- `"Ver case completo"` → `{t("cases.viewCase") as string}`

- [ ] **Step 4: Update CasesCarousel.tsx**

Add import and hook. Replace:
- `"Preview do projeto"` → `{t("cases.preview") as string}`
- `"Ver case completo"` → `{t("cases.viewCase") as string}`
- `aria-label="Anterior"` → `aria-label={t("cases.previous") as string}`
- `aria-label="Próximo"` → `aria-label={t("cases.next") as string}`

- [ ] **Step 5: Update MobileCasesCarousel.tsx**

Add import and hook. Replace:
- `"Confidencial"` → `{t("cases.confidential") as string}`
- `"Preview do projeto"` → `{t("cases.preview") as string}`
- `"Ver case"` → `{t("cases.viewCaseShort") as string}`
- `` aria-label={`Ir para case ${i + 1}`} `` → `` aria-label={`${t("cases.goToCase") as string} ${i + 1}`} ``
- `aria-label="Anterior"` → `aria-label={t("cases.previous") as string}`
- `aria-label="Próximo"` → `aria-label={t("cases.next") as string}`

- [ ] **Step 6: Verify build succeeds and cases render in both languages**

Run: `npx next build --no-lint 2>&1 | tail -10`

Expected: Build succeeds. All consumer files updated to use `cases[locale]` instead of `cases` directly.

- [ ] **Step 7: Commit (all changes together)**

```bash
git add src/data/cases.ts src/components/CasesSection.tsx src/app/page.tsx src/components/CaseCard.tsx src/components/CasesCarousel.tsx src/components/MobileCasesCarousel.tsx
git commit -m "feat(i18n): restructure cases data for bilingual support and update all consumers"
```

---

## Task 9: Refactor CaseContent with i18n

**Files:**
- Modify: `src/app/case/[id]/CaseContent.tsx`
- Modify: `src/app/case/[id]/page.tsx`

- [ ] **Step 1: Update case/[id]/page.tsx**

The server component currently imports `cases` (a flat array) and looks up by ID. Update to use `cases.pt` for server-side purposes (metadata, static params, notFound guard), and pass the case ID to `CaseContent` which resolves locale client-side:

```tsx
import { cases } from "@/data/cases";
import { notFound } from "next/navigation";

// generateStaticParams and generateMetadata use cases.pt (downscope)
export function generateStaticParams() {
  return cases.pt.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: ...) {
  const { id } = await params;
  const caseStudy = cases.pt.find((c) => c.id === id);
  if (!caseStudy) return {};
  return { title: `${caseStudy.title} | Cristiano Carvalho` };
}

// Keep the notFound() guard using cases.pt for 404 handling
export default async function CasePage({ params }: ...) {
  const { id } = await params;
  const caseStudy = cases.pt.find((c) => c.id === id);
  if (!caseStudy) { notFound(); }
  return (
    <>
      <Header />
      <CaseContent caseId={id} />
      <Footer />
    </>
  );
}
```

**Important:** The `notFound()` check must remain server-side using `cases.pt` to provide proper 404 pages for invalid case IDs.

- [ ] **Step 2: Update CaseContent.tsx**

Change the props from receiving a full `caseStudy` to receiving `caseId`, and resolve data inside the component using locale:

```tsx
import { useTranslation } from "@/i18n/LanguageContext";
import { cases } from "@/data/cases";
```

```tsx
interface CaseContentProps {
  caseId: string;
}

export function CaseContent({ caseId }: CaseContentProps) {
  const { t, locale } = useTranslation();
  const localizedCases = cases[locale];
  const caseIndex = localizedCases.findIndex((c) => c.id === caseId);
  const caseStudy = localizedCases[caseIndex];
  const nextCase = localizedCases[(caseIndex + 1) % localizedCases.length];
```

Replace all hardcoded section labels:
- `"Role"` → `{t("caseDetail.role") as string}`
- `"Duração"` → `{t("caseDetail.duration") as string}`
- `"Escopo"` → `{t("caseDetail.scope") as string}`
- `"Visão geral"` → `{t("caseDetail.overview") as string}`
- `"Desafios"` → `{t("caseDetail.challenges") as string}`
- `"Processo"` → `{t("caseDetail.process") as string}`
- `"Resultados"` → `{t("caseDetail.results") as string}`
- `"Aprendizados"` → `{t("caseDetail.learnings") as string}`
- `"Próximo case"` → `{t("caseDetail.nextCase") as string}`
- `"Conteúdo confidencial"` → `{t("caseDetail.confidentialContent") as string}`
- `"Confidencial"` → `{t("cases.confidential") as string}`

- [ ] **Step 3: Verify case detail pages render in both languages**

Navigate to `/case/keoto`, toggle language, verify all section headings and case content translate.

- [ ] **Step 4: Commit**

```bash
git add src/app/case/[id]/page.tsx src/app/case/[id]/CaseContent.tsx
git commit -m "feat(i18n): translate case detail pages"
```

---

## Task 10: Final verification and cleanup

**Files:**
- All modified files

- [ ] **Step 1: Full build check**

Run: `npx next build 2>&1 | tail -20`

Expected: Build succeeds with no errors.

- [ ] **Step 2: Manual testing checklist**

Run dev server: `npx next dev`

Verify each acceptance criterion:

1. Toggle PT | EN visible and accessible on all pages (home + case detail) — desktop and mobile
2. All visible text content changes when toggling language
3. Preference saved: toggle to EN, reload page — should stay in EN
4. No layout breakage in either language
5. Smooth fade transition when toggling
6. No flash of wrong language on page load

- [ ] **Step 3: Commit any fixes**

If any issues found during testing, fix and commit:

```bash
git add -A
git commit -m "fix(i18n): address issues found during final verification"
```

- [ ] **Step 4: Final commit if clean**

If everything passed with no changes needed, this step is a no-op.
