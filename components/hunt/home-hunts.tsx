import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { SectionLabel } from "@/components/kit";
import { huntCopy } from "@/lib/hunt-copy";
import { casesPath, huntPath, huntYears, huntsOfYear } from "@/lib/hunts";
import type { Locale } from "@/lib/i18n";
import { bcp47 } from "./hunt-views";
import { ListingPhoto } from "./listing-photo";

// Home teaser of the hunt lists: the newest complete year of Supers with their live photos, and the ways in
// (next year, Treasure Hunts, cases, the spotting guide). Without it a phone visitor never sees the lists.

export function HomeHunts({ locale }: { locale: Locale }) {
  const c = huntCopy(locale);
  const home = `/${locale}`;
  const years = huntYears("sth");
  // The newest year with a full list (15 or so), not the one still being revealed.
  const year = years.find((y) => huntsOfYear("sth", y).length >= 12) ?? years[0];
  const next = years.find((y) => y > year);
  const cars = huntsOfYear("sth", year).slice(0, 8);
  const chip = "rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-accent";

  return (
    <section className="reveal mx-auto mt-24 max-w-7xl px-5 sm:px-8">
      <SectionLabel>{c.navLabel}</SectionLabel>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <h2 className="max-w-[22ch] font-display text-3xl font-black uppercase leading-[0.95] tracking-tight text-ink md:text-4xl">
          {c.home.title(year)}
        </h2>
        <Link
          href={`${home}${huntPath.sth}/${year}`}
          className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4"
        >
          {c.home.all(year)}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
      <p className="mt-4 max-w-[60ch] text-muted">{c.home.body}</p>

      <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {cars.map((h) => (
          <li key={h.id}>
            <Link
              href={`${home}${huntPath.sth}/${h.year}/${h.slug}`}
              className="flex h-full flex-col rounded-[20px] border border-ink/10 bg-surface p-2 hover:border-ink/30"
            >
              <ListingPhoto variationId={h.id} alt={c.carTitle(h)} tone="gold" locale={bcp47(locale)} />
              <span className="px-2 pb-2 pt-3">
                <span className="block font-display text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
                  {c.caseHeading(h.caseCode)}
                </span>
                <span className="mt-1 block truncate font-semibold leading-tight text-ink">{h.name}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <nav aria-label={c.navLabel} className="mt-6 flex flex-wrap gap-2">
        {next && (
          <Link href={`${home}${huntPath.sth}/${next}`} className={chip}>
            {c.otherList("sth", next)}
          </Link>
        )}
        <Link href={`${home}${huntPath.th}/${year}`} className={chip}>
          {c.otherList("th", year)}
        </Link>
        <Link href={`${home}${casesPath}/${next ?? year}`} className={chip}>
          {c.cases.link(next ?? year)}
        </Link>
        <Link href={`${home}/blog/how-to-spot-a-super-treasure-hunt`} className={chip}>
          {c.home.guide}
        </Link>
      </nav>
    </section>
  );
}
