import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { AnswerBlock } from "@/components/answer-block";
import { Faq } from "@/components/faq";
import { AppCta, Crumbs, Title } from "@/components/hunt/hunt-views";
import { JsonLd } from "@/components/json-ld";
import { mdxComponentsFor } from "@/components/mdx";
import { SiteShell } from "@/components/site-shell";
import { getAllSlugs, getPost } from "@/lib/blog";
import { config } from "@/lib/config";
import { getDict } from "@/lib/dictionaries";
import { localeUrl, locales, type Locale } from "@/lib/i18n";
import { articleSchema, breadcrumbSchema, faqPageSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// Article route: content/blog/{en,fr}/<slug>.mdx (site-blog skill). Answer block first, then the MDX body,
// then the FAQ, which also feeds the FAQPage structured data (same array, so they never diverge).

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  // A static export needs at least one param: until the first article exists, emit a single
  // placeholder that renders the 404 page.
  if (slugs.length === 0) return [{ locale: locales[0], slug: "_" }];
  return slugs.flatMap(({ slug }) => locales.map((locale) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(locale as Locale, slug);
  if (!post) return {};
  return pageMetadata({ locale: locale as Locale, path: `/blog/${slug}`, title: post.title, description: post.description });
}

export default async function BlogPost({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  const post = await getPost(locale, slug);
  if (!post) notFound();
  const d = getDict(locale);
  const date = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", { dateStyle: "long" }).format(
    new Date(post.updated ?? post.date),
  );

  return (
    <SiteShell locale={locale} path={`/blog/${slug}`}>
      <JsonLd
        data={graph(
          articleSchema({
            title: post.title,
            description: post.description,
            slug,
            locale,
            date: post.date,
            updated: post.updated,
            image: `${config.siteUrl}${post.cover}`,
          }),
          breadcrumbSchema([
            { name: config.brand, url: localeUrl(locale) },
            { name: d.blog.title, url: localeUrl(locale, "/blog") },
            { name: post.title, url: localeUrl(locale, `/blog/${slug}`) },
          ]),
          faqPageSchema(post.faq ?? []),
        )}
      />
      <div className="mx-auto max-w-3xl px-5 pt-10 sm:px-8">
        <Crumbs items={[{ name: config.brand, href: `/${locale}` }, { name: d.blog.title, href: `/${locale}/blog` }, { name: post.title }]} />
        <Title>{post.title}</Title>
        <p className="mt-4 text-sm text-muted">
          <time dateTime={post.updated ?? post.date}>{date}</time>
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-3xl">
        <AnswerBlock question={post.title}>{post.answer}</AnswerBlock>
      </div>
      <article className="mx-auto max-w-3xl px-5 sm:px-8">
        <MDXRemote source={post.content} components={mdxComponentsFor(locale)} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        {post.faq?.length ? (
          <div className="mt-14">
            <Faq items={post.faq} />
          </div>
        ) : null}
      </article>
      <AppCta locale={locale} />
    </SiteShell>
  );
}
