import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cristiano Carvalho | Product Designer",
  description:
    "Product Designer com foco em SaaS B2B e sistemas complexos. Transformo complexidade em clareza estrutural.",
  openGraph: {
    title: "Cristiano Carvalho | Product Designer",
    description:
      "Product Designer com foco em SaaS B2B e sistemas complexos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans">
        <div className="bg-glow" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
