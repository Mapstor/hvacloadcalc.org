import Link from 'next/link';
import { Container } from './Container';
import { MobileNav } from './MobileNav';
import { PRIMARY_NAV, SITE } from '@/lib/seo/site';

export function Header() {
  return (
    <header className="relative border-b border-ink-300 bg-white">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-base font-bold text-ink-900 hover:text-brand">
            {SITE.name}
          </Link>
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex gap-6">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-ink-700 hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <MobileNav items={PRIMARY_NAV} />
        </div>
      </Container>
    </header>
  );
}
