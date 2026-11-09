import Link from "next/link";
import type { MDXComponents } from "mdx/types";

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
};
