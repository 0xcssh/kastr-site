import type { Metadata } from "next";
import {
  Books,
  CarProfile,
  ChartLine,
  CircleHalf,
  DeviceMobile,
  MagnifyingGlass,
  Medal,
  Prohibit,
  Receipt,
  ShoppingBag,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { AnswerBlock } from "@/components/answer-block";
import { AppScreen } from "@/components/app-screen";
import { AppStoreBadge } from "@/components/app-store-badge";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { RarityChip } from "@/components/rarity-chip";
import { SiteShell } from "@/components/site-shell";
import { getDict } from "@/lib/dictionaries";
import { type Locale } from "@/lib/i18n";
import { faqPageSchema, graph, organizationSchema, softwareApplicationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// Brand names as plain text: no brand logos on the site (CLAUDE.md §9).
const BRANDS = ["Hot Wheels", "Matchbox", "Mini GT", "Tomica", "M2 Machines", "Maisto", "Racing Champions"];

const H2 = "font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink md:text-5xl";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const d = getDict(locale);
  return pageMetadata({ locale, path: "", title: d.meta.title, description: d.meta.description, absoluteTitle: true });
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  const d = getDict(locale);
  const f = d.features.items;
  const principleIcons = [MagnifyingGlass, Receipt, Prohibit, DeviceMobile];

  return (
    <SiteShell locale={locale} path="">
      <JsonLd
        data={graph(
          organizationSchema(),
          softwareApplicationSchema({ locale, description: d.meta.description }),
          faqPageSchema(d.faq.items),
        )}
      />

      {/* Hero: promise on the left, the car page of a Super Treasure Hunt on the right. */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 md:pt-16 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:pt-12">
        <div>
          <p className="enter font-display text-sm font-bold uppercase tracking-[0.16em] text-accent">{d.hero.eyebrow}</p>
          <h1 className="enter enter-delay mt-5 pb-2 font-display text-5xl font-black uppercase italic leading-[0.92] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {d.hero.title}
          </h1>
          <p className="enter enter-delay mt-6 max-w-[34ch] text-lg leading-relaxed text-muted sm:text-xl">
            {d.hero.subtitle}
          </p>
          <div className="enter enter-delay-2 mt-9">
            <AppStoreBadge d={d} />
          </div>
        </div>
        <div className="enter enter-delay-2 relative mx-auto w-full max-w-[20rem] lg:max-w-[22rem]">
          <div aria-hidden="true" className="absolute inset-[6%] rounded-full bg-gold/25 blur-3xl" />
          <div aria-hidden="true" className="checker absolute -right-10 top-8 h-32 w-32 rotate-12 opacity-[0.06]" />
          <AppScreen name="detail" alt={d.hero.imageAlt} priority className="relative" />
        </div>
      </section>

      <AnswerBlock question={d.answer.question}>{d.answer.text}</AnswerBlock>

      {/* Facts strip: real catalog figures (CLAUDE.md §8.1). */}
      <section className="reveal mx-auto mt-20 max-w-7xl px-5 sm:px-8">
        <dl className="grid grid-cols-2 gap-y-10 border-y border-line py-10 md:grid-cols-4">
          {d.stats.map((st) => (
            <div key={st.label} className="flex flex-col-reverse justify-end px-2">
              <dt className="mt-2 text-sm text-muted">{st.label}</dt>
              <dd className="font-display text-3xl font-black uppercase leading-none text-ink tabular-nums sm:text-4xl md:text-5xl">{st.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Hunt: scanning in bursts, owned / double / TH / STH, the year's list. */}
      <section className="reveal mx-auto mt-28 grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 mx-auto w-full max-w-[19rem] lg:order-1">
          <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-accent/20 blur-3xl" />
          <AppScreen name="hunt" alt={d.hunt.imageAlt} className="relative" />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className={H2}>{d.hunt.title}</h2>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">{d.hunt.body}</p>
          <ul aria-label={d.hunt.chipsLabel} className="mt-8 flex flex-wrap gap-3">
            <li>
              <RarityChip kind="owned" label={d.hunt.chips.owned} />
            </li>
            <li>
              <RarityChip kind="duplicate" label={d.hunt.chips.duplicate} />
            </li>
            <li>
              <RarityChip kind="th" label={d.hunt.chips.th} />
            </li>
            <li>
              <RarityChip kind="sth" label={d.hunt.chips.sth} />
            </li>
          </ul>
        </div>
      </section>

      {/* Garage as a portfolio. */}
      <section className="reveal mx-auto mt-28 grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className={H2}>{d.garage.title}</h2>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">{d.garage.body}</p>
        </div>
        <div className="relative mx-auto w-full max-w-[19rem]">
          <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-chrono/15 blur-3xl" />
          <AppScreen name="garage" alt={d.garage.imageAlt} className="relative" />
        </div>
      </section>

      {/* Bento: six features. */}
      <section id="features" className="mx-auto mt-32 max-w-7xl scroll-mt-20 px-5 sm:px-8">
        <h2 className={`reveal max-w-3xl ${H2}`}>{d.features.title}</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          <article className="reveal relative overflow-hidden rounded-2xl border border-line bg-surface p-7 md:col-span-4 md:p-9">
            <div aria-hidden="true" className="checker absolute -right-16 -top-16 h-64 w-64 rotate-12 opacity-[0.06]" />
            <Books aria-hidden="true" className="h-8 w-8 text-accent" />
            <p className="mt-10 font-display text-6xl font-black uppercase leading-none text-ink md:text-7xl">1968</p>
            <h3 className="mt-4 text-xl font-semibold text-ink">{f.catalog.title}</h3>
            <p className="mt-2 max-w-[46ch] leading-relaxed text-muted">{f.catalog.body}</p>
          </article>

          <article className="reveal rounded-2xl border border-line bg-surface-2 p-7 md:col-span-2">
            <CarProfile aria-hidden="true" className="h-8 w-8 text-accent" />
            <h3 className="mt-6 text-xl font-semibold text-ink">{f.brands.title}</h3>
            <ul className="mt-5 space-y-1 font-display text-lg font-extrabold uppercase leading-tight">
              {BRANDS.map((b, i) => (
                <li key={b} className={i === 0 ? "text-ink" : "text-faint"}>
                  {b}
                </li>
              ))}
            </ul>
          </article>

          <article className="reveal rounded-2xl border border-line bg-surface p-7 md:col-span-3">
            <ChartLine aria-hidden="true" className="h-8 w-8 text-accent" />
            <h3 className="mt-6 text-xl font-semibold text-ink">{f.prices.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{f.prices.body}</p>
          </article>

          <article className="reveal rounded-2xl border border-line bg-surface p-7 md:col-span-3">
            <ShoppingBag aria-hidden="true" className="h-8 w-8 text-titanium" />
            <h3 className="mt-6 text-xl font-semibold text-ink">{f.where.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{f.where.body}</p>
          </article>

          <article className="reveal relative overflow-hidden rounded-2xl border border-gold/30 bg-[radial-gradient(130%_100%_at_100%_0%,rgba(250,199,64,0.22),transparent_55%),var(--color-surface)] p-7 md:col-span-3">
            <Medal weight="fill" aria-hidden="true" className="h-8 w-8 text-gold" />
            <h3 className="mt-6 text-xl font-semibold text-ink">{f.completion.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{f.completion.body}</p>
          </article>

          <article className="reveal rounded-2xl border border-line bg-surface-2 p-7 md:col-span-3">
            <CircleHalf weight="fill" aria-hidden="true" className="h-8 w-8 text-violet" />
            <h3 className="mt-6 text-xl font-semibold text-ink">{f.looks.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{f.looks.body}</p>
          </article>
        </div>
      </section>

      {/* Coming soon: clearly labelled. */}
      <section className="mx-auto mt-32 max-w-7xl px-5 sm:px-8">
        <h2 className={`reveal ${H2}`}>{d.soon.title}</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {[{ Icon: UsersThree, item: d.soon.items.community }].map(({ Icon, item }) => (
            <article key={item.title} className="reveal grid items-start gap-4 py-8 md:grid-cols-[3rem_minmax(0,1fr)_auto] md:gap-8">
              <Icon aria-hidden="true" className="h-8 w-8 text-faint" />
              <div>
                <h3 className="font-display text-2xl font-extrabold uppercase leading-none text-ink">{item.title}</h3>
                <p className="mt-3 max-w-[60ch] leading-relaxed text-muted">{item.body}</p>
              </div>
              <span className="w-fit rounded-full border border-line px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                {d.soon.tag}
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* How Kastr differs: four principles, no cards. */}
      <section className="mx-auto mt-32 max-w-7xl px-5 sm:px-8">
        <h2 className={`reveal max-w-3xl ${H2}`}>{d.principles.title}</h2>
        <div className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {d.principles.items.map((p, i) => {
            const Icon = principleIcons[i] ?? MagnifyingGlass;
            return (
              <div key={p.title} className="reveal border-t-2 border-accent pt-6">
                <Icon aria-hidden="true" className="h-7 w-7 text-accent" />
                <h3 className="mt-4 text-2xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 max-w-[50ch] leading-relaxed text-muted">{p.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="faq" className="mx-auto mt-32 max-w-3xl scroll-mt-20 px-5 sm:px-8">
        <h2 className={H2}>{d.faq.title}</h2>
        <div className="mt-10">
          <Faq items={d.faq.items} />
        </div>
      </section>

      {/* Final call to action. */}
      <section className="mx-auto mt-32 max-w-7xl px-5 sm:px-8">
        <div className="reveal relative overflow-hidden rounded-3xl border border-line bg-surface px-7 py-16 md:px-16 md:py-20">
          <div aria-hidden="true" className="checker absolute inset-y-0 right-0 w-1/3 opacity-[0.05] [mask-image:linear-gradient(to_left,black,transparent)]" />
          <h2 className="relative max-w-2xl pb-1 font-display text-4xl font-black uppercase italic leading-[0.92] tracking-tight text-ink md:text-6xl">
            {d.cta.title}
          </h2>
          <p className="relative mt-5 text-lg text-muted">{d.cta.body}</p>
          <div className="relative mt-9">
            <AppStoreBadge d={d} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
