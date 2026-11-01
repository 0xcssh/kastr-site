import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Saira } from "next/font/google";
import { config } from "@/lib/config";
import { getDict } from "@/lib/dictionaries";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";

// Saira (SIL OFL) is the app's display face; its width axis is pushed to 125 for titles (CLAUDE.md §18 bis).
// Body text uses the system font, like the app's SF Pro.
const saira = Saira({ subsets: ["latin", "latin-ext"], axes: ["wdth"], variable: "--font-saira", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0e" },
    { media: "(prefers-color-scheme: light)", color: "#f3f3f5" },
  ],
  colorScheme: "dark light",
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
    <html lang={locale} className={saira.variable}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
