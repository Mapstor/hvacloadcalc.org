import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The requested page does not exist on hvacloadcalc.org.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container>
      <div className="max-w-prose py-16">
        <h1 className="text-3xl font-bold text-ink-900">Page not found</h1>
        <p className="mt-4 text-ink-700">
          The page you requested doesn&rsquo;t exist or has moved. Try the homepage or one of
          the topic hubs below.
        </p>
        <ul className="mt-6 space-y-2 text-brand">
          <li>
            <Link href="/" className="hover:underline">
              Homepage
            </Link>
          </li>
          <li>
            <Link href="/heat-pump/" className="hover:underline">
              Heat pump topics
            </Link>
          </li>
          <li>
            <Link href="/ac/" className="hover:underline">
              Air conditioner topics
            </Link>
          </li>
          <li>
            <Link href="/tools/" className="hover:underline">
              HVAC calculators
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  );
}
