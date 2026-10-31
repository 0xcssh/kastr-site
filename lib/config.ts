// lib/config.ts: the one file to edit for site-wide facts (brand, URLs, contact, legal identity).
// Every value marked TODO is a placeholder. `npm run check -- --strict` fails while any remain,
// so run it before pointing App Store Connect at the site.

export const config = {
  brand: "Kastr",
  // Final HTTPS origin. Canonical URLs, hreflang, sitemap, robots and Open Graph all derive from it.
  siteUrl: "https://kastr.app",

  // App Store listing. Placeholder until the App Store Connect record exists.
  // Replace with https://apps.apple.com/app/id<APP_ID> once the app is created.
  appStoreUrl: "https://apps.apple.com/app/idTODO",

  // Single contact address used on support and legal pages. The founder has not chosen it yet.
  supportEmail: "TODO@kastr.app",

  // Social profiles (none exist yet, CLAUDE.md §11). Add URLs here when they do; they feed Organization.sameAs.
  social: [] as string[],

  // Legal identity of the publisher and data controller (CLAUDE.md §3, §9).
  legal: {
    tradeName: "H&A Trading & Collectibles",
    form: "micro-entreprise (sole proprietorship), France",
    ownerName: "TODO: legal name of the business owner",
    address: "TODO: registered business address",
    siret: "TODO: SIRET (pending registration)",
    // French consumer law requires naming a consumer mediation body for B2C sales.
    consumerMediator: "TODO: consumer mediator name and website",
    host: "Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA",
  },

  // Dates shown on the legal pages. Update when the text changes.
  legalUpdated: "2026-10-31",

  // Platform requirements, shown in the FAQ and structured data.
  platform: { os: "iOS", minVersion: "17", device: "iPhone" },
} as const;

export type SiteConfig = typeof config;

// Guard: canonical, sitemap and Open Graph silently point to the wrong place if this is wrong.
if (!/^https:\/\//.test(config.siteUrl) || /example\.|localhost|REPLACE/i.test(config.siteUrl)) {
  throw new Error("[config] siteUrl must be the real HTTPS origin of the site (lib/config.ts).");
}

export const isAppLive = !config.appStoreUrl.includes("TODO");
