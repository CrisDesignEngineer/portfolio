"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NeonButton } from "@/components/ui/neon-button";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-border glass bg-bg-primary/70"
          : "glass bg-bg-primary/30"
      }`}
    >
      <nav className="max-w-[1120px] mx-auto px-6 sm:px-10 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all duration-300 shrink-0"
        >
          <span className="text-text-primary font-semibold text-[15px] sm:text-[17px] tracking-tight whitespace-nowrap">
            Cristiano Carvalho
          </span>
          <span className="hidden sm:inline text-text-muted text-[13px] font-mono tracking-wide uppercase group-hover:text-[#3b82f6] transition-colors duration-300">
            Product Designer + Engineer
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {isHome ? (
            <>
              <a
                href="#cases"
                className="text-[14px] text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Cases
              </a>
              <a
                href="#sobre"
                className="text-[14px] text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Sobre
              </a>
              <a href="#contato">
                <NeonButton size="default" className="text-[14px] text-text-primary cursor-pointer">
                  Contato
                </NeonButton>
              </a>
            </>
          ) : (
            <Link
              href="/"
              className="text-[14px] text-text-secondary hover:text-text-primary transition-colors duration-200 flex items-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M8 2L3 7l5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Voltar
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span
            className={`block w-5 h-[2px] bg-text-primary transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-text-primary transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-text-primary transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-border">
          {isHome ? (
            <>
              <a
                href="#cases"
                onClick={() => setMenuOpen(false)}
                className="text-[15px] text-text-secondary hover:text-text-primary transition-colors duration-200 py-1"
              >
                Cases
              </a>
              <a
                href="#sobre"
                onClick={() => setMenuOpen(false)}
                className="text-[15px] text-text-secondary hover:text-text-primary transition-colors duration-200 py-1"
              >
                Sobre
              </a>
              <a
                href="#contato"
                onClick={() => setMenuOpen(false)}
                className="text-[15px] text-text-secondary hover:text-text-primary transition-colors duration-200 py-1"
              >
                Contato
              </a>
            </>
          ) : (
            <Link
              href="/"
              className="text-[15px] text-text-secondary hover:text-text-primary transition-colors duration-200 flex items-center gap-1.5 py-1"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M8 2L3 7l5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Voltar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
