"use client";

import { Flame } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";

// The photo of a hunt card: the picture of the car's cheapest live eBay listing, loaded at visit time
// (eBay API License §8.1.3: listing data shown is at most 6 hours old, so it is never baked into the page).
// Every card of a page asks at once; one batched request answers them all (/api/photos in the Worker).
// The photo carries an "eBay" tag so it is never mistaken for our own content (§8.1.2).

type Photo = { image: string; url: string; fetchedAt: string };

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
  size = "card",
  caption,
}: {
  variationId: string;
  alt: string;
  tone: "gold" | "silver";
  size?: "card" | "hero";
  /** Hero only: the line under the photo ("Photo from an eBay listing"), linked to the listing. */
  caption?: string;
}) {
  const [photo, setPhoto] = useState<Photo | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    requestPhoto(variationId, (p) => alive && setPhoto(p));
    return () => {
      alive = false;
    };
  }, [variationId]);

  const box = size === "hero" ? "aspect-[4/3] rounded-[20px]" : "aspect-[4/3] rounded-2xl";
  return (
    <figure className="m-0">
      <div className={`relative flex items-center justify-center overflow-hidden bg-studio ${box}`}>
        {photo ? (
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
        {photo && (
          <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            eBay
          </span>
        )}
      </div>
      {size === "hero" && photo && caption && (
        <figcaption className="mt-2 text-xs text-faint">
          <a href={photo.url} rel="sponsored nofollow noopener" target="_blank" className="underline underline-offset-2 hover:text-ink">
            {caption}
          </a>
        </figcaption>
      )}
    </figure>
  );
}
