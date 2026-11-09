import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { listPosts } from "@/lib/blog";
import { getDict } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

// Blog index, ready for the site-blog skill. Kept out of the nav and noindexed while it is empty.

export async function generateMetadata({ params }: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const d = getDict(locale);
  const posts = await listPosts(locale);
  return pageMetadata({
    locale,
    path: "/blog",
    title: d.blog.title,
    description: d.blog.empty,
    noindex: posts.length === 0,
  });
}

export default async function BlogIndex({ params }: PageProps<"/[locale]/blog">) {
  const locale = (await params).locale as Locale;
  const d = getDict(locale);
  const posts = await listPosts(locale);

  return (
    <SiteShell locale={locale} path="/blog">
      <div className="mx-auto max-w-3xl px-5 pt-16 sm:px-8">
        <h1 className="font-display text-6xl font-black uppercase leading-none tracking-tight text-ink">{d.blog.title}</h1>
        {posts.length === 0 ? (
          <p className="mt-6 text-lg text-muted">{d.blog.empty}</p>
        ) : (
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {posts.map((p) => (
              <li key={p.slug} className="py-6">
                <Link href={`/${locale}/blog/${p.slug}`} className="text-xl font-semibold text-ink hover:text-accent-ink">
                  {p.title}
                </Link>
                <p className="mt-2 text-muted">{p.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SiteShell>
  );
}
