import type { ReactNode } from 'react';

type CalloutType = 'info' | 'warn' | 'danger' | 'good' | 'planning-grade';

interface Props {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const VARIANTS: Record<CalloutType, { border: string; bg: string; title: string }> = {
  info: { border: 'border-info', bg: 'bg-info/10', title: 'text-info' },
  warn: { border: 'border-warn', bg: 'bg-warn/10', title: 'text-warn' },
  danger: { border: 'border-danger', bg: 'bg-danger/10', title: 'text-danger' },
  good: { border: 'border-good', bg: 'bg-good/10', title: 'text-good' },
  'planning-grade': {
    border: 'border-warn',
    bg: 'bg-warn/5',
    title: 'text-warn',
  },
};

export function Callout({ type = 'info', title, children }: Props) {
  const v = VARIANTS[type];
  return (
    <aside
      className={`not-prose my-6 rounded border-l-4 ${v.border} ${v.bg} p-5`}
    >
      {title ? (
        <h3
          className={`text-sm font-bold uppercase tracking-wider ${v.title}`}
        >
          {title}
        </h3>
      ) : null}
      <div className={`${title ? 'mt-2' : ''} text-ink-900`}>{children}</div>
    </aside>
  );
}
