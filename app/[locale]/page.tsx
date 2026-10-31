import type { Metadata } from "next";
import {
  Books,
  CarProfile,
  ChartLine,
  DeviceMobile,
  Flame,
  Garage,
  MagnifyingGlass,
  Medal,
  Prohibit,
  Receipt,
  Scan,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { AnswerBlock } from "@/components/answer-block";
import { AppStoreBadge } from "@/components/app-store-badge";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { MediaFrame } from "@/components/media-frame";
import { RarityChip } from "@/components/rarity-chip";
import { SiteShell } from "@/components/site-shell";
import { getDict } from "@/lib/dictionaries";
import { type Locale } from "@/lib/i18n";
import { media } from "@/lib/media";
import { faqPageSchema, graph, organizationSchema, softwareApplicationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const BRANDS = ["Hot Wheels", "Matchbox", "Mini GT", "Tomica", "M2 Machines", "Maisto", "Racing Champions"];

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const d = getDict(locale);
  return pageMetadata({ locale, path: "", title: d.meta.title, description: d.meta.description, absoluteTitle: true });
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  const d = getDict(locale);
  const f = d.features.items;
  const s = d.soon.items;
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

      {/* Hero: promise on the left, faceless aisle photo on the right. */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 md:pt-16 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:pt-12">
        <div>
          <p className="enter text-sm font-semibold uppercase tracking-[0.16em] text-accent">{d.hero.eyebrow}</p>
          <h1 className="enter enter-delay mt-5 pb-2 font-display text-6xl font-black uppercase italic leading-[0.9] tracking-tight text-ink sm:text-7xl lg:text-8xl">
            {d.hero.title}
          </h1>
          <p className="enter enter-delay mt-6 max-w-[34ch] text-lg leading-relaxed text-muted sm:text-xl">
            {d.hero.subtitle}
          </p>
          <div className="enter enter-delay-2 mt-9">
            <AppStoreBadge d={d} />
          </div>
        </div>
        <MediaFrame
          slot={media.hero}
          name="hero"
          alt={d.hero.imageAlt}
          priority
          className="enter enter-delay-2 mx-auto w-full max-w-md lg:max-w-none"
          sizes="(min-width: 1024px) 40vw, 90vw"
        />
      </section>

      <AnswerBlock question={d.answer.question}>{d.answer.text}</AnswerBlock>

      {/* Facts strip: real catalog figures (CLAUDE.md §8.1). */}
      <section className="reveal mx-auto mt-20 max-w-7xl px-5 sm:px-8">
        <dl className="grid grid-cols-2 gap-y-10 border-y border-line py-10 md:grid-cols-4">
          {d.stats.map((st) => (
            <div key={st.label} className="flex flex-col-reverse justify-end px-2">
              <dt className="mt-2 text-sm text-muted">{st.label}</dt>
              <dd className="font-display text-4xl font-black uppercase leading-none text-ink sm:text-5xl md:text-6xl">{st.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* The aisle moment: owned, duplicate, TH, STH. */}
      <section className="reveal mx-auto mt-28 grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <MediaFrame slot={media.aisle} name="aisle" alt={d.aisle.imageAlt} className="order-2 lg:order-1" />
        <div className="order-1 lg:order-2">
          <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink md:text-6xl">
            {d.aisle.title}
          </h2>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">{d.aisle.body}</p>
          <ul aria-label={d.aisle.chipsLabel} className="mt-8 flex flex-wrap gap-3">
            <li>
              <RarityChip kind="owned" label={d.aisle.chips.owned} />
            </li>
            <li>
              <RarityChip kind="duplicate" label={d.aisle.chips.duplicate} />
            </li>
            <li>
              <RarityChip kind="th" label={d.aisle.chips.th} />
            </li>
            <li>
              <RarityChip kind="sth" label={d.aisle.chips.sth} />
            </li>
          </ul>
        </div>
      </section>

      {/* Bento: five shipping features, five cells. */}
      <section id="features" className="mx-auto mt-32 max-w-7xl scroll-mt-20 px-5 sm:px-8">
        <h2 className="reveal max-w-3xl font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink md:text-6xl">
          {d.features.title}
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          <article className="reveal relative overflow-hidden rounded-2xl border border-line bg-surface p-7 md:col-span-4 md:p-9">
            <div aria-hidden="true" className="checker absolute -right-16 -top-16 h-64 w-64 rotate-12 opacity-[0.06]" />
            <Books aria-hidden="true" className="h-8 w-8 text-accent" />
            <p className="mt-10 font-display text-7xl font-black uppercase leading-none text-ink md:text-8xl">1968</p>
            <h3 className="mt-4 text-xl font-semibold text-ink">{f.catalog.title}</h3>
            <p className="mt-2 max-w-[46ch] leading-relaxed text-muted">{f.catalog.body}</p>
          </article>

          <article className="reveal rounded-2xl border border-line bg-surface-2 p-7 md:col-span-2">
            <CarProfile aria-hidden="true" className="h-8 w-8 text-accent" />
            <h3 className="mt-6 text-xl font-semibold text-ink">{f.brands.title}</h3>
            <ul className="mt-5 space-y-1 font-display text-2xl font-extrabold uppercase leading-tight">
              {BRANDS.map((b, i) => (
                <li key={b} className={i === 0 ? "text-ink" : "text-faint"}>
                  {b}
                </li>
              ))}
            </ul>
          </article>

          <article className="reveal rounded-2xl border border-line bg-surface p-7 md:col-span-2">
            <Garage aria-hidden="true" className="h-8 w-8 text-accent" />
            <h3 className="mt-6 text-xl font-semibold text-ink">{f.garage.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{f.garage.body}</p>
          </article>

          <article className="reveal relative overflow-hidden rounded-2xl border border-gold/30 bg-[radial-gradient(130%_100%_at_100%_0%,rgba(250,199,64,0.22),transparent_55%),var(--color-surface)] p-7 md:col-span-2">
            <Flame weight="fill" aria-hidden="true" className="h-8 w-8 text-gold" />
            <h3 className="mt-6 text-xl font-semibold text-ink">{f.hunt.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{f.hunt.body}</p>
          </article>

          <article className="reveal rounded-2xl border border-accent/30 bg-[linear-gradient(160deg,rgba(255,107,0,0.14),transparent_60%),var(--color-surface)] p-7 md:col-span-2">
            <Medal weight="fill" aria-hidden="true" className="h-8 w-8 text-accent" />
            <h3 className="mt-6 text-xl font-semibold text-ink">{f.completion.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{f.completion.body}</p>
          </article>
        </div>
      </section>

      {/* The treasure reveal: one full-width moment in gold. */}
      <section className="reveal mx-auto mt-32 max-w-7xl px-5 text-center sm:px-8">
        <h2 className="mx-auto max-w-4xl pb-2 font-display text-5xl font-black uppercase italic leading-[0.95] tracking-tight md:text-7xl">
          <span className="text-spectraflame">{d.reveal.title}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[56ch] text-lg leading-relaxed text-muted">{d.reveal.body}</p>
        <MediaFrame
          slot={media.reveal}
          name="reveal"
          alt={d.reveal.imageAlt}
          className="mt-12 w-full"
          sizes="(min-width: 1280px) 1200px, 100vw"
        />
      </section>

      {/* Coming soon: stacked rows, clearly labelled. */}
      <section className="mx-auto mt-32 max-w-7xl px-5 sm:px-8">
        <h2 className="reveal font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink md:text-6xl">
          {d.soon.title}
        </h2>
        <div className="mt-10 divide-y divide-line border-t border-line">
          {[
            { Icon: Scan, item: s.scan },
            { Icon: ChartLine, item: s.values },
            { Icon: UsersThree, item: s.community },
          ].map(({ Icon, item }) => (
            <article key={item.title} className="reveal grid items-start gap-4 py-8 md:grid-cols-[3rem_minmax(0,1fr)_auto] md:gap-8">
              <Icon aria-hidden="true" className="h-8 w-8 text-faint" />
              <div>
                <h3 className="font-display text-3xl font-extrabold uppercase leading-none text-ink">{item.title}</h3>
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
        <h2 className="reveal max-w-3xl font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink md:text-6xl">
          {d.principles.title}
        </h2>
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
        <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink md:text-6xl">
          {d.faq.title}
        </h2>
        <div className="mt-10">
          <Faq items={d.faq.items} />
        </div>
      </section>

      {/* Final call to action. */}
      <section className="mx-auto mt-32 max-w-7xl px-5 sm:px-8">
        <div className="reveal relative overflow-hidden rounded-3xl border border-line bg-surface px-7 py-16 md:px-16 md:py-20">
          <div aria-hidden="true" className="checker absolute inset-y-0 right-0 w-1/3 opacity-[0.05] [mask-image:linear-gradient(to_left,black,transparent)]" />
          <h2 className="relative max-w-2xl pb-1 font-display text-5xl font-black uppercase italic leading-[0.92] tracking-tight text-ink md:text-7xl">
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
