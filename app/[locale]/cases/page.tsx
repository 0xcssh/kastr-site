import type { Metadata } from "next";
import { CaseHub, caseHubMeta } from "@/components/hunt/case-views";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

// Case letters by year (components/hunt/case-views.tsx).

export async function generateMetadata({ params }: PageProps<"/[locale]/cases">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({ locale, ...caseHubMeta(locale) });
}

export default async function Page({ params }: PageProps<"/[locale]/cases">) {
  return <CaseHub locale={(await params).locale as Locale} />;
}
