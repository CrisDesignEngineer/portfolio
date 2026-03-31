"use client";

import { FadeIn } from "./FadeIn";
import { useTranslation } from "@/i18n/LanguageContext";

export function Contact() {
  const { t } = useTranslation();

  const contacts = [
    {
      label: t("contact.email") as string,
      value: "design.cristianocarvalho@gmail.com",
      href: "mailto:design.cristianocarvalho@gmail.com",
      display: (
        <>
          design.cristianocarvalho
          <br />
          @gmail.com
        </>
      ),
      color: "group-hover:text-accent-2",
    },
    {
      label: t("contact.linkedin") as string,
      value: "/design-cristiano-carvalho",
      href: "https://www.linkedin.com/in/design-cristiano-carvalho/",
      display: "/design-cristiano-carvalho",
      external: true,
      color: "group-hover:text-accent-3",
    },
    {
      label: t("contact.phone") as string,
      value: "+55 (11) 97726-6408",
      href: "tel:+5511977266408",
      display: "+55 (11) 97726-6408",
      color: "group-hover:text-accent-4",
    },
  ];

  return (
    <section id="contato" className="py-14 sm:py-16 max-w-[1120px] mx-auto px-6 sm:px-10">
      <div className="max-w-2xl mb-10">
        <FadeIn>
          <span className="inline-block text-[13px] font-mono font-medium text-accent-4 tracking-[0.15em] uppercase mb-3">
            {t("contact.label") as string}
          </span>
          <h2 className="font-extrabold text-3xl sm:text-[32px] tracking-[-0.02em] mb-3">
            {t("contact.title") as string}
          </h2>
          <p className="text-text-secondary text-[15px] leading-[1.7]">
            {t("contact.description") as string}
          </p>
        </FadeIn>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {contacts.map((contact, i) => (
          <FadeIn key={contact.label} delay={i * 0.08}>
            <a
              href={contact.href}
              {...(contact.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex flex-col justify-between p-6 rounded-2xl border border-border bg-bg-card hover:border-border-hover hover:bg-bg-card-hover transition-all duration-500 h-full"
            >
              <p className="text-text-muted text-[11px] font-mono uppercase tracking-[0.15em] mb-4">
                {contact.label}
              </p>
              <p className={`text-text-primary text-[14px] font-medium ${contact.color} transition-colors duration-300`}>
                {contact.display}
              </p>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
