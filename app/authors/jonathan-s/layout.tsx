import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';

export default function AuthorPageLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div className="py-8">{children}</div>
    </Container>
  );
}
