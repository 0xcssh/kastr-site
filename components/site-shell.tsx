import Link from "next/link";
import { config } from "@/lib/config";
import { getDict } from "@/lib/dictionaries";
import { localeName, locales, type Locale } from "@/lib/i18n";
import { AppStoreBadge } from "./app-store-badge";

// The app's wordmark (Diecast/Views/SplashView.swift, KastrWordmark): three red speed stripes of
// shrinking length, then KASTR in wide Saira, slanted for the racing lean (Saira has no italic).
function Wordmark() {
  return (
    <span className="inline-flex -skew-x-[10deg] items-center gap-[0.18em] text-[1.6rem] leading-none text-ink">
      <span aria-hidden="true" className="flex flex-col items-end gap-[0.08em]">
        <span className="h-[0.14em] w-[0.9em] rounded-full bg-accent" />
        <span className="h-[0.14em] w-[0.6em] rounded-full bg-accent" />
        <span className="h-[0.14em] w-[0.35em] rounded-full bg-accent" />
      </span>
      <span className="font-display font-black uppercase tracking-[0.06em]">Kastr</span>
    </span>
  );
}

/** Header + main + footer shared by every page. `path` is the locale-less path ("" for home). */
export function SiteShell({ locale, path, children }: { locale: Locale; path: string; children: React.ReactNode }) {
  const d = getDict(locale);
  const other = locales.find((l) => l !== locale) ?? locale;
  const home = `/${locale}`;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        {d.nav.skip}
      </a>
      <header className="sticky top-0 z-40 border-b border-line/60 bg-carbon/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link href={home} aria-label={d.nav.home} className="shrink-0">
            <Wordmark />
          </Link>
          <nav aria-label="Main" className="flex items-center gap-5 text-sm font-medium text-muted sm:gap-7">
            <Link href={`${home}#features`} className="hidden hover:text-ink sm:inline">
              {d.nav.features}
            </Link>
            <Link href={`${home}#faq`} className="hidden hover:text-ink sm:inline">
              {d.nav.faq}
            </Link>
            <Link href={`${home}/support`} className="hover:text-ink">
              {d.nav.support}
            </Link>
            <Link
              href={`/${other}${path}`}
              hrefLang={other}
              lang={other}
              aria-label={`${other.toUpperCase()}, ${d.nav.language}: ${localeName[other]}`}
              className="rounded-md border border-line px-2 py-1 text-xs font-semibold uppercase tracking-wide hover:border-accent hover:text-ink"
            >
              {other}
            </Link>
            <span className="hidden lg:inline-flex">
              <AppStoreBadge d={d} size="sm" />
            </span>
          </nav>
        </div>
      </header>

      <main id="main" className="overflow-x-clip">{children}</main>

      <footer className="mt-24 border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1fr_auto]">
          <div className="max-w-xl space-y-4">
            <Wordmark />
            <p className="text-sm font-semibold text-ink">{d.footer.disclaimer}</p>
            <p className="text-xs leading-relaxed text-faint">{d.footer.trademarks}</p>
            <p className="text-xs text-faint">
              {d.footer.publisher}: {config.legal.tradeName}
            </p>
          </div>
          <nav aria-label="Legal" className="grid grid-cols-2 content-start gap-x-10 gap-y-3 text-sm text-muted">
            <Link href={`${home}/privacy`} className="hover:text-ink">
              {d.footer.links.privacy}
            </Link>
            <Link href={`${home}/terms`} className="hover:text-ink">
              {d.footer.links.terms}
            </Link>
            <Link href={`${home}/support`} className="hover:text-ink">
              {d.footer.links.support}
            </Link>
            <Link href={`${home}/credits`} className="hover:text-ink">
              {d.footer.links.credits}
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
