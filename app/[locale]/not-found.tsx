import Link from "next/link";
import { getDict } from "@/lib/dictionaries";

// Rendered when a page calls notFound() inside a locale (unknown blog slug...). English copy is used
// because not-found receives no params; unmatched URLs are handled by app/global-not-found.tsx.
export default function NotFound() {
  const d = getDict("en");
  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-3xl flex-col justify-center px-5 sm:px-8">
      <h1 className="font-display text-6xl font-black uppercase italic leading-none tracking-tight text-ink">
        {d.notFound.title}
      </h1>
      <p className="mt-5 text-lg text-muted">{d.notFound.body}</p>
      <Link href="/en" className="mt-8 w-fit rounded-xl bg-accent px-5 py-3 font-semibold text-carbon">
        {d.notFound.home}
      </Link>
    </main>
  );
}
