interface Props {
  id: string;
  number?: number;
}

export function SourceCite({ id, number }: Props) {
  const label = number !== undefined ? String(number) : id;
  return (
    <sup className="ml-0.5">
      <a
        href={`#source-${id}`}
        className="text-brand hover:underline"
        aria-label={`Source ${label}`}
      >
        [{label}]
      </a>
    </sup>
  );
}
