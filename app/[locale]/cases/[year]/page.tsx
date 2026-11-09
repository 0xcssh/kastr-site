import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseYear, caseYearMeta } from "@/components/hunt/case-views";
import { caseYears } from "@/lib/hunts";
import { locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

// One year's cases A to Q with the TH and STH of each (components/hunt/case-views.tsx).

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => caseYears().map((year) => ({ locale, year: String(year) })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/cases/[year]">): Promise<Metadata> {
  const { locale, year } = await params;
  return pageMetadata({ locale: locale as Locale, ...caseYearMeta(locale as Locale, Number(year)) });
}

export default async function Page({ params }: PageProps<"/[locale]/cases/[year]">) {
  const { locale, year } = await params;
  if (!caseYears().includes(Number(year))) notFound();
  return <CaseYear locale={locale as Locale} year={Number(year)} />;
}
