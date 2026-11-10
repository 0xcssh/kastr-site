export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import { getCatalogPages } from "@/lib/catalog";
import { caseYears, casesOf, casesPath, huntPath, huntYears, huntsOf, huntsOfYear, lastUpdated, type HuntRarity } from "@/lib/hunts";
import { config } from "@/lib/config";
import { alternatesFor, localeUrl, locales } from "@/lib/i18n";

const STATIC_PAGES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/value", priority: 0.8, changeFrequency: "monthly" },
  { path: "/hot-wheels-scanner", priority: 0.8, changeFrequency: "monthly" },
  { path: "/support", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
  { path: "/credits", priority: 0.3, changeFrequency: "yearly" },
];

function entry(path: string, lastModified: Date, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) {
  return locales.map((locale) => ({
    url: localeUrl(locale, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages: alternatesFor(locale, path).languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const legalDate = new Date(config.legalUpdated);
  const pages = STATIC_PAGES.flatMap((p) => entry(p.path, p.path === "" ? new Date() : legalDate, p.priority, p.changeFrequency));

  // Blog: listed only once it has articles (the empty index is noindexed).
  const slugs = await getAllSlugs();
  const blog = slugs.length
    ? [
        ...entry("/blog", new Date(slugs[0].date), 0.6, "weekly"),
        ...slugs.flatMap(({ slug, date }) => entry(`/blog/${slug}`, new Date(date), 0.7, "monthly")),
      ]
    : [];

  // Programmatic catalog pages: empty until lib/catalog.ts is wired (see the comment there).
  const catalog = (await getCatalogPages()).flatMap((c) => entry(`/cars/${c.slug}`, new Date(c.updated), 0.5, "monthly"));

  // Hunt lists (docs/SEO_STRATEGY.md, step 1): hub, one page per year, one per car.
  const hunts = (["sth", "th"] as HuntRarity[]).flatMap((r) => [
    ...entry(huntPath[r], new Date(lastUpdated(huntsOf(r))), 0.8, "weekly"),
    ...huntYears(r).flatMap((y) =>
      entry(`${huntPath[r]}/${y}`, new Date(lastUpdated(huntsOfYear(r, y))), y >= 2025 ? 0.9 : 0.6, y >= 2025 ? "weekly" : "monthly"),
    ),
    ...huntsOf(r).flatMap((h) => entry(`${huntPath[r]}/${h.year}/${h.slug}`, new Date(h.updated), 0.5, "monthly")),
  ]);

  // Case tracker: one page per year, cases A to Q with their TH and STH.
  const cases = [
    ...entry(casesPath, new Date(lastUpdated(huntsOf("sth"))), 0.7, "weekly"),
    ...caseYears().flatMap((y) => {
      const hunts = casesOf(y).flatMap((k) => [...k.th, ...k.sth]);
      return entry(`${casesPath}/${y}`, new Date(lastUpdated(hunts)), y >= 2025 ? 0.9 : 0.5, y >= 2025 ? "weekly" : "monthly");
    }),
  ];

  return [...pages, ...hunts, ...cases, ...blog, ...catalog];
}
