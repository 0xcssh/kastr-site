// Cloudflare Worker in front of the static export in `out/`.
// It does what next.config redirects()/headers() did before the switch to `output: "export"`:
// locale redirects for short URLs (kastr.app/privacy is what App Store Connect links to),
// www to apex, security headers, and a PNG content type for the extensionless image routes.

import hunts from "../content/hunts.json";
import { config, isAppLive } from "../lib/config";
import { APPLE_APP_SITE_ASSOCIATION, parseCreatorPath, renderCreatorPage } from "./creator";
import { fetchProfile, fetchProfileIndex, parseProfilePath, profileSitemap, renderNotFound, renderProfile } from "./profile";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  // eBay Partner Network campaign for the wishlist links, once the EPN account exists (optional).
  EBAY_EPN_CAMPAIGN_ID?: string;
}

// Collector pages change when the app syncs: five minutes of cache is enough.
const PROFILE_TTL = 300;

function edgeCache(): Cache | undefined {
  return (globalThis as unknown as { caches?: { default?: Cache } }).caches?.default;
}

async function cached(key: string, build: () => Promise<Response>): Promise<Response> {
  const cache = edgeCache();
  const request = new Request(key);
  const hit = cache ? await cache.match(request) : undefined;
  if (hit) return hit;
  const response = await build();
  if (cache && response.headers.get("Cache-Control")?.includes("max-age")) await cache.put(request, response.clone());
  return response;
}

async function profileResponse(url: URL, request: Request, env: Env): Promise<Response | null> {
  const path = parseProfilePath(url.pathname);
  if (!path) return null;
  const locale = preferredLocale(request.headers.get("Accept-Language"));
  return cached(`https://${APEX}/__profile/${locale}/${path.username.toLowerCase()}/${path.page}`, async () => {
    const headers = { "Content-Type": "text/html; charset=utf-8", Vary: "Accept-Language", ...SECURITY_HEADERS };
    try {
      const profile = await fetchProfile(path.username);
      if (!profile || (path.page === "wishlist" && !profile.wishlist_public)) {
        return new Response(renderNotFound(locale), { status: 404, headers: { ...headers, "Cache-Control": `public, max-age=${PROFILE_TTL}` } });
      }
      const html = renderProfile(profile, {
        locale,
        page: path.page,
        appUrl: isAppLive ? config.appStoreUrl : `${config.siteUrl}/${locale}`,
        campaignId: env.EBAY_EPN_CAMPAIGN_ID,
      });
      return new Response(html, { headers: { ...headers, "Cache-Control": `public, max-age=${PROFILE_TTL}` } });
    } catch {
      return new Response(renderNotFound(locale), { status: 503, headers: { ...headers, "Cache-Control": "no-store" } });
    }
  });
}

const APEX = "kastr.app";
const LOCALIZED = new Set(["", "privacy", "terms", "support", "credits", "super-treasure-hunt", "treasure-hunt", "cases", "value", "hot-wheels-scanner"]);
const PNG_ROUTES = [/^\/icon$/, /^\/apple-icon$/, /^\/(en|fr)\/opengraph-image$/];

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

// "On eBay now" on the hunt pages (components/hunt/live-listings.tsx). Reads the app's ebay-listings function,
// which serves its 30-minute cache and refreshes within its own hourly budget. eBay API License §8.1.3: listing
// data shown must be at most 6 hours old, so older data is not returned at all. Crawlers get nothing: the
// block is not part of the indexed page and must not spend the refresh budget the app's users need.
const SUPABASE_URL = "https://vohlyekfqlcsvpidgetb.supabase.co";
const SUPABASE_KEY = "sb_publishable_0YaYrsM-CW92hJRWPY0X1A_08nSthkt"; // publishable, same as the app's
// 5 h 30 rather than 6 h: the answer itself is cached up to 15 minutes at the edge.
const LISTING_MAX_AGE_MS = 5.5 * 60 * 60 * 1000;
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|headless|lighthouse/i;

export function listingsPath(pathname: string): string | null {
  const match = /^\/api\/listings\/([0-9a-f-]{36})$/.exec(pathname);
  return match ? match[1] : null;
}

type RawListing = { title?: string; price?: number; currency?: string; image_url?: string | null; url?: string };
type RawFloor = { price?: number; currency?: string; listings?: number } | null;

export function freshListings(body: { listings?: RawListing[]; floor?: RawFloor; fetched_at?: string | null }, now: number) {
  const fetchedAt = body.fetched_at ? Date.parse(body.fetched_at) : NaN;
  if (!Number.isFinite(fetchedAt) || now - fetchedAt > LISTING_MAX_AGE_MS) return null;
  const listings = (body.listings ?? [])
    .filter((l) => l.url && l.title && typeof l.price === "number" && l.currency)
    .sort((a, b) => a.price! - b.price!)
    .slice(0, 4)
    .map((l) => ({
      title: l.title!,
      price: l.price!,
      currency: l.currency!,
      // Row thumbnails are 300 px; the page shows them bigger.
      image: l.image_url ? l.image_url.replace(/s-l\d+\./, "s-l500.") : null,
      url: l.url!,
    }));
  // The car's value, as in the app: the cheapest carded Buy It Now listing (supabase/functions/ebay-listings/floor.ts),
  // shown only with listings fetched in the same window, so it obeys the same 6-hour rule.
  const f = body.floor;
  const value =
    f && typeof f.price === "number" && f.currency ? { price: f.price, currency: f.currency, listings: f.listings ?? null } : null;
  return listings.length ? { fetchedAt: new Date(fetchedAt).toISOString(), listings, value } : null;
}

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8", "X-Robots-Tag": "noindex", ...SECURITY_HEADERS };

