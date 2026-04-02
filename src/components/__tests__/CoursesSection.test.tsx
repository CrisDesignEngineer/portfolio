import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CoursesSection } from "../CoursesSection";

vi.mock("framer-motion", () => ({
  motion: {
    a: ({ children, whileHover, transition, ...props }: any) => (
      <a {...props}>{children}</a>
    ),
    div: ({ children, whileInView, viewport, initial, transition, ...props }: any) => (
      <div {...props}>{children}</div>
    ),
  },
}));

vi.mock("@/i18n/LanguageContext", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        "courses.title": "Cursos & Certificados",
        "courses.viewCertificate": "Ver certificado",
      };
      return map[key] ?? key;
    },
    locale: "pt",
  }),
}));

describe("CoursesSection", () => {
  it("renders the section title", () => {
    render(<CoursesSection />);

    expect(screen.getByText("Cursos & Certificados")).toBeInTheDocument();
  });

  it("renders 3 course cards", () => {
    render(<CoursesSection />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });

  it("renders all course names from data", () => {
    render(<CoursesSection />);

    expect(screen.getByText("Design Engineer")).toBeInTheDocument();
    expect(screen.getByText("PRO FIGMA WEB | UI DESIGN")).toBeInTheDocument();
    expect(screen.getByText("UX design do zero")).toBeInTheDocument();
  });

  it("does not render a view-all button", () => {
    render(<CoursesSection />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
