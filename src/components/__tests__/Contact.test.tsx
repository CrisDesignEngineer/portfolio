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
