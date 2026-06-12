import type { Metadata } from "next";
import { Inter, Space_Grotesk, Noto_Sans_Arabic } from "next/font/google";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "House of Software | Engineering the Future",
  description:
    "International software engineering company specializing in enterprise software, custom web applications, CRM, ERP, SaaS platforms, AI integrations, and digital transformation.",
  keywords: [
    "House of Software",
    "بيت البرمجيات",
    "enterprise software",
    "web development",
    "CRM",
    "ERP",
    "SaaS",
    "AI solutions",
    "digital transformation",
  ],
  authors: [{ name: "Mohamed Ehab", url: "https://houseofsw.com" }],
  openGraph: {
    title: "House of Software | Engineering the Future",
    description: "Premium enterprise software engineering for clients worldwide.",
    url: "https://houseofsw.com",
    siteName: "House of Software",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${notoSansArabic.variable} font-body antialiased bg-transparent text-platinum`}
      >
        <StructuredData />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
