import Link from 'next/link';
import type { RelatedArticle } from '@/components/seo/types';

interface Props {
  items: RelatedArticle[];
  heading?: string;
}

export function RelatedArticles({ items, heading = 'Related articles' }: Props) {
  if (items.length === 0) {
    return null;
  }
  return (
    <section aria-labelledby="related-heading" className="not-prose mt-12">
      <h2 id="related-heading" className="text-2xl font-bold text-ink-900">
        {heading}
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.url}>
            <Link
              href={item.url}
              className="block h-full rounded border border-ink-300 bg-white p-4 transition hover:border-brand hover:shadow-sm"
            >
              <h3 className="font-semibold text-ink-900">{item.title}</h3>
              {item.description ? (
                <p className="mt-1 text-sm text-ink-700">{item.description}</p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
