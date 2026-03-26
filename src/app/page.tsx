import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { CaseCard } from "@/components/CaseCard";
import { CasesCarousel } from "@/components/CasesCarousel";
import { MobileCasesCarousel } from "@/components/MobileCasesCarousel";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { cases } from "@/data/cases";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />

      <main>
        <Hero />

        {/* Cases */}
        <section id="cases" className="pt-10 pb-14 sm:pt-12 sm:pb-16 max-w-[1120px] mx-auto px-6 sm:px-10">
          <div className="mb-10">
            <span className="inline-block text-[13px] font-mono font-medium text-accent-2 tracking-[0.15em] uppercase mb-3">
              Cases
            </span>
            <h2 className="font-extrabold text-3xl sm:text-[32px] tracking-[-0.02em] text-text-primary">
              Projetos selecionados
            </h2>
          </div>

          {/* Desktop: Keoto destaque + carrossel dos 3 menores */}
          <div className="hidden md:block space-y-6">
            <CaseCard caseStudy={cases[0]} index={0} />
            <CasesCarousel cases={cases.slice(1)} />
          </div>

          {/* Mobile: todos os 4 cases em um único carrossel */}
          <div className="md:hidden">
            <MobileCasesCarousel cases={cases} />
          </div>
        </section>

        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <div className="section-divider" />
        </div>

        <About />

        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <div className="section-divider" />
        </div>

        <Contact />
      </main>

      <Footer />
    </>
  );
}
