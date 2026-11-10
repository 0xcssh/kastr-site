import type { Metadata } from "next";
import { AnswerBlock } from "@/components/answer-block";
import { Faq } from "@/components/faq";
import { AppCta, bcp47, Crumbs, Title } from "@/components/hunt/hunt-views";
import { JsonLd } from "@/components/json-ld";
import { SectionLabel } from "@/components/kit";
import { SiteShell } from "@/components/site-shell";
import { ValueSearch } from "@/components/tools/value-search";
import { huntCopy } from "@/lib/hunt-copy";
import { localeUrl, type Locale } from "@/lib/i18n";
import { breadcrumbSchema, faqPageSchema, graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { toolsCopy } from "@/lib/tools-copy";

// Value lookup for "hot wheels value checker" searches (docs/SEO_STRATEGY.md, step 2). The search and the
// values run in the visitor's browser; the indexed page is the explanation around them.

const PATH = "/value";

export async function generateMetadata({ params }: PageProps<"/[locale]/value">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const c = toolsCopy(locale).value;
  return pageMetadata({ locale, path: PATH, title: c.title, description: c.description });
}

export default async function Page({ params }: PageProps<"/[locale]/value">) {
  const locale = (await params).locale as Locale;
  const t = toolsCopy(locale);
  const c = t.value;
  const home = huntCopy(locale).breadcrumbHome;

  return (
    <SiteShell locale={locale} path={PATH}>
      <JsonLd
        data={graph(
          webPageSchema({ locale, path: PATH, title: c.title, description: c.description }),
          breadcrumbSchema([
            { name: home, url: localeUrl(locale) },
            { name: c.title, url: localeUrl(locale, PATH) },
          ]),
          faqPageSchema(c.faq),
        )}
      />
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <Crumbs items={[{ name: home, href: `/${locale}` }, { name: c.title }]} />
        <Title>{c.title}</Title>
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">{c.intro}</p>
        <div className="mt-8">
          <ValueSearch copy={c} rarity={t.rarity} locale={locale} bcp47={bcp47(locale)} />
        </div>
      </div>

      <div className="mt-16">
        <AnswerBlock question={c.question}>{c.answer}</AnswerBlock>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-2">
        <section>
          <SectionLabel>{c.how.title}</SectionLabel>
          <ol className="mt-5 list-decimal space-y-3 pl-6 text-muted marker:font-display marker:font-bold marker:text-accent">
            {c.how.items.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ol>
        </section>
        <section>
          <SectionLabel>{c.isnt.title}</SectionLabel>
          <p className="mt-5 leading-relaxed text-muted">{c.isnt.body}</p>
        </section>
      </div>

      <section className="mx-auto mt-14 max-w-3xl px-5 sm:px-8">
        <Faq items={c.faq} />
      </section>
      <AppCta locale={locale} />
    </SiteShell>
  );
}
