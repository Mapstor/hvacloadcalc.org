import Link from 'next/link';
import type { Heading } from '@/components/seo/types';

interface Props {
  headings: Heading[];
  sticky?: boolean;
  heading?: string;
}

export function TableOfContents({
  headings,
  sticky = false,
  heading = 'On this page',
}: Props) {
  if (headings.length === 0) {
    return null;
  }
  return (
    <nav
      aria-labelledby="toc-heading"
      className={`not-prose rounded border border-ink-300 bg-white p-4 ${sticky ? 'lg:sticky lg:top-4' : ''}`}
    >
      <h2
        id="toc-heading"
        className="text-xs font-bold uppercase tracking-wider text-ink-900"
      >
        {heading}
      </h2>
      <ol className="mt-3 space-y-1 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'ml-4' : ''}>
            <Link href={`#${h.id}`} className="text-ink-700 hover:text-brand">
              {h.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
