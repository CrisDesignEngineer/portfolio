"use client";

import { Mail, ArrowRight } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { useTranslation } from "@/i18n/LanguageContext";
import type { ReactNode } from "react";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface ContactItem {
  icon: ReactNode;
  label: string;
  subtitle: string;
  href: string;
  external?: boolean;
  glowColor: string;
  ariaLabel: string;
}

export function Contact() {
  const { t } = useTranslation();

  const contacts: ContactItem[] = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: t("contact.email"),
      subtitle: "design.cristianocarvalho@gmail.com",
      href: "mailto:design.cristianocarvalho@gmail.com",
      glowColor: "before:bg-[#8B5CF6]",
      ariaLabel: t("contact.email"),
    },
    {
      icon: <WhatsAppIcon className="w-5 h-5" />,
      label: t("contact.whatsapp"),
      subtitle: t("contact.whatsappSub"),
      href: "https://wa.me/5511977266408",
      external: true,
      glowColor: "before:bg-[#25D366]",
      ariaLabel: t("contact.whatsapp"),
    },
    {
      icon: <LinkedinIcon className="w-5 h-5" />,
      label: t("contact.linkedin"),
      subtitle: t("contact.linkedinSub"),
      href: "https://www.linkedin.com/in/design-cristiano-carvalho/",
      external: true,
      glowColor: "before:bg-[#0A66C2]",
      ariaLabel: t("contact.linkedin"),
    },
  ];

  return (
    <section
      id="contato"
      className="py-14 sm:py-16 max-w-[1120px] mx-auto px-6 sm:px-10"
    >
      <div className="max-w-2xl mb-10">
        <FadeIn>
          <span className="inline-block text-[13px] font-mono font-medium text-accent-4 tracking-[0.15em] uppercase mb-3">
            {t("contact.label")}
          </span>
          <h2 className="font-extrabold text-3xl sm:text-[32px] tracking-[-0.02em] mb-3">
            {t("contact.title")}
          </h2>
          <p className="text-text-secondary text-[15px] leading-[1.7]">
            {t("contact.description")}
          </p>
        </FadeIn>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {contacts.map((contact, i) => (
          <FadeIn key={contact.label} delay={i * 0.08}>
            <a
              href={contact.href}
              aria-label={contact.ariaLabel}
              {...(contact.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`group relative flex flex-col justify-between p-6 rounded-2xl border border-border bg-bg-card hover:border-border-hover hover:bg-bg-card-hover transition-all duration-500 h-full overflow-hidden before:absolute before:inset-y-0 before:left-0 before:w-1/3 before:opacity-0 before:blur-2xl before:transition-opacity before:duration-500 hover:before:opacity-20 ${contact.glowColor}`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-text-muted">{contact.icon}</span>
                <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors duration-300" />
              </div>
              <div>
                <p className="text-text-primary text-[15px] font-semibold mb-1">
                  {contact.label}
                </p>
                <p className="text-text-muted text-[13px]">
                  {contact.subtitle}
                </p>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
