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
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-5/10">
          <Award className="w-5 h-5 text-accent-5" />
        </div>
        <span className="text-xs font-mono font-medium text-text-secondary px-2.5 py-1 rounded-full border border-border">
          {course.year}
        </span>
      </div>

      <h3 className="font-bold text-base text-text-primary mb-1 leading-tight">
        {course.name}
      </h3>
      <p className="text-sm text-text-secondary">{course.institution}</p>

      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-5 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        {t("courses.viewCertificate")}
        <ArrowRight className="w-4 h-4" />
      </div>
    </motion.a>
  );
}
