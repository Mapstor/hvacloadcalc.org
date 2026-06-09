import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  key: keyof T & string;
  label: string;
  align?: 'left' | 'right' | 'center';
  render?: (value: T[keyof T], row: T) => ReactNode;
}

interface Props<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  caption?: string;
}

export function DataTable<T>({
  columns,
  rows,
  caption,
}: Props<T>) {
  const alignClass = (a?: 'left' | 'right' | 'center') =>
    a === 'right' ? 'text-right' : a === 'center' ? 'text-center' : 'text-left';
  return (
    <div className="not-prose my-6 w-full overflow-x-auto">
      <table className="w-full min-w-0 border-collapse text-sm">
        {caption ? (
          <caption className="mb-2 text-left text-ink-500">{caption}</caption>
        ) : null}
        <thead>
          <tr className="border-b-2 border-ink-300">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`break-words px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink-700 ${alignClass(col.align)}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-ink-100">
              {columns.map((col) => {
                const value = row[col.key];
                return (
                  <td
                    key={col.key}
                    className={`break-words px-3 py-2 text-ink-900 ${alignClass(col.align)}`}
                  >
                    {col.render
                      ? col.render(value as T[keyof T], row)
                      : value !== null && value !== undefined
                        ? String(value)
                        : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
