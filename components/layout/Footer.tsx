import Link from 'next/link';
import { Container } from './Container';
import { BrandMark } from '@/components/brand/BrandMark';
import { FOOTER_DISCLAIMER, SITE } from '@/lib/seo/site';

const TOPIC_LINKS = [
  { label: 'Heat pump', href: '/heat-pump/' },
  { label: 'Air conditioner', href: '/ac/' },
  { label: 'Furnace', href: '/furnace/' },
  { label: 'Building science', href: '/building-science/' },
  { label: 'Glossary', href: '/glossary/' },
] as const;

const ACCA_LINKS = [
  { label: 'Manual J — load calculation', href: '/manual-j/' },
  { label: 'Manual S — equipment selection', href: '/manual-s/' },
  { label: 'Manual D — duct design', href: '/manual-d/' },
  { label: 'Manual T — air distribution', href: '/manual-t/' },
] as const;

const CALCULATOR_LINKS = [
  { label: 'Manual J calculator', href: '/tools/manual-j-calculator/' },
  { label: 'Heat pump size calculator', href: '/tools/heat-pump-size-calculator/' },
  { label: 'AC size calculator', href: '/tools/ac-size-calculator/' },
  { label: 'BTU calculator', href: '/tools/btu-calculator/' },
  { label: 'Attic R-value calculator', href: '/tools/attic-r-value-calculator/' },
  { label: 'All calculators →', href: '/tools/' },
] as const;

const ABOUT_LINKS = [
  { label: 'About', href: '/about/' },
  { label: 'How calculators compute', href: '/methodology/' },
  { label: 'Editorial standards', href: '/editorial-standards/' },
  { label: 'Sources cited', href: '/sources/' },
  { label: 'Jonathan Stowe (author)', href: '/authors/jonathan-s/' },
  { label: 'Corrections', href: '/corrections/' },
  { label: 'Contact', href: '/contact/' },
] as const;

const FOOTER_COLUMNS = [
  { heading: 'Topics', links: TOPIC_LINKS },
  { heading: 'ACCA Manuals', links: ACCA_LINKS },
  { heading: 'Calculators', links: CALCULATOR_LINKS },
  { heading: 'About', links: ABOUT_LINKS },
] as const;

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-300 bg-ink-100 py-12 text-sm text-ink-700">
      <Container>
        <div className="mb-8 border-b border-ink-300 pb-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-3"
            aria-label={`${SITE.name} home`}
          >
            <BrandMark className="h-9 w-9 flex-shrink-0" />
            <span className="text-base leading-tight tracking-tight">
              <span className="font-bold text-ink-900 group-hover:text-brand">
                hvacloadcalc
              </span>
              <span className="font-medium text-ink-500">.org</span>
            </span>
          </Link>
          <p className="mt-3 max-w-prose text-ink-700">
            {SITE.longTagline} The reference is independent of every HVAC
            manufacturer, contractor, and software vendor cited across the content.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
        </nav>

        <p className="mt-10 max-w-prose text-ink-700">{FOOTER_DISCLAIMER}</p>

        <p className="mt-4 text-ink-700">
          Email:{' '}
          <a
            href="mailto:info@hvacloadcalc.org"
            className="font-medium text-brand hover:underline"
          >
            info@hvacloadcalc.org
          </a>
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink-300 pt-6 text-xs text-ink-500">
          <span>
            © {SITE.copyrightYear} {SITE.name}
          </span>
          <span aria-hidden="true">·</span>
          <Link href="/privacy/" className="hover:text-brand">
            Privacy
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/terms/" className="hover:text-brand">
            Terms
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/disclaimer/" className="hover:text-brand">
            Disclaimer
          </Link>
        </div>
      </Container>
    </footer>
  );
}
