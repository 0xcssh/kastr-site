import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/answer-block";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { getAllSlugs, getPost } from "@/lib/blog";
import { config } from "@/lib/config";
import { locales, type Locale } from "@/lib/i18n";
import { articleSchema, faqPageSchema, graph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// Article route. Compiles with zero articles (one placeholder param, see below). The MDX body renderer is added
// by the site-blog skill together with the first article (next-mdx-remote/rsc + components/mdx.tsx).

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
  const { locale, slug } = await params;
  const post = await getPost(locale as Locale, slug);
  if (!post) notFound();

  return (
    <SiteShell locale={locale as Locale} path={`/blog/${slug}`}>
      <JsonLd
        data={graph(
          articleSchema({
            title: post.title,
            description: post.description,
            slug,
            locale: locale as Locale,
            date: post.date,
            updated: post.updated,
            image: `${config.siteUrl}${post.cover}`,
          }),
          faqPageSchema(post.faq ?? []),
        )}
      />
      <article className="mx-auto max-w-3xl px-5 pt-16 sm:px-8">
        <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tight text-ink">{post.title}</h1>
        <div className="mt-10">
          <AnswerBlock question={post.title}>{post.answer}</AnswerBlock>
        </div>
        {post.faq?.length ? (
          <div className="mt-12">
            <Faq items={post.faq} />
          </div>
        ) : null}
      </article>
    </SiteShell>
  );
}
