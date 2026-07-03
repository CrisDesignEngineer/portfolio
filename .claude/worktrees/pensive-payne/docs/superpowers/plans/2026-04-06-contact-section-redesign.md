# Contact Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current contact section with 3 action cards (Email, WhatsApp, LinkedIn) featuring per-card colored hover glow effects.

**Architecture:** Update the existing `Contact.tsx` component in-place with new card structure (icon + arrow + label + subtitle), add hover glow via CSS pseudo-element, update i18n keys in both locale files, and add unit tests.

**Tech Stack:** React, Tailwind CSS, lucide-react, Framer Motion (FadeIn), vitest + @testing-library/react

**Spec:** `docs/superpowers/specs/2026-04-06-contact-section-redesign.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `src/i18n/locales/pt.json` | Modify | Portuguese translations for contact section |
| `src/i18n/locales/en.json` | Modify | English translations for contact section |
| `src/components/Contact.tsx` | Modify | Contact section component with new cards and hover effects |
| `src/components/__tests__/Contact.test.tsx` | Create | Unit tests for Contact component |

---

## Task 1: Update translation files

**Files:**
- Modify: `src/i18n/locales/pt.json:93-100`
- Modify: `src/i18n/locales/en.json:93-100`

- [ ] **Step 1: Update PT translations**

Replace the `contact` block in `src/i18n/locales/pt.json` (remove `contact.phone`, add WhatsApp and LinkedIn subtitle keys):

```json
"contact": {
  "label": "Contato",
  "title": "Vamos construir algo juntos?",
  "description": "Estou sempre aberto a conversar sobre novos projetos, ideias criativas ou oportunidades de colaboração. Entre em contato!",
  "email": "E-mail",
  "whatsapp": "WhatsApp",
  "whatsappSub": "Chat rápido",
  "linkedin": "LinkedIn",
  "linkedinSub": "/design-cristiano-carvalho"
}
```

- [ ] **Step 2: Update EN translations**

Replace the `contact` block in `src/i18n/locales/en.json` (same removals/additions as PT):

```json
"contact": {
  "label": "Contact",
  "title": "Let's build something together?",
  "description": "I'm always open to talk about new projects, creative ideas, or collaboration opportunities. Get in touch!",
  "email": "E-mail",
  "whatsapp": "WhatsApp",
  "whatsappSub": "Quick chat",
  "linkedin": "LinkedIn",
  "linkedinSub": "/design-cristiano-carvalho"
}
```

- [ ] **Step 3: Commit**

```bash
git add src/i18n/locales/pt.json src/i18n/locales/en.json
git commit -m "feat(i18n): update contact section translations (CRIS-8)"
```

---

## Task 2: Write Contact component tests

**Files:**
- Create: `src/components/__tests__/Contact.test.tsx`

Reference `src/components/__tests__/CourseCard.test.tsx` for mock patterns (mock `framer-motion`, mock `@/i18n/LanguageContext`).

- [ ] **Step 1: Write the test file**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Contact } from "../Contact";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock("@/i18n/LanguageContext", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        "contact.label": "Contato",
        "contact.title": "Vamos construir algo juntos?",
        "contact.description": "Estou sempre aberto a conversar...",
        "contact.email": "E-mail",
        "contact.whatsapp": "WhatsApp",
        "contact.whatsappSub": "Chat rápido",
        "contact.linkedin": "LinkedIn",
        "contact.linkedinSub": "/design-cristiano-carvalho",
      };
      return map[key] ?? key;
    },
    locale: "pt",
  }),
}));

describe("Contact", () => {
  it("renders section title and description", () => {
    render(<Contact />);
    expect(screen.getByText("Vamos construir algo juntos?")).toBeInTheDocument();
    expect(screen.getByText("Estou sempre aberto a conversar...")).toBeInTheDocument();
  });

  it("renders all three contact cards", () => {
    render(<Contact />);
    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });

  it("has correct href for email (mailto)", () => {
    render(<Contact />);
    const emailLink = screen.getByLabelText(/e-mail/i);
    expect(emailLink).toHaveAttribute("href", "mailto:design.cristianocarvalho@gmail.com");
  });

  it("has correct href for WhatsApp", () => {
    render(<Contact />);
    const whatsappLink = screen.getByLabelText(/whatsapp/i);
    expect(whatsappLink).toHaveAttribute("href", "https://wa.me/5511977266408");
  });

  it("has correct href for LinkedIn", () => {
    render(<Contact />);
    const linkedinLink = screen.getByLabelText(/linkedin/i);
    expect(linkedinLink).toHaveAttribute("href", "https://www.linkedin.com/in/design-cristiano-carvalho/");
  });

  it("opens WhatsApp and LinkedIn in new tab", () => {
    render(<Contact />);
    const whatsappLink = screen.getByLabelText(/whatsapp/i);
    const linkedinLink = screen.getByLabelText(/linkedin/i);

    expect(whatsappLink).toHaveAttribute("target", "_blank");
    expect(whatsappLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("email link does not open in new tab", () => {
    render(<Contact />);
    const emailLink = screen.getByLabelText(/e-mail/i);
    expect(emailLink).not.toHaveAttribute("target");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/__tests__/Contact.test.tsx`
