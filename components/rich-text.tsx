import Link from "next/link";
import { Fragment } from "react";

// Renders plain strings with a tiny markdown subset: [label](href). Internal hrefs use <Link>.
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    const className = "text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-ink";
    parts.push(
      href.startsWith("/") ? (
        <Link key={start} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a
          key={start}
          href={href}
          className={className}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>
      ),
    );
    last = start + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)}</>;
}
