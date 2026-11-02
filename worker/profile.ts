// Public collector pages: kastr.app/@username and kastr.app/@username/wishlist.
// Server-rendered by the Worker from the app's Supabase function `web_profile`
// (diecast repo, data/migrations/20261103_60_web_profiles.sql), read with the
// publishable key that already ships in the app. The function only answers for
// pages the collector left public, and never returns prices paid, places,
// notes, personal photos or values. Catalog photos stay out: the wiki's CDN
// forbids embedding (Cross-Origin-Resource-Policy: same-origin), so cars are
// drawn tiles. Only find photos, hosted by Kastr, are shown.

export const SUPABASE_URL = "https://vohlyekfqlcsvpidgetb.supabase.co";
export const PUBLISHABLE_KEY = "sb_publishable_0YaYrsM-CW92hJRWPY0X1A_08nSthkt";
const SITE = "https://kastr.app";

export type Locale = "en" | "fr";
export type ProfilePage = "profile" | "wishlist";

export interface WebCar {
  name: string;
  brand?: string | null;
  year?: number | null;
  rarity?: string | null;
  copies?: number | null;
  series?: string | null;
  case_code?: string | null;
  toy_number?: string | null;
}

export interface WebFind {
  body?: string | null;
  photo_path: string;
  created_at: string;
  like_count?: number | null;
  car?: { name: string; year?: number | null; rarity?: string | null } | null;
}

export interface WebProfile {
  username: string;
  indexable: boolean;
  bio?: string | null;
  member_since?: string | null;
  avatar?: WebCar | null;
  badges?: { badge: string; earned_at?: string }[];
  counts: { cars: number | null; posts: number; followers: number; following: number };
  garage_public: boolean;
  garage?: WebCar[] | null;
  rarities?: Record<string, number> | null;
  finds?: WebFind[];
  wishlist_public: boolean;
  wishlist?: WebCar[] | null;
}

const USERNAME = /^[A-Za-z0-9_.]{3,24}$/;

/** "/@peg_hunter", "/@peg_hunter/wishlist" (trailing slash allowed), else null. */
export function parseProfilePath(pathname: string): { username: string; page: ProfilePage } | null {
  const match = /^\/@([^/]+)(\/wishlist)?\/?$/.exec(decodeURIComponentSafe(pathname));
  if (!match || !USERNAME.test(match[1])) return null;
  return { username: match[1], page: match[2] ? "wishlist" : "profile" };
}

function decodeURIComponentSafe(text: string): string {
  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}

