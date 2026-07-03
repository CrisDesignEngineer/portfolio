import { notFound } from "next/navigation";
import { cases } from "@/data/cases";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CaseContent } from "./CaseContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Use pt as the canonical list for static generation (ids are locale-agnostic)
const allCases = cases.pt;

export function generateStaticParams() {
  return allCases.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const caseStudy = allCases.find((c) => c.id === id);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.title} | Cristiano Carvalho`,
    description: caseStudy.subtitle,
  };
}

export default async function CasePage({ params }: PageProps) {
  const { id } = await params;
  const caseStudy = allCases.find((c) => c.id === id);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <Header />
      <CaseContent caseId={id} />
      <Footer />
    </>
  );
}
