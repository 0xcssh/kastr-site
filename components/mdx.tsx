import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { HuntRankingList } from "@/components/hunt/hunt-ranking";
import { huntPath, huntsOfYear } from "@/lib/hunts";
import type { Locale } from "@/lib/i18n";

// MDX body of blog articles, mapped to the site's type scale (app/[locale]/blog/[slug]/page.tsx).
// Internal links go through next/link; external ones open as plain links with rel="noopener".

function A({ href = "", children }: { href?: string; children?: React.ReactNode }) {
  const className = "font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-ink";
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} rel="noopener" className={className}>
      {children}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-14 flex items-center gap-2.5 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink">
      <span aria-hidden="true" className="h-5 w-1 shrink-0 rounded-[2px] bg-accent" />
      {children}
    </h2>
  ),
  h3: ({ children }) => <h3 className="mt-8 text-lg font-semibold text-ink">{children}</h3>,
  p: ({ children }) => <p className="mt-5 leading-relaxed text-muted">{children}</p>,
  ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-muted marker:text-accent">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-muted marker:text-accent">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  a: A,
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-line bg-surface px-4 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">{children}</th>
  ),
  td: ({ children }) => <td className="border-b border-line px-4 py-3 align-top text-muted">{children}</td>,
};

/** <HuntRanking year={2026} />: the year's Treasure Hunts and Supers, ranked live by value (hunt-ranking.tsx). */
function huntRanking(locale: Locale) {
  return function HuntRanking({ year }: { year: number }) {
    const cars = (["sth", "th"] as const).flatMap((r) =>
      huntsOfYear(r, year).map((h) => ({
        id: h.id,
        name: h.name,
        rarity: r,
        caseCode: h.caseCode,
        href: `/${locale}${huntPath[r]}/${h.year}/${h.slug}`,
      })),
    );
    return <HuntRankingList cars={cars} locale={locale} />;
  };
}

/** The article components, with the ones that need the page's language. */
export function mdxComponentsFor(locale: Locale): MDXComponents {
  return { ...mdxComponents, HuntRanking: huntRanking(locale) };
}
