#!/usr/bin/env node
// Post-build checks on the prerendered HTML (.next/server/app). Run after `npm run build`:
//   npm run check            -> fails on broken rules, lists TODO placeholders as warnings
//   npm run check -- --strict -> also fails while placeholders remain (run before App Store submission)
// Node standard library only.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const OUT = path.join(ROOT, ".next", "server", "app");
const SITE = "https://kastr.app";
const strict = process.argv.includes("--strict");

const LOCALES = ["en", "fr"];
const PAGES = ["", "/privacy", "/terms", "/support", "/credits"];
const DISCLAIMER = {
  en: "Kastr is independent and not affiliated with Mattel, Inc.",
  fr: "Kastr est indépendante et n&#x27;est pas affiliée à Mattel, Inc.",
};

const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);

if (!fs.existsSync(OUT)) {
  console.error("No build output. Run `npm run build` first.");
  process.exit(1);
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

for (const locale of LOCALES) {
  for (const page of PAGES) {
    const rel = `${locale}${page}`;
    const file = path.join(OUT, `${rel}.html`);
    if (!fs.existsSync(file)) {
      fail(`${rel}: page missing from the build`);
      continue;
    }
    const html = fs.readFileSync(file, "utf8");
    const text = visibleText(html);
    const url = `${SITE}/${rel}`;

    if (!html.includes(`<html lang="${locale}"`)) fail(`${rel}: <html lang="${locale}"> missing`);
    if (!html.includes(DISCLAIMER[locale])) fail(`${rel}: Mattel disclaimer missing from the footer`);
    if (!html.includes(`<link rel="canonical" href="${url}"/>`)) fail(`${rel}: canonical should be ${url}`);
    for (const l of [...LOCALES, "x-default"]) {
      if (!new RegExp(`<link rel="alternate" hrefLang="${l}" href="${SITE}/`).test(html)) fail(`${rel}: hreflang ${l} missing`);
    }
    if (!/<meta property="og:image" content="https:\/\//.test(html)) fail(`${rel}: og:image missing`);
    const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1 !== 1) fail(`${rel}: expected exactly one <h1>, found ${h1}`);

    // Structured data must parse.
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    if (blocks.length === 0) fail(`${rel}: no JSON-LD`);
    const types = [];
    for (const b of blocks) {
      try {
        const data = JSON.parse(b);
        for (const node of data["@graph"] ?? [data]) types.push(node["@type"]);
      } catch {
        fail(`${rel}: invalid JSON-LD`);
      }
    }
    if (page === "") {
      for (const t of ["Organization", "MobileApplication", "FAQPage"]) {
        if (!types.includes(t)) fail(`${rel}: JSON-LD ${t} missing`);
      }
      // The FAQ schema must describe the FAQ shown on the page.
      const faqNode = blocks.map((b) => JSON.parse(b)).flatMap((d) => d["@graph"] ?? [d]).find((n) => n["@type"] === "FAQPage");
      const shown = (html.match(/<details/g) ?? []).length;
      if (faqNode && faqNode.mainEntity.length !== shown) fail(`${rel}: FAQPage has ${faqNode.mainEntity.length} questions, page shows ${shown}`);
      if (!html.includes("data-answer-block")) fail(`${rel}: AnswerBlock missing`);
    }

    // Copy rules (CLAUDE.md §10, §11, §16.5).
    if (/[—–]/.test(text)) fail(`${rel}: em or en dash in visible text`);
    if (/[$€£]\s?\d|\d\s?[$€£]|\b\d+[.,]\d{2}\s?(USD|EUR|GBP)\b/.test(text)) fail(`${rel}: looks like a price in visible text`);
    if (/<form[\s>]|type="email"/.test(html)) fail(`${rel}: no forms or email capture allowed (no waitlist)`);
    if (/waitlist|liste d'attente/i.test(text)) fail(`${rel}: waitlist wording`);
    if (/\p{Extended_Pictographic}/u.test(text)) fail(`${rel}: emoji in visible text`);

    const todos = text.match(/TODO[^.,;)]*/g) ?? [];
    for (const t of new Set(todos)) warnings.push(`${rel}: placeholder "${t.trim()}"`);
    if (html.includes("idTODO")) warnings.push(`${rel}: App Store URL is still a placeholder`);
  }
}

// Brand rule: never "Hot Wheels" in the brand or the domain (CLAUDE.md §1, §9).
const configSrc = fs.readFileSync(path.join(ROOT, "lib", "config.ts"), "utf8");
const brand = configSrc.match(/brand:\s*"([^"]+)"/)?.[1] ?? "";
const siteUrl = configSrc.match(/siteUrl:\s*"([^"]+)"/)?.[1] ?? "";
if (/hot\s*wheels/i.test(brand + siteUrl)) fail("config: brand or domain contains Hot Wheels");

// Source copy: no em/en dashes anywhere in the content files either (catches strings not rendered yet).
for (const dir of ["lib", "components", "app", "public"]) {
  const walk = (d) =>
    fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  for (const f of walk(path.join(ROOT, dir)).filter((f) => /\.(ts|tsx|txt|mdx?)$/.test(f))) {
    if (/[—–]/.test(fs.readFileSync(f, "utf8"))) fail(`${path.relative(ROOT, f)}: em or en dash in source`);
  }
}

// Indexing files.
const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml.body"), "utf8");
for (const locale of LOCALES) for (const page of PAGES) {
  if (!sitemap.includes(`<loc>${SITE}/${locale}${page}</loc>`)) fail(`sitemap: ${locale}${page} missing`);
}
const robots = fs.readFileSync(path.join(OUT, "robots.txt.body"), "utf8");
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail("robots.txt: sitemap line missing");
if (!fs.existsSync(path.join(ROOT, "public", "llms.txt"))) fail("public/llms.txt missing");

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`FAIL  ${e}`);
const placeholderFail = strict && warnings.length > 0;
console.log(
  `\n${errors.length} error(s), ${warnings.length} placeholder warning(s)${strict ? " (strict mode)" : ""}.`,
);
process.exit(errors.length > 0 || placeholderFail ? 1 : 0);
