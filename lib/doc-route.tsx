import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { config } from "@/lib/config";
import { localeUrl, type Locale } from "@/lib/i18n";
import type { LegalDoc } from "@/lib/legal/types";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

/** Builds generateMetadata + the page component for a long-form document route. */
export function docRoute(path: string, getDoc: (locale: Locale) => LegalDoc) {
  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const locale = (await params).locale as Locale;
    const doc = getDoc(locale);
    return pageMetadata({ locale, path, title: doc.title, description: doc.description });
  }

  async function Page({ params }: Params) {
    const locale = (await params).locale as Locale;
    const doc = getDoc(locale);
    return (
      <SiteShell locale={locale} path={path}>
        <JsonLd
          data={graph(
            webPageSchema({ locale, path, title: doc.title, description: doc.description }),
            breadcrumbSchema([
              { name: config.brand, url: localeUrl(locale) },
              { name: doc.title, url: localeUrl(locale, path) },
            ]),
          )}
        />
        <DocPage locale={locale} doc={doc} />
      </SiteShell>
    );
  }

  return { generateMetadata, Page };
}
