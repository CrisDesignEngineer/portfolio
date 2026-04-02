import type { Metadata } from "next";
import { DesignSystemContent } from "./DesignSystemContent";

export const metadata: Metadata = {
  title: "Design System | Cristiano Carvalho",
  description:
    "The visual language, tokens, and components behind this portfolio.",
};

export default function DesignSystemPage() {
  return <DesignSystemContent />;
}