export function escapeHtml(text: string | null | undefined): string {
  return (text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** null: no such public page (unknown, switched off, banned, or the function is not deployed yet). */
export async function fetchProfile(username: string, fetcher: typeof fetch = fetch): Promise<WebProfile | null> {
  const response = await fetcher(`${SUPABASE_URL}/rest/v1/rpc/web_profile`, {
    method: "POST",
    headers: { apikey: PUBLISHABLE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ p_username: username }),
  });
  if (response.status === 404 || response.status === 400) return null;
  if (!response.ok) throw new Error(`web_profile ${response.status}`);
  const data = (await response.json()) as WebProfile | null;
  return data && typeof data === "object" && data.username ? data : null;
}

export async function fetchProfileIndex(fetcher: typeof fetch = fetch): Promise<{ username: string; updated_at: string }[]> {
  const response = await fetcher(`${SUPABASE_URL}/rest/v1/rpc/web_profile_index`, {
    method: "POST",
    headers: { apikey: PUBLISHABLE_KEY, "Content-Type": "application/json" },
    body: "{}",
  });
  if (!response.ok) return [];
  const rows = (await response.json()) as { username: string; updated_at: string }[];
  return Array.isArray(rows) ? rows : [];
}

export function profileSitemap(rows: { username: string; updated_at: string }[]): string {
  const urls = rows
    .filter((row) => USERNAME.test(row.username))
    .map((row) => `<url><loc>${SITE}/@${escapeHtml(row.username)}</loc><lastmod>${escapeHtml(row.updated_at.slice(0, 10))}</lastmod></url>`)
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

/** eBay search for one car, with the eBay Partner Network campaign when one is set. */
export function ebaySearchUrl(car: WebCar, campaignId?: string): string {
  const words = [car.brand || "Hot Wheels", car.name, car.year ? String(car.year) : "", car.toy_number ?? ""]
    .concat(car.rarity === "superTreasureHunt" ? ["super treasure hunt"] : car.rarity === "treasureHunt" ? ["treasure hunt"] : [])
    .filter(Boolean)
    .join(" ");
  const url = new URL("https://www.ebay.com/sch/i.html");
  url.searchParams.set("_nkw", words);
  if (campaignId && /^\d{6,12}$/.test(campaignId)) {
    url.searchParams.set("mkcid", "1");
    url.searchParams.set("mkrid", "711-53200-19255-0");
    url.searchParams.set("siteid", "0");
    url.searchParams.set("campid", campaignId);
    url.searchParams.set("toolid", "10001");
    url.searchParams.set("mkevt", "1");
  }
  return url.toString();
}

const RARITY: Record<string, { en: string; fr: string; color: string }> = {
  superTreasureHunt: { en: "Super Treasure Hunt", fr: "Super Treasure Hunt", color: "#f8c541" },
  treasureHunt: { en: "Treasure Hunt", fr: "Treasure Hunt", color: "#c9ced6" },
  redLineClub: { en: "RLC", fr: "RLC", color: "#e10a1e" },
  chase: { en: "Chase", fr: "Chase", color: "#a25bff" },
  premium: { en: "Premium", fr: "Premium", color: "#8a8a93" },
  mainline: { en: "Mainline", fr: "Mainline", color: "#3a3a44" },
};

// Same ids as the app (Diecast/Core/Badges.swift) and profile_badge.badge.
// Gold and silver stay for Treasure Hunts, violet a complete set, red the streaks.
const BADGES: Record<string, { en: string; fr: string; color: string }> = {
  first_th: { en: "First Treasure Hunt", fr: "Première Treasure Hunt", color: "#c9ced6" },
  first_sth: { en: "First Super Treasure Hunt", fr: "Première Super Treasure Hunt", color: "#f8c541" },
  sth_5: { en: "5 Super Treasure Hunts", fr: "5 Super Treasure Hunts", color: "#f8c541" },
  sth_10: { en: "10 Super Treasure Hunts", fr: "10 Super Treasure Hunts", color: "#f8c541" },
  cars_100: { en: "100 cars", fr: "100 voitures", color: "#8a8a93" },
  cars_500: { en: "500 cars", fr: "500 voitures", color: "#8a8a93" },
  cars_1000: { en: "1,000 cars", fr: "1 000 voitures", color: "#8a8a93" },
  th_year: { en: "Every TH of a year", fr: "Toutes les TH d'une année", color: "#a25bff" },
  sth_year: { en: "Every STH of a year", fr: "Toutes les STH d'une année", color: "#a25bff" },
  streak_4: { en: "4-week hunt streak", fr: "4 semaines de chasse", color: "#e10a1e" },
  streak_12: { en: "12-week hunt streak", fr: "12 semaines de chasse", color: "#e10a1e" },
  streak_52: { en: "52-week hunt streak", fr: "52 semaines de chasse", color: "#e10a1e" },
  contributor: { en: "Contributor", fr: "Contributeur", color: "#2bd46a" },
  founder: { en: "Founding member", fr: "Membre fondateur", color: "#8a8a93" },
  moderator: { en: "Moderator", fr: "Modérateur", color: "#2bd46a" },
};

const TEXT = {
  en: {
    cars: "cars", posts: "posts", followers: "followers", following: "following",
    finds: "Latest finds", garage: "Garage", wishlist: "Wishlist", privateGarage: "This garage is private.",
    noFinds: "No finds shared yet.", getApp: "Get Kastr", getAppLine: "Track your diecast collection, know what it's worth, hunt Treasure Hunts.",
    seeWishlist: "See the wishlist", findIt: "Find it on eBay", wishlistOf: (u: string) => `@${u}'s wishlist`,
    wishlistIntro: "Cars @USER would love to add to the garage. Each one links to a search to find it.",
    profileDescription: (u: string, cars: number | null) => `@${u} on Kastr${cars ? `: ${cars} cars in the garage` : ""}.`,
    caseLabel: "Case", member: "Collector since", notAffiliated: "Kastr is independent and not affiliated with Mattel, Inc.",
    privacy: "Privacy", backToProfile: "Profile", more: "more",
  },
  fr: {
    cars: "voitures", posts: "posts", followers: "abonnés", following: "abonnements",
    finds: "Dernières trouvailles", garage: "Garage", wishlist: "Liste d'envies", privateGarage: "Ce garage est privé.",
    noFinds: "Aucune trouvaille partagée pour l'instant.", getApp: "Télécharger Kastr", getAppLine: "Suis ta collection de miniatures, connais sa valeur, chasse les Treasure Hunts.",
    seeWishlist: "Voir la liste d'envies", findIt: "La trouver sur eBay", wishlistOf: (u: string) => `Liste d'envies de @${u}`,
    wishlistIntro: "Les voitures que @USER aimerait ajouter à son garage. Chacune renvoie vers une recherche pour la trouver.",
    profileDescription: (u: string, cars: number | null) => `@${u} sur Kastr${cars ? ` : ${cars} voitures au garage` : ""}.`,
    caseLabel: "Caisse", member: "Collectionneur depuis", notAffiliated: "Kastr est indépendant et n'est pas affilié à Mattel, Inc.",
    privacy: "Confidentialité", backToProfile: "Profil", more: "de plus",
  },
} as const;

function formatCount(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", { notation: value >= 10000 ? "compact" : "standard" }).format(value);
}

function carTile(car: WebCar, locale: Locale, link?: string): string {
  const rarity = RARITY[car.rarity ?? "mainline"] ?? RARITY.mainline;
  const hunted = car.rarity === "superTreasureHunt" || car.rarity === "treasureHunt";
  const meta = [car.year ? String(car.year) : "", car.brand ?? "", car.case_code ? `${TEXT[locale].caseLabel} ${car.case_code}` : ""]
    .filter(Boolean)
    .map(escapeHtml)
    .join(" · ");
  const body = `
    <div class="tile${hunted ? " hunted" : ""}" style="--rarity:${rarity.color}">
      <div class="tile-art"><span>${escapeHtml(initials(car.name))}</span></div>
      ${car.rarity && car.rarity !== "mainline" ? `<span class="chip">${escapeHtml(rarity[locale])}</span>` : ""}
      ${car.copies && car.copies > 1 ? `<span class="copies">×${car.copies}</span>` : ""}
      <p class="tile-name">${escapeHtml(car.name)}</p>
      <p class="tile-meta">${meta}</p>
      ${link ? `<span class="tile-link">${escapeHtml(TEXT[locale].findIt)} →</span>` : ""}
    </div>`;
  return link ? `<a class="tile-wrap" href="${escapeHtml(link)}" rel="nofollow sponsored noopener" target="_blank">${body}</a>` : body;
}

function initials(name: string): string {
  const words = name.replace(/^'\d+\s*/, "").split(/\s+/).filter(Boolean);
  return (words.slice(0, 2).map((word) => word[0]).join("") || "K").toUpperCase();
}

export interface RenderOptions {
  locale: Locale;
  page: ProfilePage;
  appUrl: string;
  campaignId?: string;
}

export function renderProfile(profile: WebProfile, options: RenderOptions): string {
  const { locale, page, appUrl } = options;
  const t = TEXT[locale];
  const user = escapeHtml(profile.username);
  const canonical = `${SITE}/@${profile.username}${page === "wishlist" ? "/wishlist" : ""}`;
  const firstPhoto = profile.finds?.[0]?.photo_path;
  const ogImage = firstPhoto ? findPhotoUrl(firstPhoto) : `${SITE}/${locale}/opengraph-image`;
  const title = page === "wishlist" ? `${t.wishlistOf(profile.username)} · Kastr` : `@${profile.username} · Kastr`;
  const description = page === "wishlist"
    ? t.wishlistIntro.replace("USER", profile.username)
    : (profile.bio?.trim() || t.profileDescription(profile.username, profile.counts.cars));
  // The wishlist is for family and friends: never indexed. The profile only once it has content.
  const indexable = page === "profile" && profile.indexable;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: canonical,
    mainEntity: {
      "@type": "Person",
      alternateName: profile.username,
      ...(profile.bio ? { description: profile.bio } : {}),
      interactionStatistic: [
        { "@type": "InteractionCounter", interactionType: "https://schema.org/FollowAction", userInteractionCount: profile.counts.followers },
        { "@type": "InteractionCounter", interactionType: "https://schema.org/WriteAction", userInteractionCount: profile.counts.posts },
      ],
    },
  };

  const stats: [number, string][] = [
    [profile.counts.posts, t.posts],
    [profile.counts.followers, t.followers],
    [profile.counts.following, t.following],
  ];
  if (profile.counts.cars !== null) stats.unshift([profile.counts.cars, t.cars]);
  const counters = stats
    .map(([value, label]) => `<div class="stat"><b>${formatCount(value, locale)}</b><span>${escapeHtml(label)}</span></div>`)
    .join("");

  const badges = (profile.badges ?? [])
    .filter((badge) => BADGES[badge.badge])
    .slice(0, 12)
    .map((badge) => {
      const known = BADGES[badge.badge];
      return `<span class="badge" style="--tone:${known.color}">${escapeHtml(known[locale])}</span>`;
    })
    .join("");

  const rarityChips = Object.entries(profile.rarities ?? {})
    .filter(([rarity]) => rarity !== "mainline" && RARITY[rarity])
    .sort((a, b) => b[1] - a[1])
    .map(([rarity, count]) => `<span class="chip" style="--rarity:${RARITY[rarity].color}">${count} ${escapeHtml(RARITY[rarity][locale])}</span>`)
    .join("");

  const header = `
    <section class="card profile">
      <div class="avatar${profile.avatar && (profile.avatar.rarity === "superTreasureHunt" || profile.avatar.rarity === "treasureHunt") ? " hunted" : ""}">
        <span>${escapeHtml(profile.avatar ? initials(profile.avatar.name) : profile.username.slice(0, 1).toUpperCase())}</span>
      </div>
      <h1 class="display">@${user}</h1>
      ${profile.avatar ? `<p class="eyebrow">${escapeHtml(profile.avatar.name)}${profile.avatar.year ? ` · ${profile.avatar.year}` : ""}</p>` : ""}
      ${profile.bio ? `<p class="bio">${escapeHtml(profile.bio)}</p>` : ""}
      <div class="stats">${counters}</div>
      ${badges ? `<div class="badges">${badges}</div>` : ""}
      <a class="cta" href="${escapeHtml(appUrl)}">${escapeHtml(t.getApp)}</a>
    </section>`;

  let content: string;
  if (page === "wishlist") {
    const cars = profile.wishlist ?? [];
    content = `
      <section>
        <p class="intro">${escapeHtml(t.wishlistIntro.replace("USER", profile.username))}</p>
        <div class="grid">${cars.map((car) => carTile(car, locale, ebaySearchUrl(car, options.campaignId))).join("")}</div>
        <p class="back"><a href="/@${user}">← ${escapeHtml(t.backToProfile)}</a></p>
      </section>`;
  } else {
    const finds = profile.finds ?? [];
    const findsHtml = finds.length
      ? `<div class="finds">${finds
          .map((find) => `
            <figure class="find">
              <img src="${escapeHtml(findPhotoUrl(find.photo_path))}" alt="${escapeHtml(find.car?.name ?? find.body ?? "")}" loading="lazy">
              <figcaption>${find.car ? `<b>${escapeHtml(find.car.name)}</b>${find.car.year ? ` · ${find.car.year}` : ""}` : ""}${find.body ? `<span>${escapeHtml(find.body)}</span>` : ""}</figcaption>
            </figure>`)
          .join("")}</div>`
      : `<p class="empty">${escapeHtml(t.noFinds)}</p>`;
    const garage = profile.garage_public && profile.garage
      ? `<div class="chips">${rarityChips}</div><div class="grid">${profile.garage.map((car) => carTile(car, locale)).join("")}</div>${
          profile.counts.cars !== null && profile.counts.cars > profile.garage.length
            ? `<p class="empty">+ ${formatCount(profile.counts.cars - profile.garage.length, locale)} ${escapeHtml(t.more)}</p>`
            : ""
        }`
      : `<p class="empty">${escapeHtml(t.privateGarage)}</p>`;
    content = `
      <section><h2 class="section">${escapeHtml(t.finds)}</h2>${findsHtml}</section>
      <section><h2 class="section">${escapeHtml(t.garage)}</h2>${garage}</section>
      ${profile.wishlist_public ? `<p class="back"><a href="/@${user}/wishlist">${escapeHtml(t.seeWishlist)} →</a></p>` : ""}`;
  }

  return `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description.slice(0, 160))}">
<link rel="canonical" href="${escapeHtml(canonical)}">
${indexable ? "" : '<meta name="robots" content="noindex">'}
<meta property="og:type" content="profile">
<meta property="og:site_name" content="Kastr">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description.slice(0, 200))}">
<meta property="og:url" content="${escapeHtml(canonical)}">
<meta property="og:image" content="${escapeHtml(ogImage)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/icon">
<link rel="apple-touch-icon" href="/apple-icon">
<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
<style>${STYLE}</style>
</head>
<body>
<header class="top"><a href="/${locale}" class="logo display"><span class="bars"></span>KASTR</a></header>
<main>${header}${content}</main>
<footer><p>${escapeHtml(t.notAffiliated)}</p><p><a href="/${locale}/privacy">${escapeHtml(t.privacy)}</a> · <a href="/${locale}">kastr.app</a></p></footer>
</body>
</html>`;
}

export function findPhotoUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/post-photos/${path.split("/").map(encodeURIComponent).join("/")}`;
}

export function renderNotFound(locale: Locale): string {
  const text = locale === "fr"
    ? { title: "Profil introuvable", body: "Ce profil n'existe pas ou n'est pas public.", back: "Aller sur kastr.app" }
    : { title: "Profile not found", body: "This profile does not exist or is not public.", back: "Go to kastr.app" };
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${text.title} · Kastr</title><meta name="robots" content="noindex"><style>${STYLE}</style></head>
<body><header class="top"><a href="/${locale}" class="logo display"><span class="bars"></span>KASTR</a></header>
<main><section class="card profile"><h1 class="display">${text.title}</h1><p class="bio">${text.body}</p><a class="cta" href="/${locale}">${text.back}</a></section></main></body></html>`;
}

const STYLE = `
@font-face{font-family:Saira;src:url(/fonts/saira-latin.woff2) format("woff2");font-weight:100 900;font-stretch:50% 125%;font-display:swap}
:root{--carbon:#0b0b0e;--surface:#16161b;--surface2:#202027;--line:#2a2a33;--ink:#f4f4f5;--muted:#a1a1aa;--accent:#e10a1e;--titanium:#c9ced6;--gold:#f8c541;--studio:#eeedea;color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;background:var(--carbon);color:var(--ink);font:16px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
a{color:inherit}
.display{font-family:Saira,"Arial Narrow",sans-serif;font-stretch:125%;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:.02em}
.top{padding:18px 20px;max-width:960px;margin:0 auto}
.logo{text-decoration:none;font-size:22px;display:inline-flex;align-items:center;gap:10px}
.bars{width:22px;height:12px;background:repeating-linear-gradient(180deg,var(--accent) 0 3px,transparent 3px 5px);transform:skewX(-20deg)}
main{max-width:960px;margin:0 auto;padding:0 16px 48px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:22px;padding:24px}
.profile{text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px}
.avatar{width:112px;height:112px;border-radius:50%;background:var(--studio);color:#111;display:grid;place-items:center;font:900 italic 38px/1 Saira,sans-serif;font-stretch:125%;border:3px solid var(--line)}
.avatar.hunted{border-color:var(--gold);box-shadow:0 0 28px rgba(248,197,65,.35)}
h1{font-size:30px;margin:8px 0 0;word-break:break-all}
.eyebrow{margin:0;color:var(--gold);font:800 12px/1.2 Saira,sans-serif;font-stretch:125%;letter-spacing:.14em;text-transform:uppercase}
.bio{margin:4px 0;color:var(--muted);max-width:520px}
.stats{display:flex;gap:18px;justify-content:center;margin:10px 0;flex-wrap:wrap}
.stat{display:flex;flex-direction:column;align-items:center}
.stat b{font:800 22px/1 Saira,sans-serif;font-stretch:125%;font-variant-numeric:tabular-nums}
.stat span{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:6px}
.badges,.chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:6px 0}
.badge,.chip{border:1px solid var(--line);background:var(--surface2);border-radius:999px;padding:4px 12px;font-size:12px;font-weight:700}
.badge{border-color:var(--tone,var(--line))}
.chip{border-color:var(--rarity,var(--line));color:var(--ink)}
.cta{margin-top:12px;background:linear-gradient(180deg,#f0182c,#c30716);color:#fff;text-decoration:none;font:800 15px/1 Saira,sans-serif;font-stretch:125%;text-transform:uppercase;letter-spacing:.08em;padding:16px 28px;border-radius:14px}
.section{font:900 italic 18px/1 Saira,sans-serif;font-stretch:125%;text-transform:uppercase;margin:32px 0 14px;display:flex;align-items:center;gap:10px}
.section:before{content:"";width:4px;height:18px;background:var(--accent);border-radius:2px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
.tile-wrap{text-decoration:none}
.tile{position:relative;background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:10px;height:100%}
.tile.hunted{border-color:var(--rarity)}
.tile-art{aspect-ratio:4/3;border-radius:12px;background:var(--studio);display:grid;place-items:center;color:#2a2a33;font:900 italic 30px/1 Saira,sans-serif;font-stretch:125%;border-bottom:4px solid var(--rarity)}
.tile .chip{position:absolute;top:16px;left:16px;max-width:calc(100% - 72px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:10px;padding:3px 8px;background:#0b0b0ecc}
.copies{position:absolute;top:16px;right:16px;font:800 12px/1 Saira,sans-serif;background:#0b0b0ecc;border-radius:999px;padding:4px 8px}
.tile-name{margin:10px 2px 0;font-weight:700;font-size:14px;line-height:1.25}
.tile-meta{margin:4px 2px 0;color:var(--muted);font-size:12px}
.tile-link{display:block;margin:8px 2px 0;color:var(--accent);font-size:12px;font-weight:700}
.finds{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.find{margin:0;background:var(--surface);border:1px solid var(--line);border-radius:18px;overflow:hidden}
.find img{width:100%;aspect-ratio:1;object-fit:cover;display:block;background:var(--studio)}
.find figcaption{padding:10px 12px;font-size:13px;display:flex;flex-direction:column;gap:2px}
.find figcaption span{color:var(--muted)}
.empty,.intro{color:var(--muted)}
.back{margin-top:24px;text-align:center;font-weight:700}
footer{max-width:960px;margin:0 auto;padding:24px 16px 40px;color:var(--muted);font-size:12px;text-align:center}
`;