Expected: FAIL — the current Contact component does not have aria-labels or WhatsApp card.

- [ ] **Step 3: Commit failing tests**

```bash
git add src/components/__tests__/Contact.test.tsx
git commit -m "test: add Contact component tests (CRIS-8)"
```

---

## Task 3: Implement the new Contact component

**Files:**
- Modify: `src/components/Contact.tsx`

- [ ] **Step 1: Rewrite Contact.tsx**

Replace the full contents of `src/components/Contact.tsx` with:

```tsx
"use client";

import { Mail, Linkedin, ArrowRight } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { useTranslation } from "@/i18n/LanguageContext";
import type { ReactNode } from "react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface ContactItem {
  icon: ReactNode;
  label: string;
  subtitle: string;
  href: string;
  external?: boolean;
  glowColor: string;
  ariaLabel: string;
}

export function Contact() {
  const { t } = useTranslation();

  const contacts: ContactItem[] = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: t("contact.email"),
      subtitle: "design.cristianocarvalho@gmail.com",
      href: "mailto:design.cristianocarvalho@gmail.com",
      glowColor: "before:bg-[#8B5CF6]",
      ariaLabel: t("contact.email"),
    },
    {
      icon: <WhatsAppIcon className="w-5 h-5" />,
      label: t("contact.whatsapp"),
      subtitle: t("contact.whatsappSub"),
      href: "https://wa.me/5511977266408",
      external: true,
      glowColor: "before:bg-[#25D366]",
      ariaLabel: t("contact.whatsapp"),
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: t("contact.linkedin"),
      subtitle: t("contact.linkedinSub"),
      href: "https://www.linkedin.com/in/design-cristiano-carvalho/",
      external: true,
      glowColor: "before:bg-[#0A66C2]",
      ariaLabel: t("contact.linkedin"),
    },
  ];

  return (
    <section
      id="contato"
      className="py-14 sm:py-16 max-w-[1120px] mx-auto px-6 sm:px-10"
    >
      <div className="max-w-2xl mb-10">
        <FadeIn>
          <span className="inline-block text-[13px] font-mono font-medium text-accent-4 tracking-[0.15em] uppercase mb-3">
            {t("contact.label")}
          </span>
          <h2 className="font-extrabold text-3xl sm:text-[32px] tracking-[-0.02em] mb-3">
            {t("contact.title")}
          </h2>
          <p className="text-text-secondary text-[15px] leading-[1.7]">
            {t("contact.description")}
          </p>
        </FadeIn>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {contacts.map((contact, i) => (
          <FadeIn key={contact.label} delay={i * 0.08}>
            <a
              href={contact.href}
              aria-label={contact.ariaLabel}
              {...(contact.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`group relative flex flex-col justify-between p-6 rounded-2xl border border-border bg-bg-card hover:border-border-hover hover:bg-bg-card-hover transition-all duration-500 h-full overflow-hidden before:absolute before:inset-y-0 before:left-0 before:w-1/3 before:opacity-0 before:blur-2xl before:transition-opacity before:duration-500 hover:before:opacity-20 ${contact.glowColor}`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-text-muted">{contact.icon}</span>
                <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors duration-300" />
              </div>
              <div>
                <p className="text-text-primary text-[15px] font-semibold mb-1">
                  {contact.label}
                </p>
                <p className="text-text-muted text-[13px]">
                  {contact.subtitle}
                </p>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `npx vitest run src/components/__tests__/Contact.test.tsx`
Expected: All 7 tests PASS.

- [ ] **Step 3: Run full test suite**

Run: `npx vitest run`
Expected: All tests pass (no regressions).

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: redesign contact section with action cards and hover glow (CRIS-8)"
```

---

## Task 4: Visual verification and final commit

- [ ] **Step 1: Start dev server and verify visually**

Run: `npm run dev`
Check in browser:
- 3 cards render side by side on desktop
- Each card shows icon (top-left), arrow (top-right), label (bold), subtitle (muted)
- Hover on Email → purple glow on left side
- Hover on WhatsApp → green glow on left side
- Hover on LinkedIn → blue glow on left side
- Email link opens mail client
- WhatsApp link opens wa.me in new tab
- LinkedIn link opens profile in new tab
- Toggle language → texts switch PT/EN
- Mobile viewport → cards stack vertically

- [ ] **Step 2: Fix any visual issues found**

Adjust Tailwind classes if glow intensity, spacing, or sizing needs tweaking.

- [ ] **Step 3: Final commit if adjustments were made**

```bash
git add src/components/Contact.tsx
git commit -m "fix: polish contact card hover effect and spacing (CRIS-8)"
```
