import hunts from "@/content/hunts.json";

// Treasure Hunt and Super Treasure Hunt pages (docs/SEO_STRATEGY.md, step 1). Data: content/hunts.json,
// a snapshot of the app's catalog written by scripts/fetch-hunts.mjs. Text fields come from the Hot Wheels
// Wiki (CC BY-SA): every page links its source page.

export type HuntRarity = "sth" | "th";

export type Hunt = {
  id: string;
  rarity: HuntRarity;
  year: number;
  slug: string;
  name: string;
  toyNumber: string | null;
  series: string | null;
  caseCode: string | null;
  colour: string | null;
  tampo: string | null;
  base: string | null;
  window: string | null;
  interior: string | null;
  wheels: string | null;
  country: string | null;
  notes: string | null;
  sourceUrl: string;
  updated: string;
  twin: { toyNumber: string | null; colour: string | null; series: string | null } | null;
};

const all = hunts as Hunt[];

/** URL segment of each rarity: /en/super-treasure-hunt/2026, /en/treasure-hunt/2026. */
export const huntPath: Record<HuntRarity, string> = { sth: "/super-treasure-hunt", th: "/treasure-hunt" };

export function huntsOf(rarity: HuntRarity): Hunt[] {
  return all.filter((h) => h.rarity === rarity);
}

/** Years that have at least one car of this rarity, newest first. */
export function huntYears(rarity: HuntRarity): number[] {
  return [...new Set(huntsOf(rarity).map((h) => h.year))].sort((a, b) => b - a);
}

export function huntsOfYear(rarity: HuntRarity, year: number): Hunt[] {
  return huntsOf(rarity)
    .filter((h) => h.year === year)
    .sort((a, b) => caseRank(a.caseCode) - caseRank(b.caseCode) || a.name.localeCompare(b.name));
}

export function findHunt(rarity: HuntRarity, year: number, slug: string): Hunt | undefined {
  return all.find((h) => h.rarity === rarity && h.year === year && h.slug === slug);
}

/** The other hunt of the same case (the TH of an STH's case and the other way round). */
export function caseMates(h: Hunt): Hunt[] {
  if (!h.caseCode) return [];
  return all.filter((o) => o.year === h.year && o.caseCode === h.caseCode && o.id !== h.id);
}

/** Case letters run A to Q without I and O; unknown cases go last. */
export function caseRank(code: string | null): number {
  return code ? code.charCodeAt(0) : 1000;
}

/** "Truckin' Along / 1/5" -> { name: "Truckin' Along", position: "1/5" }. */
export function splitSeries(series: string | null): { name: string | null; position: string | null } {
  if (!series) return { name: null, position: null };
  const parts = series.split(" / ");
  const last = parts[parts.length - 1];
  if (parts.length > 1 && /^\d+\/\d+$/.test(last)) return { name: parts.slice(0, -1).join(" / "), position: last };
  return { name: series, position: null };
}

/** Last data change of a list, for the "updated" line and the sitemap. */
export function lastUpdated(list: Hunt[]): string {
  return list.reduce((max, h) => (h.updated > max ? h.updated : max), "2026-10-31");
}

/** The current year's list is still being revealed case by case. */
export function isOpenYear(year: number): boolean {
  return year >= new Date().getFullYear();
}

/** Mainline case letters in shipping order: A to Q without I and O. */
export const CASE_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q"];

/** Years whose hunts have case letters (the wiki's yearly Treasure Hunt pages give them since 2012). */
export function caseYears(): number[] {
  return [...new Set(all.filter((h) => h.caseCode).map((h) => h.year))].sort((a, b) => b - a);
}

/** The TH and STH of each known case of a year, in case order. */
export function casesOf(year: number): { caseCode: string; th: Hunt[]; sth: Hunt[] }[] {
  const inYear = all.filter((h) => h.year === year && h.caseCode);
  return CASE_LETTERS.filter((code) => inYear.some((h) => h.caseCode === code)).map((code) => ({
    caseCode: code,
    th: inYear.filter((h) => h.caseCode === code && h.rarity === "th"),
    sth: inYear.filter((h) => h.caseCode === code && h.rarity === "sth"),
  }));
}

/** The first letter after the last known case, or null once Q is known. */
export function nextCase(year: number): string | null {
  const known = casesOf(year).map((c) => c.caseCode);
  const last = known.length ? CASE_LETTERS.indexOf(known[known.length - 1]) : -1;
  return CASE_LETTERS[last + 1] ?? null;
}

export const casesPath = "/cases";
