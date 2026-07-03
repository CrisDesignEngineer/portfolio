import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider, LocaleFadeWrapper } from "@/i18n/LanguageContext";
import { MobileLanguageFab } from "@/components/MobileLanguageFab";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl = "https://portfolio-cristiano-iota.vercel.app";

export const metadata: Metadata = {
  title: "Cristiano Carvalho | Product Designer & Design Engineer",
  description:
    "Product Designer & Design Engineer com foco em SaaS B2B, Design Systems e interfaces escaláveis. Do Figma ao código em produção.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Cristiano Carvalho | Product Designer & Design Engineer",
    description:
      "Product Designer & Design Engineer. SaaS B2B, Design Systems e interfaces escaláveis.",
    type: "website",
    url: siteUrl,
    siteName: "Cristiano Carvalho",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cristiano Carvalho - Product Designer & Design Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristiano Carvalho | Product Designer & Design Engineer",
    description:
      "Product Designer & Design Engineer. SaaS B2B, Design Systems e interfaces escaláveis.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans">
        <LanguageProvider>
          <div className="bg-glow" />
          <LocaleFadeWrapper>
            <div className="relative z-10">
              {children}
            </div>
          </LocaleFadeWrapper>
          <MobileLanguageFab />
        </LanguageProvider>
      </body>
    </html>
  );
}
