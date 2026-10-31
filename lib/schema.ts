import { config, isAppLive } from "@/lib/config";
import { localeUrl, type Locale } from "@/lib/i18n";

// JSON-LD factories. Pages build the object here and pass it to <JsonLd data={...} /> (the only API).

type QA = { q: string; a: string };

const orgId = `${config.siteUrl}/#organization`;

export function faqPageSchema(items: QA[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: config.brand,
    url: config.siteUrl,
    logo: `${config.siteUrl}/icon`,
    ...(config.social.length ? { sameAs: [...config.social] } : {}),
    ...(config.supportEmail.includes("TODO")
      ? {}
      : { contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: config.supportEmail } }),
  };
}

export function softwareApplicationSchema(a: { locale: Locale; description: string }) {
  return {
    "@type": "MobileApplication",
    name: config.brand,
    operatingSystem: `${config.platform.os} ${config.platform.minVersion}+`,
    applicationCategory: "LifestyleApplication",
    description: a.description,
    inLanguage: a.locale,
    url: localeUrl(a.locale),
    publisher: { "@id": orgId },
    // Free to download; Kastr Pro prices are never hardcoded (they come from the App Store).
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    ...(isAppLive ? { downloadUrl: config.appStoreUrl, installUrl: config.appStoreUrl } : {}),
  };
}

export function webPageSchema(a: { locale: Locale; path: string; title: string; description: string }) {
  return {
    "@type": "WebPage",
    url: localeUrl(a.locale, a.path),
    name: a.title,
    description: a.description,
    inLanguage: a.locale,
    isPartOf: { "@type": "WebSite", url: config.siteUrl, name: config.brand },
    publisher: { "@id": orgId },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  slug: string;
  locale: Locale;
  date: string;
  updated?: string;
  image: string;
}) {
  return {
    "@type": "Article",
    headline: a.title,
    description: a.description,
    inLanguage: a.locale,
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    image: [a.image],
    mainEntityOfPage: localeUrl(a.locale, `/blog/${a.slug}`),
    author: { "@id": orgId },
    publisher: { "@id": orgId },
  };
}

/** Wraps several nodes in one @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
