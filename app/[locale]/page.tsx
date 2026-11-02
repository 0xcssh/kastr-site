import type { Metadata } from "next";
import {
  CarProfile,
  DeviceMobile,
  MagnifyingGlass,
  Prohibit,
  Receipt,
  ShoppingBag,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { AnswerBlock } from "@/components/answer-block";
import { AppScreen } from "@/components/app-screen";
import { AppStoreBadge } from "@/components/app-store-badge";
import { Faq } from "@/components/faq";
import { GarageWall, RevealCard } from "@/components/garage-wall";
import { JsonLd } from "@/components/json-ld";
import { HuntMedal, ProgressRing, SectionLabel, SpeedStripes, StudioPhoto } from "@/components/kit";
import { RarityChip } from "@/components/rarity-chip";
import { SiteShell } from "@/components/site-shell";
import { garageWall, impala, ram } from "@/lib/cars";
import { getDict } from "@/lib/dictionaries";
import { type Locale } from "@/lib/i18n";
import { faqPageSchema, graph, organizationSchema, softwareApplicationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// Brand names as plain text: no brand logos on the site (CLAUDE.md §9).
const BRANDS = ["Hot Wheels", "Matchbox", "Mini GT", "Tomica", "M2 Machines", "Maisto", "Racing Champions"];

const H2 = "mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink md:text-5xl";
const CARD = "reveal relative overflow-hidden rounded-[20px] border border-ink/10 bg-surface p-7";

// Sales chart shape for the values card: a red line like the app's, no figures (decorative).
const SALES = [44, 52, 47, 58, 50, 61, 55, 49, 63, 57, 60, 66, 54, 62, 59, 68];

function SalesLine() {
  const w = 300;
  const h = 90;
  const max = Math.max(...SALES);
  const min = Math.min(...SALES);
  const pts = SALES.map((v, i) => [(i / (SALES.length - 1)) * w, h - 8 - ((v - min) / (max - min)) * (h - 16)]);
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sales-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e10a1e" stopOpacity="0.35" />
          <stop offset="1" stopColor="#e10a1e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${line} ${w},${h}`} fill="url(#sales-fill)" />
      <polyline points={line} fill="none" stroke="#e10a1e" strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

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

      {/* Hero: what Kastr is on the left; the car page and the Super Treasure Hunt reveal on the right. */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-14 pt-8 sm:px-8 md:pt-14 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-12 lg:pt-8">
        <div>
          <SectionLabel className="enter">{d.hero.eyebrow}</SectionLabel>
          <h1 className="enter enter-delay mt-6 flex items-start gap-[0.3em] pb-2">
            <SpeedStripes className="mt-[0.3em] shrink-0 text-[1.6rem] sm:text-[2.1rem] lg:text-[1.95rem]" />
            <span className="flex flex-col">
              {d.hero.title.map((line) => (
                <span
                  key={line}
                  className="font-display text-[1.6rem] font-black uppercase italic leading-[1.02] tracking-tight text-ink sm:text-[2.1rem] lg:text-[1.95rem] xl:whitespace-nowrap"
                >
                  {line}{" "}
                </span>
              ))}
              {/* The punchline, which is the call to action: never broken inside "pour le savoir". */}
              <span className="mt-3 whitespace-nowrap font-display text-lg font-bold italic text-accent sm:text-2xl">{d.hero.cta}</span>
            </span>
          </h1>
          <p className="enter enter-delay mt-6 max-w-[40ch] text-lg leading-relaxed text-muted sm:text-xl">{d.hero.subtitle}</p>
          <div className="enter enter-delay-2 mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <AppStoreBadge d={d} />
            <p className="text-sm text-muted">{d.hero.note}</p>
          </div>
        </div>
        <div className="enter enter-delay-2 relative mx-auto w-full max-w-[27rem]">
          <div aria-hidden="true" className="absolute inset-[10%] rounded-full bg-gold/20 blur-3xl" />
          <div aria-hidden="true" className="checker absolute -right-6 top-4 h-32 w-32 rotate-12 opacity-[0.06]" />
          <AppScreen name="detail" alt={d.hero.imageAlt} priority className="relative ml-auto w-[70%]" />
          <div className="absolute left-[2%] top-[6%] w-[50%] -rotate-[4deg] sm:left-0 sm:w-[54%]">
            <RevealCard title={d.reveal.title} added={d.reveal.added} alt={d.reveal.alt} />
          </div>
        </div>
      </section>

      {/* The catalog, as garage cards drifting by. */}
      <div className="reveal">
        <div className="mx-auto mb-6 flex max-w-7xl flex-wrap items-end justify-between gap-4 px-5 sm:px-8">
          <SectionLabel>{d.wall.label}</SectionLabel>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
            {d.stats.map((st) => (
              <div key={st.label} className="flex flex-col-reverse">
                <dt className="font-display text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">{st.label}</dt>
                <dd className="font-display text-2xl font-extrabold uppercase leading-none text-ink tabular-nums">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <GarageWall label={d.wall.label} />
      </div>

      <div className="mt-20">
        <AnswerBlock question={d.answer.question}>{d.answer.text}</AnswerBlock>
      </div>

      {/* Hunt: scanning in bursts, owned / double / TH / STH, the year's list. */}
      <section id="features" className="reveal mx-auto mt-28 grid max-w-7xl scroll-mt-20 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 mx-auto w-full max-w-[19rem] lg:order-1">
          <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-accent/20 blur-3xl" />
          <AppScreen name="hunt" alt={d.hunt.imageAlt} className="relative" />
        </div>
        <div className="order-1 lg:order-2">
          <SectionLabel>{d.hunt.label}</SectionLabel>
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
          <SectionLabel>{d.garage.label}</SectionLabel>
          <h2 className={H2}>{d.garage.title}</h2>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">{d.garage.body}</p>
        </div>
        <div className="relative mx-auto w-full max-w-[19rem]">
          <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-chrono/15 blur-3xl" />
          <AppScreen name="garage" alt={d.garage.imageAlt} light={false} className="relative" />
        </div>
      </section>

      {/* Bento: six features, each drawn with the app's own pieces. */}
      <section className="mx-auto mt-32 max-w-7xl px-5 sm:px-8">
        <SectionLabel className="reveal">{d.features.label}</SectionLabel>
        <h2 className={`reveal max-w-3xl ${H2}`}>{d.features.title}</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          <article className={`${CARD} grid gap-8 md:col-span-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:p-9`}>
            <div>
              <p className="font-display text-6xl font-black uppercase leading-none text-ink md:text-7xl">1968</p>
              <h3 className="mt-5 text-xl font-semibold text-ink">{f.catalog.title}</h3>
              <p className="mt-2 max-w-[46ch] leading-relaxed text-muted">{f.catalog.body}</p>
            </div>
            <div aria-hidden="true" className="relative h-64 md:h-auto md:min-h-64">
              {[garageWall[8], garageWall[0], impala].map((car, i) => (
                <StudioPhoto
                  key={car.file}
                  car={car}
                  alt=""
                  className={`absolute aspect-[4/3] w-[56%] border border-black/5 shadow-[0_16px_30px_-12px_rgba(0,0,0,0.6)] ${
                    ["left-[2%] top-[4%] -rotate-6", "right-[2%] top-[22%] rotate-3", "bottom-[4%] left-[18%] -rotate-1"][i]
                  }`}
                />
              ))}
            </div>
          </article>

          <article className={`${CARD} bg-surface-2 md:col-span-2`}>
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

          <article className={`${CARD} md:col-span-3`}>
            <SectionLabel>{f.prices.label}</SectionLabel>
            <div className="mt-5">
              <SalesLine />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-ink">{f.prices.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{f.prices.body}</p>
          </article>

          <article className={`${CARD} md:col-span-3`}>
            <div className="flex items-center gap-3 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <ShoppingBag weight="fill" aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="font-display text-[13px] font-extrabold uppercase tracking-[0.06em] text-ink">{f.where.title}</span>
              <span className="ml-auto text-right text-sm font-semibold text-accent">{f.where.row}</span>
            </div>
            <h3 className="mt-8 text-xl font-semibold text-ink">{f.where.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{f.where.body}</p>
          </article>

          <article className={`${CARD} border-gold/30 bg-[radial-gradient(130%_100%_at_100%_0%,rgba(248,197,65,0.18),transparent_55%),var(--color-surface)] md:col-span-3`}>
            <div className="flex items-center gap-5">
              <div className="relative h-24 w-24 shrink-0">
                <ProgressRing value={2} total={15} tone="gold" className="h-full w-full" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <HuntMedal />
                </span>
              </div>
              <div>
                <p className="font-display text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">{f.completion.ringLabel}</p>
                <p className="mt-1 font-display text-4xl font-black leading-none text-ink tabular-nums">2 / 15</p>
              </div>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-ink">{f.completion.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{f.completion.body}</p>
          </article>

          <article className={`${CARD} md:col-span-3`}>
            <div aria-hidden="true" className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-[#16161b] p-2">
                <StudioPhoto car={ram} alt="" className="aspect-[4/3]" />
                <p className="px-1 pt-2 font-display text-[10px] font-semibold uppercase tracking-[0.1em] text-[#c9ced6]">{f.looks.dark}</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-2">
                <StudioPhoto car={garageWall[4]} alt="" className="aspect-[4/3]" />
                <p className="px-1 pt-2 font-display text-[10px] font-semibold uppercase tracking-[0.1em] text-[#4e5562]">{f.looks.light}</p>
              </div>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-ink">{f.looks.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{f.looks.body}</p>
          </article>
        </div>
      </section>

      {/* How Kastr differs: four principles, no cards. */}
      <section className="mx-auto mt-32 max-w-7xl px-5 sm:px-8">
        <SectionLabel className="reveal">{d.principles.label}</SectionLabel>
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

      {/* Coming soon: clearly labelled. */}
      <section className="mx-auto mt-32 max-w-7xl px-5 sm:px-8">
        <SectionLabel className="reveal">{d.soon.tag}</SectionLabel>
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

      <section id="faq" className="mx-auto mt-32 max-w-3xl scroll-mt-20 px-5 sm:px-8">
        <SectionLabel>{d.nav.faq}</SectionLabel>
        <h2 className={H2}>{d.faq.title}</h2>
        <div className="mt-10">
          <Faq items={d.faq.items} />
        </div>
      </section>

      {/* Final call to action, with the reveal photo. */}
      <section className="mx-auto mt-32 max-w-7xl px-5 sm:px-8">
        <div className="reveal relative grid items-center gap-10 overflow-hidden rounded-[28px] border border-ink/10 bg-surface px-7 py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:px-16 md:py-16">
          <div aria-hidden="true" className="checker absolute inset-y-0 right-0 w-1/2 opacity-[0.05] [mask-image:linear-gradient(to_left,black,transparent)]" />
          <div className="relative">
            <h2 className="flex items-start gap-[0.25em] pb-1 font-display text-4xl font-black uppercase italic leading-[0.95] tracking-tight text-ink md:text-6xl">
              <SpeedStripes className="mt-[0.2em] shrink-0" />
              <span>{d.cta.title}</span>
            </h2>
            <p className="mt-5 text-lg text-muted">{d.cta.body}</p>
            <div className="mt-9">
              <AppStoreBadge d={d} />
            </div>
          </div>
          <div aria-hidden="true" className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-[10%] rounded-full bg-gold/25 blur-3xl" />
            <StudioPhoto car={ram} alt="" className="relative aspect-[5/4] ring-2 ring-gold/60" />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
