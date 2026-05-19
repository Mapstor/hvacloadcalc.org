import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { JsonLdWebsite } from '@/components/seo/JsonLdWebsite';
import { JsonLdOrganization } from '@/components/seo/JsonLdOrganization';
import { ALL_HUBS } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'hvacloadcalc.org — Educational HVAC sizing and methodology',
  description:
    'Free educational HVAC reference covering heat pump sizing, Manual J load calculation, AC and furnace sizing, and building science fundamentals.',
};

const HUB_DESCRIPTIONS: Record<string, string> = {
  '/heat-pump/': 'Sizing, balance point, cold-climate operation, troubleshooting.',
  '/ac/': 'Sizing, short cycling, BTU-per-square-foot, oversizing diagnosis.',
  '/furnace/': 'Sizing, AFUE, oversizing problems, 80 vs 95 selection.',
  '/manual-j/': 'ACCA load calculation methodology, by-hand vs software, verification.',
  '/manual-s/': 'Equipment selection: AHRI matchup, sensible heat ratio, capacity at design.',
  '/manual-d/': 'Duct design: friction rate, equivalent length, static pressure.',
  '/manual-t/': 'Air distribution: throw, spread, face velocity, register selection.',
  '/building-science/': 'R-values, U-factors, psychrometrics, infiltration, climate zones.',
  '/tools/': 'Calculators with documented methodology and worked examples.',
  '/glossary/': 'Quotable definitions of HVAC terms with formulas where applicable.',
};

export default function HomePage() {
  return (
    <>
      <JsonLdWebsite />
      <JsonLdOrganization />
      <Container>
        <div className="py-12 md:py-16">
          <h1 className="max-w-prose text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl md:text-5xl">
            HVAC sizing, load calculation, and methodology reference
          </h1>
          <p className="mt-6 max-w-prose text-lg text-ink-700">
            Free educational reference covering heat pump sizing, Manual J load calculation,
            AC and furnace sizing, and building science fundamentals. Every calculation shows
            its math. Every claim cites its source. No affiliate links, no contractor
            referrals, no marketing fluff.
          </p>

          <section className="mt-12" aria-labelledby="hubs-heading">
            <h2 id="hubs-heading" className="text-xl font-semibold text-ink-900">
              Topic hubs
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ALL_HUBS.map((hub) => (
                <li key={hub.href}>
                  <Link
                    href={hub.href}
                    className="block h-full rounded border border-ink-300 bg-white p-4 transition hover:border-brand hover:shadow-sm"
                  >
                    <h3 className="font-semibold text-ink-900">{hub.label}</h3>
                    <p className="mt-1 text-sm text-ink-700">
                      {HUB_DESCRIPTIONS[hub.href] ?? ''}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 max-w-prose" aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-xl font-semibold text-ink-900">
              About this site
            </h2>
            <p className="mt-4 text-ink-700">
              hvacloadcalc.org is an independent educational reference. The site is written
              and maintained by{' '}
              <Link href="/authors/jonathan-s/" className="text-brand hover:underline">
                Jonathan S.
              </Link>
              {' '}— a homeowner-turned-researcher who got tired of contradictory contractor
              quotes and learned the underlying methodology to figure out which one was
              right.
            </p>
            <p className="mt-4 text-ink-700">
              No affiliate marketing. No contractor lead-gen. No sponsored content. The site
              is funded entirely by display advertising and is independent of every HVAC
              manufacturer, contractor, and software vendor. Read the{' '}
              <Link href="/editorial-standards/" className="text-brand hover:underline">
                editorial standards
              </Link>
              {' '}for the full picture, or the{' '}
              <Link href="/methodology/" className="text-brand hover:underline">
                methodology
              </Link>
              {' '}for how every calculator computes.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