/** One car's fresh listings, cached 15 minutes at the edge (204 when none are fresh). */
function cachedListings(variationId: string): Promise<Response> {
  // v2: answers carry the value since 9 Nov; the version keeps older cached answers out.
  return cached(`https://${APEX}/__listings/v2/${variationId}`, async () => {
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/ebay-listings`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ variation_id: variationId }),
      });
      const fresh = res.ok ? freshListings(await res.json(), Date.now()) : null;
      if (!fresh) return new Response(null, { status: 204, headers: { ...JSON_HEADERS, "Cache-Control": "public, max-age=600" } });
      return new Response(JSON.stringify(fresh), { headers: { ...JSON_HEADERS, "Cache-Control": "public, max-age=900" } });
    } catch {
      return new Response(null, { status: 204, headers: { ...JSON_HEADERS, "Cache-Control": "no-store" } });
    }
  });
}

async function listingsResponse(variationId: string, request: Request): Promise<Response> {
  if (BOT.test(request.headers.get("User-Agent") ?? "")) return new Response(null, { status: 204, headers: JSON_HEADERS });
  return cachedListings(variationId);
}

/** ?ids=a,b,c (at most 40): the photo of each car's cheapest fresh listing, for the cards of a year's list. */
export function photoIds(url: URL): string[] | null {
  if (url.pathname !== "/api/photos") return null;
  const ids = (url.searchParams.get("ids") ?? "").split(",").filter((id) => /^[0-9a-f-]{36}$/.test(id));
  return [...new Set(ids)].slice(0, 40);
}

async function photosResponse(ids: string[], request: Request): Promise<Response> {
  if (BOT.test(request.headers.get("User-Agent") ?? "") || !ids.length) {
    return new Response(JSON.stringify({ photos: {} }), { headers: JSON_HEADERS });
  }
  type Value = { price: number; currency: string; listings: number | null } | null;
  const photos: Record<string, { image: string | null; fetchedAt: string; value: Value }> = {};
  // Six cars at a time: the function refreshes within its own hourly budget and serves its cache otherwise.
  for (let i = 0; i < ids.length; i += 6) {
    await Promise.all(
      ids.slice(i, i + 6).map(async (id) => {
        const res = await cachedListings(id);
        if (res.status !== 200) return;
        const fresh = (await res.json()) as { fetchedAt: string; listings: { image: string | null }[]; value?: Value };
        const image = fresh.listings.find((l) => l.image)?.image ?? null;
        if (image || fresh.value) photos[id] = { image, fetchedAt: fresh.fetchedAt, value: fresh.value ?? null };
      }),
    );
  }
  return new Response(JSON.stringify({ photos }), { headers: { ...JSON_HEADERS, "Cache-Control": "private, max-age=300" } });
}

// Value lookup (/[locale]/value): the catalog searched by toy number, or by name words and an optional year.
// Public catalog rows only (text under CC BY-SA); the value of each result comes from /api/photos, live.
const HUNT_PATHS = new Map(
  (hunts as { id: string; rarity: "sth" | "th"; year: number; slug: string }[]).map((h) => [
    h.id,
    `/${h.rarity === "sth" ? "super-treasure-hunt" : "treasure-hunt"}/${h.year}/${h.slug}`,
  ]),
);

export type SearchQuery = { toyNumber: string } | { words: string[]; year: number | null };

export function parseSearch(raw: string): SearchQuery | null {
  const q = raw.normalize("NFKC").trim().slice(0, 60);
  if (/^[a-z]{2,4}[- ]?\d{2,4}$/i.test(q)) return { toyNumber: q.replace(/[- ]/g, "").toUpperCase() };
  let year: number | null = null;
  const words: string[] = [];
  for (const token of q.toLowerCase().split(/\s+/)) {
    const clean = token.replace(/[^\p{L}\p{N}'-]/gu, "");
    if (!clean) continue;
    if (year === null && /^(19[6-9]\d|20[0-3]\d)$/.test(clean)) year = Number(clean);
    else if (clean !== "hot" && clean !== "wheels" && words.length < 5) words.push(clean);
  }
  return words.length && words.join("").length >= 2 ? { words, year } : null;
}

export function searchUrl(query: SearchQuery): string {
  const params = new URLSearchParams({
    select: "id,toy_number,year,rarity,colour,series,casting!inner(name,brand)",
    order: "year.desc.nullslast,id",
    limit: "24",
  });
  if ("toyNumber" in query) params.append("toy_number", `ilike.*${query.toyNumber}*`);
  else {
    for (const w of query.words) params.append("casting.name", `ilike.*${w}*`);
    if (query.year) params.append("year", `eq.${query.year}`);
  }
  return `${SUPABASE_URL}/rest/v1/variation?${params}`;
}

type Row = { id: string; toy_number: string | null; year: number | null; rarity: string; colour: string | null; series: string | null; casting: { name: string; brand: string } };

async function searchResponse(url: URL): Promise<Response> {
  const query = parseSearch(url.searchParams.get("q") ?? "");
  if (!query) return new Response(JSON.stringify({ results: [] }), { headers: JSON_HEADERS });
  const key = "toyNumber" in query ? `t:${query.toyNumber}` : `n:${query.words.join("+")}:${query.year ?? ""}`;
  return cached(`https://${APEX}/__search/v1/${encodeURIComponent(key)}`, async () => {
    try {
      const res = await fetch(searchUrl(query), { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } });
      if (!res.ok) throw new Error(String(res.status));
      const results = ((await res.json()) as Row[]).map((r) => ({
        id: r.id,
        name: r.casting.name,
        brand: r.casting.brand,
        year: r.year,
        rarity: r.rarity,
        colour: r.colour,
        series: r.series,
        toyNumber: r.toy_number,
        path: HUNT_PATHS.get(r.id) ?? null,
      }));
      return new Response(JSON.stringify({ results }), { headers: { ...JSON_HEADERS, "Cache-Control": "public, max-age=3600" } });
    } catch {
      return new Response(JSON.stringify({ results: [], error: true }), { status: 502, headers: { ...JSON_HEADERS, "Cache-Control": "no-store" } });
    }
  });
}

