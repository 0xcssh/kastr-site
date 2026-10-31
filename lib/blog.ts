import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n";

// Blog storage, ready for the site-blog skill: content/blog/{en,fr}/<slug>.mdx, same slug in both
// languages. Works with zero articles: every function returns an empty result instead of throwing.
// Rendering MDX bodies (next-mdx-remote/rsc + components/mdx.tsx) is added with the first article.

const ROOT = path.join(process.cwd(), "content", "blog");

type QA = { q: string; a: string };

export type Post = {
  slug: string;
  lang: Locale;
  title: string;
  description: string;
  date: string;
  updated?: string;
  cover: string;
  tags: string[];
  answer: string;
  faq: QA[];
  content: string;
};

export async function getAllSlugs(): Promise<{ slug: string; date: string }[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(path.join(ROOT, "en")); // English is the reference language for slugs.
  } catch {
    return [];
  }
  const out = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (f) => {
        const { data } = matter(await fs.readFile(path.join(ROOT, "en", f), "utf8"));
        return { slug: f.replace(/\.mdx$/, ""), date: String(data.date) };
      }),
  );
  return out.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(locale: Locale, slug: string): Promise<Post | null> {
  try {
    const raw = await fs.readFile(path.join(ROOT, locale, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return { slug, ...(data as Omit<Post, "slug" | "content">), content };
  } catch {
    return null;
  }
}

export async function listPosts(locale: Locale): Promise<Post[]> {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(slugs.map(({ slug }) => getPost(locale, slug)));
  return posts.filter((p): p is Post => p !== null);
}
