import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { AnswerBlock } from "@/components/answer-block";
import { AppScreen } from "@/components/app-screen";
import { AppStoreBadge } from "@/components/app-store-badge";
import { Faq } from "@/components/faq";
import { AppCta, Crumbs, Title } from "@/components/hunt/hunt-views";
import { JsonLd } from "@/components/json-ld";
import { SectionLabel } from "@/components/kit";
import { SiteShell } from "@/components/site-shell";
import { getDict } from "@/lib/dictionaries";
import { huntCopy } from "@/lib/hunt-copy";
import { huntPath, huntYears, huntsOfYear } from "@/lib/hunts";
import { localeUrl, type Locale } from "@/lib/i18n";
import { breadcrumbSchema, faqPageSchema, graph, softwareApplicationSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { toolsCopy } from "@/lib/tools-copy";

// Landing page for "hot wheels scanner app" searches (docs/SEO_STRATEGY.md, step 2). Describes the scanner as
// it ships: card reading on the phone first, AI photo identification second. Never claims Super Treasure Hunt
// recognition.

const PATH = "/hot-wheels-scanner";
const CARD = "rounded-[20px] border border-ink/10 bg-surface p-7";

export async function generateMetadata({ params }: PageProps<"/[locale]/hot-wheels-scanner">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const c = toolsCopy(locale).scanner;
  return pageMetadata({ locale, path: PATH, title: c.title, description: c.description });
}

export default async function Page({ params }: PageProps<"/[locale]/hot-wheels-scanner">) {
  const locale = (await params).locale as Locale;
  const c = toolsCopy(locale).scanner;
  const home = `/${locale}`;
  const crumbHome = huntCopy(locale).breadcrumbHome;
  const year = huntYears("sth").find((y) => huntsOfYear("sth", y).length >= 12) ?? huntYears("sth")[0];

  return (
    <SiteShell locale={locale} path={PATH}>
      <JsonLd
        data={graph(
          webPageSchema({ locale, path: PATH, title: c.title, description: c.description }),
          softwareApplicationSchema({ locale, description: c.description }),
          breadcrumbSchema([
            { name: crumbHome, url: localeUrl(locale) },
            { name: c.title, url: localeUrl(locale, PATH) },
          ]),
          faqPageSchema(c.faq),
        )}
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div>
          <Crumbs items={[{ name: crumbHome, href: home }, { name: c.title }]} />
          <Title>{c.title}</Title>
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted">{c.lead}</p>
          <div className="mt-8">
            <AppStoreBadge d={getDict(locale)} />
          </div>
        </div>
        <AppScreen name="hunt" alt={c.alt.scan} priority className="mx-auto w-[min(72vw,290px)] lg:w-full" />
      </section>

      <div className="mt-16">
        <AnswerBlock question={c.question}>{c.answer}</AnswerBlock>
      </div>

      <section className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
        <SectionLabel>{c.stepsLabel}</SectionLabel>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {c.steps.map((s, i) => (
            <li key={s.title} className={CARD}>
              <span className="font-display text-4xl font-black italic tabular-nums text-accent-ink">{i + 1}</span>
              <h2 className="mt-3 font-display text-xl font-extrabold uppercase tracking-tight text-ink">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <AppScreen name="detail" alt={c.alt.detail} className="order-last mx-auto w-[min(72vw,290px)] lg:order-first lg:w-full" />
        <div>
          <SectionLabel>{c.better.title}</SectionLabel>
          <div className="mt-6 space-y-4">
            {c.better.items.map((b) => (
              <div key={b.title} className={CARD}>
                <h2 className="font-display text-lg font-extrabold uppercase tracking-tight text-ink">{b.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-4 px-5 sm:px-8 md:grid-cols-2">
        <div className={CARD}>
          <h2 className="font-display text-xl font-extrabold uppercase tracking-tight text-ink">{c.free.title}</h2>
          <p className="mt-3 leading-relaxed text-muted">{c.free.body}</p>
        </div>
        <div className={CARD}>
          <h2 className="font-display text-xl font-extrabold uppercase tracking-tight text-ink">{c.brands.title}</h2>
          <p className="mt-3 leading-relaxed text-muted">{c.brands.body}</p>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-3xl px-5 sm:px-8">
        <Faq items={c.faq} />
      </section>

      <nav aria-label={c.title} className="mx-auto mt-10 flex max-w-3xl flex-wrap gap-2 px-5 sm:px-8">
        {[
          { href: `${home}/value`, label: c.links.value },
          { href: `${home}${huntPath.sth}/${year}`, label: `${c.links.hunts} (${year})` },
          { href: `${home}/blog/how-to-spot-a-super-treasure-hunt`, label: c.links.guide },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-accent">
            {l.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        ))}
      </nav>
      <AppCta locale={locale} />
    </SiteShell>
  );
}
