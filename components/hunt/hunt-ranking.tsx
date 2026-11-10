"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// A year's Treasure Hunts and Supers ranked by value, worked out at visit time from their live eBay listings
// (/api/photos, the same data as the hunt cards). Never baked into the page: eBay API License §8.1.3 caps
// listing data at 6 hours old, and the ranking moves with the market.

export type RankingCar = { id: string; name: string; rarity: "sth" | "th"; caseCode: string | null; href: string };
type Value = { price: number; currency: string; listings: number | null };
type Photo = { image: string | null; value: Value | null };

const COPY = {
  en: { loading: "Loading today's listings…", none: "No fresh listing right now", sth: "Super", th: "TH", case: "Case", empty: "The listings are not answering right now. Reload in a minute." },
  fr: { loading: "Chargement des annonces du jour…", none: "Pas d'annonce récente", sth: "Super", th: "TH", case: "Caisse", empty: "Les annonces ne répondent pas pour l'instant. Recharge dans une minute." },
};

export function HuntRankingList({ cars, locale }: { cars: RankingCar[]; locale: "en" | "fr" }) {
  const c = COPY[locale];
  const [photos, setPhotos] = useState<Record<string, Photo> | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    const ids = cars.map((car) => car.id);
    const batches: string[][] = [];
    for (let i = 0; i < ids.length; i += 40) batches.push(ids.slice(i, i + 40));
    Promise.all(
      batches.map((b) =>
        fetch(`/api/photos?ids=${b.join(",")}`)
          .then((r) => (r.ok ? (r.json() as Promise<{ photos: Record<string, Photo> }>) : { photos: {} }))
          .catch(() => ({ photos: {} as Record<string, Photo> })),
      ),
    ).then((results) => {
      if (!alive) return;
      const merged = Object.assign({}, ...results.map((r) => r.photos)) as Record<string, Photo>;
      setPhotos(Object.keys(merged).length ? merged : null);
    });
    return () => {
      alive = false;
    };
  }, [cars]);

  if (photos === undefined) return <p className="mt-6 animate-pulse text-muted">{c.loading}</p>;
  if (photos === null) return <p className="mt-6 text-muted">{c.empty}</p>;

  const bcp47 = locale === "fr" ? "fr-FR" : "en-US";
  const ranked = [...cars].sort((a, b) => (photos[b.id]?.value?.price ?? -1) - (photos[a.id]?.value?.price ?? -1));

  return (
    <ol className="mt-6 divide-y divide-line overflow-hidden rounded-[20px] border border-ink/10 bg-surface">
      {ranked.map((car, i) => {
        const p = photos[car.id];
        const v = p?.value;
        const price = v
          ? new Intl.NumberFormat(bcp47, { style: "currency", currency: v.currency, maximumFractionDigits: v.price >= 100 ? 0 : 2 }).format(v.price)
          : null;
        return (
          <li key={car.id}>
            <Link href={car.href} className="flex items-center gap-4 px-4 py-3 hover:bg-ink/[0.03]">
              <span className="w-7 shrink-0 text-right font-display text-lg font-black italic tabular-nums text-faint">{i + 1}</span>
              <span className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-studio">
                {p?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={car.name} loading="lazy" decoding="async" className="h-full w-full object-contain" />
                ) : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold text-ink">{car.name}</span>
                <span className="block text-sm text-muted">
                  {car.rarity === "sth" ? c.sth : c.th}
                  {car.caseCode ? ` · ${c.case} ${car.caseCode}` : ""}
                </span>
              </span>
              <span className={`shrink-0 text-right ${price ? "font-display text-lg font-extrabold tabular-nums text-ink" : "text-xs text-faint"}`}>
                {price ?? c.none}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
