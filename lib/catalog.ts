// Hook for future programmatic catalog pages (CLAUDE.md §11, site-landing "pistes SEO"):
// one page per casting, TH/STH guides per year, case lists A to Q.
//
// Nothing is generated yet: getCatalogPages() returns []. To turn it on later:
//   1. Load entries from the catalog build (diecast/data/out/catalog.sqlite exported to JSON, or Supabase)
//      at build time. Only text data (CC BY-SA); never ship photos without a cleared license.
//   2. Add app/[locale]/cars/[slug]/page.tsx using generateStaticParams() over getCatalogPages(),
//      with CC BY-SA attribution and a link to the source wiki page on every page.
//   3. The sitemap already includes whatever this function returns.
// Keep pages genuinely useful (variants, years, toy numbers, rarity), or Google treats them as thin content.

export type CatalogPage = {
  slug: string; // e.g. "ferrari-f40-1989"
  title: string;
  brand: string;
  years: [number, number];
  sourceUrl: string; // wiki page, for the CC BY-SA attribution
  updated: string; // ISO date of the source revision
};

export async function getCatalogPages(): Promise<CatalogPage[]> {
  return [];
}
