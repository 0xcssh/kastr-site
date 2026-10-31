import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Barlow_Condensed, Geist } from "next/font/google";
import { config } from "@/lib/config";
import { getDict } from "@/lib/dictionaries";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0d0d0f",
  colorScheme: "dark",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(isLocale(locale) ? locale : "en");
  return {
    metadataBase: new URL(config.siteUrl),
    title: { default: d.meta.title, template: `%s · ${config.brand}` },
    description: d.meta.description,
    applicationName: config.brand,
    robots: { index: true, follow: true },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${barlow.variable} ${geist.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
