import type { Metadata } from "next";
import { config } from "@/lib/config";
import { alternatesFor, localeUrl, locales, ogLocale, type Locale } from "@/lib/i18n";

/** Metadata for one page: title, description, canonical, hreflang, Open Graph and Twitter. */
export function pageMetadata(a: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** Home uses the full title as-is; other pages get "Title · Kastr" from the layout template. */
  absoluteTitle?: boolean;
  noindex?: boolean;
}): Metadata {
  const url = localeUrl(a.locale, a.path);
  // Child openGraph objects replace the parent's, so the generated image is referenced explicitly.
  const image = { url: `/${a.locale}/opengraph-image`, width: 1200, height: 630, alt: a.title };
  return {
    title: a.absoluteTitle ? { absolute: a.title } : a.title,
    description: a.description,
    alternates: alternatesFor(a.locale, a.path),
    openGraph: {
      type: "website",
      url,
      title: a.title,
      description: a.description,
      siteName: config.brand,
      locale: ogLocale[a.locale],
      alternateLocale: locales.filter((l) => l !== a.locale).map((l) => ogLocale[l]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: a.title, description: a.description, images: [image.url] },
    ...(a.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