export function rscPayloadPath(pathname: string): string | null {
  const decoded = decodeURIComponent(pathname);
  const match = /^(.*\/__next\.)([^/]+)\.txt$/.exec(decoded);
  if (!match || !match[2].includes(".") || match[2].startsWith("_")) return null;
  // Assets are keyed by the encoded path ("$" as %24); the raw "$" form answers with a redirect.
  return `${match[1]}${match[2].split(".").join("/")}.txt`.replace(/\$/g, "%24");
}

export function preferredLocale(acceptLanguage: string | null): "en" | "fr" {
  return /^\s*fr\b/i.test(acceptLanguage ?? "") ? "fr" : "en";
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === `www.${APEX}`) {
      url.hostname = APEX;
      return Response.redirect(url.toString(), 301);
    }

    // Universal links for creator codes: the app opens /c/<code> directly.
    if (url.pathname === "/.well-known/apple-app-site-association") {
      return new Response(APPLE_APP_SITE_ASSOCIATION, {
        headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" },
      });
    }

    // Creator links (https://kastr.app/c/PANDACARS) when the app is not installed.
    const creatorCode = parseCreatorPath(url.pathname);
    if (creatorCode) {
      const locale = preferredLocale(request.headers.get("Accept-Language"));
      const appUrl = isAppLive ? config.appStoreUrl : `${config.siteUrl}/${locale}`;
      return new Response(renderCreatorPage(creatorCode, locale, appUrl), {
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300",
                   Vary: "Accept-Language", ...SECURITY_HEADERS },
      });
    }
    if (url.pathname.startsWith("/c/")) {
      const locale = preferredLocale(request.headers.get("Accept-Language"));
      return new Response(renderNotFound(locale), {
        status: 404, headers: { "Content-Type": "text/html; charset=utf-8", ...SECURITY_HEADERS },
      });
    }

    const listings = listingsPath(url.pathname);
    if (listings) return listingsResponse(listings, request);
    const photos = photoIds(url);
    if (photos) return photosResponse(photos, request);
    if (url.pathname === "/api/search") return searchResponse(url);

    const profile = await profileResponse(url, request, env);
    if (profile) return profile;

    if (url.pathname === "/sitemap-profiles.xml") {
      return cached(`https://${APEX}/__profile/sitemap`, async () =>
        new Response(profileSitemap(await fetchProfileIndex()), {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        }));
    }

    const page = url.pathname.replace(/^\/+|\/+$/g, "");
    if (LOCALIZED.has(page)) {
      const locale = preferredLocale(request.headers.get("Accept-Language"));
      url.pathname = page ? `/${locale}/${page}` : `/${locale}`;
      return new Response(null, {
        status: 302,
        headers: { Location: url.toString(), Vary: "Accept-Language", ...SECURITY_HEADERS },
      });
    }

    // Next prefetches route payloads as "__next.$d$locale.support.__PAGE__.txt", but the static export
    // writes them as folders ("__next.$d$locale/support/__PAGE__.txt"): map one to the other.
    const payload = rscPayloadPath(url.pathname);
    const asset = await env.ASSETS.fetch(payload ? new Request(new URL(payload, url), request) : request);
    const response = new Response(asset.body, asset);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) response.headers.set(key, value);
    if (PNG_ROUTES.some((route) => route.test(url.pathname))) response.headers.set("Content-Type", "image/png");
    return response;
  },
};

export default worker;
