import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DesignSystemContent } from "../DesignSystemContent";

vi.mock("framer-motion", () => ({
  motion: {
    a: ({ children, whileHover, transition, ...props }: any) => (
      <a {...props}>{children}</a>
    ),
    div: ({
      children,
      whileHover,
      whileInView,
      viewport,
      initial,
      animate,
      transition,
      ...props
    }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock("lucide-react", () => {
  const MockIcon = () => null;
  return {
    Award: MockIcon,
    ArrowRight: MockIcon,
    ArrowUpRight: MockIcon,
    Mail: MockIcon,
    Linkedin: MockIcon,
    Phone: MockIcon,
    Menu: MockIcon,
    X: MockIcon,
    ChevronLeft: MockIcon,
    ChevronRight: MockIcon,
    ExternalLink: MockIcon,
    Lock: MockIcon,
  };
});

vi.mock("../Sidebar", () => ({
  Sidebar: ({ sections }: { sections: { id: string; label: string }[] }) => (
    <nav>
      {sections.map((s) => (
        <a key={s.id} href={`#${s.id}`}>
          {s.label}
        </a>
      ))}
    </nav>
  ),
}));

vi.mock("@/i18n/LanguageContext", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    locale: "en",
  }),
}));

describe("DesignSystemContent", () => {
  it("renders the page title", () => {
    render(<DesignSystemContent />);
    expect(screen.getByRole("heading", { level: 1, name: "Design System" })).toBeInTheDocument();
  });

  it("renders all 7 section headings", () => {
    render(<DesignSystemContent />);
    expect(screen.getByRole("heading", { level: 2, name: "Colors" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Typography" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Spacing" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Icons" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Components" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Animations" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Design Tokens" })).toBeInTheDocument();
  });

  it("renders color swatches", () => {
    render(<DesignSystemContent />);
    // --accent appears in both ColorSection and TokensTableSection, so use getAllByText
    expect(screen.getAllByText("--accent").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("#bf5af2").length).toBeGreaterThanOrEqual(1);
  });

  it("renders typography specimens", () => {
    render(<DesignSystemContent />);
    expect(screen.getByText("From Figma to code")).toBeInTheDocument();
  });

  it("renders icon names", () => {
    render(<DesignSystemContent />);
    expect(screen.getByText("Award")).toBeInTheDocument();
    expect(screen.getByText("ArrowRight")).toBeInTheDocument();
  });

  it("renders sidebar navigation links", () => {
    render(<DesignSystemContent />);
    const colorLinks = screen.getAllByText("Colors");
    // One in sidebar, one as section heading
    expect(colorLinks.length).toBeGreaterThanOrEqual(2);
  });
});
