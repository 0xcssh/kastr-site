import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HuntCar, huntCarMeta } from "@/components/hunt/hunt-views";
import { findHunt, huntsOf } from "@/lib/hunts";
import { locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

// One hunted car (components/hunt/hunt-views.tsx).

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => huntsOf("th").map((h) => ({ locale, year: String(h.year), slug: h.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/treasure-hunt/[year]/[slug]">): Promise<Metadata> {
  const { locale, year, slug } = await params;
  const hunt = findHunt("th", Number(year), slug);
  if (!hunt) return {};
  return pageMetadata({ locale: locale as Locale, ...huntCarMeta(locale as Locale, hunt) });
}

export default async function Page({ params }: PageProps<"/[locale]/treasure-hunt/[year]/[slug]">) {
  const { locale, year, slug } = await params;
  const hunt = findHunt("th", Number(year), slug);
  if (!hunt) notFound();
  return <HuntCar locale={locale as Locale} hunt={hunt} />;
}
