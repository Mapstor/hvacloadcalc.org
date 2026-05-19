interface Props {
  items: string[];
  heading?: string;
}

export function KeyTakeaways({ items, heading = 'Key takeaways' }: Props) {
  if (items.length === 0) {
    return null;
  }
  return (
    <aside
      aria-labelledby="key-takeaways-heading"
      className="not-prose my-8 rounded border-l-4 border-brand bg-ink-100 p-5"
    >
      <h2
        id="key-takeaways-heading"
        className="text-xs font-bold uppercase tracking-wider text-ink-900"
      >
        {heading}
      </h2>
      <ul className="mt-3 space-y-2 text-ink-700">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
