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
  useMotionValue: () => ({ get: () => 0, set: () => {} }),
  animate: () => ({ stop: () => {} }),
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
    RotateCcw: MockIcon,
  };
});

vi.mock("react-use-measure", () => ({
  default: () => [() => {}, { width: 500, height: 50 }],
}));

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

vi.mock("@/components/CaseCard", () => ({
  CaseCard: ({ caseStudy }: any) => (
    <div data-testid="case-card">{caseStudy.title}</div>
  ),
}));

vi.mock("@/components/FadeIn", () => ({
  FadeIn: ({ children }: any) => <div>{children}</div>,
}));

describe("DesignSystemContent", () => {
  it("renders the page title", () => {
    render(<DesignSystemContent />);
    expect(screen.getByRole("heading", { level: 1, name: "Design System" })).toBeInTheDocument();
  });

  it("renders sidebar navigation buttons for all 8 sections", () => {
    render(<DesignSystemContent />);
    expect(screen.getAllByRole("button", { name: "Colors" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Typography" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Spacing" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Icons" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Components" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Animations" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Tokens" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Playground" })).toHaveLength(2);
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

  it("switches to Spacing section on click", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Spacing" })[0]);
    expect(screen.getByRole("heading", { level: 2, name: "Spacing" })).toBeInTheDocument();
    expect(screen.getByText("gap-4 / 16px")).toBeInTheDocument();
    expect(screen.getByText("mb-6 / 24px")).toBeInTheDocument();
  });

  it("switches to Icons section on click", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Icons" })[0]);
    expect(screen.getByRole("heading", { level: 2, name: "Icons" })).toBeInTheDocument();
    expect(screen.getByText("Award")).toBeInTheDocument();
    expect(screen.getByText("ArrowRight")).toBeInTheDocument();
  });

  it("switches to Components section on click", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Components" })[0]);
    expect(screen.getByRole("heading", { level: 2, name: "Components" })).toBeInTheDocument();
    expect(screen.getByText("Neon Default")).toBeInTheDocument();
    expect(screen.getByTestId("case-card")).toBeInTheDocument();
  });

  it("switches to Animations section on click", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Animations" })[0]);
    expect(screen.getByRole("heading", { level: 2, name: "Animations" })).toBeInTheDocument();
    expect(screen.getByText("FadeIn Up")).toBeInTheDocument();
    expect(screen.getByText("Breathe Glow — Background pulse")).toBeInTheDocument();
  });

  it("switches to Tokens section on click", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Tokens" })[0]);
    expect(screen.getByRole("heading", { level: 2, name: "Design Tokens" })).toBeInTheDocument();
  });

  it("switches to Playground section on click", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Playground" })[0]);
    expect(screen.getByRole("heading", { level: 2, name: "Playground" })).toBeInTheDocument();
    expect(screen.getByText("Preview Card")).toBeInTheDocument();
  });

  it("renders Playground control tabs", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Playground" })[0]);
    // Playground internal tabs (Colors/Typography/Spacing appear in sidebar too, so 3 each)
    expect(screen.getAllByText("Colors")).toHaveLength(3);
    expect(screen.getAllByText("Typography")).toHaveLength(3);
    expect(screen.getAllByText("Spacing")).toHaveLength(3);
    // Transitions only exists in Playground tabs
    expect(screen.getByText("Transitions")).toBeInTheDocument();
  });

  it("renders Playground reset button with aria-label", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Playground" })[0]);
    expect(screen.getByRole("button", { name: "Reset to defaults" })).toBeInTheDocument();
  });

  it("renders preview card content in Playground", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Playground" })[0]);
    expect(screen.getByText("Preview Card")).toBeInTheDocument();
    expect(screen.getByText("Neon Button")).toBeInTheDocument();
    expect(screen.getByText("DESIGN SYSTEM")).toBeInTheDocument();
  });

  it("switches Playground internal tabs", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Playground" })[0]);
    // Default tab is Colors — verify Backgrounds heading from ColorsTab
    expect(screen.getByRole("heading", { level: 4, name: "Backgrounds" })).toBeInTheDocument();
    // Switch to Spacing tab
    fireEvent.click(screen.getByRole("tab", { name: "Spacing" }));
    // Spacing controls should appear (gap/padding labels)
    expect(screen.getByLabelText(/Gap:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Padding:/)).toBeInTheDocument();
    // Backgrounds heading from Colors tab should be gone
    expect(screen.queryByRole("heading", { level: 4, name: "Backgrounds" })).not.toBeInTheDocument();
  });

  it("resets Playground values to defaults", () => {
    render(<DesignSystemContent />);
    fireEvent.click(screen.getAllByRole("button", { name: "Playground" })[0]);
    // Switch to Spacing tab and change gap value
    fireEvent.click(screen.getByRole("tab", { name: "Spacing" }));
    const gapInput = screen.getByLabelText(/Gap:/) as HTMLInputElement;
    fireEvent.change(gapInput, { target: { value: "48" } });
    expect(gapInput.value).toBe("48");
    // Click reset
    fireEvent.click(screen.getByRole("button", { name: "Reset to defaults" }));
    // Gap should return to default (16)
    expect(gapInput.value).toBe("16");
  });
});
