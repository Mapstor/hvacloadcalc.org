import Link from 'next/link';

interface Props {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export function HubCard({ title, href, description, badge }: Props) {
  return (
    <Link
      href={href}
      className="block h-full rounded border border-ink-300 bg-white p-4 transition hover:border-brand hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-ink-900">{title}</h3>
        {badge ? (
          <span className="rounded bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
            {badge}
          </span>
        ) : null}
      </div>
      {description ? (
        <p className="mt-1 text-sm text-ink-700">{description}</p>
      ) : null}
    </Link>
  );
}
