import type { Source } from '@/components/seo/types';

interface Props {
  sources: Source[];
  heading?: string;
}

export function Sources({ sources, heading = 'Sources' }: Props) {
  if (sources.length === 0) {
    return null;
  }
  return (
    <section
      aria-labelledby="sources-heading"
      className="not-prose mt-12 border-t border-ink-300 pt-8"
    >
      <h2 id="sources-heading" className="text-xl font-bold text-ink-900">
        {heading}
      </h2>
      <ol className="mt-4 space-y-3 text-sm text-ink-700">
        {sources.map((s, i) => (
          <li key={s.id} id={`source-${s.id}`} className="leading-snug">
            <span className="font-semibold text-ink-900">{i + 1}.</span>{' '}
            {s.url ? (
              <a
                href={s.url}
                rel="noopener"
                className="text-brand hover:underline"
              >
                {s.title}
              </a>
            ) : (
              <span>{s.title}</span>
            )}
            {s.publisher ? <span>, {s.publisher}</span> : null}
            {s.year ? <span>, {s.year}</span> : null}
            {s.accessed ? (
              <span className="text-ink-500"> (accessed {s.accessed})</span>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
