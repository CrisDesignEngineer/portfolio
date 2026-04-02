import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CourseCard } from "../CourseCard";
import type { Course } from "@/data/courses";

vi.mock("framer-motion", () => ({
  motion: {
    a: ({ children, whileHover, transition, ...props }: any) => (
      <a {...props}>{children}</a>
    ),
  },
}));

vi.mock("@/i18n/LanguageContext", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        "courses.viewCertificate": "Ver certificado",
      };
      return map[key] ?? key;
    },
    locale: "pt",
  }),
}));

const mockCourse: Course = {
  id: "test-course",
  name: "Test Course",
  institution: "Test University",
  year: "2025",
  certificateUrl: "https://example.com/cert",
};

describe("CourseCard", () => {
  it("renders course name, institution and year", () => {
    render(<CourseCard course={mockCourse} />);

    expect(screen.getByText("Test Course")).toBeInTheDocument();
    expect(screen.getByText("Test University")).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();
  });

  it("links to the certificate URL in a new tab", () => {
    render(<CourseCard course={mockCourse} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com/cert");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows the view certificate text", () => {
    render(<CourseCard course={mockCourse} />);

    expect(screen.getByText("Ver certificado")).toBeInTheDocument();
  });
});
