import Link from 'next/link';
import { Container } from './Container';
import { FOOTER_DISCLAIMER, SITE } from '@/lib/seo/site';

const FOOTER_COLUMNS = [
  {
    heading: 'About',
    links: [
      { label: 'About hvacloadcalc.org', href: '/about/' },
      { label: 'Editorial standards', href: '/editorial-standards/' },
      { label: 'Author: Jonathan S.', href: '/authors/jonathan-s/' },
    ],
  },
  {
    heading: 'Methodology',
    links: [
      { label: 'How calculators work', href: '/methodology/' },
      { label: 'Sources cited', href: '/sources/' },
      { label: 'Disclaimer', href: '/disclaimer/' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Contact', href: '/contact/' },
      { label: 'Corrections', href: '/corrections/' },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-300 bg-ink-100 py-12 text-sm text-ink-700">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-900">
                {col.heading}
              </h2>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-prose text-ink-700">{FOOTER_DISCLAIMER}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-ink-300 pt-6 text-xs text-ink-500">
          <Link href="/privacy/" className="hover:text-brand">
            Privacy
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/terms/" className="hover:text-brand">
            Terms
          </Link>
          <span aria-hidden="true">·</span>
          <span>
            © {SITE.copyrightYear} {SITE.name}
          </span>
        </div>
      </Container>
    </footer>
  );
}
