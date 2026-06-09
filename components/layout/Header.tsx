import Link from 'next/link';
import { Container } from './Container';
import { MobileNav } from './MobileNav';
import { BrandMark } from '@/components/brand/BrandMark';
import { PRIMARY_NAV, SITE } from '@/lib/seo/site';

export function Header() {
  return (
    <header className="relative border-b border-ink-300 bg-white">
      <Container>
        <div className="flex items-center justify-between gap-4 py-4">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3"
            aria-label={`${SITE.name} home`}
          >
            <BrandMark className="h-10 w-10 flex-shrink-0" />
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-base leading-tight tracking-tight">
                <span className="font-bold text-ink-900 group-hover:text-brand">
                  hvacloadcalc
                </span>
                <span className="font-medium text-ink-500">.org</span>
              </span>
              <span className="hidden truncate text-xs text-ink-500 sm:block">
                {SITE.tagline}
              </span>
            </div>
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
