"use client";

import { Flame } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";

// The photo and value of a hunt card, loaded at visit time from the car's live eBay listings (eBay API License
// §8.1.3: listing data shown is at most 6 hours old, so it is never baked into the page). The value is the app's:
// the cheapest carded Buy It Now listing. Every card of a page asks at once; one batched request answers them
// all (/api/photos in the Worker).

type Value = { price: number; currency: string; listings: number | null };
type Photo = { image: string | null; fetchedAt: string; value: Value | null };

const waiting = new Map<string, ((photo: Photo | null) => void)[]>();
let timer: ReturnType<typeof setTimeout> | null = null;

function flush() {
  timer = null;
  const ids = [...waiting.keys()];
  const callbacks = new Map(waiting);
  waiting.clear();
  for (let i = 0; i < ids.length; i += 40) {
    const batch = ids.slice(i, i + 40);
    fetch(`/api/photos?ids=${batch.join(",")}`)
      .then((r) => (r.ok ? (r.json() as Promise<{ photos: Record<string, Photo> }>) : { photos: {} as Record<string, Photo> }))
      .catch(() => ({ photos: {} as Record<string, Photo> }))
      .then(({ photos }) => batch.forEach((id) => callbacks.get(id)?.forEach((done) => done(photos[id] ?? null))));
  }
}

function requestPhoto(id: string, done: (photo: Photo | null) => void) {
  waiting.set(id, [...(waiting.get(id) ?? []), done]);
  timer ??= setTimeout(flush, 0);
}

export function ListingPhoto({
  variationId,
  alt,
  tone,
  locale,
  size = "card",
  valueCopy,
}: {
  variationId: string;
  alt: string;
  tone: "gold" | "silver";
  /** BCP 47 locale for the price ("en-US", "fr-FR"). */
  locale: string;
  size?: "card" | "hero";
  /** Hero only: "Value" and "lowest carded price of {n} listings on eBay". */
  valueCopy?: { label: string; note: string };
}) {
  const [photo, setPhoto] = useState<Photo | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    requestPhoto(variationId, (p) => alive && setPhoto(p));
    return () => {
      alive = false;
    };
  }, [variationId]);

  const value = photo?.value;
  const price = value
    ? new Intl.NumberFormat(locale, { style: "currency", currency: value.currency, maximumFractionDigits: value.price >= 100 ? 0 : 2 }).format(value.price)
    : null;

  return (
    <figure className="m-0">
      <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-studio ${size === "hero" ? "rounded-[20px]" : "rounded-2xl"}`}>
        {photo?.image ? (
          // eBay serves its own listing photos; we never copy them (they change with the listing).
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.image} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-contain" />
        ) : (
          <span
            aria-hidden="true"
            className={`flex h-14 w-14 items-center justify-center rounded-full text-[#16161b] ${
              tone === "gold" ? "spectraflame" : "bg-[linear-gradient(115deg,#ffffff,#c9ced6_45%,#8a919c_70%,#e6e9ee)]"
            } ${photo === undefined ? "animate-pulse" : "opacity-60"}`}
          >
            <Flame weight="fill" className="h-7 w-7" />
          </span>
        )}
        {price && size === "card" && (
          <span className="absolute bottom-2 right-2 rounded-lg bg-[#0b0b0e]/85 px-2 py-1 font-display text-sm font-extrabold tabular-nums text-white">
            {price}
          </span>
        )}
      </div>
      {price && size === "hero" && valueCopy && (
        <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">{valueCopy.label}</span>
          <span className="font-display text-3xl font-black tabular-nums text-ink">{price}</span>
          {value?.listings ? <span className="text-sm text-muted">{valueCopy.note.replace("{n}", String(value.listings))}</span> : null}
        </figcaption>
      )}
    </figure>
  );
}
