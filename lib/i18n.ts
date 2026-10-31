import { config } from "@/lib/config";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const ogLocale: Record<Locale, string> = { en: "en_US", fr: "fr_FR" };
export const localeName: Record<Locale, string> = { en: "English", fr: "Français" };

/** Absolute URL of a path ("" for home, "/privacy"...) in a given locale. */
export function localeUrl(locale: Locale, path = ""): string {
  return `${config.siteUrl}/${locale}${path}`;
}

/** canonical + hreflang alternates for one logical page, shared by metadata and the sitemap. */
export function alternatesFor(locale: Locale, path = "") {
  return {
    canonical: localeUrl(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, localeUrl(l, path)])),
      "x-default": localeUrl(defaultLocale, path),
    },
  };
}
