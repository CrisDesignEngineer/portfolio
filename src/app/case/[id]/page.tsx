import { notFound } from "next/navigation";
import { cases } from "@/data/cases";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CaseContent } from "./CaseContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return cases.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const caseStudy = cases.find((c) => c.id === id);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.title} | Cristiano Carvalho`,
    description: caseStudy.subtitle,
  };
}

export default async function CasePage({ params }: PageProps) {
  const { id } = await params;
  const caseStudy = cases.find((c) => c.id === id);

  if (!caseStudy) {
    notFound();
  }

  const currentIndex = cases.findIndex((c) => c.id === id);
  const nextCase = cases[(currentIndex + 1) % cases.length];

  return (
    <>
      <Header />
      <CaseContent caseStudy={caseStudy} nextCase={nextCase} />
      <Footer />
    </>
  );
}
