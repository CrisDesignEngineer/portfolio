import type { Metadata } from "next";
import { Sora, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider, LocaleFadeWrapper } from "@/i18n/LanguageContext";
import { MobileLanguageFab } from "@/components/MobileLanguageFab";
import { TokenStyles } from "@/design-system/TokenStyles";
import { Analytics } from "@vercel/analytics/next";

// Display font — headings / titles
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

// Body font
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

// Monospace — eyebrows, labels, code
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = "https://portfolio-cristiano-iota.vercel.app";

export const metadata: Metadata = {
  title: "Cristiano Carvalho | Product Designer",
  description:
    "Product Designer com foco em SaaS B2B, Design Systems e interfaces escaláveis. Do Figma ao código em produção.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Cristiano Carvalho | Product Designer",
    description:
      "Product Designer com stack técnica completa. SaaS B2B, Design Systems e interfaces escaláveis.",
    type: "website",
    url: siteUrl,
    siteName: "Cristiano Carvalho",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cristiano Carvalho - Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristiano Carvalho | Product Designer",
    description:
      "Product Designer com stack técnica completa. SaaS B2B, Design Systems e interfaces escaláveis.",
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
    <html lang="pt-BR" className={`${sora.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} antialiased`}>
      <head>
        <TokenStyles />
      </head>
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
        <Analytics />
      </body>
    </html>
  );
}