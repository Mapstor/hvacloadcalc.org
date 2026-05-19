import { AuthorByline } from './AuthorByline';

interface Props {
  h1: string;
  description?: string;
  datePublished?: string;
  lastReviewed?: string;
  readingTimeMinutes?: number;
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

export function ArticleHeader({
  h1,
  description,
  datePublished,
  lastReviewed,
  readingTimeMinutes,
}: Props) {
  return (
    <header className="not-prose mb-8">
      <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{h1}</h1>
      {description ? (
        <p className="mt-4 max-w-prose text-lg text-ink-700">{description}</p>
      ) : null}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-500">
        <AuthorByline lastReviewed={lastReviewed} size="sm" />
        {datePublished ? (
          <>
            <span aria-hidden="true">·</span>
            <span>Published {formatDate(datePublished)}</span>
          </>
        ) : null}
        {readingTimeMinutes ? (
          <>
            <span aria-hidden="true">·</span>
            <span>{readingTimeMinutes} min read</span>
          </>
        ) : null}
      </div>
    </header>
  );
}
