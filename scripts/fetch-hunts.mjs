// Snapshot of every Hot Wheels Treasure Hunt and Super Treasure Hunt for the hunt pages (docs/SEO_STRATEGY.md,
// step 1). Reads the public catalog of the app's Supabase project with the publishable key (read-only,
// row-level security) and writes content/hunts.json, which the build reads. Run it, then deploy:
//   node scripts/fetch-hunts.mjs && npm run deploy
// Text fields come from the Hot Wheels Wiki (CC BY-SA): every page credits its source page.
// No prices here: eBay listing data must be at most 6 hours old when shown (API License §8.1.3), so the
// live listings are fetched by the Worker at visit time, never baked into the build.

import { writeFileSync } from "node:fs";

const BASE = "https://vohlyekfqlcsvpidgetb.supabase.co/rest/v1";
const KEY = "sb_publishable_0YaYrsM-CW92hJRWPY0X1A_08nSthkt"; // public by design, same as the app's

async function get(path) {
  const res = await fetch(`${BASE}/${path}`, { headers: { apikey: KEY } });
  if (!res.ok) throw new Error(`${res.status} ${path}: ${await res.text()}`);
  return res.json();
}

const FIELDS =
  "id,casting_id,year,toy_number,series,case_code,colour,tampo,base,window_colour,interior,wheels,country,rarity,notes,source_url,updated_at";

export function slugify(text) {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const clean = (v) => (typeof v === "string" && v.trim() ? v.trim() : null);

const rows = await get(
  `variation?select=${FIELDS},casting:casting_id(name,brand)&rarity=in.(treasureHunt,superTreasureHunt)&order=year.desc,case_code.asc,toy_number.asc&limit=5000`,
);
const hunts = rows.filter((r) => r.casting?.brand === "Hot Wheels" && r.casting?.name);

// The regular version of each hunt: same casting, same year, mainline. An STH keeps its twin's collector
// number but has its own toy number; a TH has no twin most of the time (docs/RARITY_RECOGNITION.md §2).
const castingIds = [...new Set(hunts.map((h) => h.casting_id))];
const years = [...new Set(hunts.map((h) => h.year))];
const mainlines = [];
for (let i = 0; i < castingIds.length; i += 80) {
  const ids = castingIds.slice(i, i + 80).join(",");
  mainlines.push(
    ...(await get(
      `variation?select=casting_id,year,toy_number,colour,series&rarity=eq.mainline&casting_id=in.(${ids})&year=in.(${years.join(",")})&limit=5000`,
    )),
  );
}

const seen = new Set();
const out = hunts.map((h) => {
  const rarity = h.rarity === "superTreasureHunt" ? "sth" : "th";
  const series = clean(h.series);
  const twins = mainlines.filter((m) => m.casting_id === h.casting_id && m.year === h.year);
  const twin = twins.find((m) => clean(m.series) === series) ?? twins[0] ?? null;
  // One URL per car: /<rarity path>/<year>/<casting>; a second car of the same casting that year gets its toy number.
  let slug = slugify(h.casting.name) || slugify(h.toy_number ?? h.id);
  if (seen.has(`${rarity}/${h.year}/${slug}`)) slug = `${slug}-${slugify(h.toy_number ?? h.id.slice(0, 8))}`;
  seen.add(`${rarity}/${h.year}/${slug}`);
  return {
    id: h.id,
    rarity,
    year: h.year,
    slug,
    name: h.casting.name,
    toyNumber: clean(h.toy_number),
    series,
    caseCode: clean(h.case_code),
    colour: clean(h.colour),
    tampo: clean(h.tampo),
    base: clean(h.base),
    window: clean(h.window_colour),
    interior: clean(h.interior),
    wheels: clean(h.wheels),
    country: clean(h.country),
    notes: clean(h.notes),
    sourceUrl: h.source_url,
    updated: h.updated_at.slice(0, 10),
    twin: twin ? { toyNumber: clean(twin.toy_number), colour: clean(twin.colour), series: clean(twin.series) } : null,
  };
});

writeFileSync(new URL("../content/hunts.json", import.meta.url), JSON.stringify(out, null, 1) + "\n");
const count = (r) => out.filter((h) => h.rarity === r).length;
console.log(`hunts.json: ${out.length} cars (${count("sth")} STH, ${count("th")} TH), ${out.filter((h) => h.twin).length} with a regular twin`);
