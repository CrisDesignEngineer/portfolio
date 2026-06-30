"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/i18n/LanguageContext";
import { cases } from "@/data/cases";
import "./case.css";

interface CaseContentProps {
  caseId: string;
}

// Per-case highlight color, drawn from the existing design palette tokens.
const accentByCase: Record<string, string> = {
  "saas-platform": "var(--violet)",
  vivara: "var(--magenta)",
  leiteiro: "var(--cyan)",
  honda: "var(--green)",
};

export function CaseContent({ caseId }: CaseContentProps) {
  const { t, locale, toggleLocale } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; caption?: string } | null>(null);

  // Close the image lightbox on Escape and lock background scroll while it's open
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  const localizedCases = cases[locale];
  const caseIndex = localizedCases.findIndex((c) => c.id === caseId);
  const caseStudy = caseIndex === -1 ? null : localizedCases[caseIndex];
  const nextCase = caseStudy ? localizedCases[(caseIndex + 1) % localizedCases.length] : null;

  const hasGallery = !!caseStudy?.systemInAction;

  // Sections present in this case (drives the TOC + active-section tracking)
  const sections: { id: string; label: string }[] = caseStudy
    ? [
        { id: "overview", label: t("caseDetail.overview") },
        { id: "desafios", label: t("caseDetail.challenges") },
        ...(hasGallery ? [{ id: "sistema", label: t("caseDetail.systemInAction") }] : []),
        { id: "processo", label: t("caseDetail.process") },
        { id: "resultados", label: t("caseDetail.results") },
        { id: "aprendizados", label: t("caseDetail.learnings") },
      ]
    : [];

  useEffect(() => {
    if (!caseStudy) return;
    const root = rootRef.current;
    if (!root) return;

    const sectionEls = sections.map((s) => document.getElementById(s.id));
    const tocLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>(".toc a"));
    const progress = progressRef.current;

    let ticking = false;
    const onScroll = () => {
      const h = document.documentElement;
      const sc = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      if (progress) progress.style.width = (max > 0 ? (sc / max) * 100 : 0) + "%";

      const mid = sc + window.innerHeight * 0.35;
      let active = 0;
      sectionEls.forEach((el, i) => {
        if (el && el.offsetTop <= mid) active = i;
      });
      tocLinks.forEach((a, i) => a.classList.toggle("active", i === active));
    };
    const onScrollThrottled = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScrollThrottled, { passive: true });
    onScroll();

    // Activate tour-items (frame entrance + annotations) as they enter the viewport
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.target.classList.toggle("in", e.isIntersecting && e.intersectionRatio > 0.18);
        });
      },
      { threshold: [0, 0.18, 0.5] }
    );
    root.querySelectorAll(".tour-item").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScrollThrottled);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseStudy, locale]);

  if (!caseStudy || !nextCase) return null;

  const arrow = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
  const lock = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );

  const accentVar = accentByCase[caseStudy.id] ?? "var(--violet)";
  const nextAccentVar = accentByCase[nextCase.id] ?? "var(--magenta)";

  // Each screenshot is a compact thumbnail (click to expand) with its caption directly below —
  // keeps everything aligned to the content column instead of floating in an empty grid cell.
  const renderImage = (img: {
    src: string;
    width: number;
    height: number;
    caption?: string;
    kicker?: string;
  }) => (
    <figure className="case-shot reveal">
      <button
        type="button"
        className="exhibit-trigger"
        onClick={() => setLightbox({ src: img.src, caption: img.caption })}
        aria-label={locale === "pt" ? "Ampliar imagem" : "Expand image"}
      >
        <div className="frame-wrap">
          <div className="frame">
            <div className="bardots">
              <i />
              <i />
              <i />
              <span className="barpill" />
            </div>
            <div className="shotview">
              <Image
                className="shot"
                src={img.src}
                alt={img.caption ?? caseStudy.title}
                width={img.width}
                height={img.height}
                sizes="(max-width: 900px) 80vw, 360px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <span className="exhibit-zoom" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
          </svg>
        </span>
      </button>
      <figcaption className="case-shot-cap">
        {img.kicker && <span className="exhibit-kicker">{img.kicker}</span>}
        {img.caption && <p>{img.caption}</p>}
      </figcaption>
    </figure>
  );

  return (
    <div className="casepage" ref={rootRef} style={{ "--accent": accentVar } as CSSProperties}>
      <div className="progress" ref={progressRef} />

      {/* TOPBAR */}
      <header className="topbar">
        <div className="row">
          <Link className="brand" href="/">
            <b>Cristiano Carvalho</b>
            <span>Product Designer</span>
          </Link>
          <div className="top-right">
            <Link className="back" href="/">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              {t("caseDetail.back")}
            </Link>
            <div className="lang">
              <button
                type="button"
                className={`seg${locale === "pt" ? " on" : ""}`}
                onClick={() => locale !== "pt" && toggleLocale()}
              >
                PT
              </button>
              <button
                type="button"
                className={`seg${locale === "en" ? " on" : ""}`}
                onClick={() => locale !== "en" && toggleLocale()}
              >
                EN
              </button>
            </div>
            <div className="avatar">CC</div>
          </div>
        </div>
      </header>

      {/* SECTION NAV */}
      <nav className="toc">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            <span className="lbl">{s.label}</span>
            <span className="dot" />
          </a>
        ))}
      </nav>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="wrap">
            <div className="tags reveal">
              <span className="tag accent">{caseStudy.tag}</span>
              <span className="tag">{caseStudy.year}</span>
              {caseStudy.confidential && (
                <span className="tag lock">
                  {lock}
                  {t("cases.confidential")}
                </span>
              )}
            </div>
            <h1 className="title reveal">{caseStudy.title}</h1>
            <p className="subtitle reveal">{caseStudy.subtitle}</p>

            <div className="hero-media reveal">
              {caseStudy.confidential ? (
                <>
                  <div className="blurart" />
                  <div className="grain" />
                  <div className="lockchip">
                    {lock}
                    {t("caseDetail.confidentialContent")}
                  </div>
                </>
              ) : (
                caseStudy.image && (
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    fill
                    priority
                    sizes="(max-width: 1180px) 100vw, 1180px"
                    className="heroimg"
                  />
                )
              )}
            </div>

            <div className="meta reveal">
              <div>
                <div className="k">{t("caseDetail.role")}</div>
                <div className="v">{caseStudy.role}</div>
              </div>
              <div>
                <div className="k">{t("caseDetail.duration")}</div>
                <div className="v">{caseStudy.duration}</div>
              </div>
              <div>
                <div className="k">{t("caseDetail.scope")}</div>
                <div className="v">{caseStudy.scope}</div>
              </div>
            </div>
          </div>
        </section>

        {/* VISÃO GERAL */}
        <section className="block" id="overview">
          <div className="wrap">
            <div className="eyebrow reveal">{t("caseDetail.overview")}</div>
            <p className="lead reveal">{caseStudy.overview}</p>
            {caseStudy.contextImage && renderImage(caseStudy.contextImage)}
          </div>
        </section>

        {/* DESAFIOS */}
        <section className="block" id="desafios" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="reveal">{t("caseDetail.challenges")}</h2>
            <div className="challenges reveal">
              {caseStudy.challenges.map((c, i) => (
                <div className="challenge" key={i}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <p>{c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* O SISTEMA EM AÇÃO */}
        {caseStudy.systemInAction && (
          <section id="sistema">
            <div className="tour-intro">
              <div className="eyebrow reveal">{t("caseDetail.systemInAction")}</div>
              <h2 className="reveal" style={{ maxWidth: "20ch" }}>
                {caseStudy.systemInAction.title}
              </h2>
              <p className="lead reveal">{caseStudy.systemInAction.intro}</p>
              <div className="tour-meta reveal">
                {caseStudy.systemInAction.meta.map((m, i) => (
                  <span key={i}>
                    <b>{m.value}</b> {m.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="tour">
              {caseStudy.systemInAction.shots.map((shot, i) => (
                <div className="tour-item" key={i}>
                  <div className="cap-col reveal">
                    <div className="chapter">
                      <span className="idx">{shot.idx}</span>
                      <span className="kind">{shot.kind}</span>
                    </div>
                    <h3>{shot.title}</h3>
                    <p>{shot.description}</p>
                    <div className="cap-tags">
                      {shot.tags.map((tag, j) => (
                        <span className="t" key={j}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="frame-col">
                    <div className="frame-wrap">
                      <div className="frame">
                        <div className="bardots">
                          <i />
                          <i />
                          <i />
                          <span className="barpill" />
                        </div>
                        <div className="shotview">
                          <Image
                            className="shot"
                            src={shot.images[0]}
                            alt={shot.title}
                            width={shot.width}
                            height={shot.height}
                            sizes="(max-width: 900px) 100vw, 600px"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {shot.variant === "dual" && shot.images[1] && (
                        <div
                          className="frame"
                          style={{
                            position: "absolute",
                            width: "52%",
                            right: -22,
                            bottom: -34,
                            boxShadow: "0 34px 64px -28px rgba(0,0,0,.85)",
                            zIndex: 6,
                          }}
                        >
                          <div className="bardots" style={{ padding: "8px 11px" }}>
                            <i />
                            <i />
                            <i />
                          </div>
                          <div className="shotview">
                            <Image
                              className="shot"
                              src={shot.images[1]}
                              alt={`${shot.title} — dark`}
                              width={shot.width}
                              height={shot.height}
                              sizes="(max-width: 900px) 60vw, 320px"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      )}

                      {shot.variant === "legend" && shot.legend && (
                        <div className="legend">
                          <div className="lt">{locale === "pt" ? "Semântica de cor" : "Color semantics"}</div>
                          {shot.legend.map((l, j) => (
                            <div className="lr" key={j}>
                              <span className="sw" style={{ background: l.color }} />
                              {l.label}
                            </div>
                          ))}
                        </div>
                      )}

                      {shot.annotations?.map((a, j) => {
                        const style: Record<string, string> = {};
                        a.style.split(";").forEach((decl) => {
                          const [k, v] = decl.split(":");
                          if (k && v) style[k.trim()] = v.trim();
                        });
                        return (
                          <div className={`anno${a.side === "right" ? " right" : ""}`} key={j} style={style}>
                            <span className="pin" />
                            <span className="lab">{a.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROCESSO */}
        <section className="block" id="processo">
          <div className="wrap">
            <div className="eyebrow reveal">{t("caseDetail.process")}</div>
            <h2 className="reveal">{locale === "pt" ? "Da pesquisa à governança" : "From research to governance"}</h2>
            <div className="timeline reveal">
              {caseStudy.process.map((step, i) => {
                const num = String(i + 1).padStart(2, "0");
                const heading = step.headline ?? step.title;
                const label = step.headline ? `${num} — ${step.title}` : num;
                return (
                  <div className="step" key={i}>
                    <div className="st">{label}</div>
                    <h4>{heading}</h4>
                    {step.description.split("\n\n").map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                    {step.bullets && (
                      <ul className="step-list">
                        {step.bullets.map((b, j) => (
                          <li key={j}>
                            {b.label && <strong>{b.label}:</strong>} {b.text}
                          </li>
                        ))}
                      </ul>
                    )}
                    {step.image && renderImage(step.image)}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* RESULTADOS */}
        <section className="block" id="resultados" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="reveal">{t("caseDetail.results")}</h2>
            {caseStudy.resultsIntro && (
              <p className="lead reveal" style={{ marginBottom: 24 }}>
                {caseStudy.resultsIntro}
              </p>
            )}
            {caseStudy.metrics ? (
              <div
                className="results reveal"
                style={{ "--cols": caseStudy.metrics.length } as CSSProperties}
              >
                {caseStudy.metrics.map((m, i) => (
                  <div className="stat" key={i}>
                    <div className="snum">
                      {m.value}
                      {m.sup && <span className="sup">{m.sup}</span>}
                    </div>
                    <div className="sunit">{m.unit}</div>
                    <div className="slabel">{m.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="challenges reveal">
                {caseStudy.results.map((r, i) => (
                  <div className="challenge" key={i}>
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <p>
                      <strong style={{ color: "var(--text)", fontWeight: 600 }}>{r.title}</strong>
                      {" — "}
                      {r.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* APRENDIZADOS + CTA */}
        <section className="block" id="aprendizados" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="reveal">{t("caseDetail.learnings")}</h2>
            <p className="lead reveal" style={{ marginBottom: 34 }}>
              {caseStudy.learnings}
            </p>

            {caseStudy.cta && (
              <div className="cta reveal">
                <h3>{caseStudy.cta.title}</h3>
                <p>{caseStudy.cta.description}</p>
                <a className="btn-pri" href={caseStudy.cta.linkUrl} target="_blank" rel="noopener noreferrer">
                  {caseStudy.cta.linkLabel}
                  {arrow}
                </a>
              </div>
            )}
          </div>
        </section>

        {/* NEXT CASE */}
        <section className="nextcase" style={{ "--accent": nextAccentVar } as CSSProperties}>
          <div className="wide">
            <Link className="nextlink" href={`/case/${nextCase.id}`}>
              <div>
                <div className="nk">{t("caseDetail.nextCase")}</div>
                <div className="ntags">
                  <span className="tag accent">{nextCase.tag}</span>
                  <span className="tag">{nextCase.year}</span>
                </div>
                <h3>{nextCase.title}</h3>
                <p>{nextCase.subtitle}</p>
              </div>
              <div className="arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <footer>
        <div className="row">
          <span className="avail">
            <span className="d" />
            {t("caseDetail.available")}
          </span>
          <span>© 2026 Cristiano Carvalho</span>
        </div>
      </footer>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label={locale === "pt" ? "Fechar" : "Close"}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lightbox-img"
            src={lightbox.src}
            alt={lightbox.caption ?? caseStudy.title}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
