import { JsonLdFAQ } from '@/components/seo/JsonLdFAQ';
import type { FaqItem } from '@/components/seo/types';

interface Props {
  items: FaqItem[];
  heading?: string;
}

export function FAQ({ items, heading = 'Frequently asked questions' }: Props) {
  if (items.length === 0) {
    return null;
  }
  return (
    <>
      <JsonLdFAQ faqs={items} />
      <section
        aria-labelledby="faq-heading"
        className="not-prose mt-12"
      >
        <h2 id="faq-heading" className="text-2xl font-bold text-ink-900">
          {heading}
        </h2>
        <dl className="mt-6 space-y-6">
          {items.map((item, i) => (
            <div key={i}>
              <dt className="text-lg font-semibold text-ink-900">{item.q}</dt>
              <dd className="mt-2 text-ink-700">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
