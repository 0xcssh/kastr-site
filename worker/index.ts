// Cloudflare Worker in front of the static export in `out/`.
// It does what next.config redirects()/headers() did before the switch to `output: "export"`:
// locale redirects for short URLs (kastr.app/privacy is what App Store Connect links to),
// www to apex, security headers, and a PNG content type for the extensionless image routes.

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
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

    const page = url.pathname.replace(/^\/+|\/+$/g, "");
    if (LOCALIZED.has(page)) {
      const locale = preferredLocale(request.headers.get("Accept-Language"));
      url.pathname = page ? `/${locale}/${page}` : `/${locale}`;
      return new Response(null, {
        status: 302,
        headers: { Location: url.toString(), Vary: "Accept-Language", ...SECURITY_HEADERS },
      });
    }

    const asset = await env.ASSETS.fetch(request);
    const response = new Response(asset.body, asset);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) response.headers.set(key, value);
    if (PNG_ROUTES.some((route) => route.test(url.pathname))) response.headers.set("Content-Type", "image/png");
    return response;
  },
};

export default worker;
