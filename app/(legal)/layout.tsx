import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <article className="prose prose-slate mx-auto max-w-prose py-8 prose-headings:text-ink-900 prose-a:text-brand prose-strong:text-ink-900">
        {children}
      </article>
    </Container>
  );
}
