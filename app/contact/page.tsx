import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { JsonLdBreadcrumb } from '@/components/seo/JsonLdBreadcrumb';
import { ContactForm } from './ContactForm';

const BREADCRUMBS = [{ name: 'Home', url: '/' }, { name: 'Contact' }];

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact hvacloadcalc.org. Send a question, correction, or press inquiry through the contact form.',
};

export default function ContactPage() {
  return (
    <>
      <JsonLdBreadcrumb items={BREADCRUMBS} />
      <Container>
        <div className="max-w-prose py-8">
          <Breadcrumbs items={BREADCRUMBS} />
          <h1 className="text-3xl font-bold text-ink-900">Contact</h1>
          <p className="mt-4 text-ink-700">
            Use this form to reach hvacloadcalc.org. Responses are not guaranteed — the
            site is small. Substantive corrections and questions are read.
          </p>
          <h2 className="mt-8 text-lg font-semibold text-ink-900">Subject categories</h2>
          <ul className="mt-3 space-y-2 text-ink-700">
            <li>
              <strong className="text-ink-900">Correction</strong> — factual or methodology
              errors. Logged on the{' '}
              <Link href="/corrections/" className="text-brand hover:underline">
                corrections page
              </Link>{' '}
              when actioned.
            </li>
            <li>
              <strong className="text-ink-900">Question</strong> — general questions about
              HVAC topics covered on the site.
            </li>
            <li>
              <strong className="text-ink-900">Press / Outreach</strong> — press, podcast,
              or collaboration inquiries.
            </li>
            <li>
              <strong className="text-ink-900">Other</strong> — privacy requests, takedown
              requests, or anything else.
            </li>
          </ul>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}
