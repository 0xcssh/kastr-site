// Creator links: https://kastr.app/c/PANDACARS (docs/CREATOR_CODES.md in the
// app repo). With Kastr installed, iOS opens the app directly through the
// universal link declared below; otherwise this page shows the code and
// sends the collector to the App Store (no deferred deep link: after the
// install, the onboarding asks "Came from a creator?").

import { escapeHtml, type Locale, STYLE } from "./profile";

const APP_ID = "8L8G4P4Z9X.com.awdia.kastr";

// Served at /.well-known/apple-app-site-association (JSON, no redirect).
export const APPLE_APP_SITE_ASSOCIATION = JSON.stringify({
  applinks: { details: [{ appIDs: [APP_ID], components: [{ "/": "/c/*", comment: "creator links" }] }] },
});

// Same rule as the app and the database: 3-20 letters or digits, never a
// friend's 8-character hexadecimal referral code.
export function parseCreatorPath(pathname: string): string | null {
  const match = /^\/c\/([^/]+)\/?$/.exec(pathname);
  if (!match) return null;
  let raw: string;
  try {
    raw = decodeURIComponent(match[1]);
  } catch {
    return null;
  }
  const code = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!/^[A-Z0-9]{3,20}$/.test(code) || /^[0-9A-F]{8}$/.test(code)) return null;
  return code;
}

export function renderCreatorPage(code: string, locale: Locale, appUrl: string): string {
  const text = locale === "fr"
    ? {
      title: `Code ${code}`,
      lead: "Un créateur t'invite sur Kastr, l'app des collectionneurs de voitures miniatures.",
      open: "Ouvrir dans Kastr",
      get: "Télécharger Kastr",
      after: `Après l'installation, entre ${code} à la fin de l'accueil, ou dans Compte > Un code ?`,
      note: "Indépendant, non affilié à Mattel, Inc.",
    }
    : {
      title: `Code ${code}`,
      lead: "A creator invites you to Kastr, the app for diecast collectors.",
      open: "Open in Kastr",
      get: "Get Kastr",
      after: `After installing, enter ${code} at the end of the welcome screens, or in Account > Got a code?`,
      note: "Independent, not affiliated with Mattel, Inc.",
    };
  const safe = escapeHtml(code);
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(text.title)} · Kastr</title><meta name="robots" content="noindex"><style>${STYLE}
.code{font:900 italic 44px/1 Saira,sans-serif;font-stretch:125%;letter-spacing:.06em;background:var(--surface2);border-radius:16px;padding:18px 24px;margin:8px 0;user-select:all}
.ghost{margin-top:10px;color:var(--titanium);font-weight:700;text-decoration:none}</style></head>
<body><header class="top"><a href="/${locale}" class="logo display"><span class="bars"></span>KASTR</a></header>
<main><section class="card profile">
<p class="eyebrow">Kastr</p>
<div class="code">${safe}</div>
<p class="bio">${escapeHtml(text.lead)}</p>
<a class="cta" href="${escapeHtml(appUrl)}">${escapeHtml(text.get)}</a>
<a class="ghost" href="kastr://c/${safe}">${escapeHtml(text.open)}</a>
<p class="bio">${escapeHtml(text.after)}</p>
</section></main><footer>${escapeHtml(text.note)}</footer></body></html>`;
}
