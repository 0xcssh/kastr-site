import { config } from "@/lib/config";
import { getDict } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { Block, LegalDoc } from "@/lib/legal/types";
import { RichText } from "./rich-text";

function BlockView({ block }: { block: Block }) {
  if (typeof block === "string") {
    return (
      <p className="leading-relaxed text-muted">
        <RichText text={block} />
      </p>
    );
  }
  if ("list" in block) {
    return (
      <ul className="space-y-2.5 pl-1">
        {block.list.map((item) => (
          <li key={item} className="relative pl-5 leading-relaxed text-muted">
            <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-[3px] w-2.5 bg-accent" />
            <RichText text={item} />
          </li>
        ))}
      </ul>
    );
  }
  return <p className="rounded-xl border border-line bg-surface p-4 text-sm text-muted">{block.note}</p>;
}

/** Long-form page (privacy, terms, support, credits): title, optional date and contents, sections. */
export function DocPage({ locale, doc }: { locale: Locale; doc: LegalDoc }) {
  const d = getDict(locale);
  const updated = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(config.legalUpdated));

  return (
    <article className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 md:pt-20">
      <header className="max-w-3xl">
        <h1 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink md:text-7xl">
          {doc.title}
        </h1>
        {doc.dated ? (
          <p className="mt-5 text-sm text-faint">
            {d.legalChrome.updated}: <time dateTime={config.legalUpdated}>{updated}</time>
          </p>
        ) : null}
        <div className="mt-8 space-y-4 text-lg">
          {doc.intro.map((p) => (
            <p key={p} className="leading-relaxed text-ink/90">
              <RichText text={p} />
            </p>
          ))}
        </div>
      </header>

      <div className={`mt-14 grid gap-12 ${doc.dated ? "lg:grid-cols-[15rem_minmax(0,1fr)]" : ""}`}>
        {doc.dated ? (
          <nav aria-label={d.legalChrome.contents} className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-faint">{d.legalChrome.contents}</p>
              <ol className="space-y-2 text-sm">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-muted hover:text-accent-ink">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        ) : null}
        <div className="max-w-3xl space-y-12">
          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink md:text-3xl">
                {s.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {s.blocks.map((b, i) => (
                  <BlockView key={i} block={b} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
