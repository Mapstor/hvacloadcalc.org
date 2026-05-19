import { Children, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  ariaLabel?: string;
}

export function HubGrid({ children, ariaLabel }: Props) {
  const items = Children.toArray(children);
  return (
    <ul
      aria-label={ariaLabel}
      className="not-prose mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((child, i) => (
        <li key={i}>{child}</li>
      ))}
    </ul>
  );
}
