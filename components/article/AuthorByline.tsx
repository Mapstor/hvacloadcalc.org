import Link from 'next/link';
import { AUTHOR } from '@/lib/seo/site';

interface Props {
  lastReviewed?: string;
  size?: 'sm' | 'md';
}

function formatDate(iso?: string): string {
  if (!iso) {
    return '';
  }
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return iso;
  }
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function AuthorByline({ lastReviewed, size = 'md' }: Props) {
  const isSmall = size === 'sm';
  return (
    <div
      className={`not-prose flex items-center gap-3 ${isSmall ? 'text-sm' : 'text-base'}`}
    >
      <div
        role="img"
        aria-label={AUTHOR.imageAlt}
        className={`flex flex-shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white ${isSmall ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm'}`}
      >
        JS
      </div>
      <div>
        <Link
          href={AUTHOR.url}
          className="font-medium text-ink-900 hover:text-brand"
        >
          {AUTHOR.name}
        </Link>
        {lastReviewed ? (
          <p className="text-xs text-ink-500">
            Reviewed {formatDate(lastReviewed)}
          </p>
        ) : null}
      </div>
    </div>
  );
}
