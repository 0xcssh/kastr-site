"use client";

import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";

// "On eBay now": live listings with their eBay photos, fetched at visit time from the Worker (/api/listings/<id>),
// which only returns listings fetched less than 6 hours ago (eBay API License §8.1.3). The block stays visually
// apart from our own data (§8.1.2) and is never baked into the static page. Affiliate links (EPN).

type Listing = { title: string; price: number; currency: string; image: string | null; url: string };
type Answer = { fetchedAt: string; listings: Listing[]; minutes?: number };

export function LiveListings({
  variationId,
  searchUrl,
  locale,
  copy,
}: {
  variationId: string;
  searchUrl: string;
  locale: string;
  copy: { title: string; disclosure: string; view: string; search: string; loading: string; note: string; noteMinutes: string };
}) {
  const [answer, setAnswer] = useState<Answer | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    fetch(`/api/listings/${variationId}`)
      .then((r) => (r.status === 200 ? (r.json() as Promise<Answer>) : null))
      // The age is computed once, when the answer arrives (render stays pure).
      .then((a) =>
        alive &&
        setAnswer(
          a && a.listings.length
            ? { ...a, minutes: Math.max(0, Math.round((Date.now() - Date.parse(a.fetchedAt)) / 60000)) }
            : null,
        ),
      )
      .catch(() => alive && setAnswer(null));
    return () => {
      alive = false;
    };
  }, [variationId]);

  const minutes = answer?.minutes ?? 0;
  const price = (l: Listing) => new Intl.NumberFormat(locale, { style: "currency", currency: l.currency }).format(l.price);

  return (
    <section aria-label={copy.title} className="rounded-[20px] border border-dashed border-ink/20 p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">{copy.title}</h2>
        {answer && (
          <p className="text-xs text-muted">{minutes < 2 ? copy.note : copy.noteMinutes.replace("{m}", String(minutes))}</p>
        )}
      </div>

      {answer === undefined && <p className="mt-4 text-sm text-muted">{copy.loading}</p>}

      {answer && (
        <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {answer.listings.map((l) => (
            <li key={l.url}>
              <a
                href={l.url}
                rel="sponsored nofollow noopener"
                target="_blank"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface hover:border-ink/30"
              >
                <div className="aspect-square bg-white">
                  {l.image && (
                    // eBay serves its own listing photos; we never copy them (they change with the listing).
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={l.image} alt={l.title} loading="lazy" decoding="async" className="h-full w-full object-contain" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <span className="line-clamp-2 text-xs text-muted">{l.title}</span>
                  <span className="mt-auto pt-2 font-display text-base font-extrabold tabular-nums text-ink">{price(l)}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}

      <a
        href={searchUrl}
        rel="sponsored nofollow noopener"
        target="_blank"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-ink"
      >
        {answer ? copy.view : copy.search}
        <ArrowSquareOut aria-hidden="true" className="h-4 w-4" />
      </a>
      <p className="mt-3 text-xs text-faint">{copy.disclosure}</p>
    </section>
  );
}
