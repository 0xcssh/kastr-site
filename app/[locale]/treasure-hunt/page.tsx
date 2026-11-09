import type { Metadata } from "next";
import { HuntHub, huntHubMeta } from "@/components/hunt/hunt-views";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

// Hub of the yearly lists (components/hunt/hunt-views.tsx).

export async function generateMetadata({ params }: PageProps<"/[locale]/treasure-hunt">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({ locale, ...huntHubMeta(locale, "th") });
}

export default async function Page({ params }: PageProps<"/[locale]/treasure-hunt">) {
  return <HuntHub locale={(await params).locale as Locale} rarity="th" />;
}
