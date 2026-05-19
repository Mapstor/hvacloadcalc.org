'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { NavItem } from '@/lib/seo/site';

interface Props {
  items: readonly NavItem[];
}

export function MobileNav({ items }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded px-3 py-2 text-sm font-medium text-ink-900 hover:bg-ink-100"
      >
        {open ? 'Close menu' : 'Menu'}
      </button>
      {open ? (
        <ul
          id="mobile-nav"
          className="absolute left-0 right-0 top-full z-20 border-b border-ink-300 bg-white shadow-md"
        >
          {items.map((item) => (
            <li key={item.href} className="border-b border-ink-100 last:border-b-0">
              <Link
                href={item.href}
                className="block px-4 py-3 text-ink-700 hover:bg-ink-100 hover:text-brand"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
