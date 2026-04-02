"use client";

import { FadeIn } from "./FadeIn";
import { CourseCard } from "./CourseCard";
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

    </section>
  );
}
