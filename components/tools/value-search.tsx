"use client";

import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ListingPhoto } from "@/components/hunt/listing-photo";
import type { ToolsCopy } from "@/lib/tools-copy";

// Value lookup: the catalog searched through the Worker (/api/search), each result with its live photo and
// value from /api/photos. The query lives in the URL (?q=) so a search can be shared and reloaded.

type Result = {
  id: string;
  name: string;
  brand: string;
  year: number | null;
  rarity: string;
  colour: string | null;
  series: string | null;
  toyNumber: string | null;
  path: string | null;
};

type State = { status: "idle" } | { status: "loading" } | { status: "error" } | { status: "done"; results: Result[] };

export function ValueSearch({ copy, rarity, locale, bcp47 }: { copy: ToolsCopy["value"]; rarity: Record<string, string>; locale: string; bcp47: string }) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });

  async function run(q: string) {
    const trimmed = q.trim();
    if (trimmed.length < 2) return;
    setState({ status: "loading" });
    const url = new URL(window.location.href);
    url.searchParams.set("q", trimmed);
    window.history.replaceState(null, "", url);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
      if (!res.ok) throw new Error(String(res.status));
      const { results } = (await res.json()) as { results: Result[] };
      setState({ status: "done", results });
    } catch {
      setState({ status: "error" });
    }
  }

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (!q) return;
    // Restoring a shared search from the URL is a sync with an external system, done once on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(q);
    void run(q);
  }, []);

  const tone = (r: string) => (r === "superTreasureHunt" || r === "redLineClub" ? "gold" : "silver");

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          void run(query);
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="value-q" className="sr-only">
          {copy.label}
        </label>
        <div className="relative flex-1">
          <MagnifyingGlass aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-faint" />
          <input
            id="value-q"
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.placeholder}
            className="h-14 w-full rounded-2xl border border-line bg-surface pl-12 pr-4 text-base text-ink placeholder:text-faint focus:border-accent focus:outline-none"
          />
        </div>
        <button type="submit" className="h-14 rounded-2xl bg-accent px-7 font-display text-base font-extrabold uppercase tracking-wide text-white hover:brightness-110">
          {copy.button}
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {copy.examples.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => {
              setQuery(ex);
              void run(ex);
            }}
            className="rounded-full border border-line px-3 py-1 text-muted hover:border-accent hover:text-ink"
          >
            {ex}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-8">
        {state.status === "loading" && <p className="text-muted">{copy.searching}</p>}
        {state.status === "error" && <p className="text-muted">{copy.error}</p>}
        {state.status === "done" && state.results.length === 0 && <p className="text-muted">{copy.empty}</p>}
        {state.status === "done" && state.results.length > 0 && (
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {state.results.map((r) => {
              const body = (
                <>
                  <ListingPhoto variationId={r.id} alt={`${r.name} ${r.year ?? ""}`.trim()} tone={tone(r.rarity)} locale={bcp47} />
                  <span className="block px-2 pb-2 pt-3">
                    <span className="block font-display text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
                      {[r.brand, r.year, rarity[r.rarity] ?? r.rarity].filter(Boolean).join(" · ")}
                    </span>
                    <span className="mt-1 block font-semibold leading-tight text-ink">{r.name}</span>
                    <span className="mt-1 block text-sm text-muted">{[r.colour, r.toyNumber].filter(Boolean).join(" · ")}</span>
                    {r.path && <span className="mt-2 block text-sm font-semibold text-accent-ink">{copy.huntPage} →</span>}
                  </span>
                </>
              );
              const box = "flex h-full flex-col rounded-[20px] border border-ink/10 bg-surface p-2";
              return (
                <li key={r.id}>
                  {r.path ? (
                    <Link href={`/${locale}${r.path}`} className={`${box} hover:border-ink/30`}>
                      {body}
                    </Link>
                  ) : (
                    <div className={box}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
