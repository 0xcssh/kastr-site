// The self-contained answer AI engines quote (GEO). First sentence answers the question, 40 to 60 words.
export function AnswerBlock({ question, children }: { question: string; children: React.ReactNode }) {
  return (
    <section aria-label={question} data-answer-block className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="grid gap-4 border-l-2 border-accent py-2 pl-6 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-10">
        <h2 className="font-display text-2xl font-extrabold uppercase leading-none tracking-tight text-ink">
          {question}
        </h2>
        <p className="max-w-[68ch] text-base leading-relaxed text-muted sm:text-lg">{children}</p>
      </div>
    </section>
  );
}
