import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { CasesSection } from "@/components/CasesSection";
import { About } from "@/components/About";
import { CoursesSection } from "@/components/CoursesSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />

      <main>
        <Hero />

        <CasesSection />

        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <div className="section-divider" />
        </div>

        <About />

        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <div className="section-divider" />
        </div>

        <CoursesSection />

        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <div className="section-divider" />
        </div>

        <Contact />
      </main>

      <Footer />
    </>
  );
}
