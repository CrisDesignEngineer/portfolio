import { render, screen, fireEvent } from "@testing-library/react";
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
    Link2: MockIcon,
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
  Sidebar: ({
    sections,
    onSelect,
  }: {
    sections: { id: string; label: string }[];
    activeId: string;
    onSelect: (id: string) => void;
  }) => (
    <nav>
      {sections.map((s) => (
        <button key={s.id} onClick={() => onSelect(s.id)}>
          {s.label}
        </button>
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

  it("renders sidebar navigation buttons for all 7 sections", () => {
    render(<DesignSystemContent />);
    // Two sidebars (mobile + desktop) so buttons appear twice each
    expect(screen.getAllByRole("button", { name: "Colors" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Typography" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Spacing" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Icons" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Components" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Animations" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Tokens" })).toHaveLength(2);
  });

  it("renders Colors section by default with swatches", () => {
    render(<DesignSystemContent />);
    expect(screen.getByRole("heading", { level: 2, name: "Colors" })).toBeInTheDocument();
    expect(screen.getByText("--accent")).toBeInTheDocument();
    expect(screen.getByText("#bf5af2")).toBeInTheDocument();
  });

  it("switches to Typography section on click", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Typography" })[0]);
    expect(screen.getByRole("heading", { level: 2, name: "Typography" })).toBeInTheDocument();
    expect(screen.getByText("From Figma to code")).toBeInTheDocument();
  });

  it("switches to Icons section on click", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Icons" })[0]);
    expect(screen.getByRole("heading", { level: 2, name: "Icons" })).toBeInTheDocument();
    expect(screen.getByText("Award")).toBeInTheDocument();
    expect(screen.getByText("ArrowRight")).toBeInTheDocument();
  });

  it("switches to Tokens section on click", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Tokens" })[0]);
    expect(screen.getByRole("heading", { level: 2, name: "Design Tokens" })).toBeInTheDocument();
  });
});
