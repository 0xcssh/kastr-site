import { Plus } from "@phosphor-icons/react/dist/ssr";

// FAQ UI. Feed it the same array as faqPageSchema() so the page and the structured data never diverge.
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it) => (
        <details key={it.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-lg font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
            <span>{it.q}</span>
            <Plus
              aria-hidden="true"
              className="mt-1 h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p className="mt-3 max-w-[68ch] leading-relaxed text-muted">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
