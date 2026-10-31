export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import { getCatalogPages } from "@/lib/catalog";
import { config } from "@/lib/config";
import { alternatesFor, localeUrl, locales } from "@/lib/i18n";

const STATIC_PAGES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
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

  return [...pages, ...blog, ...catalog];
}
