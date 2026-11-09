import { ArrowRight, ArrowSquareOut, CaretRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { AnswerBlock } from "@/components/answer-block";
import { AppStoreBadge } from "@/components/app-store-badge";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { HuntMedal, SectionLabel, SpeedStripes } from "@/components/kit";
import { SiteShell } from "@/components/site-shell";
import { config } from "@/lib/config";
import { getDict } from "@/lib/dictionaries";
import { huntCopy } from "@/lib/hunt-copy";
import {
  caseMates,
  caseYears,
  casesPath,
  huntPath,
  huntYears,
  huntsOfYear,
  isOpenYear,
  lastUpdated,
  splitSeries,
  type Hunt,
  type HuntRarity,
} from "@/lib/hunts";
import { localeUrl, type Locale } from "@/lib/i18n";
import { breadcrumbSchema, faqPageSchema, graph, webPageSchema } from "@/lib/schema";
import { ListingPhoto } from "./listing-photo";
import { LiveListings } from "./live-listings";

// The three hunt page types: the hub (years), a year's list grouped by case, and one car.

const H1 = "font-display text-[2rem] font-black uppercase italic leading-[1.02] tracking-tight text-ink sm:text-5xl";
const other = (r: HuntRarity): HuntRarity => (r === "sth" ? "th" : "sth");

export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
      {items.map((it, i) => (
        <span key={it.name} className="inline-flex items-center gap-1.5">
          {i > 0 && <CaretRight aria-hidden="true" className="h-3.5 w-3.5 text-faint" />}
          {it.href ? (
            <Link href={it.href} className="hover:text-ink">
              {it.name}
            </Link>
          ) : (
            <span className="text-ink">{it.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className={`mt-6 flex items-start gap-[0.3em] ${H1}`}>
      <SpeedStripes className="mt-[0.28em] shrink-0" />
      <span>{children}</span>
    </h1>
  );
}

export function AppCta({ locale }: { locale: Locale }) {
  const c = huntCopy(locale);
  return (
    <section className="mx-auto mt-20 max-w-7xl px-5 sm:px-8">
      <div className="relative overflow-hidden rounded-[20px] border border-ink/10 bg-surface p-7 sm:p-10">
        <div aria-hidden="true" className="checker absolute inset-y-0 right-0 w-1/3 opacity-[0.05]" />
        <p className="relative font-display text-2xl font-black uppercase italic tracking-tight text-ink sm:text-3xl">{c.cta.title}</p>
        <p className="relative mt-3 max-w-[56ch] text-muted">{c.cta.body}</p>
        <div className="relative mt-6">
          <AppStoreBadge d={getDict(locale)} />
        </div>
      </div>
    </section>
  );
}

function ebaySearchUrl(h: Hunt): string {
  const q = `Hot Wheels ${h.year} ${h.name} ${h.rarity === "sth" ? "super treasure hunt" : "treasure hunt"}`;
  const params = new URLSearchParams({
    _nkw: q,
    mkevt: "1",
    mkcid: "1",
    mkrid: "711-53200-19255-0",
    campid: config.ebayCampaignId,
    toolid: "10001",
  });
  return `https://www.ebay.com/sch/i.html?${params}`;
}

/* ---------- Hub: /[locale]/super-treasure-hunt ---------- */

export function huntHubMeta(locale: Locale, rarity: HuntRarity) {
  const c = huntCopy(locale);
  return { path: huntPath[rarity], title: c.hubTitle[rarity], description: c.hubDescription[rarity] };
}

export function HuntHub({ locale, rarity }: { locale: Locale; rarity: HuntRarity }) {
  const c = huntCopy(locale);
  const meta = huntHubMeta(locale, rarity);
  const years = huntYears(rarity);
  const home = `/${locale}`;
  const faq = [{ q: c.hubQuestion[rarity], a: c.hubAnswer[rarity] }];

  return (
    <SiteShell locale={locale} path={meta.path}>
      <JsonLd
        data={graph(
          webPageSchema({ locale, ...meta }),
          breadcrumbSchema([
            { name: c.breadcrumbHome, url: localeUrl(locale) },
            { name: c.plural[rarity], url: localeUrl(locale, meta.path) },
          ]),
          faqPageSchema(faq),
        )}
      />
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <Crumbs items={[{ name: c.breadcrumbHome, href: home }, { name: c.plural[rarity] }]} />
        <Title>{meta.title}</Title>
      </div>
      <div className="mt-10">
        <AnswerBlock question={c.hubQuestion[rarity]}>{c.hubAnswer[rarity]}</AnswerBlock>
      </div>
      <section className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
        <SectionLabel>{c.yearsLabel}</SectionLabel>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {years.map((y) => (
            <li key={y}>
              <Link
                href={`${home}${meta.path}/${y}`}
                className="flex items-center justify-between rounded-2xl border border-ink/10 bg-surface px-5 py-4 hover:border-ink/30"
              >
                <span>
                  <span className="block font-display text-2xl font-black tabular-nums text-ink">{y}</span>
                  <span className="text-sm text-muted">{c.cars(huntsOfYear(rarity, y).length)}</span>
                </span>
                <HuntMedal tone={rarity === "sth" ? "gold" : "silver"} />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          <Link href={`${home}${huntPath[other(rarity)]}`} className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4">
            {c.hubTitle[other(rarity)]}
          </Link>
        </p>
      </section>
      <AppCta locale={locale} />
    </SiteShell>
  );
}

/* ---------- Year: /[locale]/super-treasure-hunt/2026 ---------- */

export function huntYearMeta(locale: Locale, rarity: HuntRarity, year: number) {
  const c = huntCopy(locale);
  const list = huntsOfYear(rarity, year);
  return {
    path: `${huntPath[rarity]}/${year}`,
    title: c.yearTitle(rarity, year),
    description: c.yearDescription(rarity, year, list.length),
  };
}

export function HuntYear({ locale, rarity, year }: { locale: Locale; rarity: HuntRarity; year: number }) {
  const c = huntCopy(locale);
  const meta = huntYearMeta(locale, rarity, year);
  const list = huntsOfYear(rarity, year);
  const home = `/${locale}`;
  const faq = c.yearFaq(rarity, year, list);
  const years = huntYears(rarity);
  const otherYearExists = huntYears(other(rarity)).includes(year);

  return (
    <SiteShell locale={locale} path={meta.path}>
      <JsonLd
        data={graph(
          webPageSchema({ locale, ...meta }),
          breadcrumbSchema([
            { name: c.breadcrumbHome, url: localeUrl(locale) },
            { name: c.plural[rarity], url: localeUrl(locale, huntPath[rarity]) },
            { name: String(year), url: localeUrl(locale, meta.path) },
          ]),
          {
            "@type": "ItemList",
            name: meta.title,
            numberOfItems: list.length,
            itemListElement: list.map((h, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.carTitle(h),
              url: localeUrl(locale, `${meta.path}/${h.slug}`),
            })),
          },
          faqPageSchema(faq),
        )}
      />
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <Crumbs
          items={[
            { name: c.breadcrumbHome, href: home },
            { name: c.plural[rarity], href: `${home}${huntPath[rarity]}` },
            { name: String(year) },
          ]}
        />
        <Title>{meta.title}</Title>
        <p className="mt-4 text-sm text-muted">
          {c.updated(lastUpdated(list))}
          {isOpenYear(year) ? ` · ${c.openYear}` : ""}
        </p>
      </div>
      <div className="mt-10">
        <AnswerBlock question={c.yearQuestion(rarity, year)}>{c.yearAnswer(rarity, year, list)}</AnswerBlock>
      </div>

      <div className="mx-auto mt-14 max-w-7xl space-y-12 px-5 sm:px-8">
        {/* One grid in case order (A first), the case on each card: most cases hold a single hunt. */}
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((h) => {
            const s = splitSeries(h.series);
            return (
              <li key={h.id}>
                <Link
                  href={`${home}${meta.path}/${h.slug}`}
                  className="flex h-full flex-col rounded-[20px] border border-ink/10 bg-surface p-2 hover:border-ink/30"
                >
                  <ListingPhoto variationId={h.id} alt={c.carTitle(h)} tone={rarity === "sth" ? "gold" : "silver"} />
                  <span className="flex items-start gap-3 px-3 pb-3 pt-4">
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
                      {c.caseHeading(h.caseCode)}
                    </span>
                    <span className="mt-1 block font-semibold leading-tight text-ink">{h.name}</span>
                    <span className="mt-1 block text-sm text-muted">{[s.name, s.position].filter(Boolean).join(" · ")}</span>
                    <span className="mt-2 block text-sm text-muted">{[h.colour, h.toyNumber].filter(Boolean).join(" · ")}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-faint" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <section>
          <SectionLabel>{c.spotTitle}</SectionLabel>
          <ul className="mt-5 max-w-[68ch] space-y-3 text-muted">
            {c.cues({ rarity, year, toyNumber: null }).map((cue) => (
              <li key={cue} className="flex gap-3">
                <CheckCircle weight="fill" aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-chrono" />
                <span>{cue}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-3xl">
          <Faq items={faq} />
        </section>

        <nav aria-label={c.yearsLabel} className="flex flex-wrap gap-2 text-sm">
          {caseYears().includes(year) && (
            <Link href={`${home}${casesPath}/${year}`} className="rounded-full border border-accent px-4 py-2 font-semibold text-ink">
              {c.cases.link(year)}
            </Link>
          )}
          {otherYearExists && (
            <Link href={`${home}${huntPath[other(rarity)]}/${year}`} className="rounded-full border border-accent px-4 py-2 font-semibold text-ink">
              {c.otherList(other(rarity), year)}
            </Link>
          )}
          {years.slice(0, 12).map((y) =>
            y === year ? null : (
              <Link key={y} href={`${home}${huntPath[rarity]}/${y}`} className="rounded-full border border-line px-4 py-2 text-muted hover:text-ink">
                {y}
              </Link>
            ),
          )}
        </nav>

        <p className="text-xs text-faint">
          {c.source}: Hot Wheels Wiki (hotwheels.fandom.com), CC BY-SA.
        </p>
      </div>
      <AppCta locale={locale} />
    </SiteShell>
  );
}

/* ---------- Car: /[locale]/super-treasure-hunt/2026/drift-ender ---------- */

export function huntCarMeta(locale: Locale, h: Hunt) {
  const c = huntCopy(locale);
  return { path: `${huntPath[h.rarity]}/${h.year}/${h.slug}`, title: c.carTitle(h), description: c.carDescription(h) };
}

export function HuntCar({ locale, hunt: h }: { locale: Locale; hunt: Hunt }) {
  const c = huntCopy(locale);
  const meta = huntCarMeta(locale, h);
  const home = `/${locale}`;
  const yearPath = `${home}${huntPath[h.rarity]}/${h.year}`;
  const faq = c.faq(h);
  const mates = caseMates(h);
  const s = splitSeries(h.series);
  const rows: [string, string | null][] = [
    [c.spec.year, String(h.year)],
    [c.spec.series, [s.name, s.position].filter(Boolean).join(" · ") || null],
    [c.spec.case, h.caseCode],
    [c.spec.toyNumber, h.toyNumber],
    [c.spec.colour, h.colour],
    [c.spec.tampo, h.tampo],
    [c.spec.wheels, h.wheels],
    [c.spec.base, h.base],
    [c.spec.window, h.window],
    [c.spec.interior, h.interior],
    [c.spec.country, h.country],
    [c.spec.notes, h.notes],
  ];

  return (
    <SiteShell locale={locale} path={meta.path}>
      <JsonLd
        data={graph(
          webPageSchema({ locale, ...meta }),
          breadcrumbSchema([
            { name: c.breadcrumbHome, url: localeUrl(locale) },
            { name: c.plural[h.rarity], url: localeUrl(locale, huntPath[h.rarity]) },
            { name: String(h.year), url: localeUrl(locale, `${huntPath[h.rarity]}/${h.year}`) },
            { name: h.name, url: localeUrl(locale, meta.path) },
          ]),
          faqPageSchema(faq),
        )}
      />
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <Crumbs
          items={[
            { name: c.breadcrumbHome, href: home },
            { name: c.plural[h.rarity], href: `${home}${huntPath[h.rarity]}` },
            { name: String(h.year), href: yearPath },
            { name: h.name },
          ]}
        />
        <div className="mt-6 flex items-center gap-3">
          <HuntMedal size="lg" tone={h.rarity === "sth" ? "gold" : "silver"} />
          <SectionLabel>
            {c.label[h.rarity]} {h.year}
            {h.caseCode && (
              <>
                {" · "}
                <Link
                  href={`${home}${casesPath}/${h.year}#case-${h.caseCode.toLowerCase()}`}
                  className="underline decoration-accent decoration-2 underline-offset-4"
                >
                  {c.caseHeading(h.caseCode)}
                </Link>
              </>
            )}
          </SectionLabel>
        </div>
        <Title>{meta.title}</Title>
      </div>

      <div className="mt-10">
        <AnswerBlock question={c.carQuestion(h)}>{c.carAnswer(h)}</AnswerBlock>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section>
          <ListingPhoto variationId={h.id} alt={c.carTitle(h)} tone={h.rarity === "sth" ? "gold" : "silver"} size="hero" caption={c.photoCaption} />
          <SectionLabel className="mt-10">{c.specs}</SectionLabel>
          <dl className="mt-5 divide-y divide-line rounded-[20px] border border-ink/10 bg-surface px-5">
            {rows
              .filter((r): r is [string, string] => !!r[1])
              .map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-4 py-3 text-sm">
                  <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">{k}</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
          </dl>
          <a
            href={h.sourceUrl}
            rel="noopener"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
          >
            {c.noPhoto}
            <ArrowSquareOut aria-hidden="true" className="h-4 w-4" />
          </a>
        </section>

        <div className="space-y-10">
          <section>
            <SectionLabel>{c.spotTitle}</SectionLabel>
            <ul className="mt-5 space-y-3 text-muted">
              {c.cues(h).map((cue) => (
                <li key={cue} className="flex gap-3">
                  <CheckCircle weight="fill" aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-chrono" />
                  <span>{cue}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <SectionLabel>{c.twinTitle}</SectionLabel>
            <p className="mt-5 max-w-[60ch] text-muted">{h.twin ? c.twinLine(h) : c.noTwin}</p>
          </section>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
        <LiveListings
          variationId={h.id}
          searchUrl={ebaySearchUrl(h)}
          locale={locale === "fr" ? "fr-FR" : "en-US"}
          copy={{
            title: c.live.title,
            disclosure: c.live.disclosure,
            view: c.live.view,
            search: c.live.search,
            loading: c.live.loading,
            note: c.live.note(0),
            noteMinutes: c.live.note(99).replace("99", "{m}"),
          }}
        />
      </div>

      <div className="mx-auto mt-14 max-w-7xl space-y-12 px-5 sm:px-8">
        {mates.length > 0 && h.caseCode && (
          <section>
            <SectionLabel>{c.caseMatesTitle(h.caseCode)}</SectionLabel>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {mates.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`${home}${huntPath[m.rarity]}/${m.year}/${m.slug}`}
                    className="flex items-center gap-4 rounded-[20px] border border-ink/10 bg-surface p-5 hover:border-ink/30"
                  >
                    <HuntMedal tone={m.rarity === "sth" ? "gold" : "silver"} />
                    <span>
                      <span className="block font-semibold text-ink">{m.name}</span>
                      <span className="text-sm text-muted">
                        {c.label[m.rarity]} · {[m.colour, m.toyNumber].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="max-w-3xl">
          <Faq items={faq} />
        </section>

        <Link href={yearPath} className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4">
          {c.backToYear(h.rarity, h.year)}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>

        <p className="text-xs text-faint">
          {c.source}:{" "}
          <a href={h.sourceUrl} rel="noopener" className="underline underline-offset-2 hover:text-ink">
            {c.sourceLink}
          </a>
          . {getDict(locale).footer.disclaimer}
        </p>
      </div>
      <AppCta locale={locale} />
    </SiteShell>
  );
}
