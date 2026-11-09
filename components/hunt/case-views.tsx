import Link from "next/link";
import { AnswerBlock } from "@/components/answer-block";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { SectionLabel } from "@/components/kit";
import { SiteShell } from "@/components/site-shell";
import { huntCopy } from "@/lib/hunt-copy";
import { caseYears, casesOf, casesPath, huntPath, huntYears, lastUpdated, nextCase, type Hunt } from "@/lib/hunts";
import { localeUrl, type Locale } from "@/lib/i18n";
import { breadcrumbSchema, faqPageSchema, graph, webPageSchema } from "@/lib/schema";
import { AppCta, Crumbs, Title } from "./hunt-views";
import { ListingPhoto } from "./listing-photo";

// Case tracker: each mainline case A to Q with its Treasure Hunt and Super Treasure Hunt. No store dates:
// Mattel does not publish them and the wiki has none, so the page never guesses one.

/* ---------- Hub: /[locale]/cases ---------- */

export function caseHubMeta(locale: Locale) {
  const c = huntCopy(locale).cases;
  return { path: casesPath, title: c.hubTitle, description: c.hubDescription };
}

export function CaseHub({ locale }: { locale: Locale }) {
  const c = huntCopy(locale);
  const meta = caseHubMeta(locale);
  const home = `/${locale}`;
  const faq = [{ q: c.cases.hubQuestion, a: c.cases.hubAnswer }];
  return (
    <SiteShell locale={locale} path={meta.path}>
      <JsonLd
        data={graph(
          webPageSchema({ locale, ...meta }),
          breadcrumbSchema([
            { name: c.breadcrumbHome, url: localeUrl(locale) },
            { name: meta.title, url: localeUrl(locale, meta.path) },
          ]),
          faqPageSchema(faq),
        )}
      />
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <Crumbs items={[{ name: c.breadcrumbHome, href: home }, { name: meta.title }]} />
        <Title>{meta.title}</Title>
      </div>
      <div className="mt-10">
        <AnswerBlock question={c.cases.hubQuestion}>{c.cases.hubAnswer}</AnswerBlock>
      </div>
      <section className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
        <SectionLabel>{c.yearsLabel}</SectionLabel>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {caseYears().map((y) => (
            <li key={y}>
              <Link href={`${home}${casesPath}/${y}`} className="block rounded-2xl border border-ink/10 bg-surface px-5 py-4 hover:border-ink/30">
                <span className="block font-display text-2xl font-black tabular-nums text-ink">{y}</span>
                <span className="text-sm text-muted">{c.cases.cases(casesOf(y).length)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <AppCta locale={locale} />
    </SiteShell>
  );
}

/* ---------- Year: /[locale]/cases/2026 ---------- */

export function caseYearMeta(locale: Locale, year: number) {
  const c = huntCopy(locale).cases;
  return { path: `${casesPath}/${year}`, title: c.yearTitle(year), description: c.yearDescription(year) };
}

function HuntCard({ locale, hunt: h }: { locale: Locale; hunt: Hunt }) {
  const c = huntCopy(locale);
  return (
    <Link
      href={`/${locale}${huntPath[h.rarity]}/${h.year}/${h.slug}`}
      className="flex h-full flex-col rounded-[20px] border border-ink/10 bg-surface p-2 hover:border-ink/30"
    >
      <ListingPhoto variationId={h.id} alt={c.carTitle(h)} tone={h.rarity === "sth" ? "gold" : "silver"} />
      <span className="px-3 pb-3 pt-4">
        <span className="block font-display text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">{c.label[h.rarity]}</span>
        <span className="mt-1 block font-semibold leading-tight text-ink">{h.name}</span>
        <span className="mt-1 block text-sm text-muted">{[h.colour, h.toyNumber].filter(Boolean).join(" · ")}</span>
      </span>
    </Link>
  );
}

export function CaseYear({ locale, year }: { locale: Locale; year: number }) {
  const c = huntCopy(locale);
  const meta = caseYearMeta(locale, year);
  const home = `/${locale}`;
  const cases = casesOf(year);
  const known = cases.map((k) => k.caseCode);
  const next = nextCase(year);
  const answer = c.cases.yearAnswer(year, known, next);
  const faq = [
    { q: c.cases.yearQuestion(year), a: answer },
    { q: c.cases.hubQuestion, a: c.cases.hubAnswer },
  ];
  const hunts = cases.flatMap((k) => [...k.sth, ...k.th]);

  return (
    <SiteShell locale={locale} path={meta.path}>
      <JsonLd
        data={graph(
          webPageSchema({ locale, ...meta }),
          breadcrumbSchema([
            { name: c.breadcrumbHome, url: localeUrl(locale) },
            { name: c.cases.hubTitle, url: localeUrl(locale, casesPath) },
            { name: String(year), url: localeUrl(locale, meta.path) },
          ]),
          faqPageSchema(faq),
        )}
      />
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <Crumbs
          items={[
            { name: c.breadcrumbHome, href: home },
            { name: c.cases.hubTitle, href: `${home}${casesPath}` },
            { name: String(year) },
          ]}
        />
        <Title>{meta.title}</Title>
        <p className="mt-4 text-sm text-muted">
          {c.updated(lastUpdated(hunts))}
          {next ? ` · ${c.cases.next(next)}` : ""}
        </p>
      </div>
      <div className="mt-10">
        <AnswerBlock question={c.cases.yearQuestion(year)}>{answer}</AnswerBlock>
      </div>

      <nav aria-label={c.yearsLabel} className="mx-auto mt-10 flex max-w-7xl flex-wrap gap-2 px-5 text-sm sm:px-8">
        {known.map((code) => (
          <a
            key={code}
            href={`#case-${code.toLowerCase()}`}
            className="rounded-full border border-line px-3.5 py-1.5 font-display font-bold text-ink hover:border-accent"
          >
            {code}
          </a>
        ))}
        {next && (
          <span className="rounded-full border border-dashed border-line px-3.5 py-1.5 font-display font-bold text-faint">{next}</span>
        )}
      </nav>

      <div className="mx-auto mt-10 max-w-7xl space-y-12 px-5 sm:px-8">
        {cases.map((k) => (
          <section key={k.caseCode} id={`case-${k.caseCode.toLowerCase()}`} className="scroll-mt-24">
            <SectionLabel>{c.caseHeading(k.caseCode)}</SectionLabel>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[...k.sth, ...k.th].map((h) => (
                <li key={h.id}>
                  <HuntCard locale={locale} hunt={h} />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="max-w-[68ch] text-sm text-muted">{c.cases.noDates}</p>

        <section className="max-w-3xl">
          <Faq items={faq} />
        </section>

        <nav aria-label={c.yearsLabel} className="flex flex-wrap gap-2 text-sm">
          {huntYears("sth").includes(year) && (
            <Link href={`${home}${huntPath.sth}/${year}`} className="rounded-full border border-accent px-4 py-2 font-semibold text-ink">
              {c.otherList("sth", year)}
            </Link>
          )}
          {huntYears("th").includes(year) && (
            <Link href={`${home}${huntPath.th}/${year}`} className="rounded-full border border-accent px-4 py-2 font-semibold text-ink">
              {c.otherList("th", year)}
            </Link>
          )}
          {caseYears().map((y) =>
            y === year ? null : (
              <Link key={y} href={`${home}${casesPath}/${y}`} className="rounded-full border border-line px-4 py-2 text-muted hover:text-ink">
                {y}
              </Link>
            ),
          )}
        </nav>

        <p className="text-xs text-faint">{c.source}: Hot Wheels Wiki (hotwheels.fandom.com), CC BY-SA.</p>
      </div>
      <AppCta locale={locale} />
    </SiteShell>
  );
}
