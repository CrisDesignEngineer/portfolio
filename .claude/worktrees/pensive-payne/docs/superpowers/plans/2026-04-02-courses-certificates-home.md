# Courses & Certificates Home Section — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Cursos & Certificados" section to the home page between About and Contact, displaying 3 course cards with hover animations.

**Architecture:** New data file (`courses.ts`) with bilingual course data, a `CourseCard` client component with Framer Motion hover animation, and a `CoursesSection` component that renders the grid. Translations added to existing locale files.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion, lucide-react (Award icon), existing i18n Context system.

**Spec:** `docs/superpowers/specs/2026-04-02-courses-certificates-home-design.md`

---

### Task 1: Course Data File

**Files:**
- Create: `src/data/courses.ts`

- [ ] **Step 1: Create the data file with interface and bilingual data**

```typescript
export interface Course {
  id: string;
  name: string;
  institution: string;
  year: string;
  certificateUrl: string;
}

export const courses: Record<"pt" | "en", Course[]> = {
  pt: [
    {
      id: "design-engineer",
      name: "Design Engineer",
      institution: "UX Unicórnio",
      year: "2026",
      certificateUrl:
        "https://drive.google.com/file/d/1OQpGPPt7ms-tvnWRmmUjc_ih6FD1S4Xg/view",
    },
    {
      id: "pro-figma-web",
      name: "PRO FIGMA WEB | UI DESIGN",
      institution: "Udemy",
      year: "2024",
      certificateUrl:
        "https://www.udemy.com/certificate/UC-9febb7e0-bf84-4947-9993-78ebef3ef49e/",
    },
    {
      id: "ux-design-do-zero",
      name: "UX design do zero",
      institution: "Mentorama",
      year: "2022",
      certificateUrl:
        "https://drive.google.com/file/d/1CsNHtFQhZs5dktGgzvAYyIULNtyFI-DN/view",
    },
  ],
  en: [
    {
      id: "design-engineer",
      name: "Design Engineer",
      institution: "UX Unicórnio",
      year: "2026",
      certificateUrl:
        "https://drive.google.com/file/d/1OQpGPPt7ms-tvnWRmmUjc_ih6FD1S4Xg/view",
    },
    {
      id: "pro-figma-web",
      name: "PRO FIGMA WEB | UI DESIGN",
      institution: "Udemy",
      year: "2024",
      certificateUrl:
        "https://www.udemy.com/certificate/UC-9febb7e0-bf84-4947-9993-78ebef3ef49e/",
    },
    {
      id: "ux-design-do-zero",
      name: "UX Design from Scratch",
      institution: "Mentorama",
      year: "2022",
      certificateUrl:
        "https://drive.google.com/file/d/1CsNHtFQhZs5dktGgzvAYyIULNtyFI-DN/view",
    },
  ],
};
```

- [ ] **Step 2: Commit**

```bash
git add src/data/courses.ts
git commit -m "feat(courses): add bilingual course data (CRIS-6)"
```

---

### Task 2: Add i18n Translation Keys

**Files:**
- Modify: `src/i18n/locales/pt.json`
- Modify: `src/i18n/locales/en.json`

- [ ] **Step 1: Add Portuguese translations**

Add the following keys to `pt.json` after the `"about"` section:

```json
"courses": {
  "title": "Cursos & Certificados",
  "viewCertificate": "Ver certificado",
  "viewAll": "Ver todos os certificados"
}
```

- [ ] **Step 2: Add English translations**

Add the following keys to `en.json` after the `"about"` section:

```json
"courses": {
  "title": "Courses & Certificates",
  "viewCertificate": "View certificate",
  "viewAll": "View all certificates"
}
```

- [ ] **Step 3: Commit**

```bash
git add src/i18n/locales/pt.json src/i18n/locales/en.json
git commit -m "feat(i18n): add courses section translations (CRIS-6)"
```

---

### Task 3: CourseCard Component

**Files:**
- Create: `src/components/CourseCard.tsx`

- [ ] **Step 1: Create the CourseCard component**

```tsx
"use client";

import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import type { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { t } = useTranslation();

  return (
    <motion.a
      href={course.certificateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-border bg-bg-card p-6 transition-colors duration-300 hover:border-border-hover hover:bg-bg-card-hover"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
          <Award className="w-5 h-5 text-accent" />
        </div>
        <span className="text-xs font-mono font-medium text-text-secondary px-2.5 py-1 rounded-full border border-border">
          {course.year}
        </span>
      </div>

      <h3 className="font-bold text-base text-text-primary mb-1 leading-tight">
        {course.name}
      </h3>
      <p className="text-sm text-text-secondary">{course.institution}</p>

      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        {t("courses.viewCertificate")}
        <ArrowRight className="w-4 h-4" />
      </div>
    </motion.a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CourseCard.tsx
git commit -m "feat(courses): add CourseCard component with hover animation (CRIS-6)"
```

---

### Task 4: CoursesSection Component

**Files:**
- Create: `src/components/CoursesSection.tsx`

- [ ] **Step 1: Create the CoursesSection component**

```tsx
"use client";

import { FadeIn } from "./FadeIn";
import { CourseCard } from "./CourseCard";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import { courses } from "@/data/courses";

export function CoursesSection() {
  const { t, locale } = useTranslation();
  const localeCourses = courses[locale as "pt" | "en"] ?? courses.pt;

  return (
    <section className="py-14 sm:py-16 max-w-[1120px] mx-auto px-6 sm:px-10">
      <FadeIn>
        <h2 className="font-extrabold text-3xl sm:text-[32px] tracking-[-0.02em] mb-10 text-center leading-[1.2]">
          {t("courses.title")}
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localeCourses.map((course, index) => (
          <FadeIn key={course.id} delay={index * 0.1}>
            <CourseCard course={course} />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <div className="flex justify-center mt-10">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-text-primary rounded-full border border-border transition-all duration-300 hover:border-border-hover hover:bg-bg-card-hover"
          >
            {t("courses.viewAll")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </FadeIn>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CoursesSection.tsx
git commit -m "feat(courses): add CoursesSection grid layout (CRIS-6)"
```

---

### Task 5: Integrate into Home Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add import and section to page.tsx**

Add import at the top with the other imports:

```typescript
import { CoursesSection } from "@/components/CoursesSection";
```

Add the section between `<About />` and `<Contact />`, following the existing divider pattern:

```tsx
        <About />

        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <div className="section-divider" />
        </div>

        <CoursesSection />

        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <div className="section-divider" />
        </div>

        <Contact />
```

Note: The existing divider before `<Contact />` stays. A new divider is added between `<About />` and `<CoursesSection />`.

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(courses): integrate section into home page (CRIS-6)"
```

---

### Task 6: Visual Verification

- [ ] **Step 1: Start dev server and verify**

```bash
npm run dev
```

Check the following in browser at `http://localhost:3000`:

1. Section appears between About and Contact with dividers
2. Title "Cursos & Certificados" is centered
3. Grid shows 3 cards in desktop (3 cols), 2 in tablet (md), 1 in mobile
4. Each card shows: Award icon (top-left), year badge (top-right), course name (bold), institution
5. Hover on card: slight scale up, "Ver certificado →" fades in
6. Click opens certificate URL in new tab
7. Toggle language to EN: title changes to "Courses & Certificates", hover text changes
8. "Ver todos os certificados" button renders centered below grid (no link target yet)

- [ ] **Step 2: Final commit if any adjustments needed**

```bash
git add -A
git commit -m "fix(courses): visual adjustments after review (CRIS-6)"
```
