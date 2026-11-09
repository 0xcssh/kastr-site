import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HuntYear, huntYearMeta } from "@/components/hunt/hunt-views";
import { huntYears } from "@/lib/hunts";
import { locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

// One year's list, grouped by case (components/hunt/hunt-views.tsx).

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => huntYears("th").map((year) => ({ locale, year: String(year) })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/treasure-hunt/[year]">): Promise<Metadata> {
  const { locale, year } = await params;
  return pageMetadata({ locale: locale as Locale, ...huntYearMeta(locale as Locale, "th", Number(year)) });
}

export default async function Page({ params }: PageProps<"/[locale]/treasure-hunt/[year]">) {
  const { locale, year } = await params;
  if (!huntYears("th").includes(Number(year))) notFound();
  return <HuntYear locale={locale as Locale} rarity="th" year={Number(year)} />;
}
