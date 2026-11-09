// Cloudflare Worker in front of the static export in `out/`.
// It does what next.config redirects()/headers() did before the switch to `output: "export"`:
// locale redirects for short URLs (kastr.app/privacy is what App Store Connect links to),
// www to apex, security headers, and a PNG content type for the extensionless image routes.

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
const LOCALIZED = new Set(["", "privacy", "terms", "support", "credits"]);
const PNG_ROUTES = [/^\/icon$/, /^\/apple-icon$/, /^\/(en|fr)\/opengraph-image$/];

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

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
